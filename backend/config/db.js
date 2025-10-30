const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if(!MONGO_URI) throw new Error("La URI de MongoDB no está configurada en el archivo .env")
        
        await mongoose.connect(MONGO_URI);

        console.log("Conexion exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;