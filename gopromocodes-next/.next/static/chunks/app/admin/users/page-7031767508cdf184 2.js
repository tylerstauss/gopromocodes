(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[674],{7734:function(e,t,r){Promise.resolve().then(r.bind(r,3771)),Promise.resolve().then(r.t.bind(r,8326,23)),Promise.resolve().then(r.t.bind(r,9167,23))},3771:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return UserSearch}});var n=r(7437),s=r(2265),o=r(4033),u=r(6129);function UserSearch(e){let{initialSearch:t=""}=e,[r,i]=(0,s.useState)(t),c=(0,u.N)(r,300),a=(0,o.useRouter)(),l=(0,o.usePathname)();return(0,s.useEffect)(()=>{let e=new URLSearchParams;c&&e.set("search",c),a.push("".concat(l).concat(c?"?".concat(e.toString()):""))},[c,l,a]),(0,n.jsx)("div",{className:"w-full sm:max-w-xs",children:(0,n.jsxs)("div",{className:"flex rounded-md shadow-sm",children:[(0,n.jsx)("div",{className:"relative flex grow items-stretch focus-within:z-10",children:(0,n.jsx)("input",{type:"text",name:"search",id:"search",className:"block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:"Search users...",value:r,onChange:e=>i(e.target.value)})}),r&&(0,n.jsx)("button",{type:"button",onClick:()=>{i("")},className:"relative -ml-px inline-flex items-center gap-x-1.5 rounded-none px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",children:"Clear"})]})})}},6129:function(e,t,r){"use strict";r.d(t,{N:function(){return useDebounce}});var n=r(2265);function useDebounce(e,t){let[r,s]=(0,n.useState)(e);return(0,n.useEffect)(()=>{let r=setTimeout(()=>{s(e)},t);return()=>{clearTimeout(r)}},[e,t]),r}},9167:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{suspense:function(){return suspense},NoSSR:function(){return NoSSR}});let n=r(1283);function suspense(){let e=Error(n.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=n.NEXT_DYNAMIC_NO_SSR_CODE,e}function NoSSR(e){let{children:t}=e;return t}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var n,o={},a=null,l=null;for(n in void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(l=t.ref),t)u.call(t,n)&&!c.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:s,type:e,key:a,ref:l,props:o,_owner:i.current}}t.Fragment=o,t.jsx=q,t.jsxs=q},7437:function(e,t,r){"use strict";e.exports=r(622)},4033:function(e,t,r){e.exports=r(94)}},function(e){e.O(0,[326,971,472,744],function(){return e(e.s=7734)}),_N_E=e.O()}]);