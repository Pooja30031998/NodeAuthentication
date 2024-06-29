const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res
      .status(200)
      .render("signin", { msg: "Please sign in to continue", error: null });
  }
};

export default auth;
