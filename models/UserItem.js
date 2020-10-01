const mongoose = require("mongoose");

const userItemSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	ownerId: {
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
});

module.exports = mongoose.model("user-items", userItemSchema);
