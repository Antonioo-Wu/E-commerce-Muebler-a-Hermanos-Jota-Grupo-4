const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(logger);
app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
    res.send('Prueba');
});

app.post(`/test-post`, (req, res) => res.json({ok:true, body: req.body}));

app.listen(PORT, () => {
    console.log(`Sevidor corriendo en ${PORT}`);
});