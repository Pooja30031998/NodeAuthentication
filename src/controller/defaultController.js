import { sendPasswordResetEmail } from "../middlewares/nodemailer-middleware.js";
import authRepository from "../model/repository.js";
import bcrypt from "bcrypt";

export default class DefaultController {
  constructor() {
    this.repository = new authRepository();
  }

  //get signin page
  getSignin(req, res, next) {
    res.status(200).render("signin", { msg: null, error: null });
  }

  //get signup page
  getSignup(req, res, next) {
    res.status(200).render("signup", { error: null });
  }

  //get error page
  getError(req, res, next) {
    res.status(500).render("error");
  }

  //get home page
  getHome(req, res, next) {
    res.status(200).render("home", { userEmail: req.session.userEmail });
  }

  //get forgot password page
  getForgot(req, res, next) {
    res.status(200).render("forgot", { msg: null, error: null });
  }

  //get reset password page
  getReset(req, res, next) {
    res
      .status(200)
      .render("reset", { userEmail: req.session.userEmail, error: null });
  }

  //post signup
  async postSignup(req, res, next) {
    try {
      const userDetails = req.body;
      //Recaptcha
      const recaptcha = req.body['g-recaptcha-response'];

      if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
         return res.status(404).render("signin",{msg:null, error:"Please select captcha"});
      }
      //checking if password and confirm password are same
      if (userDetails.password != userDetails.cpassword) {
        return res
          .status(400)
          .render("signup", { error: "Passwords are not matching" });
      }
      const signedUp = await this.repository.postSignup(userDetails);
      if (signedUp.error) {
        return res.status(400).render("signup", { error: signedUp.error });
      } else {
        return res
          .status(200)
          .render("signin", { msg: signedUp.msg, error: null });
      }
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //post signup
  async postSignin(req, res, next) {
    try {
      const userDetails = req.body;
      //Recaptcha
      const recaptcha = req.body['g-recaptcha-response'];

      if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
         return res.status(404).render("signin",{msg:null, error:"Please select captcha"});
      }
      const signedIn = await this.repository.postSignin(userDetails);
      if (signedIn.error) {
        return res
          .status(400)
          .render("signin", { msg: null, error: signedIn.error });
      } else {
        //storing user email in req.session for authentication
        req.session.userEmail = signedIn.email;
        return res.redirect("/home");
      }
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //post forgot password
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .render("forgot", { msg: null, error: "please enter email" });
      }
      const user = await this.repository.findUser(email);
      if (!user) {
        return res
          .status(400)
          .render("forgot", { msg: null, error: "user not found!" });
      }
      const newPassword = Math.random().toString(36).slice(-8);
      user.password = newPassword;
      await user.save();
      const sentMail = await sendPasswordResetEmail(user, newPassword);
      if (sentMail) {
        return res.status(200).render("forgot", {
          msg: "Email sent with new password!",
          error: null,
        });
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/500");
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const existingUser = await this.repository.findUser(email);
      if (!existingUser)
        return res.status(400).render("reset", {
          userEmail: req.session.userEmail,
          error: "User doesn't exist",
        });

      const correctPassword = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );
      if (!correctPassword)
        return res.status(400).render("reset", {
          userEmail: req.session.userEmail,
          error: "Invalid credentials",
        });
      //resetting password
      existingUser.password = newPassword;
      await existingUser.save();
      res.status(200).render("signin", {
        msg: "Password changed successfully",
        error: null,
      });
    } catch (error) {
      res.redirect("/500");
    }
  }

  //logout
  async logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.redirect("/500");
      } else {
        res.redirect("/");
      }
    });
  }
}
