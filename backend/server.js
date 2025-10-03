const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(logger);
app.use(cors());
app.use(express.json());

//RUTAS DE PRUEBAS
app.get(`/`, (req, res) => {
    res.send('Prueba');
});

app.post(`/test-post`, (req, res) => {
    res.json({ok:true, body: req.body});
});

app.get('/test-error', (req, res, next) => {
    const err = new Error ('error de prueba');
    err.status = 400;
    next(err);
});

app.get('/test-500', (req, res, next) => {
    try {
        throw new Error('falla interna del servidor');
    } catch (err) {
        next(err);
    }
});



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Sevidor corriendo en puerto: ${PORT}`);
});