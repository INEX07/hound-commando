const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");

module.exports = class uptime extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'info',
            memberName: 'uptime',
            description: 'Shows the bot\s uptime',
            clientPermissions: ["EMBED_LINKS"],
        });
    }
    run(message) {
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
    //uptimes
  if(days > 1 && hours > 1 && minutes > 1){
  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Uptime")
  .setDescription(uptime)
  message.channel.send(embed)
    }else if(days == 1 && hours > 1 && minutes > 1){
  let uptime = `${days} day, ${hours} hours, and ${minutes} minutes`
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Uptime")
  .setDescription(uptime)
message.channel.send(embed)
    }else if(days == 1 && hours == 1 && minutes > 1){
  let uptime = `${days} day, ${hours} hour, and ${minutes} minutes`
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Uptime")
  .setDescription(uptime)
  message.channel.send(embed)
    }else if(days == 1 && hours == 1 && minutes == 1){
      let uptime = `${days} day, ${hours} hour, and ${minutes} minute`
      const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
      }else if(days == 0 && hours > 1 && minutes > 1){
        let uptime = `${hours} hours, and ${minutes} minutes`
        const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
        }else if(days == 0 && hours == 1 && minutes > 1){
          let uptime = `${hours} hour, and ${minutes} minutes`
          const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
          }else if(days == 0 && hours == 1 && minutes == 1){
            let uptime = `${hours} hour, and ${minutes} minute`
            const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
            }else if(days == 0 && hours == 0 && minutes > 1){
              let uptime = `${minutes} minutes`
              const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
              }else if(days == 0 && hours == 0 && minutes == 1){
                let uptime = `${minutes} minute`
                const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
                }else if(days == 0 && hours == 0 && minutes == 0){
                  let uptime = `Bot has just started up`
                  const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
.setDescription(uptime)
message.channel.send(embed)
  }
    }}
