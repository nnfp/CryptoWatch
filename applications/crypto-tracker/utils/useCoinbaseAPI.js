<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";

const COINBASE_BASE_URL = "https://api.coinbase.com/v2";

const useCoinbaseAPI = (symbol) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() =>{
    if ( symbol == null) {
              return;
    }
    setLoading(true);
    axios.get(`${COINBASE_BASE_URL}/prices/${symbol.trim()}-usd/buy`)
      .then((res) => {
        setData(res.data);
      }).catch((err) =>{
        // setError(err);
        console.log(err.message)
      }).finally(() => {
        setLoading(false);
      })
  }, [symbol]);

  const getTodayPrice = (symbol) => {
    
    setLoading(true);
    axios.get(`${COINBASE_BASE_URL}/prices/${symbol.trim()}-usd/buy`)
      .then((res) => {
        setData(res.data);
        setError(null);
      }).catch((err) =>{
        setError("invalid input");
        console.log(err.message)
      }).finally(() => {
        setLoading(false);
      })
  }
  
  return{data, loading, error, getTodayPrice};
=======
import { useState } from "react";
import fetch from "isomorphic-fetch";

const COINBASE_BASE_URL = "https://api.coinbase.com/v2";



const useCoinbaseAPI = () => {
  // Holds value for search form
  const [symbol, setSymbol] = useState("");

  // Holds data value of cryptocurrency market data
  const [data, setData] = useState(null);

  // Holds error messages from Coinbase API
  const [error, setError] = useState(null);

  return {
    setSymbol,
    data,
    error,
    getTodayPrice: async (symbol) => {
      if (symbol.trim().length < 1 || symbol == null) {
        return;
      }
    
      const res = await fetch(`${COINBASE_BASE_URL}/prices/${symbol.trim()}/buy`);
      const data  = await res.json();
    
      const obj = data.data;
      console.log(obj)
      return obj;
    
    },
    getTodayPriceSearch: async () => {
      try {
        // No need to make a request if symbol value is empty.
  
        if (symbol.trim().length < 1) {
          setError([{ message: 'Enter a symbol and fiat currency. e.g - BTC-USD' }])
          return;
        }

        // Fetch ticker data from Coinbase API
        const res = await fetch(`${COINBASE_BASE_URL}/prices/${symbol.trim()}/buy`);
        const { errors, data } = await res.json();

        // IF any errors, set error to state
        setError(errors);

        // Set ticker data to state
        setData(data);
        console.log(data)
        return;
      } catch (e) {
        console.error(e);
      }
    }
  };
>>>>>>> b5f9f38b763975e72c5912f5e04e6a15a713c86b
};

export default useCoinbaseAPI;