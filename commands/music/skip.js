const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      group: "music",
      memberName: "skip",
      description: "Skips the current playing song",
      guildOnly: true,
      format: ""
    });
  }
  async run(message, args) {
    const serverQueue = this.client.queue.get(message.guild.id);

    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel!");
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could skip for you."
      );
    serverQueue.connection.dispatcher.end("Skip command has been used!");
    return undefined;
  }
};
