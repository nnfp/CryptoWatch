import { useState, useEffect } from "react";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import Homepage from "../components/Homepage";

export default function Home() {
  const [session, setSession] = useState(null);

  // check session
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Spectacoins</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
        <Homepage />
        {/*!session ? <h2>hi</h2> : <h2>logged</h2>*/}
      </div>
    </>
  );
}
