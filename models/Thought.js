const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	// references Thought model _id
	username: [],
	// self-referencial to User model _id
	reactions: [{ name: String }],
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
