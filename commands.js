const { MessageAttachment, MessageEmbed } = require("discord.js");

const snekfetch = require("snekfetch");

const { image_search } = require("duckduckgo-images-api");

const fetch = require("isomorphic-unfetch");

const { google } = require("googleapis");

module.exports = class {
  constructor(msg) {
    this.msg = msg;
    this.blacklist = [
      "boobie",
      "ass",
      "vagina",
      "pussy",
      "dick",
      "cock",
      "tit",
      "tits",
      "titties",
      "boob",
      "boobs",
      "boobies",
      "asshole",
      "butt",
      "butthole",
      "porn",
      "fuck",
      "fucker",
      "motherfucker",
      "cuck",
      "hentai",
      "porno",
      "pornography",
      "nigger",
      "nigga",
      "nude",
      "nudes",
      "penis",
    ];
    this.fakeUrls = [
      "https://i.ytimg.com/vi/C72d4vwzvb8/maxresdefault.jpg",
      "https://media1.tenor.com/images/23aeaaa34afd591deee6c163c96cb0ee/tenor.gif",
      "https://media1.giphy.com/media/IaWa1S6rMWzzt0Tt07/giphy.gif",
    ];
  }

  send(msg) {
    this.msg.channel.send(msg);
  }

  async random() {
    const query = this.msg.content.substring(process.env.PREFIX.length).split(" ").splice(1).join(" ");

    if (this.blacklist.includes(query)) {
      const fakeAttachment = this.fakeUrls[Math.floor(Math.random() * this.fakeUrls.length)];
      return this.msg.channel.send({
        files: [
          {
            attachment: fakeAttachment,
            name: fakeAttachment,
          },
        ],
      });
    }

    const res = await image_search({ query, moderate: true });

    const filteredRes = res.filter((obj) => {
      const allowed = ["png", "jpg", "gif"];
      return allowed.includes(obj.image.split(".").slice(-1)[0]);
    });

    if (filteredRes.length === 0) return this.msg.channel.send("no result");
    const attachment = new MessageAttachment(
      filteredRes[Math.floor(Math.random() * filteredRes.length)].image
    );

    return this.msg.channel.send(attachment);
  }

  async meme() {
    const { body } = await snekfetch
      .get("https://www.reddit.com/r/dankmemes.json?sort=top&t=week")
      .query({ limit: 400 });
    const safeMemes = body.data.children.filter((post) => !post.data.over_18);
    const randomNum = Math.floor(Math.random() * safeMemes.length);

    const embed = new MessageEmbed()
      .setColor(0x00a2e8)
      .setTitle(safeMemes[randomNum].data.title)
      .setDescription("Posted by: " + safeMemes[randomNum].data.author)
      .setImage(safeMemes[randomNum].data.url)
      .addField(
        "Other info:",
        "Up votes: " +
          safeMemes[randomNum].data.ups +
          " / Comments: " +
          safeMemes[randomNum].data.num_comments
      )
      .setFooter("Meme stolen from r/dankmemes");

    return this.msg.channel.send(embed);
  }

  async rateFlirt() {
    const query = this.msg.content.substring(process.env.PREFIX.length).split(" ").splice(1).join(" ");

    if (!query) return;

    google
      .discoverAPI("https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1")
      .then((client) => {
        const analyzeRequest = {
          comment: {
            text: query.replace(/^<@!?(\d+)>$/, "smith"),
          },
          requestedAttributes: {
            FLIRTATION: {},
          },
          languages: ["en"],
        };

        client.comments.analyze(
          {
            key: process.env.PRESPECTIVE_API_KEY,
            resource: analyzeRequest,
          },
          (err, res) => {
            console.log(res);
            if (err) throw err;
            const prob = Math.round(res.data.attributeScores.FLIRTATION.summaryScore.value * 100);

            return this.msg.channel.send(`> ${query}\n is ${prob}% a flirtation`);
          }
        );
      })
      .catch((err) => {
        throw err;
      });
  }

  async fact() {
    const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const { text } = await res.json();

    return this.msg.channel.send(`> ${text}`);
  }

  async joke() {
    const randomNum = Math.random();
    if (randomNum > 0.95) {
      return this.msg.channel.send(`${this.msg.author}`);
    }

    const query = this.msg.content
      .substring(process.env.PREFIX.length)
      .split(" ")
      .splice(1)
      .join(" ")
      .toLowerCase();

    //https://raw.githubusercontent.com/sameerkumar18/geek-joke-api/master/data.json

    let jokeType = "";

    switch (query) {
      case "":
        jokeType = `https://sv443.net/jokeapi/v2/joke/Miscellaneous,Pun?
blacklistFlags=nsfw,racist`;
        break;
      case "dark":
        jokeType = `https://sv443.net/jokeapi/v2/joke/Dark?
blacklistFlags=nsfw,racist`;
        break;
      case "norris":
        jokeType = "https://raw.githubusercontent.com/sameerkumar18/geek-joke-api/master/data.json";
        break;
    }

    const filterJokes = (data, type) => {
      let joke = "";
      if (type === "norris") {
        const jokes = data.filter((joke) => joke.toLowerCase().includes("chuck norris"));
        joke = jokes[Math.floor(Math.random() * jokes.length)];
      } else {
        if (data.joke) {
          joke = data.joke;
        } else {
          joke = `${data.setup}\n${data.delivery}`;
        }
      }
      console.log(joke);
      return joke;
    };

    const res = await fetch(jokeType);
    const data = await res.json();

    const joke = filterJokes(data, query);

    return this.msg.channel.send(joke);
  }

  async truth() {
    const res = await fetch(
      "https://raw.githubusercontent.com/sylhare/Truth-or-Dare/master/src/output.json"
    );
    const data = await res.json();
    const filteredData = data.filter((obj) => obj.type.toLowerCase() === "truth");
    const { summary } = filteredData[Math.floor(Math.random() * filteredData.length)];
    return this.send(summary);
  }

  async quote() {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    const { text, author } = data[Math.floor(Math.random() * data.length)];
    return this.send(`> ${text}\n-${author}`);
  }

  invite() {
    return this.send(
      "https://discord.com/oauth2/authorize?client_id=757244481299808339&scope=bot&permissions=8"
    );
  }
};
