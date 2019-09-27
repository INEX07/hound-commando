const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class avatar extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'fun',
            memberName: 'avatar',
            description: 'Sends a user\'s avatar, your own if no user specified',
            clientPermissions: ["EMBED_LINKS"],
        });
    }
    run(message) {
      const args = message.argString
      if(args){
      let user = client.users.get(args[0]) || message.mentions.users.first() || client.users.find(u=>u.username || u.tag == args[0]);
const formats = ['webp', 'png', 'jpg'];
        const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
        if (format === 'gif') formats.push('gif');
        const embed = new Discord.MessageEmbed()
            .setTitle(user.tag)
            .setDescription(
                formats.map(fmt => `[${fmt.toUpperCase()}](${user.displayAvatarURL({ format: fmt, size: 2048 })})`).join(' | ')
            )
            .setImage(user.displayAvatarURL({ format, size: 2048 }))
            .setColor(0x00AE86);
        return message.channel.send(embed);
    }else if(!args){
      let user = message.author
      const formats = ["webp", "png", "jpg"]
      const format = user.avatar && user.avatar.startsWith("a_") ? "gif" : "png"
      if(format === "gif") formats.push("gif")
      const embed = new Discord.MessageEmbed()
      .setTitle(user.tag)
      .setDescription(
        formats.map(fmt=>`[${fmt.toUpperCase()}](${user.displayAvatarURL({format: fmt, size: 2048})})`).join(" | ")
        )
      .setImage(user.displayAvatarURL({format, size: 2048}))
      .setColor(0x00AE86)
      return message.say(embed)
    }}}
