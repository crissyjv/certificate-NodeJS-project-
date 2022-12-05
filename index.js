const express = require("express");
const app = express();
const port = 8080;
const userRoutes = require("./views/userRoutes");
const cartRoutes =require("./views/cartRoutes");
const wishlistRoutes =require("./views/cartRoutes");

app.use(express.json());
app.use(userRoutes);
app.use(wishlistRoutes);
app.use(cartRoutes);


app.listen(port,() => {
    console.log(`server started running on port ${port}`);
})