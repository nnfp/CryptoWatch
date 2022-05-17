import styles from "./DashboardPage.module.css";
import CardDelete from "../CardDelete";
import CardAdd from "../CardAdd";
import { useState, useEffect } from "react";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-logos_black_cropped.png";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const user = supabase.auth.user();
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState(null);

  const [inputCrypto, setInputCrypto] = useState("btc");
  const [inputAmount, setInputAmount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!supabase.auth.session()) {
      router.push("/login");
    } else {
      fetchPortfolio();
    }
  }, [portfolio]);

  // fetches portfolio data from supabase
  const fetchPortfolio = async () => {
    let { data: portfolio, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);
    if (error) console.log("error", error);
    else setPortfolio(portfolio);
  };

  // used to add crypto to portfolio
  const addCrypto = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .insert([{ user_id: user.id, crypto: inputCrypto, amount: inputAmount }]);
    if (error) console.log("error", error);
    else setPortfolio([...portfolio, portfolio]);
  };

  // used to delete crypto from portfolio
  const deleteCrypto = async (id) => {
    try {
      await supabase.from("portfolio").delete().eq("id", id);
      setTodos(portfolio.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const { getTodayPrice, data, error, loading } = useCoinbaseAPI();

  const handleChange = (e) => setSymbol(e.target.value);

  const handleSubmit = () => {
    getTodayPrice(symbol);
    setInputCrypto(data?.data.base);
  };

  return (
    <>
      <div className={styles.searchDiv}>
        <div className={styles.searchBox}>
          <Image src={logo} className={styles.img} />
          <div className={styles.contentDiv}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Spectate a coin: btc, eth, doge"
              onChange={handleChange}
            />
            <button className={styles.searchButton} onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
      </div>
      {(error && <h1 className={styles.invalid}>{error}</h1>) ||
        (data && (
          <div classname={styles.test}>
            <div className={styles.contentDiv}>
              <CardAdd
                crypto={data?.data.base}
                price={data?.data.amount}
                setInputAmount={setInputAmount}
                setInputCrypto={setInputCrypto}
                addCrypto={addCrypto}
              />
            </div>
          </div>
        ))}
      {portfolio ? (
        <>
          <div className={styles.contentDiv}>
            <div className={styles.container}>
              {portfolio.map(function (obj) {
                return (
                  <CardDelete
                    key={obj.id}
                    portfolioId={obj.id}
                    crypto={obj.crypto}
                    amount={obj.amount}
                    deleteCrypto={deleteCrypto}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DashboardPage;
