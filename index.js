const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const keywords = ["!인증", "!보충", "!라이브", "!후기"];
  if (keywords.some(k => message.content.includes(k))) {
    try {
      await axios.post(GAS_WEBAPP_URL, {
        id: message.id,
        content: message.content,
        author: {
          username: message.author.username,
          global_name: message.author.global_name || message.author.username
        },
        timestamp: message.createdAt
      });
      console.log(`전달 성공: ${message.content}`);
    } catch (error) {
      console.error("전송 실패:", error.message);
    }
  }
});

client.login(DISCORD_TOKEN);
