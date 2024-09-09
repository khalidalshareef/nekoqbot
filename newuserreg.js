app.post('/register', async (req, res) => {
    const { telegramId, ref } = req.body; // ref is the referral code from the URL
    
    // Register new user
    const newUser = await User.create({ telegramId, points: 0 });

    // If there is a referral code
    if (ref) {
        const referrer = await User.findOne({ referralCode: ref });

        if (referrer) {
            // Record referral
            await Referral.create({ referrerId: referrer.telegramId, refereeId: telegramId, status: 'pending' });
        }
    }
    
    res.send({ message: 'User registered successfully!' });
});
