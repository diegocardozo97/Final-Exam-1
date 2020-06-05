import React from 'react';

function BookForm( props ){
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const nameBook = document.querySelector("#nameBook").value;
        console.log("Submiting" + nameBook);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${nameBook}`, 
            {method: "GET"}
        ).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error("An error in request");
        }).then(jsonResult => {
            props.onResults(jsonResult.items);
        }).catch(err => {
            console.log("Error in request");
        })
    }


    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" id="nameBook"></input>
                <input type="submit" value="submit"></input>
            </form>
        </div>
    );
}

export default BookForm;