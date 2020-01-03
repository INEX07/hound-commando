const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class issues extends Command {
  constructor(client) {
    super(client, {
      name: "issues",
      group: "info",
      memberName: "issues",
      description: "Report any issues/give some feedback/suggestions",
      clientPermissions: ["EMBED_LINKS"],
      aliases: ["suggest"],
      guildOnly: true,
      format: ""
    });
  }
  async run(message) {
    message.channel.send(
      "Thank you for wanting to suggest features, or report any bugs or issues\n> https://github.com/HoundBot-Studios/hound-commando"
    );
  }
};
