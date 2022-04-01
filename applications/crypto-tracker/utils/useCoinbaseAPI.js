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
};

export default useCoinbaseAPI;