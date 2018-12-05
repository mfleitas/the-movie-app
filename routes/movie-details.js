const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config/api');
const helpers = require('../helpers');

router.get('/:movieId', (req, res) => {
    const url = `${config.omdbBaseUrl}/?i=${req.params.movieId}&apikey=${config.omdbKey}`;
    // http://www.omdbapi.com/?i=tt3766354&apikey=ff8e8da0
    
    helpers.getMovieDetails(url)
        .then(movie => {
            res.render('movie', {movie: movie});
        })
});

module.exports = router;