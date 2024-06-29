import express from "express";
import passport from 'passport';
import DefaultController from "../controller/defaultController.js";
import GoogleController from "../controller/googleController.js";
import auth from "../middlewares/auth-middleware.js";


//creating express router for default routes
const defaultRouter = express.Router();

//creating defaultController instance
const defaultController = new DefaultController();

//routes
//get signin page
defaultRouter.get("/", (req, res, next) => {
  defaultController.getSignin(req, res, next);
});

//get signup page
defaultRouter.get("/signup", (req, res, next) => {
  defaultController.getSignup(req, res, next);
});

//get error page
defaultRouter.get("/500", (req, res, next) => {
  defaultController.getError(req, res, next);
});

//get home page
defaultRouter.get("/home", auth, (req, res, next) => {
  defaultController.getHome(req, res, next);
});

//get forgot password page
defaultRouter.get("/forgot", (req, res, next) => {
  defaultController.getForgot(req, res, next);
});

//get reset password route
defaultRouter.get("/reset", auth, (req, res, next) => {
  defaultController.getReset(req, res, next);
});

//post signup route
defaultRouter.post("/signup", (req, res, next) => {
  defaultController.postSignup(req, res, next);
});

//post signin route
defaultRouter.post("/", (req, res, next) => {
  defaultController.postSignin(req, res, next);
});

//post forgot password route
defaultRouter.post("/forgot", (req, res, next) => {
  defaultController.forgotPassword(req, res, next);
});

//post reset password route
defaultRouter.post("/reset", auth, (req, res, next) => {
  defaultController.resetPassword(req, res, next);
});

//get logout route
defaultRouter.get("/logout", (req, res, next) => {
  defaultController.logout(req, res, next);
});

//creating googleController instance
const googleController = new GoogleController();

defaultRouter.get("/auth/google", passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}));

defaultRouter.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/login/success",
		failureRedirect: "/login/failed",
	})
);

defaultRouter.get("/login/success", (req, res, next) => {
  googleController.signInSuccess(req, res, next);
});

defaultRouter.get("/login/failed", (req, res, next) => {
  googleController.signInFailed(req, res, next);
});

export default defaultRouter;
