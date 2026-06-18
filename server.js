const express = require("express");
const app = express();
const activeIDs = new Set();
const PORT = 3000;
let poke_id;
let game_id;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the root route");
});

app.get('/new', async (req, res) => {
    poke_id = String((Math.floor(Math.random()*1024))+1);
    game_id = Buffer.from(poke_id, 'utf-8').toString('base64');
    activeIDs.add(game_id);
    res.send(game_id);
});

app.get('/hint/:game_id/:n', async (req, res) => {
    const hint = Number(req.params.n);
    let x;
    if (hint>5 || hint<0){
        res.send("Not valid! Hint value must be between 1-5");
        return;
    }else if (hint == 1){
        const response = await fetch("pokeapi.co/api/v2/move/" + poke_id);
        x = await response.json();
    }
    res.send(x);
});

/*
app.get('/guess', (req, res) => {

});
*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
