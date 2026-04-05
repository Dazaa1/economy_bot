const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { inventory } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder().setName('inventory').setDescription('View your inventory'),
    async execute(interaction) {
        const id = interaction.user.id;
        const userInventory = inventory.getInventory.all(id);
        
        console.log(userInventory);
        if (userInventory.length === 0) {
            return await interaction.reply({ 
                content: "Your inventory is currently empty! Go buy something from the shop.", 
                ephemeral: true 
            });
        }

        const inventoryEmbed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Inventory`)
            .setColor(0x00AE86) // A nice teal color
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp();

        
        const fields = userInventory.map(item => ({
            name: `📦 ${item.itemName}`,
            value: `*${item.description}*\n**Quantity:** \`${item.quantity}\``,
            inline: true // This puts items side-by-side if there's room
        }));

        inventoryEmbed.addFields(fields);
        await interaction.reply({ embeds: [inventoryEmbed] });
    }
}