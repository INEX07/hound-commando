const { Command, Client } = require("discord.js-commando");
const client = new Client();
const Discord = require("discord.js");

module.exports = class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Ban a member from your server",
      clientPermissions: ["BAN_MEMBERS"],
      guildOnly: true,
      format: "{USER_MENTION} [reason]"
    });
  }
  async run(message) {
    const args = message.content.slice(Ban.length).split(" ")
    let user = message.mentions.users.first() || client.users.fetch(args[1]);
    if (user) {
      let member = message.guild.member(user);
      if (member) {
        if (member.bannable) {
          let rsn = args.slice(member.length);
          if (!rsn) rsn = "(No reason specified)";
          if(user.id == this.client.config.staff){
            return
          }else{
          member
            .ban(`${message.author.tag}: ${rsn}`)
            .then(() => {
              member.send(
                `You have been banned from ${message.guild.name} for ${rsn}`
              );
              message.channel.send(
                `${message.author.username} successfully banned ${member.user.tag} with reason: **${rsn}**`
              );
            })
        } }else {
          message.channel.send("That member cannot be banned");
        }
      } else {
        message.channel.send("That user is not in this server");
      }
    } else {
      message.channel.send("You didn't specify the user to ban");
    }
  }
};
