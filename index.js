import fetch from 'node-fetch';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GAS_WEBAPP_URL_BOSS = process.env.GAS_WEBAPP_URL_BOSS;
const GAS_WEBAPP_URL_EVENT = process.env.GAS_WEBAPP_URL_EVENT;
const GAS_WEBAPP_URL_CROSS_SERVER_BOSS = process.env.GAS_WEBAPP_URL_CROSS_SERVER_BOSS;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.includes('เวลาบอส!')) {
    try {
      await message.channel.send('กำลังดึงเวลาบอสทั้งหมด... โปรดรอสักครู่');

      const response = await fetch(GAS_WEBAPP_URL_BOSS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message.content }),
      });

      const text = await response.text();
      await message.channel.send(text);

    } catch (error) {
      console.error('❌ Error sending to GAS:', error);
      await message.channel.send('เกิดข้อผิดพลาดในการดึงข้อมูลบอส');
    }
  }
  else if (message.content.includes('เวลาบอสต่างเซิฟ!')) {
    try {
      await message.channel.send('กำลังดึงเวลาบอสต่างเซิฟทั้งหมด... โปรดรอสักครู่');

      const response = await fetch(GAS_WEBAPP_URL_CROSS_SERVER_BOSS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message.content }),
      });

      const text = await response.text();
      await message.channel.send(text);

    } catch (error) {
      console.error('❌ Error sending to GAS:', error);
      await message.channel.send('เกิดข้อผิดพลาดในการดึงข้อมูลบอส');
    }
  }
  else if (message.content.includes('เวลากิจกรรม!')) {
    try {
      await message.channel.send('กำลังดึงเวลากิจกรรมทั้งหมด... โปรดรอสักครู่');

      const response = await fetch(GAS_WEBAPP_URL_EVENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message.content }),
      });

      const text = await response.text();
      await message.channel.send(text);

    } catch (error) {
      console.error('❌ Error sending to GAS:', error);
      await message.channel.send('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม');
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
