require('dotenv').config();
const axios = require('axios')
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
})

client.on('messageCreate', async message => {
    if(message.author.bot){
        return;
    }

    if(message.content === 'hello'){
        message.reply('hey')
    }

    // if the message is !quote, fetch and send random quote
    if(message.content === '!quote'){
        try {
            const response = await axios.get('https://zenquotes.io/api/random')
            const quote = response.data[0].q + ' - ' + response.data[0].a
            message.channel.send(quote)
        } catch(error) {
            console.error('Error fetching quote', error)
            message.channel.send('Sorry, not sorry')
        }
    }
});

// Make sure to include the .env file in .gitignore and be careful with zipfiles!
client.login(process.env.TOKEN);