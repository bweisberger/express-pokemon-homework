const express = require('express');
const app = express();

const Pokemon = require('./models/pokemon')

app.use(express.static('public'));

app.get('/pokemon', (req, res)=>{
  res.render('index.ejs', {pokemon: Pokemon})
});

app.listen(3000,()=>{
  console.log('listening on port 3000')
})
