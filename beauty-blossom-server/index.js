// https://github.com/programming-hero-web-course-4/b8a10-brandshop-server-side-eftekher-alam

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PROT || 5000;
// middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())



const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.ougk6tn.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const database = client.db("beautyDB");


        const productsCollection = database.collection("products");
        const brandsCollection = database.collection("brands");
        const usersCollection = database.collection("users");
        const cartProductCollection = database.collection("cartProducts");

        /* ===================================================
                                cartProducts
         ===================================================*/

        app.get("/cartProducts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { UserId: id };
            const cursor = cartProductCollection.find(query);
            const cartProducts = await cursor.toArray();
            res.send(cartProducts);
        })

        app.post("/cartProduct", async (req, res) => {
            const cartProduct = req.body;
            const result = await cartProductCollection.insertOne(cartProduct);
            res.send(result);
        })

        app.delete("/cartProducts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartProductCollection.deleteOne(query);
            res.send(result);
        })
        /* ===================================================
                                Brand
         ===================================================*/

        app.post("/user", async (req, res) => {
            const user = req.body;

            const query = { uid: user.uid };
            const userExist = await usersCollection.findOne(query);
            if (userExist)
                return;

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        /* ===================================================
                                Brand
         ===================================================*/

        app.get("/brands", async (req, res) => {
            const cursor = brandsCollection.find();
            const brands = await cursor.toArray();
            res.send(brands);
        })

        app.get("/brand/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const brand = await brandsCollection.findOne(query);
            res.send(brand);
        })

        app.get("/brandProducts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { BrandID: id };
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })






        /* ===================================================
                                Product
        ===================================================*/

        app.get("/products", async (req, res) => {
            const cursor = productsCollection.find();
            const products = await cursor.toArray();
            res.send(products);
        })

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        })

        app.put("/product/:id", async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            const { ProductName, BrandID, BrandName, BrandPhoto, ShortDescription, Rating, Photo, Price } = product;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateProduct = {
                $set: { ProductName, BrandID, BrandName, BrandPhoto, ShortDescription, Rating, Photo, Price },
            };
            const result = await productsCollection.updateOne(query, updateProduct, options);
            res.send(result);
        })

        app.post("/product", async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })


        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", async (req, res) => {
    res.send("Working Server");
});


app.listen(port, () => {
    console.log("beauty-blossom-server is running on the prot ", port);
})