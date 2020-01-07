const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      group: "music",
      memberName: "loop",
      description: "Loops the current playing song or queue.",
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
        "There is nothing playing that I could loop for you."
      );
    if (serverQueue.loop === false) {
      serverQueue.loop = true;
      message.channel.send("Loop Enabled!");
    } else {
      serverQueue.loop = false;
      message.channel.send("Loop disabled!");
    }
    return undefined;
  }
};
