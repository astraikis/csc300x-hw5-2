const express = require("express");
const multer = require("multer");

const app = express();

// Middleware
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Data
let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];

let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

// Get jokebook categories
app.get("/jokebook/categories", (req, res) => {
    res.status(200);
    res.send(categories);
});

// Get jokes from category
app.get("/jokebook/joke/:category", (req, res) => {
    res.type("json");
    const category = req.params["category"];
    const limit = req.query["limit"];

    // Handle invalid category
    if (!categories.includes(category)) {
        res.status(400);
        res.send({
            "error": "no category listed for " + category,
        });
        return;
    }

    res.status(200);
    if (category === "funnyJoke") {
        res.send(funnyJoke.slice(0, limit));
    } else {
        res.send(lameJoke.slice(0, limit));
    }
});

// Add new joke
app.post("/jokebook/joke/new", (req, res) => {
    res.type("json");

    const category = req.body.category;
    const joke = req.body.joke;
    const response = req.body.response;

    // Check parameters
    if (!category ||
        (category !== "funnyJoke" && category !== "lameJoke") ||
        !joke || !response) {
            res.status(400);
            res.send({
                "error": "invalid or insufficient user input"
            });
            return;
    }

    res.status(200);
    if (category === "funnyJoke") {
        funnyJoke.push({
            "joke": joke,
            "response": response
        });
        res.send(funnyJoke);
    } else {
        lameJoke.push({
            "joke": joke,
            "response": response
        });
        res.send(lameJoke);
    }
});

// Start server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + "...");
});