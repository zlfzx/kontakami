import{r as a,T as E,c as ct,e as Ne,j as $,a as D,b as _e}from"./index-233e5cf9.js";var dt=Object.defineProperty,ft=(e,t,n)=>t in e?dt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ye=(e,t,n)=>(ft(e,typeof t!="symbol"?t+"":t,n),n);let mt=class{constructor(){ye(this,"current",this.detect()),ye(this,"handoffState","pending"),ye(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},R=new mt,A=(e,t)=>{R.isServer?a.useEffect(e,t):a.useLayoutEffect(e,t)};function M(e){let t=a.useRef(e);return A(()=>{t.current=e},[e]),t}function fe(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function oe(){let e=[],t=[],n={enqueue(r){t.push(r)},addEventListener(r,o,l,i){return r.addEventListener(o,l,i),n.add(()=>r.removeEventListener(o,l,i))},requestAnimationFrame(...r){let o=requestAnimationFrame(...r);return n.add(()=>cancelAnimationFrame(o))},nextFrame(...r){return n.requestAnimationFrame(()=>n.requestAnimationFrame(...r))},setTimeout(...r){let o=setTimeout(...r);return n.add(()=>clearTimeout(o))},microTask(...r){let o={current:!0};return fe(()=>{o.current&&r[0]()}),n.add(()=>{o.current=!1})},add(r){return e.push(r),()=>{let o=e.indexOf(r);if(o>=0){let[l]=e.splice(o,1);l()}}},dispose(){for(let r of e.splice(0))r()},async workQueue(){for(let r of t.splice(0))await r()},style(r,o,l){let i=r.style.getPropertyValue(o);return Object.assign(r.style,{[o]:l}),this.add(()=>{Object.assign(r.style,{[o]:i})})}};return n}function Me(){let[e]=a.useState(oe);return a.useEffect(()=>()=>e.dispose(),[e]),e}let x=function(e){let t=M(e);return E.useCallback((...n)=>t.current(...n),[t])};function J(){let[e,t]=a.useState(R.isHandoffComplete);return e&&R.isHandoffComplete===!1&&t(!1),a.useEffect(()=>{e!==!0&&t(!0)},[e]),a.useEffect(()=>R.handoff(),[]),e}var qe;let Q=(qe=E.useId)!=null?qe:function(){let e=J(),[t,n]=E.useState(e?()=>R.nextId():null);return A(()=>{t===null&&n(R.nextId())},[t]),t!=null?""+t:void 0};function S(e,t,...n){if(e in t){let o=t[e];return typeof o=="function"?o(...n):o}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o=>`"${o}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,S),r}function je(e){return R.isServer?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let Le=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var q=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(q||{}),Xe=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Xe||{}),pt=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(pt||{});function ht(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(Le)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var ze=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(ze||{});function vt(e,t=0){var n;return e===((n=je(e))==null?void 0:n.body)?!1:S(t,{[0](){return e.matches(Le)},[1](){let r=e;for(;r!==null;){if(r.matches(Le))return!0;r=r.parentElement}return!1}})}function V(e){e==null||e.focus({preventScroll:!0})}let gt=["textarea","input"].join(",");function bt(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,gt))!=null?n:!1}function Et(e,t=n=>n){return e.slice().sort((n,r)=>{let o=t(n),l=t(r);if(o===null||l===null)return 0;let i=o.compareDocumentPosition(l);return i&Node.DOCUMENT_POSITION_FOLLOWING?-1:i&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function ue(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:o=[]}={}){let l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,i=Array.isArray(e)?n?Et(e):e:ht(e);o.length>0&&i.length>1&&(i=i.filter(m=>!o.includes(m))),r=r??l.activeElement;let u=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,i.indexOf(r))-1;if(t&4)return Math.max(0,i.indexOf(r))+1;if(t&8)return i.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=t&32?{preventScroll:!0}:{},c=0,h=i.length,g;do{if(c>=h||c+h<=0)return 0;let m=s+c;if(t&16)m=(m+h)%h;else{if(m<0)return 3;if(m>=h)return 1}g=i[m],g==null||g.focus(d),c+=u}while(g!==l.activeElement);return t&6&&bt(g)&&g.select(),g.hasAttribute("tabindex")||g.setAttribute("tabindex","0"),2}function $e(e,t,n){let r=M(t);a.useEffect(()=>{function o(l){r.current(l)}return document.addEventListener(e,o,n),()=>document.removeEventListener(e,o,n)},[e,n])}function wt(e,t,n=!0){let r=a.useRef(!1);a.useEffect(()=>{requestAnimationFrame(()=>{r.current=n})},[n]);function o(i,u){if(!r.current||i.defaultPrevented)return;let s=function c(h){return typeof h=="function"?c(h()):Array.isArray(h)||h instanceof Set?h:[h]}(e),d=u(i);if(d!==null&&d.getRootNode().contains(d)){for(let c of s){if(c===null)continue;let h=c instanceof HTMLElement?c:c.current;if(h!=null&&h.contains(d)||i.composed&&i.composedPath().includes(h))return}return!vt(d,ze.Loose)&&d.tabIndex!==-1&&i.preventDefault(),t(i,d)}}let l=a.useRef(null);$e("mousedown",i=>{var u,s;r.current&&(l.current=((s=(u=i.composedPath)==null?void 0:u.call(i))==null?void 0:s[0])||i.target)},!0),$e("click",i=>{!l.current||(o(i,()=>l.current),l.current=null)},!0),$e("blur",i=>o(i,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}let Ke=Symbol();function yt(e,t=!0){return Object.assign(e,{[Ke]:t})}function L(...e){let t=a.useRef(e);a.useEffect(()=>{t.current=e},[e]);let n=x(r=>{for(let o of t.current)o!=null&&(typeof o=="function"?o(r):o.current=r)});return e.every(r=>r==null||(r==null?void 0:r[Ke]))?void 0:n}function Je(...e){return e.filter(Boolean).join(" ")}var se=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(se||{}),k=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(k||{});function N({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:o,visible:l=!0,name:i}){let u=Qe(t,e);if(l)return ae(u,n,r,i);let s=o??0;if(s&2){let{static:d=!1,...c}=u;if(d)return ae(c,n,r,i)}if(s&1){let{unmount:d=!0,...c}=u;return S(d?0:1,{[0](){return null},[1](){return ae({...c,hidden:!0,style:{display:"none"}},n,r,i)}})}return ae(u,n,r,i)}function ae(e,t={},n,r){var o;let{as:l=n,children:i,refName:u="ref",...s}=Se(e,["unmount","static"]),d=e.ref!==void 0?{[u]:e.ref}:{},c=typeof i=="function"?i(t):i;s.className&&typeof s.className=="function"&&(s.className=s.className(t));let h={};if(t){let g=!1,m=[];for(let[f,b]of Object.entries(t))typeof b=="boolean"&&(g=!0),b===!0&&m.push(f);g&&(h["data-headlessui-state"]=m.join(" "))}if(l===a.Fragment&&Object.keys(We(s)).length>0){if(!a.isValidElement(c)||Array.isArray(c)&&c.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map(f=>`  - ${f}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(f=>`  - ${f}`).join(`
`)].join(`
`));let g=Je((o=c.props)==null?void 0:o.className,s.className),m=g?{className:g}:{};return a.cloneElement(c,Object.assign({},Qe(c.props,We(Se(s,["ref"]))),h,d,$t(c.ref,d.ref),m))}return a.createElement(l,Object.assign({},Se(s,["ref"]),l!==a.Fragment&&d,l!==a.Fragment&&h),c)}function $t(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let n of e)n!=null&&(typeof n=="function"?n(t):n.current=t)}}}function Qe(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let o in r)o.startsWith("on")&&typeof r[o]=="function"?(n[o]!=null||(n[o]=[]),n[o].push(r[o])):t[o]=r[o];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(r=>[r,void 0])));for(let r in n)Object.assign(t,{[r](o,...l){let i=n[r];for(let u of i){if((o instanceof Event||(o==null?void 0:o.nativeEvent)instanceof Event)&&o.defaultPrevented)return;u(o,...l)}}});return t}function C(e){var t;return Object.assign(a.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function We(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function Se(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}function St(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(t==null?void 0:t.getAttribute("disabled"))==="";return r&&xt(n)?!1:r}function xt(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let Tt="div";var ce=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(ce||{});let Re=C(function(e,t){let{features:n=1,...r}=e,o={ref:t,"aria-hidden":(n&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(n&4)===4&&(n&2)!==2&&{display:"none"}}};return N({ourProps:o,theirProps:r,slot:{},defaultTag:Tt,name:"Hidden"})}),Ie=a.createContext(null);Ie.displayName="OpenClosedContext";var Y=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Y||{});function He(){return a.useContext(Ie)}function Ft({value:e,children:t}){return E.createElement(Ie.Provider,{value:e},t)}var Ze=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(Ze||{});function et(e,t){let n=a.useRef([]),r=x(e);a.useEffect(()=>{let o=[...n.current];for(let[l,i]of t.entries())if(n.current[l]!==i){let u=r(t,o);return n.current=t,u}},[r,...t])}function Pt(e,t,n){let r=M(t);a.useEffect(()=>{function o(l){r.current(l)}return window.addEventListener(e,o,n),()=>window.removeEventListener(e,o,n)},[e,n])}var re=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(re||{});function Ct(){let e=a.useRef(0);return Pt("keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function me(){let e=a.useRef(!1);return A(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function pe(...e){return a.useMemo(()=>je(...e),[...e])}function Be(e,t,n,r){let o=M(n);a.useEffect(()=>{e=e??window;function l(i){o.current(i)}return e.addEventListener(t,l,r),()=>e.removeEventListener(t,l,r)},[e,t,r])}let Nt="div";var tt=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(tt||{});let ne=Object.assign(C(function(e,t){let n=a.useRef(null),r=L(n,t),{initialFocus:o,containers:l,features:i=30,...u}=e;J()||(i=1);let s=pe(n);Lt({ownerDocument:s},Boolean(i&16));let d=Rt({ownerDocument:s,container:n,initialFocus:o},Boolean(i&2));At({ownerDocument:s,container:n,containers:l,previousActiveElement:d},Boolean(i&8));let c=Ct(),h=x(b=>{let v=n.current;v&&(p=>p())(()=>{S(c.current,{[re.Forwards]:()=>{ue(v,q.First,{skipElements:[b.relatedTarget]})},[re.Backwards]:()=>{ue(v,q.Last,{skipElements:[b.relatedTarget]})}})})}),g=Me(),m=a.useRef(!1),f={ref:r,onKeyDown(b){b.key=="Tab"&&(m.current=!0,g.requestAnimationFrame(()=>{m.current=!1}))},onBlur(b){let v=new Set(l==null?void 0:l.current);v.add(n);let p=b.relatedTarget;p instanceof HTMLElement&&p.dataset.headlessuiFocusGuard!=="true"&&(nt(v,p)||(m.current?ue(n.current,S(c.current,{[re.Forwards]:()=>q.Next,[re.Backwards]:()=>q.Previous})|q.WrapAround,{relativeTo:b.target}):b.target instanceof HTMLElement&&V(b.target)))}};return E.createElement(E.Fragment,null,Boolean(i&4)&&E.createElement(Re,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:h,features:ce.Focusable}),N({ourProps:f,theirProps:u,defaultTag:Nt,name:"FocusTrap"}),Boolean(i&4)&&E.createElement(Re,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:h,features:ce.Focusable}))}),{features:tt});function Lt({ownerDocument:e},t){let n=a.useRef(null);Be(e==null?void 0:e.defaultView,"focusout",o=>{!t||n.current||(n.current=o.target)},!0),et(()=>{t||((e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&V(n.current),n.current=null)},[t]);let r=a.useRef(!1);a.useEffect(()=>(r.current=!1,()=>{r.current=!0,fe(()=>{!r.current||(V(n.current),n.current=null)})}),[])}function Rt({ownerDocument:e,container:t,initialFocus:n},r){let o=a.useRef(null),l=me();return et(()=>{if(!r)return;let i=t.current;!i||fe(()=>{if(!l.current)return;let u=e==null?void 0:e.activeElement;if(n!=null&&n.current){if((n==null?void 0:n.current)===u){o.current=u;return}}else if(i.contains(u)){o.current=u;return}n!=null&&n.current?V(n.current):ue(i,q.First)===Xe.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.current=e==null?void 0:e.activeElement})},[r]),o}function At({ownerDocument:e,container:t,containers:n,previousActiveElement:r},o){let l=me();Be(e==null?void 0:e.defaultView,"focus",i=>{if(!o||!l.current)return;let u=new Set(n==null?void 0:n.current);u.add(t);let s=r.current;if(!s)return;let d=i.target;d&&d instanceof HTMLElement?nt(u,d)?(r.current=d,V(d)):(i.preventDefault(),i.stopPropagation(),V(s)):V(r.current)},!0)}function nt(e,t){var n;for(let r of e)if((n=r.current)!=null&&n.contains(t))return!0;return!1}let K=new Set,B=new Map;function Ve(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function Ye(e){let t=B.get(e);!t||(t["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t["aria-hidden"]),e.inert=t.inert)}function Ot(e,t=!0){A(()=>{if(!t||!e.current)return;let n=e.current,r=je(n);if(r){K.add(n);for(let o of B.keys())o.contains(n)&&(Ye(o),B.delete(o));return r.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement){for(let l of K)if(o.contains(l))return;K.size===1&&(B.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Ve(o))}}),()=>{if(K.delete(n),K.size>0)r.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement&&!B.has(o)){for(let l of K)if(o.contains(l))return;B.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Ve(o)}});else for(let o of B.keys())Ye(o),B.delete(o)}}},[t])}let rt=a.createContext(!1);function Dt(){return a.useContext(rt)}function Ae(e){return E.createElement(rt.Provider,{value:e.force},e.children)}function kt(e){let t=Dt(),n=a.useContext(ot),r=pe(e),[o,l]=a.useState(()=>{if(!t&&n!==null||R.isServer)return null;let i=r==null?void 0:r.getElementById("headlessui-portal-root");if(i)return i;if(r===null)return null;let u=r.createElement("div");return u.setAttribute("id","headlessui-portal-root"),r.body.appendChild(u)});return a.useEffect(()=>{o!==null&&(r!=null&&r.body.contains(o)||r==null||r.body.appendChild(o))},[o,r]),a.useEffect(()=>{t||n!==null&&l(n.current)},[n,l,t]),o}let Mt=a.Fragment,jt=C(function(e,t){let n=e,r=a.useRef(null),o=L(yt(c=>{r.current=c}),t),l=pe(r),i=kt(r),[u]=a.useState(()=>{var c;return R.isServer?null:(c=l==null?void 0:l.createElement("div"))!=null?c:null}),s=J(),d=a.useRef(!1);return A(()=>{if(d.current=!1,!(!i||!u))return i.contains(u)||(u.setAttribute("data-headlessui-portal",""),i.appendChild(u)),()=>{d.current=!0,fe(()=>{var c;!d.current||!i||!u||(u instanceof Node&&i.contains(u)&&i.removeChild(u),i.childNodes.length<=0&&((c=i.parentElement)==null||c.removeChild(i)))})}},[i,u]),s?!i||!u?null:ct.createPortal(N({ourProps:{ref:o},theirProps:n,defaultTag:Mt,name:"Portal"}),u):null}),It=a.Fragment,ot=a.createContext(null),Ht=C(function(e,t){let{target:n,...r}=e,o={ref:L(t)};return E.createElement(ot.Provider,{value:n},N({ourProps:o,theirProps:r,defaultTag:It,name:"Popover.Group"}))}),Oe=Object.assign(jt,{Group:Ht}),it=a.createContext(null);function lt(){let e=a.useContext(it);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,lt),t}return e}function Bt(){let[e,t]=a.useState([]);return[e.length>0?e.join(" "):void 0,a.useMemo(()=>function(n){let r=x(l=>(t(i=>[...i,l]),()=>t(i=>{let u=i.slice(),s=u.indexOf(l);return s!==-1&&u.splice(s,1),u}))),o=a.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props}),[r,n.slot,n.name,n.props]);return E.createElement(it.Provider,{value:o},n.children)},[t])]}let Ut="p",_t=C(function(e,t){let n=Q(),{id:r=`headlessui-description-${n}`,...o}=e,l=lt(),i=L(t);A(()=>l.register(r),[r,l.register]);let u={ref:i,...l.props,id:r};return N({ourProps:u,theirProps:o,slot:l.slot||{},defaultTag:Ut,name:l.name||"Description"})}),Ue=a.createContext(()=>{});Ue.displayName="StackContext";var De=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(De||{});function qt(){return a.useContext(Ue)}function Wt({children:e,onUpdate:t,type:n,element:r,enabled:o}){let l=qt(),i=x((...u)=>{t==null||t(...u),l(...u)});return A(()=>{let u=o===void 0||o===!0;return u&&i(0,n,r),()=>{u&&i(1,n,r)}},[i,n,r,o]),E.createElement(Ue.Provider,{value:i},e)}function Vt(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const Yt=typeof Object.is=="function"?Object.is:Vt,{useState:Gt,useEffect:Xt,useLayoutEffect:zt,useDebugValue:Kt}=Ne;function Jt(e,t,n){const r=t(),[{inst:o},l]=Gt({inst:{value:r,getSnapshot:t}});return zt(()=>{o.value=r,o.getSnapshot=t,xe(o)&&l({inst:o})},[e,r,t]),Xt(()=>(xe(o)&&l({inst:o}),e(()=>{xe(o)&&l({inst:o})})),[e]),Kt(r),r}function xe(e){const t=e.getSnapshot,n=e.value;try{const r=t();return!Yt(n,r)}catch{return!0}}function Qt(e,t,n){return t()}const Zt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",en=!Zt,tn=en?Qt:Jt,nn="useSyncExternalStore"in Ne?(e=>e.useSyncExternalStore)(Ne):tn;function rn(e){return nn(e.subscribe,e.getSnapshot,e.getSnapshot)}function on(e,t){let n=e(),r=new Set;return{getSnapshot(){return n},subscribe(o){return r.add(o),()=>r.delete(o)},dispatch(o,...l){let i=t[o].call(n,...l);i&&(n=i,r.forEach(u=>u()))}}}function ln(){let e;return{before({doc:t}){var n;let r=t.documentElement;e=((n=t.defaultView)!=null?n:window).innerWidth-r.clientWidth},after({doc:t,d:n}){let r=t.documentElement,o=r.clientWidth-r.offsetWidth,l=e-o;n.style(r,"paddingRight",`${l}px`)}}}function an(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function un(){if(!an())return{};let e;return{before(){e=window.pageYOffset},after({doc:t,d:n,meta:r}){function o(i){return r.containers.flatMap(u=>u()).some(u=>u.contains(i))}n.style(t.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let l=null;n.addEventListener(t,"click",i=>{if(i.target instanceof HTMLElement)try{let u=i.target.closest("a");if(!u)return;let{hash:s}=new URL(u.href),d=t.querySelector(s);d&&!o(d)&&(l=d)}catch{}},!0),n.addEventListener(t,"touchmove",i=>{i.target instanceof HTMLElement&&!o(i.target)&&i.preventDefault()},{passive:!1}),n.add(()=>{window.scrollTo(0,window.pageYOffset+e),l&&l.isConnected&&(l.scrollIntoView({block:"nearest"}),l=null)})}}}function sn(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function cn(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let W=on(()=>new Map,{PUSH(e,t){var n;let r=(n=this.get(e))!=null?n:{doc:e,count:0,d:oe(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:cn(n)},o=[un(),ln(),sn()];o.forEach(({before:l})=>l==null?void 0:l(r)),o.forEach(({after:l})=>l==null?void 0:l(r))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});W.subscribe(()=>{let e=W.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let r=t.get(n.doc)==="hidden",o=n.count!==0;(o&&!r||!o&&r)&&W.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),n.count===0&&W.dispatch("TEARDOWN",n)}});function dn(e,t,n){let r=rn(W),o=e?r.get(e):void 0,l=o?o.count>0:!1;return A(()=>{if(!(!e||!t))return W.dispatch("PUSH",e,n),()=>W.dispatch("POP",e,n)},[t,e]),l}var fn=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(fn||{}),mn=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(mn||{});let pn={[0](e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},de=a.createContext(null);de.displayName="DialogContext";function ie(e){let t=a.useContext(de);if(t===null){let n=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,ie),n}return t}function hn(e,t,n=()=>[document.body]){dn(e,t,r=>{var o;return{containers:[...(o=r.containers)!=null?o:[],n]}})}function vn(e,t){return S(t.type,pn,e,t)}let gn="div",bn=se.RenderStrategy|se.Static,En=C(function(e,t){let n=Q(),{id:r=`headlessui-dialog-${n}`,open:o,onClose:l,initialFocus:i,__demoMode:u=!1,...s}=e,[d,c]=a.useState(0),h=He();o===void 0&&h!==null&&(o=S(h,{[Y.Open]:!0,[Y.Closed]:!1}));let g=a.useRef(new Set),m=a.useRef(null),f=L(m,t),b=a.useRef(null),v=pe(m),p=e.hasOwnProperty("open")||h!==null,T=e.hasOwnProperty("onClose");if(!p&&!T)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!p)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!T)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof o!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${o}`);if(typeof l!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${l}`);let P=o?0:1,[F,Z]=a.useReducer(vn,{titleId:null,descriptionId:null,panelRef:a.createRef()}),O=x(()=>l(!1)),U=x(y=>Z({type:0,id:y})),j=J()?u?!1:P===0:!1,I=d>1,ee=a.useContext(de)!==null,G=I?"parent":"leaf";Ot(m,I?j:!1);let X=x(()=>{var y,H;return[...Array.from((y=v==null?void 0:v.querySelectorAll("html > *, body > *, [data-headlessui-portal]"))!=null?y:[]).filter(w=>!(w===document.body||w===document.head||!(w instanceof HTMLElement)||w.contains(b.current)||F.panelRef.current&&w.contains(F.panelRef.current))),(H=F.panelRef.current)!=null?H:m.current]});wt(()=>X(),O,j&&!I),Be(v==null?void 0:v.defaultView,"keydown",y=>{y.defaultPrevented||y.key===Ze.Escape&&P===0&&(I||(y.preventDefault(),y.stopPropagation(),O()))}),hn(v,P===0&&!ee,X),a.useEffect(()=>{if(P!==0||!m.current)return;let y=new IntersectionObserver(H=>{for(let w of H)w.boundingClientRect.x===0&&w.boundingClientRect.y===0&&w.boundingClientRect.width===0&&w.boundingClientRect.height===0&&O()});return y.observe(m.current),()=>y.disconnect()},[P,m,O]);let[te,be]=Bt(),Ee=a.useMemo(()=>[{dialogState:P,close:O,setTitleId:U},F],[P,F,O,U]),le=a.useMemo(()=>({open:P===0}),[P]),z={ref:f,id:r,role:"dialog","aria-modal":P===0?!0:void 0,"aria-labelledby":F.titleId,"aria-describedby":te};return E.createElement(Wt,{type:"Dialog",enabled:P===0,element:m,onUpdate:x((y,H,w)=>{H==="Dialog"&&S(y,{[De.Add](){g.current.add(w),c(we=>we+1)},[De.Remove](){g.current.add(w),c(we=>we-1)}})})},E.createElement(Ae,{force:!0},E.createElement(Oe,null,E.createElement(de.Provider,{value:Ee},E.createElement(Oe.Group,{target:m},E.createElement(Ae,{force:!1},E.createElement(be,{slot:le,name:"Dialog.Description"},E.createElement(ne,{initialFocus:i,containers:g,features:j?S(G,{parent:ne.features.RestoreFocus,leaf:ne.features.All&~ne.features.FocusLock}):ne.features.None},N({ourProps:z,theirProps:s,slot:le,defaultTag:gn,features:bn,visible:P===0,name:"Dialog"})))))))),E.createElement(Re,{features:ce.Hidden,ref:b}))}),wn="div",yn=C(function(e,t){let n=Q(),{id:r=`headlessui-dialog-overlay-${n}`,...o}=e,[{dialogState:l,close:i}]=ie("Dialog.Overlay"),u=L(t),s=x(c=>{if(c.target===c.currentTarget){if(St(c.currentTarget))return c.preventDefault();c.preventDefault(),c.stopPropagation(),i()}}),d=a.useMemo(()=>({open:l===0}),[l]);return N({ourProps:{ref:u,id:r,"aria-hidden":!0,onClick:s},theirProps:o,slot:d,defaultTag:wn,name:"Dialog.Overlay"})}),$n="div",Sn=C(function(e,t){let n=Q(),{id:r=`headlessui-dialog-backdrop-${n}`,...o}=e,[{dialogState:l},i]=ie("Dialog.Backdrop"),u=L(t);a.useEffect(()=>{if(i.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[i.panelRef]);let s=a.useMemo(()=>({open:l===0}),[l]);return E.createElement(Ae,{force:!0},E.createElement(Oe,null,N({ourProps:{ref:u,id:r,"aria-hidden":!0},theirProps:o,slot:s,defaultTag:$n,name:"Dialog.Backdrop"})))}),xn="div",Tn=C(function(e,t){let n=Q(),{id:r=`headlessui-dialog-panel-${n}`,...o}=e,[{dialogState:l},i]=ie("Dialog.Panel"),u=L(t,i.panelRef),s=a.useMemo(()=>({open:l===0}),[l]),d=x(c=>{c.stopPropagation()});return N({ourProps:{ref:u,id:r,onClick:d},theirProps:o,slot:s,defaultTag:xn,name:"Dialog.Panel"})}),Fn="h2",Pn=C(function(e,t){let n=Q(),{id:r=`headlessui-dialog-title-${n}`,...o}=e,[{dialogState:l,setTitleId:i}]=ie("Dialog.Title"),u=L(t);a.useEffect(()=>(i(r),()=>i(null)),[r,i]);let s=a.useMemo(()=>({open:l===0}),[l]);return N({ourProps:{ref:u,id:r},theirProps:o,slot:s,defaultTag:Fn,name:"Dialog.Title"})}),Te=Object.assign(En,{Backdrop:Sn,Panel:Tn,Overlay:yn,Title:Pn,Description:_t});function Cn(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function Fe(e,...t){e&&t.length>0&&e.classList.add(...t)}function Pe(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Nn(e,t){let n=oe();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:o}=getComputedStyle(e),[l,i]=[r,o].map(u=>{let[s=0]=u.split(",").filter(Boolean).map(d=>d.includes("ms")?parseFloat(d):parseFloat(d)*1e3).sort((d,c)=>c-d);return s});if(l+i!==0){let u=n.addEventListener(e,"transitionend",s=>{s.target===s.currentTarget&&(t(),u())})}else t();return n.add(()=>t()),n.dispose}function Ln(e,t,n,r){let o=n?"enter":"leave",l=oe(),i=r!==void 0?Cn(r):()=>{};o==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let u=S(o,{enter:()=>t.enter,leave:()=>t.leave}),s=S(o,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),d=S(o,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return Pe(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),Fe(e,...u,...d),l.nextFrame(()=>{Pe(e,...d),Fe(e,...s),Nn(e,()=>(Pe(e,...u),Fe(e,...t.entered),i()))}),l.dispose}function Rn({container:e,direction:t,classes:n,onStart:r,onStop:o}){let l=me(),i=Me(),u=M(t);A(()=>{let s=oe();i.add(s.dispose);let d=e.current;if(d&&u.current!=="idle"&&l.current)return s.dispose(),r.current(u.current),s.add(Ln(d,n.current,u.current==="enter",()=>{s.dispose(),o.current(u.current)})),s.dispose},[t])}function _(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let he=a.createContext(null);he.displayName="TransitionContext";var An=(e=>(e.Visible="visible",e.Hidden="hidden",e))(An||{});function On(){let e=a.useContext(he);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Dn(){let e=a.useContext(ve);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let ve=a.createContext(null);ve.displayName="NestingContext";function ge(e){return"children"in e?ge(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function at(e,t){let n=M(e),r=a.useRef([]),o=me(),l=Me(),i=x((m,f=k.Hidden)=>{let b=r.current.findIndex(({el:v})=>v===m);b!==-1&&(S(f,{[k.Unmount](){r.current.splice(b,1)},[k.Hidden](){r.current[b].state="hidden"}}),l.microTask(()=>{var v;!ge(r)&&o.current&&((v=n.current)==null||v.call(n))}))}),u=x(m=>{let f=r.current.find(({el:b})=>b===m);return f?f.state!=="visible"&&(f.state="visible"):r.current.push({el:m,state:"visible"}),()=>i(m,k.Unmount)}),s=a.useRef([]),d=a.useRef(Promise.resolve()),c=a.useRef({enter:[],leave:[],idle:[]}),h=x((m,f,b)=>{s.current.splice(0),t&&(t.chains.current[f]=t.chains.current[f].filter(([v])=>v!==m)),t==null||t.chains.current[f].push([m,new Promise(v=>{s.current.push(v)})]),t==null||t.chains.current[f].push([m,new Promise(v=>{Promise.all(c.current[f].map(([p,T])=>T)).then(()=>v())})]),f==="enter"?d.current=d.current.then(()=>t==null?void 0:t.wait.current).then(()=>b(f)):b(f)}),g=x((m,f,b)=>{Promise.all(c.current[f].splice(0).map(([v,p])=>p)).then(()=>{var v;(v=s.current.shift())==null||v()}).then(()=>b(f))});return a.useMemo(()=>({children:r,register:u,unregister:i,onStart:h,onStop:g,wait:d,chains:c}),[u,i,r,h,g,c,d])}function kn(){}let Mn=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function Ge(e){var t;let n={};for(let r of Mn)n[r]=(t=e[r])!=null?t:kn;return n}function jn(e){let t=a.useRef(Ge(e));return a.useEffect(()=>{t.current=Ge(e)},[e]),t}let In="div",ut=se.RenderStrategy,st=C(function(e,t){let{beforeEnter:n,afterEnter:r,beforeLeave:o,afterLeave:l,enter:i,enterFrom:u,enterTo:s,entered:d,leave:c,leaveFrom:h,leaveTo:g,...m}=e,f=a.useRef(null),b=L(f,t),v=m.unmount?k.Unmount:k.Hidden,{show:p,appear:T,initial:P}=On(),[F,Z]=a.useState(p?"visible":"hidden"),O=Dn(),{register:U,unregister:j}=O,I=a.useRef(null);a.useEffect(()=>U(f),[U,f]),a.useEffect(()=>{if(v===k.Hidden&&f.current){if(p&&F!=="visible"){Z("visible");return}return S(F,{hidden:()=>j(f),visible:()=>U(f)})}},[F,f,U,j,p,v]);let ee=M({enter:_(i),enterFrom:_(u),enterTo:_(s),entered:_(d),leave:_(c),leaveFrom:_(h),leaveTo:_(g)}),G=jn({beforeEnter:n,afterEnter:r,beforeLeave:o,afterLeave:l}),X=J();a.useEffect(()=>{if(X&&F==="visible"&&f.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[f,F,X]);let te=P&&!T,be=(()=>!X||te||I.current===p?"idle":p?"enter":"leave")(),Ee=x(w=>S(w,{enter:()=>G.current.beforeEnter(),leave:()=>G.current.beforeLeave(),idle:()=>{}})),le=x(w=>S(w,{enter:()=>G.current.afterEnter(),leave:()=>G.current.afterLeave(),idle:()=>{}})),z=at(()=>{Z("hidden"),j(f)},O);Rn({container:f,classes:ee,direction:be,onStart:M(w=>{z.onStart(f,w,Ee)}),onStop:M(w=>{z.onStop(f,w,le),w==="leave"&&!ge(z)&&(Z("hidden"),j(f))})}),a.useEffect(()=>{!te||(v===k.Hidden?I.current=null:I.current=p)},[p,te,F]);let y=m,H={ref:b};return T&&p&&R.isServer&&(y={...y,className:Je(m.className,...ee.current.enter,...ee.current.enterFrom)}),E.createElement(ve.Provider,{value:z},E.createElement(Ft,{value:S(F,{visible:Y.Open,hidden:Y.Closed})},N({ourProps:H,theirProps:y,defaultTag:In,features:ut,visible:F==="visible",name:"Transition.Child"})))}),ke=C(function(e,t){let{show:n,appear:r=!1,unmount:o,...l}=e,i=a.useRef(null),u=L(i,t);J();let s=He();if(n===void 0&&s!==null&&(n=S(s,{[Y.Open]:!0,[Y.Closed]:!1})),![!0,!1].includes(n))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[d,c]=a.useState(n?"visible":"hidden"),h=at(()=>{c("hidden")}),[g,m]=a.useState(!0),f=a.useRef([n]);A(()=>{g!==!1&&f.current[f.current.length-1]!==n&&(f.current.push(n),m(!1))},[f,n]);let b=a.useMemo(()=>({show:n,appear:r,initial:g}),[n,r,g]);a.useEffect(()=>{if(n)c("visible");else if(!ge(h))c("hidden");else{let p=i.current;if(!p)return;let T=p.getBoundingClientRect();T.x===0&&T.y===0&&T.width===0&&T.height===0&&c("hidden")}},[n,h]);let v={unmount:o};return E.createElement(ve.Provider,{value:h},E.createElement(he.Provider,{value:b},N({ourProps:{...v,as:a.Fragment,children:E.createElement(st,{ref:u,...v,...l})},theirProps:{},defaultTag:a.Fragment,features:ut,visible:d==="visible",name:"Transition"})))}),Hn=C(function(e,t){let n=a.useContext(he)!==null,r=He()!==null;return E.createElement(E.Fragment,null,!n&&r?E.createElement(ke,{ref:t,...e}):E.createElement(st,{ref:t,...e}))}),Ce=Object.assign(ke,{Child:Hn,Root:ke});function _n({isOpen:e,closeModal:t,setCommands:n,isEdit:r,data:o}){const[l,i]=a.useState(""),[u,s]=a.useState(""),[d,c]=a.useState(""),[h,g]=a.useState("");a.useEffect(()=>{r&&(i(o.id),s(o.command),c(o.description),g(o.message))},[r,o]);const m=async p=>{p.preventDefault(),console.log("submit form"),r?b():f()},f=async()=>{await _e.post("/api/v1/command",{command:u,description:d,message:h}).then(p=>{console.log(p);const T=p.data.data;n(T),t(),v()}).catch(p=>{console.log(p)})},b=async()=>{await _e.put(`/api/v1/command/${l}`,{command:u,description:d,message:h}).then(p=>{console.log(p);const T=p.data.data;n(T),t(),v()}).catch(p=>{console.log(p)})},v=()=>{s(""),c(""),g("")};return $(Ce,{appear:!0,show:e,as:a.Fragment,children:D(Te,{as:"div",className:"relative z-10",onClose:t,children:[$(Ce.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:$("div",{className:"fixed inset-0 bg-black bg-opacity-50"})}),$("div",{className:"fixed inset-0 overflow-y-auto",children:$("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:$(Ce.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:D(Te.Panel,{className:"w-full max-w-xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all",children:[D(Te.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:[r?"Edit":"Add"," Command"]}),$("div",{className:"mt-3",children:$("form",{action:"#",method:"POST",onSubmit:m,children:D("div",{className:"space-y-6 ",children:[D("div",{children:[$("label",{htmlFor:"form-command",className:"block text-sm font-medium text-gray-500",children:"Command"}),D("div",{className:"mt-1 flex shadow-sm",children:[$("span",{className:"inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500",children:"/"}),$("input",{type:"text",name:"command",value:u,onChange:p=>s(p.target.value),id:"form-command",className:"block w-full flex-1 rounded-none border-gray-300 focus:border-purple-500 focus:ring-0  sm:text-sm",placeholder:"command",required:!0})]})]}),D("div",{children:[$("label",{htmlFor:"form-description",className:"block text-sm font-medium text-gray-500",children:"Description"}),$("input",{type:"text",name:"description",value:d,onChange:p=>c(p.target.value),id:"form-description",className:"block w-full flex-1 rounded-none border-gray-300 focus:border-purple-500 focus:ring-0  sm:text-sm",placeholder:"command description",required:!0})]}),D("div",{children:[$("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-500",children:"Message"}),$("div",{className:"mt-1",children:$("textarea",{id:"message",name:"message",value:h,onChange:p=>g(p.target.value),rows:"3",className:"mt-1 px-2 py-1 block w-full border-gray-300 shadow-sm focus:border-purple-500 focus:ring-0 sm:text-sm",placeholder:"lorem ipsum dolor sit amet",required:!0})})]}),D("div",{className:"flex justify-end",children:[$("button",{type:"button",className:"inline-flex justify-center border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2",onClick:t,children:"Cancel"}),$("button",{type:"submit",className:"inline-flex justify-center border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",children:"Save"})]})]})})})]})})})})]})})}export{_n as default};
