require('dotenv/config');
const { Client, IntentsBitField} = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (T) => {
    console.log(` ${T.user.tag} is online`);
});

const config = new Configuration({
    apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(config);


client.on('messageCreate', async (message) => {
    if ((message.author.bot) || (message.channel.id !== process.env.CHANNEL_ID) || (message.content.startsWith('*'))) {
        console.log("Message is Bot / Other Channel / Preceded with '*' ");
        return; 
    }
    
    let conversationLog = [{ role: 'system', content: "You are a friendly chatbot named Marbles."}];

    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if ((msg.author.id !== client.user.id && message.author.bot) || (msg.author.id !== message.author.id) || (msg.content.startsWith('*'))) {
            let i = 0;
            console.log("Message is other Bot / Other user / Preceded with '*' ", [i]);
            ++i;
            return; 
        }

        conversationLog.push({
            role: 'user',
            content: msg.content,
        });
    })

    
    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    })

    const response = result.data.choices[0].message;
    result.data.choices[0].message = [result.data.choices[0].message];
    result.data.choices[0].message.splice(0, 1);

    message.reply(response);
});

client.login(process.env.TOKEN);