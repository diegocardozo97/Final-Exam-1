import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      books: [],
      zeroResults: false,
    }
  }

  onResults = (books) => {
    this.setState({books, zeroResults: books.length === 0});
  }

  render() {
    return(
      <div>
        <BookForm onResults={this.onResults}/>
        <Book books={this.state.books} zeroResults={this.state.zeroResults}/>
      </div>
    )
  }

}

export default App;
