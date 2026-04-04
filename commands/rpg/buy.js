const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ComponentType} = require('discord.js');
const { shop, inventory, db } = require('../../database');


module.exports = {
    data: new SlashCommandBuilder().setName('buy').setDescription('Buying an item from the shop'),
    async execute(interaction) {
        const { id, username } = interaction.user;
        const values = shop.retrieveItems.all();
        const itemPurchase = new StringSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setPlaceholder('Make a selection!')
            .addOptions(
                values.map(value => 
                    new StringSelectMenuOptionBuilder()
                        .setLabel(value.name)
                        .setDescription(value.description)
                        .setValue(value.name)
                )

            );
        // Adding a string select menu to an action row
		const row = new ActionRowBuilder().addComponents(itemPurchase);
		// Reply with the action row
		const reply = await interaction.reply({
			content: 'Choose your starter!',
			components: [row],
		});

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60_000,
        });

        collector.on('collect', async (interaction) => {
            console.log(interaction.values[0]);
            const element = shop.retrieveItem.get(interaction.values[0]);
            console.log(element);

            const owner = db.getUser.get(id);
            if (owner.coins < element.price) {
                await interaction.update({
                    content: `You don't have enough coins to buy a **${element.name}**!`,
                    components: [] // Remove the menu after purchase
                });
                return;
            }
            

            db.removeCoins.run(element.price, id);
            inventory.addItem.run({ owner: id, itemName: element.name, description: element.description, quantity: 1 });

            await interaction.update({
                content: `You successfully bought a **${element.name}**!`,
                components: [] // Remove the menu after purchase
            });
        });
        
        
    }
}