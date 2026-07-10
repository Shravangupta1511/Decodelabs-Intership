const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveReturnTo } = require("../middleware.js");
const userController = require("../controllers/user.js");

/* Handle the "/signup" route by displaying the signup form for GET requests and creating a new user
account for POST requests, while wrapAsync automatically forwards any asynchronous errors to the Express error-handling middleware. */

router
  .route("/signup")
  .get(userController.signupForm)
  .post(wrapAsync(userController.signup));

/* Handle the "/login" route by displaying the login form for GET requests and processing user 
authentication for POST requests, while saving the original destination, handling authentication 
failures, and executing the login controller with automatic async error handling. */

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveReturnTo,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login),
  );

// Handle the logout request by ending the user's session and redirecting them to the appropriate page.
router.get("/logout", userController.logout);

module.exports = router;
