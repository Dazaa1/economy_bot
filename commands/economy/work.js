const { SlashCommandBuilder } = require('discord.js');
const db = require("../../database.js")


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    cooldown: 1800,
    data: new SlashCommandBuilder().setName("work").setDescription("Earn coins"),
    async execute(interaction) {
        const { id, username } = interaction.user;

        db.db.upsertUser.run({ id, username });
        const coinsEarned = getRandomIntInclusive(10, 100);
        
        db.db.addCoins.run(coinsEarned, id);
        const updatedUser = db.db.getUser.get(id);

        await interaction.reply(
            `You worked and earned **${coinsEarned} coins**!\n` +
            `Your new balance: **${updatedUser.coins} coins**`
        );
    }
};