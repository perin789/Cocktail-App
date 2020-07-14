const cocktailmodule = require('cocktailmodule');
const express = require('express');
const router = express.Router();

router.get('/search/:searchWord', async (req, res) => {
    const searchWord = String(req.params.searchWord);
    try {
        const listOfCocktails = await cocktailmodule.search(searchWord);
        res.json(listOfCocktails);
    } catch (error) {
        res.json(error);
    }
});

router.post('/fetch', async (req, res) => {
    const { cocktailId } = req.body;
    try {
        const details = await cocktailmodule.fetch(cocktailId);
        res.json(details[0]);
    } catch(error) {
        res.json(error);
    }
});

module.exports = router;