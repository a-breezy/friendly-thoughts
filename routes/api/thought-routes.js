const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	removeThought,
	createReaction,
	removeReaction,
} = require("../../controllers/thought-controller");

// GET and POST routes for /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// GET, PUT, DELETE /api/thought/:id
router
	.route("/:id")
	.get(getThoughtById)
	.put(updateThought)
	.delete(removeThought);

// POST DELETE reactions /api/thoughts/:thoughtId/reactions
router
	.route("/:thoughtId/reactions")
	.post(createReaction)
	.delete(removeReaction);

module.exports = router;
