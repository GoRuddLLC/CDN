const express = require('express')
const app = express()

const path = require('path')


app.get('/image/:ID', (req, res)=>
{
    let image_file = req.params.ID
    res.sendFile(__dirname + `/images/${image_file}`);
})

app.listen(3000)