const {Command} = require("discord.js-commando")

module.exports = class restart extends Command{
  constructor(client){
    super(client, {
      name: "restart",
      memberName: "restart",
      group: "developers",
      description: "Restart the bot",
      hidden: true,
      guildOnly: true,
      ownerOnly: true,
      aliases: ["reset"]
    })
  }
  run(message){
    const client = this.client
    client.user.setActivity("restarting.....", {type: "PLAYING"})
    client.user.setStatus("dnd")
    message.channel.send("Bot is restarting now....")
    client.destroy()
    client.login(process.env.TOKEN)
    message.channel.send("Bot has successfully restarted")
  }
}
