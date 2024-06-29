import UserModel from "./user-schema.js";
import bcrypt from "bcrypt";

export default class authRepository {
  async postSignup(userData) {
    try {
      //if user already exist give error message
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        return { error: "User already exists" };
      } else {
        const newUser = new UserModel({
          userName: userData.name,
          email: userData.email,
          password: userData.password,
        });
        await newUser.save();
        return { msg: "Registered successfully" };
      }
    } catch (err) {
      throw err; // throw error and catch in controller to habdle it
    }
  }

  async postSignin(userData) {
    try {
      //if user doesn't exist give error message
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (!existingUser) {
        return { error: "User doesn't exist" };
      }
      //checking if the password is corrrect
      const correctPassword = await bcrypt.compare(
        userData.password,
        existingUser.password
      );
      if (!correctPassword) {
        return { error: "Invalid credentials" };
      } else {
        return existingUser;
      }
    } catch (err) {
      throw err; // throw error and catch in controller to habdle it
    }
  }

  async findUser(email) {
    const existingUser = await UserModel.findOne({ email });
    return existingUser;
  }
}
