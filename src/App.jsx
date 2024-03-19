import { useEffect, useState } from "react";
import "./App.css";
import pokemonJson from "./pokemon.json";
import pokemonTypeJson from "./pokemonType.json";

import PokemonThumbnails from "./PokemonThumbnails";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _type = data.types[0].type.name;
          const japanese = await translateToJapanese(data.name, _type);
          const newList = {
            id: data.id,
            name: data.name,
            iconImage: _iconImage,
            image: _image,
            type: _type,
            jpName: japanese.name,
            jpType: japanese.type,
          };
          setAllPokemons((currentList) => [...currentList, newList]);
        });
    });
  };

  const translateToJapanese = async (name, type) => {
    const jpName = await pokemonJson.find(
      (pokemon) => pokemon.en.toLowerCase() === name
    ).ja;
    const jpType = await pokemonTypeJson[type];
    console.log(jpType);
    return { name: jpName, type: jpType };
  };

  console.log(allPokemons);

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              iconImage={pokemon.iconImage}
              type={pokemon.type}
              jpName={pokemon.jpName}
              jpType={pokemon.jpType}
              key={index}
            />
          ))}
        </div>

        {isLoading ? (
          <div className="load-more">now loading...</div>
        ) : (
          <button className="load-more" onClick={getAllPokemons}>
            もっとみる！
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
