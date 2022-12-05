const express = require("express");
const router = express.Router();
const { getCollection } = require("../dbConnection");
const { ObjectId } = require("mongodb");


router.put("/wishlist", async (req, res) => {
    const collection = await getCollection();
    const wishlistData = await collection.findOne({ userID: ObjectId(req.params.id) }, { productId: ObjectId(req.params.id) });
    if (wishlistData.matchedCount != 0) {
        const addToWishlist = await collection.insertOne(req.body);
        res.json(addToWishlist);
    } else {
        const removeFromWishlist = await collection.deleteOne({ productId: ObjectId(req.params.id) });
        res.json(removeFromWishlist);

    }
})

module.exports = router;