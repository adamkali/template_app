"use strict";(self.webpackChunkrsbuild_solid_ts=self.webpackChunkrsbuild_solid_ts||[]).push([["597"],{634:function(e,l,t){t.d(l,{Z:function(){return i}});let s="user_login_response";function i(){return{createUser:e=>{var l;return l=e,void localStorage.setItem(s,JSON.stringify(l))},getUser:()=>(function(){let e=localStorage.getItem(s);return null===e?null:JSON.parse(e)})(),removeUser:()=>void(localStorage.removeItem(s),window.location.reload())}}},287:function(e,l,t){t.r(l),t.d(l,{default:function(){return d}});var s=t(741),i=t(338),a=t(140),r=t(634),n=(0,s.XK)('<div class="flex flex-1 justify-center align-middle w-full min-h-svh"><div class="flex flex-col card bg-base-200 w-2/3 h-2/3 shadow-xl my-auto p-12"><div class="card-title items-center text-4xl">Login</div><div class="card-body flex flex-col space-y-4"><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=username id=username-label class=text-2xl>Username</label><input id=username type=text placeholder="Type here"class="input input-bordered w-full max-w-xs"></div><div class="flex flex-row justify-evenly items-center space-x-8 w-full"><label for=passward id=passward-label class=text-2xl>Password</label><input id=passward type=password class="input input-bordered w-full max-w-xs"></div><div class="flex flex-row justify-end items-center w-full"></div></div><div class="card-actions flex flex-row justify-evenly items-center space-x-8"><div class=w-32></div><button class="btn btn-primary w-32">Login');let d=()=>{var e,l,t,s,d,c;let[u,o]=(0,i.gQ)(),[f,x]=(0,i.gQ)(),{createUser:v}=(0,r.Z)(),w=async()=>{let e={email:u()??"",password:f()??""},l=new a.z9,t=await l.login({loginParams:e});if(t.data&&t.successful)v(t.data),t.nextLink&&(window.location.href=t.nextLink);else throw Error(t.message??"OOPS")};return s=(t=(l=(e=n()).firstChild.firstChild.nextSibling).firstChild).firstChild.nextSibling,d=t.nextSibling.firstChild.nextSibling,c=l.nextSibling.firstChild.nextSibling,s.addEventListener("change",e=>o(e.currentTarget.value)),d.addEventListener("change",e=>x(e.currentTarget.value)),c.$$click=w,(0,i.F3)(()=>s.value=u()),(0,i.F3)(()=>d.value=f()),e};(0,s.Qj)(["click"])}}]);