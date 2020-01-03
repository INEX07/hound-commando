const {ShardingManager} = require("discord.js")

const shardManager = new ShardingManager("./index.js", {token: process.env.TOKEN})
shardManager.spawn()

shardManager.on("shardCreate", shard => {
  console.log(shard)
})
