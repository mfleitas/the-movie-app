/*
Setup node server:
npm install
open visual studio code
open the terminal - Ctrl + ` - Multiple terminals can be added at the same time, click +

create a folder for the project
create a folder inside the project for nodejs (backend)

Create jason package

npm init  --> create json package



install express, mysql cors -> for cross site 
npm install express mysql cors


start nodejs server
nodemon index.js -> entry point

Needs to install node-fetch to be able to use fetch for request to server - see link below
https://blogs.missouristate.edu/cio/2016/01/14/fetching-data-over-http-with-nodejs-using-node-fetch/
https://www.fandango.com/code-of-honor-2016-191367/movie-overview
https://www.amctheatres.com/movies
*/


/**
 * Site examples
 * https://www.imdb.com/title/tt1788634/mediaviewer/rm3241207552
 * 
 */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fetch = require('node-fetch');
const indexRouter = require('./routes/indexRouter');
//const movieRouter = require('./routes/movieRouter');
const apiRouter = require('./routes/apiRouter');
const movieDetails = require('./routes/movie-details');
const search = require('./routes/search');
const app = express();

app.use(cors());
app.use('/', indexRouter);
// app.use('/movies', movieRouter);

app.use(['/movie', '/tv', '/person'], apiRouter);
app.use('/movie-details', movieDetails);
app.use('/search', search);

// use pug
app.set('view engine', 'pug');

// Make public folder accessible to serve static filesmon
// CSS, front-end JavaScript, images, etc.
app.use(express.static(__dirname + '/public'));

// Route to home page
// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + '/views/test.html');
//     // themoviedb api key: 6af95799edc464f9c6019d0fe0c75f56
    
//     // https://api.themoviedb.org/3/movie/550?api_key=6af95799edc464f9c6019d0fe0c75f56
    
//     const url = 'https://api.themoviedb.org/3/discover/movie?api_key=6af95799edc464f9c6019d0fe0c75f56&primary_release_date.gte=2018-06-01';
//     const { getViewData, getOtheData} = require('./helpers')
//     fetch(url)
//     .then(data => data.json())
//     .then(json => {
//         // const viewData = getViewData(json);
//         res.render('index', json);
//         console.log(json);
//     });
    
    
// });

// Route to search movie
// app.get('/search', (req, res) => {
//     // get http://www.omdbapi.com/?apikey=ff8e8da0
//     const url = `http://www.omdbapi.com/?apikey=ff8e8da0&s=${req.query.search}`;
//     // console.log(req.query.search);
//     // return res.send(req.query.search);
//     fetch(url)
//     .then(data => data.json())
//     .then(json => {
//         return res.json(json)
//     })
// });

// Route to search movie by id or title. request -> http://localhost:4000/id?it=tt0100405
app.get('/id', (req, res) => {
    // get http://www.omdbapi.com/?apikey=ff8e8da0
    const url = `http://www.omdbapi.com/?apikey=ff8e8da0&i=${req.query.it}`;
    // console.log(req.query.search);
    // return res.send(req.query.search);
    fetch(url)
    .then(data => data.json())
    .then(json => {
        return res.json(json)
    })
});

// search movie by year of release.     request -> http://localhost:4000/year?y=2018 does not work, also needs the title or id
app.get('/year', (req, res) => {
    // get http://www.omdbapi.com/?apikey=ff8e8da0
    const url = `http://www.omdbapi.com/?apikey=ff8e8da0&y=${req.query.y}`;
    // console.log(req.query.search);
    // return res.send(req.query.search);
    fetch(url)
    .then(data => data.json())
    .then(json => {
        return res.json(json)
    })
});




app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
