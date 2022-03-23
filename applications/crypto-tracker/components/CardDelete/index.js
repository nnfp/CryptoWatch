import styles from "./CardDelete.module.css";
import useCoinbaseAPI from "../../utils/useCoinbaseAPI";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
const CardDelete = (props) => {
  const crypto = props.crypto;
  const amount = props.amount;
  const portfolioId = props.portfolioId;
  const [value, setValue] = useState(0);

  const { data, error, loading } = useCoinbaseAPI(crypto);
  const handleDelete = () => {
   console.log(portfolioId)
   props.deleteCrypto(portfolioId)
  }

  const multiply = (num1, num2) => {
    let result = num1*num2;
    result = Math.floor(result)
    setValue(result)
  };




  useEffect(() =>{
    multiply(data?.data.amount, amount )
  }, [data]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
        <h2>{data?.data.base}</h2>
        <FaRegTrashAlt className={styles.icon} onClick={handleDelete}/>
        </div>

        <div className={styles .cardBottom}>
        <h4>
          Price 
        </h4>
         <p>
          ${data?.data.amount} 
        </p>
        <h4>
          Amount 
        </h4>
        <p>
         {amount} 
        </p>
        <h4>
          Estimated Value 
        </h4>
        <p>
         ${value} 
        </p>
        {/* <div className={styles.buttonDiv}>
        <button  onClick={handleDelete}>Delete</button>
  
        </div>  */}
      </div>
      </div>
    </>
  );
};

export default CardDelete;
