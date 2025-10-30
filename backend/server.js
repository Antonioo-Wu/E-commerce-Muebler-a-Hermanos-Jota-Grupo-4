const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler');
const productosRouter = require('./routes/productos');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(logger);
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRouter);

// prueba
app.get('/', (req, res) => {
    res.json({mensaje: "Servidor funcionando y conectado a MongoDB"});
});

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar el server despues de conectar a la BD
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto: ${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor: ", error.message);
        process.exit(1);
    }
};
startServer();