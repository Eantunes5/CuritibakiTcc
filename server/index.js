import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from './src/routes/user.route.js';
import authRoute from  './src/routes/auth.route.js';
import localsRoute from './src/routes/locals.route.js';
import ratingRoute from './src/routes/rating.route.js';
import emergencyRoute from './src/routes/emergency.route.js';
import conquestsRoute from './src/routes/conquests.route.js';
import analyticsRoute from './src/routes/analytics.route.js';
import complaintsRoute from './src/routes/complaints.route.js';
import localsAuxRoute from './src/routes/localsAux.route.js';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
//var cors = require('cors')
//const swaggerUi = require('swagger-ui-express.cjs')
//const swaggerFile = require('./swagger_output.json')


connectDatabase();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use("/user", userRoute);
app.use("/auth", authRoute); 
app.use("/locals", localsRoute);
app.use("/rating", ratingRoute);
app.use("/emergency", emergencyRoute);
app.use("/conquests", conquestsRoute);
app.use("/analytics", analyticsRoute);
app.use("/complaints", complaintsRoute);
app.use("/localsAux", localsAuxRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));