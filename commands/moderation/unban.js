const {Command, Client} = require("discord.js-commando")
const client = new Client()

module.exports = class unban extends Command {
  constructor(client){
    super(client, {
      name: "unban",
      memberName: "unban",
      description: "Unban a user from the server",
      group: "moderation",
      guildOnly: true,
      clientPermissions: ["BAN_MEMBERS"],
      userPermissions: ["BAN_MEMBERS"],
      ownerOnly: true
    })
  }
  run(message, args){
    let user = this.client.users.get(args)
    let rsn = args.slice(user.length)
    let banned = message.guild.fetchBan(user)
    
    if(user){
    if(banned){
      message.guild.members.unban(user, `Authorised by ${message.author.tag}`)
      message.channel.send(`Successfully unbanned ${user.tag}`)
      user.send(`You have been unbanned from ${message.guild.name} by ${message.author.username}`)
    }else{
      message.channel.send("The ID specified does not belong to a banned user")
    }
    }else{
      message.channel.send("Please specify a user ID to unban")
    }
  }
}
