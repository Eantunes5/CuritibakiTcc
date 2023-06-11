import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from './src/routes/user.route.js';
import authRoute from  './src/routes/auth.route.js';
import localsRoute from './src/routes/locals.route.js';
import ratingRoute from './src/routes/rating.route.js';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
//var cors = require('cors')

connectDatabase();
app.use(express.json());
app.use(cors())
app.use("/user", userRoute);
app.use("/auth", authRoute); 
app.use("/locals", localsRoute);
app.use("/rating", ratingRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));