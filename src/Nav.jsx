import { createEffect } from "solid-js";
import { render } from "solid-js/web";
import { A } from "@solidjs/router";

import { useI18n } from "@solid-primitives/i18n";
import { i18n, setI18n, hamburger, setHamburger } from "./signals";

import "./nav.css";
import logo from "./assets/boltz-btc-logo.svg";

const locales = {
    en: "English",
    de: "Deutsch",
    es: "Español",
};

const Nav = () => {
  const [t, { add, locale, dict }] = useI18n();

  const set_local = (locale_code) => {
      locale(locale_code);
      setI18n(locale_code);
  };

  return (
    <nav>
      <svg id="hamburger" viewBox="0 0 100 100" width="50" class={hamburger() ? "active" : ""} onClick={() => setHamburger(!hamburger())}>
          <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
          <path class="line middle" d="m 70,50 h -40" />
          <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
      </svg>

      <A id="logo" href="/">
        <img src={logo} alt="boltz.exchange btc logo" />
      </A>

      <div id="collapse" class={hamburger() ? "active" : ""}>
          <A href="/swap" onClick={() => setHamburger(false)}>{t("swap")}</A>
          <A href="/refund" onClick={() => setHamburger(false)}>{t("refund")}</A>
          <a
            class="external"
            target="_blank"
            href="https://docs.boltz.exchange/en/latest/"
            >{t("documentation")}</a
          >
          <a
            class="external"
            target="_blank"
            href="https://docs.boltz.exchange/"
            >{t("help")}</a
          >
          <a
            class="external"
            target="_blank"
            href="http://boltzzzbnus4m7mta3cxmflnps4fp7dueu2tgurstbvrbt6xswzcocyd.onion/"
            >{t("onion")}</a
          >
      </div>
      <div id="languages">
          <span>{locales[i18n()]}</span>
          <div class="dropdown">
              <span class="lang" onClick={() => set_local("en")}>{locales["en"]}</span>
              <span class="lang" onClick={() => set_local("de")}>{locales["de"]}</span>
              <span class="lang" onClick={() => set_local("es")}>{locales["es"]}</span>
          </div>
      </div>

    </nav>
  );
};

export default Nav;
