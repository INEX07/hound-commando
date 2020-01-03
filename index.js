const Commando = require("discord.js-commando");
const express = require("express");
const app = express();
const config = require("./config.json");
const moment = require("moment");
const path = require("path");
const sqlite = require("sqlite");
const version = "V3.2.8";
const fs = require("fs");
const Discord = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const { Util, ShardingManager } = require("discord.js");
const DBL = require("dblapi.js");

app.use(express.static("Web"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/Web/index.html");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
var resolutions = require("./resolutions.json");
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();

const client = new Commando.Client({
  //Create a new instance of the Discord-Commando Client
  commandPrefix: config.commandPrefix,
  owner: config.owners,
  invite: "https://discord.gg/h2gVyNw",
  unknownCommandResponse: false
});
const dbl = new DBL(process.env.topGGtoken, client);

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["moderation", "Moderation"],
    ["other", "Other"],
    ["info", "Info"],
    ["fun", "Fun"],
    ["settings", "Settings"],
    ["updates", "Updates"],
    ["developers", "Developers"],
    ["music", "Music"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false
  })
  .registerCommandsIn(path.join(__dirname, "commands")); //Runs commands inside the "commands" base folder

client.on("ready", async () => {
  let activities = [
    `${version}: Sharding Setup`,
    `${client.commandPrefix}help to start`,
    `${client.guilds.size} servers`,
    `${client.users.size} users`
  ];
  let game = activities[Math.floor(Math.random() * activities.length)];
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`); //log when the bot is ready to be used

  setInterval(() => {
    client.user.setActivity(game, {
      type: "STREAMING",
      url: "https://twitch.tv/satinpepper666"
    });
  }, 20000);

  sqlite.open(path.join(__dirname, "settings.sqlite3")).then(db => {
    client.setProvider(new Commando.SQLiteProvider(db)); //set the database provider (sqlite) for commando to use
  });

  dbl
    .postStats(client.guilds.size)
    .then(console.log("Top.gg: Guild Count posted"));

  client.config = config; //these allow me to access these defined terms (config, Commando and Discord) during eval as client
  client.Commando = Commando; //is a globally defined term
  client.Discord = Discord;
  client.sqlite = sqlite;
  client.youtube = youtube;
  client.queue = queue;
});

client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;

  const args = message.content
    .slice(message.guild.commandPrefix)
    .trim()
    .split(/ +/g);

  if (message.content.includes(`<@!${client.user.id}>`)) {
    message.channel.send(
      `My prefix on this guild is \`${message.guild.commandPrefix}\``
    );
  }
});

client.on("providerReady", provider => {
  console.log(`Successfully connected with ${provider}`);
  this.client.channels
    .get("626673902902575134")
    .send(`Successfully connected with provider **${provider}**`);
});

client.on("guildCreate", guild => {
  guild.owner.send(
    `Thanks for adding me to your server. If you need help for using my commands, start with ${
      guild.commandPrefix
    }help. To see some information about me, use ${
      guild.commandPrefix
    }info. If something has gone wrong or you would like to know more, contact my creators, ${
      client.users.get(client.config.owners[0]).tag
    } or use the ${client.commandPrefix}issues command`
  );
  let embed = new Discord.MessageEmbed()
    .setTitle("Guild Joined")
    .setColor("#32cd32")
    .setDescription(`Bot has joined guild ${guild.name}`)
    .addField("Owner", `${guild.owner.user.tag}, ${guild.owner.id}`)
    .addField("ID", guild.id)
    .addField("Member Count", guild.memberCount);
  client.channels.get("626673902902575134").send(embed); //log (In HoundBot Studios) when another guild is joined
});

client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
    .setTitle("Guild Left")
    .setColor("#ff0000")
    .setDescription(`Bot has left guild ${guild.name}`)
    .addField("Owner", `${guild.owner.user.tag}, ${guild.owner.id}`)
    .addField("ID", guild.id)
    .addField("Member Count", guild.memberCount);
  client.channels.get("626673902902575134").send(embed); //log (In HoundBot Studios) when a guild is left
});

