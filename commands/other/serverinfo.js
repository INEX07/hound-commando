const {Command, Client} = require('discord.js-commando');
const client = new Client();
const {MessageEmbed} = require("discord.js");

module.exports = class serverinfo extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'other',
            memberName: 'serverinfo',
            description: 'Shows some server information',
            guildOnly: true,
            aliases: ["guildinfo", "server-info", "guild-info", "servinfo", "serv-info"],
            format: ""
        });
    }
    run(message) {
  const members = message.guild.memberCount
  const users = message.guild.members.filter(m=>!m.user.bot).size
  const bots = message.guild.members.filter(b=>b.user.bot).size
  
  var nitroCount = message.guild.premiumSubscriptionCount
  if(nitroCount == null) nitroCount = 0
  
  const Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(message.guild.name)
  .setThumbnail(message.guild.iconURL())
  .addField('Server ID', message.guild.id)
  .addField('Server Owner', message.guild.owner.user.tag, true)
  .addField('Size', `${members} members | ${users} users | ${bots} bots`)
  .addField('Region', message.guild.region)
  .addField('Verification', message.guild.verificationLevel)
  .addField('Joined at', `${message.guild.joinedAt}`, true)
  .addField('Created At', `${message.guild.createdAt}`)
  .addField("Nitro Boost Tier", message.guild.premiumTier, true)
  .addField("Nitro Boosters Count", nitroCount)
  .addField("Shard ID", message.guild.shardID)
  .setTimestamp()
  .setFooter(`Requested by ${message.author.tag}`)
  message.channel.send(Embed)
    }}
