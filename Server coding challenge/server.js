const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();

const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const actorsCollection = require("./models/actor-model");
const moviesCollection = require("./models/movie-model");

const app = express();

/* 
    Your code goes here 
*/
app.patch('/api/delete-movie-actor/:movie_ID', [jsonParser, errorHandler] , (req, res) => {
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

            moviesCollection.removeActorFromMovieList(
                req.body.id, movies[0], actors[0]._id
            ).then(movie => {
                res.status(201).json(movie);
            }).catch(err => {
                res.statusMessage = "Error in server = " +err.message;
                res.status(500).end();
            })
        }).catch(err => {
            res.statusMessage = "An error in the server.=" + err.message;
            res.status(500).end();
        });
    }).catch(err =>{
        res.statusMessage = "An error in the server." + err.message;
        res.status(500).end();
    });

    return res.status(403).json({});
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});