const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler');
const productosRouter = require('./routes/productos');

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(logger);
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRouter);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});