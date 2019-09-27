const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");

module.exports = class whois extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            group: 'info',
            memberName: 'whois',
            description: 'Find info about a guild member',
            clientPermissions: ["EMBED_LINKS"],
        });
    }
    run(message) {
const args = message.argString
const user = message.mentions.members.first() || message.guild.members.find(m=>m.user.id || m.user.tag || m.user.username == args[0]);
    if(user){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.user.username}`)
      .setTitle('User Info')
      .setThumbnail(user.user.avatarURL)
      .addField('User\'s Username and Tag', user.user.tag)
      .addField('User ID', user.id)
      .addField('Created At', `${user.user.createdAt}`)
      .addField('Joined At', `${user.joinedAt}`)
      .setColor('#0099ff')
      message.channel.send(embed)
    }else{
      message.channel.send('Please mention a user to find information about!')
    }
    }}
