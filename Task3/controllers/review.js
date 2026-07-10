const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

/* Create Controller Function : -> Used for Creating Review and Adding it to the Listing with the help of Listing Id. 
and also adding the review to the Review Collection in the Database. And also adding the Author of the Review 
to the Review Model with the help of req.user._id which is provided by Passport.js after user login. */

module.exports.createReview = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
};

/* Destroy Controller Function : -> Used for Deleting reviews with deleting inside listing also. */
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  console.log({ id, reviewId });
  let deleteLisitngReview = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  console.log(deleteLisitngReview);
  let deleteReview = await Review.findByIdAndDelete(reviewId);
  console.log(deleteReview);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
