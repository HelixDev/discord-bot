const { Client } = require("discord.js");

const Actions = require("./actions.js");

const Commands = require("./commands.js");

const mongoose = require("mongoose");

const ShopCommands = require("./economy/ShopClass.js");

const bot = new Client();
require("dotenv").config();
const token = process.env.TOKEN;

const PREFIX = process.env.PREFIX;

const DB_URL = process.env.NODE_ENV === "production" ? process.env.DB_URL_PROD : process.env.DB_URL_DEV;

bot.on("ready", () => {
	console.log("I am online master");
	bot.user.setActivity(PREFIX, {
		type: "LISTENING",
	});
});

const gifActionsList = ["kill", "kiss", "punch", "hug", "pat", "feed", "lick", "succ", "slap", "love"];

const commandsList = ["random", "meme", "rateFlirt", "fact", "joke", "truth", "quote", "invite"];

const shopCommandsList = [
	"show",
	"inventory",
	"register",
	"balance",
	"add",
	"buy",
	"remove",
	"supply",
	"change_price",
];

bot.on("message", (msg) => {
	if (msg.content === PREFIX + "ping") {
		return msg.channel.send(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms.`);
	}
	//if (msg.content.toLowerCase() == "lol") return msg.channel.send(`you're lol ${msg.author}`);

	if (msg.content.split("")[0] !== PREFIX) return;

	const args = msg.content.substring(PREFIX.length).split(" ");
	const command = args[0];

	if (gifActionsList.includes(command)) {
		if (!args[1]) return;

		const actions = new Actions(msg, command);
		actions.do();
	}
	if (commandsList.includes(command)) {
		const commands = new Commands(msg);
		commands[command]();
	}
	if (command === "shop") {
		if (!shopCommandsList.includes(args[1])) return;
		const shopCommands = new ShopCommands(msg, args);
		// shopCommands[args[1]]();
		shopCommands.checkUser();
	}
});

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("connected to db");
		bot.login(token);
		console.log("bot ready");
	})
	.catch((err) => {
		console.log(err);
	});
