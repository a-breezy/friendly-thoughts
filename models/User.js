const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
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
			trim: true,
			match: /.+\@.+\..+/,
		},
		// references Thought model _id
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		// self-referencial to User model _id
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
