import styles from "./Card.module.css";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { useState, useEffect } from "react";
const Card = (props) => {
  const [cryptoBase, setCryptoBase] = useState();
  const [cryptoAmount, setCryptoAmount] = useState();
  const [cryptoCurrency, setCryptoCurrency] = useState();
  const crypto = props.crypto;
  const amount = props.amount;
  const data = null;
  // const { getTodayPriceTwo, setSymbol, data, error } = useCoinbaseAPI();
  const { getTodayPrice } = useCoinbaseAPI();

  // On submit handler

  // const handleSubmit = () => addCrypto();

  // On input change handler

  useEffect(() => {
    const fetchData = async () => {
      // await setSymbol("eth-usd");
      // const result = await getTodayPrice("eth-usd");
      data = await getTodayPrice(crypto);
      console.log(data);
      data ? setCryptoBase(data.base) : null;
      data ? setCryptoAmount(data.amount) : null;
      data ? setCryptoCurrency(data.currency) : null;
    };
    fetchData();
  }, [data]);

  return (
    <>
      <div className={styles.card}>
        <h2>{cryptoBase}</h2>
        <p>
          {cryptoAmount} {cryptoCurrency}
        </p>
        <p>Amount: {amount}</p>
      </div>
    </>
  );
};

export default Card;
