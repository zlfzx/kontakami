import{a as o,j as e,u as S,r as u,F as B,b as k}from"./index-b2669c70.js";import{u as F}from"./user-ca0d8e03.js";let C;C="/storage/";function H(c){const t=c.message,v=t.user_id?"items-start":"items-end",d=v=="items-start"?"bg-purple-100":"bg-purple-300",l=t.date?new Date(t.date*1e3):new Date;let f=l.getDate()<10?"0"+l.getDate():l.getDate(),p=l.getMonth()+1<10?"0"+(l.getMonth()+1):l.getMonth()+1,r=l.getFullYear(),h=f+"/"+p+"/"+r,y=l.getHours()<10?"0"+l.getHours():l.getHours(),b=l.getMinutes()<10?"0"+l.getMinutes():l.getMinutes();h+=" "+y+":"+b;const i=c.replyTo,g=m=>{const x=m.file;if(x&&x.type=="photo")return e("img",{src:C+"files/photo/"+x.file_name,loading:"lazy",className:"w-full h-full"})};return o("div",{className:"w-full py-2 flex flex-col justify-start "+v,onClick:m=>c.onClickBubble(m,t),children:[o("div",{className:d+" shadow-md min-w-min max-w-lg whitespace-pre-wrap",children:[!!i&&o("div",{className:"bg-purple-200 shadow-md text-gray-600 border-l-2 border-purple-400"+(i.file?" mx-2 mt-2":" mx-1 mt-1"),children:[g(i),!!i.text&&e("div",{className:"px-2 py-1",children:i.text})]}),g(t),!!t.text&&e("div",{className:"px-2 py-1 mx-1 text-gray-800",children:t.text})]}),e("span",{className:"text-xs py-1 text-gray-400",children:h})]})}let M;M="/storage/profiles/";let j;j="/storage/";function E(){const{chatId:c}=S(),[t,v]=u.useState({}),[d,l]=u.useState([]),[f,p]=u.useState(""),[r,h]=u.useState({}),y=async()=>{const a=(await k.get(`/api/v1/chat/${c}`)).data.data;v(a),l(a==null?void 0:a.messages)},b=t!=null&&t.profile_photo?M+t.profile_photo:F,i=u.useRef(null),g=()=>{i.current.scrollTop=i.current.scrollHeight},m=async s=>{if(s.preventDefault(),f=="")return;let a={text:f};r.id&&(a.message_id=r.id),await k.post(`/api/v1/chat/${c}`,a).then(n=>{console.log(n);const N=n.data.data;l(D=>[...D,N]),p(""),h({})}).catch(n=>{console.log(n)})},x=s=>{s.keyCode==13&&s.shiftKey==!1&&(s.preventDefault(),m(s))},_=(s,a)=>{s.detail==2&&(console.log("double click",a),h(a))},T=()=>{h({})};return u.useEffect(()=>{y(),g(),p("");const s=new WebSocket(`ws://localhost:8080/ws/chat/${c}`);return s.onopen=a=>{console.log("connected chat user")},s.onmessage=a=>{const n=JSON.parse(a.data);window.location.pathname.includes(`/chat/${n.id}`)&&l(N=>[...N,n.message])},()=>{console.log("cleanup chat user"),s.close()}},[c]),u.useEffect(()=>{g()},[d]),o(B,{children:[o("div",{className:"w-full px-4 py-5 border-b sm:px-6 flex flex-row",children:[e("div",{className:"flex flex-col items-center justify-center w-10 h-10 mr-4",children:e("a",{href:"#",className:"relative block",children:e("img",{alt:"profil",src:b,className:"mx-auto object-cover rounded-full h-10 w-10 "})})}),o("div",{className:"flex-1 pl-1 md:mr-16",children:[e("div",{className:"font-medium dark:text-white",children:(t==null?void 0:t.first_name)+" "+(t==null?void 0:t.last_name)}),e("div",{className:"text-sm text-gray-600 dark:text-gray-200",children:t==null?void 0:t.username})]})]}),e("div",{className:"chat h-full px-4 pb-3 overflow-y-auto",ref:i,children:e("div",{className:"flex flex-col justify-start items-center w-full",children:d==null?void 0:d.map((s,a)=>{let n=null;return s.message_id&&(n=d.find(w=>w.id==s.message_id)),e(H,{message:s,replyTo:n,onClickBubble:w=>_(w,s)},a)})})}),o("div",{className:"w-full bg-gray-100 px-4 py-5",children:[!!r.id&&o("div",{className:"text-gray-500 flex items-center justify-between mb-5",children:[e("div",{className:"flex items-center",children:o("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-corner-up-left",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4"})]})}),o("div",{className:"w-full px-4 text-left flex",children:[!!r.file&&r.file.type=="photo"&&e("div",{className:"mr-3",children:e("img",{src:j+"files/photo/"+r.file.file_name,alt:"",className:"w-10",loading:"lazy"})}),e("div",{children:r.text})]}),e("div",{className:"flex items-center",children:e("button",{onClick:T,children:o("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-x",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M18 6l-12 12"}),e("path",{d:"M6 6l12 12"})]})})})]}),o("form",{className:"bg-white shadow rounded flex",onSubmit:m,children:[e("div",{className:"flex-1",children:e("textarea",{name:"",rows:"1",className:"w-full block outline-none py-3 px-4 bg-transparent focus:border-purple-500 resize-none",placeholder:"Type a message...",value:f,onChange:s=>p(s.target.value),onKeyDown:x})}),e("div",{className:"flex-2 flex justify-center",children:e("button",{type:"submit",className:"w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-0 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center shadow focus:outline-none",children:"Send"})})]})]})]})}export{E as default};