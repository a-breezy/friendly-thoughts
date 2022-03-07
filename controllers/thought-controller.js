const { Thought, User } = require("../models");

const thoughtController = {
	getAllThoughts({}) {},
	addThought({ params, body }, res) {
		console.log(body);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thought: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this ID" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId }).then(
			(deletedThought) => {
				if (!deletedThought) {
					return res.status(404).json({ message: "No thought with this ID!" });
				}
				return User.findOneAndUpdate;
			}
		);
	},
	updateThought() {},
	deleteThought() {},
};

module.exports = thoughtController;
