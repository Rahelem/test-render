import express from 'express';
import animes from './animes.js';


const router = express.Router();


function validateAnimeData(req, res, next) {
    const {title, genre} = req.body;
    if(!title || !genre) {
        res.status(400).json({ error: "Missig title and/or genre"});
        return
    }

    if (typeof title !== "string" || typeof genre !== "string") {
        res.status(400).json({ error: "Title and genre must be a string"});
        return
    }
    next()
}

function validateAnimeId(req, res, next) {
    const id = Number(req.params.id);
    const found = animes.find(a => a.id === id);
    if (!found) {
        res.status(404).json({ error: "Anime not found" });
        return
    }
    next();
};


router.get('/', (req, res) => {
    res.status(200).json(animes);
});



router.get('/:id', validateAnimeId, (req, res) => {
    const id = parseInt(req.params.id);
    const anime = animes.find(a => a.id === id);

    if(!anime) {
        res.status(400).json({ message: "Anime not found" });
    }

    res.json(router);
});

router.post('/', validateAnimeData, (req, res) => {
    const { title, genre } = req.body;
   

    const newAnime = { id: animes.length + 1, title, genre };
    animes.push(newAnime);
    res.status(201).json(newAnime)
});

router.patch('/:id', validateAnimeId, (req, res) => {
    const id = parseInt(req.params.id);
    const anime = anime.find(a => a.id === id);

    const { title, genre } = req.body;
    if (title) anime.title = title;
    if (genre) anime.genre = genre;

    res.status(200).json(anime);
});

router.put('/:id', validateAnimeId, validateAnimeData, (req, res) => {
    const id = parseInt(req.params.id);
    const anime = animes.find(a => a.id  === id);

    const { title, genre } = req.body;
    anime.title = title; 
    anime.genre = genre; 

    res.status(200).json(anime);
});

router.delete('/:id', validateAnimeId, (req, res) => {
    const id = parseInt(req.params.id);
    const index = animes.findIndex(a => a.id === id);
    const deleted = animes.splice(index, 1);
  
    res.status(200).json({ deleted });
});


export default router;