import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//hash the password before saving using mongoose pre middleware
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
