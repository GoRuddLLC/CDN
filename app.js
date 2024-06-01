const express = require('express');
const { MongoClient } = require('mongodb');
const app = express()

const path = require('path')
require('dotenv').config()

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

function isImageFile(file) {
    const ext = path.extname(file).toLowerCase();
    return allowedExtensions.includes(ext);
}

app.get('/image/:ID', (req, res) => {
    let image_file = req.params.ID;
    if (isImageFile(image_file)) {
        res.sendFile(path.join(__dirname, 'images', image_file));
    } else {
        res.status(400).send('Invalid file type');
    }
});

app.get('/image/logo/:ID', (req, res) => {
    let image_file = req.params.ID;
    if (isImageFile(image_file)) {
        res.sendFile(path.join(__dirname, 'images', 'logo', image_file));
    } else {
        res.status(400).send('Invalid file type');
    }
});


app.get('/restaurant/:ID', async(req, res)=>
{
    let client = await new MongoClient(process.env.MONGO_URI).connect();
    let DB = client.db('GoRudd');
    let USER_DB = DB.collection('users');

    let rest = await USER_DB.findOne({r_id: req.params.ID})
    let restaurant = rest.restaurant
    res.json({data: restaurant})
})
    
app.get("*", (req, res)=>
{
    res.status(404).json({error: "404"})
})

app.listen(2999)