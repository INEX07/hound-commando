const {Command, Client} = require("discord.js-commando")
const client = new Client()

module.exports = class tempban extends Command{
  constructor(client){
    super(client, {
      name: "tempban",
      memberName: "tempban",
      group: "moderation",
      description: "Temporarily ban a member from the server",
      format: "[USER_ID/USER_MENTION] [TIME(Use H-Hours, M-Minutes, D-Days)] (REASON)",
      guildOnly: true,
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"]
    })
  }
  run(message){
    const args = message.content.slice(tempban.length).split(" ")
    if(args[2]){
      let user = message.mentions.users.first() || client.users.get(args[1])
      let time = args[2]
      let reason;
      if(args[3]) reason = args.slice(3)
      if(user){
        let member = message.guild.member(user)
        if(member){
          if(member.bannable){
            let ms;
            if(!time.endsWith(("M") || ("D") || ("H") || ("m") || ("d") || ("h"))) message.channel.send(`Please specify a valid time using H, M, or D`)
            try{
              if(time.endsWith("M" || "m")){
                time = time.slice("M" || "m")
                ms = time*60000
                time = time + " minutes"
              }
              if(time.endsWith("D" || "d")){
                time = time.slice("D" || "d")
                ms = time*8.64e+7
                time = time + " days"
              }
              if(time.endsWith("h" || "H")){
                time = time.slice("H" || "h")
                ms = time*3.6e+6
                time = time + " hours"
              }
            }catch(err){
              message.channel.send(`An error occurred; ${err}`)
            }
            member.ban({reason: reason})
            .then(message.channel.send(`${user.tag} has been banned for ${time} by ${message.author.username} for: ${reason}`))
            setTimeout(()=>{
              message.guild.members.unban(user.id, "Tempban time is up")
            }, ms)
            
            member.send(`You have been temporarily banned from ${message.guild.name} for ${time} because: ${reason}`)
          }
        }else{
          message.channel.send(`The specified user is not in this server`)
        }
      }else{
        message.channel.send(`You didn't specify the user to ban`)
      }
    }else{
      message.channel.send(`Please specify which member to tempban, and how long for. The ban reason is optional`)
    }
  }
}
