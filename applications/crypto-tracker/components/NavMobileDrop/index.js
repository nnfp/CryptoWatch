import styles from "./NavMobileDrop.module.css";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/Gi";

const NavMobileDrop = () => {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/dashboard");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    }
  }
  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  async function signOut() {
    setOpen(!open);
    await supabase.auth.signOut();
    router.push("/");
  }

  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };
  return (
    <>
      <li className={styles.navMobileItem}>
        <a className={styles.iconButton} onClick={handleClick}>
          <GiHamburgerMenu />
        </a>

        {open && (
          <div className={styles.dropdown}>
            <Link href="/" passHref>
              <a className={styles.menuItem} onClick={handleClick}>Home</a>
            </Link>
            <Link href="/about" passHref>
              <a className={styles.menuItem} onClick={handleClick}>About</a>
            </Link>
            {authenticatedState === "authenticated" ? (
              <>
                <Link href="/dashboard" passHref>
                  <a className={styles.menuItem} onClick={handleClick}>Dashboard</a>
                </Link>
                <Link href="/" passHref>
                  <a className={styles.menuItem} onClick={signOut}>
                    Logout
                  </a>
                </Link>
              </>
            ) : (
              <Link href="/login" passHref>
                <a className={styles.menuItem} onClick={handleClick}>Login</a>
              </Link>
            )}
          </div>
        )}
      </li>
    </>
  );
};

export default NavMobileDrop;
