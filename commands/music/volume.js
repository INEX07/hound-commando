const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      group: "music",
      memberName: "volume",
      description: "Change the music volume",
      guildOnly: true,
      format: ""
    });
  }
  async run(message, args) {
    const serverQueue = this.client.queue.get(message.guild.id);

    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel!");
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    if (!args[1])
      return message.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    serverQueue.volume = parseInt(args);
    if(serverQueue.volume > 10 || serverQueue.volume < 0) serverQueue.volume = 5
    serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    return message.channel.send(`I set the volume to: **${serverQueue.volume}**`);
  }
};
