const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("../../controllers/user-controller");

// GET and POST routes for /api/users
router.route("/").get(getAllUsers).post(createUser);

// GET, PUT, DELETE /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// POST, DELETE /api/users/:userId/friends/:friendsId
router.route("/:id/friends/:friendsId").post().delete();

module.exports = router;
