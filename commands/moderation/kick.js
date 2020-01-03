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
            format: "{USER_MENTION} [reason]"
        });
    }
    async run(message) {
    const args = message.content.slice(Kick.length).split(" ")
    const user = message.mentions.users.first() || this.client.users.fetch(args[1]);
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if(member.kickable){
       const rsn = args.slice(member.length)
       if(!rsn) rsn = "(No reason specified)"
          if(user.id == this.client.config.staff){
            return
          }else{
        member.kick(`${message.author.tag}: ${rsn}`)
        .then(() => {
          member.send(`You have been kicked from ${message.guild.name} for ${rsn}`)
          message.channel.send(`${message.author.username}successfully kicked ${member.user.tag} with reason: ${rsn}`)
        }).catch(err => {
          message.channel.send(`I cannot kick that member: **${err}**`)
        });
      }}else{
        message.channel.send('That member cannot be kicked')
      }}else {
        message.channel.send('That user isn\'t in this guild!');
      }
    } else {
      message.channel.send('You didn\'t mention the user to kick!');
    }
    }}
