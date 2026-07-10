const User = require("../models/user.js");

/* SignUp Controller Function : -> Used For Rendering SignUp Form */

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

/* SignUp Controller Funtion : -> Used for Creating a New User and Registers Them Using Passport.js. It Uses the register Method Provided by 
passport-local-mongoose to Hash the Password and Save the User in the Database. If Registration is Successful, It Flashes a Success Message 
and Redirects to the Listings Page. If There is an Error, It Flashes an Error Message and Redirects Back to the Signup Page. And If User Sign Up
Then Automatically Login The User Using the req.login Which is Provided By Passport.js*/

module.exports.signup = async (req, res) => {
  try {
    const { username, email, name } = req.body;
    const user = new User({ username, email, name });
    const registeredUser = await User.register(user, req.body.password);
    /*Passport.js Provides login() Method That Logs In the User and Creates a Session automatically after Successful Registration.*/
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to Wonderlus!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

/* Login Controller Function : -> Used For Rendering Login Page */

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

/* Login Controller Function : -> Used For Handling the user login by displaying a success message, and
redirecting the user to their originally requested page if available, or sending them to the listings page by default. */

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome To Wonderlus!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

/* Logout Controller Function : -> Used For Logout the User Using req.logout() and redirecting to Listing
page After Successfully Logout */

module.exports.logout = (req, res) => {
  // Passport.js Provides logout() Method That Logs Out the User and Destroys the Session
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/listings");
  });
};
