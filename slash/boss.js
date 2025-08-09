const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL || "YOUR_GAS_WEBAPP_URL";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("เวลาบอสทั้งหมด")
    .setDescription("แสดงเวลาการเกิดของบอสทั้งหมด"),
  run: async ({ client, interaction }) => {
    await interaction.deferReply();

    try {
      const response = await fetch(GAS_WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "เวลาบอสทั้งหมด" }),
      });

      const text = await response.text();

      // สร้าง embed แสดงผลลัพธ์
      const embed = new MessageEmbed()
        .setTitle("เวลาบอสทั้งหมด")
        .setDescription(text)
        .setColor("BLUE");

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching boss times:", error);
      await interaction.editReply("เกิดข้อผิดพลาดในการดึงข้อมูลบอส");
    }
  },
};
