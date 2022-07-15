const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/User/:id
router.route("/:id").get(getUsersById).put(updateUser).delete(deleteUser);

module.exports = router;
