const {Command, Client} = require('discord.js-commando');
const client = new Client()
const Discord = require('discord.js');

module.exports = class FCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'f',
            aliases: ['respect', 'respects', 'rip'],
            group: 'fun',
            memberName: 'f',
            guildOnly: true,
            description: 'Press F to pay respects',
            format: "{blank/text}",
            throttling: {
              usages: 1,
              duration: 10
            }
        });
    }

    run(message, args) {
        if (!args) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter(`Press F to pay your respects.\n Thanks to ${this.client.users.fetch("151521088956792833").tag} for letting me use this`);
            message.channel.send({
                embed
            }).then(m => m.react("🇫"));

            return;

        } else if(args){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL())
                .setColor('RANDOM')
                .setDescription(`${message.author} has paid their respects to ${args}`)
                .setFooter(`Press F to pay your respects.\n Thanks to ${this.client.users.fetch("151521088956792833").tag} for letting me use this`);
            message.channel.send({
                embed
            }).then(m => m.react("🇫"));

            return;
        }
    }
}
