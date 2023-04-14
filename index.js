require('dotenv/config');
const { Client, IntentsBitField} = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (T) => {
    console.log(` ${T.user.tag.split('#')[0]} is online`);
});

const config = new Configuration({
    apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(config);

const msgLengthLimit = 2000;
client.on('messageCreate', async (message) => {
    try {
      if (message.author.bot) return;
      if (message.channel.id !== process.env.CHANNEL_ID) return;
      if (message.content.startsWith('!')) return;
  
      await message.channel.sendTyping();
  
      if (message.content.length > msgLengthLimit) {
        message.reply("yeah I'm not reading all that");
        return;
      }
  
      let prevMessages = await message.channel.messages.fetch({ limit: 15 });
      prevMessages.reverse();
  
      let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];
  
      prevMessages.forEach((msg) => {
        if (msg.content.startsWith('!')) return;
        if (msg.content.length > msgLengthLimit) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
  
        // If msg is from the bot (client) itself
        if (msg.author.id === client.user.id) {
          conversationLog.push({
            role: 'assistant',
            content: msg.content,
          });
        }
  
        // If msg is from a regular user
        else {
          if (msg.author.id !== message.author.id) return;
  
          conversationLog.push({
            role: 'user',
            content: msg.content,
          });
        }
      });
  
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
      });
  
      let reply = res.data.choices[0].message?.content;
  
      if (reply?.length > 2000) {
        // If the reply length is over 2000 characters, send a txt file.
        const buffer = Buffer.from(reply, 'utf8');
        const txtFile = new AttachmentBuilder(buffer, { name: `${message.author.tag}_response.txt` });
  
        message.reply({ files: [txtFile] }).catch(() => {
          message.channel.send({ content: `${message.author}`, files: [txtFile] });
        });
      } else {
        message.reply(reply).catch(() => {
          message.channel.send(`${message.author} ${reply}`);
        });
      }
    } catch (error) {
      message.reply(`Something went wrong. Try again later.`).then((msg) => {
        setTimeout(async () => {
          await msg.delete().catch(() => null);
        }, 5000);
      });
  
      console.log(`Error: ${error}`);
    }
});

client.login(process.env.TOKEN);