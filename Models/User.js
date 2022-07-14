const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: "username is required",
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "email is required",
  },

  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],

  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
},

  {
    toJSON: {
      virtuals: true
    },
    id: false
  });

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;