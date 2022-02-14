import styles from "./KennethPage.module.css";
import Image from "next/image";
import pic from "../../public/assets/kennethpic.jpg";
const KennethPage = () => {
  return (
    <>
      <div className={styles.color}>
        <div className={styles.center}>
          <header>
            <h1>Kenneth Galang</h1>
          </header>
          <div>
            <Image src={pic} width="300px" height="300px" />
            <br />
            <label>Github Master</label>
            <br />
            <label>Favorite Animal: Pigeon</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default KennethPage;
