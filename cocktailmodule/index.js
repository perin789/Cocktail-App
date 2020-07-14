const axios = require('axios');

// config file to hold the base URL and API key
const config = require('./config.json');

// a function that gets the list of the cocktails to choose from 
const search = async name => {
    const cocktailUrl = `${config.url}search.php?s=${name}`;
    try {
        const cocktailResponse = await axios.get(cocktailUrl);
        const listOfCocktails = cocktailResponse.data;
        return listOfCocktails.drinks;
    } catch (error) {
        return error;
    }
};

// a function that displays informatiom about the selected cocktail
const fetch = async id => {
    const fetchUrl = `${config.url}lookup.php?i=${id}`;
    try {
        const fetchCocktail = await axios.get(fetchUrl);
        const printCocktail = fetchCocktail.data;
        return printCocktail.drinks;
    } catch (error) {
        return error;
    }
};

// export these functions so they can be used
module.exports = {
    search,
    fetch
} 