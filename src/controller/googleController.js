import authRepository from "../model/repository.js";
import UserModel from "../model/user-schema.js";
import bcrypt from "bcrypt";

export default class GoogleController{
  signInSuccess = async (req, res, next) => {
        const userData =  req.user._json;
        const { email, name, sub } = userData;

        if (email) {
            const existingUser = await this.repository.findUser(email);
            if (existingUser) {
                req.session.userEmail = email;
                return res.status(200).render("home", { userEmail: req.session.userEmail });
            }
            const newUser = new UserModel({
               userName: name,
               email: email,
               password: sub,
            });
            await newUser.save();
            req.session.userEmail = email;
            return res.status(200).render("home", { userEmail: req.session.userEmail });
        }else {
            return res.status(400).render("signup", { error: "Not Authorized" });
        }
    }

    signInFailed = (req, res, next) => {
      return res.status(400).render("signup", { error: "Log in failure" });
    }

}
