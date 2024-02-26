import axios from 'axios'
import { useEffect, useState } from 'react'

const PokemonLanding = (props) => {

  // useEffect(() => {
  //   console.log('useEffect')
  // },[])

  const [ searchedPokemon, setSearchedPokemon ] = useState('')
  const [ receivedPokemon, setReceivedPokemon ] = useState()
  const [ favPokeErrorMessage, setFavPokeErrorMessage ] = useState()
  const [ isfavAdded, setIsfavAdded ] = useState(false)

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
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/pokemon/addFavPokemon`, data)
        if(response) {
          setIsfavAdded(true)
          console.log(response.data)
        }
      } catch (error) {
        setIsfavAdded(false)
        setFavPokeErrorMessage(error.response.data.message)
      }
    }

    requestToAPI(sendingData)
  }

  return (
    <div className='bg-yellow-200 h-full p-8 flex flex-col gap-4'>
      <div className='w-full flex justify-center text-xl text-red-700 font-bold'>
        <p>Search your favorite pokemon</p>
      </div>
      <div className='flex flex-row justify-center text-sm'>
        <input type='text' value={searchedPokemon} onChange={searchChangeHandler} className='rounded-l-md px-4 py-1' />
        <button onClick={searchButtonHandler} className='rounded-r-md bg-red-700 text-white px-2 py-1 hover:bg-red-500'>Search</button>
      </div>
      {receivedPokemon && <div className='w-full flex flex-col items-center border-t-2 border-red-400 pt-4 gap-4'>
        <div className='text-red-700'>
          <p>Searched Pokemon</p>
        </div>
        <div className='flex flex-col items-center text-red-700 bg-white p-8 rounded-md shadow-lg gap-4'>
          <img src={receivedPokemon.sprites.front_default} />
          <p>{receivedPokemon.name}</p>
          {isfavAdded ? 
            <p>added</p>
            :
            <button onClick={(e) => addFavPokemonButtonHandler(e, receivedPokemon)} className='text-sm bg-red-700 px-4 py-1 text-white rounded-md hover:bg-red-500'>Add to Fav</button>
          }
          {favPokeErrorMessage && <p className='text-xs font-bold'>{favPokeErrorMessage}</p>}
        </div>
        </div>
      }
    </div>
  );
}
export default PokemonLanding;

// call pokeAPI with a button
// -> backend response searched pokemon
