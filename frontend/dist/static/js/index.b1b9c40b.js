(()=>{"use strict";var e={572:function(e,t,i){var n=i("59"),r=i("82"),s=i("489");let a="user_login_response";function l(){return{createUser:e=>{var t;return t=e,void localStorage.setItem(a,JSON.stringify(t))},getUser:()=>(function(){let e=localStorage.getItem(a);return null===e?null:JSON.parse(e)})(),removeUser:()=>void(localStorage.removeItem(a),window.location.reload())}}let o=async e=>{let{target:t,message:i,value:n}=e;try{let e="";if(!navigator.clipboard)throw Error("Browser don't have support for native clipboard.");if(t){let e=document.querySelector(t);if(!e||!e.textContent)throw Error("Element not found");n=e.textContent}n&&(e=n),await navigator.clipboard.writeText(e),console.log(i??"Copied!!!")}catch(e){console.log(e)}};var d=(0,s.XK)("<span> "),c=(0,s.XK)('<div class=toast><div class="alert alert-info"><span>Your token has been copied.'),u=(0,s.XK)('<div class="flex flex-col justify-center items-center"><header class="navbar bg-base-100 w-full justify-between"><div class="flex flex-row space-x-8"></div><div class=flex-none><details class=dropdown><summary class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></summary><ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 -translate-x-32 shadow"><li><button class="btn btn-neutral text-lg">Logout</button></li></ul></details></div></header><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2"><figure><img src=https://loco.rs/icon.svg width=260px alt=LocoRS></figure><div class="card-title items-center text-4xl text-primary text-center pt-4">Welcome <!> to a LocoRS Made App</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row space-x-2 items-center justify-between"><span>Your Token is:</span><div class="divider-horizontal divider-primary"></div><button class="btn btn-link"></button></div><div class="flex flex-row space-x-2 justify-center"><span>You are<!>Verified</span></div></div></div><footer class="flex flex-row justify-end">'),f=(0,s.XK)("<b> not "),h=(0,s.XK)('<div class="navbar bg-base-100"><div class="flex flex-row space-x-8"></div><div class=flex-none><button class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></button></div><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2"><figure><img src=https://loco.rs/icon.svg width=260px alt=LocoRS></figure><div class="card-title items-center text-4xl text-primary text-center pt-4">Welcome to a LocoRS Made App for You!</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row space-x-2 items-center justify-between">You must login to continue.');let v=()=>{let{getUser:e,removeUser:t}=l(),[i,a]=(0,n.gQ)(!1),v=(0,n.Py)(()=>{var t,i,n,r,s,a;let l=null===(i=e())||void 0===i?void 0:null===(t=i.token)||void 0===t?void 0:t.slice(0,10),o=(null===(r=e())||void 0===r?void 0:null===(n=r.token)||void 0===n?void 0:n.length)?null===(a=e())||void 0===a?void 0:null===(s=a.token)||void 0===s?void 0:s.slice(-10):"";return`${l}...${o}`}),w=async()=>{var t;await o({value:null===(t=e())||void 0===t?void 0:t.token,message:"Token Copied to clipboard"}),a(!0)};(0,n.GW)(()=>{let e;return!0===i()&&(e=setInterval(()=>{a(!1)},2e3)),()=>{clearInterval(e)}});let p=()=>{var a,l,o,h,p,g,x,b,m,y,k,S;return h=(o=(l=(a=u()).firstChild).firstChild).nextSibling.firstChild.firstChild.nextSibling.firstChild.firstChild,m=(b=((x=(g=(p=l.nextSibling).firstChild.nextSibling).firstChild.nextSibling).nextSibling,g.nextSibling).firstChild).firstChild.nextSibling.nextSibling,S=((k=(y=b.nextSibling.firstChild).firstChild.nextSibling).nextSibling,p.nextSibling),(0,s.$T)(o,(0,n.LM)(r.A,{href:"/",children:"Welcome"})),(0,s.Oo)(h,"click",t,!0),(0,s.$T)(g,()=>{var t;return null===(t=e())||void 0===t?void 0:t.name},x),m.$$click=w,(0,s.$T)(m,v),(0,s.$T)(y,(0,n.LM)(n.di,{get when(){var C;return(null===(C=e())||void 0===C?void 0:C.isVerified)??!1},get fallback(){return f()},get children(){return d()}}),k),(0,s.$T)(S,(0,n.LM)(n.di,{get when(){return i()},get children(){return c()}})),a},g=()=>{var e,t;return t=(e=h()).firstChild,(0,s.$T)(t,(0,n.LM)(r.A,{href:"/auth/login",children:"Login"}),null),(0,s.$T)(t,(0,n.LM)(r.A,{href:"/auth/signup",children:"Signup"}),null),e};return(0,n.LM)(n.di,{get when(){return null!==e()},get fallback(){return(0,n.LM)(g,{})},get children(){return(0,n.LM)(p,{})}})};(0,s.Qj)(["click"]);var w=i("438");let p="/api".replace(/\/+$/,""),g=new class e{set config(e){this.configuration=e}get basePath(){return null!=this.configuration.basePath?this.configuration.basePath:p}get fetchApi(){return this.configuration.fetchApi}get middleware(){return this.configuration.middleware||[]}get queryParamsStringify(){return this.configuration.queryParamsStringify||k}get username(){return this.configuration.username}get password(){return this.configuration.password}get apiKey(){let e=this.configuration.apiKey;if(e)return"function"==typeof e?e:()=>e}get accessToken(){let e=this.configuration.accessToken;if(e)return"function"==typeof e?e:async()=>e}get headers(){return this.configuration.headers}get credentials(){return this.configuration.credentials}constructor(e={}){(0,w._)(this,"configuration",void 0),this.configuration=e}};class x{withMiddleware(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let n=this.clone();return n.middleware=n.middleware.concat(...t),n}withPreMiddleware(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let n=t.map(e=>({pre:e}));return this.withMiddleware(...n)}withPostMiddleware(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let n=t.map(e=>({post:e}));return this.withMiddleware(...n)}isJsonMime(e){return!!e&&x.jsonRegex.test(e)}async request(e,t){let{url:i,init:n}=await this.createFetchParams(e,t),r=await this.fetchApi(i,n);if(r&&r.status>=200&&r.status<300)return r;throw new b(r,"Response returned an error code")}async createFetchParams(e,t){let i,n=this.configuration.basePath+e.path;void 0!==e.query&&0!==Object.keys(e.query).length&&(n+="?"+this.configuration.queryParamsStringify(e.query));let r=Object.assign({},this.configuration.headers,e.headers);Object.keys(r).forEach(e=>void 0===r[e]?delete r[e]:{});let s={method:e.method,headers:r,body:e.body,credentials:this.configuration.credentials},a={...s,...await ("function"==typeof t?t:async()=>t)({init:s,context:e})};return function(e){return"undefined"!=typeof FormData&&e instanceof FormData}(a.body)||a.body instanceof URLSearchParams||function(e){return"undefined"!=typeof Blob&&e instanceof Blob}(a.body)?i=a.body:i=this.isJsonMime(r["Content-Type"])?JSON.stringify(a.body):a.body,{url:n,init:{...a,body:i}}}clone(){let e=new this.constructor(this.configuration);return e.middleware=this.middleware.slice(),e}constructor(e=g){(0,w._)(this,"configuration",void 0),(0,w._)(this,"middleware",void 0),(0,w._)(this,"fetchApi",void 0),this.configuration=e,this.fetchApi=async(e,t)=>{let i,n={url:e,init:t};for(let e of this.middleware)e.pre&&(n=await e.pre({fetch:this.fetchApi,...n})||n);try{i=await (this.configuration.fetchApi||fetch)(n.url,n.init)}catch(e){for(let t of this.middleware)t.onError&&(i=await t.onError({fetch:this.fetchApi,url:n.url,init:n.init,error:e,response:i?i.clone():void 0})||i);if(void 0===i){if(e instanceof Error)throw new m(e,"The request failed and the interceptors did not return an alternative response");throw e}}for(let e of this.middleware)e.post&&(i=await e.post({fetch:this.fetchApi,url:n.url,init:n.init,response:i.clone()})||i);return i},this.middleware=e.middleware}}(0,w._)(x,"jsonRegex",RegExp("^(:?application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(:?;.*)?$","i"));class b extends Error{constructor(e,t){super(t),(0,w._)(this,"response",void 0),(0,w._)(this,"name",void 0),this.response=e,this.name="ResponseError"}}class m extends Error{constructor(e,t){super(t),(0,w._)(this,"cause",void 0),(0,w._)(this,"name",void 0),this.cause=e,this.name="FetchError"}}class y extends Error{constructor(e,t){super(t),(0,w._)(this,"field",void 0),(0,w._)(this,"name",void 0),this.field=e,this.name="RequiredError"}}function k(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object.keys(e).map(i=>(function e(t,i){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=n+(n.length?`[${t}]`:t);if(i instanceof Array){let e=i.map(e=>encodeURIComponent(String(e))).join(`&${encodeURIComponent(r)}=`);return`${encodeURIComponent(r)}=${e}`}return i instanceof Set?e(t,Array.from(i),n):i instanceof Date?`${encodeURIComponent(r)}=${encodeURIComponent(i.toISOString())}`:i instanceof Object?k(i,r):`${encodeURIComponent(r)}=${encodeURIComponent(String(i))}`})(i,e[i],t)).filter(e=>e.length>0).join("&")}class S{async value(){return this.transformer(await this.raw.json())}constructor(e,t=e=>e){(0,w._)(this,"raw",void 0),(0,w._)(this,"transformer",void 0),this.raw=e,this.transformer=t}}class C{async value(){}constructor(e){(0,w._)(this,"raw",void 0),this.raw=e}}class j extends x{async currentRaw(e){let t={};if(this.configuration&&this.configuration.accessToken){let e=this.configuration.accessToken,i=await e("api_jwt_token",[]);i&&(t.Authorization=`Bearer ${i}`)}return new S(await this.request({path:"/auth/current",method:"GET",headers:t,query:{}},e),e=>(function(e,t){if(null==e)return e;return{data:null==e.data?void 0:function(e,t){return null==e?e:{email:e.email,name:e.name,pid:e.pid}}(e.data,!1),message:null==e.message?void 0:e.message,nextLink:null==e.next_link?void 0:e.next_link,successful:e.successful}})(e,!1))}async current(e){let t=await this.currentRaw(e);return await t.value()}async forgotRaw(e,t){if(null==e.body)throw new y("body",'Required parameter "body" was null or undefined when calling forgot().');let i={};return i["Content-Type"]="application/json",new C(await this.request({path:"/auth/forgot",method:"POST",headers:i,query:{},body:e.body},t))}async forgot(e,t){await this.forgotRaw(e,t)}async loginRaw(e,t){if(null==e.body)throw new y("body",'Required parameter "body" was null or undefined when calling login().');let i={};return i["Content-Type"]="application/json",new S(await this.request({path:"/auth/login",method:"POST",headers:i,query:{},body:e.body},t),e=>(function(e,t){if(null==e)return e;return{data:null==e.data?void 0:function(e,t){return null==e?e:{isVerified:e.is_verified,name:e.name,pid:e.pid,token:e.token}}(e.data,!1),message:null==e.message?void 0:e.message,nextLink:null==e.next_link?void 0:e.next_link,successful:e.successful}})(e,!1))}async login(e,t){let i=await this.loginRaw(e,t);return await i.value()}async registerRaw(e,t){if(null==e.body)throw new y("body",'Required parameter "body" was null or undefined when calling register().');let i={};return i["Content-Type"]="application/json",new S(await this.request({path:"/auth/register",method:"POST",headers:i,query:{},body:e.body},t),e=>(function(e,t){return null==e?e:{data:null==e.data?void 0:e.data,message:null==e.message?void 0:e.message,nextLink:null==e.next_link?void 0:e.next_link,successful:e.successful}})(e,!1))}async register(e,t){let i=await this.registerRaw(e,t);return await i.value()}async resetRaw(e,t){if(null==e.body)throw new y("body",'Required parameter "body" was null or undefined when calling reset().');let i={};return i["Content-Type"]="application/json",new C(await this.request({path:"/auth/reset",method:"POST",headers:i,query:{},body:e.body},t))}async reset(e,t){await this.resetRaw(e,t)}async verifyRaw(e,t){if(null==e.body)throw new y("body",'Required parameter "body" was null or undefined when calling verify().');let i={};return i["Content-Type"]="application/json",new C(await this.request({path:"/auth/verify",method:"POST",headers:i,query:{},body:e.body},t))}async verify(e,t){await this.verifyRaw(e,t)}}var M=(0,s.XK)('<div class="flex flex-1 justify-center align-middle w-full min-h-svh"><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12"><div class="card-title items-center text-4xl">Login</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=username id=username-label class=text-2xl>Username</label><input id=username type=text placeholder="Type here"class="input input-bordered w-full max-w-xs"></div><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=passward id=passward-label class=text-2xl>Password</label><input id=passward type=password class="input input-bordered w-full max-w-xs"></div><div class="flex flex-row justify-end items-center w-full"></div></div><div class="card-actions flex flex-row justify-evenly items-center space-x-8"><div class=w-32></div><button class="btn btn-primary w-32">Login');let L=()=>{var e,t,i,r,s,a;let[o,d]=(0,n.gQ)(),[c,u]=(0,n.gQ)(),{createUser:f}=l(),h=async()=>{let e={email:o()??"",password:c()??""},t=new j,i=await t.login({loginParams:e});if(i.data&&i.successful)f(i.data),i.nextLink&&(window.location.href=i.nextLink);else throw Error(i.message??"OOPS")};return r=(i=(t=(e=M()).firstChild.firstChild.nextSibling).firstChild).firstChild.nextSibling,s=i.nextSibling.firstChild.nextSibling,a=t.nextSibling.firstChild.nextSibling,r.addEventListener("change",e=>d(e.currentTarget.value)),s.addEventListener("change",e=>u(e.currentTarget.value)),a.$$click=h,(0,n.F3)(()=>r.value=o()),(0,n.F3)(()=>s.value=c()),e};(0,s.Qj)(["click"]);var T=(0,s.XK)('<div class="card-actions flex flex-row justify-evenly items-center space-x-8"><div class="w-32 flex flex-col text-sm"></div><button class="btn btn-primary w-32">Sign Up'),R=(0,s.XK)('<div class="flex flex-1 justify-center align-middle w-full min-h-svh"><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12"><div class="card-title items-center text-4xl">Login</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=username id=username-label class="text-2xl w-1/2">eMail Address</label><input id=username type=email placeholder=FooBar class="input input-bordered w-1/2 max-w-xs"></div><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=username id=username-label class="text-2xl w-1/2">Username</label><input id=username type=text placeholder="Type here"class="input input-bordered w-1/2 max-w-xs"></div><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=passward id=passward-label class="text-2xl w-1/2">Password</label><input id=passward type=password class="input input-bordered w-1/2 max-w-xs"></div><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=verify-passward id=verify-passward-label class="text-2xl w-1/2">Verify Password</label><input id=verify-passward type=password class="input input-bordered w-1/2 max-w-xs"></div><div class="flex flex-row justify-end items-center w-full"></div></div><div class="card-actions flex flex-row justify-evenly items-center space-x-8">');let $=()=>{var e,t,i,r,a,l,o,d,c,u;let[f,h]=(0,n.gQ)(),[v,w]=(0,n.gQ)(),[p,g]=(0,n.gQ)(),[x,b]=(0,n.gQ)(),m=async()=>{try{let e={body:{name:f(),email:v(),password:p()}};console.log({...e});let t=new j;await t.register(e),window.location.href="/auth/login"}catch(e){throw Error(e)}},y=()=>{var e;return(e=T()).firstChild.nextSibling.$$click=m,e};return r=(i=(t=(e=R()).firstChild.firstChild.nextSibling).firstChild).firstChild.nextSibling,l=(a=i.nextSibling).firstChild.nextSibling,d=(o=a.nextSibling).firstChild.nextSibling,c=o.nextSibling.firstChild.nextSibling,u=t.nextSibling,r.addEventListener("change",e=>w(e.currentTarget.value)),l.addEventListener("change",e=>h(e.currentTarget.value)),d.addEventListener("change",e=>g(e.currentTarget.value)),c.addEventListener("change",e=>b(e.currentTarget.value)),(0,s.$T)(u,(0,n.LM)(y,{})),(0,n.F3)(()=>r.value=v()??""),(0,n.F3)(()=>l.value=f()??""),(0,n.F3)(()=>d.value=p()??""),(0,n.F3)(()=>c.value=x()??""),e};(0,s.Qj)(["click"]);var q=(0,s.XK)("<div>"),A=(0,s.XK)('<header class="navbar bg-base-100 w-full justify-between"><div class="flex flex-row space-x-8"></div><div class=flex-none><details class=dropdown><summary class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">'),O=(0,s.XK)('<header class="navbar bg-base-100 w-full justify-between"><div class="flex flex-row space-x-8"></div><div class=flex-none><details class=dropdown><summary class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg><ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 -translate-x-32 shadow"><li><span class="text-sm text-primary-content font-bold"></span></li><li><button class="btn btn-neutral text-lg">Logout');let _=e=>{var t,i;return i=(t=A()).firstChild,(0,s.$T)(i,(0,n.LM)(r.A,{href:"/auth/login",children:"Login"}),null),(0,s.$T)(i,(0,n.LM)(r.A,{href:"/auth/signup",children:"Signup"}),null),t},E=e=>{var t,i,a,l,o;return l=(a=(i=(t=O()).firstChild).nextSibling.firstChild.firstChild.firstChild.nextSibling.firstChild).firstChild,o=a.nextSibling.firstChild,(0,s.$T)(i,(0,n.LM)(r.A,{href:"/",children:"Welcome"}),null),(0,s.$T)(i,(0,n.LM)(r.A,{href:"/info",children:"What is this?"}),null),(0,s.$T)(l,()=>e.username()),(0,s.Oo)(o,"click",e.removeUser,!0),t},P=e=>{var t;let{getUser:i,removeUser:a}=l(),[o,d]=(0,n.gQ)(i()),c=()=>{var e,t;return o()&&(null===(e=o())||void 0===e?void 0:e.token)!==null&&(null===(t=o())||void 0===t?void 0:t.token)!==void 0},u=()=>{var e;return(null===(e=o())||void 0===e?void 0:e.name)??"Unknown"},f=(0,r.TH)();return(0,n.GW)(()=>{console.log({"There is a user logged in":c,"They are at":{...f}})}),t=q(),(0,s.$T)(t,(0,n.LM)(n.di,{get when(){return c()},get fallback(){return(0,n.LM)(_,{removeUser:a})},get children(){return(0,n.LM)(E,{removeUser:a,username:u})}}),null),(0,s.$T)(t,()=>e.children,null),t};(0,s.Qj)(["click"]);let U=document.getElementById("root");if(U)(0,s.sY)(()=>(0,n.LM)(r.F0,{root:P,get children(){return[(0,n.LM)(r.AW,{path:"/",component:()=>(0,n.LM)(v,{})}),(0,n.LM)(r.AW,{path:"/auth",get children(){return[(0,n.LM)(r.AW,{path:"/login",component:()=>(0,n.LM)(L,{})}),(0,n.LM)(r.AW,{path:"/signup",component:()=>(0,n.LM)($,{})})]}})]}}),U);else throw Error("Wrapper not found")}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,i),s.exports}i.m=e,i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},(()=>{var e=[];i.O=function(t,n,r,s){if(n){s=s||0;for(var a=e.length;a>0&&e[a-1][2]>s;a--)e[a]=e[a-1];e[a]=[n,r,s];return}for(var l=1/0,a=0;a<e.length;a++){for(var n=e[a][0],r=e[a][1],s=e[a][2],o=!0,d=0;d<n.length;d++)(!1&s||l>=s)&&Object.keys(i.O).every(function(e){return i.O[e](n[d])})?n.splice(d--,1):(o=!1,s<l&&(l=s));if(o){e.splice(a--,1);var c=r();void 0!==c&&(t=c)}}return t}})(),i.rv=function(){return"1.1.8"},(()=>{var e={980:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var r=n[0],s=n[1],a=n[2],l,o,d=0;if(r.some(function(t){return 0!==e[t]})){for(l in s)i.o(s,l)&&(i.m[l]=s[l]);if(a)var c=a(i)}for(t&&t(n);d<r.length;d++)o=r[d],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},n=self.webpackChunkrsbuild_solid_ts=self.webpackChunkrsbuild_solid_ts||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),i.ruid="bundler=rspack@1.1.8";var n=i.O(void 0,["920"],function(){return i("572")});n=i.O(n)})();