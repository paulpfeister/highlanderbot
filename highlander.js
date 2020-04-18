const fs = require('fs');
const config = require("./config.json");
const Sequelize = require('sequelize');
const Discord = require('discord.js');
const client = new Discord.Client();
const BOT_TOKEN = config.bot_token;

client.commands = new Discord.Collection();
for (const file of (fs.readdirSync('./commands').filter(file => file.endsWith('.js')))){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const globalprefix = ".";

// db management

//const Keyv = require('keyv');
//const server_conf = new Keyv('sqlite://serverconf.db');

// database management

/*const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});*/

// interaction with discord

client.once('ready', () => {
    console.log('Connected!');
});

client.on('message', async message => {
    if(message.guild) {
        let prefix = globalprefix;
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
    } else {
        // handle DMs sent to bot
    }
})

client.login(BOT_TOKEN);

/*

TODO

npm is hanging again, so revert to previous commit or delete node_modules and start again
switch from sqlite to mongodb for keyv and add a cache datebase (mongo natively supports ttl, sqlite does not)~

*/