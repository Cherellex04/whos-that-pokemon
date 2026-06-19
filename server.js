const express = require("express");
const app = express();
const PORT = 3000;
const poke_id = String((Math.floor(Math.random()*1024))+1); 
let game_id;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the root route");
});

app.get('/new', async (req, res) => {
    game_id = Buffer.from(poke_id, 'utf-8').toString('base64');
    res.send(game_id);
});

app.get('/hint/:game_id/:n', async (req, res) => {
    const hint = Number(req.params.n);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}/`);
    const pokemon = await response.json();

    const firstMove = pokemon.moves[0].move.name;
    const secondMove = pokemon.moves[1]?.move.name;
    const type = pokemon.types[0].type.name;
    const height = pokemon.height; 
    const weight = pokemon.weight;
    const cries = pokemon.cries.latest;

    switch(hint){
        case 1:
            return res.send("First Move: " +firstMove);
        case 2:
            return res.send("Second Move: " + secondMove);
        case 3:
            return res.send("Type: " + type);
        case 4:
            return res.send("Height: " + height + " Weight: " + weight);
        case 5:
            return res.send("Cry: " + cries);
        default:
            return res.status(400).send("Hint must be between 1-5");

    };
});
app.get('/guess/:game_id/:guess', async (req, res) => {
    const guess = req.params.guess; 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}/`);
    const pokemon = await response.json();
    const name = pokemon.name; 
    
    if (guess.toUpperCase() == name.toUpperCase()){
        return res.send("Good job, you got it right! Brownie points for you !");
    }else{
        return res.send("Sorry, not right. Try again!");
    }
});


    



   /* if (hint>5 || hint<1){
        res.send("Not valid! Hint value must be between 1-5");
        return;
    }else if (hint == 1){
        res.json(firstMove); 
    }else if (hint == 2){

    }*/


/*
app.get('/guess', (req, res) => {

});
*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
