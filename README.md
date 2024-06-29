# NodeAuthentication
This project is a Node.js application that provides authentication functionality, including sign up, sign in, sign out, password reset, forgot password and Google login/signup.

# Hosted URL
Visit the hosted site [here](https://nodeauthentication-xjto.onrender.com)

# Features
- ### Sign up with Email:
    Users can create an account by providing their email and password.
- ### Sign In:
    Users can sign in with their email and password.
- ### Sign Out:
    Users can sign out of their accounts.
- ### Reset Password:
    Users can reset their passwords after signing in.
- ### Encrypted Passwords:
    Passwords stored in the database are encrypted for security.
- ### Google Login/Signup:
    Users can sign in or sign up using their Google accounts.
- ### Forgot Password:
    Users can reset their passwords via email.
- ### reCAPTCHA Integration:
    Extra points for enabling reCAPTCHA on both sign up and log in pages.

# Environment Variables
To run the application, set up the following environment variables in a ```.env``` file at the root of your project:

```
PORT=3000
DB_URL=mongodb://localhost:27017/mydatabase
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
callbackURL = your callback URL
EMAIL=your_email@gmail.com
PASSWORD=your_gmail_passcode
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```
# Folder Structure

```
node-authentication/
├── config/                  # Configuration files
│   └── mongodb.js           # MongoDB configuration
│
├── controllers/             # Controller logic
├── models/                  # Database models
├── routes/                  # Route definitions
├── views/                   # EJS views
├── index.js                 # Express server setup
│
├── public/                  # Static assets
│
├── package.json             # NPM package configuration
├── README.md                # Project README file
└── .env                     # Environment variables file
```

# Installation
To run this project locally, follow these steps:
1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install dependencies
   ```
   npm install
   ```
4. Start the server
   ```
   node index.js
   ```
5. Open web browser and visit ```http://localhost:3000``` to access the site.

# Technologies Used
- Express.js
- Node.js
- MongoDB
- Passport
- bcrypt
- express-session
- Oauth2
- express-ejs-layouts
- dotenv
- nodemailer

# Contributing
Contributions are welcome! Please create a new branch for your changes and submit a pull request for review.















