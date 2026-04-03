const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { shop } = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('additem')
		.setDescription('Add Item to the shop')
		.addStringOption((option) => option.setName('name').setDescription('The item name').setRequired(true))
		.addStringOption((option) => option.setName('description').setDescription('Information about the item').setRequired(true))
        .addIntegerOption((option) => option.setName('price').setDescription('The item price'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');

        const price = interaction.options.getInteger('price') ?? 0;

        try {
            shop.updateShop.run({ name, price, description });
            await interaction.reply(`Added **${name}** to the shop.`);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: "Failed to add item to database.", ephemeral: true });
        }
    }
}