const router = require("express").Router();
const {
	getAllFriends,
	deleteFriend,
} = require("../../controllers/user-controller");

// GET /api/friend
router.route("/").get(getAllFriends);

// DELETE /api/friend/:id
router.route("/:id").delete(deleteFriend);

module.exports = router;
