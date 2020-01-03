const { Command, Client } = require("discord.js-commando");
const client = new Client();

module.exports = class mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      memberName: "mute",
      description: "Mute the specified user",
      group: "moderation",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
      guildOnly: true,
      format: "{USER_ID/USER_MENTION} (REASON)"
    });
  }
  async run(message) {
    const args = message.content.slice(mute.length).split(" ")
    var member;
    if(args[1]){
    member =
      message.guild.members.fetch(this.client.users.fetch(args[1])) ||
      message.mentions.members.first()
  }
    var muteRole = message.guild.roles.fetch("name", "Muted")
    const modLogs = message.guild.channels.find(c=>c.name == this.client.provider.get(message.guild, "modLogs"))

    if (member) {
      var rsn = args.slice(1)
      if(!rsn) rsn = "(No Reason Specified)"
      if (muteRole) {
        if (member.roles.has(muteRole.id)) {
          message.channel.send(`This member cannot be muted, as they already are muted`)
        } else if (!member.roles.has(muteRole.id)) {
          member.roles
            .add(muteRole, `Muted by ${message.author.username}: ${rsn}`)
            .then(message.channel.send(`${member.user.tag} successfully muted`))
          modLogs.send(`${message.author.username} successfully muted ${member.user.tag} for ${rsn}`)
        }
      } else if (!muteRole) {
        muteRole = message.guild.roles.create({data: {name: "Muted", permissions: 0, mentionable: false}})

        member.roles
          .add(muteRole, `Muted by ${message.author.username}: ${rsn}`)
          .then(message.channel.send(`${member.user.tag} successfully muted`))
        modLogs.send(`${message.author.username} successfully muted ${member.user.tag} with reason: ${rsn}`)
      }
    } else if (!member) {
      message.channel.send("The specified user is not in this guild");
    }
  }
}
