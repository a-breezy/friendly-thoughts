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
		// validate: {
		// 	email,
		// },
	},
	// references Thought model _id
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	// self-referencial to User model _id
	friends: [{ name: String }],
},
{
	toJSON: {
		virtuals: true
	},
	id: false
});

const User = model("User", UserSchema);

module.exports = User;
