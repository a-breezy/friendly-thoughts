const router = require("express").Router();
const {
	getAllThoughts,
	getThoughById,
	createThought,
} = require("../../controllers/thought-controller");

// GET and POST routes for /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// GET /api/thought/:id
router.route("/:id").get(getThoughById);

module.exports = router;
