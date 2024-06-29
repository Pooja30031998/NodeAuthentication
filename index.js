//environment variables configuration
import dotenv from "dotenv";
dotenv.config();

//importing modules
import express from "express";
import bodyParser from "body-parser";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { connectUsingMongoose } from "./config/db.js";
import defaultRouter from "./src/routes/defaultRoutes.js";

//creating server
const server = express();

// Setting up server for view engine
server.set("view engine", "ejs");
server.use(ejsLayouts);
server.set("views", path.join(path.resolve(), "src", "views"));

//setting up middleware to parse request body
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//setting up middleware use static files
server.use(express.static("public"));

//setting up session for authentication
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.callbackURL,
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// console.log('Profile Data')
			// console.log(profile)
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

//handling routes
server.use("/", defaultRouter);

//starting server to listen to port
server.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
  connectUsingMongoose();
});
