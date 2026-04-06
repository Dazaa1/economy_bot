const { SlashCommandBuilder, MessageFlags, flatten } = require('discord.js');
const { db } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('transfering coins to another use')
        .addUserOption(option => option.setName('target').setDescription('the target that you wanna transfer money to').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of coins to send').setRequired(true)),
    async execute(interaction) {
        const id = interaction.user.id;
        const coinsTransfered = interaction.options.getInteger('amount') || 0;
        const targetInformations = interaction.options.getUser('target');
        const target = db.getUser.get(targetInformations.id);
        const sender = db.getUser.get(id);

        // avoid sending transferring to self
        if (id === targetInformations.id) {
            return interaction.reply({
                content: 'You can\'t transfer coins to yourself!',
                flags: MessageFlags.Ephemeral
            })
        }
        
        // checking if the sender and target are registered in db
        if (!sender || !target) {
            await interaction.reply({
                content: 'Sorry but we can\'t transfert money right now try ``/work`` first!',
                flags: MessageFlags.Ephemeral
            });
        } else { // the sender is registered
            if (sender.coins < coinsTransfered) {
                return interaction.reply({
                    content: 'Not enough coins to transfer!',
                    flags: MessageFlags.Ephemeral
                });
            } else {
                db.removeCoins.run(coinsTransfered, id);
                db.addCoins.run(coinsTransfered, targetInformations.id);
                await interaction.reply({
                    content: `You have transferred **${coinsTransfered} coins** to ${targetInformations.globalName}`,
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
}