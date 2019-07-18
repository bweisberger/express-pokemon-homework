const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const Pokemon = require('./models/pokemon')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

//index route
app.get('/pokemon', (req, res)=>{
  res.render('index.ejs', {pokemon: Pokemon})
});

//new page, feeds to post route
app.get('/pokemon/new', (req, res)=>{
  res.render('new.ejs');
});

//edit page, feeds to put route
app.get('/pokemon/:index/edit', (req, res)=>{
  console.log(Pokemon[req.params.index].name, "<----pokemon name at index")
  res.render('edit.ejs', {
    pokemon: Pokemon[req.params.index],
    index: req.params.index
  });
})

//put route
app.put('/pokemon/:index', (req, res)=>{
  req.body.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}.jpg`
  Pokemon[req.params.index] = req.body
  res.redirect('/pokemon');
})

//delete Route
app.delete('/pokemon/:index', (req, res)=>{
  Pokemon.splice(req.params.index, 1);
  res.redirect('/pokemon');
})

//post route
app.post('/pokemon', (req, res)=>{
  console.log(req.body)
  req.body.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}.jpg`
  Pokemon.push(req.body);
  res.redirect('/pokemon')
});

//show route
app.get('/pokemon/:index', (req, res)=>{
  res.render('show.ejs', {pokemon: Pokemon[req.params.index], index: req.params.index})
});

app.listen(3000,()=>{
  console.log('listening on port 3000')
});


module.exports = app;
