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
        route: '/movie/' + req.params.category
    };

    helpers.getData(parameters)
        .then(movies => {
            console.log(movies);
            res.json(movies);
        });
});
    
module.exports = router;