const express = require('express')
const router = express.Router()

const { search, favPokeRegister } = require('../controllers/pokemon')

router.route('/search').post(search)
router.route('/addFavPokemon').post(favPokeRegister)

module.exports = router