const {Command} = require('discord.js-commando');
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
let totalSeconds = (this.client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Uptime")
    //uptimes
  if(days > 1 && hours > 1 && minutes > 1){
  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`
  embed.setDescription(uptime)
  message.channel.send(embed)
    }else if(days == 1 && hours > 1 && minutes > 1){
  let uptime = `${days} day, ${hours} hours, and ${minutes} minutes`
  embed.setDescription(uptime)
message.channel.send(embed)
    }else if(days == 1 && hours == 1 && minutes > 1){
  let uptime = `${days} day, ${hours} hour, and ${minutes} minutes`
  embed.setDescription(uptime)
  message.channel.send(embed)
    }else if(days == 1 && hours == 1 && minutes == 1){
      let uptime = `${days} day, ${hours} hour, and ${minutes} minute`
embed.setDescription(uptime)
message.channel.send(embed)
      }else if(days == 0 && hours > 1 && minutes > 1){
        let uptime = `${hours} hours, and ${minutes} minutes`
embed.setDescription(uptime)
message.channel.send(embed)
        }else if(days == 0 && hours == 1 && minutes > 1){
          let uptime = `${hours} hour, and ${minutes} minutes`
embed.setDescription(uptime)
message.channel.send(embed)
          }else if(days == 0 && hours == 1 && minutes == 1){
            let uptime = `${hours} hour, and ${minutes} minute`
embed.setDescription(uptime)
message.channel.send(embed)
            }else if(days == 0 && hours == 0 && minutes > 1){
              let uptime = `${minutes} minutes`
embed.setDescription(uptime)
message.channel.send(embed)
              }else if(days == 0 && hours == 0 && minutes == 1){
                let uptime = `${minutes} minute`
embed.setDescription(uptime)
message.channel.send(embed)
                }else if(days == 0 && hours == 0 && minutes == 0){
                  let uptime = `Bot has just started up`
embed.setDescription(uptime)
message.channel.send(embed)
  }
    }}
