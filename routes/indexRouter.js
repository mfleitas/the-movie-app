const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config/api');
const helpers = require('../helpers');


router.get('/', (req, res) => {
    
    // const url = `${config.queryUrl}/discover/movie?api_key=${config.key}&primary_release_date.gte=2018-06-01`;
    // console.log(url);
    // const { getViewData, getOtheData } = require('../helpers')
    // fetch(url)
    //     .then(data => data.json())
    //     .then(json => {
    //         // const viewData = getViewData(json);
    //         res.render('index', json);
    //         console.log(json);
    //     });
    helpers.setLocalStorage();
    
    helpers.getNowPlayingMovies()
        .then(movies => {
            res.render('index', movies);
        });

    

});



module.exports = router;

