const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    Required: "thoughtText is required",
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //Use a getter method to format the timestamp on query
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
//The user that created this thought
  username: {
    type: String,
    Required: "username is required",
  },
//replies
  reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true
    },
    id: false
  });

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

