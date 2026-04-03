const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { shop } = require('../../database')

module.exports = {
    data: new SlashCommandBuilder().setName('shop').setDescription('Retrieves all items from the shop'),
async execute(interaction) {
        const items = shop.retrieveItems.all();

        const shopEmbed = new EmbedBuilder()
            .setTitle('🛒 Item Shop')
            .setColor(0x00AE86)
            .setTimestamp();

        if (items.length === 0) {
            shopEmbed.setDescription('The shop is currently empty!');
        } else {
            items.forEach(item => {
                shopEmbed.addFields({
                    name: `Name: ${item.name} — 💰 ${item.price}`,
                    value: `Description: ${item.description}` || 'No description provided.',
                    inline: false
                });
            });
        }

        await interaction.reply({ embeds: [shopEmbed] });
    }
};