import styles from "./Homepage.module.css";
import { useState, useEffect } from "react";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-logos_black_cropped.png"
import HomepageCard from "../HomepageCard";

const Homepage = () => {
    
    const [symbol, setSymbol] = useState(null);
    
    const [inputCrypto, setInputCrypto] = useState("btc");
    const [inputAmount, setInputAmount] = useState(0);
  
    const { getTodayPrice, data, error, loading } = useCoinbaseAPI();
  
    const handleChange = (e) => setSymbol(e.target.value);
  
    const handleSubmit = () => {
      getTodayPrice(symbol)
      setInputCrypto(data?.data.base)
    }
    const defaultDisplay = (bitcoin) => {
        getTodayPrice(bitcoin)
      setInputCrypto(data?.data.base)
    }
  
    return (
      <>
        <div className={styles.searchDiv}>
          <div className={styles.searchBox}>
          <Image src={logo}  className={styles.img}/>
            <div className = {styles.contentDiv}>
              <input className={styles.searchInput}type="text" placeholder="Spectate a coin: btc, eth, doge" onChange={handleChange} />
              <button className={styles.searchButton} onClick={handleSubmit}>Search</button>
            </div>
          </div>
        </div>
       
      {/* having "headline" set to a style */}
        {(error && <h1 className={styles.invalid}>{error}</h1>) ||
          (data && (
            <div className={styles.contentDiv}>

              <HomepageCard crypto={data?.data.base} price={data?.data.amount} />
            </div>
          ))}
          <div className = {styles.contentDiv}>
           <div className={styles.container}>
                <HomepageCard crypto={"btc"} price={data?.data.amount} />
                <HomepageCard crypto={"eth"} price={data?.data.amount} />
                <HomepageCard crypto={"avax"} price={data?.data.amount} />
                <HomepageCard crypto={"ada"} price={data?.data.amount} />
                <HomepageCard crypto={"link"} price={data?.data.amount} />
                <HomepageCard crypto={"usdt"} price={data?.data.amount} />
                <HomepageCard crypto={"sol"} price={data?.data.amount} />
                <HomepageCard crypto={"xtz"} price={data?.data.amount} />
        </div>
       </div>
      </>
    );
  };
  
  export default Homepage;