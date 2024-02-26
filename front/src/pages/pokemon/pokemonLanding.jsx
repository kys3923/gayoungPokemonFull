import axios from 'axios'
import { useEffect, useState } from 'react'

const PokemonLanding = (props) => {

  // useEffect(() => {
  //   console.log('useEffect')
  // },[])

  const [ searchedPokemon, setSearchedPokemon ] = useState('')
  const [ receivedPokemon, setReceivedPokemon ] = useState()

  const searchChangeHandler = (e) => {
    setSearchedPokemon(e.target.value)
  }

  const searchButtonHandler = (e) => {

    if(searchedPokemon == '') {
      return
    }

    let sendingData = {
      pokemon: searchedPokemon
    }

    // API call

    const requestToAPI = async (data) => {
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/pokemon/search`, data) 
        if(response) {
          setReceivedPokemon(response.data.pokemon)
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI(sendingData)

  }

  const addFavPokemonButtonHandler = (e, pokemon) => {
    
    let sendingData = {
      pokeName: pokemon.name,
      pokeId: pokemon.id,
      pokeImage: pokemon.sprites.front_default
    }
    
    const requestToAPI = async (data) => {
      console.log(data)
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/pokemon/addFavPokemon`, data)
        if(response) {
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI(sendingData)
  }

  return (
    <div>
      <p>Search your favorite pokemon</p>
      <div>
        <input type='text' value={searchedPokemon} onChange={searchChangeHandler} />
        <button onClick={searchButtonHandler}>Search</button>
      </div>
      {receivedPokemon && <div>
          <img src={receivedPokemon.sprites.front_default} />
          <p>{receivedPokemon.name}</p>
          <button onClick={(e) => addFavPokemonButtonHandler(e, receivedPokemon)}>Add to Fav</button>
        </div>
      }
    </div>
  );
}
export default PokemonLanding;

// call pokeAPI with a button
// -> backend response searched pokemon
