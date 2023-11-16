import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import indexRouter from './src/routes/index-route.js';
import { error } from './src/logger/logger.js'
import ApiError from './src/errors/api-error.js';
import { db } from './src/db/index-db.js';

const app = express();

/****** CREACION DE LA BD ******/
try {
  db.sequelize.authenticate()    //  Function to test if the connection is OK
    .then(() => console.log("Connection has been established successfully."))
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}
/*
try {
    // Esto re-hace la BD
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
};
*/
/******************************/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const API_ENDPOINT = process.env.API_ENDPOINT;
console.log(API_ENDPOINT);
if (API_ENDPOINT) {
  app.use(API_ENDPOINT, indexRouter);
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto turnos',
      version: '1.0.0',
      description: 'Esqueleto de practica',
    },
    servers: [
      {
        url: `http://localhost:3000${API_ENDPOINT}`,
      },
    ],
  },
  tags: [
    {
      name: 'Login',
      description: 'Operaciones relacionadas con el login',
    },
    {
      name: 'Users',
      description: 'Operaciones relacionadas con los usuarios',
    },
    {
      name: 'Posts',
      description: 'Operaciones relacionadas con los posts',
    },
    {
      name: 'Comments',
      description: 'Operaciones relacionadas con los comentarios',
    },
  ],
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejador Errores 404 (Ej: entrar a ruta inexistente)
app.use((req, res, next) => {
  // Logger:
  error(JSON.stringify({ status: 404, message: `No existe el recurso solicitado ${req.originalUrl}` }));
  res.status(404).json({ status: 404, message: "No existe el recurso solicitado" });
});

// Manejador de errores personalizados y comunes (500)
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    err(JSON.stringify({ status: err.errorCode, message: err.message }));
    res.status(err.errorCode).json({ status: err.errorCode, error: err.message });
  } else {
    err(JSON.stringify({ status: 500, message: err.message }));
    res.status(500).json({ status: 500, error: err.message });
  }
  //console.log(`Maca`, { err });
});

export default app;