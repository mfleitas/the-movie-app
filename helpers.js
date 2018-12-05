const fetch = require('node-fetch');
const config = require('./config/api');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


exports.setLocalStorage = () => {
    const genreDir = '/genre/movie/list';
    const url = `${config.queryUrl}${genreDir}?api_key=${config.key}`;

    fetch(url)
        .then(data => data.json())
        .then(json => {
            localStorage.setItem('genre', JSON.stringify(json));
        });

}


module.exports.getNowPlayingMovies = async () => {
    // const url = `${config.queryUrl}/discover/movie?api_key=${config.key}&primary_release_date.gte=2018-06-01`;
    const url = `${config.queryUrl}/movie/now_playing?api_key=${config.key}`;
    let results;
    
    await fetch(url)
        .then(data => data.json())
        .then(json => { results = json });

        return results;
}

module.exports.getPopularMovies = async (param) => {
    // const url = `${config.queryUrl}/discover/movie?api_key=${config.key}&primary_release_date.gte=2018-06-01`;
    const popularMoviesDir = '/movie/popular';
    const url = `${config.queryUrl}${popularMoviesDir}?api_key=${config.key}`;
    const omdbUrl = `${config.omdbBaseUrl}?apikey=${config.omdbKey}&i=tt0100405`;
    let popularMovies = {};
   
    let promise1 = fetch(url).then(result => result.json());
    let promise2 = fetch(omdbUrl).then(result => result.json());

    await Promise.all([promise1, promise2]).then(results => {
        popularMovies.promise1 = results[0];
        popularMovies.promise2 = results[1];
    });
    
    return popularMovies;
}

module.exports.getData = async (parameters) => {
        
    // const url = `${baseUrl}${route}?api_key=${key}`;
    let url = parameters.mainUrl;
    let results = [];
    
    await fetch(url)
        .then(data => data.json())
        .then(json => { tmdbObject = json });
    // console.log(results.results[0].id);
    let promises = tmdbObject.results.map(async tmdb => {
        // console.log(tmdb.id);
        url = `${parameters.baseUrl}/movie/${tmdb.id}?api_key=${parameters.apiKey}`;
        
        return await fetch(url)
            .then(movie => movie.json())
            .then(movie => {
                return fetch(getImdbApiUrl(movie.imdb_id))
                    .then(movieData => movieData.json());

                    
            });
    });

    return Promise.all(promises).then(values => {
        return values.map(value => {
            return value;
        })
    });
}

// 2- Get tmdb movie -fetch (need tmdbId)
getMovieById = async (url) => {
    let movie;

    await fetch(url)
        .then(data => data.json())
        .then(json => { movie = json });

    return movie;
}

function getImdbApiUrl(movieId) {
    return `http://www.omdbapi.com?apikey=ff8e8da0&i=${movieId}`;
}

module.exports.getPaginationData = (page) => {
    const pagesPerSection = 10;
    let paginationStart;
    let paginationEnd;
    paginationStart = Math.floor( page/pagesPerSection ) * pagesPerSection;

    paginationEnd = paginationStart + pagesPerSection;
    
    if(paginationStart === 0) {
        paginationStart = 1;
        paginationEnd = (paginationStart + pagesPerSection) - 1;
    }
    
    return {
        page: page,
        paginationStart: paginationStart,
        paginationEnd: paginationEnd
    }
}


module.exports.getMovieDetails = async (url) => {
    let movieDetails;

    await fetch(url)
        .then(data => data.json())
        .then(json => {movieDetails = json});

    return movieDetails;
}
