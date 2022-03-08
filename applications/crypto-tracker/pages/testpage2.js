import Head from "next/head";
import IndividualPage from "../components/IndividualPage";
import pic from "../public/assets/thanos.jpg"


async function getTodayPrice(symbol)  {

if(symbol.length < 1 || symbol == null){
  return 
}
const res = await fetch(`https://api.coinbase.com/v2/prices/${symbol.trim()}-usd/buy`);
const data = await res.json();

const obj = data.data
console.log(obj)

const element1= document.getElementById('_coin_price')
const element0 = document.getElementById('_symbol')
element0.innerHTML = "1 " + obj["base"]  
element1.innerHTML = "$" + obj["amount"]
element1.style.color = "green"


return obj


}
  
    export default function TestPage2() {
      return (
        <div>
          <Head>
            <title> coinbase api testpage</title>
           
          </Head>
         <button onClick={() => getTodayPrice('avax')}
>   🍕 </button>

<div id="_symbol"> 1 </div>
<div id="_coin_price">  = </div>


        </div>
      );
    }