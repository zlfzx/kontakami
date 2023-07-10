import{r as s,j as t,a as o,_ as w,b as h}from"./index-6f41d611.js";const _=s.lazy(()=>w(()=>import("./Modal-807d0eb6.js"),["assets/Modal-807d0eb6.js","assets/index-6f41d611.js","assets/index-1dfb9266.css"]));function S({isOpen:x,closeModal:n,setCommands:b,isEdit:r,data:a}){const[v,g]=s.useState(""),[l,m]=s.useState(""),[d,i]=s.useState(""),[u,c]=s.useState("");s.useEffect(()=>{g(""),m(""),i(""),c(""),r&&(g(a.id),m(a.command),i(a.description),c(a.message))},[r,a]);const y=async e=>{e.preventDefault(),console.log("submit form"),r?C():N()},N=async()=>{await h.post("/api/v1/command",{command:l,description:d,message:u}).then(e=>{console.log(e);const f=e.data.data;b(f),n(),p()}).catch(e=>{console.log(e)})},C=async()=>{await h.put(`/api/v1/command/${v}`,{command:l,description:d,message:u}).then(e=>{console.log(e);const f=e.data.data;b(f),n(),p()}).catch(e=>{console.log(e)})},p=()=>{m(""),i(""),c("")};return t(_,{title:r?"Edit Command":"Add Command",isOpen:x,onClose:n,children:t("div",{className:"mt-3",children:t("form",{action:"#",method:"POST",onSubmit:y,children:o("div",{className:"space-y-6 ",children:[o("div",{children:[t("label",{htmlFor:"form-command",className:"block text-sm font-medium text-gray-500",children:"Command"}),o("div",{className:"mt-1 flex shadow-sm",children:[t("span",{className:"inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500",children:"/"}),t("input",{type:"text",name:"command",value:l,onChange:e=>m(e.target.value),id:"form-command",className:"block w-full flex-1 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0  sm:text-sm",placeholder:"command",required:!0})]})]}),o("div",{children:[t("label",{htmlFor:"form-description",className:"block text-sm font-medium text-gray-500",children:"Description"}),t("input",{type:"text",name:"description",value:d,onChange:e=>i(e.target.value),id:"form-description",className:"block w-full flex-1 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0  sm:text-sm",placeholder:"command description",required:!0})]}),o("div",{children:[t("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-500",children:"Message"}),t("div",{className:"mt-1",children:t("textarea",{id:"message",name:"message",value:u,onChange:e=>c(e.target.value),rows:"3",className:"mt-1 px-2 py-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-0 sm:text-sm",placeholder:"lorem ipsum dolor sit amet",required:!0})})]}),o("div",{className:"flex justify-end",children:[t("button",{type:"button",className:"inline-flex justify-center border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2",onClick:n,children:"Cancel"}),t("button",{type:"submit",className:"inline-flex justify-center border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",children:"Save"})]})]})})})})}export{S as default};
