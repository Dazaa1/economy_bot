const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { shop } = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('additem')
		.setDescription('Add Item to the shop')
		.addStringOption((option) => option.setName('name').setDescription('The item name').setRequired(true))
		.addIntegerOption((option) => option.setName('price').setDescription('The item price'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const price = interaction.options.getInteger('price');

        shop.updateShop.run({ name, price });
        await interaction.reply(`Add ${name} to the shop.`);
    }
}