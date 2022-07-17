const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users <GET, POST>
router.route("/").get(getAllUsers).post(createUser);

// /api/User/:id <GET, PUT, DELETE>
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
