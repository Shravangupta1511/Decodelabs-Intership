const Listing = require("../models/listing.js");
const cloudinary = require("cloudinary").v2;
const maptiler = require("@maptiler/client");
maptiler.config.apiKey = process.env.MAPTILER_API_KEY;

// Controller Function : -> Used For Handling All The Listing Routes Logic and Rendering Views

// Index Controller Function : -> Used For Displaying All Listings on WebPage
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New Controller Function : -> Used For Rendering Form Page for Creating Listing
module.exports.renderNewCreateForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Controller Function : -> Used for Showing Individual Listing Based On Their Id with Populating the Reviews and Owner of the Listing
module.exports.showListing = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing You Request For Does not Exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

/*Create Controller Function : -> Used For Creating Listing Using Form with saving the Owner 
 of the Listing with the help of req.user._id which is provided by Passport.js after user login */

module.exports.createListing = async (req, res, next) => {
  const result = await maptiler.geocoding.forward(
    `${req.body.listing.location}`,
    {
      limit: 1,
    },
  );

  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = result.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

// Edit Controller Function : -> Used for Rendering Form Page For Editing Listing
module.exports.renderEditForm = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing You Request For Does not Exist");
    res.redirect("/listings");
  }
  let listingOriginalImage = listing.image.url;
  listingOriginalImage = listingOriginalImage.replace(
    "/upload",
    "/upload/h_300,w_250",
  );
  res.render("listings/edit.ejs", { listing, listingOriginalImage });
};

// Update Controller Function : -> Used for Updating Existing Listing Using Form
module.exports.updateListing = async (req, res, next) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  const result = await maptiler.geocoding.forward(
    `${req.body.listing.location}`,
    {
      limit: 1,
    },
  );

  req.body.listing.geometry = result.features[0].geometry;

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true, new: true },
  );
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// Delete Controller Function : -> Used for Deleting the Listing using the Listing Id and Redirecting to the Listings Page
module.exports.deleteListing = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  // Deleted Listing Image From Cloudinary Storage
  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
