const Listing = require("../models/listing.js")


module.exports.Index = async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listing/index.ejs", { allListings })
}

module.exports.renderNewform = (req, res) => {
    res.render("listing/new.ejs")
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id).populate({path : "reviews", populate : {path:"author",},}).populate("owner")
    if (!listing) {
        req.flash("error"," listing does not exist!")
        res.redirect("/listings")
    }
    res.render("listing/show.ejs", { listing })
}

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash("success","New listing created!")
    res.redirect("/listings")
}

module.exports.renderEditform = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error"," listing does not exist!")
        res.redirect("/listings")
    }
    res.render("listing/edit.ejs", { listing })
}

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash("success"," listing updated!")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success"," listing deleted!")
    res.redirect("/listings")
}