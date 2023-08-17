require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen( port, () => {
    console.log(`server running at port ${port}`)
})