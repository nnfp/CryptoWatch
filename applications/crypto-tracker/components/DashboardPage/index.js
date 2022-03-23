import styles from "./DashboardPage.module.css";
<<<<<<< HEAD
import CardDelete from "../CardDelete";
import CardAdd from "../CardAdd";
import { useState, useEffect } from "react";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-logos_black_cropped.png"
=======
import Card from "../Card";
import { useState, useEffect } from "react";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { supabase } from "../../utils/supabaseClient";
>>>>>>> b5f9f38b763975e72c5912f5e04e6a15a713c86b

const DashboardPage = () => {
  const user = supabase.auth.user();
  const [portfolio, setPortfolio] = useState([]);
<<<<<<< HEAD
  const [symbol, setSymbol] = useState(null);

  const [inputCrypto, setInputCrypto] = useState("btc");
  const [inputAmount, setInputAmount] = useState(0);

  
  useEffect(() => {
    fetchPortfolio();
  }, [portfolio]);
=======

  useEffect(() => {
    fetchPortfolio();
  }, []);
>>>>>>> b5f9f38b763975e72c5912f5e04e6a15a713c86b

  const fetchPortfolio = async () => {
    let { data: portfolio, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);
    if (error) console.log("error", error);
    else setPortfolio(portfolio);
  };

  // console.log("portfolio->" + portfolio);
<<<<<<< HEAD

  const addCrypto = async () => {
    console.log(inputAmount)
    console.log(inputCrypto)
    const { data, error } = await supabase
      .from("portfolio")
      .insert([{ user_id: user.id, crypto: inputCrypto, amount: inputAmount }]);
    if (error) console.log("error", error);
    else setPortfolio([...portfolio, portfolio]);
  };

  const deleteCrypto = async (id) => {
    try {
      await supabase.from('portfolio').delete().eq('id', id)
      setTodos(portfolio.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  const { getTodayPrice, data, error, loading } = useCoinbaseAPI();

  const handleChange = (e) => setSymbol(e.target.value);

  const handleSubmit = () => {
    getTodayPrice(symbol)
    setInputCrypto(data?.data.base)
  }

  return (
    <>

      <div className={styles.searchDiv}>
        <div className={styles.searchBox}>
        <Image src={logo}  className={styles.img}/>
          <div>
            <input className={styles.searchInput}type="text" placeholder="Spectate a coin: btc, eth, doge" onChange={handleChange} />
            <button className={styles.searchButton} onClick={handleSubmit}>Search</button>
          </div>
        </div>
      </div>
      {(error && <h1 className="headline">{error}</h1>) ||
        (data && (
          <div className={styles.contentDiv}>
            <CardAdd crypto={data?.data.base} price={data?.data.amount} setInputAmount={setInputAmount} setInputCrypto={setInputCrypto} addCrypto={addCrypto}/>
          </div>
        ))}
      {portfolio ? (
        <>
        <div className={styles.contentDiv}>
          <div className={styles.grid}>
            {portfolio.map(function (obj) {
              return (
                <CardDelete key={obj.id} portfolioId={obj.id} crypto={obj.crypto} amount={obj.amount} deleteCrypto={deleteCrypto} />
=======
  const { getTodayPriceSearch, setSymbol, data, error } = useCoinbaseAPI();

  // On submit handler
  const handleSubmit = async () => {
    getTodayPriceSearch();
    console.log(data)
    // const baseCrypto = data.base;
    // console.log(baseCrypto)
  }
  // On input change handler
  const handleChange = (e) => setSymbol(e.target.value);


  const addCrypto = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .insert([{ user_id: user.id, crypto: "btc-usd", amount: 3 }]);
  };

  return (
    <>
      <div className={styles.searchDiv}>
        <div className={styles.searchBox}>
          <h2>Spectate a Crypto Price</h2>
          <p>Specify Crypto and Fiat Currency</p>
          <div>
            <input type="text" placeholder="BTC-USD" onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>
      </div>
      {(error && <h1 className="headline">{error[0].message}</h1>) ||
        (data && (
          <div className="container result">
            {Object.keys(data).map((dataKey, i) => (
              <div key={`${dataKey}-${i}`} className="card">
                <h3 className="card-value">
                  {data[dataKey]}
                  {console.log(dataKey)}
                </h3>
                <p className="card-label">{dataKey}</p>
              </div>
              
            ))}

            <button onClick={addCrypto}>add</button>
          </div>
        ))}
      {/* {(error && <h1>{error[0].message}</h1>) ||
        (data && (
          <div className="container result">
            <Card  crypto={data.base} amount={null} />
            <button onClick={addCrypto}>add</button>
          </div>
        ))} */}
      {portfolio ? (
        <>
          <div className={styles.grid}>
            {portfolio.map(function (obj) {
              return (
                <Card key={obj.id} crypto={obj.crypto} amount={obj.amount} />
>>>>>>> b5f9f38b763975e72c5912f5e04e6a15a713c86b
              );
              //  return (<li key={idx}>{d.crypto} {d.amount} {d.id}</li>)
            })}
          </div>
<<<<<<< HEAD
          </div>
=======
>>>>>>> b5f9f38b763975e72c5912f5e04e6a15a713c86b
        </>
      ) : null}
    </>
  );
};

export default DashboardPage;
