const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class serverinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'other',
            memberName: 'serverinfo',
            description: 'Shows some server information',
            guildOnly: true,
            aliases: ["sinfo"]
        });
    }
    run(message) {
  const members = message.guild.memberCount
  const users = message.guild.members.filter(m=>!m.user.bot).size
  const bots = message.guild.members.filter(b=>b.user.bot).size
  const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(message.guild.name)
  .setThumbnail(message.guild.iconURL)
  .addField('Server ID', message.guild.id)
  .addField('Server Owner', message.guild.owner)
  .addField('Size', `${members} members | ${users} users | ${bots} bots`)
  .addField('Region', message.guild.region)
  .addField('Verification', message.guild.verificationLevel)
  .addField('Joined at', `${message.guild.joinedAt}`)
  .addField('Created At', `${message.guild.createdAt}`)
  .setTimestamp()
  .setFooter(`Requested by ${message.author.tag}`)
  message.say(Embed)
    }}
