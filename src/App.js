import React, { Component } from 'react';
import { random } from 'lodash';
import './App.css';
import Button from './components/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
    } 
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectedQuoteIndex = this.selectQuoteIndex.bind(this); 
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
    .then(data => data.json())
    .then(quotes => this.setState({ quotes }, this.assignNewQuoteIndex));
  }

//array of quotes and an index of where our selected quotes lives. 
//What we want to do is to render out the selected quotes here in our rendered function
//create a function to get something for us 
//get selected 

  get selectedQuote() {
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
      return;  
    } 
    return this.state.quotes[this.state.selectedQuoteIndex]
  }

  selectQuoteIndex() {
    if (!this.state.quotes.length) {
      return;
    }
    return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteIndex() {
    this.setState({ selectedQuoteIndex: this.selectedQuoteIndex() });
  }

  render() {
    console.log(this.state.quotes);
    return (
      <div className="App" id="quote-box">
        { this.selectedQuote ? `"${this.selectedQuote.quote}" - ${this.selectedQuote.author}` : ``}
        <Button buttonDisplayName="Next Quote" clickHandler={this.assignNewQuoteIndex} />
      </div>
    )
  }
}

export default App;