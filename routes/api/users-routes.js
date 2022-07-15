const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// /api/users <GET, POST>
router.route("/").get(getAllUsers).post(createUser);

// /api/User/:id <GET, PUT, DELETE>
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
