const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config/api');
const helpers = require('../helpers');

router.get('/multi', (req, res) => {
    const parameters = {
        baseUrl: config.queryUrl,
        page: req.query.page || 1,
        apiKey: config.key,
        omdbKey: config.omdbKey,
        omdbBaseUrl: config.omdbBaseUrl,
        mainUrl: `${config.queryUrl}/search/multi?query=${req.query.query}&api_key=${config.key}`
        
    };

    let category = 'Search Results';
    console.log(helpers.getPaginationData(parameters.page));
    const info = { category: category, paginationData: helpers.getPaginationData(parameters.page) }
    
    helpers.getData(parameters)
        .then(movies => {
            console.log(movies);
            res.render('moviesTvshows', { movies, info });
        });
   
    
});

module.exports = router;