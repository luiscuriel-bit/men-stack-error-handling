// controllers/fruits.js
const express = require('express');
const router = express.Router();

const Fruit = require('../models/fruit.js');

router.get('/new', (req, res) => {
    res.render('fruits/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        // throw new Error("A problem occured!");

        if (!req.body.name.trim()) {
            throw new Error("Invalid input: The name field cannot be empty!");
        }
        await Fruit.create(req.body);
        req.session.message = "Fruit successfully created.";
        res.redirect('/fruits');
    } catch (error) {
        // console.log(err.message);
        // res.send("An error has occurred.  Go back and try again.");

        // res.render("error.ejs", { msg: err.message });
        req.session.message = error.message;
        res.redirect("/fruits");
    }
});

router.get('/', async (req, res) => {
    const foundFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: foundFruits });
});

module.exports = router;
