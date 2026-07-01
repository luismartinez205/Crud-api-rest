import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import   'dotenv/config';
import cors from "cors";
const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

import productRouter from './routes/products.router.js'
app.use('/api',productRouter);

import orderRouter from './routes/orders.router.js'
app.use('/api',orderRouter);

import userRouter from './routes/users.router.js'
app.use('/api',userRouter);

import categoryRouter from './routes/category.router.js'
app.use('/api',categoryRouter);

import loginRouter from './routes/login.router.js'
app.use('/api', loginRouter);

import searchRouter from './routes/search.router.js'
app.use('/api', searchRouter);

//si no se encuentra la ruta, se muestra un mensaje de error
import notFound from './midlewares/notFound.js';
app.use(notFound);

export default app