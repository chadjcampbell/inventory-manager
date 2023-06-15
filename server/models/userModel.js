const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [23, "Password must be less than 24 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1686866825~exp=1686867425~hmac=249cf4990844c725b121c896f61d1efd0efe31fc8af6dc522628c05fd6afe430",
    },
    phone: {
      type: String,
      default: "867-5309",
    },
    bio: {
      type: String,
      default: "Your bio here...",
      maxLength: [250, "Password must be less than 250 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
