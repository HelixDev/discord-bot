const User = require("../models/User.js");
const UserItem = require("../models/UserItem.js");
const ShopItem = require("../models/ShopItem.js");

module.exports = class {
	constructor() {}

	async checkUser({ id, serverId }) {
		const user = await User.findOne({ id, serverId }).lean();
		if (!user) return { error: "user doesnt exist" };
		return true;
	}

	async removeItem({ name, serverId }) {
		const item = await ShopItem.findOneAndDelete({ name, serverId });
		if (!item) return { error: "item doesn't exist" };
		return { item };
	}

	async createUser(user) {
		//user: {id, serverId, balance}
		const userExists = await User.findOne({ id: user.id, serverId: user.serverId }).lean();
		if (userExists) return { error: "user already exists" };

		const newUser = new User(user);
		await newUser.save();
		return { newUser };
	}

	async addItem(item) {
		const itemExists = await ShopItem.findOne({ name: item.name, serverId: item.serverId }).lean();
		if (itemExists) return { error: "item already exists, maybe update?" };
		const newItem = new ShopItem(item);
		await newItem.save();
		return { item: newItem };
	}

	async getBalance({ id, serverId }) {
		const user = await User.findOne({ id, serverId }).lean();
		if (!user) return { error: "user not registered" };

		return { balance: user.balance };
	}

	async getInventory({ id, serverId }) {
		const userItems = await UserItem.find({ ownerId: id, serverId }).lean();
		if (userItems.length === 0) return { error: `user <@${id}> has no items` };
		return { items: userItems };
	}

	async buyItem({ name, id, serverId }) {
		const item = await ShopItem.findOne({ name, serverId });
		if (!item) return { error: "not found" };

		const user = await User.findOne({ id, serverId });

		if (!user) return { error: "user not found" };

		if (user.balance < item.price) return { error: "sry, you don't have enough balance" };

		if (item.quantity === 0) return { error: "out of stock" };

		await item.updateOne({ $inc: { quantity: -1 } });
		await user.updateOne({ $inc: { balance: item.price * -1 } });

		const userItem = await UserItem.findOne({ name, serverId });
		if (userItem) {
			await userItem.updateOne({ $inc: { quantity: 1 } });
			return { item };
		} else {
			const newItemObj = {
				id: item.id,
				serverId: item.serverId,
				ownerId: id,
				name: item.name,
				quantity: 1,
			};
			const newItem = new UserItem(newItemObj);
			await newItem.save();
			return { item };
		}
	}

	async showShop(serverId) {
		const items = await ShopItem.find({ serverId }, "-_id -__v").lean();
		console.log(items);
		if (items.length === 0) return { error: "shop is empty" };
		return { items };
	}

	async supplyItem({ name, quantity, serverId }) {
		const newItem = await ShopItem.findOneAndUpdate(
			{ name, serverId },
			{ $inc: { quantity } },
			{ new: true }
		).lean();
		if (!newItem) return { error: "item not found" };
		return { item: newItem };
	}

	async changeItemPrice({ name, price, serverId }) {
		const newItem = await ShopItem.findOneAndUpdate(
			{ name, serverId },
			{ price },
			{ new: true }
		).lean();
		if (!newItem) return { error: "item not found" };
		return { item: newItem };
	}
};
