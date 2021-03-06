import Head from "next/head";
import { useState, useEffect } from "react";
import DashboardPage from "../components/DashboardPage";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    if (!profileData) {
      router.push("/");
    } else {
      setProfile(profileData);
    }
  }

  if (!profile) return null;
  return (
    <div>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardPage />
    </div>
  );
}
