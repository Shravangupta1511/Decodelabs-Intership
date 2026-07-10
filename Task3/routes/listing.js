const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

/* Handle the "/" route by displaying all listings for GET requests and creating a new listing 
for POST requests after verifying the user is logged in, validating the submitted data using Joi Schema, 
and then executing the controller with automatically handling any asynchronous errors. */
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validationListing,
    wrapAsync(listingController.createListing),
  );

// Handle the request to display the new listing form by first checking if the user is logged in and then calling the controller to render the form page.
router.get("/new", isLoggedIn, listingController.renderNewCreateForm);

/* Handle the "/:id" route by displaying a specific listing for GET requests, updating it for PUT requests 
after verifying the user is logged in, owns the listing, and validate the listing , and deleting it 
for DELETE requests after confirming authentication and ownership, and executing Controller with wrapAsync 
Which automatically forwards any asynchronous errors to the Express error-handling middleware. */

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validationListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Handle the request to display the edit listing form by ensuring the user is logged in, then, verifying that they are the owner of the listing, and then executing the controller, while wrapAsync automatically forwards any asynchronous errors to the Express error-handling middleware.
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
