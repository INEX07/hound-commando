const {Command, Client} = require("discord.js-commando")
const client = new Client()
const Discord = require("discord.js")

module.exports = class panel extends Command {
  constructor(client){
    super(client, {
      name: "panel",
      memberName: "panel",
      description: "View all of the current guild settings",
      group: "settings",
      guildOnly: true,
      format: "",
      ownerOnly: true
    })
  }
  async run(message){
    var modLogs = this.client.provider.get(message.guild, "modLogs")
    if(modLogs == undefined) modLogs = "None Set"
    var deleteLogs = this.client.provider.get(message.guild, "delete")
    if(deleteLogs == undefined) deleteLogs = "None Set"
    var joinLogs = this.client.provider.get(message.guild, "join")
    if(joinLogs == undefined) joinLogs = "None Set"
    var muteRole = this.client.provider.get(message.guild, "muted")
    if(muteRole == undefined) muteRole = "None Set"
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`Guild Settings Panel for ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL)
    .setColor("#0099ff")
    .addField("ModLogs Channel", (message.guild.channels.resolve(modLogs).name || modLogs))
    .addField("Message Delete Channel", (message.guild.channels.resolve(deleteLogs).name || deleteLogs))
    .addField("Member Join Channel", (message.guild.channels.resolve(joinLogs).name || joinLogs))
    .addField("Mute Role", (message.guild.roles.resolve(muteRole).name || muteRole))
    message.channel.send(embed)
  }
}
