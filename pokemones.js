const axios = require("axios");


const urlPokemones = "http://pokeapi.co/api/v2/pokemon?limit=150";

const getPokemon = (objetoPokemon) => axios.get(objetoPokemon.url);

const getPokemones = async () => {
  const { data } = await axios.get(urlPokemones);
  const listaDePromesas = await Promise.all(data.results.map(getPokemon));
  return listaDePromesas;
};

const datosListaPokemones = async () => {
  const listaRequestPokemon = await getPokemones();
  const listaPokemones = listaRequestPokemon.map(({ data }) => data);
  return listaPokemones;
};

module.exports = datosListaPokemones;
