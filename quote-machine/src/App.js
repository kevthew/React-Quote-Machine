
import React, { useState } from 'react';
import './App.scss';

//state
function App() {
  const [quote, newQuote] = useState('');
  const [author, newAuthor] = useState('');
  const [image, setImage] = useState('')
  const [ranNum, setRanNum] = useState(0);
  const [quoteData, setQuoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

//api calls
  React.useEffect(() => {
    const url = "https://thesimpsonsquoteapi.glitch.me/quotes?count=50";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setQuoteData(json))
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (quoteData.length !== 0) {
      setIsLoading(false);
      ChangeQAndA();
    }
    console.log(quoteData);
  }, [quoteData]);

  
//random num gen
  const ranNumGen = () =>{
    setRanNum(Math.floor(Math.random() * quoteData.length));
  };

//set quote state
  const ChangeQAndA = () =>{
    ranNumGen();
    newQuote(quoteData[ranNum].quote);
    newAuthor(quoteData[ranNum].character);
    setImage(quoteData[ranNum].image)
  };

    
    
//render
  return (
    <div className="App">
      <header>
        {isLoading ? (
          <h1>LOADING...</h1>
        ) : (
        <>
          <div className="card" style={{width: 20 + 'rem'}} id="quote-box" >
            <div className='card-title'>
              <h1>Simpsons Quote Machine</h1>
            </div>
            <img className="card-img-top" src={image} alt='pic'/>
            <div className="card-body">
              <p id="text">
                "{quote}"
              </p>
              <p id="author">
                - {author}
              </p>
            </div>
            <div className='button-div'>
              <button className='btn btn-primary' id="new-quote" onClick={() => ChangeQAndA()}>New Quote</button>
              <a className='btn btn-primary' href="twitter.com/intent/tweet"  id="tweet-quote" ><i className="icon-twitter-sign"/></a>
            </div>
          </div>
        </>
        )}
        
      </header>
    </div>
      
      
  );
}

export default App;
