import Head from "next/head";
import IndividualPage from "../components/IndividualPage";
import pic from "../public/assets/LightningFalse.png"
export default function TestPage() {
  return (
    <div>
      <Head>
        <title>Tony Tran</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndividualPage name="Tony Tran" role="Frontend" 
      animal="Tiger" picture={pic}/>
    </div>
  );
}