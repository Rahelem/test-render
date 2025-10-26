import express from 'express';
import animeRouter from './router.js';


const app = express();

app.use(express.json());

 app.get('/', (req, res) => {
    res.send('Hello');
 });

export default app; 

