import axios from "axios";

export const getPokemons = async (offset, limit) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(res => {
                if (res && res.data && res.data.results.length > 0) {
                    let pokemons = res.data;
                    resolve(pokemons);
                }
            }).catch(error => {
                reject(error);
            })
    })
}

export const getPokemonsByUrl = async (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url).then(res => {
                if (res && res.data && res.data.results.length > 0) {
                    let pokemons = res.data;
                    resolve(pokemons);
                }
            }).catch(error => {
                reject(error);
            })
    })
}

export const getPokemonData = async (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
    })
}

export const getPokemonById = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => {
            resolve(res.data);

        }).catch(error => {
            reject(error);
        })
    })
}


