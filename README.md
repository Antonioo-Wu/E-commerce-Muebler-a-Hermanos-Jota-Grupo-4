# 🪑 E-commerce Mueblería Hermanos Jota
Proyecto grupal del Grupo 4 desarrollado en el marco de la Certificación Avanzada Full Stack Developer - ITBA

## 👥 Integrantes

| Integrante | GitHub |
|------------|--------|
| Cuenca Antonella Denisse | [Fuwanto](https://github.com/Fuwanto) |
| Julieta Delfina Sayago | [julisayago](https://github.com/julisayago) |
| Josefina Gorrochategui | [josefinagorro](https://github.com/josefinagorro) |
| Antonio Wu | [Antoniooo-Wu](https://github.com/Antonioo-Wu) |
| Maximiliano Gabriel Crespin | [MaxawaC](https://github.com/MaxawaC) |

## 📌 Descripción del proyecto  

Este proyecto es una aplicación **cliente-servidor** que simula un e-commerce para la "Mueblería Hermanos Jota".  
Se desarrolló en dos partes dentro de un mismo repositorio (monorepo):

- **Backend**: Servidor con Node.js y Express que expone una API REST con datos de productos.  
- **Frontend**: Aplicación en React que consume la API y muestra dinámicamente los productos, carrito de compras y formulario de contacto.


## 🛠️ Tecnologías utilizadas

- **Backend**: Node.js, Express  
- **Frontend**: React, JavaScript, HTML, CSS  
- **Control de versiones**: Git y GitHub

## ⚙️ Instalación y ejecución del proyecto

> 📝 **Requisitos previos:** Tener instalado [Node.js](https://nodejs.org/) y npm.

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Antonioo-Wu/E-commerce-Muebler-a-Hermanos-Jota-Grupo-4.git
cd E-commerce-Muebler-a-Hermanos-Jota-Grupo-4
```

### 2️⃣ Configurar e iniciar el backend

Entrar a la carpeta backend e instalar las dependencias:

```bash
cd backend
npm install
```
Iniciar el servidor:

```bash
npm start
```

### 3️⃣ Configurar e iniciar el frontend

Abrí una nueva terminal, volvé a la raíz del proyecto y entrá a la carpeta client:

```bash
cd ../client
npm install
```

## 🔗 Sitios desplegados

- Backend (API): https://e-commerce-muebler-a-hermanos-jota-grupo.onrender.com
- Frontend (sitio): https://e-commerce-muebler-a-hermanos-jota-g4.netlify.app/

## 🧩 Variables de entorno (configurar para ejecutar localmente)

Este proyecto utiliza variables de entorno en el backend y en el frontend. A continuación hay instrucciones y ejemplos para configurar las variables necesarias.

### Backend

1. En la carpeta `backend` create un archivo llamado `.env` (no lo subas al repo).
2. Variables recomendadas (ejemplo `.env`):

```
# Puerto opcional (por defecto 4000)
PORT=4000

# Cadena de conexión a MongoDB (reemplazar por tu URI local o de nube)
MONGO_URI=mongodb://localhost:27017/hjdb

# Cloudinary (si vas a usar subida de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Nota: Si no configuras `PORT`, el servidor usará 4000 por defecto.

### Frontend (React)

1. En la carpeta `client` puedes crear un archivo `.env` para definir la URL de la API usada por la app en desarrollo.

Ejemplo `client/.env`:

```
REACT_APP_API_URL=http://localhost:4000
```

Notas:

- La app cliente usa `process.env.REACT_APP_API_URL` y por defecto caerá a `http://localhost:4000` si la variable no está definida.

## 📌 Resumen rápido

- Sitios desplegados:
  - Backend: https://e-commerce-muebler-a-hermanos-jota-grupo.onrender.com
  - Frontend: https://e-commerce-muebler-a-hermanos-jota-g4.netlify.app/
- Variables clave a configurar localmente:
  - Backend: `MONGO_URI`, (opcional) `PORT`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - Frontend: `REACT_APP_API_URL`

Iniciar la aplicación React:

```bash
npm start
```
