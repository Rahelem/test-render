import express from 'express';
import animeRouter from './router/animes/router.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Anime API 🎌');
});


app.use('/api/animes', animeRouter);

export default app;


