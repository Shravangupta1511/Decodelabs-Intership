const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync.js");
const {
  isLoggedIn,
  isreviewAuthor,
  validationReview,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// Handle the request to create a new review by ensuring the user is logged in, then, validating the submitted review data Using Joi Schema, and then executing the controller,  while wrapAsync automatically forwards any asynchronous errors to the Express error-handling middleware.
router.post(
  "/",
  isLoggedIn,
  validationReview,
  wrapAsync(reviewController.createReview),
);

// Handle the request to delete a review by ensuring the user is logged in, then, verifying that they are the author of the review, and then executing the controller, while wrapAsync automatically forwards any asynchronous errors to the Express error-handling middleware.
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
