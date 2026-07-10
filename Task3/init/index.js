const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/Wonderlus";

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

// Function to Initialize the Database with Default Listings
const initDB = async () => {
  await Listing.deleteMany({});
  // Assigning a default owner ID to each listing before inserting them into the database
  initData.data.forEach((listing) => {
    listing.owner = "6a508adfccfb08b53346976d"; // Replace with the actual user ID
  });
  console.log(initData.data);
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
