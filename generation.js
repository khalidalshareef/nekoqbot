const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

// Assume we have a database connection setup (e.g., MongoDB)
const User = require('./models/User'); // User model
const Referral = require('./models/Referral'); // Referral model

// Endpoint to generate referral link
app.get('/generate-referral/:userId', async (req, res) => {
    const { userId } = req.params;
    
    // Generate a unique referral code
    const referralCode = uuidv4(); // or simply use userId for simplicity

    // Save or update referral link in the user record
    await User.updateOne({ telegramId: userId }, { referralCode });
    
    const referralLink = `https://yourgame.com/start?ref=${referralCode}`;
    
    res.send({ referralLink });
});
