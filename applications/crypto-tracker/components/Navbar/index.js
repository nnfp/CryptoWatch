import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/spectacoins-crop.png";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/dashboard')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  }, [])

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
    
  }

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
        {authenticatedState === 'authenticated' ? (
          <>
            <Link href="/dashboard" passHref>
              <a
                className={styles.link}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/" passHref>
              <a
                className={styles.link}
                onClick={signOut}
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
