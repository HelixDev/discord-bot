const mongoose = require("mongoose");

const shopItemSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	serverId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("shop-items", shopItemSchema);
