import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [coins, setCoins] = useState([])

  useEffect (() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  return (
    <div className="coin-app">
     <div className="coin-search">
       <h1 className="coin-text">Search a Currency</h1>
       <form>
         <input className="coin-input" type="text" placeholder="Search" />
       </form>
     </div>
     <h3>Will map through coins here</h3>
    </div>
  );
}

export default App;
