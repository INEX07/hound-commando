const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class np extends Command {
  constructor(client) {
    super(client, {
      name: "np",
      group: "music",
      memberName: "np",
      description: "Show what song is currently playing",
      guildOnly: true,
      format: ""
    });
  }
  async run(message, args) {
    const serverQueue = this.client.queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send("There is nothing playing.");
    return message.channel.send(
      `🎶 Now playing: **${serverQueue.songs[0].title}**`
    );
  }
};
