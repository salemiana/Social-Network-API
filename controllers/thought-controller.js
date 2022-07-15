const { Thought, User } = require("../models");

const thoughtController = {
    //get all thoughts
    getAllthoughts(req, res) {
      Thought.find({})
        .populate({path: "reactions",select: "-__v"})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
  // get a single thought by its _id and populated reaction data
  
  getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
      //populate thoughts reaction
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
  
    // Create a new thought:
    createThought({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
  
    // update a thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // delete thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
  };
  
  module.exports = userController;