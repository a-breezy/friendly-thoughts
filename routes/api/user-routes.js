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

// GET, PUT, DELETE /api/pizzas/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;