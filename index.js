require('dotenv/config');
const { Client, IntentsBitField} = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const bot = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

bot.on('ready', () => {
    console.log("Bot online");
});

const config = new Configuration({
    apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(config);


bot.on('messageCreate', (message) => {
    if (message.author.bot || (message.channel.id !== process.allowedNodeEnvironmentFlags.CHANNEL_ID)) return;
    
});

bot.login(process.env.TOKEN);