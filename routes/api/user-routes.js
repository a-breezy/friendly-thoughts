const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	removeUser,
	addFriend,
	removeFriend,
} = require("../../controllers/user-controller");

// GET and POST routes for /api/users
router.route("/").get(getAllUsers).post(createUser);

// GET, PUT, DELETE /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(removeUser);

// POST, DELETE /api/users/:userId/friends/:friendsId
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
