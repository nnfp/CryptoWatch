import styles from "./CardAdd.module.css";

const CardAdd = (props) => {
  const crypto = props.crypto;
  const price = props.price;

  // use props to get input data
  const handleChange = (e) => {
    props.setInputAmount(e.target.value);
    props.setInputCrypto(crypto);
  };

  return (
    <>
      <div className={styles.card}>
        <h2>{crypto}</h2>
        <p>{price} usd</p>
        <input
          placeholder="specify amount.."
          type="number"
          onChange={handleChange}
          min="0.00"
        ></input>
        <div className={styles.buttonDiv}>
          <button onClick={props.addCrypto}>add</button>
        </div>
      </div>
    </>
  );
};

export default CardAdd;
