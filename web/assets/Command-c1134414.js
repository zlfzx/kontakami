import{r as n,a,F as g,j as e,_ as f,b as d}from"./index-b296a06f.js";const E=n.lazy(()=>f(()=>import("./AddCommand-f7f7c5be.js"),["assets/AddCommand-f7f7c5be.js","assets/index-b296a06f.js","assets/index-754e450f.css"])),S=n.lazy(()=>f(()=>import("./GreetingSet-7744d2cb.js"),["assets/GreetingSet-7744d2cb.js","assets/index-b296a06f.js","assets/index-754e450f.css"]));function z(){const[x,l]=n.useState(!1),[r,i]=n.useState([]),[c,h]=n.useState(!1),[w,y]=n.useState({}),[v,m]=n.useState(!1),N=async()=>{m(!0);const s=(await d.get("/api/v1/command")).data.data;i(s),m(!1)};n.useEffect(()=>{N()},[]);const k=async(t,o)=>{await d.put(`/api/v1/command/${t}/update-status`,{is_active:o}).then(s=>{const u=s.data.data,j=r.map(b=>b.id==u.id?u:b);i(j)}).catch(s=>{console.log(s)})},C=()=>{h(!1),l(!0)},M=t=>{y(t),h(!0),l(!0)},_=async t=>{confirm(`Do you want to delete command /${t.command}?`)&&await d.delete(`/api/v1/command/${t.id}`).then(o=>{const s=r.filter(p=>p.id!=t.id);i(s),alert("Command deleted")}).catch(o=>{console.log(o)})},L=t=>{if(c){const o=r.map(s=>s.id==t.id?t:s);i(o)}else i([...r,t])};return a(g,{children:[e("h1",{className:"text-4xl font-semibold text-gray-800 dark:text-white",children:"Command"}),e("h2",{className:"text-gray-400 text-md mb-5",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptatem ab sequi vitae, ratione labore?"}),a("button",{type:"button",onClick:C,className:"py-2 px-3 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2",children:[a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-pencil-plus",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z"}),e("path",{d:"M13.5 6.5l4 4"}),e("path",{d:"M16 18h4m-2 -2v4"})]}),"Add Command"]}),a("div",{className:"flex flex-row items-start gap-5 mt-6",children:[e("div",{className:"basis-2/3 bg-white",children:a("table",{className:"min-w-full leading-normal",children:[e("thead",{children:a("tr",{children:[e("th",{scope:"col",className:"px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200",children:"Command"}),e("th",{scope:"col",className:"px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200",children:"Message"}),e("th",{scope:"col",className:"px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200",children:"Active"}),e("th",{scope:"col",className:"px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200",children:" "})]})}),e("tbody",{children:v?e("tr",{children:e("td",{colSpan:4,className:"px-5 py-5 text-sm bg-white border-gray-200 text-gray-500 text-center italic",children:"Fetching data..."})}):r.length>0?e(g,{children:r==null?void 0:r.map(t=>a("tr",{children:[e("td",{className:"px-5 py-5 text-sm bg-white border-b border-gray-200",children:a("p",{className:"text-gray-900 whitespace-no-wrap",children:["/",t.command," ",e("br",{}),e("span",{className:"text-gray-500",children:t.description})]})}),e("td",{className:"px-5 py-5 text-sm bg-white border-b border-gray-200",children:e("p",{className:"text-gray-900 whitespace-pre-wrap",children:t.message})}),e("td",{className:"px-5 py-5 text-sm bg-white border-b border-gray-200",children:a("div",{className:"relative inline-block w-10 mr-2 align-middle select-none",children:[e("input",{type:"checkbox",name:"toggle",id:"check"+t.id,className:"checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer",checked:t.is_active?"checked":"",onChange:()=>k(t.id,!t.is_active)}),e("label",{htmlFor:"check"+t.id,className:"block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"})]})}),e("td",{className:"px-5 py-5 text-sm bg-white border-b border-gray-200",children:a("div",{className:"flex justify-center items-center",children:[e("button",{type:"button",onClick:()=>M(t),className:"flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 opacity-70 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8",children:a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-edit",width:"15",height:"15",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"}),e("path",{d:"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"}),e("path",{d:"M16 5l3 3"})]})}),e("span",{className:"w-2"}),e("button",{type:"button",onClick:()=>_(t),className:"flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8",children:a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-trash",width:"15",height:"15",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M4 7l16 0"}),e("path",{d:"M10 11l0 6"}),e("path",{d:"M14 11l0 6"}),e("path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"}),e("path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"})]})})]})})]},t.id))}):e("tr",{children:e("td",{colSpan:4,className:"px-5 py-5 text-sm bg-white border-b border-gray-200",children:e("p",{className:"text-gray-900 whitespace-no-wrap text-center",children:"No commands found"})})})})]})}),e("div",{className:"basis-1/3 bg-white",children:e(S,{})})]}),e(E,{isOpen:x,closeModal:()=>l(!1),setCommands:t=>L(t),isEdit:c,data:w})]})}export{z as default};
