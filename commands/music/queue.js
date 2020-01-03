const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "music",
      memberName: "queue",
      description: "Skips the current playing song",
      guildOnly: true,
      format: ""
    });
  }
  async run(message, args) {
    const serverQueue = this.client.queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send("There is nothing playing.");
    return message.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Now playing:** ${serverQueue.songs[0].title}
		`);
  }
};
