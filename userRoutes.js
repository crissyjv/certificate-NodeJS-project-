
const express = require("express");
const router = express.Router();
const { getCollection } = require("../dbConnection");

router.post("/register", async (req, res) => {
    const { username, email, contactNumber, userType } = req.body;
    if (!username || !email || !contactNumber || !userType) {
        return res.status(400).json({ Error: "Fields are missing" });
    }
    const collection = await getCollection();
    try {
        const result = await collection.insertOne(req.body);
        res.status(200).res.json(result);
    }
    catch (err) {
        res.status(400).json(err);

    }

})

router.post("/login", async (req, res) => {
    const collection = await getCollection();
    const userData = collection.insertOne(req.body);
    if (userData.matchedCount != 0) {
        return res.status(200).json({ message: "login Successful" })
    } else {
        return res.status(400).json({ message: "Invalid Login Credentials" })
    }
});
router.get("/viewUser/:username", async (req, res) => {
    try {
        const collection = await getCollection();
        const userData = collection.findOne({ username: req.params.username });
        return res.status(200).json(userData);
    } catch (err) {
        return res.status(404).json({ Error: "No user found with this username" });
    }

});
router.put("/updateUser", async (req, res) => {

    const collection = await getCollection();
    const userData = collection.findOne({ username: req.params.username });
    if (userData.matchedCount != 0) {
        const updateUser = collection.updateOne({ username: req.params.username }, { $set: req.body });
        res.status(200).json(updateUser)
    }
    else {
        return res.status(404).json({ Error: "No user found with this username" });
    }

});


router.get("/homepage", async (req, res) => {

});

router.get("/product/:productID", async (req, res) => {
    const collection = await getCollection();
    const productData = await collection.find().toArray();
    res.json(productData)
})


module.exports = router;