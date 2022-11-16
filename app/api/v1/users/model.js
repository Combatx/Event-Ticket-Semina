const mongoose = require("mongoose");
// const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
      mixlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      mixlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
});

usersSchema.methods.comparePassword = async function (caditatePassword) {
  const isMatch = await bcrypt.compare(caditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", usersSchema);
