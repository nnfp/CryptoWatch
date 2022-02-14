import Head from "next/head";
import IndividualPage from "../components/IndividualPage";
import pic from "../public/assets/monkey.jpg"
export default function TestPage() {
  return (
    <div>
      <Head>
        <title>TestPage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndividualPage name="Jack Deremiah" role="Backend Lead" 
      animal="Orangutan" picture={pic}/>
    </div>
  );
}