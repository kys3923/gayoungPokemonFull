const mongoose = require('mongoose')

const FavPokemonsSchema = new mongoose.Schema({
  pokename: String,
  pokeId: Number,
  image: String,
}, {timestamps: true})

const FavPokemons = mongoose.model('FavPokemons', FavPokemonsSchema)

module.exports = FavPokemons