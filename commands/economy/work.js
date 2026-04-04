const { SlashCommandBuilder } = require('discord.js');
const db = require("../../database.js")


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    data: new SlashCommandBuilder().setName("work").setDescription("Earn coins"),
    async execute(interaction) {
        const { id, username } = interaction.user;

        // 1. Ensure user exists
        db.db.upsertUser.run({ id, username }); // Note: you exported as { db: db }, so it might be db.db depending on your require

        const coinsEarned = getRandomIntInclusive(10, 100);
        
        // 2. Perform the update first
        db.db.addCoins.run(coinsEarned, id);

        // 3. Get the FRESH data from the database
        const updatedUser = db.db.getUser.get(id);

        await interaction.reply(
            `You worked and earned **${coinsEarned} coins**!\n` +
            `Your new balance: **${updatedUser.coins} coins**`
        );
    }
};