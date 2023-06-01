import{r as i,C as N,a,j as e,F as k,b,u as E}from"./index-e8bc7082.js";import{u as M}from"./user-ca0d8e03.js";let T;T="/storage/";function j(c){const[n,h]=i.useContext(N),t=c.message,u=t.user_id?"items-start":"items-end",x=u=="items-start"?"bg-blue-100":"bg-blue-300",s=t.date?new Date(t.date*1e3):new Date;let f=s.getDate()<10?"0"+s.getDate():s.getDate(),g=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,w=s.getFullYear(),o=f+"/"+g+"/"+w,l=s.getHours()<10?"0"+s.getHours():s.getHours(),p=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes();o+=" "+l+":"+p;const d=c.replyTo,r=y=>{const v=y.file;if(v&&v.type=="photo")return e("img",{src:T+"files/photo/"+v.file_name,loading:"lazy",className:"w-full h-full select-none"})},m=()=>{h({type:"SET_REPLY_TO",payload:t})};return a("div",{className:"w-full py-2 flex flex-col justify-start "+u,onDoubleClick:m,children:[a("div",{className:x+" shadow-md min-w-min max-w-lg whitespace-pre-wrap",children:[!!d&&a("div",{className:"bg-blue-200 shadow-md text-gray-600 border-l-2 border-blue-400"+(d.file?" mx-2 mt-2":" mx-1 mt-1"),children:[r(d),!!d.text&&e("div",{className:"px-2 py-1",children:d.text})]}),r(t),!!t.text&&e("div",{className:"px-2 py-1 mx-1 text-gray-800",children:t.text})]}),e("span",{className:"text-xs py-1 text-gray-400 select-none",children:o})]})}let S;S="/storage/";function L({chatId:c}){const[n,h]=i.useContext(N),[t,u]=i.useState(""),[x,s]=i.useState(null),[f,g]=i.useState(null),w=async r=>{if(r.preventDefault(),t==""&&!x)return;const m=new FormData;m.append("text",t),n.replyTo&&(data.message_id=n.replyTo.id,m.append("message_id",n.replyTo.id)),x&&m.append("file",x),await b.post(`/api/v1/chat/${c}`,m,{headers:{"Content-Type":"multipart/form-data"}}).then(y=>{console.log(y);const C=y.data.data;h({type:"SET_MESSAGES",payload:[...n.messages,C]}),u(""),h({type:"SET_REPLY_TO",payload:null}),s(null),g(null)}).catch(y=>{console.log(y)})},o=r=>{r.keyCode==13&&r.shiftKey==!1&&(r.preventDefault(),w(r))},l=()=>{h({type:"SET_REPLY_TO",payload:null})};i.useEffect(()=>{u(""),h({type:"SET_REPLY_TO",payload:null})},[c]);const p=r=>{const m=r.target.files[0];m&&(s(m),g(URL.createObjectURL(m)))},d=()=>{s(null),g(null)};return a(k,{children:[!!n.replyTo&&a("div",{className:"text-gray-500 flex items-center justify-between mb-5",children:[e("div",{className:"flex items-center",children:a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-corner-up-left",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4"})]})}),a("div",{className:"w-full px-4 text-left flex",children:[!!n.replyTo.file&&n.replyTo.file.type=="photo"&&e("div",{className:"mr-3",children:e("img",{src:S+"files/photo/"+n.replyTo.file.file_name,alt:"",className:"w-10",loading:"lazy"})}),e("div",{children:n.replyTo.text})]}),e("div",{className:"flex items-center",children:e("button",{onClick:l,children:a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-x",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M18 6l-12 12"}),e("path",{d:"M6 6l12 12"})]})})})]}),!!f&&a("div",{className:"text-gray-500 flex items-center justify-between mb-3",children:[e("div",{className:"w-full",children:e("img",{src:f,alt:"",className:"w-1/3",loading:"lazy"})}),e("div",{className:"flex items-center",children:e("button",{onClick:d,children:a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-x",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M18 6l-12 12"}),e("path",{d:"M6 6l12 12"})]})})})]}),a("form",{className:"bg-white shadow flex",onSubmit:w,children:[a("div",{className:"flex-1 flex items-center",children:[e("div",{className:"pl-4 text-gray-500 cursor-pointer",children:e("div",{className:"flex w-full items-center justify-center",children:a("label",{className:"flex flex-col items-center cursor-pointer",title:"Upload Image",children:[a("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"#2c3e50",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("line",{x1:"15",y1:"8",x2:"15.01",y2:"8"}),e("rect",{x:"4",y:"4",width:"16",height:"16",rx:"3"}),e("path",{d:"M4 15l4 -4a3 5 0 0 1 3 0l5 5"}),e("path",{d:"M14 14l1 -1a3 5 0 0 1 3 0l2 2"})]}),e("input",{type:"file",onChange:p,accept:"image/*",className:"hidden"})]})})}),e("textarea",{name:"",rows:"1",className:"w-full block outline-none py-3 px-4 bg-transparent border-none  focus:ring-0 resize-none",placeholder:"Type a message...",value:t,onChange:r=>u(r.target.value),onKeyDown:o})]}),e("div",{className:"flex-2 flex justify-center",children:e("button",{type:"submit",className:"w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-0 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center shadow focus:outline-none",children:"Send"})})]})]})}let _;_="/storage/profiles/";function P(){var w;const{chatId:c}=E(),[n,h]=i.useContext(N),[t,u]=i.useState({}),x=async()=>{const l=(await b.get(`/api/v1/chat/${c}`)).data.data;u(l),h({type:"SET_MESSAGES",payload:l==null?void 0:l.messages}),l!=null&&l.unread_messages&&(l==null?void 0:l.unread_messages)>0&&b.post(`/api/v1/chat/${l.id}/read`)},s=t!=null&&t.profile_photo?_+t.profile_photo:M,f=i.useRef(null),g=()=>{f.current.scrollTop=f.current.scrollHeight};return i.useEffect(()=>{x(),g();const o=new WebSocket(`ws://localhost:8080/ws/chat/${c}`);return o.onopen=l=>{console.log("connected chat user")},o.onmessage=l=>{const p=JSON.parse(l.data);window.location.pathname.includes(`/chat/${p.id}`)&&h({type:"SET_MESSAGES",payload:[...n.messages,p.message]})},()=>{console.log("cleanup chat user"),o.close()}},[c]),i.useEffect(()=>{g()},[n.messages]),a(k,{children:[a("div",{className:"w-full px-4 py-5 border-b sm:px-6 flex flex-row",children:[e("div",{className:"flex flex-col items-center justify-center w-10 h-10 mr-4",children:e("a",{href:"#",className:"relative block",children:e("img",{alt:"profil",src:s,className:"mx-auto object-cover rounded-full h-10 w-10 "})})}),a("div",{className:"flex-1 pl-1 md:mr-16",children:[e("div",{className:"font-medium dark:text-white",children:(t==null?void 0:t.first_name)+" "+(t==null?void 0:t.last_name)}),e("div",{className:"text-sm text-gray-600 dark:text-gray-200",children:t==null?void 0:t.username})]})]}),e("div",{className:"chat h-full px-4 pb-3 overflow-y-auto",ref:f,children:e("div",{className:"flex flex-col justify-start items-center w-full",children:(w=n.messages)==null?void 0:w.map((o,l)=>{let p=null;return o.message_id&&(p=n.messages.find(d=>d.id==o.message_id)),e(j,{message:o,replyTo:p},l)})})}),e("div",{className:"w-full bg-gray-100 px-4 py-5",children:e(L,{chatId:c})})]})}export{P as default};