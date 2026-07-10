if (process.env.NODE_ENV != "prodution") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const users = require("./routes/user.js");

const Mongo_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(Mongo_URL);
}

main()
  .then(() => {
    console.log("Database Connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Create A Session Id Using Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

// Use The Connect Flash Package For Flash Messages
app.use(flash());

// Initialize Passport For Authentication
app.use(passport.initialize());

// Use Passport Session For Maintaining Login Session
app.use(passport.session());

// Use Passport Local Strategy For Authentication
passport.use(new LocalStrategy(User.authenticate()));

// Use Passport Serialize User For Storing User In Session
passport.serializeUser(User.serializeUser());

// Use Passport Deserialize User For Retrieving User From Session
passport.deserializeUser(User.deserializeUser());

// Middleware For Use Flash Messages In Different Routes
app.use((req, res, next) => {
  console.log(req.session);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// // Route for Login Faker User
// app.get("/demoUser", async (req, res) => {
//   const demoUser = new User({
//     username: "User1",
//     email: "shravan@gmail.com",
//     name: "Shravan",
//     age: 22,
//   });
//   // Register Metthod is Provided By Passport Local Mongoose For Hashing Password And Storing User In Database
//   const registeredUser = await User.register(demoUser, "demoUser");
//   console.log(registeredUser);
//   res.send("Demo User Created Successfully");
// });

// Mount The All Related Listings Route
app.use("/listings", listings);

// Mount The All Related Review Route
app.use("/listings/:id/reviews", reviews);

// Mount The All Related User Route
app.use("/", users);

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log(sampleListing);
//   res.send("successful testing");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
