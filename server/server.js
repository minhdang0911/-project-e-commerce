const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', (req, res) => {
    res.send('Server running');
});
app.listen(port, () => {
    console.log('server running in port' + port);
});
