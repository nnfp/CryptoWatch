import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-crop.png";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" passHref>
          <div className={styles.imgDiv}>
            <Image className={styles.img} src={logo} />
          </div>
        </Link>
      </div>
      <div className={styles.linkdiv}>
        <Link href="/" passHref>
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/about" passHref>
          <a className={styles.link}>About</a>
        </Link>
        {session ? (
          <>
            <Link href="/" passHref>
              <a
                className={styles.link}
                onClick={() => supabase.auth.signOut()}
              >
                Logout
              </a>
            </Link>
          </>
        ) : (
          <Link href="/login" passHref>
            <a className={styles.link}>Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
