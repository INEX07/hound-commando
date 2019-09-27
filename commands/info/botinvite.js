const {Command, Client} = require('discord.js-commando');
const client = new Client();
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class botinvite extends Command {
    constructor(client) {
        super(client, {
            name: 'botinvite',
            group: 'info',
            memberName: 'botinvite',
            description: 'Gives the bot invite links',
            clientPermissions: ["EMBED_LINKS"],
            aliases: ["invite"]
        });
    }
    async run(message) {
    const Embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Bot invite link')
    .addField('Direct invite to add me to your server!', `[Click here](https://discordapp.com/api/oauth2/authorize?client_id=575025796192796684&permissions=8&scope=bot)`)
    .addField('Discord bot\'s list invite!', `[Click here](https://discordbots.org/bot/575025796192796684)`)
    .addField("Space bot's list invite!", `[Click here](https://space-bot-list.org/bots/575025796192796684)`)
    message.say(Embed)
    }}
