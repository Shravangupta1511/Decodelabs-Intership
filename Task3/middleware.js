const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./joischema.js");
const ExpressError = require("./utils/ExpressError.js");

// Middleware Function : -> Used For Checking If User is Logged In or Not

const isLoggedIn = (req, res, next) => {
  // Passport.js Provides isAuthenticated() Method That Returns True If User is Authenticated and False If Not Authenticated
  if (!req.isAuthenticated()) {
    // Save The URL To Which User Was Trying To Navigate Before Being Redirected To Login Page
    req.session.returnTo = req.originalUrl;
    console.log("Return URL:", req.session.returnTo);
    req.flash("error", "You Must Be Logged In To Access This Page");
    return res.redirect("/login");
  }
  next();
};

// Middleware Function : -> Used For Saving The URL To Which User Was Trying To Navigate Before Being Redirected To Login Page
const saveReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    console.log("Redirect URL:", res.locals.redirectUrl);
  }
  next();
};

// Middleware Function : -> Used For Checking If User is Owner of the Listing or Not
const isOwner = async (req, res, next) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are Not Onwer of This Listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware Function : -> Used For Checking If User is Author of the Review or Not
const isreviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are Not Author of This Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware Function : -> Used For Validating Listing Data Before Creating or Updating Listing using Joi Validation Library
function validationListing(req, res, next) {
  if (!req.body) {
    throw new ExpressError(400, "Request body is required");
  }
  console.log(req.body);
  let result = listingSchema.validate(req.body);
  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

// Middleware Function : -> Used For Validating Review Data Before Creating Review Using Joi Validation Library
function validationReview(req, res, next) {
  if (!req.body) {
    throw new ExpressError(400, "Request body is required");
  }
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

module.exports = {
  isLoggedIn,
  saveReturnTo,
  isOwner,
  isreviewAuthor,
  validationListing,
  validationReview,
};
