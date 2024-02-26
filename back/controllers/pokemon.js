const axios = require('axios')
const FavPokemons = require('../model/favPokemons')

exports.search = async (req, res) => {
  const { pokemon } = req.body

  if(!pokemon) {
    return res.status(401).json({
      success: false,
      message: 'Please provide pokemon name or ID number'
    })
  }

  const searchedPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)

  if(!searchedPokemon) {
    return res.status(501).json({
      success: false,
      message: 'Error at Pokemon server, please try again'
    })
  }

  return res.status(200).json({
    success: true,
    pokemon: searchedPokemon.data
  })
}

exports.favPokeRegister = async (req, res) => {

  const { pokeName, pokeId, pokeImage } = req.body

  const savedFavPokemon = await FavPokemons.create(
    {
      pokename: pokeName,
      pokeId: pokeId,
      image: pokeImage,
    }
  )

  if(!savedFavPokemon) {
    return res.status(501).json({
      success: false,
      message: 'Error at creating favPokemon on MongoDB'
    })
  }

  return res.status(200).json({
    success: true,
    favPokemon: savedFavPokemon
  })
}