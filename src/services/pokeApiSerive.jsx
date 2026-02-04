
const BASE_URL = "https://pokeapi.co/api/v2/";

function getPokemons(currentPage, take) {

    const offset = (currentPage - 1) * take;
    const url = `${BASE_URL}/pokemon?limit=${take}&offset=${offset}`;

    return fetch(url).then((response) => response.json());
}

function getPokemonDetails(url){
    return fetch(url).then((response) => response.json());
}

function getMoveDetails(url){
    return fetch(url).then((response) => response.json());
}

export {getPokemons, getPokemonDetails, getMoveDetails};