const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isHost, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, isHost, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
    
//New Route
router.get("/new", isLoggedIn, isHost, listingController.renderNewForm);

//Search Route
router.get("/results", wrapAsync(listingController.searchListings));

//Filter by Category Route
router.get("/category/:category", wrapAsync(listingController.filterByCategory));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isHost, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isHost, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isHost, isOwner, wrapAsync(listingController.renderEditForm));

//Book Route
router.get("/:id/book", isLoggedIn, wrapAsync(listingController.renderBookingForm));
module.exports = router;