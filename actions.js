const GetGif = require("./gifFetchers.js");
const GetText = require("./getText.js");

const getGif = new GetGif();

module.exports = class Actions {
  constructor(msg, action) {
    this.msg = msg;
    this.action = action;
  }

  do() {
    const target = this.msg.mentions.members.first();
    const author = this.msg.author;
    if (!target) return;
    const gif = getGif.actionGif(this.action);
    const getText = new GetText(this.action, target, author);
    const text = getText.actionText();
    this.msg.channel.send({
      embed: {
        description: text,
        image: {
          url: gif
        }
      }
    });
  }
};
