const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('referral', async (ctx) => {
    const userId = ctx.from.id;
    
    // Fetch referral link from backend
    const response = await fetch(`https://yourbackend.com/generate-referral/${userId}`);
    const data = await response.json();
    
    ctx.reply(`Share this link with your friends to earn rewards: ${data.referralLink}`);
});

bot.launch();
