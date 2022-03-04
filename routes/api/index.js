const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const friendRoutes = require("./friend-routes");

router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);
router.use("/friend", friendRoutes);

module.exports = router;
