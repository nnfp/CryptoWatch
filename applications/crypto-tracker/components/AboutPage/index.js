import styles from "./AboutPage.module.css";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <div className={styles.aboutTopDiv}>
        <h1 className={styles.aboutH1}>About Us</h1>
      </div>
      <div className={styles.aboutDiv}>
      <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>Joshua Boelman</h2>
              <p>Team Leader</p>
            </a>
          </Link>

          <Link href="/kenneth">
            <a className={styles.card}>
              <h2>Kenneth Galang</h2>
              <p>Github Master</p>
            </a>
          </Link>

          <Link href="/madeleine">
            <a className={styles.card}>
              <h2>Madeleine De Mesa</h2>
              <p>Scrum Master</p>
            </a>
          </Link>
          
          <Link href="/">
            <a className={styles.card}>
              <h2>Elizabeth Kirwan </h2>
              <p>Front end</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>Jack Deremiah</h2>
              <p>Back end</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>Tony Tran </h2>
              <p>Front end</p>
            </a>
          </Link>

        </div>    
      </div>
    </>
  );
};

export default AboutPage;
