const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");

module.exports = class servinvite extends Command {
    constructor(client) {
        super(client, {
            name: 'servinvite',
            group: 'other',
            memberName: 'servinvite',
            description: 'Get an invite to the selected server- Owner only',
            aliases: ["sinvite"]
        });
    }
    run(message) {
      const args = message.argString
if(message.author.id == client.owner){
      client.guilds.get(args.join(" ")).fetchInvites()
    .then(invites => message.author.send('Found Invites:\nhttps://discord.gg/' + invites.map(invite => invite.code).join('\nhttps://discord.gg/')))
    .catch(console.error)
    .catch(err => message.channel.send(`Error; ${err}`))
    }
    }}
