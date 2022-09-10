import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ pokemonNames }) => {
  const [pokemon, setPokemon] = useState({ name: "" });
  const [autcompletList, setAutocompleteList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setPokemon({ name: inputValue });
    if (!inputValue) {
      setAutocompleteList([]);
      return;
    }
    let resultSet = [];
    for (let i = 0; i < pokemonNames.length; i++) {
      if (
        pokemonNames[i].name.substr(0, inputValue.length).toUpperCase() ==
        inputValue.toUpperCase()
      ) {
        resultSet.push(pokemonNames[i].name);
      }
    }
    setAutocompleteList(resultSet);
  };

  const handleItemClick = (value) => {
    setPokemon((prevState) => {
      let newState = { ...prevState, name: value };
      return newState;
    });
    setAutocompleteList([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pokemon.name) {
      let result = pokemonNames.filter((x) => x.name === pokemon.name)[0];
      const regex = /\d+(?=\/$)/g;
      navigate("/pokemon/" + result.url.match(regex)[0]);
    }
  };
  return (
    <form autoComplete="off" className="search-form" onSubmit={handleSubmit}>
      <div className="autocomplete" style={{ width: 300 }}>
        <input
          type="text"
          onChange={handleChange}
          value={pokemon.name}
          placeholder="Pokemon name"
        />
        <div className="autocomplete-list">
          {autcompletList.length > 0 &&
            autcompletList.slice(0, 10).map((item, index) => (
              <div
                key={`name-${index}`}
                className="autocomplete-item"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
      <button className="btn-submit" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
