const { User } = require("../Models");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({path: "thoughts",select: "-__v"})
      .populate({path: "friends",select: "-__v"})
      .select("-__v")
      //.sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// get user GET a single user by its _id and populated thought and friend data

getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    //populate user thoughts
      .populate({path: 'thoughts', select: '-__v'})
      //populate user friends
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  // Create a new user:
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  //update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({message: 'No user with this Id!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err))
  },

  //POST to add a new friend to a user's friend list
 // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },


  //DELETE to remove a friend from a user's friend list

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;