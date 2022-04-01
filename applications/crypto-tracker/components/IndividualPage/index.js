import styles from "./IndividualPage.module.css";
import Image from "next/image";

const IndividualPage = (props) => {
  const name = props.name;
  const role = props.role;
  const animal = props.animal;
  const picture = props.picture
  return (
    <>
      <div className={styles.color}>
        <div className={styles.center}>
          <header className={styles.header}>
            <h1>{name}</h1>
          </header>
          <div>
            <Image src={picture} width="320px" height="320px" />
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
