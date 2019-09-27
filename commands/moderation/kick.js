const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick a member from your server',
            clientPermissions: ["KICK_MEMBERS"],
            guildOnly: true,
        });
    }
    async run(message, logs) {
      const args = message.argString
      if(message.member.permissions.has("KICK_MEMBERS")){
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if(member.kickable){
       const rsn = args.slice(1).join(" ")
       if(!args[1]) rsn = "(No reason specified)"
        await member.kick(`${message.author.tag}: ${rsn}`)
        .then(() => {
          member.send(`You have been kicked from ${message.guild.name} for ${rsn}`)
          message.say(`<:ServerPolice:622566234898300928> Server Police successfully kicked ${member.user.tag} with reason: ${rsn}`)
          client.channels.get(logs).send(`__${message.author.tag} (${message.author.id}) just kicked ${member.user.tag} (${member.id}) from server ${message.guild.name} (${message.guild.id}) because ${rsn}__`)
        }).catch(err => {
          message.channel.send(`I cannot kick that member: **${err}**`).then;
          client.channels.get(logs).send(`Error; ${message.guild.name} (${message.guild.id}), kick command: ${err}`);
        });
      }else{
        message.reply('<:ServerPolice:622566234898300928> That member cannot be kicked')
      }}else {
        message.reply('<:ServerPolice:622566234898300928> That user isn\'t in this guild!');
      }
    } else {
      message.reply('<:ServerPolice:622566234898300928> You didn\'t mention the user to kick!');
    }
    }else {
      message.reply('You are not able to use this command')
      client.channels.get(logs).send(`__${message.author.tag} (${message.author.id}) tried to use the 'Kick' command but does not have access__ in ${message.guild.name} (${message.guild.id})`)
    }
    }}
