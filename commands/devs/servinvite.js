const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");

module.exports = class servinvite extends Command {
    constructor(client) {
        super(client, {
            name: 'servinvite',
            group: 'developers',
            memberName: 'servinvite',
            description: 'Get an invite to the selected server- Owner only',
            aliases: ["sinvite", "servinv"],
            ownerOnly: true,
            guildOnly: true,
            format: "{id}"
        });
    }
    run(message) {
      const args = message.content.slice(servinvite.length).split(" ")
      this.client.guilds.get(args[1]).fetchInvites()
    .then(invites => message.author.send(`For server **${message.guild.name}**, found Invites:\nhttps://discord.gg/${invites.map(invite => invite.code).join('\nhttps://discord.gg/')}`))
    }
  }
