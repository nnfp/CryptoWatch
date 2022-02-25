import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-crop.png"
const Navbar = () => {
  return (
 
        <nav className={styles.navbar}>
             <div>
                <Link  href="/" passHref>
                    <div className={styles.imgDiv}>
                        <Image  className={styles.img} src={logo}  />
                    </div>
                    
                </Link>
                </div>
            <div className={styles.linkdiv}>
                <Link  href="/" passHref>
                    <a className={styles.link}>Home</a>
                </Link>
                <Link  href="/about" passHref>
                    <a className={styles.link}>About</a>
                </Link>
                <Link  href="/login" passHref>
                    <a className={styles.link}>Login</a>
                </Link>
            </div>
        </nav>
   
 
  )
}

export default Navbar