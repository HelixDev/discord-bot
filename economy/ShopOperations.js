const User = require("../models/User.js");
const UserItem = require("../models/UserItem.js");
const ShopItem = require("../models/ShopItem.js");
const moment = require("moment");

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

		const userItem = await UserItem.findOneAndUpdate(
			{ name, serverId, ownerId: id },
			{ $inc: { quantity: 1 } }
		);

		if (!userItem) {
			const newItemObj = {
				id: item.id,
				serverId: item.serverId,
				ownerId: id,
				name: item.name,
				quantity: 1,
			};
			const newItem = new UserItem(newItemObj);
			await newItem.save();
			console.log("new items added");
			return { item };
		}
		console.log("item updated");
		return { item };
	}

	async showShop(serverId) {
		const items = await ShopItem.find({ serverId }, "-_id -__v").lean();
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

	async pay({ senderId, receiverId, amount, serverId }) {
		//later
		const sender = await User.findOne({ serverId, id: senderId });
		if (!sender) return { error: "you are not registered" };

		const receiver = await User.findOne({ serverId, id: receiverId });
		if (!receiver) return { error: "the receiver isn't registered" };

		if (sender.balance < amount) return { error: "you don't have enough coins to give" };

		await sender.updateOne({ $inc: { balance: amount * -1 } });
		await receiver.updateOne({ $inc: { balance: amount } });

		return { sender: sender.lean(), receiver: receiver.lean() };
	}

	async leaderboard(serverId) {
		//later
		const board = await User.find({ serverId }, "-_id -__v")
			.limit(10)
			.sort({ balance: -1 })
			.lean()
			.exec();

		if (board.length === 0) return { error: "there is no data for this server" };
		return { board };
	}

	async claim({ serverId, id }) {
		try {
			const freeCoinsAmount = Number(process.env.FREE_COINS_AMOUNT);
			const user = await User.findOne({ serverId, id });
			if (!user) return { error: "user isn't registered" };

			const now = Date.now();
			const timeDifference = now - user.lastClaim;
			const targetTime = moment(user.lastClaim + 300000);
			const dif = moment(targetTime.diff(now)).format("mm:ss");

			if (timeDifference < 300000)
				return {
					error: `you have to wait ${dif} before claiming your free coins again`,
				};

			await user.updateOne({ $inc: { balance: freeCoinsAmount }, lastClaim: Date.now() });
			return { balance: user.balance + freeCoinsAmount };
		} catch (e) {
			console.log(e);
		}
	}
};
