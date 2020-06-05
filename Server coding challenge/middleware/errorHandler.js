const actorsCollection = require("../models/actor-model");
const moviesCollection = require("../models/movie-model");

function errorHandler(req, res, next) {
    if (!req.body.id) {
        res.statusMessage = "Id is missing in the body of the request";
        res.status(406).end();
    }
    if (req.body.id !== req.params.movie_ID) {
        res.statusMessage = "Id and movie_id don't match";
        res.status(409).end();
    }
    if (!req.body.firstName || !req.body.lastName) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        res.status(403).end();
    }

    actorsCollection.getActorByName(
        req.body.firstName, req.body.lastName,
    ).then(actors => {
        if (actors.length === 0) {
            res.statusMessage = "The actor doesn't exist.";
            res.status(404).end();
        }

        moviesCollection.getMovieByID(
            req.body.id
        ). then(movies => {
            if (movies.length === 0) {
                res.statusMessage = "The movie doesn't exist.";
                res.status(404).end();
            }

            next();
        }).catch(err => {
            res.statusMessage = "An error in the server.=" + err.message;
            res.status(500).end();
        });
    }).catch(err =>{
        res.statusMessage = "An error in the server." + err.message;
        res.status(500).end();
    });

}

module.exports = errorHandler;