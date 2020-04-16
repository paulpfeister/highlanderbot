require('dotenv').config();
console.log(process.env);

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);