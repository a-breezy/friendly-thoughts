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
	// get thoughts by id || GET /api/thoughts/:id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.populate({
				path: "reactions",
				select: "-__v",
			})
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// create thought || POST /api/thoughts
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
	// update thought by id || PUT /api/thoughts/:id
	updateThought({ params, body }, res) {
		Thought.findByIdAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.stats(400).json(err));
	},
	// delete thought by id || DELETE /api/thoughts/:id
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				return User.findOneAndUpdate(
					// return updated user json with user thoughts
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					return res
						.status(404)
						.json({ message: "No user found with this id!" });
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// create reaction || POST /api/thoughts/:thoughtId/reactions
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			// sesarch thoughts by id and push reaction body to thought.reactions[]
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: "No thought found with this id!" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},
	// DELETE reaction || DELETE /api/thoughts/:thoughtId/reactions
	removeReaction({ params }, res) {
		Thought.findByIdAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
