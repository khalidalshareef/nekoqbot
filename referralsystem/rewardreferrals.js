const checkReferralCompletion = async (userId) => {
    const referrals = await Referral.find({ refereeId: userId, status: 'pending' });
    
    if (referrals.length > 0) {
        referrals.forEach(async (referral) => {
            // Check if referee has completed required action (e.g., earned 100 points)
            const referee = await User.findOne({ telegramId: referral.refereeId });
            if (referee.points >= 100) {
                // Update referral status
                referral.status = 'completed';
                await referral.save();
                
                // Reward both referrer and referee
                const referrer = await User.findOne({ telegramId: referral.referrerId });
                referrer.points += 50; // Reward referrer
                await referrer.save();
                
                referee.points += 20; // Reward referee
                await referee.save();
            }
        });
    }
};
