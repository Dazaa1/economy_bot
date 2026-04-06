const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const { db } = require('../../database');



module.exports = {
    data: new SlashCommandBuilder().setName('leaderboard').setDescription('the top 5 richest in the server!'),
    async execute(interaction) {
        const users = db.getUsers.all()

        let result = users.sort((a, b) => a.coins - b.coins);

        result = result.reverse().slice(0, 5);
        console.log(result);
        const embed = new EmbedBuilder()
           .setColor(0x0099ff)
           .setTitle('Leader Board')
           .setDescription('The richest people on the server')
           result.map(el => {
             embed.addFields(
                {
                    name: `Username: ${el.username}`,
                    value: `${el.coins} coins`,
                    inline: false
                }
             )
            .setTimestamp()
            });
        interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        })
    }
}