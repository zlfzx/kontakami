import{r as a,$ as Ye,d as Ge,j as D,a as M}from"./index-c059fe49.js";import{e as Ze,c as W,b as Y,d as A,_ as S,a as _,g as qe,$ as Qe,f as Je}from"./index-e27f2a65.js";import{$ as et}from"./Command-aa51eccc.js";import{$ as se}from"./index-7e7c04ab.js";import{c as U}from"./utils-587908ec.js";import"./button-8a20b2ea.js";import"./table-6f9cf1aa.js";const tt=Ye["useId".toString()]||(()=>{});let nt=0;function q(e){const[t,n]=a.useState(tt());return Ze(()=>{e||n(r=>r??String(nt++))},[e]),e||(t?`radix-${t}`:"")}function rt(e,t=globalThis==null?void 0:globalThis.document){const n=W(e);a.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r),()=>t.removeEventListener("keydown",r)},[n,t])}const ae="dismissableLayer.update",ot="dismissableLayer.pointerDownOutside",at="dismissableLayer.focusOutside";let le;const ct=a.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),it=a.forwardRef((e,t)=>{var n;const{disableOutsidePointerEvents:r=!1,onEscapeKeyDown:o,onPointerDownOutside:c,onFocusOutside:u,onInteractOutside:i,onDismiss:v,...m}=e,d=a.useContext(ct),[l,h]=a.useState(null),p=(n=l==null?void 0:l.ownerDocument)!==null&&n!==void 0?n:globalThis==null?void 0:globalThis.document,[,w]=a.useState({}),s=Y(t,E=>h(E)),f=Array.from(d.layers),[b]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),C=f.indexOf(b),g=l?f.indexOf(l):-1,$=d.layersWithOutsidePointerEventsDisabled.size>0,y=g>=C,I=st(E=>{const T=E.target,ue=[...d.branches].some(Z=>Z.contains(T));!y||ue||(c==null||c(E),i==null||i(E),E.defaultPrevented||v==null||v())},p),R=ut(E=>{const T=E.target;[...d.branches].some(Z=>Z.contains(T))||(u==null||u(E),i==null||i(E),E.defaultPrevented||v==null||v())},p);return rt(E=>{g===d.layers.size-1&&(o==null||o(E),!E.defaultPrevented&&v&&(E.preventDefault(),v()))},p),a.useEffect(()=>{if(l)return r&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(le=p.body.style.pointerEvents,p.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(l)),d.layers.add(l),de(),()=>{r&&d.layersWithOutsidePointerEventsDisabled.size===1&&(p.body.style.pointerEvents=le)}},[l,p,r,d]),a.useEffect(()=>()=>{l&&(d.layers.delete(l),d.layersWithOutsidePointerEventsDisabled.delete(l),de())},[l,d]),a.useEffect(()=>{const E=()=>w({});return document.addEventListener(ae,E),()=>document.removeEventListener(ae,E)},[]),a.createElement(A.div,S({},m,{ref:s,style:{pointerEvents:$?y?"auto":"none":void 0,...e.style},onFocusCapture:_(e.onFocusCapture,R.onFocusCapture),onBlurCapture:_(e.onBlurCapture,R.onBlurCapture),onPointerDownCapture:_(e.onPointerDownCapture,I.onPointerDownCapture)}))});function st(e,t=globalThis==null?void 0:globalThis.document){const n=W(e),r=a.useRef(!1),o=a.useRef(()=>{});return a.useEffect(()=>{const c=i=>{if(i.target&&!r.current){let m=function(){Ce(ot,n,v,{discrete:!0})};const v={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=m,t.addEventListener("click",o.current,{once:!0})):m()}else t.removeEventListener("click",o.current);r.current=!1},u=window.setTimeout(()=>{t.addEventListener("pointerdown",c)},0);return()=>{window.clearTimeout(u),t.removeEventListener("pointerdown",c),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function ut(e,t=globalThis==null?void 0:globalThis.document){const n=W(e),r=a.useRef(!1);return a.useEffect(()=>{const o=c=>{c.target&&!r.current&&Ce(at,n,{originalEvent:c},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function de(){const e=new CustomEvent(ae);document.dispatchEvent(e)}function Ce(e,t,n,{discrete:r}){const o=n.originalEvent.target,c=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?qe(o,c):o.dispatchEvent(c)}const Q="focusScope.autoFocusOnMount",J="focusScope.autoFocusOnUnmount",fe={bubbles:!1,cancelable:!0},lt=a.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:c,...u}=e,[i,v]=a.useState(null),m=W(o),d=W(c),l=a.useRef(null),h=Y(t,s=>v(s)),p=a.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;a.useEffect(()=>{if(r){let s=function(g){if(p.paused||!i)return;const $=g.target;i.contains($)?l.current=$:P(l.current,{select:!0})},f=function(g){if(p.paused||!i)return;const $=g.relatedTarget;$!==null&&(i.contains($)||P(l.current,{select:!0}))},b=function(g){if(document.activeElement===document.body)for(const y of g)y.removedNodes.length>0&&P(i)};document.addEventListener("focusin",s),document.addEventListener("focusout",f);const C=new MutationObserver(b);return i&&C.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",s),document.removeEventListener("focusout",f),C.disconnect()}}},[r,i,p.paused]),a.useEffect(()=>{if(i){pe.add(p);const s=document.activeElement;if(!i.contains(s)){const b=new CustomEvent(Q,fe);i.addEventListener(Q,m),i.dispatchEvent(b),b.defaultPrevented||(dt(ht(we(i)),{select:!0}),document.activeElement===s&&P(i))}return()=>{i.removeEventListener(Q,m),setTimeout(()=>{const b=new CustomEvent(J,fe);i.addEventListener(J,d),i.dispatchEvent(b),b.defaultPrevented||P(s??document.body,{select:!0}),i.removeEventListener(J,d),pe.remove(p)},0)}}},[i,m,d,p]);const w=a.useCallback(s=>{if(!n&&!r||p.paused)return;const f=s.key==="Tab"&&!s.altKey&&!s.ctrlKey&&!s.metaKey,b=document.activeElement;if(f&&b){const C=s.currentTarget,[g,$]=ft(C);g&&$?!s.shiftKey&&b===$?(s.preventDefault(),n&&P(g,{select:!0})):s.shiftKey&&b===g&&(s.preventDefault(),n&&P($,{select:!0})):b===C&&s.preventDefault()}},[n,r,p.paused]);return a.createElement(A.div,S({tabIndex:-1},u,{ref:h,onKeyDown:w}))});function dt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(P(r,{select:t}),document.activeElement!==n)return}function ft(e){const t=we(e),n=ve(t,e),r=ve(t.reverse(),e);return[n,r]}function we(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function ve(e,t){for(const n of e)if(!vt(n,{upTo:t}))return n}function vt(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function pt(e){return e instanceof HTMLInputElement&&"select"in e}function P(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&pt(e)&&t&&e.select()}}const pe=mt();function mt(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=me(e,t),e.unshift(t)},remove(t){var n;e=me(e,t),(n=e[0])===null||n===void 0||n.resume()}}}function me(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function ht(e){return e.filter(t=>t.tagName!=="A")}const bt=a.forwardRef((e,t)=>{var n;const{container:r=globalThis==null||(n=globalThis.document)===null||n===void 0?void 0:n.body,...o}=e;return r?Ge.createPortal(a.createElement(A.div,S({},o,{ref:t})),r):null});let ee=0;function gt(){a.useEffect(()=>{var e,t;const n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(e=n[0])!==null&&e!==void 0?e:he()),document.body.insertAdjacentElement("beforeend",(t=n[1])!==null&&t!==void 0?t:he()),ee++,()=>{ee===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(r=>r.remove()),ee--}},[])}function he(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var x=function(){return x=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(t[c]=n[c])}return t},x.apply(this,arguments)};function Se(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function $t(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,c;r<o;r++)(c||!(r in t))&&(c||(c=Array.prototype.slice.call(t,0,r)),c[r]=t[r]);return e.concat(c||Array.prototype.slice.call(t))}var X="right-scroll-bar-position",V="width-before-scroll-bar",Et="with-scroll-bars-hidden",yt="--removed-body-scroll-bar-size";function te(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Ct(e,t){var n=a.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var be=new WeakMap;function wt(e,t){var n=Ct(t||null,function(r){return e.forEach(function(o){return te(o,r)})});return a.useLayoutEffect(function(){var r=be.get(n);if(r){var o=new Set(r),c=new Set(e),u=n.current;o.forEach(function(i){c.has(i)||te(i,null)}),c.forEach(function(i){o.has(i)||te(i,u)})}be.set(n,e)},[e]),n}function St(e){return e}function xt(e,t){t===void 0&&(t=St);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(c){var u=t(c,r);return n.push(u),function(){n=n.filter(function(i){return i!==u})}},assignSyncMedium:function(c){for(r=!0;n.length;){var u=n;n=[],u.forEach(c)}n={push:function(i){return c(i)},filter:function(){return n}}},assignMedium:function(c){r=!0;var u=[];if(n.length){var i=n;n=[],i.forEach(c),u=n}var v=function(){var d=u;u=[],d.forEach(c)},m=function(){return Promise.resolve().then(v)};m(),n={push:function(d){u.push(d),m()},filter:function(d){return u=u.filter(d),n}}}};return o}function Dt(e){e===void 0&&(e={});var t=xt(null);return t.options=x({async:!0,ssr:!1},e),t}var xe=function(e){var t=e.sideCar,n=Se(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return a.createElement(r,x({},n))};xe.isSideCarExport=!0;function Ot(e,t){return e.useMedium(t),xe}var De=Dt(),ne=function(){},G=a.forwardRef(function(e,t){var n=a.useRef(null),r=a.useState({onScrollCapture:ne,onWheelCapture:ne,onTouchMoveCapture:ne}),o=r[0],c=r[1],u=e.forwardProps,i=e.children,v=e.className,m=e.removeScrollBar,d=e.enabled,l=e.shards,h=e.sideCar,p=e.noIsolation,w=e.inert,s=e.allowPinchZoom,f=e.as,b=f===void 0?"div":f,C=Se(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),g=h,$=wt([n,t]),y=x(x({},C),o);return a.createElement(a.Fragment,null,d&&a.createElement(g,{sideCar:De,removeScrollBar:m,shards:l,noIsolation:p,inert:w,setCallbacks:c,allowPinchZoom:!!s,lockRef:n}),u?a.cloneElement(a.Children.only(i),x(x({},y),{ref:$})):a.createElement(b,x({},y,{className:v,ref:$}),i))});G.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};G.classNames={fullWidth:V,zeroRight:X};var Rt=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Pt(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Rt();return t&&e.setAttribute("nonce",t),e}function Tt(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function _t(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var At=function(){var e=0,t=null;return{add:function(n){e==0&&(t=Pt())&&(Tt(t,n),_t(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Lt=function(){var e=At();return function(t,n){a.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Oe=function(){var e=Lt(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},kt={left:0,top:0,right:0,gap:0},re=function(e){return parseInt(e||"",10)||0},Nt=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[re(n),re(r),re(o)]},Ft=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return kt;var t=Nt(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},It=Oe(),F="data-scroll-locked",Mt=function(e,t,n,r){var o=e.left,c=e.top,u=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(Et,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(F,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(c,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(X,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(V,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(X," .").concat(X,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(V," .").concat(V,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(F,`] {
    `).concat(yt,": ").concat(i,`px;
  }
`)},ge=function(){var e=parseInt(document.body.getAttribute(F)||"0",10);return isFinite(e)?e:0},Wt=function(){a.useEffect(function(){return document.body.setAttribute(F,(ge()+1).toString()),function(){var e=ge()-1;e<=0?document.body.removeAttribute(F):document.body.setAttribute(F,e.toString())}},[])},Bt=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;Wt();var c=a.useMemo(function(){return Ft(o)},[o]);return a.createElement(It,{styles:Mt(c,!t,o,n?"":"!important")})},ce=!1;if(typeof window<"u")try{var j=Object.defineProperty({},"passive",{get:function(){return ce=!0,!0}});window.addEventListener("test",j,j),window.removeEventListener("test",j,j)}catch{ce=!1}var L=ce?{passive:!1}:!1,Ut=function(e){return e.tagName==="TEXTAREA"},Re=function(e,t){var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Ut(e)&&n[t]==="visible")},jt=function(e){return Re(e,"overflowY")},Kt=function(e){return Re(e,"overflowX")},$e=function(e,t){var n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var r=Pe(e,n);if(r){var o=Te(e,n),c=o[1],u=o[2];if(c>u)return!0}n=n.parentNode}while(n&&n!==document.body);return!1},Ht=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},zt=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Pe=function(e,t){return e==="v"?jt(t):Kt(t)},Te=function(e,t){return e==="v"?Ht(t):zt(t)},Xt=function(e,t){return e==="h"&&t==="rtl"?-1:1},Vt=function(e,t,n,r,o){var c=Xt(e,window.getComputedStyle(t).direction),u=c*r,i=n.target,v=t.contains(i),m=!1,d=u>0,l=0,h=0;do{var p=Te(e,i),w=p[0],s=p[1],f=p[2],b=s-f-c*w;(w||b)&&Pe(e,i)&&(l+=b,h+=w),i=i.parentNode}while(!v&&i!==document.body||v&&(t.contains(i)||t===i));return(d&&(o&&l===0||!o&&u>l)||!d&&(o&&h===0||!o&&-u>h))&&(m=!0),m},K=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Ee=function(e){return[e.deltaX,e.deltaY]},ye=function(e){return e&&"current"in e?e.current:e},Yt=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Gt=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Zt=0,k=[];function qt(e){var t=a.useRef([]),n=a.useRef([0,0]),r=a.useRef(),o=a.useState(Zt++)[0],c=a.useState(function(){return Oe()})[0],u=a.useRef(e);a.useEffect(function(){u.current=e},[e]),a.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var s=$t([e.lockRef.current],(e.shards||[]).map(ye),!0).filter(Boolean);return s.forEach(function(f){return f.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),s.forEach(function(f){return f.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var i=a.useCallback(function(s,f){if("touches"in s&&s.touches.length===2)return!u.current.allowPinchZoom;var b=K(s),C=n.current,g="deltaX"in s?s.deltaX:C[0]-b[0],$="deltaY"in s?s.deltaY:C[1]-b[1],y,I=s.target,R=Math.abs(g)>Math.abs($)?"h":"v";if("touches"in s&&R==="h"&&I.type==="range")return!1;var E=$e(R,I);if(!E)return!0;if(E?y=R:(y=R==="v"?"h":"v",E=$e(R,I)),!E)return!1;if(!r.current&&"changedTouches"in s&&(g||$)&&(r.current=y),!y)return!0;var T=r.current||y;return Vt(T,f,s,T==="h"?g:$,!0)},[]),v=a.useCallback(function(s){var f=s;if(!(!k.length||k[k.length-1]!==c)){var b="deltaY"in f?Ee(f):K(f),C=t.current.filter(function(y){return y.name===f.type&&y.target===f.target&&Yt(y.delta,b)})[0];if(C&&C.should){f.cancelable&&f.preventDefault();return}if(!C){var g=(u.current.shards||[]).map(ye).filter(Boolean).filter(function(y){return y.contains(f.target)}),$=g.length>0?i(f,g[0]):!u.current.noIsolation;$&&f.cancelable&&f.preventDefault()}}},[]),m=a.useCallback(function(s,f,b,C){var g={name:s,delta:f,target:b,should:C};t.current.push(g),setTimeout(function(){t.current=t.current.filter(function($){return $!==g})},1)},[]),d=a.useCallback(function(s){n.current=K(s),r.current=void 0},[]),l=a.useCallback(function(s){m(s.type,Ee(s),s.target,i(s,e.lockRef.current))},[]),h=a.useCallback(function(s){m(s.type,K(s),s.target,i(s,e.lockRef.current))},[]);a.useEffect(function(){return k.push(c),e.setCallbacks({onScrollCapture:l,onWheelCapture:l,onTouchMoveCapture:h}),document.addEventListener("wheel",v,L),document.addEventListener("touchmove",v,L),document.addEventListener("touchstart",d,L),function(){k=k.filter(function(s){return s!==c}),document.removeEventListener("wheel",v,L),document.removeEventListener("touchmove",v,L),document.removeEventListener("touchstart",d,L)}},[]);var p=e.removeScrollBar,w=e.inert;return a.createElement(a.Fragment,null,w?a.createElement(c,{styles:Gt(o)}):null,p?a.createElement(Bt,{gapMode:"margin"}):null)}const Qt=Ot(De,qt);var _e=a.forwardRef(function(e,t){return a.createElement(G,x({},e,{ref:t,sideCar:Qt}))});_e.classNames=G.classNames;const Jt=_e;var en=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},N=new WeakMap,H=new WeakMap,z={},oe=0,Ae=function(e){return e&&(e.host||Ae(e.parentNode))},tn=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Ae(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return Boolean(n)})},nn=function(e,t,n,r){var o=tn(t,Array.isArray(e)?e:[e]);z[n]||(z[n]=new WeakMap);var c=z[n],u=[],i=new Set,v=new Set(o),m=function(l){!l||i.has(l)||(i.add(l),m(l.parentNode))};o.forEach(m);var d=function(l){!l||v.has(l)||Array.prototype.forEach.call(l.children,function(h){if(i.has(h))d(h);else{var p=h.getAttribute(r),w=p!==null&&p!=="false",s=(N.get(h)||0)+1,f=(c.get(h)||0)+1;N.set(h,s),c.set(h,f),u.push(h),s===1&&w&&H.set(h,!0),f===1&&h.setAttribute(n,"true"),w||h.setAttribute(r,"true")}})};return d(t),i.clear(),oe++,function(){u.forEach(function(l){var h=N.get(l)-1,p=c.get(l)-1;N.set(l,h),c.set(l,p),h||(H.has(l)||l.removeAttribute(r),H.delete(l)),p||l.removeAttribute(n)}),oe--,oe||(N=new WeakMap,N=new WeakMap,H=new WeakMap,z={})}},rn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=t||en(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live]"))),nn(r,o,n,"aria-hidden")):function(){return null}};const Le="Dialog",[ke,Nn]=Qe(Le),[on,O]=ke(Le),an=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:c,modal:u=!0}=e,i=a.useRef(null),v=a.useRef(null),[m=!1,d]=et({prop:r,defaultProp:o,onChange:c});return a.createElement(on,{scope:t,triggerRef:i,contentRef:v,contentId:q(),titleId:q(),descriptionId:q(),open:m,onOpenChange:d,onOpenToggle:a.useCallback(()=>d(l=>!l),[d]),modal:u},n)},Ne="DialogPortal",[cn,Fe]=ke(Ne,{forceMount:void 0}),sn=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,c=O(Ne,t);return a.createElement(cn,{scope:t,forceMount:n},a.Children.map(r,u=>a.createElement(se,{present:n||c.open},a.createElement(bt,{asChild:!0,container:o},u))))},ie="DialogOverlay",un=a.forwardRef((e,t)=>{const n=Fe(ie,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,c=O(ie,e.__scopeDialog);return c.modal?a.createElement(se,{present:r||c.open},a.createElement(ln,S({},o,{ref:t}))):null}),ln=a.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=O(ie,n);return a.createElement(Jt,{as:Je,allowPinchZoom:!0,shards:[o.contentRef]},a.createElement(A.div,S({"data-state":Me(o.open)},r,{ref:t,style:{pointerEvents:"auto",...r.style}})))}),B="DialogContent",dn=a.forwardRef((e,t)=>{const n=Fe(B,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,c=O(B,e.__scopeDialog);return a.createElement(se,{present:r||c.open},c.modal?a.createElement(fn,S({},o,{ref:t})):a.createElement(vn,S({},o,{ref:t})))}),fn=a.forwardRef((e,t)=>{const n=O(B,e.__scopeDialog),r=a.useRef(null),o=Y(t,n.contentRef,r);return a.useEffect(()=>{const c=r.current;if(c)return rn(c)},[]),a.createElement(Ie,S({},e,{ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:_(e.onCloseAutoFocus,c=>{var u;c.preventDefault(),(u=n.triggerRef.current)===null||u===void 0||u.focus()}),onPointerDownOutside:_(e.onPointerDownOutside,c=>{const u=c.detail.originalEvent,i=u.button===0&&u.ctrlKey===!0;(u.button===2||i)&&c.preventDefault()}),onFocusOutside:_(e.onFocusOutside,c=>c.preventDefault())}))}),vn=a.forwardRef((e,t)=>{const n=O(B,e.__scopeDialog),r=a.useRef(!1),o=a.useRef(!1);return a.createElement(Ie,S({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:c=>{var u;if((u=e.onCloseAutoFocus)===null||u===void 0||u.call(e,c),!c.defaultPrevented){var i;r.current||(i=n.triggerRef.current)===null||i===void 0||i.focus(),c.preventDefault()}r.current=!1,o.current=!1},onInteractOutside:c=>{var u,i;(u=e.onInteractOutside)===null||u===void 0||u.call(e,c),c.defaultPrevented||(r.current=!0,c.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const v=c.target;((i=n.triggerRef.current)===null||i===void 0?void 0:i.contains(v))&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&o.current&&c.preventDefault()}}))}),Ie=a.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:c,...u}=e,i=O(B,n),v=a.useRef(null),m=Y(t,v);return gt(),a.createElement(a.Fragment,null,a.createElement(lt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:c},a.createElement(it,S({role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":Me(i.open)},u,{ref:m,onDismiss:()=>i.onOpenChange(!1)}))),!1)}),pn="DialogTitle",mn=a.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=O(pn,n);return a.createElement(A.h2,S({id:o.titleId},r,{ref:t}))}),hn="DialogDescription",bn=a.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=O(hn,n);return a.createElement(A.p,S({id:o.descriptionId},r,{ref:t}))}),gn="DialogClose",$n=a.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=O(gn,n);return a.createElement(A.button,S({type:"button"},r,{ref:t,onClick:_(e.onClick,()=>o.onOpenChange(!1))}))});function Me(e){return e?"open":"closed"}const En=an,yn=sn,We=un,Be=dn,Ue=mn,je=bn,Cn=$n;function wn(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,c;for(c=0;c<r.length;c++)o=r[c],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}var Sn=["color"],xn=a.forwardRef(function(e,t){var n=e.color,r=n===void 0?"currentColor":n,o=wn(e,Sn);return a.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:t}),a.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:r,fillRule:"evenodd",clipRule:"evenodd"}))});const Dn=En,On=yn,Ke=a.forwardRef(({className:e,...t},n)=>D(We,{ref:n,className:U("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));Ke.displayName=We.displayName;const He=a.forwardRef(({className:e,children:t,...n},r)=>M(On,{children:[D(Ke,{}),M(Be,{ref:r,className:U("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...n,children:[t,M(Cn,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[D(xn,{className:"h-4 w-4"}),D("span",{className:"sr-only",children:"Close"})]})]})]}));He.displayName=Be.displayName;const ze=({className:e,...t})=>D("div",{className:U("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});ze.displayName="DialogHeader";const Xe=a.forwardRef(({className:e,...t},n)=>D(Ue,{ref:n,className:U("text-lg font-semibold leading-none tracking-tight",e),...t}));Xe.displayName=Ue.displayName;const Ve=a.forwardRef(({className:e,...t},n)=>D(je,{ref:n,className:U("text-sm text-muted-foreground",e),...t}));Ve.displayName=je.displayName;function Fn({children:e,isOpen:t,title:n,description:r,onClose:o}){return D(Dn,{open:t,onOpenChange:o,children:M(He,{children:[M(ze,{children:[n?D(Xe,{children:n}):null,r?D(Ve,{children:r}):null]}),e]})})}export{Fn as default};
