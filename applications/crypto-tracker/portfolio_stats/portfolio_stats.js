import { async } from "regenerator-runtime";
import {useCoinbaseAPI} from "../utils/useCoinbaseAPI";
import axios from "axios";

const loadNamesSet = (data, set, map) => {
    
   
    for (const x of data) {
      set.add(String(x["crypto"]).toLowerCase());
    }
   
    return set
   

  };

  const loadPortfolioMap = (data, set, map) => {
    
    const s = [...set];
    for (let i = 0; i < s.length; i++) {

      for (const x of data) {
        const symbol = String(x["crypto"].toLowerCase());

        if (symbol === s[i]) {
          
          const current = Number(map.get(symbol));
          const amount = (Number(x["amount"]));

          map.set(symbol, current + amount);

        } 



      }

    }
    return map

  };


  const fetchPortfolio = (portfolio) => {
    
        return portfolio
     
  };


  const portfolio_total_value = async (data, portfolio) => {
  const money = []
  let sum = 0
  
  for (let i = 0; i < portfolio.length; i++) {
    
    const base = portfolio[i]["crypto"]
    const x =  await axios.get(`https://api.coinbase.com/v2/prices/${base}-usd/buy`)
    const price = x["data"]["data"]["amount"]
  
    const amount = Number(portfolio[i]["amount"])

    
  
    money.push(price * amount)

  }

 
    sum = (money.reduce((sum, x) => sum + x, 0));
    
    return sum

  }

  // const simple_fetch = async () => {
  
  //   let res_data = 0
  //   let base = "ETH"
    
 
   
  
  //   return res_data
  // }
 
  
  


module.exports = {loadNamesSet, loadPortfolioMap, fetchPortfolio, portfolio_total_value}