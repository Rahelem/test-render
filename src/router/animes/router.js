import express from 'express';
import animes from './animes.js';


const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json(animes);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const anime = animes.find(a => a.id === id);

    if(!anime) {
        res.status(400).json({ message: "Anime not found" });
    }

    res.json(router);
});

router.post('/', (req, res) => {
    const {id, title, genre } = req.body;
    if ( !id | !title | !genre) {
        res.status(404).json({ message: "Missing fields"})
    }

    const newAnime = {id, title, genre};
    animes.push(newAnime);
    res.status(201).json(newAnime)
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const anime = anime.find(a => a.id === id);

    if(!anime) {
        res.status(404).json({ error: "Anime not found"});
    }

     const { title, genre } = req.body;
  if (title) anime.title = title;
  if (genre) anime.genre = genre;

  res.status(200).json(anime);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = animes.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Anime not found' });
  }

  const deleted = animes.splice(index, 1);
  res.status(200).json({ deleted });
});


export default router;