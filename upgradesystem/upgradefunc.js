const express = require('express');
const app = express();

// Assume we have a database connection setup (e.g., MongoDB)
const User = require('./models/User'); // User model

// Calculate the cost of the next upgrade
function calculateUpgradeCost(currentLevel) {
    return Math.pow(2, currentLevel); // 2^n
}

// Endpoint to upgrade tap size
app.post('/upgrade-tap', async (req, res) => {
    const { telegramId } = req.body;
    
    try {
        const user = await User.findOne({ telegramId });

        if (!user) return res.status(404).send('User not found');

        const currentLevel = user.tapLevel;
        const upgradeCost = calculateUpgradeCost(currentLevel);

        if (user.coins >= upgradeCost) {
            // Deduct coins and upgrade tap level
            user.coins -= upgradeCost;
            user.tapLevel += 1;
            user.tapSize += 1; // Or increase by any formula, e.g., tapSize = 1.5^tapLevel

            await user.save();

            res.send({
                message: 'Upgrade successful!',
                newTapLevel: user.tapLevel,
                remainingCoins: user.coins,
                newTapSize: user.tapSize
            });
        } else {
            res.status(400).send('Not enough coins for the upgrade.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
