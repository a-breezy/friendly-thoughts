const { User } = require("../models");

const userController = {
	// get all users --> GET /api/user
	getAllUsers(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get user by id --> GET /api/user/:id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
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

	// create user POST /api/user
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// update user by id PUT /api/user/:id
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

	// delete user by id DELETE /api/user/:id
	deleteUser({ params }, res) {
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
};

module.exports = userController;
