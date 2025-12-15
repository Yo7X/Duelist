const token = 'x';
const { Client, IntentsBitField } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioReceiver,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { type } = require("@testing-library/user-event/dist/type");



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

const guildID = "x";
const voiceChannelID = "x";

client.once("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

process.on("message", (msg) => {
  if (msg.action == true) {
    join();
  } else {
    connection.destroy();
  }
});

let connection;
function join() {
  const guild = client.guilds.cache.get(guildID);

  connection = joinVoiceChannel({
    channelId: voiceChannelID,
    guildId: guildID,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  connection.on(VoiceConnectionStatus.Ready, () => {
    console.log("The connection has entered the Ready state");
  });

  connection.receiver.speaking.on("start", (userId) => {
    process.send({ id: userId, type: "start"});
  });

  connection.receiver.speaking.on("end", (userId) => {
    process.send({ id: userId, type: "end"});
  });
}

client.login(token);
