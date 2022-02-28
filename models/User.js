const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			email,
		},
	},
	// references Thought model _id
	thoughts: [],
	// self-referencial to User model _id
	friends: [{name: String,}],
});

const User = model("User", UserSchema);

module.exports = User;
