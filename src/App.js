import './App.css';
import Connex from '@vechain/connex'
import CoinGecko from 'coingecko-api';

var CoinGeckoClient = new CoinGecko();


var vechainData = CoinGeckoClient.simple.price({
    ids: ['vechain'],
    vs_currencies: ['usd'],
});

setInterval(function(){
	CoinGeckoClient = new CoinGecko();

  vechainData = CoinGeckoClient.simple.price({
    ids: ['vechain'],
    vs_currencies: ['usd'],
  });
}, 10000);

export function vechain(){
	return vechainData;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <input id="currentValue" disabled/>
        <input id="targetValue"/>
        <input id="multiplier" disabled/>
        <p>support us</p>
        <a href= "https://bmac.vecha.in/donate?name=YAL&addr=0xa4Cf1c6443CEE677394D709D5CAf7fAB9bf2f077&amount=10&msg=Thanks%20so%20much%20for%20helping%20us%20support%20the%20vechain%20network"><button>Buy us a coffee</button></a>
      </header>
    </div>
  );
}

vechain().then(product => {
document.getElementById("currentValue").value = (String(product.data.vechain.usd))
})
//sets the initial current value of vechain

setInterval(function(){
    vechain().then(product => {
    document.getElementById("currentValue").value = (String(product.data.vechain.usd))
    })
}, 10000);
//refreshes the current value every 10 seconds

setInterval(function(){
  document.getElementById("multiplier").value = (Math.log2(parseFloat(document.getElementById("targetValue").value)/parseFloat(document.getElementById("currentValue").value))).toFixed(2);
}, 100);
//performs the maths equation for doubling

const connex = new Connex({
    node: 'https://mainnet.veblocks.net/', // veblocks public node, use your own if needed
    network: 'test' // defaults to mainnet, so it can be omitted here
});

const el = document.createElement('h1')

const status = connex.thor.status
el.innerText = (status.progress === 1 ? 'You are synced': 'You are not synced, please use the Sync app or vechain wallet')

document.querySelector('body').append(el)


export default App;
