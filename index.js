const { Client, GatewayIntentBits } = require('discord.js');

// Configura il token del bot direttamente nel codice


// Inizializza il bot
const client = new Client({ 
  intents:[
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
  ],
 });

// Evento: Quando il bot è pronto
client.once('ready', () => {
  console.log(`Bot connesso come ${client.user.tag}`);
});

// Evento: Quando un membro entra nel server
client.on('guildMemberAdd', async (member) => {
  try {
    const guild = member.guild; // Ottieni il server in cui l'utente è entrato

    // Ottieni i ruoli dal server usando gli ID
    const free = guild.roles.cache.get('1314938891429478410'); // Membro senza accesso
    const subscriber = guild.roles.cache.get('1314939916563644428'); // Abbonato
    const vip = guild.roles.cache.get('1314940092594389109'); // VIP
    const verified = guild.roles.cache.get('1314939712384794715'); // Verificato

    // Assegna il ruolo 'Membro senza accesso'
    if (free) {
      await member.roles.add(free);
      console.log(`Ruolo '${free.name}' assegnato a ${member.user.tag}`);
    }

    // Se il membro ha i ruoli 'Abbonato' o 'VIP', assegna anche 'Verificato'
    if ((member.roles.cache.has(subscriber.id) || member.roles.cache.has(vip.id)) && verified) {
      await member.roles.add(verified);
      console.log(`Ruolo '${verified.name}' assegnato a ${member.user.tag}`);
    }

  } catch (error) {
    console.error(`Errore durante l'assegnazione dei ruoli: ${error}`);
  }
});

// Avvia il bot usando il token
client.login("MTMxNDk0NDgyNTc0MDYyNzk4OA.G1zS9M.0lqiDgf5N4XvzJUZBltM8MUW_dDDy5m1OAuhZo")
