const router = require("express").Router();
const {
	getAllThoughts,
	getThoughById,
	createThought,
} = require("../../controllers/thought-controller");

// GET and POST routes for /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// GET, PUT, DELETE /api/thought/:id
router.route("/:id").get(getThoughById).put().delete();

// POST DELETE reactions /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post().delete();

module.exports = router;
