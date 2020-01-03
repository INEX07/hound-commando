const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class setrole extends Command {
  constructor(client) {
    super(client, {
      name: "setrole",
      memberName: "setrole",
      description: "Set a role for a specific function in this server",
      group: "settings",
      guildOnly: true,
      userPermissions: ["MANAGE_GUILD"]
    });
  }
  run(message) {
    const args = message.content.slice(setrole.length).split(" ");
    if (args[1]) {
      let option;
      let options = ["muted"]
      if(options.includes(args[1].toLowerCase()))option = args[1].toLowerCase()
      if (message.mentions.roles.first()) {
        this.client.provider.set(message.guild, option, message.mentions.roles.first().id)
        message.channel.send(`Successfully set the \`${option}\` option to \`${message.guild.roles.fetch(message.mentions.roles.first().id).name}\``)
      }else{
        help()
      }
    } else {
      help()
    }
    
    function help() {
      let embed = new Discord.MessageEmbed()
        .setTitle(`Setrole Help`)
        .setThumbnail(message.guild.iconURL())
        .setColor("#0099ff")
        .addField(
          "Usage:", ` \`${message.guild.commandPrefix}setrole [option] [setting]\``
        )
        .setDescription(`Options:\n:white_check_mark: muted`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`);
      message.channel.send(embed);
    }
  }
};
