const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const client = new Client();
const { get } = require("axios");

const sources = [
  "stable",
  "master",
  "rpc",
  "commando",
  "akairo",
  "akairo-master",
  "11.5-dev"
];

module.exports = class djs extends Command {
  constructor(client) {
    super(client, {
      name: "djs",
      memberName: "djs",
      group: "util",
      description: "Search the Discord.Js Documentation",
      format: "{search_query} (source)",
      args: [
        {
          key: "query",
          prompt: "Enter a query to search for",
          type: "string"
        }
      ]
    });
  }
  async run(message, { query, srcs }) {
    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .split(" ");
    if (query) {
      let source = sources.includes(args[args.length - 1])
        ? args.pop()
        : "stable";
      if (source == "11.5-dev")
        source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
      const { data } = await get(`https://djsdocs.sorta.moe/v2/embed`, {
        params: { src: source, q: query }
      });
      const embed = new MessageEmbed(data)
        .setTitle("Discord.Js Documentation")
        .setFooter(
          `Thanks to ${
            this.client.users.get("542058542853521461").tag
          } for letting me use this command`
        );
      message.channel.send({ embed: embed });
    }
  }
};
