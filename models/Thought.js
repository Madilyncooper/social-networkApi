const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
      thoughts: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 280
      },
      username: {
        type: String,
        required: true
      },
      reactions: [
reactionSchema
      ]
    },
    {
        timestamps: true,
        get: time => time.toDateString()
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );
  
  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });












const Thought = model('Thought', thoughtSchema);

module.exports = Thought;