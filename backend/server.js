const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "passwordSaver";
let collection;

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    collection = db.collection("passwords");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB:", error);
  }
}

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

app.post("/", async (req, res) => {
  try {
    const password = req.body;
    await collection.insertOne(password);
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert document" });
  }
});

app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    console.log(password);
    await collection.deleteOne(password);
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document" });
  }
});

main();
