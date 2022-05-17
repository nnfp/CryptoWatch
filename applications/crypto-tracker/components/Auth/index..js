import styles from "./Auth.module.css";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // handles user login
  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.loginHeader}>Login in via magic link</h1>

        <div className={styles.loginContainer}>
          <p className={styles.description}>Email address</p>
          <div className={styles.loginField}>
            <img className={styles.emailIcon} src="../assets/email.png" />
            <input
              className={styles.loginInput}
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.buttonDiv}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              className={styles.loginButton}
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Send magic link"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
