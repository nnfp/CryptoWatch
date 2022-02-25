import styles from "./IndividualPage.module.css";
import Image from "next/image";
import Navbar from "../Navbar";
const IndividualPage = (props) => {
  const name = props.name;
  const role = props.role;
  const animal = props.animal;
  const picture = props.picture
  return (
    <>
      <div className={styles.color}>
        <div className={styles.center}>
          <header>
            <h1>{name}</h1>
          </header>
          <div>
            <Image src={picture} width="300px" height="300px" />
            <br />
            <label>{role}</label>
            <br />
            <label>Favorite Animal: {animal}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualPage;
