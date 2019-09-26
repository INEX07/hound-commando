const Commando = require('discord.js-commando');
const express = require("express");
const app = express()
const path = require('path');
const sqlite = require("sqlite");
const version = "V2.1.2"
const logs = '595315793743577088';
const {RichEmbed} = require("discord.js");

app.use(express.static('public'))
app.get("/", (request, response) => {
  response.sendStatus(200)
})
app.listen(process.env.PORT)

const client = new Commando.Client({ // import the data from your config file here for these fields.
    commandPrefix: "!!",
    owner: '571283749652660225',
    invite: "https://discord.gg/h2gVyNw",
    unknownCommandResponse: false,
});

client.registry // This is going to load everything in your new Commands folder.
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General'], // You can change these names/descriptions if you want
        ['moderation', 'Moderation'],
        ['other', 'Other'],
        ['info', 'Information Commands'],
        ['fun', 'Fun Commands'],
        ["settings", "Set some settings for your guild"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
            unknownCommand: false, //I disable this as it's bad practice to have a unknown command error on a discord bot.
        }) 
    .registerCommandsIn(path.join(__dirname, 'commands')); //Looks for and loads the 'Commands' folder.

client.on('ready', async () => { // Logs the bot on.
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity(`${version}: Github: Use for issues/suggestions | @HoundBot#8039 issues`, {type: "STREAMING"});
    //client.user.setStatus("idle");
  sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db)=>{
    client.setProvider(new Commando.SQLiteProvider(db))
    console.log("Connected to SQLite")
  })
});

client.on("guildMemberAdd", async member => {
  let joinEmbed = new RichEmbed()
  .setTitle("Welcome!")
  .setDescription(`Welcome ${member.user.tag} to the ${member.guild.name}`)
  .addBlankField()
  .setColor("#0099ff")
  .addField("ID?", member.user.id)
  .addField("Bot?", member.user.bot)
  .addField("Creation?", member.user.createdAt);
  
  
  if(member.guild.id == "626382608703684620"){
    member.guild.channels.get(c=>c.name == "welcome").send(joinEmbed)
  }
});
client.on("guildMemberRemove", member => {
  let leaveEmbed = new RichEmbed()
  .setTitle("Goodbye!")
  .setDescription(`${member.user.tag} just left the ${member.guild.name}`)
  .addBlankField()
  .setColor("#DE2020")
  .addField("ID?", member.user.id)
  .addField("Bot?", member.user.bot)
  .addField("How long?", (Date.now - member.joinedAt));
  
  if(member.guild.id == "626382608703684620"){
    member.guild.channels.find(c=>c.name == "welcome").send(leaveEmbed)
  }
});

client.on('error', console.error); //The error logger of course.


//bot joins a server
client.on("guildCreate", guild => {
  client.channels.get(logs).send(`__Bot has been added to server **${guild.name} (${guild.id})**__`)
  const owner = guild.owner
  owner.send(`Thanks for adding me to your server. If you need help for using my commands, start with ${client.commandPrefix}help. To see some information about me, use ${client.commandPrefix}info. If something has gone wrong or you would like to know more, contact my creators, ${client.users.get(client.owner).tag}`)
  client.guilds.find(g=>g.name == "Discord.Js Bot Creation").channels.find(c=>c.name.startsWith("Hound Guild Count:") && c.type == "voice").setName(`Hound Guild Count: ${client.guilds.size}`)
  
  const botCount = guild.members.filter(member=>member.user.bot).size
  const userCount = guild.members.filter(member=>!member.user.bot).size
  if(botCount > userCount){
    guild.leave()
    owner.send(`I am sorry to say that I have left your guild because there are more bots than users`)
  }
})
//bot leaves a server
client.on("guildDelete", guild => {
  client.channels.get(logs).send(`__Bot has been removed from server **${guild.name} (${guild.id})**__`)
  client.guilds.find(g=>g.name == "Discord.Js Bot Creation").channels.find(c=>c.name.startsWith("Hound Guild Count:") && c.type == "voice").setName(`Hound Guild Count: ${client.guilds.size}`)
})

client.login(process.env.TOKEN);
