const connectToMongo = require("./db.js");
const express = require('express');
const Link = require("./models/Link.js");

connectToMongo()

const app = express()
const port = 3000
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.get('/:short', async (req, res) => {
    const short = await Link.findOne({ short: req.params.short });
    if (short) {
        short.visits += 1;
        if(!short.original.includes("https")){
            short.original = "https://www."+short.original;
        }
        
        await short.save();
        res.redirect(short.original);
    } else {
        res.status(404).send('URL not found');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})