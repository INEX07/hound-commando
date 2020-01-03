const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "info",
      memberName: "invite",
      description: "Gives the bot invite links",
      clientPermissions: ["EMBED_LINKS"],
      aliases: ["inv"],
      guildOnly: true,
      format: ""
    });
  }
  async run(message) {
    const Embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Bot invite link")
      .addField(" ", " ")
      .addField(" ", " ")
      .addField(" ", " ");
    message.channel.send(Embed);
  }
};
