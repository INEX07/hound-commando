const {Command, Client} = require("discord.js-commando")
const client = new Client();
const {MessageEmbed} = require("discord.js")

module.exports = class info extends Command {
  constructor(client){
    super(client, {
      name: "info",
      memberName: "info",
      description: "View some bot information",
      group: "info",
      guildOnly: true,
      aliases: ["binfo", "botinfo"]
    })
  }
  run(message){
    let embed = new MessageEmbed()
    .setTitle("Bot information")
    .setColor("#0099ff")
    .setThumbnail(this.client.user.displayAvatarURL())
    .addField("Tag", this.client.user.tag)
    .addField("ID", this.client.user.id, true)
    .addField("Shard Count", this.client.shard.count)
    message.channel.send(embed)
  }
}
