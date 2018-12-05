const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config/api');
const helpers = require('../helpers');

router.get('/:category', (req, res) => {
    const parameters = {
        baseUrl: config.queryUrl,
        page: req.query.page || 1,
        apiKey: config.key,
        route: req.baseUrl + '/' + req.params.category,
        omdbKey: config.omdbKey,
        omdbBaseUrl: config.omdbBaseUrl,
        mainUrl: `${config.queryUrl}${req.baseUrl}/${req.params.category}?api_key=${config.key}&page=${req.query.page || 1}`
    };

    let category = req.params.category;
    category = category.replace('_',' ');
    console.log(helpers.getPaginationData(parameters.page));
    const info = { category: category, paginationData: helpers.getPaginationData(parameters.page) }
    
    helpers.getData(parameters)
        .then(movies => {
            console.log(movies);
            res.render('moviesTvshows', { movies, info });
        });
    // res.send(parameters);
});
    
module.exports = router;