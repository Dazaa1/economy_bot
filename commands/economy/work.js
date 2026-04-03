const { SlashCommandBuilder } = require('discord.js');
const db = require("../../database.js")


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    data: new SlashCommandBuilder().setName("work").setDescription("Command exectuted to earn coins"),
    async execute(interaction) {
        const { id, username } = interaction.user;

        db.upsertUser.run({ id, username });

        const coinsEarned = getRandomIntInclusive(200, 1000);
        db.addCoins.run(coinsEarned, id);
        const user = db.getUser.get(id);

        await interaction.reply(
            `You worked and earned **${coinsEarned} coins**!\n` +
      `Your balance: **${user.coins} coins**`
        )
    }
};