// Description: Node.js HTML client
// requires: npm install express ejs axios body-parser

const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');
const path = require("path");

// Base URL for the API
const base_url = "http://localhost:3000";

// ========================
// VIEW ENGINE FIXED ✅
// ========================
app.set("views", path.join(__dirname, "views"));   // 👈 แก้ตรงนี้
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ========================
// ROUTES
// ========================

// Show all books
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books", { books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Show single book
app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Create page
app.get("/create", (req, res) => {
    res.render("create");
});

// Create book
app.post("/create", async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            author: req.body.author
        };

        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Update page
app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Update book
app.post("/update/:id", async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            author: req.body.author
        };

        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Delete book
app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

const port = process.env.PORT || 5500;
app.listen(port, () => 
    console.log(`Listening on http://localhost:${port}`)
);
