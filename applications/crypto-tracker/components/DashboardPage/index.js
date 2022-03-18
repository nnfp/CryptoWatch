import styles from "./DashboardPage.module.css";
import Card from "../Card";
import { useState, useEffect } from "react";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { supabase } from "../../utils/supabaseClient";

const DashboardPage = () => {
  const user = supabase.auth.user();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    let { data: portfolio, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);
    if (error) console.log("error", error);
    else setPortfolio(portfolio);
  };

  // console.log("portfolio->" + portfolio);
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
              );
              //  return (<li key={idx}>{d.crypto} {d.amount} {d.id}</li>)
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default DashboardPage;
