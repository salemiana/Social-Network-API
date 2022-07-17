const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//the reaction field's subdocument schema in the Thought model.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJson: {
      getters: true,
    },
  }
);

//Thought schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      Required: true,
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
      Required: true,
    },
    //replies
    reactions: [reactionSchema],
  }, 
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
