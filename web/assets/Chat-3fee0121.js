import{j as a,N as u,a as r,r as i,C as h,O as p,b as g}from"./index-c059fe49.js";import{u as x}from"./user-ca0d8e03.js";import{C as c,a as C,b as N,c as v,S as y}from"./card-911daa80.js";import"./index-e27f2a65.js";import"./index-7e7c04ab.js";import"./utils-587908ec.js";let m;m="/storage/profiles/";function _({chat:e}){const l=e.first_name+" "+e.last_name;let n="";if(e.last_sent){const s=new Date(e.last_sent*1e3);n=(s.getHours()<10?"0"+s.getHours():s.getHours())+":"+(s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes())}const o=()=>{e.unread_messages&&(e.unread_messages=0)};return a(u,{to:`${e.id}`,className:"flex flex-row border-b",onClick:o,children:r("div",{className:"flex items-center flex-1 p-4 cursor-pointer select-none hover:bg-gray-100",children:[a("div",{className:"flex flex-col items-center justify-center w-10 h-10 mr-4",children:a("span",{className:"relative block",children:a("img",{alt:"profil",src:e.profile_photo?m+e.profile_photo:x,className:"mx-auto object-cover rounded-full h-10 w-10 "})})}),r("div",{className:"flex-1 pl-1 mr-16",children:[a("div",{className:"font-medium dark:text-white",children:l}),a("div",{className:"text-sm text-gray-600 dark:text-gray-200",children:e.username})]}),r("div",{className:"text-xs text-gray-600 dark:text-gray-200",children:[a("div",{children:n}),!!e.unread_messages&&e.unread_messages>0&&a("div",{className:"mt-1 text-right",children:a("span",{className:"w-4 h-2 p-1 text-xs text-gray-500 bg-gray-200 rounded",children:e.unread_messages})})]})]})})}function T(){var o;const[e,l]=i.useContext(h),n=async()=>{const t=(await g.get("/api/v1/chat")).data.data;l({type:"SET_CHATS",payload:t});let d=0;t.forEach(f=>{d+=f.unread_messages}),l({type:"SET_UNREAD",payload:d})};return i.useEffect(()=>{n(),console.log("getChats")},[]),i.useEffect(()=>{if(e.newChat!=null){let s=!1;for(let t=0;t<e.chats.length;t++)if(e.chats[t].id==e.newChat.id){s=!0;break}s||l({type:"SET_CHATS",payload:[e.newChat,...e.chats]})}},[e.newChat]),r("div",{className:"grid grid-cols-3 gap-4 w-full h-full",children:[r(c,{className:"col-span-1 rounded-none h-full flex flex-col overflow-y-hidden",children:[r(C,{className:"border-b",children:[a(N,{children:"Conversation"}),a(v,{children:"List conversation"})]}),a(y,{className:"h-full",children:(o=e.chats)==null?void 0:o.map(s=>a(_,{chat:s},s.id))})]}),a(c,{className:"col-span-2 rounded-none h-full flex flex-col overflow-y-hidden",children:a(p,{})})]})}export{T as default};
