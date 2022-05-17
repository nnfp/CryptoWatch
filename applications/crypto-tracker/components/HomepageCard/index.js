import styles from "./HomepageCard.module.css";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
const HomepageCard = (props) => {
  const crypto = props.crypto;
  const amount = props.amount;
  const [value, setValue] = useState(0);

  const { data, error, loading } = useCoinbaseAPI(crypto);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <h2>{data?.data.base}</h2>
        </div>

        <div className={styles.cardBottom}>
          <h4>
            <p>Price:</p>
            <h5>${data?.data.amount} </h5>
          </h4>
        </div>
      </div>
    </>
  );
};

export default HomepageCard;
