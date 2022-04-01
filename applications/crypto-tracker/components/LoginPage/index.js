import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import styles from "./login.module.css";
import Account from '../Account'
import Auth from '../Auth/index.';
import { useRouter } from 'next/router'

const LoginPage = () => {
    const [session, setSession] = useState(null)
    const router = useRouter()
  
    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
  
      })
  
      if(session){
        router.push('/');
      }
    }, [session])
  
  return (
    <>
      
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
   
    </>
  );
};

export default LoginPage;
