const { User } = require("../models");

const userController = {
	// get all users || GET /api/users
	getAllUsers(req, res) {
		User.find({})
			// join the user field with the friends field
			.populate({
				path: "friends",
				select: "-__v",
			})
			// tell mongoose we don't need __v field
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get user by id || GET /api/users/:id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "friends",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this Id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create user || POST /api/users
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// update user by id || PUT /api/users/:id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete user by id || DELETE /api/users/:id
	removeUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user with this id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// add friend by id || POST /api/users/:userId/friends/:friendsId
	addFriend({ params, body }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: body } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user with this id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete friend by id || DELETE /api/users/:userId/friends/:friendsId
	removeFriend({ params }, res) {
		Friend.findOneAndDelete({ _id: params.friendId })
			.then((deletedFriend) => {
				if (!deletedFriend) {
					return res.status(404).json({ message: "No friend with this id" });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { friend: params.friendId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No friend found with this id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = userController;
