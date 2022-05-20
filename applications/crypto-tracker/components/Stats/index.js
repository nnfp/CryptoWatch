import styles from "./Stats.module.css";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

const Stats = () => {
  const COINBASE_BASE_URL = "https://api.coinbase.com/v2";
  const user = supabase.auth.user();

  const [portfolio_total_value, setPortfolioTotalValue] = useState(0);
  const [uniqueCoinsCount, setUniqueCoinsCount] = useState(0);
  const [topCoins, setTopCoins] = useState("Add a coin!");
  const [majorityCoin, setMajorityCoin] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  const asset_count_map = new Map();
  const ticker_set = new Set();
  const portfolio_value_map = new Map();
  const portfolioDiversityMap = new Map();
  const router = useRouter();

  useEffect(async () => {
    if (!supabase.auth.session()) {
      router.push("/login");
    } else {
      await fetchPortfolio();
      getTotalValue();
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

  const getTotalValue = async () => {
    const money = [];
    let TotalCoins = 0;
    let { data: portfolio, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(` error ${error}`);
      return;
    } else {
      await loadNamesSet(portfolio);
      loadPortfolioMap(portfolio);

      for (let i = 0; i < portfolio.length; i++) {
        let fetchString = portfolio[i]["crypto"];
        if (portfolio[i]["crypto"].includes("-usd")) {
          fetchString = portfolio[i]["crypto"].replace("-usd", "");
        }

        const res = await fetch(
          `${COINBASE_BASE_URL}/prices/${fetchString.trim()}-usd/buy`
        );
        const res_data = await res.json();

        const price = Number(res_data["data"]["amount"]);
        const amount = Number(portfolio[i]["amount"]);

        money.push(price * amount);

        TotalCoins += amount;
      }
    }

    //Count of total portfolio value
    setPortfolioTotalValue(money.reduce((sum, x) => sum + x, 0).toFixed(2));

    await loadPortfolioValuesMaps();
    getMajorityCoin();
  };

  const loadNamesSet = async (data) => {
    for (const x of data) {
      ticker_set.add(String(x["crypto"]).toLowerCase());
    }

    setUniqueCoinsCount(ticker_set.size);

    for (const x of ticker_set) {
      asset_count_map.set(x, 0);
    }
  };

  const loadPortfolioMap = (data) => {
    const set = [...ticker_set];
    for (let i = 0; i < set.length; i++) {
      for (const x of data) {
        const symbol = String(x["crypto"].toLowerCase());

        if (symbol === set[i]) {
          const current = Number(asset_count_map.get(symbol));
          const amount = Number(x["amount"]);

          asset_count_map.set(symbol, current + amount);
        }
      }
      setUniqueCoinsCount(asset_count_map.size);
    }
  };

  const loadPortfolioValuesMaps = async () => {
    const set = [...ticker_set];
    let largest = 0;
    for (const x of set) {
      let fetchString = x;
      const amount = asset_count_map.get(x);

      if (x.includes("-usd")) {
        fetchString = x.replace("-usd", "");
      }

      const res = await fetch(
        `${COINBASE_BASE_URL}/prices/${fetchString.trim()}-usd/buy`
      );
      const res_data = await res.json();
      const value = Number(res_data["data"]["amount"]);
      portfolio_value_map.set(x, amount * value);

      const percentage = portfolio_value_map.get(x) / portfolio_total_value;
      portfolioDiversityMap.set(x, percentage);
    }
  };

  const getMajorityCoin = async () => {
    if (portfolio_value_map.size < 1) {
      setMajorityCoin("Add a coin!");
    } else {
      let largest = [...portfolio_value_map][0][1];

      let majorityCoin = [...portfolio_value_map][0][0];

      portfolio_value_map.forEach((value, key) => {
        if (value > largest) {
          majorityCoin = key;
        }
      });

      setMajorityCoin(majorityCoin.toUpperCase());
      getTopCoins();
    }
  };

  const getTopCoins = async () => {
    let sortedMap = new Map(
      [...portfolio_value_map].sort((a, b) => b[1] - a[1])
    );
    let topCoins = "";

    if (sortedMap.size < 4) {
      sortedMap.forEach((value, key) => {
        topCoins += key.toUpperCase() + " ";
      });
    } else {
      let x = [...sortedMap];
      topCoins =
        x[0][0].toUpperCase() +
        " " +
        x[1][0].toUpperCase() +
        " " +
        x[2][0].toUpperCase();
    }

    setTopCoins(topCoins);
  };

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.card}>
            <h3>Total Value </h3>
            <p>${portfolio_total_value}</p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
            <h3>Majority Currency</h3>
            <p>{majorityCoin}</p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
            <h3>Currencies Held</h3>
            <p> {uniqueCoinsCount} </p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
            <h3>Top Coins</h3>
            <p> {topCoins} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
