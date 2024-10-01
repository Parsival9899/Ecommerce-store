import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoute from './routes/product.route.js';
import path from 'path';

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();
const app = express();  


app.use(express.json());

app.use('/api/product', productRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
} 

app.listen(port, ()=>{
    connectDB();    
    console.log(`server is running on https://localhost:${port}`);
})