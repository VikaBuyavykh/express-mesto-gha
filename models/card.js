const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/)([w]{3}\.)?([\w-.~:/?#[\]@!$&'()*+,;=]{1,}\.[\w]{1,3})(\/[\w-.~:/?#[\]@!$&'()*+,;=]{1,})*/i.test(v);
      },
      message: (props) => `${props.value} is not a valid avatar`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('card', cardSchema);