client.on("commandRun", (command, promise, message) => {
  client.channels
    .get("626673902902575134")
    .send(
      `**${command.name}** was just run in **${message.channel.name}** (ID: ${message.channel.id}) in guild **${message.guild.name}** (ID: ${message.guild.id}) by **${message.author.tag}** (ID: ${message.author.id}): \`\`\`${message.content}\`\`\``
    ); //log (In HoundBot Studios) when a command is executed
});

client.on("error", error => {
  console.error(error.stack);
  client.channels
    .get("633699447821303899")
    .send(`An error has occurred: ${error.stack}`);
});

client.on("commandError", (command, error, message) => {
  message.reply(`There was an error running that command; ${error}`);

  console.error(error.stack);
  client.channels
    .get("633699447821303899")
    .send(
      `**${command.name}** ouputed an error in **${message.guild.name}** (ID: ${message.guild.id})\nError: \`\`\`${error}\`\`\` Message Content: \`\`\`${message.content}\`\`\``
    ); //log (In HoundBot Studios) when a command draws an error
});

//---------------Logging Events--------------------//

/*client.on("messageDelete", async message => {
  if(client.provider.get(message.guild, "delete") != undefined){
  let embed = new Discord.MessageEmbed()
  .setTitle("Message Deleted")
  .setColor("#ff0000")
  .addField("Message Content", message.content)
  .setDescription(`Deleted in ${message.channel}. Sent by ${message.author}`)
  message.guild.channels.find(c=>c.name == client.provider.get(message.guild, "delete")).send(embed)
  }
})

client.on("messageDeleteBulk", async messages => {
  if(client.provider.get(messages.first().guild, "delete") != undefined){
    let embed = new Discord.MessageEmbed()
    .setTitle("Message Bulk Delete")
    .setColor("#ff0000")
    .addField("Message Contents", messages.map(m=>m.content).join("\n\n"))
    .addField("Messages Sent By", messages.map(m=>m.author.tag).join("\n\n"), true)
    .setDescription(`Deleted in ${messages.first().channel}`)
    messages.first().guild.channels.find(c=>c.name == client.provider.get(messages.first().guild, "delete")).send(embed)
  }
})

client.on("guildMemberAdd", member => {
  if(!member.user.bot){
    if(client.provider.get(member.guild, "join") != undefined){
      let embed = new Discord.MessageEmbed()
      .setTitle("New Member")
      .setColor("#32cd32")
      .setThumbnail(member.user.displayAvatarURL)
      .addField("User", member.user.tag)
      .addField("Created At", member.user.createdAt)
      .setTimestamp()
      member.guild.channels.find(c=>c.name == client.provider.get(member.guild, "join")).send(embed)
    }}else if(member.user.bot && member.guild.id == "631548201584820227"){
      member.addRole(member.guild.roles.find("name", "In-Testing(Bot)"))
  }
})

client.on("guildBanAdd", (guild, user) => {
  if(client.provider.get(guild, "modLogs") != undefined){
  let embed = new Discord.MessageEmbed()
  .setTitle("Banned")
  .setColor("#32cd32")
  .addField("User Tag", user.tag)
  .addField("User ID", user.id, true)
    guild.channels.find(c=>c.name == client.provider.get(guild, "modLogs")).send(embed)
  }
})

client.on("guildBanRemove", (guild, user) => {
  if(client.provider.get(guild, "modLogs") != undefined){
  let embed = new Discord.MessageEmbed()
  .setTitle("Unbanned")
  .setColor("#ff0000")
  .addField("User Tag", user.tag)
  .addField("User ID", user.id, true)
  .addField("Unbanned For", user)
  guild.channels.find(c=>c.name == client.provider.get(guild, "modLogs")).send(embed)
  }
})*/

client.on("commandBlocked", (message, reason) => {
  message.channel.send(
    `This command has been prevented from running in this server; ${reason}`
  );

  client.channels
    .get("626673902902575134")
    .send(
      `**${message.command.name}** has been prevented from running in **${message.guild.name}** because: ***${reason}***`
    );
});

//---------------------MUSIC RELATED FUNCTIONS------------------------//

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        `✅ **${song.title}** has been added to the queue!`
      );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

client.login(process.env.TOKEN);
