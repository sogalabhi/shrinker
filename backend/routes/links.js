const express = require("express");
const Link = require("../models/Link")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Links = require("../models/Link");

const router = express.Router();

//Create a link
router.post('/createlink', [
    body('original').isLength({ min: 3 }),
], fetchuser, async (req, res) => {
    try {
        let user = req.user.id;
        let { original, short } = req.body;
        if(!original.includes("https://")){
            original = "https://"+original
        }
        if (!short) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let short = '';
            const length = 5;
            for (let i = 0; i < length; i++) {
                short += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            const link = new Link({
                original,
                short,
                user,
                visits:0
            })
            const saveLink = await link.save();
            res.json(saveLink)
        }
        else {
            let l = await Link.findOne({ short: req.body.short });
            if (l) {
                return res.status(400).json({ error: "Shortened url already exists" });
            }
            const link = new Link({
                original,
                short,
                user,
                visits:0
            })
            const saveLink = await link.save();
            res.json({ saveLink })
        }

    } catch (error) {
        res.status(500).send({ error })
    }
})

//Read all Links
router.get('/alllinks', fetchuser, async (req, res) => {
    try {
        let user = req.user.id;
        const links = await Links.find({ user });
        res.json(links);
    } catch (error) {
        res.status(500).send({ error })
    }
})

//Update a link
router.put('/updatelink/:id', fetchuser, async (req, res) => {
    try {
        let user = req.user.id;
        let { original, short } = req.body;
        let newLink = {}
        if (original) { newLink.original = original }
        if (short) {
            let l = await Link.findOne({ short });
            if (l) {
                return res.status(400).json({ error: "Shortened url already exists" });
            }
            else {
                newLink.short = short
            }
        }

        let link = await Links.findById(req.params.id);
        if (!link) { return res.status(404).send("Link not found") }

        if (link.user.toString() !== user) {
            return res.status(401).send("not allowed")
        }

        link = await Link.findByIdAndUpdate(req.params.id, { $set: newLink }, { new: true });
        res.send({ link });
    } catch (error) {
        res.status(500).send({ error })
    }
})

//Delete a link
router.delete('/deletelink/:id', fetchuser, async (req, res) => {
    try {
        let user = req.user.id;

        let link = await Links.findById(req.params.id);
        if (!link) { return res.status(404).send("Link not found") }

        if (link.user.toString() !== user) {
            return res.status(401).send("not allowed")
        }

        link = await Link.findByIdAndDelete(req.params.id);
        res.send({ link });
    } catch (error) {
        res.status(500).send({ error })
    }
})

module.exports = router;