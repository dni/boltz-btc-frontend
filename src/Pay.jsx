import { createEffect } from "solid-js";
import { render } from "solid-js/web";
import {
    failureReason, setFailureReason, reverse,
    denomination, invoiceQr, setInvoiceQr, swap, setSwap, swapStatus, setSwapStatus, swaps, setSwaps, setNotification, setNotificationType } from "./signals";
import { useParams, useNavigate } from "@solidjs/router";
import { useI18n } from "@solid-primitives/i18n";
import { fetcher, qr, downloadRefundFile, clipboard } from "./helper";
import { mempool_url } from "./config";

import reload_svg from "./assets/reload.svg";

const Pay = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [t, { add, locale, dict }] = useI18n();

  const fetchSwapStatus = (id) => {
    fetcher("/swapstatus", (data) => {
      setSwapStatus(data.status);
      setFailureReason(data.failureReason);
      setNotificationType("success");
      setNotification("swap status retrieved!");
    }, {id: id});
    return false;
  };

  createEffect(() => {
      let tmp_swaps = JSON.parse(swaps());
      if (tmp_swaps) {
          let current_swap = tmp_swaps.filter(s => s.id === params.id).pop();
          if (current_swap) {
              fetchSwapStatus(params.id);
              setSwap(current_swap);
              let qr_code = (current_swap.reverse) ? current_swap.invoice : current_swap.bip21;
              qr(qr_code, setInvoiceQr);
              // console.log(current_swap);
          }
      }
  });

  const refund = (swap) => {
    setNotificationType("error");
    setNotification("not implemented yet");
  };

  const mempoolLink = (a) => {
    return mempool_url + "/address/" + a;
  };

  const can_reload = (status) => {
    return status != "transaction.claimed"
          && status != "swap.expired"
          && status != "transaction.lockupFailed";
  };

  return (
    <div data-status={swapStatus()} class="frame">
      <h2>
        {t("pay_invoice", {id: params.id})}
      <Show when={swap()}><span data-reverse={swap().reverse} data-asset={swap().asset} class="past-asset">-</span></Show>
      </h2>
      <p>{t("pay_invoice_subline")}</p>
      <Show when={swap()}>
          <p>
              Status: <span class="btn-small">{swapStatus()}</span>
              <Show when={can_reload(swapStatus())}>
                  <span class="icon-reload" onClick={() => fetchSwapStatus(swap().id)}><img src={reload_svg} /></span>
              </Show>
          </p>
      </Show>
      <hr />
      <Show when={swap()}>
          <Show when={swapStatus() == "swap.expired" || swapStatus() == "invoice.expired"}>
              <h2>{t("expired")}</h2>
              <p>{t("swap_expired")}</p>
              <hr />
              <span class="btn" onClick={(e) => navigate("/swap")}>{t("new_swap")}</span>
          </Show>
          <Show when={swapStatus() == "transaction.claimed"}>
              <h2>{t("congrats")}</h2>
              <p>{t("successfully_swapped", {amount: swap().expectedAmount, denomination: denomination()})}</p>
              <hr />
              <span class="btn" onClick={(e) => navigate("/swap")}>{t("new_swap")}</span>
          </Show>
          <Show when={swapStatus() == "transaction.mempool"}>
              <h2>{t("tx_in_mempool")}</h2>
              <p>{t("tx_in_mempool_subline")}</p>
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
          </Show>
          <Show when={swapStatus() == "transaction.lockupFailed"}>
              <h2>{t("lockup_failed")}</h2>
              <p>{t("lockup_failed_reason")}: {failureReason()}</p>
              <span class="btn" onclick={() => refund(swap())}>{t("refund")}</span>
              <span class="btn btn-success" onclick={() => downloadRefundFile(swap())}>{t("download_refund_json")}</span>
              <span class="btn btn-success" onclick={() => downloadRefundQr(swap())}>{t("download_refund_qr")}</span>
              <hr />
          </Show>
          <Show when={swapStatus() != "swap.expired" && swapStatus() != "invoice.expired" && swapStatus() != "transaction.claimed" && swapStatus() != "transaction.mempool" && swapStatus() != "transaction.lockupFailed"}>
              <p>
                {t("pay_timeout_blockheight")}: {swap().timeoutBlockHeight} <br />
                {t("pay_expected_amount")}: {(!reverse()) ? swap().expectedAmount: swap().onchainAmount} <br />
              </p>
              <hr />
              <img id="invoice-qr" src={invoiceQr()} alt="pay invoice qr" />
              <hr />
              <Show when={!reverse()}>
                  <span class="btn" onclick={() => clipboard(swap().bip21, t("copied"))}>{t("copy_bip21")}</span>
                  <span class="btn" onclick={() => clipboard(swap().address, t("copied"))}>{t("copy_onchain")}</span>
                  <span class="btn" onclick={() => clipboard(swap().expectedAmount, t("copied"))}>{t("copy_amount")}</span>
                  <span class="btn btn-success" onclick={() => downloadRefundFile(swap())}>{t("download_refund_json")}</span>
                  <span class="btn btn-success" onclick={() => downloadRefundQr(swap())}>{t("download_refund_qr")}</span>
              </Show>
              <Show when={reverse()}>
                  <span class="btn" onclick={() => navigator.clipboard.writeText(swap().invoice)}>{t("copy_invoice")}</span>
              </Show>
          </Show>
          <a class="btn btn-mempool" target="_blank" href={mempoolLink((reverse()) ? swap().address: swap().lockupAddress )}>{t("mempool")}</a>
      </Show>
      <Show when={!swap()}>
          <p>{t("pay_swap_404")}</p>
      </Show>
    </div>
  );
};

export default Pay;
