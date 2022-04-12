import styles from "./HomepageCard.module.css";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
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

        <div className={styles .cardBottom}>
        <h4>
          Price 
        </h4>
         <p>
          ${data?.data.amount} 
        
        </p>
        
      </div>
      </div>
    </>
  );
};

export default HomepageCard;
