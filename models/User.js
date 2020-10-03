const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    serverId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    lastClaim: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("users", userSchema);
