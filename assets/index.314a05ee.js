const Qe=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerpolicy&&(l.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?l.credentials="include":n.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(n){if(n.ep)return;n.ep=!0;const l=t(n);fetch(n.href,l)}};Qe();const v={};function We(e){v.context=e}const Xe=(e,s)=>e===s,ae={equals:Xe};let he=ve;const N={},_=1,k=2,pe={owned:null,cleanups:null,context:null,owner:null};var p=null;let B=null,c=null,E=null,u=null,b=null,U=0;function Ze(e,s){const t=c,i=p,n=e.length===0,l=n?pe:{owned:null,cleanups:null,context:null,owner:s||i},r=n?e:()=>e(()=>H(l));p=l,c=null;try{return G(r,!0)}finally{c=t,p=i}}function C(e,s){s=s?Object.assign({},ae,s):ae;const t={value:e,observers:null,observerSlots:null,pending:N,comparator:s.equals||void 0},i=n=>(typeof n=="function"&&(n=n(t.pending!==N?t.pending:t.value)),j(t,n));return[et.bind(t),i]}function A(e,s,t){const i=be(e,s,!1,_);F(i)}function Je(e,s,t){he=it;const i=be(e,s,!1,_);i.user=!0,b?b.push(i):F(i)}function Ye(e){if(E)return e();let s;const t=E=[];try{s=e()}finally{E=null}return G(()=>{for(let i=0;i<t.length;i+=1){const n=t[i];if(n.pending!==N){const l=n.pending;n.pending=N,j(n,l)}}},!1),s}function ge(e){let s,t=c;return c=null,s=e(),c=t,s}function et(){const e=B;if(this.sources&&(this.state||e)){const s=u;u=null,this.state===_||e?F(this):O(this),u=s}if(c){const s=this.observers?this.observers.length:0;c.sources?(c.sources.push(this),c.sourceSlots.push(s)):(c.sources=[this],c.sourceSlots=[s]),this.observers?(this.observers.push(c),this.observerSlots.push(c.sources.length-1)):(this.observers=[c],this.observerSlots=[c.sources.length-1])}return this.value}function j(e,s,t){if(E)return e.pending===N&&E.push(e),e.pending=s,s;if(e.comparator&&e.comparator(e.value,s))return s;let i=!1;return e.value=s,e.observers&&e.observers.length&&G(()=>{for(let n=0;n<e.observers.length;n+=1){const l=e.observers[n];i&&B.disposed.has(l),(i&&!l.tState||!i&&!l.state)&&(l.pure?u.push(l):b.push(l),l.observers&&$e(l)),i||(l.state=_)}if(u.length>1e6)throw u=[],new Error},!1),s}function F(e){if(!e.fn)return;H(e);const s=p,t=c,i=U;c=p=e,tt(e,e.value,i),c=t,p=s}function tt(e,s,t){let i;try{i=e.fn(s)}catch(n){me(n)}(!e.updatedAt||e.updatedAt<=t)&&(e.observers&&e.observers.length?j(e,i):e.value=i,e.updatedAt=t)}function be(e,s,t,i=_,n){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:p,context:null,pure:t};return p===null||p!==pe&&(p.owned?p.owned.push(l):p.owned=[l]),l}function T(e){const s=B;if(e.state===0||s)return;if(e.state===k||s)return O(e);if(e.suspense&&ge(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<U);)(e.state||s)&&t.push(e);for(let i=t.length-1;i>=0;i--)if(e=t[i],e.state===_||s)F(e);else if(e.state===k||s){const n=u;u=null,O(e,t[0]),u=n}}function G(e,s){if(u)return e();let t=!1;s||(u=[]),b?t=!0:b=[],U++;try{const i=e();return st(t),i}catch(i){u||(b=null),me(i)}}function st(e){u&&(ve(u),u=null),!e&&(b.length?Ye(()=>{he(b),b=null}):b=null)}function ve(e){for(let s=0;s<e.length;s++)T(e[s])}function it(e){let s,t=0;for(s=0;s<e.length;s++){const n=e[s];n.user?e[t++]=n:T(n)}v.context&&We();const i=e.length;for(s=0;s<t;s++)T(e[s]);for(s=i;s<e.length;s++)T(e[s])}function O(e,s){const t=B;e.state=0;for(let i=0;i<e.sources.length;i+=1){const n=e.sources[i];n.sources&&(n.state===_||t?n!==s&&T(n):(n.state===k||t)&&O(n,s))}}function $e(e){const s=B;for(let t=0;t<e.observers.length;t+=1){const i=e.observers[t];(!i.state||s)&&(i.state=k,i.pure?u.push(i):b.push(i),i.observers&&$e(i))}}function H(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),n=t.observers;if(n&&n.length){const l=n.pop(),r=t.observerSlots.pop();i<n.length&&(l.sourceSlots[r]=i,n[i]=l,t.observerSlots[i]=r)}}if(e.owned){for(s=0;s<e.owned.length;s++)H(e.owned[s]);e.owned=null}if(e.cleanups){for(s=0;s<e.cleanups.length;s++)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function me(e){throw e}function nt(e,s){return ge(()=>e(s||{}))}function lt(e,s,t){let i=t.length,n=s.length,l=i,r=0,o=0,a=s[n-1].nextSibling,f=null;for(;r<n||o<l;){if(s[r]===t[o]){r++,o++;continue}for(;s[n-1]===t[l-1];)n--,l--;if(n===r){const d=l<i?o?t[o-1].nextSibling:t[l-o]:a;for(;o<l;)e.insertBefore(t[o++],d)}else if(l===o)for(;r<n;)(!f||!f.has(s[r]))&&s[r].remove(),r++;else if(s[r]===t[l-1]&&t[o]===s[n-1]){const d=s[--n].nextSibling;e.insertBefore(t[o++],s[r++].nextSibling),e.insertBefore(t[--l],d),s[n]=t[l]}else{if(!f){f=new Map;let $=o;for(;$<l;)f.set(t[$],$++)}const d=f.get(s[r]);if(d!=null)if(o<d&&d<l){let $=r,x=1,L;for(;++$<n&&$<l&&!((L=f.get(s[$]))==null||L!==d+x);)x++;if(x>d-o){const I=s[r];for(;o<d;)e.insertBefore(t[o++],I)}else e.replaceChild(t[o++],s[r++])}else r++;else s[r++].remove()}}}const ue="_$DX_DELEGATE";function ot(e,s,t){let i;return Ze(n=>{i=n,s===document?e():w(s,e(),s.firstChild?null:void 0,t)}),()=>{i(),s.textContent=""}}function rt(e,s,t){const i=document.createElement("template");i.innerHTML=e;let n=i.content.firstChild;return t&&(n=n.firstChild),n}function ft(e,s=window.document){const t=s[ue]||(s[ue]=new Set);for(let i=0,n=e.length;i<n;i++){const l=e[i];t.has(l)||(t.add(l),s.addEventListener(l,at))}}function ct(e,s,t){t==null?e.removeAttribute(s):e.setAttribute(s,t)}function w(e,s,t,i){if(t!==void 0&&!i&&(i=[]),typeof s!="function")return P(e,s,i,t);A(n=>P(e,s(),n,t),i)}function at(e){const s=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),v.registry&&!v.done&&(v.done=!0,document.querySelectorAll("[id^=pl-]").forEach(i=>i.remove()));t!==null;){const i=t[s];if(i&&!t.disabled){const n=t[`${s}Data`];if(n!==void 0?i.call(t,n,e):i.call(t,e),e.cancelBubble)return}t=t.host&&t.host!==t&&t.host instanceof Node?t.host:t.parentNode}}function P(e,s,t,i,n){for(v.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(s===t)return t;const l=typeof s,r=i!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,l==="string"||l==="number"){if(v.context)return t;if(l==="number"&&(s=s.toString()),r){let o=t[0];o&&o.nodeType===3?o.data=s:o=document.createTextNode(s),t=y(e,t,i,o)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s}else if(s==null||l==="boolean"){if(v.context)return t;t=y(e,t,i)}else{if(l==="function")return A(()=>{let o=s();for(;typeof o=="function";)o=o();t=P(e,o,t,i)}),()=>t;if(Array.isArray(s)){const o=[],a=t&&Array.isArray(t);if(R(o,s,t,n))return A(()=>t=P(e,o,t,i,!0)),()=>t;if(v.context){for(let f=0;f<o.length;f++)if(o[f].parentNode)return t=o}if(o.length===0){if(t=y(e,t,i),r)return t}else a?t.length===0?de(e,o,i):lt(e,t,o):(t&&y(e),de(e,o));t=o}else if(s instanceof Node){if(v.context&&s.parentNode)return t=r?[s]:s;if(Array.isArray(t)){if(r)return t=y(e,t,i,s);y(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}}return t}function R(e,s,t,i){let n=!1;for(let l=0,r=s.length;l<r;l++){let o=s[l],a=t&&t[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))n=R(e,o,a)||n;else if(typeof o=="function")if(i){for(;typeof o=="function";)o=o();n=R(e,Array.isArray(o)?o:[o],a)||n}else e.push(o),n=!0;else{const f=String(o);a&&a.nodeType===3&&a.data===f?e.push(a):e.push(document.createTextNode(f))}}return n}function de(e,s,t){for(let i=0,n=s.length;i<n;i++)e.insertBefore(s[i],t)}function y(e,s,t,i){if(t===void 0)return e.textContent="";const n=i||document.createTextNode("");if(s.length){let l=!1;for(let r=s.length-1;r>=0;r--){const o=s[r];if(n!==o){const a=o.parentNode===e;!l&&!r?a?e.replaceChild(n,o):e.insertBefore(n,t):a&&o.remove()}else l=!0}}else e.insertBefore(n,t);return[n]}const ut="https://boltz.exchange/api",dt=(e,s)=>{fetch(ut+e).then(t=>{if(!t.ok)throw new Error(`Request failed with status ${reponse.status}`);return t.json()}).then(s).catch(t=>console.error(t))},ht=rt('<div class="container"><h2>Create Submarine Swap</h2><p>Payment includes, miner and boltz service fees.</p><hr><div class="icons"><div><img src="/src/assets/bitcoin-icon.svg" alt=""></div><div><div id="reverse"><input type="checkbox"></div></div><div><img src="/src/assets/lightning-icon.svg" alt=""></div></div><form action="#"><div><input autofocus type="text" id="sendAmount"><label>BTC</label></div><div><span id="receiveAmount"></span><label>BTC</label></div></form><hr><div class="fees"><div class="fee"><span><b> BTC</b></span><br><label>Min. amount</label></div><div class="fee"><span><b> BTC</b></span><br><label>Max. amount</label></div><div class="fee"><span><b> %</b></span><br><label>Boltz fee</label></div><div class="fee"><span><b> BTC</b></span><br><label>Miner fee</label></div></div><hr><div class="tags"><div class="tag"><span class="btn">100K</span></div><div class="tag"><span class="btn">500K</span></div><div class="tag"><span class="btn">1M</span></div><div class="tag"><span class="btn">3M</span></div><div class="tag"><span class="btn">5M</span></div><div class="tag"><span class="btn">7M</span></div><div class="tag"><span class="btn">10M</span></div></div><p>Click the button to create a swap and a popover with invoice details will appear.</p><span class="btn">Create Swap</span></div>'),pt=e=>(e(),setInterval(e,1e4)),gt=()=>{const[e,s]=C(0),[t,i]=C(0),[n,l]=C(0),[r,o]=C(0),[a,f]=C(0),[d,$]=C(0),[x,L]=C(!1),[I,Ce]=C(0);let M=1e8;const m=()=>{document.getElementById("sendAmount").focus()};return f(.05),pt(()=>{dt("/getpairs",h=>{let S=h.pairs["BTC/BTC"];Ce(S)})}),Je(()=>{let h=I();if(h)if(l(h.limits.minimal/M),o(h.limits.maximal/M),s(h.fees.percentage),$(a()-a()/100*e()),x()){let S=h.fees.minerFees.baseAsset.reverse,D=(S.claim+S.lockup)/M;i(D.toFixed(8))}else i(h.fees.minerFees.baseAsset.normal/M)}),(()=>{const h=ht.cloneNode(!0),S=h.firstChild,D=S.nextSibling,xe=D.nextSibling,K=xe.nextSibling,_e=K.firstChild,Se=_e.nextSibling,ye=Se.firstChild,V=ye.firstChild,q=K.nextSibling,z=q.firstChild,Q=z.firstChild,we=z.nextSibling,Ae=we.firstChild,Ee=q.nextSibling,W=Ee.nextSibling,X=W.firstChild,Te=X.firstChild,Z=Te.firstChild,Ne=Z.firstChild,J=X.nextSibling,Be=J.firstChild,Y=Be.firstChild,Le=Y.firstChild,ee=J.nextSibling,Me=ee.firstChild,te=Me.firstChild,ke=te.firstChild,Oe=ee.nextSibling,Pe=Oe.firstChild,se=Pe.firstChild,Fe=se.firstChild,Ie=W.nextSibling,ie=Ie.nextSibling,ne=ie.firstChild,De=ne.firstChild,le=ne.nextSibling,Re=le.firstChild,oe=le.nextSibling,Ue=oe.firstChild,re=oe.nextSibling,je=re.firstChild,fe=re.nextSibling,Ge=fe.firstChild,ce=fe.nextSibling,He=ce.firstChild,Ke=ce.nextSibling,Ve=Ke.firstChild,qe=ie.nextSibling,ze=qe.nextSibling;return V.addEventListener("change",g=>{L(g.currentTarget.checked),m()}),Q.$$keyup=g=>f(g.currentTarget.value),w(Ae,d),w(Z,n,Ne),w(Y,r,Le),w(te,e,ke),w(se,t,Fe),De.$$click=g=>{f(.001),m()},Re.$$click=g=>{f(.005),m()},Ue.$$click=g=>{f(.01),m()},je.$$click=g=>{f(.03),m()},Ge.$$click=g=>{f(.05),m()},He.$$click=g=>{f(.07),m()},Ve.$$click=g=>{f(.1),m()},ze.$$click=g=>createSwap(),A(()=>ct(h,"data-reverse",x())),A(()=>V.value=x()),A(()=>Q.value=a()),h})()};ft(["keyup","click"]);ot(()=>nt(gt,{}),document.getElementById("root"));
