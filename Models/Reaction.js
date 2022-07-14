const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () =>
            new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: "reactionBody is required",
        maxLength: 280,
    },

    username: {
        type: String,
        required: "username is required"
    },

    createdAt: {
        type: Date,
        default: new Date
    }
})

module.exports = reactionSchema;