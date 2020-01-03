const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class staffcheck extends Command {
  constructor(client) {
    super(client, {
      name: "staffcheck",
      memberName: "staffcheck",
      description: "Check if you are on the HoundBot Staff team",
      group: "moderation",
      guildOnly: true,
      guarded: true,
      format: "(user_id)"
    })
  }
  run(message) {
    try{
      const args = message.content.slice(staffcheck.length).split(" ")
      let embed = new MessageEmbed().setTitle("Staff Check").setColor("#0099ff")

      if(args[1]){
          let user = message.mentions.users.first() || this.client.users.get(args[1])
          if(user){
            if(this.client.config.owners.includes(user.id)){
          embed.setDescription(
          `:white_check_mark: **${user.username}** is a bot owner`
          )
        }else if (this.client.config.staff.includes(user.id)) {
            embed.setDescription(
              `:white_check_mark: **${user.username}** is a bot moderator`
            )
          } else {
            embed.setDescription(
              `:x: **${user.username}** is not on the staff team`
            )
          }
        message.channel.send(embed)
          }else{
            message.channel.send("User not found")
          }
      }else if(!args[1]){
        if(this.client.config.owners.includes(message.author.id)){
          embed.setDescription(
          `:white_check_mark: **${message.author.username}** is a bot owner`
          )
        }else if (this.client.config.staff.includes(message.author.id)) {
            embed.setDescription(
              `:white_check_mark: **${message.author.username}** is a bot moderator`
            )
          } else {
            embed.setDescription(
              `:x: **${message.author.username}** is not on the staff team`
            )
          }
        message.channel.send(embed)
      }
    }catch(err){
      message.channel.send(err)
    }
  }
}
