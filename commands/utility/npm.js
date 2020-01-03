const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");
const moment = require("moment");

module.exports = class npm extends Command {
  constructor(client) {
    super(client, {
      name: "npm",
      memberName: "npm",
      description: "Search for an NPM package",
      group: "util",
      format: "{package_name}",
      args: [
        {
          key: "packageName",
          prompt: "Please provide a package name to search for",
          type: "string"
        }
      ]
    });
  }
  async run(message, { packageName }) {
    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .split(" ");
    const trimArray = arr => {
      if (arr.length > 10) {
        const len = arr.length - 10;
        arr = arr.slice(0, 10);
        arr.push(`${len} more`);
      }
      return arr;
    };
    if (packageName) {
      const pkg = encodeURIComponent(packageName);
      try {
        var res = await get(`https://registry.npmjs.org/${pkg}`);
      } catch (err) {
        return message.channel.send(`Package not found`);
      }
      const { data: body } = res;
      if (body.time.unpublished)
        return message.channel.send(`This package has been unpublished`);

      const version = body.versions[body["dist-tags"].latest];
      const maintainers = trimArray(body.maintainers.map(user => user.name));
      const dependencies = version.dependencies
        ? trimArray(Object.keys(version.dependencies))
        : null;

      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(body.name)
        .setURL(`https://npmjs.org/package/${pkg}`)
        .setDescription(body.description || "No more information given")
        .addField("Version", body["dist-tags"].latest)
        .addField("License", body.license)
        .addField(
          "Author",
          body.author ? body.author.name : "??? Unknown Author ???"
        )
        .addField(
          "Creation Date",
          moment.utc(body.time.created).format("MMMM Do YYYY, h:mm:ss a")
        )
        .addField(
          "Modified At",
          moment.utc(body.time.modified).format("MMMM Do YYYY, h:mm:ss a")
        )
        .addField("Main File", version.main || "index.js")
        .addField(
          "Dependencies",
          dependencies && dependencies.length ? dependencies.join(", ") : "None"
        )
        .setFooter(
          `Thanks to ${
            this.client.users.get("542058542853521461").tag
          } for letting me use this command`
        );
      message.channel.send(embed);
    }
  }
};
