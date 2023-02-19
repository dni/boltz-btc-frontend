/* @refresh reload */
import { createSignal, createEffect } from "solid-js";
// import { ECPair, crypto } from "bitcoinjs-lib";
// import randomBytes from "randombytes";
import { render } from 'solid-js/web';
import { fetcher, qr } from './helper';
// import bitcore from './bitcore';

import {
  step, setStep,
  invoice, setInvoice,
  refundECPair, setRefundECPair,
  reverse, valid, setInvoiceQr, sendAmount,
  preimage, setPreimage, preimageHash, claimECPair, setClaimECPair
} from './signals';

import Step0 from './Step0';
import Step1 from './Step1';
import Success from './Success';
import Refund from './Refund';


// console.log(digest);

const create = () => {};
// const create = (e) => {
//   if (valid()) {
//     let params = null;
//     let cb = null;
//     if (reverse()) {
//       setPreimage(randomBytes(32));
//       setClaimECPair(ECPair.makeRandom());
//       params = {
//         "type": "reversesubmarine",
//         "pairId": "BTC/BTC",
//         "orderSide": "buy",
//         "invoiceAmount": sendAmount(),
//         "preimageHash": crypto.sha256(preimage()).toString("hex"),
//         "claimPublicKey": claimECPair().publicKey.toString("hex")
//       };
//       cb = (data) => {
//         setStep(2);
//       };
//     } else {
//       setRefundECPair(ECPair.makeRandom());
//       params = {
//         "type": "submarine",
//         "pairId": "BTC/BTC",
//         "orderSide": "sell",
//         "refundPublicKey": refundECPair().publicKey.toString("hex"),
//         "invoice": invoice()
//       };
//       cb = (data) => {
//         qr(data.bip21, setInvoiceQr);
//         setStep(1);
//       };
//     }
//     fetcher("/createswap", cb, params);
//   };
// };

const success = (e) => setStep(2);
const refund = (e) => setStep(3);

const App = () => {
  return (
    <div>
      <div id="steps">
        <div class={step() == 0 ? "active" : ""}>
          <div class="container">
            <Step0 />
            <span class="btn" onClick={refund}>refund</span>
            <span class="btn btn-success" onClick={create}>create</span>
          </div>
        </div>
        <div class={step() == 1 ? "active" : ""}>
          <div class="container">
            <Step1 />
            <span class="btn btn-danger" onClick={(e) => setStep(0) }>cancel</span>
            <span class="btn btn-success" onClick={success}>success</span>
          </div>
        </div>
        <div class={step() == 2 ? "active" : ""}>
          <div class="container">
            <Success />
            <hr />
            <span class="btn btn-success" onClick={(e) => setStep(0) }>new swap</span>
            <a class="btn" target="_blank" href="https://mempool.space">mempool</a>
          </div>
        </div>
        <div class={step() == 3 ? "active" : ""}>
          <div class="container">
            <Refund />
            <span class="btn btn-danger" onClick={(e) => setStep(0) }>cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;