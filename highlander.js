const fs = require('fs');
const config = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const BOT_TOKEN = config.bot_token;

client.commands = new Discord.Collection();
for (const file of (fs.readdirSync('./commands').filter(file => file.endsWith('.js')))){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const prefix = ".";

client.once('ready', () => {
    console.log('Connected!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('error');
    }
})

client.login(BOT_TOKEN);