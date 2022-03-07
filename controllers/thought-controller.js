const { Thought, User } = require("../models");

const thoughtController = {
	// get all thoughts || GET /api/thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.populate({
				path: "reactions",
				select: "-__v",
			})
			.select("-__v")
			.sort({ _is: -1 })
			.then((dbThoughtData) => req.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// get thoughts by id || GET /api/thought/:id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id})
			.populate({
				path: "reactions",
				select: "-__v"
			})
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res.status(404).json({message: "No thought found with this id!"})
				}
				res.json(dbThoughtData)
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					// search for userId, push new thought to user, return json
					{ _id: params.userId },
					{ $push: { thought: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	updateThought() {},
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId }).then(
			(deletedThought) => {
				if (!deletedThought) {
					return res.status(404).json({ message: "No thought with this id!" });
				}
				return User.findOneAndUpdate;
			}
		);
	},
	createReaction() {},
	removeReaction() {},
};

module.exports = thoughtController;
