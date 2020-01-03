const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "music",
      memberName: "play",
      description: "Play a song",
      guildOnly: true,
      format: "{song name/url}"
    });
  }
  async run(message, args) {
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    const voiceChannel = message.member.voiceChannel;
    const handleVideo = this.client.handleVideo;
    const searchString = args.slice(1);

    if (!voiceChannel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      return message.channel.send(
        "I cannot connect to your voice channel, make sure I have the proper permissions!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send(
        "I cannot speak in this voice channel, make sure I have the proper permissions!"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await this.client.youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await client.youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
      return message.channel.send(
        `Playlist: **${playlist.title}** has been added to the queue!`
      );
    } else {
      try {
        var video = await this.client.youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await this.client.youtube.searchVideos(searchString, 10);
          let index = 0;
          message.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}

Please provide a value to select one of the search results ranging from 1-10.
					`);
          try {
            var response = await message.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 30000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return message.channel.send(
              "No or invalid value entered, cancelling video selection."
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await this.client.youtube.getVideoByID(
            videos[videoIndex - 1].id
          );
        } catch (err) {
          console.error(err);
          return message.channel.send(
            "I could not obtain any search results."
          );
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
  }
};
