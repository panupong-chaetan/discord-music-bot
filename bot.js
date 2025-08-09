const fetch = require('node-fetch');
const Discord = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN; // แนะนำเก็บ token ใน .env
const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL; // URL GAS Web App

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",      // ต้องมี intent นี้เพื่อฟังข้อความในช่องแชท
        "MESSAGE_CONTENT"      // สำคัญ! discord.js v14 ต้องเปิดเพื่ออ่านข้อความ (อาจใช้ "MESSAGE_CONTENT" หรือ GatewayIntentBits.MessageContent ใน v14)
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // ข้ามข้อความบอท

    if (message.content.includes('เวลาบอส')) {
        try {
            // แจ้งว่ากำลังดึงข้อมูล
            await message.channel.send('กำลังดึงเวลาบอสทั้งหมด... โปรดรอสักครู่');

            // ส่งคำขอไป GAS
            const response = await fetch(GAS_WEBAPP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message.content }),
            });

            const text = await response.text();

            // ส่งผลลัพธ์กลับ Discord
            await message.channel.send(text);

        } catch (error) {
            console.error('Error sending to GAS:', error);
            await message.channel.send('เกิดข้อผิดพลาดในการดึงข้อมูลบอส');
        }
    }
});

client.login(DISCORD_BOT_TOKEN);
