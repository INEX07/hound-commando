const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class stop extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      group: "music",
      memberName: "stop",
      description: "Stop playing every song in the queue",
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
        "There is nothing playing that I could stop for you."
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
    return undefined;
  }
};
