const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedin,validateListing, isOwner} = require("../middleware.js")
const listingController = require("../controllers/listing.js")


router
    .route("/")
    .get( wrapAsync(listingController.Index))
    .post(isLoggedin, validateListing, wrapAsync(listingController.createListing))
    

// NEW ROUTE
router.get("/new",isLoggedin, listingController.renderNewform)

router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(isLoggedin,validateListing,isOwner, wrapAsync(listingController.updateListing))

// Edit listing form
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.renderEditform))

//Delete listing
router.delete("/:id/delete",isLoggedin,isOwner, wrapAsync(listingController.destroyListing))

module.exports = router;