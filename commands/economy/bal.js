const { SlashCommandBuilder } = require('discord.js');
const db = require("../../database.js")


module.exports = {
    data: new SlashCommandBuilder().setName("bal").setDescription("Command exectuted to view balance"),
    async execute(interaction) {
        const { id, username } = interaction.user;

        db.upsertUser.run({ id, username });

        const user = db.getUser.get(id);

        await interaction.reply(
            `Your balance: **${user.coins} coins**`
        )
    }
};