import styles from "./NavMobile.module.css";
import Link from "next/link";
import logo from "../../public/assets/spectacoins-crop.png";
import Image from "next/image";
const NavMobile = (props) => {
  return (
    <>
      <nav className={styles.navbar}>
      <div>
        <Link href="/" passHref>
          <div className={styles.imgDiv}>
            <Image className={styles.img} src={logo} />
          </div>
        </Link>
      </div>
        <ul className={styles.navbarNav}>{props.children}</ul>
      </nav>
    </>
  );
};

export default NavMobile;
