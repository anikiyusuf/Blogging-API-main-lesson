const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: [true, "Enter your Email"], unique: true },
    password: {
      type: String,
      minLength: 4,
      required: [
        true,
        "Your password should contain lower and upper letter case, a number, a character and be at least 5 length long",
      ],
    },
    blogId: { type: Array, default: [] },
  },
  { timestamps: true }
);

// The Pre-hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password Validation
userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
