const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class Ban extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a member from your server',
            clientPermissions: ["BAN_MEMBERS"],
            guildOnly: true,
        });
    }
    async run(message) {
      const args = message.argString
    if(message.member.permissions.has("BAN_MEMBERS")){
    let user = message.mentions.users.first();
    if (user) {
      let member = message.guild.member(user)
      if(member){
       if(member.bannable){
        let rsn = args.slice(1).join(" ")
        if(!args[1]) rsn = "(No reason specified)"
        await member.ban(`${message.author.tag}: ${rsn}`).then(() => {
          member.send(`You have been banned from ${message.guild.name} for ${rsn}`)
          message.say(`<:ServerPolice:622566234898300928> Server Police successfully banned ${member.user.tag} with reason: **${rsn}**`);
          client.channels.get("595315793743577088").send(`__${message.author.tag} (${message.author.id}) just banned ${member.user.tag} (${member.id}) from server ${message.guild.name} (${message.guild.id}) because ${rsn}__`)
        }).catch(err => {
          message.say('I was unable to ban the member').then;
          client.channels.get("595315793743577088").send(`Error; ${message.guild.name} (${message.guild.id}), ban command: ${err}`)
        });
    }else{
      message.say('<:ServerPolice:622566234898300928> That member cannot be banned')
    }}else{
      message.say('<:ServerPolice:622566234898300928> That user is not in this server')
    }}else{
      message.say('<:ServerPolice:622566234898300928> You didn\'t specify the user to ban')
    }
    }else {
      message.reply('You do not have access to use this command')
      client.channels.get("595315793743577088").send(`__${message.author.tag} (${message.author.id}) tried to use the 'Ban' command but does not have access__ in ${message.guild.name} (${message.guild.id})`)
    }}
  
};
