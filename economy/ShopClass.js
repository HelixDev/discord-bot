const { MessageMentions, MessageAttachment, MessageEmbed } = require("discord.js");
const ShopOperations = require("./ShopOperations.js");
const operations = new ShopOperations();
const { nanoid } = require("nanoid");

module.exports = class {
  constructor(msg, args) {
    this.args = args;
    this.msg = msg;
    this.serverId = msg.guild.id;
  }

  send(msg) {
    this.msg.channel.send(msg);
  }

  async checkUser() {
    if (this.args[1] === "register") return this[this.args[1]]();
    const { id } = this.msg.author;
    const res = await operations.checkUser({ id, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this[this.args[1]]();
  }

  async register() {
    const user = {
      id: this.msg.author.id,
      serverId: this.serverId,
      balance: 0,
    };

    const res = await operations.createUser(user);
    if (res.error) return this.send(res.error);
    return this.send(`you have been registered successfully`);
  }

  async balance() {
    const id = this.msg.mentions.users.first() ? this.msg.mentions.users.first().id : this.msg.author.id;

    const res = await operations.getBalance({ id, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this.send(`user <@${id}> has ${res.balance} coins`);
  }

  async add() {
    if (!this.msg.member.hasPermission("ADMINISTRATOR"))
      return this.send("you don't have access to this command");
    const name = this.args[2];
    const quantity = this.args[3];
    const price = this.args[4];

    if (!name || !quantity || !price || quantity < 0 || price < 0)
      return this.send(`you have provided invalid item data`);

    const item = {
      id: nanoid(5),
      serverId: this.serverId,
      name,
      quantity: Number(quantity),
      price: Number(price),
    };
    const res = await operations.addItem(item);
    if (res.error) return this.send(res.error);
    return this.send(`item: ${res.item.name}, has been added to the shop`);
  }

  async inventory() {
    const user = this.msg.mentions.users.first() ? this.msg.mentions.users.first() : this.msg.author;

    const res = await operations.getInventory({ id: user.id, serverId: this.serverId });
    if (res.error) return this.send(res.error);

    const embed = new MessageEmbed()
      .setColor(0x00a2e8)
      .setTitle(`${user.username}#${user.discriminator}'s inventory:`)
      .setDescription("Items:");
    res.items.forEach((item) => {
      embed.addField(item.name, `Quantity: ${item.quantity}`);
    });

    return this.send(embed);
  }

  async show() {
    const res = await operations.showShop(this.serverId);
    if (res.error) return this.send(res.error);

    const embed = new MessageEmbed()
      .setColor(0x00a2e8)
      .setTitle("welcome to the shop")
      .setDescription("Items:");
    res.items.forEach((item) => {
      embed.addField(item.name, `Cost: ${item.price} :coin:\nStock: ${item.quantity}`);
    });

    return this.send(embed);
  }

  async buy() {
    const { id } = this.msg.author;
    const name = this.args[2];
    const res = await operations.buyItem({ name, id, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this.send(`item ${res.item.name} has been purshased and added to your inventory`);
  }

  async remove() {
    if (!this.msg.member.hasPermission("ADMINISTRATOR"))
      return this.send("you don't have access to this command");
    const name = this.args[2];
    const res = await operations.removeItem({ name, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this.send(`item ${res.item.name} has been deleted from the shop`);
  }

  async supply() {
    if (!this.msg.member.hasPermission("ADMINISTRATOR"))
      return this.send("you don't have access to this command");
    const name = this.args[2];
    const quantity = Number(this.args[3]);

    const res = await operations.supplyItem({ name, quantity, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this.send(
      `you have added ${quantity} items to ${res.item.name}, new item's quantity is ${res.item.quantity}`
    );
  }

  async change_price() {
    if (!this.msg.member.hasPermission("ADMINISTRATOR"))
      return this.send("you don't have access to this command");
    const name = this.args[2];
    const price = Number(this.args[3]);

    const res = await operations.changeItemPrice({ name, price, serverId: this.serverId });
    if (res.error) return this.send(res.error);
    return this.send(`you have updated ${res.item.name}'s price to ${res.item.price}`);
  }
};
