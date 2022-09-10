import React, { useEffect, useState } from "react";
import { getPokemonData, getPokemons, getPokemonsByUrl } from "../api";
import PokemonCard from "./PokemonCard";
import SearchForm from "./SearchForm";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();

  useEffect(() => {
    getPokemons(0, 1154).then((allPokemons) => {
      setPokemonNames(allPokemons.results);
    });
    getPokemonDetails().then((res) => {
      setPokemons(res);
      setLoading(false);
    });
  }, []);

  const getPokemonDetails = async (url = null) => {
    let res;
    try {
      if (url) {
        res = await getPokemonsByUrl(url);
      } else {
        res = await getPokemons(0, 20);
      }
    } catch (error) {
      console.log(error);
    }

    if (res && res.results.length > 0) {
      setPrev(res.previous);
      setNext(res.next);
      try {
        let resultset = await getAllPokemonsData(res.results);
        return resultset;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No data found");
    }
  };

  const getAllPokemonsData = async (pokemons) => {
    let dataset = await Promise.all(
      pokemons.map(async (pokemon) => {
        let pokemonData = await getPokemonData(pokemon.url);
        pokemonData.img = pokemonData.sprites.front_default;
        return pokemonData;
      })
    );
    return dataset;
  };

  const handleNext = () => {
    setPokemons([]);
    setLoading(true);
    getPokemonDetails(next)
      .then((res) => {
        setPokemons(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlePrev = () => {
    setPokemons([]);
    setLoading(true);
    getPokemonDetails(prev).then((res) => {
      setPokemons(res);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="container">
          <SearchForm pokemonNames={pokemonNames} />

          <ul className="pokemon-list">
            {pokemons.map((pokemon) => (
              <li key={`pokemon-${pokemon.id}`} className="pokemon-card">
                <PokemonCard {...pokemon} />
              </li>
            ))}
          </ul>

          {/* Pagination  */}
          <div className="pagination">
            <button
              className="nav-btn"
              onClick={handlePrev}
              disabled={!prev}
              style={{ backgroundColor: prev ? "#509095" : "#CCC" }}
            >
              Previous
            </button>
            <button
              className="nav-btn"
              onClick={handleNext}
              disabled={!next}
              style={{ backgroundColor: next ? "#509095" : "#CCC" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
