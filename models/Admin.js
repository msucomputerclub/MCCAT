const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter a name"]
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    select: false,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admin", adminSchema);
