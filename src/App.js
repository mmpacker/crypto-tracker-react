import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from "./Coin";


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")

  useEffect (() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
     <div className="coin-search">
       <h1 className="coin-text">CryptoCurrency Tracker</h1>
       <h4 className="coin-text">Powered by <a href="https://www.coingecko.com/en/api#explore-api" target="_blank">CoinGecko</a></h4>
       <form>
         <input className="coin-input" type="text" placeholder="Search a Currency by Name" onChange={handleChange} />
       </form>
     </div>
     <div className="coin-header">
       <h4 style={{marginLeft: '3rem', marginRight: '6rem'}}>Coin</h4>
       <h4 style={{marginRight: '4rem'}}>Symbol</h4>
       <h4 style={{marginRight: '4rem'}}>Current Price</h4>
       <h4 style={{marginRight: '5rem'}}>Volume</h4>
       <h4 style={{marginRight: '5rem'}}>Change</h4>
       <h4>Market Cap</h4>
     </div>
     {filteredCoins.map(coin => {
       return (
         <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
         />
       )
     })}
    </div>
  );
}

export default App;
