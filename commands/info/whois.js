const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "whois",
      group: "info",
      memberName: "whois",
      description: "Find info about a user or guild member - works using, mention, tag, username or id",
      clientPermissions: ["EMBED_LINKS"],
      aliases: ["userinfo"],
      guildOnly: true,
      format: "{USERNAME/USER_TAG/USER_ID/blank}"
    });
  }
  async run(message) {
    const args = message.content.slice(whois.length).split(" ")
    var user =
      this.client.users.fetch(args[1]) ||
           message.mentions.users.first()
    var member = message.guild.member(user);
    const embed = new Discord.MessageEmbed();

    if (member) {
      embed
        .setAuthor(`${member.user.username}`)
        .setTitle("User Info")
        .setThumbnail(member.user.displayAvatarURL())
        .addField("Tag", member.user.tag)
        .addField("User ID", member.user.id)
        .addField("Status", member.user.presence.status)
        .addField("Created At", `${member.user.createdAt}`)
        .addField("Joined At", `${member.joinedAt}`)
        .addField(
          "Roles List",
          member.roles
            .filter(r => r.name !== "@everyone")
            .map(r => r)
            .join(", ")
        )
        .setColor("#0099ff");
      message.channel.send(embed)
    } else if (user) {
      embed
        .setAuthor(user.username)
        .setTitle("User Info")
        .setThumbnail(user.displayAvatarURL())
        .addField("Tag", user.tag)
        .addField("ID", user.id)
        .addField("Created At", user.createdAt)
        .setColor("#0099ff")
        .setFooter("User not found in this guild - showing basic user information")
      message.channel.send(embed)
    } else {
      embed.setAuthor(message.author.username)
        .setTitle("User Info")
        .setThumbnail(message.author.displayAvatarURL())
        .addField("Tag", message.author.tag)
        .addField("User ID", message.author.id)
        .addField("Status", message.author.presence.status)
        .addField("Created At", `${message.author.createdAt}`)
        .addField("Joined At", `${message.member.joinedAt}`)
        .addField(
          "Roles List",
          message.member.roles
            .filter(r => r.name !== "@everyone")
            .map(r => r)
            .join(", ")
        )
        .setColor("#0099ff")
        .setFooter("User not specified - Displaying message author information")
      message.channel.send(embed);
    }
  }
};
