
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://crissyjv:1995@cluster0.dvxddzp.mongodb.net/?retryWrites=true&w=majority";
const mongoclient = new MongoClient(uri, { useNewUrlParser: true, UseUnifiedTopology: true });

async function getCollection() {

    try {
        let result = await mongoclient.connect();
        console.log("DB Connected");
        const collection = result.db("shopping").collection("user");

    } catch (err) {
        console.log("DB Connection Failed")

    }
}

module.exports = { getCollection };