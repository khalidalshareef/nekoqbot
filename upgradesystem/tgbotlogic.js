const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('upgrade', async (ctx) => {
    const userId = ctx.from.id;

    // Fetch user data from backend
    const response = await fetch(`https://yourbackend.com/user-info/${userId}`);
    const userData = await response.json();

    const upgradeCost = Math.pow(2, userData.tapLevel);

    ctx.reply(`
        Your current tap size is ${userData.tapSize}.
        Current level: ${userData.tapLevel}.
        Coins: ${userData.coins}.
        Next upgrade costs ${upgradeCost} coins.
        
        Use /buy_upgrade to upgrade your tap size.
    `);
});

bot.command('buy_upgrade', async (ctx) => {
    const userId = ctx.from.id;

    // Send request to backend to upgrade tap
    const response = await fetch(`https://yourbackend.com/upgrade-tap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId: userId }),
    });

    const result = await response.json();

    if (response.ok) {
        ctx.reply(`Upgrade successful! New tap size is ${result.newTapSize}. Remaining coins: ${result.remainingCoins}.`);
    } else {
        ctx.reply(`Upgrade failed: ${result.message}`);
    }
});

bot.launch();
