import{j as t,N as d,a as r,u as f,r as o,C as h,O as m,b as x}from"./index-233e5cf9.js";let c;c="/storage/profiles/";function u({chat:e}){const i=e.first_name+" "+e.last_name;let n="";if(e.last_sent){const a=new Date(e.last_sent*1e3);n=(a.getHours()<10?"0"+a.getHours():a.getHours())+":"+(a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes())}return t(d,{to:`${e.id}`,className:"flex flex-row",children:r("div",{className:"flex items-center flex-1 p-4 cursor-pointer select-none hover:bg-gray-100",children:[t("div",{className:"flex flex-col items-center justify-center w-10 h-10 mr-4",children:t("span",{className:"relative block",children:t("img",{alt:"profil",src:e.profile_photo?c+e.profile_photo:f,className:"mx-auto object-cover rounded-full h-10 w-10 "})})}),r("div",{className:"flex-1 pl-1 mr-16",children:[t("div",{className:"font-medium dark:text-white",children:i}),t("div",{className:"text-sm text-gray-600 dark:text-gray-200",children:e.username})]}),t("div",{className:"text-xs text-gray-600 dark:text-gray-200",children:n})]})})}function p(){var a;const[e,i]=o.useContext(h),n=async()=>{const l=(await x.get("/api/v1/chat")).data;i({type:"SET_CHATS",payload:l.data})};return o.useEffect(()=>{n()},[]),o.useEffect(()=>{if(console.log("newChat",e.newChat),e.newChat!=null){let s=!1;for(let l=0;l<e.chats.length;l++)if(e.chats[l].id==e.newChat.id){s=!0;break}s||i({type:"SET_CHATS",payload:[e.newChat,...e.chats]})}},[e.newChat]),r("div",{className:"grid grid-cols-3 gap-4 w-full h-full",children:[r("div",{className:"col-span-1 bg-white shadow dark:bg-gray-800 h-full flex flex-col justify-start overflow-y-auto",children:[r("div",{className:"w-full px-4 py-5 border-b sm:px-6",children:[t("h3",{className:"text-lg font-medium leading-6 text-gray-900 dark:text-white",children:"Conversation"}),t("p",{className:"max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200",children:"List conversation"})]}),t("div",{className:"h-full overflow-y-auto",children:t("ul",{className:"flex flex-col divide-y divide",children:(a=e.chats)==null?void 0:a.map(s=>t(u,{chat:s},s.id))})})]}),t("div",{className:"col-span-2 bg-white shadow dark:bg-gray-800 h-full flex flex-col justify-between overflow-y-auto",children:t(m,{})})]})}export{p as default};
