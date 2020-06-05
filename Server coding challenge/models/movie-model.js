const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieByID: function(movie_ID) {
        return moviesCollection.find(
            {movie_ID}
            ).then(movie => {
                movie
            }).catch(err => {
                throw new Error(err);
            })
    },
    removeActorFromMovieList: function(movie_ID, movie, actorId) {
        const actorIndex = movie.actors.indexOf(actorId);
        if (actorIndex === undefined) {
            console.log("not fooound");
        }
        movie.actors.splice(actorIndex, 1);

        return moviesCollection.updateOne({movie_ID}, movie)
            .then(_ => movie)
            .catch(err => {
                throw new Error(err);
            });
    },
}

module.exports = {
    Movies
};

