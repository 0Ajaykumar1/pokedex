import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonById } from "../api";
import Tag from "./Tag";

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonData(id);
  }, [id]);

  const getPokemonData = (id) => {
    getPokemonById(id)
      .then((res) => {
        setPokemon(res);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status !== 200) {
          navigate("/");
        }
      });
  };

  const handleNext = () => {
    let nextId = parseInt(id) + 1;
    getPokemonData(nextId);
    navigate("/pokemon/" + nextId);
  };

  const handlePrev = () => {
    let prevId = parseInt(id) - 1;
    getPokemonData(prevId);
    navigate("/pokemon/" + prevId);
  };

  return (
    <div className="container">
      {Object.keys(pokemon).length > 0 && (
        <div className="pok-page-wrapper">
          <h1 className="page-header">{pokemon.name}</h1>
          <div className="pagination page-nav-btns">
            <button className="nav-btn" onClick={handlePrev}>
              Previous
            </button>
            <button className="nav-btn" onClick={handleNext}>
              Next
            </button>
          </div>
          <div className="pok-section">
            <div className="chars-container">
              <h3>Height</h3>
              <p className="">{pokemon.height}</p>
            </div>

            <div className="page-img-wrapper">
              {pokemon.sprites.front_default ? (
                <img
                  src={pokemon.sprites.front_default}
                  alt=""
                  width="100"
                  height="100"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>

            <div className="chars-container">
              <h3>Weight</h3>
              <p className="tags-list">{pokemon.weight}</p>
            </div>
          </div>

          <div className="tags-container">
            <h3>Abilities</h3>
            <ul className="tags-list">
              {pokemon.abilities.length > 0
                ? pokemon.abilities.map((item, index) => (
                    <Tag {...item.ability} key={`ability-${index}`} />
                  ))
                : "No Abilities"}
            </ul>
          </div>

          <div className="tags-container">
            <h3>Moves</h3>

            <ul className="tags-list">
              {pokemon.moves.length > 0
                ? pokemon.moves.map((item, index) => (
                    <Tag {...item.move} key={`move-${index}`} />
                  ))
                : "No Moves"}
            </ul>
          </div>

          <div className="tags-container">
            <h3>Stats</h3>

            <ul className="tags-list">
              {pokemon.stats.length > 0
                ? pokemon.stats.map((item, index) => (
                    <Tag {...item.stat} key={`stat-${index}`} />
                  ))
                : "No Stats"}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
