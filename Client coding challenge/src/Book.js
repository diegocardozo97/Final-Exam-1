import React from 'react';

function Book( props ){
    if (props.zeroResults) {
        return <div>Error: There aren't any books</div>;
    }

    const items = props.books.map((b, index) => (
        <div key={index}>
            <p>{b.volumeInfo.title}</p>
            <p>{b.volumeInfo.description}</p>
            <p><img src={b.volumeInfo.imageLinks.smallThumbnail}></img></p>
            Authors: {b.volumeInfo.authors && b.volumeInfo.authors.map((a, i) => <span key={i}>{a}, </span>)}

            <hr />
        </div>
    ));

    return(
        <div>
            {items}
        </div>
    );
}

export default Book;