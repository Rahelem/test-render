import express from 'express';

const router = express.Router();

const animes = [
    { id: 1, title: 'Fable', genre: 'Comedy'},
    { id: 2, title: 'Trillion Game', genre: 'Adventure'},
    { id: 3, title: 'Spy x Family', genre: 'Family-adventure'},
    { id: 4, title: 'Blue Lock', genre: 'Sports'},
    { id: 5, title: 'Chainsaw Man', genre: 'Drama'},
    { id: 6, title: 'Jujuts Kaisen', genre: 'Supernatural'},
    { id: 7, title: 'One Piece', genre: 'Adventure'},
    { id: 8, title: 'Dandadan', genre: 'Supernatural'},

router.get('/', (req, res) => {
    res.json(animes);
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
})


export default router;