"use strict";(self.webpackChunkrsbuild_solid_ts=self.webpackChunkrsbuild_solid_ts||[]).push([["487"],{634:function(e,t,l){l.d(t,{Z:function(){return n}});let i="user_login_response";function n(){return{createUser:e=>{var t;return t=e,void localStorage.setItem(i,JSON.stringify(t))},getUser:()=>(function(){let e=localStorage.getItem(i);return null===e?null:JSON.parse(e)})(),removeUser:()=>void(localStorage.removeItem(i),window.location.reload())}}},185:function(e,t,l){l.r(t),l.d(t,{default:()=>f});var i=l("741"),n=l("338"),r=l("625"),o=l("634");let s=async e=>{let{target:t,message:l,value:i}=e;try{let e="";if(!navigator.clipboard)throw Error("Browser don't have support for native clipboard.");if(t){let e=document.querySelector(t);if(!e||!e.textContent)throw Error("Element not found");i=e.textContent}i&&(e=i),await navigator.clipboard.writeText(e),console.log(l??"Copied!!!")}catch(e){console.log(e)}};var a=(0,i.XK)("<span> "),d=(0,i.XK)('<div class=toast><div class="alert alert-info"><span>Your token has been copied.'),c=(0,i.XK)('<div class="flex flex-col justify-center items-center"><header class="navbar bg-base-100 w-full justify-between"><div class="flex flex-row space-x-8"></div><div class=flex-none><details class=dropdown><summary class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></summary><ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 -translate-x-32 shadow"><li><button class="btn btn-neutral text-lg">Logout</button></li></ul></details></div></header><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2"><figure><img src=https://loco.rs/icon.svg width=260px alt=LocoRS></figure><div class="card-title items-center text-4xl text-primary text-center pt-4">Welcome <!> to a LocoRS Made App</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row space-x-2 items-center justify-between"><span>Your Token is:</span><div class="divider-horizontal divider-primary"></div><button class="btn btn-link"></button></div><div class="flex flex-row space-x-2 justify-center"><span>You are<!>Verified</span></div></div></div><footer class="flex flex-row justify-end">'),u=(0,i.XK)("<b> not "),v=(0,i.XK)('<div class="navbar bg-base-100"><div class="flex flex-row space-x-8"></div><div class=flex-none><button class="btn btn-square btn-ghost"><svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"class="inline-block h-5 w-5 stroke-current"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></button></div><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12 space-y-2"><figure><img src=https://loco.rs/icon.svg width=260px alt=LocoRS></figure><div class="card-title items-center text-4xl text-primary text-center pt-4">Welcome to a LocoRS Made App</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row space-x-2 items-center justify-between">You must login to continue.');let f=()=>{let{getUser:e,removeUser:t}=(0,o.Z)(),[l,f]=(0,n.gQ)(!1),h=(0,n.Py)(()=>{var t,l,i,n,r,o;let s=null===(l=e())||void 0===l?void 0:null===(t=l.token)||void 0===t?void 0:t.slice(0,10),a=(null===(n=e())||void 0===n?void 0:null===(i=n.token)||void 0===i?void 0:i.length)?null===(o=e())||void 0===o?void 0:null===(r=o.token)||void 0===r?void 0:r.slice(-10):"";return`${s}...${a}`}),g=async()=>{var t;await s({value:null===(t=e())||void 0===t?void 0:t.token,message:"Token Copied to clipboard"}),f(!0)};(0,n.GW)(()=>{let e;return!0===l()&&(e=setInterval(()=>{f(!1)},2e3)),()=>{clearInterval(e)}});let x=()=>{var o,s,v,f,x,b,p,w,m,k,y,S;return f=(v=(s=(o=c()).firstChild).firstChild).nextSibling.firstChild.firstChild.nextSibling.firstChild.firstChild,m=(w=((p=(b=(x=s.nextSibling).firstChild.nextSibling).firstChild.nextSibling).nextSibling,b.nextSibling).firstChild).firstChild.nextSibling.nextSibling,S=((y=(k=w.nextSibling.firstChild).firstChild.nextSibling).nextSibling,x.nextSibling),(0,i.$T)(v,(0,n.LM)(r.A,{href:"/",children:"Welcome"})),(0,i.Oo)(f,"click",t,!0),(0,i.$T)(b,()=>{var t;return null===(t=e())||void 0===t?void 0:t.name},p),m.$$click=g,(0,i.$T)(m,h),(0,i.$T)(k,(0,n.LM)(n.di,{get when(){var C;return(null===(C=e())||void 0===C?void 0:C.isVerified)??!1},get fallback(){return u()},get children(){return a()}}),y),(0,i.$T)(S,(0,n.LM)(n.di,{get when(){return l()},get children(){return d()}})),o},b=()=>{var e,t;return t=(e=v()).firstChild,(0,i.$T)(t,(0,n.LM)(r.A,{href:"/auth/login",children:"Login"}),null),(0,i.$T)(t,(0,n.LM)(r.A,{href:"/auth/signup",children:"Signup"}),null),e};return(0,n.LM)(n.di,{get when(){return null!==e()},get fallback(){return(0,n.LM)(b,{})},get children(){return(0,n.LM)(x,{})}})};(0,i.Qj)(["click"])}}]);