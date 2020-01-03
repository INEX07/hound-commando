const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");

module.exports = class avatar extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'fun',
            memberName: 'avatar',
            description: 'Sends a user\'s avatar, your own if no user specified',
            clientPermissions: ["EMBED_LINKS"],
            guildOnly: true,
            format: "{USER_ID/USER_MENTION/blank}"
        });
    }
    run(message) {
      const args = message.content.slice(avatar.length).split(" ")
      if(args[1]){
      let user = this.client.users.fetch(args[1]) || message.mentions.users.first()
        const embed = new Discord.MessageEmbed()
            .setTitle(user.tag)
            .setImage(user.displayAvatarURL())
            .setColor("#0099ff");
        message.channel.send(embed);
    }else if(!args[1]){
      let user = message.author
      const embed = new Discord.MessageEmbed()
      .setTitle(user.tag)
      .setImage(user.displayAvatarURL)
      .setColor("#0099ff");
      message.channel.send(embed);
    }}}
