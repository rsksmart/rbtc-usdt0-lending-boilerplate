const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config');
const blockchain = require('./src/services/blockchain');

if (!config.telegramToken) {
    console.warn("TELEGRAM_BOT_TOKEN is not set in .env. Bot will fail to start.");
}

const bot = new TelegramBot(config.telegramToken, { polling: true });

console.log(`Bot Wallet Address: ${blockchain.getWalletAddress()}`);

require('./src/commands/start')(bot);
require('./src/commands/view')(bot);
require('./src/commands/actions')(bot);

console.log("Bot is running...");
