"use strict";(self["webpackChunkclass_room"]=self["webpackChunkclass_room"]||[]).push([[504],{34:function(e,t,n){var r=n(4901);e.exports=function(e){return"object"==typeof e?null!==e:r(e)}},81:function(e,t,n){var r=n(9565),i=n(9306),s=n(8551),o=n(6823),a=n(851),c=TypeError;e.exports=function(e,t){var n=arguments.length<2?a(e):t;if(i(n))return s(r(n,e));throw new c(o(e)+" is not iterable")}},116:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("find",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{find:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r(t)},{IS_RECORD:!0,INTERRUPTED:!0}).result}})},144:function(e,t,n){n.d(t,{C4:function(){return I},EW:function(){return De},Gc:function(){return ye},IG:function(){return Se},Kh:function(){return me},Pr:function(){return Oe},R1:function(){return Re},Tm:function(){return be},X2:function(){return u},a1:function(){return Ae},bl:function(){return S},fE:function(){return Ee},g8:function(){return _e},hZ:function(){return L},i9:function(){return ke},ju:function(){return Te},lJ:function(){return Ce},qA:function(){return V},u4:function(){return M},ux:function(){return Ie},wB:function(){return Ve},yC:function(){return o}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(4232);let i,s;class o{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=i;try{return i=this,e()}finally{i=t}}else 0}on(){1===++this._on&&(this.prevScope=i,i=this)}off(){this._on>0&&0===--this._on&&(i=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){let t,n;for(this._active=!1,t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}}function a(){return i}const c=new WeakSet;class u{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,c.has(this)&&(c.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||d(this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,C(this),m(this);const e=s,t=E;s=this,E=!0;try{return this.fn()}finally{0,y(this),s=e,E=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)_(e);this.deps=this.depsTail=void 0,C(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?c.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){v(this)&&this.run()}get dirty(){return v(this)}}let l,h,f=0;function d(e,t=!1){if(e.flags|=8,t)return e.next=h,void(h=e);e.next=l,l=e}function p(){f++}function g(){if(--f>0)return;if(h){let e=h;h=void 0;while(e){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;while(l){let n=l;l=void 0;while(n){const r=n.next;if(n.next=void 0,n.flags&=-9,1&n.flags)try{n.trigger()}catch(t){e||(e=t)}n=r}}if(e)throw e}function m(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function y(e){let t,n=e.depsTail,r=n;while(r){const e=r.prevDep;-1===r.version?(r===n&&(n=e),_(r),b(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function v(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(w(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function w(e){if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===A)return;if(e.globalVersion=A,!e.isSSR&&128&e.flags&&(!e.deps&&!e._dirty||!v(e)))return;e.flags|=2;const t=e.dep,n=s,i=E;s=e,E=!0;try{m(e);const n=e.fn(e._value);(0===t.version||(0,r.$H)(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(o){throw t.version++,o}finally{s=n,E=i,y(e),e.flags&=-3}}function _(e,t=!1){const{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)_(e,!0)}t||--n.sc||!n.map||n.map.delete(n.key)}function b(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let E=!0;const T=[];function I(){T.push(E),E=!1}function S(){const e=T.pop();E=void 0===e||e}function C(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=s;s=void 0;try{t()}finally{s=e}}}let A=0;class k{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class R{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!s||!E||s===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==s)t=this.activeLink=new k(s,this),s.deps?(t.prevDep=s.depsTail,s.depsTail.nextDep=t,s.depsTail=t):s.deps=s.depsTail=t,N(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=s.depsTail,t.nextDep=void 0,s.depsTail.nextDep=t,s.depsTail=t,s.deps===t&&(s.deps=e)}return t}trigger(e){this.version++,A++,this.notify(e)}notify(e){p();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{g()}}}function N(e){if(e.dep.sc++,4&e.sub.flags){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)N(e)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const O=new WeakMap,x=Symbol(""),D=Symbol(""),P=Symbol("");function M(e,t,n){if(E&&s){let t=O.get(e);t||O.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new R),r.map=t,r.key=n),r.track()}}function L(e,t,n,i,s,o){const a=O.get(e);if(!a)return void A++;const c=e=>{e&&e.trigger()};if(p(),"clear"===t)a.forEach(c);else{const s=(0,r.cy)(e),o=s&&(0,r.yI)(n);if(s&&"length"===n){const e=Number(i);a.forEach((t,n)=>{("length"===n||n===P||!(0,r.Bm)(n)&&n>=e)&&c(t)})}else switch((void 0!==n||a.has(void 0))&&c(a.get(n)),o&&c(a.get(P)),t){case"add":s?o&&c(a.get("length")):(c(a.get(x)),(0,r.CE)(e)&&c(a.get(D)));break;case"delete":s||(c(a.get(x)),(0,r.CE)(e)&&c(a.get(D)));break;case"set":(0,r.CE)(e)&&c(a.get(x));break}}g()}function U(e){const t=Ie(e);return t===e?t:(M(t,"iterate",P),Ee(e)?t:t.map(Ce))}function V(e){return M(e=Ie(e),"iterate",P),e}const F={__proto__:null,[Symbol.iterator](){return j(this,Symbol.iterator,Ce)},concat(...e){return U(this).concat(...e.map(e=>(0,r.cy)(e)?U(e):e))},entries(){return j(this,"entries",e=>(e[1]=Ce(e[1]),e))},every(e,t){return $(this,"every",e,t,void 0,arguments)},filter(e,t){return $(this,"filter",e,t,e=>e.map(Ce),arguments)},find(e,t){return $(this,"find",e,t,Ce,arguments)},findIndex(e,t){return $(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return $(this,"findLast",e,t,Ce,arguments)},findLastIndex(e,t){return $(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return $(this,"forEach",e,t,void 0,arguments)},includes(...e){return H(this,"includes",e)},indexOf(...e){return H(this,"indexOf",e)},join(e){return U(this).join(e)},lastIndexOf(...e){return H(this,"lastIndexOf",e)},map(e,t){return $(this,"map",e,t,void 0,arguments)},pop(){return q(this,"pop")},push(...e){return q(this,"push",e)},reduce(e,...t){return z(this,"reduce",e,t)},reduceRight(e,...t){return z(this,"reduceRight",e,t)},shift(){return q(this,"shift")},some(e,t){return $(this,"some",e,t,void 0,arguments)},splice(...e){return q(this,"splice",e)},toReversed(){return U(this).toReversed()},toSorted(e){return U(this).toSorted(e)},toSpliced(...e){return U(this).toSpliced(...e)},unshift(...e){return q(this,"unshift",e)},values(){return j(this,"values",Ce)}};function j(e,t,n){const r=V(e),i=r[t]();return r===e||Ee(e)||(i._next=i.next,i.next=()=>{const e=i._next();return e.value&&(e.value=n(e.value)),e}),i}const B=Array.prototype;function $(e,t,n,r,i,s){const o=V(e),a=o!==e&&!Ee(e),c=o[t];if(c!==B[t]){const t=c.apply(e,s);return a?Ce(t):t}let u=n;o!==e&&(a?u=function(t,r){return n.call(this,Ce(t),r,e)}:n.length>2&&(u=function(t,r){return n.call(this,t,r,e)}));const l=c.call(o,u,r);return a&&i?i(l):l}function z(e,t,n,r){const i=V(e);let s=n;return i!==e&&(Ee(e)?n.length>3&&(s=function(t,r,i){return n.call(this,t,r,i,e)}):s=function(t,r,i){return n.call(this,t,Ce(r),i,e)}),i[t](s,...r)}function H(e,t,n){const r=Ie(e);M(r,"iterate",P);const i=r[t](...n);return-1!==i&&!1!==i||!Te(n[0])?i:(n[0]=Ie(n[0]),r[t](...n))}function q(e,t,n=[]){I(),p();const r=Ie(e)[t].apply(e,n);return g(),S(),r}const K=(0,r.pD)("__proto__,__v_isRef,__isVue"),G=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(r.Bm));function W(e){(0,r.Bm)(e)||(e=String(e));const t=Ie(this);return M(t,"has",e),t.hasOwnProperty(e)}class Q{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if("__v_skip"===t)return e["__v_skip"];const i=this._isReadonly,s=this._isShallow;if("__v_isReactive"===t)return!i;if("__v_isReadonly"===t)return i;if("__v_isShallow"===t)return s;if("__v_raw"===t)return n===(i?s?de:fe:s?he:le).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=(0,r.cy)(e);if(!i){let e;if(o&&(e=F[t]))return e;if("hasOwnProperty"===t)return W}const a=Reflect.get(e,t,ke(e)?e:n);return((0,r.Bm)(t)?G.has(t):K(t))?a:(i||M(e,"get",t),s?a:ke(a)?o&&(0,r.yI)(t)?a:a.value:(0,r.Gv)(a)?i?ve(a):me(a):a)}}class X extends Q{constructor(e=!1){super(!1,e)}set(e,t,n,i){let s=e[t];if(!this._isShallow){const t=be(s);if(Ee(n)||be(n)||(s=Ie(s),n=Ie(n)),!(0,r.cy)(e)&&ke(s)&&!ke(n))return!t&&(s.value=n,!0)}const o=(0,r.cy)(e)&&(0,r.yI)(t)?Number(t)<e.length:(0,r.$3)(e,t),a=Reflect.set(e,t,n,ke(e)?e:i);return e===Ie(i)&&(o?(0,r.$H)(n,s)&&L(e,"set",t,n,s):L(e,"add",t,n)),a}deleteProperty(e,t){const n=(0,r.$3)(e,t),i=e[t],s=Reflect.deleteProperty(e,t);return s&&n&&L(e,"delete",t,void 0,i),s}has(e,t){const n=Reflect.has(e,t);return(0,r.Bm)(t)&&G.has(t)||M(e,"has",t),n}ownKeys(e){return M(e,"iterate",(0,r.cy)(e)?"length":x),Reflect.ownKeys(e)}}class Y extends Q{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const J=new X,Z=new Y,ee=new X(!0),te=e=>e,ne=e=>Reflect.getPrototypeOf(e);function re(e,t,n){return function(...i){const s=this["__v_raw"],o=Ie(s),a=(0,r.CE)(o),c="entries"===e||e===Symbol.iterator&&a,u="keys"===e&&a,l=s[e](...i),h=n?te:t?Ae:Ce;return!t&&M(o,"iterate",u?D:x),{next(){const{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function ie(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function se(e,t){const n={get(n){const i=this["__v_raw"],s=Ie(i),o=Ie(n);e||((0,r.$H)(n,o)&&M(s,"get",n),M(s,"get",o));const{has:a}=ne(s),c=t?te:e?Ae:Ce;return a.call(s,n)?c(i.get(n)):a.call(s,o)?c(i.get(o)):void(i!==s&&i.get(n))},get size(){const t=this["__v_raw"];return!e&&M(Ie(t),"iterate",x),Reflect.get(t,"size",t)},has(t){const n=this["__v_raw"],i=Ie(n),s=Ie(t);return e||((0,r.$H)(t,s)&&M(i,"has",t),M(i,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)},forEach(n,r){const i=this,s=i["__v_raw"],o=Ie(s),a=t?te:e?Ae:Ce;return!e&&M(o,"iterate",x),s.forEach((e,t)=>n.call(r,a(e),a(t),i))}};(0,r.X$)(n,e?{add:ie("add"),set:ie("set"),delete:ie("delete"),clear:ie("clear")}:{add(e){t||Ee(e)||be(e)||(e=Ie(e));const n=Ie(this),r=ne(n),i=r.has.call(n,e);return i||(n.add(e),L(n,"add",e,e)),this},set(e,n){t||Ee(n)||be(n)||(n=Ie(n));const i=Ie(this),{has:s,get:o}=ne(i);let a=s.call(i,e);a||(e=Ie(e),a=s.call(i,e));const c=o.call(i,e);return i.set(e,n),a?(0,r.$H)(n,c)&&L(i,"set",e,n,c):L(i,"add",e,n),this},delete(e){const t=Ie(this),{has:n,get:r}=ne(t);let i=n.call(t,e);i||(e=Ie(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,o=t.delete(e);return i&&L(t,"delete",e,void 0,s),o},clear(){const e=Ie(this),t=0!==e.size,n=void 0,r=e.clear();return t&&L(e,"clear",void 0,void 0,n),r}});const i=["keys","values","entries",Symbol.iterator];return i.forEach(r=>{n[r]=re(r,e,t)}),n}function oe(e,t){const n=se(e,t);return(t,i,s)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get((0,r.$3)(n,i)&&i in t?n:t,i,s)}const ae={get:oe(!1,!1)},ce={get:oe(!1,!0)},ue={get:oe(!0,!1)};const le=new WeakMap,he=new WeakMap,fe=new WeakMap,de=new WeakMap;function pe(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ge(e){return e["__v_skip"]||!Object.isExtensible(e)?0:pe((0,r.Zf)(e))}function me(e){return be(e)?e:we(e,!1,J,ae,le)}function ye(e){return we(e,!1,ee,ce,he)}function ve(e){return we(e,!0,Z,ue,fe)}function we(e,t,n,i,s){if(!(0,r.Gv)(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const o=ge(e);if(0===o)return e;const a=s.get(e);if(a)return a;const c=new Proxy(e,2===o?i:n);return s.set(e,c),c}function _e(e){return be(e)?_e(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function be(e){return!(!e||!e["__v_isReadonly"])}function Ee(e){return!(!e||!e["__v_isShallow"])}function Te(e){return!!e&&!!e["__v_raw"]}function Ie(e){const t=e&&e["__v_raw"];return t?Ie(t):e}function Se(e){return!(0,r.$3)(e,"__v_skip")&&Object.isExtensible(e)&&(0,r.yQ)(e,"__v_skip",!0),e}const Ce=e=>(0,r.Gv)(e)?me(e):e,Ae=e=>(0,r.Gv)(e)?ve(e):e;function ke(e){return!!e&&!0===e["__v_isRef"]}function Re(e){return ke(e)?e.value:e}const Ne={get:(e,t,n)=>"__v_raw"===t?e:Re(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return ke(i)&&!ke(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Oe(e){return _e(e)?e:new Proxy(e,Ne)}class xe{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new R(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=A-1,this.next=void 0,this.effect=this,this["__v_isReadonly"]=!t,this.isSSR=n}notify(){if(this.flags|=16,!(8&this.flags||s===this))return d(this,!0),!0}get value(){const e=this.dep.track();return w(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function De(e,t,n=!1){let i,s;(0,r.Tn)(e)?i=e:(i=e.get,s=e.set);const o=new xe(i,s,n);return o}const Pe={},Me=new WeakMap;let Le;function Ue(e,t=!1,n=Le){if(n){let t=Me.get(n);t||Me.set(n,t=[]),t.push(e)}else 0}function Ve(e,t,n=r.MZ){const{immediate:i,deep:s,once:o,scheduler:c,augmentJob:l,call:h}=n,f=e=>s?e:Ee(e)||!1===s||0===s?Fe(e,1):Fe(e);let d,p,g,m,y=!1,v=!1;if(ke(e)?(p=()=>e.value,y=Ee(e)):_e(e)?(p=()=>f(e),y=!0):(0,r.cy)(e)?(v=!0,y=e.some(e=>_e(e)||Ee(e)),p=()=>e.map(e=>ke(e)?e.value:_e(e)?f(e):(0,r.Tn)(e)?h?h(e,2):e():void 0)):p=(0,r.Tn)(e)?t?h?()=>h(e,2):e:()=>{if(g){I();try{g()}finally{S()}}const t=Le;Le=d;try{return h?h(e,3,[m]):e(m)}finally{Le=t}}:r.tE,t&&s){const e=p,t=!0===s?1/0:s;p=()=>Fe(e(),t)}const w=a(),_=()=>{d.stop(),w&&w.active&&(0,r.TF)(w.effects,d)};if(o&&t){const e=t;t=(...t)=>{e(...t),_()}}let b=v?new Array(e.length).fill(Pe):Pe;const E=e=>{if(1&d.flags&&(d.dirty||e))if(t){const e=d.run();if(s||y||(v?e.some((e,t)=>(0,r.$H)(e,b[t])):(0,r.$H)(e,b))){g&&g();const n=Le;Le=d;try{const n=[e,b===Pe?void 0:v&&b[0]===Pe?[]:b,m];b=e,h?h(t,3,n):t(...n)}finally{Le=n}}}else d.run()};return l&&l(E),d=new u(p),d.scheduler=c?()=>c(E,!1):E,m=e=>Ue(e,!1,d),g=d.onStop=()=>{const e=Me.get(d);if(e){if(h)h(e,4);else for(const t of e)t();Me.delete(d)}},t?i?E(!0):b=d.run():c?c(E.bind(null,!0),!0):d.run(),_.pause=d.pause.bind(d),_.resume=d.resume.bind(d),_.stop=_,_}function Fe(e,t=1/0,n){if(t<=0||!(0,r.Gv)(e)||e["__v_skip"])return e;if(n=n||new Set,n.has(e))return e;if(n.add(e),t--,ke(e))Fe(e.value,t,n);else if((0,r.cy)(e))for(let r=0;r<e.length;r++)Fe(e[r],t,n);else if((0,r.vM)(e)||(0,r.CE)(e))e.forEach(e=>{Fe(e,t,n)});else if((0,r.Qd)(e)){for(const r in e)Fe(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Fe(e[r],t,n)}return e}},262:function(e,t,n){n.d(t,{MF:function(){return we},j6:function(){return pe},xZ:function(){return ge},om:function(){return de},Sx:function(){return be},Wp:function(){return _e},KO:function(){return Ee}});n(4114),n(8111),n(2489),n(1701),n(3579);var r=n(798),i=n(6189),s=n(2455);n(4979);const o=(e,t)=>t.some(t=>e instanceof t);let a,c;function u(){return a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function l(){return c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const h=new WeakMap,f=new WeakMap,d=new WeakMap,p=new WeakMap,g=new WeakMap;function m(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(E(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),g.set(t,e),t}function y(e){if(f.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});f.set(e,t)}let v={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return f.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return E(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function w(e){v=e(v)}function _(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?l().includes(e)?function(...t){return e.apply(T(this),t),E(h.get(this))}:function(...t){return E(e.apply(T(this),t))}:function(t,...n){const r=e.call(T(this),t,...n);return d.set(r,t.sort?t.sort():[t]),E(r)}}function b(e){return"function"===typeof e?_(e):(e instanceof IDBTransaction&&y(e),o(e,u())?new Proxy(e,v):e)}function E(e){if(e instanceof IDBRequest)return m(e);if(p.has(e))return p.get(e);const t=b(e);return t!==e&&(p.set(e,t),g.set(t,e)),t}const T=e=>g.get(e);function I(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=E(o);return r&&o.addEventListener("upgradeneeded",e=>{r(E(o.result),e.oldVersion,e.newVersion,E(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}const S=["get","getKey","getAll","getAllKeys","count"],C=["put","add","delete","clear"],A=new Map;function k(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(A.get(t))return A.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=C.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!S.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return A.set(t,s),s}w(e=>({...e,get:(t,n,r)=>k(t,n)||e.get(t,n,r),has:(t,n)=>!!k(t,n)||e.has(t,n)}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class R{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(N(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function N(e){const t=e.getComponent();return"VERSION"===t?.type}const O="@firebase/app",x="0.14.1",D=new i.Vy("@firebase/app"),P="@firebase/app-compat",M="@firebase/analytics-compat",L="@firebase/analytics",U="@firebase/app-check-compat",V="@firebase/app-check",F="@firebase/auth",j="@firebase/auth-compat",B="@firebase/database",$="@firebase/data-connect",z="@firebase/database-compat",H="@firebase/functions",q="@firebase/functions-compat",K="@firebase/installations",G="@firebase/installations-compat",W="@firebase/messaging",Q="@firebase/messaging-compat",X="@firebase/performance",Y="@firebase/performance-compat",J="@firebase/remote-config",Z="@firebase/remote-config-compat",ee="@firebase/storage",te="@firebase/storage-compat",ne="@firebase/firestore",re="@firebase/ai",ie="@firebase/firestore-compat",se="firebase",oe="12.1.0",ae="[DEFAULT]",ce={[O]:"fire-core",[P]:"fire-core-compat",[L]:"fire-analytics",[M]:"fire-analytics-compat",[V]:"fire-app-check",[U]:"fire-app-check-compat",[F]:"fire-auth",[j]:"fire-auth-compat",[B]:"fire-rtdb",[$]:"fire-data-connect",[z]:"fire-rtdb-compat",[H]:"fire-fn",[q]:"fire-fn-compat",[K]:"fire-iid",[G]:"fire-iid-compat",[W]:"fire-fcm",[Q]:"fire-fcm-compat",[X]:"fire-perf",[Y]:"fire-perf-compat",[J]:"fire-rc",[Z]:"fire-rc-compat",[ee]:"fire-gcs",[te]:"fire-gcs-compat",[ne]:"fire-fst",[ie]:"fire-fst-compat",[re]:"fire-vertex","fire-js":"fire-js",[se]:"fire-js-all"},ue=new Map,le=new Map,he=new Map;function fe(e,t){try{e.container.addComponent(t)}catch(n){D.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function de(e){const t=e.name;if(he.has(t))return D.debug(`There were multiple attempts to register component ${t}.`),!1;he.set(t,e);for(const n of ue.values())fe(n,e);for(const n of le.values())fe(n,e);return!0}function pe(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function ge(e){return null!==e&&void 0!==e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const me={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}'",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["server-app-deleted"]:"Firebase Server App has been deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",["finalization-registry-not-supported"]:"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",["invalid-server-app-environment"]:"FirebaseServerApp is not for use in browser environments."},ye=new s.FA("app","Firebase",me);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.uA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ye.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const we=oe;function _e(e,t={}){let n=e;if("object"!==typeof t){const e=t;t={name:e}}const i={name:ae,automaticDataCollectionEnabled:!0,...t},o=i.name;if("string"!==typeof o||!o)throw ye.create("bad-app-name",{appName:String(o)});if(n||(n=(0,s.T9)()),!n)throw ye.create("no-options");const a=ue.get(o);if(a){if((0,s.bD)(n,a.options)&&(0,s.bD)(i,a.config))return a;throw ye.create("duplicate-app",{appName:o})}const c=new r.h1(o);for(const r of he.values())c.addComponent(r);const u=new ve(n,i,c);return ue.set(o,u),u}function be(e=ae){const t=ue.get(e);if(!t&&e===ae&&(0,s.T9)())return _e();if(!t)throw ye.create("no-app",{appName:e});return t}function Ee(e,t,n){let i=ce[e]??e;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${i}" with version "${t}":`];return s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void D.warn(e.join(" "))}de(new r.uA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Te="firebase-heartbeat-database",Ie=1,Se="firebase-heartbeat-store";let Ce=null;function Ae(){return Ce||(Ce=I(Te,Ie,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Se)}catch(n){console.warn(n)}}}}).catch(e=>{throw ye.create("idb-open",{originalErrorMessage:e.message})})),Ce}async function ke(e){try{const t=await Ae(),n=t.transaction(Se),r=await n.objectStore(Se).get(Ne(e));return await n.done,r}catch(t){if(t instanceof s.g)D.warn(t.message);else{const e=ye.create("idb-get",{originalErrorMessage:t?.message});D.warn(e.message)}}}async function Re(e,t){try{const n=await Ae(),r=n.transaction(Se,"readwrite"),i=r.objectStore(Se);await i.put(t,Ne(e)),await r.done}catch(n){if(n instanceof s.g)D.warn(n.message);else{const e=ye.create("idb-set",{originalErrorMessage:n?.message});D.warn(e.message)}}}function Ne(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=1024,xe=30;class De{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Le(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=Pe();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>xe){const e=Ve(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){D.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Pe(),{heartbeatsToSend:t,unsentEntries:n}=Me(this._heartbeatsCache.heartbeats),r=(0,s.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return D.warn(e),""}}}function Pe(){const e=new Date;return e.toISOString().substring(0,10)}function Me(e,t=Oe){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Ue(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ue(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Le{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,s.zW)()&&(0,s.eX)().then(()=>!0).catch(()=>!1)}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await ke(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ue(e){return(0,s.Uj)(JSON.stringify({version:2,heartbeats:e})).length}function Ve(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(e){de(new r.uA("platform-logger",e=>new R(e),"PRIVATE")),de(new r.uA("heartbeat",e=>new De(e),"PRIVATE")),Ee(O,x,e),Ee(O,x,"esm2020"),Ee("fire-js","")}Fe("")},283:function(e,t,n){var r=n(9504),i=n(9039),s=n(4901),o=n(9297),a=n(3724),c=n(350).CONFIGURABLE,u=n(3706),l=n(1181),h=l.enforce,f=l.get,d=String,p=Object.defineProperty,g=r("".slice),m=r("".replace),y=r([].join),v=a&&!i(function(){return 8!==p(function(){},"length",{value:8}).length}),w=String(String).split("String"),_=e.exports=function(e,t,n){"Symbol("===g(d(t),0,7)&&(t="["+m(d(t),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!o(e,"name")||c&&e.name!==t)&&(a?p(e,"name",{value:t,configurable:!0}):e.name=t),v&&n&&o(n,"arity")&&e.length!==n.arity&&p(e,"length",{value:n.arity});try{n&&o(n,"constructor")&&n.constructor?a&&p(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(i){}var r=h(e);return o(r,"source")||(r.source=y(w,"string"==typeof t?t:"")),e};Function.prototype.toString=_(function(){return s(this)&&f(this).source||u(this)},"toString")},350:function(e,t,n){var r=n(3724),i=n(9297),s=Function.prototype,o=r&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,u=a&&(!r||r&&o(s,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:u}},397:function(e,t,n){var r=n(7751);e.exports=r("document","documentElement")},421:function(e){e.exports={}},456:function(e,t,n){var r=n(6518),i=n(4576),s=n(9504),o=n(4154),a=n(5169),c=s(1.1.toString),u=i.Uint8Array,l=!u||!u.prototype.toHex||!function(){try{var e=new u([255,255,255,255,255,255,255,255]);return"ffffffffffffffff"===e.toHex()}catch(t){return!1}}();u&&r({target:"Uint8Array",proto:!0,forced:l},{toHex:function(){o(this),a(this.buffer);for(var e="",t=0,n=this.length;t<n;t++){var r=c(this[t],16);e+=1===r.length?"0"+r:r}return e}})},507:function(e,t,n){var r=n(9565);e.exports=function(e,t,n){var i,s,o=n?e:e.iterator,a=e.next;while(!(i=r(a,o)).done)if(s=t(i.value),void 0!==s)return s}},531:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(8646),u=n(9462),l=n(9539),h=n(6395),f=n(684),d=n(4549),p=!h&&!f("flatMap",function(){}),g=!h&&!p&&d("flatMap",TypeError),m=h||p||g,y=u(function(){var e,t,n=this.iterator,r=this.mapper;while(1){if(t=this.inner)try{if(e=o(i(t.next,t.iterator)),!e.done)return e.value;this.inner=null}catch(s){l(n,"throw",s)}if(e=o(i(this.next,n)),this.done=!!e.done)return;try{this.inner=c(r(e.value,this.counter++),!1)}catch(s){l(n,"throw",s)}}});r({target:"Iterator",proto:!0,real:!0,forced:m},{flatMap:function(e){o(this);try{s(e)}catch(t){l(this,"throw",t)}return g?i(g,this,e):new y(a(this),{mapper:e,inner:null})}})},616:function(e,t,n){var r=n(9039);e.exports=!r(function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")})},655:function(e,t,n){var r=n(6955),i=String;e.exports=function(e){if("Symbol"===r(e))throw new TypeError("Cannot convert a Symbol value to a string");return i(e)}},679:function(e,t,n){var r=n(1625),i=TypeError;e.exports=function(e,t){if(r(t,e))return e;throw new i("Incorrect invocation")}},684:function(e){e.exports=function(e,t){var n="function"==typeof Iterator&&Iterator.prototype[e];if(n)try{n.call({next:null},t).next()}catch(r){return!0}}},741:function(e){var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},757:function(e,t,n){var r=n(7751),i=n(4901),s=n(1625),o=n(7040),a=Object;e.exports=o?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return i(t)&&s(t.prototype,a(e))}},798:function(e,t,n){n.d(t,{h1:function(){return u},uA:function(){return i}});n(8111),n(2489),n(1701),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(2455);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.cY;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(c(e))try{this.getOrInitializeService({instanceIdentifier:s})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries()){const e=this.normalizeInstanceIdentifier(i);n===e&&s.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:a(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function a(e){return e===s?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},851:function(e,t,n){var r=n(6955),i=n(5966),s=n(4117),o=n(6269),a=n(8227),c=a("iterator");e.exports=function(e){if(!s(e))return i(e,c)||i(e,"@@iterator")||o[r(e)]}},944:function(e){var t=TypeError;e.exports=function(e){var n=e&&e.alphabet;if(void 0===n||"base64"===n||"base64url"===n)return n||"base64";throw new t("Incorrect `alphabet` option")}},1072:function(e,t,n){var r=n(1828),i=n(8727);e.exports=Object.keys||function(e){return r(e,i)}},1108:function(e,t,n){var r=n(6955);e.exports=function(e){var t=r(e);return"BigInt64Array"===t||"BigUint64Array"===t}},1148:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("every",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{every:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return!s(t,function(t,r){if(!e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},1181:function(e,t,n){var r,i,s,o=n(8622),a=n(4576),c=n(34),u=n(6699),l=n(9297),h=n(7629),f=n(6119),d=n(421),p="Object already initialized",g=a.TypeError,m=a.WeakMap,y=function(e){return s(e)?i(e):r(e,{})},v=function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw new g("Incompatible receiver, "+e+" required");return n}};if(o||h.state){var w=h.state||(h.state=new m);w.get=w.get,w.has=w.has,w.set=w.set,r=function(e,t){if(w.has(e))throw new g(p);return t.facade=e,w.set(e,t),t},i=function(e){return w.get(e)||{}},s=function(e){return w.has(e)}}else{var _=f("state");d[_]=!0,r=function(e,t){if(l(e,_))throw new g(p);return t.facade=e,u(e,_,t),t},i=function(e){return l(e,_)?e[_]:{}},s=function(e){return l(e,_)}}e.exports={set:r,get:i,has:s,enforce:y,getterFor:v}},1241:function(e,t){t.A=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},1291:function(e,t,n){var r=n(741);e.exports=function(e){var t=+e;return t!==t||0===t?0:r(t)}},1385:function(e,t,n){var r=n(9539);e.exports=function(e,t,n){for(var i=e.length-1;i>=0;i--)if(void 0!==e[i])try{n=r(e[i].iterator,t,n)}catch(s){t="throw",n=s}if("throw"===t)throw n;return n}},1548:function(e,t,n){var r=n(4576),i=n(9039),s=n(9519),o=n(4215),a=r.structuredClone;e.exports=!!a&&!i(function(){if("DENO"===o&&s>92||"NODE"===o&&s>94||"BROWSER"===o&&s>97)return!1;var e=new ArrayBuffer(8),t=a(e,{transfer:[e]});return 0!==e.byteLength||8!==t.byteLength})},1549:function(e,t,n){n(6632)},1625:function(e,t,n){var r=n(9504);e.exports=r({}.isPrototypeOf)},1698:function(e,t,n){var r=n(6518),i=n(4204),s=n(9835),o=n(4916),a=!o("union")||!s("union");r({target:"Set",proto:!0,real:!0,forced:a},{union:i})},1701:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),u=n(6319),l=n(9539),h=n(684),f=n(4549),d=n(6395),p=!d&&!h("map",function(){}),g=!d&&!p&&f("map",TypeError),m=d||p||g,y=c(function(){var e=this.iterator,t=o(i(this.next,e)),n=this.done=!!t.done;if(!n)return u(e,this.mapper,[t.value,this.counter++],!0)});r({target:"Iterator",proto:!0,real:!0,forced:m},{map:function(e){o(this);try{s(e)}catch(t){l(this,"throw",t)}return g?i(g,this,e):new y(a(this),{mapper:e})}})},1767:function(e){e.exports=function(e){return{iterator:e,next:e.next,done:!1}}},1806:function(e,t,n){var r=n(6518),i=n(8551),s=n(2652),o=n(1767),a=[].push;r({target:"Iterator",proto:!0,real:!0},{toArray:function(){var e=[];return s(o(i(this)),a,{that:e,IS_RECORD:!0}),e}})},1828:function(e,t,n){var r=n(9504),i=n(9297),s=n(5397),o=n(9617).indexOf,a=n(421),c=r([].push);e.exports=function(e,t){var n,r=s(e),u=0,l=[];for(n in r)!i(a,n)&&i(r,n)&&c(l,n);while(t.length>u)i(r,n=t[u++])&&(~o(l,n)||c(l,n));return l}},2106:function(e,t,n){var r=n(283),i=n(4913);e.exports=function(e,t,n){return n.get&&r(n.get,t,{getter:!0}),n.set&&r(n.set,t,{setter:!0}),i.f(e,t,n)}},2140:function(e,t,n){var r=n(8227),i=r("toStringTag"),s={};s[i]="z",e.exports="[object z]"===String(s)},2195:function(e,t,n){var r=n(9504),i=r({}.toString),s=r("".slice);e.exports=function(e){return s(i(e),8,-1)}},2211:function(e,t,n){var r=n(9039);e.exports=!r(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},2303:function(e,t,n){var r=n(4576),i=n(9504),s=r.Uint8Array,o=r.SyntaxError,a=r.parseInt,c=Math.min,u=/[^\da-f]/i,l=i(u.exec),h=i("".slice);e.exports=function(e,t){var n=e.length;if(n%2!==0)throw new o("String should be an even number of characters");var r=t?c(t.length,n/2):n/2,i=t||new s(r),f=0,d=0;while(d<r){var p=h(e,f,f+=2);if(l(u,p))throw new o("String should only contain hex characters");i[d++]=a(p,16)}return{bytes:i,read:f}}},2360:function(e,t,n){var r,i=n(8551),s=n(6801),o=n(8727),a=n(421),c=n(397),u=n(4055),l=n(6119),h=">",f="<",d="prototype",p="script",g=l("IE_PROTO"),m=function(){},y=function(e){return f+p+h+e+f+"/"+p+h},v=function(e){e.write(y("")),e.close();var t=e.parentWindow.Object;return e=null,t},w=function(){var e,t=u("iframe"),n="java"+p+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(y("document.F=Object")),e.close(),e.F},_=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}_="undefined"!=typeof document?document.domain&&r?v(r):w():v(r);var e=o.length;while(e--)delete _[d][o[e]];return _()};a[g]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(m[d]=i(e),n=new m,m[d]=null,n[g]=e):n=_(),void 0===t?n:s.f(n,t)}},2455:function(e,t,n){n.d(t,{cY:function(){return _},FA:function(){return $},g:function(){return B},u:function(){return l},Uj:function(){return u},Fy:function(){return T},tD:function(){return Y},bD:function(){return K},hp:function(){return X},T9:function(){return v},Tj:function(){return m},yU:function(){return y},XA:function(){return w},mS:function(){return h},Ku:function(){return te},ZQ:function(){return R},sr:function(){return D},zJ:function(){return b},c1:function(){return x},Im:function(){return q},lT:function(){return M},zW:function(){return V},jZ:function(){return N},lV:function(){return P},nr:function(){return L},Ov:function(){return U},gE:function(){return E},Am:function(){return W},I9:function(){return Q},P1:function(){return k},eX:function(){return F}});n(4114),n(8111),n(7588),n(4979),n(4603),n(7566),n(8721);const r=()=>{},i=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,u=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,f=63&c;a||(f=64,s||(h=64)),r.push(n[u],n[l],n[h],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length,o=s?n[e.charAt(i)]:0;++i;const c=i<e.length,u=c?n[e.charAt(i)]:64;++i;const l=i<e.length,h=l?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==u||null==h)throw new a;const f=t<<2|o>>4;if(r.push(f),64!==u){const e=o<<4&240|u>>2;if(r.push(e),64!==h){const e=u<<6&192|h;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){const t=i(e);return o.encodeByteArray(t,!0)},u=function(e){return c(e).replace(/\./g,"")},l=function(e){try{return o.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function h(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=()=>h().__FIREBASE_DEFAULTS__,d=()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",VUE_APP_FIREBASE_API_KEY:"AIzaSyAcjyDX_tAYYxWxP8Y1N1CBh_XwVf4XtgM",VUE_APP_FIREBASE_APP_ID:"1:903823177785:web:68340bb3d3a6f6eb6775e8",VUE_APP_FIREBASE_AUTH_DOMAIN:"classroom-b81c6.firebaseapp.com",VUE_APP_FIREBASE_MESSAGING_SENDER_ID:"903823177785",VUE_APP_FIREBASE_PROJECT_ID:"classroom-b81c6",VUE_APP_FIREBASE_STORAGE_BUCKET:"classroom-b81c6.firebasestorage.app",BASE_URL:"/ClassRoom/"}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},p=()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&l(e[1]);return t&&JSON.parse(t)},g=()=>{try{return r()||f()||d()||p()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},m=e=>g()?.emulatorHosts?.[e],y=e=>{const t=m(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},v=()=>g()?.config,w=e=>g()?.[`_${e}`];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e){try{const t=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return t.endsWith(".cloudworkstations.dev")}catch{return!1}}async function E(e){const t=await fetch(e,{credentials:"include"});return t.ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e},a="";return[u(JSON.stringify(n)),u(JSON.stringify(o)),a].join(".")}const I={};function S(){const e={prod:[],emulator:[]};for(const t of Object.keys(I))I[t]?e.emulator.push(t):e.prod.push(t);return e}function C(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let A=!1;function k(e,t){if("undefined"===typeof window||"undefined"===typeof document||!b(window.location.host)||I[e]===t||I[e]||A)return;function n(e){return`__firebase__banner__${e}`}I[e]=t;const r="__firebase__banner",i=S(),s=i.prod.length>0;function o(){const e=document.getElementById(r);e&&e.remove()}function a(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}function c(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}function u(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{A=!0,o()},e}function l(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}function h(){const e=C(r),t=n("text"),i=document.getElementById(t)||document.createElement("span"),o=n("learnmore"),h=document.getElementById(o)||document.createElement("a"),f=n("preprendIcon"),d=document.getElementById(f)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;a(t),l(h,o);const n=u();c(d,f),t.append(d,i,h,n),document.body.appendChild(t)}s?(i.innerText="Preview backend disconnected.",d.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(d.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',i.innerText="Preview backend running in this workspace."),i.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",h):h()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function N(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(R())}function O(){const e=g()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(t){return!1}}function x(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function D(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function P(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function M(){const e=R();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function L(){return!O()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function U(){return!O()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function V(){try{return"object"===typeof indexedDB}catch(e){return!1}}function F(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const j="FirebaseError";class B extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=j,Object.setPrototypeOf(this,B.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$.prototype.create)}}class ${constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?z(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new B(r,o,n);return a}}function z(e,t){return e.replace(H,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}const H=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function K(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(G(n)&&G(s)){if(!K(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function G(e){return null!==e&&"object"===typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function W(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Q(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function X(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e,t){const n=new J(e,t);return n.subscribe.bind(n)}class J{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=Z(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=ee),void 0===r.error&&(r.error=ee),void 0===r.complete&&(r.complete=ee);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Z(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function ee(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function te(e){return e&&e._delegate?e._delegate:e}},2475:function(e,t,n){var r=n(6518),i=n(8527),s=n(4916),o=!s("isSupersetOf",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isSupersetOf:i})},2489:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),u=n(6319),l=n(6395),h=n(9539),f=n(684),d=n(4549),p=!l&&!f("filter",function(){}),g=!l&&!p&&d("filter",TypeError),m=l||p||g,y=c(function(){var e,t,n,r=this.iterator,s=this.predicate,a=this.next;while(1){if(e=o(i(a,r)),t=this.done=!!e.done,t)return;if(n=e.value,u(r,s,[n,this.counter++],!0))return n}});r({target:"Iterator",proto:!0,real:!0,forced:m},{filter:function(e){o(this);try{s(e)}catch(t){h(this,"throw",t)}return g?i(g,this,e):new y(a(this),{predicate:e})}})},2529:function(e){e.exports=function(e,t){return{value:e,done:t}}},2603:function(e,t,n){var r=n(655);e.exports=function(e,t){return void 0===e?arguments.length<2?"":t:r(e)}},2652:function(e,t,n){var r=n(6080),i=n(9565),s=n(8551),o=n(6823),a=n(4209),c=n(6198),u=n(1625),l=n(81),h=n(851),f=n(9539),d=TypeError,p=function(e,t){this.stopped=e,this.result=t},g=p.prototype;e.exports=function(e,t,n){var m,y,v,w,_,b,E,T=n&&n.that,I=!(!n||!n.AS_ENTRIES),S=!(!n||!n.IS_RECORD),C=!(!n||!n.IS_ITERATOR),A=!(!n||!n.INTERRUPTED),k=r(t,T),R=function(e){return m&&f(m,"normal"),new p(!0,e)},N=function(e){return I?(s(e),A?k(e[0],e[1],R):k(e[0],e[1])):A?k(e,R):k(e)};if(S)m=e.iterator;else if(C)m=e;else{if(y=h(e),!y)throw new d(o(e)+" is not iterable");if(a(y)){for(v=0,w=c(e);w>v;v++)if(_=N(e[v]),_&&u(g,_))return _;return new p(!1)}m=l(e,y)}b=S?e.next:m.next;while(!(E=i(b,m)).done){try{_=N(E.value)}catch(O){f(m,"throw",O)}if("object"==typeof _&&_&&u(g,_))return _}return new p(!1)}},2777:function(e,t,n){var r=n(9565),i=n(34),s=n(757),o=n(5966),a=n(4270),c=n(8227),u=TypeError,l=c("toPrimitive");e.exports=function(e,t){if(!i(e)||s(e))return e;var n,c=o(e,l);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!i(n)||s(n))return n;throw new u("Can't convert object to primitive value")}return void 0===t&&(t="number"),a(e,t)}},2787:function(e,t,n){var r=n(9297),i=n(4901),s=n(8981),o=n(6119),a=n(2211),c=o("IE_PROTO"),u=Object,l=u.prototype;e.exports=a?u.getPrototypeOf:function(e){var t=s(e);if(r(t,c))return t[c];var n=t.constructor;return i(n)&&t instanceof n?n.prototype:t instanceof u?l:null}},2796:function(e,t,n){var r=n(9039),i=n(4901),s=/#|\.prototype\./,o=function(e,t){var n=c[a(e)];return n===l||n!==u&&(i(t)?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(s,".").toLowerCase()},c=o.data={},u=o.NATIVE="N",l=o.POLYFILL="P";e.exports=o},2804:function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t+"+/",r=t+"-_",i=function(e){for(var t={},n=0;n<64;n++)t[e.charAt(n)]=n;return t};e.exports={i2c:n,c2i:i(n),i2cUrl:r,c2iUrl:i(r)}},2812:function(e){var t=TypeError;e.exports=function(e,n){if(e<n)throw new t("Not enough arguments");return e}},2832:function(e,t,n){n.d(t,{rJ:function(){return sc},H9:function(){return oc},x7:function(){return Gc},aU:function(){return fc},aQ:function(){return Xc},BN:function(){return Qc}});n(4114),n(6573),n(8100),n(7936),n(8111),n(1148),n(2489),n(116),n(7588),n(1701),n(8237),n(3579),n(1806),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(9577),n(1549),n(9797),n(9631),n(5623),n(4979),n(4603),n(7566),n(8721);var r,i,s=n(262),o=n(798),a=n(6189),c=n(2455),u="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},l={};(function(){var e;
/** @license
         Copyright The Closure Library Authors.
         SPDX-License-Identifier: Apache-2.0
         */function t(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function o(e,t,n){n||(n=0);var r=Array(16);if("string"===typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^n&(i^s))+r[0]+3614090360&4294967295;t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[1]+3905402710&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[2]+606105819&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[3]+3250441966&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[4]+4118548399&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[5]+1200080426&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[6]+2821735955&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[7]+4249261313&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[8]+1770035416&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[9]+2336552879&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[10]+4294925233&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[11]+2304563134&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[12]+1804603682&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[13]+4254626195&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[14]+2792965006&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[15]+1236535329&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(i^s&(n^i))+r[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[6]+3225465664&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[0]+3921069994&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[10]+38016083&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[4]+3889429448&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[14]+3275163606&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[8]+1163531501&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[2]+4243563512&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[12]+2368359562&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(n^i^s)+r[5]+4294588738&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[8]+2272392833&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[11]+1839030562&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[14]+4259657740&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[1]+2763975236&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[4]+1272893353&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[7]+4139469664&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[10]+3200236656&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[13]+681279174&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[0]+3936430074&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[3]+3572445317&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[6]+76029189&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[9]+3654602809&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[12]+3873151461&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[15]+530742520&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[2]+3299628645&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(i^(n|~s))+r[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[7]+1126891415&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[5]+4237533241&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[3]+2399980690&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[1]+2240044497&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[15]+4264355552&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[13]+1309151649&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[11]+3174756917&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function a(e,t){var n=u;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}function c(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}t(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},s.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=this.B,i=this.h,s=0;s<t;){if(0==i)for(;s<=n;)o(this,e,s),s+=this.blockSize;if("string"===typeof e){for(;s<t;)if(r[i++]=e.charCodeAt(s++),i==this.blockSize){o(this,r),i=0;break}}else for(;s<t;)if(r[i++]=e[s++],i==this.blockSize){o(this,r),i=0;break}}this.h=i,this.o+=t},s.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var u={};function h(e){return-128<=e&&128>e?a(e,function(e){return new c([0|e],0>e?-1:0)}):new c([0|e],0>e?-1:0)}function f(e){if(isNaN(e)||!isFinite(e))return p;if(0>e)return w(f(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new c(t,0)}function d(e,t){if(0==e.length)throw Error("number format error: empty string");if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if("-"==e.charAt(0))return w(d(e.substring(1),t));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=f(Math.pow(t,8)),r=p,i=0;i<e.length;i+=8){var s=Math.min(8,e.length-i),o=parseInt(e.substring(i,i+s),t);8>s?(s=f(Math.pow(t,s)),r=r.j(s).add(f(o))):(r=r.j(n),r=r.add(f(o)))}return r}var p=h(0),g=h(1),m=h(16777216);function y(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function v(e){return-1==e.h}function w(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new c(n,~e.h).add(g)}function _(e,t){return e.add(w(t))}function b(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function E(e,t){this.g=e,this.h=t}function T(e,t){if(y(t))throw Error("division by zero");if(y(e))return new E(p,p);if(v(e))return t=T(w(e),t),new E(w(t.g),w(t.h));if(v(t))return t=T(e,w(t)),new E(w(t.g),t.h);if(30<e.g.length){if(v(e)||v(t))throw Error("slowDivide_ only works with positive integers.");for(var n=g,r=t;0>=r.l(e);)n=I(n),r=I(r);var i=S(n,1),s=S(r,1);for(r=S(r,2),n=S(n,2);!y(r);){var o=s.add(r);0>=o.l(e)&&(i=i.add(n),s=o),r=S(r,1),n=S(n,1)}return t=_(e,i.j(t)),new E(i,t)}for(i=p;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),s=f(n),o=s.j(t);v(o)||0<o.l(e);)n-=r,s=f(n),o=s.j(t);y(s)&&(s=g),i=i.add(s),e=_(e,o)}return new E(i,e)}function I(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new c(n,e.h)}function S(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,i=[],s=0;s<r;s++)i[s]=0<t?e.i(s+n)>>>t|e.i(s+n+1)<<32-t:e.i(s+n);return new c(i,e.h)}e=c.prototype,e.m=function(){if(v(this))return-w(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.i(n);e+=(0<=r?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(y(this))return"0";if(v(this))return"-"+w(this).toString(e);for(var t=f(Math.pow(e,6)),n=this,r="";;){var i=T(n,t).g;n=_(n,i.j(t));var s=((0<n.g.length?n.g[0]:n.h)>>>0).toString(e);if(n=i,y(n))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return e=_(this,e),v(e)?-1:y(e)?0:1},e.abs=function(){return v(this)?w(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,i=0;i<=t;i++){var s=r+(65535&this.i(i))+(65535&e.i(i)),o=(s>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);r=o>>>16,s&=65535,o&=65535,n[i]=o<<16|s}return new c(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(y(this)||y(e))return p;if(v(this))return v(e)?w(this).j(w(e)):w(w(this).j(e));if(v(e))return w(this.j(w(e)));if(0>this.l(m)&&0>e.l(m))return f(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<e.g.length;i++){var s=this.i(r)>>>16,o=65535&this.i(r),a=e.i(i)>>>16,u=65535&e.i(i);n[2*r+2*i]+=o*u,b(n,2*r+2*i),n[2*r+2*i+1]+=s*u,b(n,2*r+2*i+1),n[2*r+2*i+1]+=o*a,b(n,2*r+2*i+1),n[2*r+2*i+2]+=s*a,b(n,2*r+2*i+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new c(n,0)},e.A=function(e){return T(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new c(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new c(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new c(n,this.h^e.h)},s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,i=l.Md5=s,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=d,r=l.Integer=c}).apply("undefined"!==typeof u?u:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});var h,f,d,p,g,m,y,v,w="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},_={};(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e};function n(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof w&&w];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}var r=n(this);function i(e,n){if(n)e:{var i=r;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}e=e[e.length-1],s=i[e],n=n(s),n!=s&&null!=n&&t(i,e,{configurable:!0,writable:!0,value:n})}}function s(e,t){e instanceof String&&(e+="");var n=0,r=!1,i={next:function(){if(!r&&n<e.length){var i=n++;return{value:t(i,e[i]),done:!1}}return r=!0,{done:!0,value:void 0}}};return i[Symbol.iterator]=function(){return i},i}i("Array.prototype.values",function(e){return e||function(){return s(this,function(e,t){return t})}});
/** @license
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */
var o=o||{},a=this||self;function c(e){var t=typeof e;return t="object"!=t?t:e?Array.isArray(e)?"array":t:"null","array"==t||"object"==t&&"number"==typeof e.length}function u(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function l(e,t,n){return e.call.apply(e.bind,arguments)}function b(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function E(e,t,n){return E=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?l:b,E.apply(null,arguments)}function T(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function I(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function S(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function C(e,t){for(let n=1;n<arguments.length;n++){const t=arguments[n];if(c(t)){const n=e.length||0,r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}class A{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function k(e){return/^[\s\xa0]*$/.test(e)}function R(){var e=a.navigator;return e&&(e=e.userAgent)?e:""}function N(e){return N[" "](e),e}N[" "]=function(){};var O=-1!=R().indexOf("Gecko")&&!(-1!=R().toLowerCase().indexOf("webkit")&&-1==R().indexOf("Edge"))&&!(-1!=R().indexOf("Trident")||-1!=R().indexOf("MSIE"))&&-1==R().indexOf("Edge");function x(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function D(e,t){for(const n in e)t.call(void 0,e[n],n,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const M="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function L(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<M.length;t++)n=M[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function U(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function V(e){a.setTimeout(()=>{throw e},0)}function F(){var e=q;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class j{constructor(){this.h=this.g=null}add(e,t){const n=B.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var B=new A(()=>new $,e=>e.reset());class ${constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let z,H=!1,q=new j,K=()=>{const e=a.Promise.resolve(void 0);z=()=>{e.then(G)}};var G=()=>{for(var e;e=F();){try{e.h.call(e.g)}catch(n){V(n)}var t=B;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}H=!1};function W(){this.s=this.s,this.C=this.C}function Q(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}W.prototype.s=!1,W.prototype.ma=function(){this.s||(this.s=!0,this.N())},W.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},Q.prototype.h=function(){this.defaultPrevented=!0};var X=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};a.addEventListener("test",e,t),a.removeEventListener("test",e,t)}catch(n){}return e}();function Y(e,t){if(Q.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(O){e:{try{N(t.nodeName);var i=!0;break e}catch(s){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"===typeof e.pointerType?e.pointerType:J[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Y.aa.h.call(this)}}I(Y,Q);var J={2:"touch",3:"pen",4:"mouse"};Y.prototype.h=function(){Y.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Z="closure_listenable_"+(1e6*Math.random()|0),ee=0;function te(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++ee,this.da=this.fa=!1}function ne(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function re(e){this.src=e,this.g={},this.h=0}function ie(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(ne(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function se(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}re.prototype.add=function(e,t,n,r,i){var s=e.toString();e=this.g[s],e||(e=this.g[s]=[],this.h++);var o=se(e,t,r,i);return-1<o?(t=e[o],n||(t.fa=!1)):(t=new te(t,this.src,s,!!r,i),t.fa=n,e.push(t)),t};var oe="closure_lm_"+(1e6*Math.random()|0),ae={};function ce(e,t,n,r,i){if(r&&r.once)return he(e,t,n,r,i);if(Array.isArray(t)){for(var s=0;s<t.length;s++)ce(e,t[s],n,r,i);return null}return n=ve(n),e&&e[Z]?e.K(t,n,u(r)?!!r.capture:!!r,i):ue(e,t,n,!1,r,i)}function ue(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=u(i)?!!i.capture:!!i,a=me(e);if(a||(e[oe]=a=new re(e)),n=a.add(t,n,r,o,s),n.proxy)return n;if(r=le(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)X||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(pe(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function le(){function e(n){return t.call(e.src,e.listener,n)}const t=ge;return e}function he(e,t,n,r,i){if(Array.isArray(t)){for(var s=0;s<t.length;s++)he(e,t[s],n,r,i);return null}return n=ve(n),e&&e[Z]?e.L(t,n,u(r)?!!r.capture:!!r,i):ue(e,t,n,!0,r,i)}function fe(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)fe(e,t[s],n,r,i);else r=u(r)?!!r.capture:!!r,n=ve(n),e&&e[Z]?(e=e.i,t=String(t).toString(),t in e.g&&(s=e.g[t],n=se(s,n,r,i),-1<n&&(ne(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete e.g[t],e.h--)))):e&&(e=me(e))&&(t=e.g[t.toString()],e=-1,t&&(e=se(t,n,r,i)),(n=-1<e?t[e]:null)&&de(n))}function de(e){if("number"!==typeof e&&e&&!e.da){var t=e.src;if(t&&t[Z])ie(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(pe(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=me(t))?(ie(n,e),0==n.h&&(n.src=null,t[oe]=null)):ne(e)}}}function pe(e){return e in ae?ae[e]:ae[e]="on"+e}function ge(e,t){if(e.da)e=!0;else{t=new Y(t,this);var n=e.listener,r=e.ha||e.src;e.fa&&de(e),e=n.call(r,t)}return e}function me(e){return e=e[oe],e instanceof re?e:null}var ye="__closure_events_fn_"+(1e9*Math.random()>>>0);function ve(e){return"function"===typeof e?e:(e[ye]||(e[ye]=function(t){return e.handleEvent(t)}),e[ye])}function we(){W.call(this),this.i=new re(this),this.M=this,this.F=null}function _e(e,t){var n,r=e.F;if(r)for(n=[];r;r=r.F)n.push(r);if(e=e.M,r=t.type||t,"string"===typeof t)t=new Q(t,e);else if(t instanceof Q)t.target=t.target||e;else{var i=t;t=new Q(r,e),L(t,i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=be(o,r,!0,t)&&i}if(o=t.g=e,i=be(o,r,!0,t)&&i,i=be(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)o=t.g=n[s],i=be(o,r,!1,t)&&i}function be(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&ie(e.i,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}function Ee(e,t,n){if("function"===typeof e)n&&(e=E(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=E(e.handleEvent,e)}return 2147483647<Number(t)?-1:a.setTimeout(e,t||0)}function Te(e){e.g=Ee(()=>{e.g=null,e.i&&(e.i=!1,Te(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}I(we,W),we.prototype[Z]=!0,we.prototype.removeEventListener=function(e,t,n,r){fe(this,e,t,n,r)},we.prototype.N=function(){if(we.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)ne(n[r]);delete t.g[e],t.h--}}this.F=null},we.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},we.prototype.L=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Ie extends W{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Te(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Se(e){W.call(this),this.h=e,this.g={}}I(Se,W);var Ce=[];function Ae(e){x(e.g,function(e,t){this.g.hasOwnProperty(t)&&de(e)},e),e.g={}}Se.prototype.N=function(){Se.aa.N.call(this),Ae(this)},Se.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ke=a.JSON.stringify,Re=a.JSON.parse,Ne=class{stringify(e){return a.JSON.stringify(e,void 0)}parse(e){return a.JSON.parse(e,void 0)}};function Oe(){}function xe(e){return e.h||(e.h=e.i())}function De(){}Oe.prototype.h=null;var Pe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Me(){Q.call(this,"d")}function Le(){Q.call(this,"c")}I(Me,Q),I(Le,Q);var Ue={},Ve=null;function Fe(){return Ve=Ve||new we}function je(e){Q.call(this,Ue.La,e)}function Be(e){const t=Fe();_e(t,new je(t))}function $e(e,t){Q.call(this,Ue.STAT_EVENT,e),this.stat=t}function ze(e){const t=Fe();_e(t,new $e(t,e))}function He(e,t){Q.call(this,Ue.Ma,e),this.size=t}function qe(e,t){if("function"!==typeof e)throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){e()},t)}function Ke(){this.g=!0}function Ge(e,t,n,r,i,s){e.info(function(){if(e.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+u+"&":o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}function We(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}function Qe(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+Ye(e,n)+(r?" "+r:"")})}function Xe(e,t){e.info(function(){return"TIMEOUT: "+t})}function Ye(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return ke(n)}catch(a){return t}}Ue.La="serverreachability",I(je,Q),Ue.STAT_EVENT="statevent",I($e,Q),Ue.Ma="timingevent",I(He,Q),Ke.prototype.xa=function(){this.g=!1},Ke.prototype.info=function(){};var Je,Ze={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},et={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function tt(){}function nt(e,t,n,r){this.j=e,this.i=t,this.l=n,this.R=r||1,this.U=new Se(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new rt}function rt(){this.i=null,this.g="",this.h=!1}I(tt,Oe),tt.prototype.g=function(){return new XMLHttpRequest},tt.prototype.i=function(){return{}},Je=new tt;var it={},st={};function ot(e,t,n){e.L=1,e.v=Mt(Nt(t)),e.m=n,e.P=!0,at(e,null)}function at(e,t){e.F=Date.now(),lt(e),e.A=Nt(e.v);var n=e.A,r=e.R;Array.isArray(r)||(r=[String(r)]),Wt(n.i,"t",r),e.C=0,n=e.j.J,e.h=new rt,e.g=Bn(e.j,n?t:null,!e.m),0<e.O&&(e.M=new Ie(E(e.Y,e,e.g),e.O)),t=e.U,n=e.g,r=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(Ce[0]=i.toString()),i=Ce);for(var s=0;s<i.length;s++){var o=ce(n,i[s],r||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?P(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),Be(),Ge(e.i,e.u,e.A,e.l,e.R,e.m)}function ct(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.j.Ca)}function ut(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?st:(n=Number(t.substring(n,r)),isNaN(n)?it:(r+=1,r+n>t.length?st:(t=t.slice(r,r+n),e.C=r+n,t)))}function lt(e){e.S=Date.now()+e.I,ht(e,e.I)}function ht(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=qe(E(e.ba,e),t)}function ft(e){e.B&&(a.clearTimeout(e.B),e.B=null)}function dt(e){0==e.j.G||e.J||Ln(e.j,e)}function pt(e){ft(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,Ae(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function gt(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||_t(n.h,e)))if(!e.K&&_t(n.h,e)&&3==n.G){try{var r=n.Da.g.parse(t)}catch(u){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;Mn(n),In(n)}xn(n),ze(18)}}else n.za=i[1],0<n.za-n.T&&37500>i[2]&&n.F&&0==n.v&&!n.C&&(n.C=qe(E(n.Za,n),6e3));if(1>=wt(n.h)&&n.ca){try{n.ca()}catch(u){}n.ca=void 0}}else Vn(n,11)}else if((e.K||n.g==e)&&Mn(n),!k(t))for(i=n.Da.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.K=u[1],n.ia=u[2];const t=u[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const i=u[4];null!=i&&(n.Aa=i,n.j.info("SVER="+n.Aa));const l=u[5];null!=l&&"number"===typeof l&&0<l&&(r=1.5*l,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(bt(s,s.h),s.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.ya=e,Pt(r.I,r.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms")),r=n;var o=e;if(r.qa=jn(r,r.J?r.ia:null,r.W),o.K){Et(r.h,o);var a=o,c=r.L;c&&(a.I=c),a.B&&(ft(a),lt(a)),r.g=o}else On(r);0<n.i.length&&Cn(n)}else"stop"!=u[0]&&"close"!=u[0]||Vn(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?Vn(n,7):Tn(n):"noop"!=u[0]&&n.l&&n.l.ta(u),n.v=0)}Be(4)}catch(u){}}nt.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==vn(e)?t.j():this.Y(e)},nt.prototype.Y=function(e){try{if(e==this.g)e:{const f=vn(this.g);var t=this.g.Ba();const d=this.g.Z();if(!(3>f)&&(3!=f||this.g&&(this.h.h||this.g.oa()||wn(this.g)))){this.J||4!=f||7==t||Be(8==t||0>=d?3:2),ft(this);var n=this.g.Z();this.X=n;t:if(ct(this)){var r=wn(this.g);e="";var i=r.length,s=4==vn(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){pt(this),dt(this);var o="";break t}this.h.i=new a.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:!(s&&t==i-1)});r.length=0,this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.oa();if(this.o=200==n,We(this.i,this.u,this.A,this.l,this.R,f,n),this.o){if(this.T&&!this.K){t:{if(this.g){var c,u=this.g;if((c=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(c)){var l=c;break t}}l=null}if(!(n=l)){this.o=!1,this.s=3,ze(12),pt(this),dt(this);break e}Qe(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,gt(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<o.length;){if(e=ut(this,o),e==st){4==f&&(this.s=4,ze(14),n=!1),Qe(this.i,this.l,null,"[Incomplete Response]");break}if(e==it){this.s=4,ze(15),Qe(this.i,this.l,o,"[Invalid Chunk]"),n=!1;break}Qe(this.i,this.l,e,null),gt(this,e)}if(ct(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=f||0!=o.length||this.h.h||(this.s=1,ze(16),n=!1),this.o=this.o&&n,n){if(0<o.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+o.length),Dn(h),h.M=!0,ze(11))}}else Qe(this.i,this.l,o,"[Invalid Chunked Response]"),pt(this),dt(this)}else Qe(this.i,this.l,o,null),gt(this,o);4==f&&pt(this),this.o&&!this.J&&(4==f?Ln(this.j,this):(this.o=!1,lt(this)))}else _n(this.g),400==n&&0<o.indexOf("Unknown SID")?(this.s=3,ze(12)):(this.s=0,ze(13)),pt(this),dt(this)}}}catch(f){}},nt.prototype.cancel=function(){this.J=!0,pt(this)},nt.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(Xe(this.i,this.A),2!=this.L&&(Be(),ze(17)),pt(this),this.s=2,dt(this)):ht(this,this.S-e)};var mt=class{constructor(e,t){this.g=e,this.map=t}};function yt(e){this.l=e||10,a.PerformanceNavigationTiming?(e=a.performance.getEntriesByType("navigation"),e=0<e.length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol)):e=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function vt(e){return!!e.h||!!e.g&&e.g.size>=e.j}function wt(e){return e.h?1:e.g?e.g.size:0}function _t(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function bt(e,t){e.g?e.g.add(t):e.h=t}function Et(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Tt(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return S(e.i)}function It(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!==typeof Map&&e instanceof Map||"undefined"!==typeof Set&&e instanceof Set)return Array.from(e.values());if("string"===typeof e)return e.split("");if(c(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}function St(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!==typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!==typeof Set&&e instanceof Set)){if(c(e)||"string"===typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}function Ct(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(c(e)||"string"===typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=St(e),r=It(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}yt.prototype.cancel=function(){if(this.i=Tt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var At=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kt(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function Rt(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof Rt){this.h=e.h,Ot(this,e.j),this.o=e.o,this.g=e.g,xt(this,e.s),this.l=e.l;var t=e.i,n=new Ht;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),Dt(this,n),this.m=e.m}else e&&(t=String(e).match(At))?(this.h=!1,Ot(this,t[1]||"",!0),this.o=Lt(t[2]||""),this.g=Lt(t[3]||"",!0),xt(this,t[4]),this.l=Lt(t[5]||"",!0),Dt(this,t[6]||"",!0),this.m=Lt(t[7]||"")):(this.h=!1,this.i=new Ht(null,this.h))}function Nt(e){return new Rt(e)}function Ot(e,t,n){e.j=n?Lt(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function xt(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function Dt(e,t,n){t instanceof Ht?(e.i=t,Xt(e.i,e.h)):(n||(t=Ut(t,$t)),e.i=new Ht(t,e.h))}function Pt(e,t,n){e.i.set(t,n)}function Mt(e){return Pt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Lt(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Ut(e,t,n){return"string"===typeof e?(e=encodeURI(e).replace(t,Vt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Vt(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(15&e).toString(16)}Rt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(Ut(t,Ft,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(Ut(t,Ft,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.s,null!=n&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(Ut(n,"/"==n.charAt(0)?Bt:jt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",Ut(n,zt)),e.join("")};var Ft=/[#\/\?@]/g,jt=/[#\?:]/g,Bt=/[#\?]/g,$t=/[#\?@]/g,zt=/#/g;function Ht(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function qt(e){e.g||(e.g=new Map,e.h=0,e.i&&kt(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function Kt(e,t){qt(e),t=Qt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Gt(e,t){return qt(e),t=Qt(e,t),e.g.has(t)}function Wt(e,t,n){Kt(e,t),0<n.length&&(e.i=null,e.g.set(Qt(e,t),S(n)),e.h+=n.length)}function Qt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Xt(e,t){t&&!e.j&&(qt(e),e.i=null,e.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(Kt(this,t),Wt(this,n,e))},e)),e.j=t}function Yt(e,t){const n=new Ke;if(a.Image){const r=new Image;r.onload=T(Zt,n,"TestLoadImage: loaded",!0,t,r),r.onerror=T(Zt,n,"TestLoadImage: error",!1,t,r),r.onabort=T(Zt,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=T(Zt,n,"TestLoadImage: timeout",!1,t,r),a.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}function Jt(e,t){const n=new Ke,r=new AbortController,i=setTimeout(()=>{r.abort(),Zt(n,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:r.signal}).then(e=>{clearTimeout(i),e.ok?Zt(n,"TestPingServer: ok",!0,t):Zt(n,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),Zt(n,"TestPingServer: error",!1,t)})}function Zt(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function en(){this.g=new Ne}function tn(e,t,n){const r=n||"";try{Ct(e,function(e,n){let i=e;u(e)&&(i=ke(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function nn(e){this.l=e.Ub||null,this.j=e.eb||!1}function rn(e,t){we.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function sn(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function on(e){e.readyState=4,e.l=null,e.j=null,e.v=null,an(e)}function an(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function cn(e){let t="";return x(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function un(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=cn(n),"string"===typeof e?null!=n&&encodeURIComponent(String(n)):Pt(e,t,n))}function ln(e){we.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}e=Ht.prototype,e.add=function(e,t){qt(this),this.i=null,e=Qt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){qt(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.na=function(){qt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},e.V=function(e){qt(this);let t=[];if("string"===typeof e)Gt(this,e)&&(t=t.concat(this.g.get(Qt(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return qt(this),this.i=null,e=Qt(this,e),Gt(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e?(e=this.V(e),0<e.length?String(e[0]):t):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const s=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")},I(nn,Oe),nn.prototype.g=function(){return new rn(this.l,this.j)},nn.prototype.i=function(e){return function(){return e}}({}),I(rn,we),e=rn.prototype,e.open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,an(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||a).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,on(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,an(this)),this.g&&(this.readyState=3,an(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if("undefined"!==typeof a.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;sn(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?on(this):an(this),3==this.readyState&&sn(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,on(this))},e.Qa=function(e){this.g&&(this.response=e,on(this))},e.ga=function(){this.g&&on(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(rn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),I(ln,we);var hn=/^https?$/i,fn=["POST","PUT"];function dn(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,pn(e),mn(e)}function pn(e){e.A||(e.A=!0,_e(e,"complete"),_e(e,"error"))}function gn(e){if(e.h&&"undefined"!=typeof o&&(!e.v[1]||4!=vn(e)||2!=e.Z()))if(e.u&&4==vn(e))Ee(e.Ea,0,e);else if(_e(e,"readystatechange"),4==vn(e)){e.h=!1;try{const o=e.Z();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===o){var i=String(e.D).match(At)[1]||null;!i&&a.self&&a.self.location&&(i=a.self.location.protocol.slice(0,-1)),r=!hn.test(i?i.toLowerCase():"")}n=r}if(n)_e(e,"complete"),_e(e,"success");else{e.m=6;try{var s=2<vn(e)?e.g.statusText:""}catch(c){s=""}e.l=s+" ["+e.Z()+"]",pn(e)}}finally{mn(e)}}}function mn(e,t){if(e.g){yn(e);const r=e.g,i=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||_e(e,"ready");try{r.onreadystatechange=i}catch(n){}}}function yn(e){e.I&&(a.clearTimeout(e.I),e.I=null)}function vn(e){return e.g?e.g.readyState:0}function wn(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function _n(e){const t={};e=(e.g&&2<=vn(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(k(e[r]))continue;var n=U(e[r]);const i=n[0];if(n=n[1],"string"!==typeof n)continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}D(t,function(e){return e.join(", ")})}function bn(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function En(e){this.Aa=0,this.i=[],this.j=new Ke,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=bn("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=bn("baseRetryDelayMs",5e3,e),this.cb=bn("retryDelaySeedMs",1e4,e),this.Wa=bn("forwardChannelMaxRetries",2,e),this.wa=bn("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new yt(e&&e.concurrentRequestLimit),this.Da=new en,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function Tn(e){if(Sn(e),3==e.G){var t=e.U++,n=Nt(e.I);if(Pt(n,"SID",e.K),Pt(n,"RID",t),Pt(n,"TYPE","terminate"),Rn(e,n),t=new nt(e,e.j,t),t.L=2,t.v=Mt(Nt(n)),n=!1,a.navigator&&a.navigator.sendBeacon)try{n=a.navigator.sendBeacon(t.v.toString(),"")}catch(r){}!n&&a.Image&&((new Image).src=t.v,n=!0),n||(t.g=Bn(t.j,null),t.g.ea(t.v)),t.F=Date.now(),lt(t)}Fn(e)}function In(e){e.g&&(Dn(e),e.g.cancel(),e.g=null)}function Sn(e){In(e),e.u&&(a.clearTimeout(e.u),e.u=null),Mn(e),e.h.cancel(),e.s&&("number"===typeof e.s&&a.clearTimeout(e.s),e.s=null)}function Cn(e){if(!vt(e.h)&&!e.s){e.s=!0;var t=e.Ga;z||K(),H||(z(),H=!0),q.add(t,e),e.B=0}}function An(e,t){return!(wt(e.h)>=e.h.j-(e.s?1:0))&&(e.s?(e.i=t.D.concat(e.i),!0):!(1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa))&&(e.s=qe(E(e.Ga,e,t),Un(e,e.B)),e.B++,!0))}function kn(e,t){var n;n=t?t.l:e.U++;const r=Nt(e.I);Pt(r,"SID",e.K),Pt(r,"RID",n),Pt(r,"AID",e.T),Rn(e,r),e.m&&e.o&&un(r,e.m,e.o),n=new nt(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=Nn(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),bt(e.h,n),ot(n,r,t)}function Rn(e,t){e.H&&x(e.H,function(e,n){Pt(t,n,e)}),e.l&&Ct({},function(e,n){Pt(t,n,e)})}function Nn(e,t,n){n=Math.min(e.i.length,n);var r=e.l?E(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<n;a++){let n=i[a].g;const c=i[a].map;if(n-=t,0>n)t=Math.max(0,i[a].g-100),o=!1;else try{tn(c,e,"req"+n+"_")}catch(s){r&&r(c)}}if(o){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function On(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;z||K(),H||(z(),H=!0),q.add(t,e),e.v=0}}function xn(e){return!(e.g||e.u||3<=e.v)&&(e.Y++,e.u=qe(E(e.Fa,e),Un(e,e.v)),e.v++,!0)}function Dn(e){null!=e.A&&(a.clearTimeout(e.A),e.A=null)}function Pn(e){e.g=new nt(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=Nt(e.qa);Pt(t,"RID","rpc"),Pt(t,"SID",e.K),Pt(t,"AID",e.T),Pt(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&Pt(t,"TO",e.ja),Pt(t,"TYPE","xmlhttp"),Rn(e,t),e.m&&e.o&&un(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=Mt(Nt(t)),n.m=null,n.P=!0,at(n,e)}function Mn(e){null!=e.C&&(a.clearTimeout(e.C),e.C=null)}function Ln(e,t){var n=null;if(e.g==t){Mn(e),Dn(e),e.g=null;var r=2}else{if(!_t(e.h,t))return;n=t.D,Et(e.h,t),r=1}if(0!=e.G)if(t.o)if(1==r){n=t.m?t.m.length:0,t=Date.now()-t.F;var i=e.B;r=Fe(),_e(r,new He(r,n)),Cn(e)}else On(e);else if(i=t.s,3==i||0==i&&0<t.X||!(1==r&&An(e,t)||2==r&&xn(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:Vn(e,5);break;case 4:Vn(e,10);break;case 3:Vn(e,6);break;default:Vn(e,2)}}function Un(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function Vn(e,t){if(e.j.info("Error code "+t),2==t){var n=E(e.fb,e),r=e.Xa;const t=!r;r=new Rt(r||"//www.google.com/images/cleardot.gif"),a.location&&"http"==a.location.protocol||Ot(r,"https"),Mt(r),t?Yt(r.toString(),n):Jt(r.toString(),n)}else ze(2);e.G=0,e.l&&e.l.sa(t),Fn(e),Sn(e)}function Fn(e){if(e.G=0,e.ka=[],e.l){const t=Tt(e.h);0==t.length&&0==e.i.length||(C(e.ka,t),C(e.ka,e.i),e.h.i.length=0,S(e.i),e.i.length=0),e.l.ra()}}function jn(e,t,n){var r=n instanceof Rt?Nt(n):new Rt(n);if(""!=r.g)t&&(r.g=t+"."+r.g),xt(r,r.s);else{var i=a.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new Rt(null);r&&Ot(s,r),t&&(s.g=t),i&&xt(s,i),n&&(s.l=n),r=s}return n=e.D,t=e.ya,n&&t&&Pt(r,n,t),Pt(r,"VER",e.la),Rn(e,r),r}function Bn(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return t=e.Ca&&!e.pa?new ln(new nn({eb:n})):new ln(e.pa),t.Ha(e.J),t}function $n(){}function zn(){}function Hn(e,t){we.call(this),this.g=new En(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!k(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!k(t)&&(this.g.D=t,e=this.h,null!==e&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Gn(this)}function qn(e){Me.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function Kn(){Le.call(this),this.status=1}function Gn(e){this.g=e}e=ln.prototype,e.Ha=function(e){this.J=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Je.g(),this.v=this.o?xe(this.o):xe(Je),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(s){return void dn(this,s)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!==typeof r.keys||"function"!==typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=a.FormData&&e instanceof a.FormData,!(0<=Array.prototype.indexOf.call(fn,t,void 0))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[o,a]of n)this.g.setRequestHeader(o,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{yn(this),this.u=!0,this.g.send(e),this.u=!1}catch(s){dn(this,s)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,_e(this,"complete"),_e(this,"abort"),mn(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),mn(this,!0)),ln.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?gn(this):this.bb())},e.bb=function(){gn(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<vn(this)?this.g.status:-1}catch(e){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Re(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"===typeof this.l?this.l:String(this.l)},e=En.prototype,e.la=8,e.G=1,e.connect=function(e,t,n,r){ze(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=jn(this,null,this.W),Cn(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new nt(this,this.j,e);let s=this.o;if(this.S&&(s?(s=P(s),L(s,this.S)):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(r="__data__"in r.map&&(r=r.map.__data__,"string"===typeof r)?r.length:void 0,void 0===r)break;if(t+=r,4096<t){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Nn(this,i,t),n=Nt(this.I),Pt(n,"RID",e),Pt(n,"CVER",22),this.D&&Pt(n,"X-HTTP-Session-Id",this.D),Rn(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(cn(s)))+"&"+t:this.m&&un(n,this.m,s)),bt(this.h,i),this.Ua&&Pt(n,"TYPE","init"),this.P?(Pt(n,"$req",t),Pt(n,"SID","null"),i.T=!0,ot(i,n,null)):ot(i,n,t),this.G=2}}else 3==this.G&&(e?kn(this,e):0==this.i.length||vt(this.h)||kn(this))},e.Fa=function(){if(this.u=null,Pn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=qe(E(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ze(10),In(this),Pn(this))},e.Za=function(){null!=this.C&&(this.C=null,In(this),xn(this),ze(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),ze(2)):(this.j.info("Failed to ping google.com"),ze(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},e=$n.prototype,e.ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},zn.prototype.g=function(e,t){return new Hn(e,t)},I(Hn,we),Hn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Hn.prototype.close=function(){Tn(this.g)},Hn.prototype.o=function(e){var t=this.g;if("string"===typeof e){var n={};n.__data__=e,e=n}else this.u&&(n={},n.__data__=ke(e),e=n);t.i.push(new mt(t.Ya++,e)),3==t.G&&Cn(t)},Hn.prototype.N=function(){this.g.l=null,delete this.j,Tn(this.g),delete this.g,Hn.aa.N.call(this)},I(qn,Me),I(Kn,Le),I(Gn,$n),Gn.prototype.ua=function(){_e(this.g,"a")},Gn.prototype.ta=function(e){_e(this.g,new qn(e))},Gn.prototype.sa=function(e){_e(this.g,new Kn)},Gn.prototype.ra=function(){_e(this.g,"b")},zn.prototype.createWebChannel=zn.prototype.g,Hn.prototype.send=Hn.prototype.o,Hn.prototype.open=Hn.prototype.m,Hn.prototype.close=Hn.prototype.close,v=_.createWebChannelTransport=function(){return new zn},y=_.getStatEventTarget=function(){return Fe()},m=_.Event=Ue,g=_.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ze.NO_ERROR=0,Ze.TIMEOUT=8,Ze.HTTP_ERROR=6,p=_.ErrorCode=Ze,et.COMPLETE="complete",d=_.EventType=et,De.EventType=Pe,Pe.OPEN="a",Pe.CLOSE="b",Pe.ERROR="c",Pe.MESSAGE="d",we.prototype.listen=we.prototype.K,f=_.WebChannel=De,_.FetchXmlHttpFactory=nn,ln.prototype.listenOnce=ln.prototype.L,ln.prototype.getLastError=ln.prototype.Ka,ln.prototype.getLastErrorCode=ln.prototype.Ba,ln.prototype.getStatus=ln.prototype.Z,ln.prototype.getResponseJson=ln.prototype.Oa,ln.prototype.getResponseText=ln.prototype.oa,ln.prototype.send=ln.prototype.ea,ln.prototype.setWithCredentials=ln.prototype.Ha,h=_.XhrIo=ln}).apply("undefined"!==typeof w?w:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});const b="@firebase/firestore",E="4.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}T.UNAUTHENTICATED=new T(null),T.GOOGLE_CREDENTIALS=new T("google-credentials-uid"),T.FIRST_PARTY=new T("first-party-uid"),T.MOCK_USER=new T("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let I="12.0.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=new a.Vy("@firebase/firestore");function C(){return S.logLevel}function A(e,...t){if(S.logLevel<=a.$b.DEBUG){const n=t.map(N);S.debug(`Firestore (${I}): ${e}`,...n)}}function k(e,...t){if(S.logLevel<=a.$b.ERROR){const n=t.map(N);S.error(`Firestore (${I}): ${e}`,...n)}}function R(e,...t){if(S.logLevel<=a.$b.WARN){const n=t.map(N);S.warn(`Firestore (${I}): ${e}`,...n)}}function N(e){if("string"==typeof e)return e;try{
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,x(e,r,n)}function x(e,t,n){let r=`FIRESTORE (${I}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw k(r),new Error(r)}function D(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||x(t,i,r)}function P(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends c.g{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class F{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(T.UNAUTHENTICATED))}shutdown(){}}class j{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class B{constructor(e){this.t=e,this.currentUser=T.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){D(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new U;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new U,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{A("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(A("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new U)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(A("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(D("string"==typeof t.accessToken,31837,{l:t}),new V(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return D(null===e||"string"==typeof e,2055,{h:e}),new T(e)}}class ${constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=T.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class z{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new $(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(T.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class H{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class q{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,s.xZ)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){D(void 0===this.o,3512);const n=e=>{null!=e.error&&A("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,A("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{A("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):A("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new H(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(D("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new H(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function K(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let n="";for(;n.length<20;){const r=K(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%62))}return n}}function W(e,t){return e<t?-1:e>t?1:0}function Q(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return J(n)===J(i)?W(n,i):J(n)?1:-1}return W(e.length,t.length)}const X=55296,Y=57343;function J(e){const t=e.charCodeAt(0);return t>=X&&t<=Y}function Z(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ee="__name__";class te{constructor(e,t,n){void 0===t?t=0:t>e.length&&O(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&O(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===te.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof te?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=te.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return W(e.length,t.length)}static compareSegments(e,t){const n=te.isNumericId(e),r=te.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?te.extractNumericId(e).compare(te.extractNumericId(t)):Q(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return r.fromString(e.substring(4,e.length-2))}}class ne extends te{construct(e,t,n){return new ne(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new L(M.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const re=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ie extends te{construct(e,t,n){return new ie(e,t,n)}static isValidIdentifier(e){return re.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===ee}static keyField(){return new ie([ee])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new L(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new L(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new L(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new L(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ie(t)}static emptyPath(){return new ie([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.path=e}static fromPath(e){return new se(ne.fromString(e))}static fromName(e){return new se(ne.fromString(e).popFirst(5))}static empty(){return new se(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ne.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new se(new ne(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(e,t,n){if(!n)throw new L(M.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function ae(e,t,n,r){if(!0===t&&!0===r)throw new L(M.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ce(e){if(!se.isDocumentKey(e))throw new L(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ue(e){if(se.isDocumentKey(e))throw new L(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function le(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function he(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":O(12329,{type:typeof e})}function fe(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new L(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=he(e);throw new L(M.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function de(e,t){const n={typeString:e};return t&&(n.value=t),n}function pe(e,t){if(!le(e))throw new L(M.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new L(M.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge=-62135596800,me=1e6;class ye{static now(){return ye.fromMillis(Date.now())}static fromDate(e){return ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*me);return new ye(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ge)throw new L(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/me}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ye._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(pe(e,ye._jsonSchema))return new ye(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ge;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ye._jsonSchemaVersion="firestore/timestamp/1.0",ye._jsonSchema={type:de("string",ye._jsonSchemaVersion),seconds:de("number"),nanoseconds:de("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new ye(0,0))}static max(){return new ve(new ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we=-1;class _e{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}_e.UNKNOWN_ID=-1;function be(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=ve.fromTimestamp(1e9===r?new ye(n+1,0):new ye(n,r));return new Te(i,se.empty(),t)}function Ee(e){return new Te(e.readTime,e.key,we)}class Te{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Te(ve.min(),se.empty(),we)}static max(){return new Te(ve.max(),se.empty(),we)}}function Ie(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=se.comparator(e.documentKey,t.documentKey),0!==n?n:W(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}const Se="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ce{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ae(e){if(e.code!==M.FAILED_PRECONDITION||e.message!==Se)throw e;A("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ke((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof ke?t:ke.resolve(t)}catch(e){return ke.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ke.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ke.reject(t)}static resolve(e){return new ke((t,n)=>{t(e)})}static reject(e){return new ke((t,n)=>{n(e)})}static waitFor(e){return new ke((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=ke.resolve(!1);for(const n of e)t=t.next(e=>e?ke.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new ke((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new ke((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ne(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Oe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Oe.ce=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=-1;function De(e){return null==e}function Pe(e){return 0===e&&1/e==-1/0}function Me(e){return"number"==typeof e&&Number.isInteger(e)&&!Pe(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le="";function Ue(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Fe(t)),t=Ve(e.get(n),t);return Fe(t)}function Ve(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case Le:n+="";break;default:n+=t}}return n}function Fe(e){return e+Le+""}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const je="remoteDocuments",Be="owner",$e="mutationQueues",ze="mutations";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="documentMutations",qe="remoteDocumentsV14",Ke="remoteDocumentGlobal",Ge="targets",We="targetDocuments",Qe="targetGlobal",Xe="collectionParents",Ye="clientMetadata",Je="bundles",Ze="namedQueries",et="indexConfiguration",tt="indexState",nt="indexEntries",rt="documentOverlays",it="globals",st=[$e,ze,He,je,Ge,Be,Qe,We,Ye,Ke,Xe,Je,Ze],ot=[$e,ze,He,qe,Ge,Be,Qe,We,Ye,Ke,Xe,Je,Ze,rt],at=ot,ct=[...at,et,tt,nt];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ut(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function lt(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function ht(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t){this.comparator=e,this.root=t||pt.EMPTY}insert(e,t){return new ft(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(e){return new ft(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new dt(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new dt(this.root,e,this.comparator,!1)}getReverseIterator(){return new dt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new dt(this.root,e,this.comparator,!0)}}class dt{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class pt{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:pt.RED,this.left=null!=r?r:pt.EMPTY,this.right=null!=i?i:pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new pt(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return pt.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw O(27949);return e+(this.isRed()?0:1)}}pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1,pt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new pt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gt{constructor(e){this.comparator=e,this.data=new ft(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new mt(this.data.getIterator())}getIteratorFrom(e){return new mt(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof gt))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new gt(this.comparator);return t.data=e,t}}class mt{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yt{constructor(e){this.fields=e,e.sort(ie.comparator)}static empty(){return new yt([])}unionWith(e){let t=new gt(ie.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new yt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Z(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new vt("Invalid base64 string: "+e):e}}(e);return new wt(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new wt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}wt.EMPTY_BYTE_STRING=new wt("");const _t=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bt(e){if(D(!!e,39018),"string"==typeof e){let t=0;const n=_t.exec(e);if(D(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Et(e.seconds),nanos:Et(e.nanos)}}function Et(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Tt(e){return"string"==typeof e?wt.fromBase64String(e):wt.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="server_timestamp",St="__type__",Ct="__previous_value__",At="__local_write_time__";function kt(e){const t=(e?.mapValue?.fields||{})[St]?.stringValue;return t===It}function Rt(e){const t=e.mapValue.fields[Ct];return kt(t)?Rt(t):t}function Nt(e){const t=bt(e.mapValue.fields[At].timestampValue);return new ye(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,t,n,r,i,s,o,a,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u}}const xt="(default)";class Dt{constructor(e,t){this.projectId=e,this.database=t||xt}static empty(){return new Dt("","")}get isDefaultDatabase(){return this.database===xt}isEqual(e){return e instanceof Dt&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="__type__",Mt="__max__",Lt={mapValue:{fields:{__type__:{stringValue:Mt}}}},Ut="__vector__",Vt="value";function Ft(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?kt(e)?4:tn(e)?9007199254740991:Zt(e)?10:11:O(28295,{value:e})}function jt(e,t){if(e===t)return!0;const n=Ft(e);if(n!==Ft(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Nt(e).isEqual(Nt(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=bt(e.timestampValue),r=bt(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Tt(e.bytesValue).isEqual(Tt(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Et(e.geoPointValue.latitude)===Et(t.geoPointValue.latitude)&&Et(e.geoPointValue.longitude)===Et(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Et(e.integerValue)===Et(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Et(e.doubleValue),r=Et(t.doubleValue);return n===r?Pe(n)===Pe(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Z(e.arrayValue.values||[],t.arrayValue.values||[],jt);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ut(n)!==ut(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!jt(n[i],r[i])))return!1;return!0}(e,t);default:return O(52216,{left:e})}}function Bt(e,t){return void 0!==(e.values||[]).find(e=>jt(e,t))}function $t(e,t){if(e===t)return 0;const n=Ft(e),r=Ft(t);if(n!==r)return W(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return W(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Et(e.integerValue||e.doubleValue),r=Et(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return zt(e.timestampValue,t.timestampValue);case 4:return zt(Nt(e),Nt(t));case 5:return Q(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Tt(e),r=Tt(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=W(n[i],r[i]);if(0!==e)return e}return W(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=W(Et(e.latitude),Et(t.latitude));return 0!==n?n:W(Et(e.longitude),Et(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Ht(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},i=n[Vt]?.arrayValue,s=r[Vt]?.arrayValue,o=W(i?.values?.length||0,s?.values?.length||0);return 0!==o?o:Ht(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Lt.mapValue&&t===Lt.mapValue)return 0;if(e===Lt.mapValue)return 1;if(t===Lt.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=Q(r[o],s[o]);if(0!==e)return e;const t=$t(n[r[o]],i[s[o]]);if(0!==t)return t}return W(r.length,s.length)}(e.mapValue,t.mapValue);default:throw O(23264,{he:n})}}function zt(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return W(e,t);const n=bt(e),r=bt(t),i=W(n.seconds,r.seconds);return 0!==i?i:W(n.nanos,r.nanos)}function Ht(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=$t(n[i],r[i]);if(e)return e}return W(n.length,r.length)}function qt(e){return Kt(e)}function Kt(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=bt(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return Tt(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return se.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Kt(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${Kt(e.fields[i])}`;return n+"}"}(e.mapValue):O(61005,{value:e})}function Gt(e){switch(Ft(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Rt(e);return t?16+Gt(t):16;case 5:return 2*e.stringValue.length;case 6:return Tt(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+Gt(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return lt(e.fields,(e,n)=>{t+=e.length+Gt(n)}),t}(e.mapValue);default:throw O(13486,{value:e})}}function Wt(e){return!!e&&"integerValue"in e}function Qt(e){return!!e&&"arrayValue"in e}function Xt(e){return!!e&&"nullValue"in e}function Yt(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Jt(e){return!!e&&"mapValue"in e}function Zt(e){const t=(e?.mapValue?.fields||{})[Pt]?.stringValue;return t===Ut}function en(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return lt(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=en(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=en(e.arrayValue.values[n]);return t}return{...e}}function tn(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Mt}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nn{constructor(e){this.value=e}static empty(){return new nn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Jt(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=en(t)}setAll(e){let t=ie.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=en(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());Jt(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Jt(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){lt(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new nn(en(this.value))}}function rn(e){const t=[];return lt(e.fields,(e,n)=>{const r=new ie([e]);if(Jt(n)){const e=rn(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new yt(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class sn{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new sn(e,0,ve.min(),ve.min(),ve.min(),nn.empty(),0)}static newFoundDocument(e,t,n,r){return new sn(e,1,t,ve.min(),n,r,0)}static newNoDocument(e,t){return new sn(e,2,t,ve.min(),ve.min(),nn.empty(),0)}static newUnknownDocument(e,t){return new sn(e,3,t,ve.min(),ve.min(),nn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ve.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof sn&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new sn(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t){this.position=e,this.inclusive=t}}function an(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?se.comparator(se.fromName(o.referenceValue),n.key):$t(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function cn(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!jt(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t="asc"){this.field=e,this.dir=t}}function ln(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{}class fn extends hn{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new _n(e,t,n):"array-contains"===t?new In(e,n):"in"===t?new Sn(e,n):"not-in"===t?new Cn(e,n):"array-contains-any"===t?new An(e,n):new fn(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new bn(e,n):new En(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison($t(t,this.value)):null!==t&&Ft(this.value)===Ft(t)&&this.matchesComparison($t(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class dn extends hn{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new dn(e,t)}matches(e){return pn(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function pn(e){return"and"===e.op}function gn(e){return mn(e)&&pn(e)}function mn(e){for(const t of e.filters)if(t instanceof dn)return!1;return!0}function yn(e){if(e instanceof fn)return e.field.canonicalString()+e.op.toString()+qt(e.value);if(gn(e))return e.filters.map(e=>yn(e)).join(",");{const t=e.filters.map(e=>yn(e)).join(",");return`${e.op}(${t})`}}function vn(e,t){return e instanceof fn?function(e,t){return t instanceof fn&&e.op===t.op&&e.field.isEqual(t.field)&&jt(e.value,t.value)}(e,t):e instanceof dn?function(e,t){return t instanceof dn&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&vn(n,t.filters[r]),!0)}(e,t):void O(19439)}function wn(e){return e instanceof fn?function(e){return`${e.field.canonicalString()} ${e.op} ${qt(e.value)}`}(e):e instanceof dn?function(e){return e.op.toString()+" {"+e.getFilters().map(wn).join(" ,")+"}"}(e):"Filter"}class _n extends fn{constructor(e,t,n){super(e,t,n),this.key=se.fromName(n.referenceValue)}matches(e){const t=se.comparator(e.key,this.key);return this.matchesComparison(t)}}class bn extends fn{constructor(e,t){super(e,"in",t),this.keys=Tn("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class En extends fn{constructor(e,t){super(e,"not-in",t),this.keys=Tn("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Tn(e,t){return(t.arrayValue?.values||[]).map(e=>se.fromName(e.referenceValue))}class In extends fn{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qt(t)&&Bt(t.arrayValue,this.value)}}class Sn extends fn{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Bt(this.value.arrayValue,t)}}class Cn extends fn{constructor(e,t){super(e,"not-in",t)}matches(e){if(Bt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Bt(this.value.arrayValue,t)}}class An extends fn{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qt(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Bt(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.Te=null}}function Rn(e,t=null,n=[],r=[],i=null,s=null,o=null){return new kn(e,t,n,r,i,s,o)}function Nn(e){const t=P(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>yn(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),De(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>qt(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>qt(e)).join(",")),t.Te=e}return t.Te}function On(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!ln(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!vn(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!cn(e.startAt,t.startAt)&&cn(e.endAt,t.endAt)}function xn(e){return se.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dn{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Pn(e,t,n,r,i,s,o,a){return new Dn(e,t,n,r,i,s,o,a)}function Mn(e){return new Dn(e)}function Ln(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Un(e){return null!==e.collectionGroup}function Vn(e){const t=P(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new gt(ie.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new un(r,n))}),e.has(ie.keyField().canonicalString())||t.Ie.push(new un(ie.keyField(),n))}return t.Ie}function Fn(e){const t=P(e);return t.Ee||(t.Ee=jn(t,Vn(e))),t.Ee}function jn(e,t){if("F"===e.limitType)return Rn(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new un(e.field,t)});const n=e.endAt?new on(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new on(e.startAt.position,e.startAt.inclusive):null;return Rn(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Bn(e,t,n){return new Dn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function $n(e,t){return On(Fn(e),Fn(t))&&e.limitType===t.limitType}function zn(e){return`${Nn(Fn(e))}|lt:${e.limitType}`}function Hn(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>wn(e)).join(", ")}]`),De(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>qt(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>qt(e)).join(",")),`Target(${t})`}(Fn(e))}; limitType=${e.limitType})`}function qn(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):se.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Vn(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=an(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,Vn(e),t))&&!(e.endAt&&!function(e,t,n){const r=an(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,Vn(e),t))}(e,t)}function Kn(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Gn(e){return(t,n)=>{let r=!1;for(const i of Vn(e)){const e=Wn(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Wn(e,t,n){const r=e.field.isKeyField()?se.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?$t(r,i):O(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return O(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){lt(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return ht(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=new ft(se.comparator);function Yn(){return Xn}const Jn=new ft(se.comparator);function Zn(...e){let t=Jn;for(const n of e)t=t.insert(n.key,n);return t}function er(e){let t=Jn;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function tr(){return rr()}function nr(){return rr()}function rr(){return new Qn(e=>e.toString(),(e,t)=>e.isEqual(t))}const ir=new ft(se.comparator),sr=new gt(se.comparator);function or(...e){let t=sr;for(const n of e)t=t.add(n);return t}const ar=new gt(W);function cr(){return ar}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Pe(t)?"-0":t}}function lr(e){return{integerValue:""+e}}function hr(e,t){return Me(t)?lr(t):ur(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(){this._=void 0}}function dr(e,t,n){return e instanceof mr?function(e,t){const n={fields:{[St]:{stringValue:It},[At]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&kt(t)&&(t=Rt(t)),t&&(n.fields[Ct]=t),{mapValue:n}}(n,t):e instanceof yr?vr(e,t):e instanceof wr?_r(e,t):function(e,t){const n=gr(e,t),r=Er(n)+Er(e.Ae);return Wt(n)&&Wt(e.Ae)?lr(r):ur(e.serializer,r)}(e,t)}function pr(e,t,n){return e instanceof yr?vr(e,t):e instanceof wr?_r(e,t):n}function gr(e,t){return e instanceof br?function(e){return Wt(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class mr extends fr{}class yr extends fr{constructor(e){super(),this.elements=e}}function vr(e,t){const n=Tr(t);for(const r of e.elements)n.some(e=>jt(e,r))||n.push(r);return{arrayValue:{values:n}}}class wr extends fr{constructor(e){super(),this.elements=e}}function _r(e,t){let n=Tr(t);for(const r of e.elements)n=n.filter(e=>!jt(e,r));return{arrayValue:{values:n}}}class br extends fr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Er(e){return Et(e.integerValue||e.doubleValue)}function Tr(e){return Qt(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof yr&&t instanceof yr||e instanceof wr&&t instanceof wr?Z(e.elements,t.elements,jt):e instanceof br&&t instanceof br?jt(e.Ae,t.Ae):e instanceof mr&&t instanceof mr}(e.transform,t.transform)}class Sr{constructor(e,t){this.version=e,this.transformResults=t}}class Cr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Cr}static exists(e){return new Cr(void 0,e)}static updateTime(e){return new Cr(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ar(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class kr{}function Rr(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Fr(e.key,Cr.none()):new Pr(e.key,e.data,Cr.none());{const n=e.data,r=nn.empty();let i=new gt(ie.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Mr(e.key,r,new yt(i.toArray()),Cr.none())}}function Nr(e,t,n){e instanceof Pr?function(e,t,n){const r=e.value.clone(),i=Ur(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Mr?function(e,t,n){if(!Ar(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Ur(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Lr(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Or(e,t,n,r){return e instanceof Pr?function(e,t,n,r){if(!Ar(e.precondition,t))return n;const i=e.value.clone(),s=Vr(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Mr?function(e,t,n,r){if(!Ar(e.precondition,t))return n;const i=Vr(e.fieldTransforms,r,t),s=t.data;return s.setAll(Lr(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return Ar(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function xr(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=gr(r.transform,e||null);null!=i&&(null===n&&(n=nn.empty()),n.set(r.field,i))}return n||null}function Dr(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Z(e,t,(e,t)=>Ir(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Pr extends kr{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Mr extends kr{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Lr(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Ur(e,t,n){const r=new Map;D(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,pr(o,a,n[i]))}return r}function Vr(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,dr(e,s,t))}return r}class Fr extends kr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jr extends kr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Nr(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Or(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Or(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=nr();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Rr(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(ve.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),or())}isEqual(e){return this.batchId===e.batchId&&Z(this.mutations,e.mutations,(e,t)=>Dr(e,t))&&Z(this.baseMutations,e.baseMutations,(e,t)=>Dr(e,t))}}class $r{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){D(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return ir}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new $r(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hr{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qr,Kr;function Gr(e){switch(e){case M.OK:return O(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return O(15467,{code:e})}}function Wr(e){if(void 0===e)return k("GRPC error has no .code"),M.UNKNOWN;switch(e){case qr.OK:return M.OK;case qr.CANCELLED:return M.CANCELLED;case qr.UNKNOWN:return M.UNKNOWN;case qr.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case qr.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case qr.INTERNAL:return M.INTERNAL;case qr.UNAVAILABLE:return M.UNAVAILABLE;case qr.UNAUTHENTICATED:return M.UNAUTHENTICATED;case qr.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case qr.NOT_FOUND:return M.NOT_FOUND;case qr.ALREADY_EXISTS:return M.ALREADY_EXISTS;case qr.PERMISSION_DENIED:return M.PERMISSION_DENIED;case qr.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case qr.ABORTED:return M.ABORTED;case qr.OUT_OF_RANGE:return M.OUT_OF_RANGE;case qr.UNIMPLEMENTED:return M.UNIMPLEMENTED;case qr.DATA_LOSS:return M.DATA_LOSS;default:return O(39323,{code:e})}}(Kr=qr||(qr={}))[Kr.OK=0]="OK",Kr[Kr.CANCELLED=1]="CANCELLED",Kr[Kr.UNKNOWN=2]="UNKNOWN",Kr[Kr.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Kr[Kr.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Kr[Kr.NOT_FOUND=5]="NOT_FOUND",Kr[Kr.ALREADY_EXISTS=6]="ALREADY_EXISTS",Kr[Kr.PERMISSION_DENIED=7]="PERMISSION_DENIED",Kr[Kr.UNAUTHENTICATED=16]="UNAUTHENTICATED",Kr[Kr.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Kr[Kr.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Kr[Kr.ABORTED=10]="ABORTED",Kr[Kr.OUT_OF_RANGE=11]="OUT_OF_RANGE",Kr[Kr.UNIMPLEMENTED=12]="UNIMPLEMENTED",Kr[Kr.INTERNAL=13]="INTERNAL",Kr[Kr.UNAVAILABLE=14]="UNAVAILABLE",Kr[Kr.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Qr=null;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(){return new TextEncoder}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=new r([4294967295,4294967295],0);function Jr(e){const t=Xr().encode(e),n=new i;return n.update(t),new Uint8Array(n.digest())}function Zr(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new r([n,i],0),new r([s,o],0)]}class ei{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ti(`Invalid padding: ${t}`);if(n<0)throw new ti(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new ti(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new ti(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=r.fromNumber(this.ge)}ye(e,t,n){let i=e.add(t.multiply(r.fromNumber(n)));return 1===i.compare(Yr)&&(i=new r([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Jr(e),[n,r]=Zr(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new ei(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.ge)return;const t=Jr(e),[n,r]=Zr(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ti extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,ri.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new ni(ve.min(),r,new ft(W),Yn(),or())}}class ri{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ri(n,t,or(),or(),or())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class si{constructor(e,t){this.targetId=e,this.Ce=t}}class oi{constructor(e,t,n=wt.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class ai{constructor(){this.ve=0,this.Fe=li(),this.Me=wt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=or(),t=or(),n=or();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:O(38017,{changeType:i})}}),new ri(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=li()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,D(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ci{constructor(e){this.Ge=e,this.ze=new Map,this.je=Yn(),this.Je=ui(),this.He=ui(),this.Ye=new ft(W)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:O(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(xn(i))if(0===n){const e=new se(i.path);this.et(t,e,sn.newNoDocument(e,ve.min()))}else D(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),i=n?this.ct(n,e,r):1;if(0!==i){this.it(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}Qr?.lt(function(e,t,n,r,i){const s={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(s.bloomFilter={applied:0===i,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),s}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r,e.Ce,this.Ge.ht(),n,i))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=Tt(n).toUint8Array()}catch(e){if(e instanceof vt)return R("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new ei(s,r,i)}catch(e){return R(e instanceof ti?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const i=this.ot(r);if(i){if(n.current&&xn(i.target)){const t=new se(i.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,sn.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=or();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new ni(e,t,this.Ye,this.je,n);return this.je=Yn(),this.Je=ui(),this.He=ui(),this.Ye=new ft(W),r}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new ai,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new gt(W),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new gt(W),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||A("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new ai),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ui(){return new ft(se.comparator)}function li(){return new ft(se.comparator)}const hi=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),fi=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})(),di=(()=>{const e={and:"AND",or:"OR"};return e})();class pi{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gi(e,t){return e.useProto3Json||De(t)?t:{value:t}}function mi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function yi(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function vi(e,t){return mi(e,t.toTimestamp())}function wi(e){return D(!!e,49232),ve.fromTimestamp(function(e){const t=bt(e);return new ye(t.seconds,t.nanos)}(e))}function _i(e,t){return bi(e,t).canonicalString()}function bi(e,t){const n=function(e){return new ne(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Ei(e){const t=ne.fromString(e);return D(qi(t),10190,{key:t.toString()}),t}function Ti(e,t){return _i(e.databaseId,t.path)}function Ii(e,t){const n=Ei(t);if(n.get(1)!==e.databaseId.projectId)throw new L(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new L(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new se(ki(n))}function Si(e,t){return _i(e.databaseId,t)}function Ci(e){const t=Ei(e);return 4===t.length?ne.emptyPath():ki(t)}function Ai(e){return new ne(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function ki(e){return D(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Ri(e,t,n){return{name:Ti(e,t),fields:n.value.mapValue.fields}}function Ni(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:O(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.useProto3Json?(D(void 0===t||"string"==typeof t,58123),wt.fromBase64String(t||"")):(D(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),wt.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?M.UNKNOWN:Wr(e.code);return new L(t,e.message||"")}(o);n=new oi(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ii(e,r.document.name),s=wi(r.document.updateTime),o=r.document.createTime?wi(r.document.createTime):ve.min(),a=new nn({mapValue:{fields:r.document.fields}}),c=sn.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new ii(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Ii(e,r.document),s=r.readTime?wi(r.readTime):ve.min(),o=sn.newNoDocument(i,s),a=r.removedTargetIds||[];n=new ii([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Ii(e,r.document),s=r.removedTargetIds||[];n=new ii([],s,i,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new Hr(r,i),o=e.targetId;n=new si(o,s)}}return n}function Oi(e,t){let n;if(t instanceof Pr)n={update:Ri(e,t.key,t.value)};else if(t instanceof Fr)n={delete:Ti(e,t.key)};else if(t instanceof Mr)n={update:Ri(e,t.key,t.data),updateMask:Hi(t.fieldMask)};else{if(!(t instanceof jr))return O(16599,{Vt:t.type});n={verify:Ti(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof mr)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof yr)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof wr)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof br)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw O(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:vi(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:O(27497)}(e,t.precondition)),n}function xi(e,t){return e&&e.length>0?(D(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?wi(e.updateTime):wi(t);return n.isEqual(ve.min())&&(n=wi(t)),new Sr(n,e.transformResults||[])}(e,t))):[]}function Di(e,t){return{documents:[Si(e,t.path)]}}function Pi(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Si(e,i);const s=function(e){if(0!==e.length)return zi(dn.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:Bi(e.field),direction:Vi(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=gi(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i}}function Mi(e){let t=Ci(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){D(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=Ui(e);return t instanceof dn&&gn(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new un($i(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,De(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new on(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new on(n,t)}(n.endAt)),Pn(t,i,o,s,a,"F",c,u)}function Li(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}function Ui(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=$i(e.unaryFilter.field);return fn.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=$i(e.unaryFilter.field);return fn.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=$i(e.unaryFilter.field);return fn.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=$i(e.unaryFilter.field);return fn.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(e):void 0!==e.fieldFilter?function(e){return fn.create($i(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return dn.create(e.compositeFilter.filters.map(e=>Ui(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(e):O(30097,{filter:e})}function Vi(e){return hi[e]}function Fi(e){return fi[e]}function ji(e){return di[e]}function Bi(e){return{fieldPath:e.canonicalString()}}function $i(e){return ie.fromServerFormat(e.fieldPath)}function zi(e){return e instanceof fn?function(e){if("=="===e.op){if(Yt(e.value))return{unaryFilter:{field:Bi(e.field),op:"IS_NAN"}};if(Xt(e.value))return{unaryFilter:{field:Bi(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Yt(e.value))return{unaryFilter:{field:Bi(e.field),op:"IS_NOT_NAN"}};if(Xt(e.value))return{unaryFilter:{field:Bi(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Bi(e.field),op:Fi(e.op),value:e.value}}}(e):e instanceof dn?function(e){const t=e.getFilters().map(e=>zi(e));return 1===t.length?t[0]:{compositeFilter:{op:ji(e.op),filters:t}}}(e):O(54877,{filter:e})}function Hi(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function qi(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t,n,r,i=ve.min(),s=ve.min(),o=wt.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new Ki(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ki(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ki(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ki(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e){this.yt=e}}function Wi(e){const t=Mi({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Bn(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(Et(e.integerValue));else if("doubleValue"in e){const n=Et(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),Pe(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=bt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Tt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?tn(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Zt(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):O(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const r of Object.keys(n))this.Ot(r,t),this.Ct(n[r],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=Vt,i=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(Et(i)),this.Ot(r,t),this.Ct(n[r],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const r of n)this.Ct(r,t)}Lt(e,t){this.Ft(t,37),se.fromName(e).path.forEach(e=>{this.Ft(t,60),this.Ut(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Qi.Kt=new Qi;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xi{constructor(){this.Cn=new Yi}addToCollectionParentIndex(e,t){return this.Cn.add(t),ke.resolve()}getCollectionParents(e,t){return ke.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return ke.resolve()}deleteFieldIndex(e,t){return ke.resolve()}deleteAllFieldIndexes(e){return ke.resolve()}createTargetIndexes(e,t){return ke.resolve()}getDocumentsMatchingTarget(e,t){return ke.resolve(null)}getIndexType(e,t){return ke.resolve(0)}getFieldIndexes(e,t){return ke.resolve([])}getNextCollectionGroupToUpdate(e){return ke.resolve(null)}getMinOffset(e,t){return ke.resolve(Te.min())}getMinOffsetFromCollectionGroup(e,t){return ke.resolve(Te.min())}updateCollectionGroup(e,t,n){return ke.resolve()}updateIndexEntries(e,t){return ke.resolve()}}class Yi{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new gt(ne.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new gt(ne.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ji={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Zi=41943040;class es{static withCacheSize(e){return new es(e,es.DEFAULT_COLLECTION_PERCENTILE,es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */es.DEFAULT_COLLECTION_PERCENTILE=10,es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,es.DEFAULT=new es(Zi,es.DEFAULT_COLLECTION_PERCENTILE,es.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),es.DISABLED=new es(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ts{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new ts(0)}static cr(){return new ts(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ns="LruGarbageCollector",rs=1048576;function is([e,t],[n,r]){const i=W(e,n);return 0===i?W(t,r):i}class ss{constructor(e){this.Ir=e,this.buffer=new gt(is),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();is(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class os{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){A(ns,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ne(e)?A(ns,"Ignoring IndexedDB error during garbage collection: ",e):await Ae(e)}await this.Vr(3e5)})}}class as{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ke.resolve(Oe.ce);const n=new ss(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(A("LruGarbageCollector","Garbage collection skipped; disabled"),ke.resolve(Ji)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(A("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ji):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,i,s,o,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(A("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),C()<=a.$b.DEBUG&&A("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-l}ms\n\tDetermined least recently used ${r} in `+(o-s)+"ms\n"+`\tRemoved ${i} targets in `+(c-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`),ke.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}function cs(e,t){return new as(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class us{constructor(){this.changes=new Qn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,sn.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ke.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ls{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Or(n.mutation,e,yt.empty(),ye.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,or()).next(()=>t))}getLocalViewOfDocuments(e,t,n=or()){const r=tr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Zn();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=tr();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,or()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Yn();const s=rr(),o=function(){return rr()}();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Mr)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),Or(o.mutation,t,o.mutation.getFieldMask(),ye.now())):s.set(t.key,yt.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>o.set(e,new ls(t,s.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=rr();let r=new ft((e,t)=>e-t),i=or();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||yt.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||or()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=nr();c.forEach(e=>{if(!i.has(e)){const r=Rr(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return ke.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return function(e){return se.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Un(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):ke.resolve(tr());let o=we,a=i;return s.next(t=>ke.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?ke.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,or())).next(e=>({batchId:o,changes:er(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new se(t)).next(e=>{let t=Zn();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=Zn();return this.indexManager.getCollectionParents(e,i).next(o=>ke.forEach(o,o=>{const a=function(e,t){return new Dn(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,sn.newInvalidDocument(r)))});let n=Zn();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&Or(s.mutation,r,yt.empty(),ye.now()),qn(t,r)&&(n=n.insert(e,r))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return ke.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:wi(e.createTime)}}(t)),ke.resolve()}getNamedQuery(e,t){return ke.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(e){return{name:e.name,query:Wi(e.bundledQuery),readTime:wi(e.readTime)}}(t)),ke.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(){this.overlays=new ft(se.comparator),this.qr=new Map}getOverlay(e,t){return ke.resolve(this.overlays.get(t))}getOverlays(e,t){const n=tr();return ke.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),ke.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),ke.resolve()}getOverlaysForCollection(e,t,n){const r=tr(),i=t.length+1,s=new se(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ke.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new ft((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=tr(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=tr(),a=i.getIterator();for(;a.hasNext();)if(a.getNext().value.forEach((e,t)=>o.set(e,t)),o.size()>=r)break;return ke.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new zr(t,n));let i=this.qr.get(t);void 0===i&&(i=or(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(){this.sessionToken=wt.EMPTY_BYTE_STRING}getSessionToken(e){return ke.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ke.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(){this.Qr=new gt(ms.$r),this.Ur=new gt(ms.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new ms(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new ms(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new se(new ne([])),n=new ms(t,e),r=new ms(t,e+1),i=[];return this.Ur.forEachInRange([n,r],e=>{this.Gr(e),i.push(e.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new se(new ne([])),n=new ms(t,e),r=new ms(t,e+1);let i=or();return this.Ur.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new ms(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class ms{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return se.comparator(e.key,t.key)||W(e.Yr,t.Yr)}static Kr(e,t){return W(e.Yr,t.Yr)||se.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new gt(ms.$r)}checkEmpty(e){return ke.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new Br(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.Zr=this.Zr.add(new ms(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return ke.resolve(s)}lookupMutationBatch(e,t){return ke.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ei(n),i=r<0?0:r;return ke.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return ke.resolve(0===this.mutationQueue.length?xe:this.tr-1)}getAllMutationBatches(e){return ke.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ms(t,0),r=new ms(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,r],e=>{const t=this.Xr(e.Yr);i.push(t)}),ke.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new gt(W);return t.forEach(e=>{const t=new ms(e,0),r=new ms(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,r],e=>{n=n.add(e.Yr)})}),ke.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;se.isDocumentKey(i)||(i=i.child(""));const s=new ms(new se(i),0);let o=new gt(W);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)},s),ke.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){D(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return ke.forEach(t.mutations,r=>{const i=new ms(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new ms(t,0),r=this.Zr.firstAfterOrEqual(n);return ke.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ke.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e){this.ri=e,this.docs=function(){return new ft(se.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ke.resolve(n?n.document.mutableCopy():sn.newInvalidDocument(t))}getEntries(e,t){let n=Yn();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():sn.newInvalidDocument(e))}),ke.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Yn();const s=t.path,o=new se(s.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||Ie(Ee(o),n)<=0||(r.has(o.key)||qn(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return ke.resolve(i)}getAllFromCollectionGroup(e,t,n,r){O(9500)}ii(e,t){return ke.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ws(this)}getSize(e){return ke.resolve(this.size)}}class ws extends us{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)}),ke.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e){this.persistence=e,this.si=new Qn(e=>Nn(e),On),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.oi=0,this._i=new gs,this.targetCount=0,this.ai=ts.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),ke.resolve()}getLastRemoteSnapshotVersion(e){return ke.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ke.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),ke.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),ke.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new ts(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,ke.resolve()}updateTargetData(e,t){return this.Pr(t),ke.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,ke.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.si.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),ke.waitFor(i).next(()=>r)}getTargetCount(e){return ke.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return ke.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),ke.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),ke.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),ke.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return ke.resolve(n)}containsKey(e,t){return ke.resolve(this._i.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,t){this.ui={},this.overlays={},this.ci=new Oe(0),this.li=!1,this.li=!0,this.hi=new ps,this.referenceDelegate=e(this),this.Pi=new _s(this),this.indexManager=new Xi,this.remoteDocumentCache=function(e){return new vs(e)}(e=>this.referenceDelegate.Ti(e)),this.serializer=new Gi(t),this.Ii=new fs(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ds,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new ys(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){A("MemoryPersistence","Starting transaction:",e);const r=new Es(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(e=>this.referenceDelegate.di(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ai(e,t){return ke.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class Es extends Ce{constructor(e){super(),this.currentSequenceNumber=e}}class Ts{constructor(e){this.persistence=e,this.Ri=new gs,this.Vi=null}static mi(e){return new Ts(e)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),ke.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),ke.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),ke.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ke.forEach(this.fi,n=>{const r=se.fromPath(n);return this.gi(e,r).next(e=>{e||t.removeEntry(r,ve.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return ke.or([()=>ke.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Is{constructor(e,t){this.persistence=e,this.pi=new Qn(e=>Ue(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=cs(this,t)}static mi(e,t){return new Is(e,t)}Ei(){}di(e){return ke.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return ke.forEach(this.pi,(n,r)=>this.br(e,n,r).next(e=>e?ke.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,r=>this.br(e,r,t).next(e=>{e||(n++,i.removeEntry(r,ve.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),ke.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ke.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ke.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),ke.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gt(e.data.value)),t}br(e,t,n){return ke.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return ke.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ss{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(e,t){let n=or(),r=or();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ss(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return(0,c.nr)()?8:Re((0,c.ZQ)())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.ys(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ws(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Cs;return this.Ss(e,t,n).next(r=>{if(i.result=r,this.Vs)return this.bs(e,t,n,r.size)})}).next(()=>i.result)}bs(e,t,n,r){return n.documentReadCount<this.fs?(C()<=a.$b.DEBUG&&A("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),ke.resolve()):(C()<=a.$b.DEBUG&&A("QueryEngine","Query:",Hn(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(C()<=a.$b.DEBUG&&A("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Fn(t))):ke.resolve())}ys(e,t){if(Ln(t))return ke.resolve(null);let n=Fn(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Bn(t,null,"F"),n=Fn(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=or(...r);return this.ps.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.Ds(t,r);return this.Cs(t,s,i,n.readTime)?this.ys(e,Bn(t,null,"F")):this.vs(e,s,t,n)}))})))}ws(e,t,n,r){return Ln(t)||r.isEqual(ve.min())?ke.resolve(null):this.ps.getDocuments(e,n).next(i=>{const s=this.Ds(t,i);return this.Cs(t,s,n,r)?ke.resolve(null):(C()<=a.$b.DEBUG&&A("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Hn(t)),this.vs(e,s,t,be(r,we)).next(e=>e))})}Ds(e,t){let n=new gt(Gn(e));return t.forEach((t,r)=>{qn(e,r)&&(n=n.add(r))}),n}Cs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,n){return C()<=a.$b.DEBUG&&A("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.ps.getDocumentsMatchingQuery(e,t,Te.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks="LocalStore",Rs=3e8;class Ns{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new ft(W),this.xs=new Qn(e=>Nn(e),On),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hs(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Os(e,t,n,r){return new Ns(e,t,n,r)}async function xs(e,t){const n=P(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=or();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:i,addedBatchIds:s}))})})}function Ds(e,t){const n=P(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=ke.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);D(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=or();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function Ps(e){const t=P(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function Ms(e,t){const n=P(e),r=t.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,s.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(wt.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(a,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;const r=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(r>=Rs)return!0;const i=n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size;return i>0}(c,u,s)&&o.push(n.Pi.updateTargetData(e,u))});let a=Yn(),c=or();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(Ls(e,s,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!r.isEqual(ve.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return ke.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=i,e))}function Ls(e,t,n){let r=or(),i=or();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Yn();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(ve.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):A(ks,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{ks:r,qs:i}})}function Us(e,t){const n=P(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=xe),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Vs(e,t){const n=P(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Pi.getTargetData(e,t).next(i=>i?(r=i,ke.resolve(r)):n.Pi.allocateTargetId(e).next(i=>(r=new Ki(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.Ms.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}async function Fs(e,t,n){const r=P(e),i=r.Ms.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!Ne(e))throw e;A(ks,`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ms=r.Ms.remove(t),r.xs.delete(i.target)}function js(e,t,n){const r=P(e);let i=ve.min(),s=or();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=P(e),i=r.xs.get(n);return void 0!==i?ke.resolve(r.Ms.get(i)):r.Pi.getTargetData(t,n)}(r,e,Fn(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Fs.getDocumentsMatchingQuery(e,t,n?i:ve.min(),n?s:or())).next(e=>(Bs(r,Kn(t),e),{documents:e,Qs:s})))}function Bs(e,t,n){let r=e.Os.get(t)||ve.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Os.set(t,r)}class $s{constructor(){this.activeTargetIds=cr()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class zs{constructor(){this.Mo=new $s,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new $s,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{Oo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="ConnectivityMonitor";class Ks{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){A(qs,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){A(qs,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gs=null;function Ws(){return null===Gs?Gs=function(){return 268435456+Math.round(2147483648*Math.random())}():Gs++,"0x"+Gs.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Qs="RestConnection",Xs={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Ys{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===xt?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,i){const s=Ws(),o=this.zo(e,t.toUriEncodedString());A(Qs,`Sending RPC '${e}' ${s}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,i);const{host:u}=new URL(o),l=(0,c.zJ)(u);return this.Jo(e,o,a,n,l).then(t=>(A(Qs,`Received RPC '${e}' ${s}: `,t),t),t=>{throw R(Qs,`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,r,i,s){return this.Go(e,t,n,r,i)}jo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+I}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=Xs[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs="WebChannelConnection";class eo extends Ys{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,i){const s=Ws();return new Promise((i,o)=>{const a=new h;a.setWithCredentials(!0),a.listenOnce(d.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case p.NO_ERROR:const t=a.getResponseJson();A(Zs,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case p.TIMEOUT:A(Zs,`RPC '${e}' ${s} timed out`),o(new L(M.DEADLINE_EXCEEDED,"Request time out"));break;case p.HTTP_ERROR:const n=a.getStatus();if(A(Zs,`RPC '${e}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(t)>=0?t:M.UNKNOWN}(t.status);o(new L(e,t.message))}else o(new L(M.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new L(M.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:e,streamId:s,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{A(Zs,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(r);A(Zs,`RPC '${e}' ${s} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=Ws(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=v(),o=y(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const u=i.join("");A(Zs,`Creating RPC '${e}' stream ${r}: ${u}`,a);const l=s.createWebChannel(u,a);this.I_(l);let h=!1,d=!1;const p=new Js({Yo:t=>{d?A(Zs,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(h||(A(Zs,`Opening RPC '${e}' stream ${r} transport.`),l.open(),h=!0),A(Zs,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},Zo:()=>l.close()}),w=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return w(l,f.EventType.OPEN,()=>{d||(A(Zs,`RPC '${e}' stream ${r} transport opened.`),p.o_())}),w(l,f.EventType.CLOSE,()=>{d||(d=!0,A(Zs,`RPC '${e}' stream ${r} transport closed`),p.a_(),this.E_(l))}),w(l,f.EventType.ERROR,t=>{d||(d=!0,R(Zs,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),p.a_(new L(M.UNAVAILABLE,"The operation could not be completed")))}),w(l,f.EventType.MESSAGE,t=>{if(!d){const n=t.data[0];D(!!n,16349);const i=n,s=i?.error||i[0]?.error;if(s){A(Zs,`RPC '${e}' stream ${r} received error:`,s);const t=s.status;let n=function(e){const t=qr[e];if(void 0!==t)return Wr(t)}(t),i=s.message;void 0===n&&(n=M.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),d=!0,p.a_(new L(n,i)),l.close()}else A(Zs,`RPC '${e}' stream ${r} received:`,n),p.u_(n)}}),w(o,m.STAT_EVENT,t=>{t.stat===g.PROXY?A(Zs,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===g.NOPROXY&&A(Zs,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{p.__()},0),p}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(e){return new pi(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&A("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="PersistentStream";class so{constructor(e,t,n,r,i,s,o,a){this.Mi=e,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ro(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(k(t.toString()),k("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===M.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new L(M.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return A(io,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(A(io,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class oo extends so{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Ni(this.serializer,e),n=function(e){if(!("targetChange"in e))return ve.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?ve.min():t.readTime?wi(t.readTime):ve.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Ai(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=xn(r)?{documents:Di(e,r)}:{query:Pi(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=yi(e,t.resumeToken);const r=gi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(ve.min())>0){n.readTime=mi(e,t.snapshotVersion.toTimestamp());const r=gi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=Li(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Ai(this.serializer),t.removeTarget=e,this.q_(t)}}class ao extends so{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return D(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,D(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){D(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=xi(e.writeResults,e.commitTime),n=wi(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Ai(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Oi(this.serializer,e))};this.q_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{}class uo extends co{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new L(M.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,bi(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new L(M.UNKNOWN,e.toString())})}Ho(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Ho(e,bi(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new L(M.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class lo{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(k(t),this.aa=!1):A("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho="RemoteStore";class fo{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{Eo(this)&&(A(ho,"Restarting streams for network reachability change."),await async function(e){const t=P(e);t.Ea.add(4),await go(t),t.Ra.set("Unknown"),t.Ea.delete(4),await po(t)}(this))})}),this.Ra=new lo(n,r)}}async function po(e){if(Eo(e))for(const t of e.da)await t(!0)}async function go(e){for(const t of e.da)await t(!1)}function mo(e,t){const n=P(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),bo(n)?_o(n):Bo(n).O_()&&vo(n,t))}function yo(e,t){const n=P(e),r=Bo(n);n.Ia.delete(t),r.O_()&&wo(n,t),0===n.Ia.size&&(r.O_()?r.L_():Eo(n)&&n.Ra.set("Unknown"))}function vo(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(ve.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Bo(e).Y_(t)}function wo(e,t){e.Va.Ue(t),Bo(e).Z_(t)}function _o(e){e.Va=new ci({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Bo(e).start(),e.Ra.ua()}function bo(e){return Eo(e)&&!Bo(e).x_()&&e.Ia.size>0}function Eo(e){return 0===P(e).Ea.size}function To(e){e.Va=void 0}async function Io(e){e.Ra.set("Online")}async function So(e){e.Ia.forEach((t,n)=>{vo(e,t)})}async function Co(e,t){To(e),bo(e)?(e.Ra.ha(t),_o(e)):e.Ra.set("Unknown")}async function Ao(e,t,n){if(e.Ra.set("Online"),t instanceof oi&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))}(e,t)}catch(n){A(ho,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ko(e,n)}else if(t instanceof ii?e.Va.Ze(t):t instanceof si?e.Va.st(t):e.Va.tt(t),!n.isEqual(ve.min()))try{const t=await Ps(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ia.get(r);i&&e.Ia.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(wt.EMPTY_BYTE_STRING,r.snapshotVersion)),wo(e,t);const i=new Ki(r.target,t,n,r.sequenceNumber);vo(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){A(ho,"Failed to raise snapshot:",t),await ko(e,t)}}async function ko(e,t,n){if(!Ne(t))throw t;e.Ea.add(1),await go(e),e.Ra.set("Offline"),n||(n=()=>Ps(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{A(ho,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await po(e)})}function Ro(e,t){return t().catch(n=>ko(e,n,t))}async function No(e){const t=P(e),n=$o(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:xe;for(;Oo(t);)try{const e=await Us(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,xo(t,e)}catch(e){await ko(t,e)}Do(t)&&Po(t)}function Oo(e){return Eo(e)&&e.Ta.length<10}function xo(e,t){e.Ta.push(t);const n=$o(e);n.O_()&&n.X_&&n.ea(t.mutations)}function Do(e){return Eo(e)&&!$o(e).x_()&&e.Ta.length>0}function Po(e){$o(e).start()}async function Mo(e){$o(e).ra()}async function Lo(e){const t=$o(e);for(const n of e.Ta)t.ea(n.mutations)}async function Uo(e,t,n){const r=e.Ta.shift(),i=$r.from(r,t,n);await Ro(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await No(e)}async function Vo(e,t){t&&$o(e).X_&&await async function(e,t){if(function(e){return Gr(e)&&e!==M.ABORTED}(t.code)){const n=e.Ta.shift();$o(e).B_(),await Ro(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await No(e)}}(e,t),Do(e)&&Po(e)}async function Fo(e,t){const n=P(e);n.asyncQueue.verifyOperationInProgress(),A(ho,"RemoteStore received new credentials");const r=Eo(n);n.Ea.add(3),await go(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await po(n)}async function jo(e,t){const n=P(e);t?(n.Ea.delete(2),await po(n)):t||(n.Ea.add(2),await go(n),n.Ra.set("Unknown"))}function Bo(e){return e.ma||(e.ma=function(e,t,n){const r=P(e);return r.sa(),new oo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}(e.datastore,e.asyncQueue,{Xo:Io.bind(null,e),t_:So.bind(null,e),r_:Co.bind(null,e),H_:Ao.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),bo(e)?_o(e):e.Ra.set("Unknown")):(await e.ma.stop(),To(e))})),e.ma}function $o(e){return e.fa||(e.fa=function(e,t,n){const r=P(e);return r.sa(),new ao(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:Mo.bind(null,e),r_:Vo.bind(null,e),ta:Lo.bind(null,e),na:Uo.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await No(e)):(await e.fa.stop(),e.Ta.length>0&&(A(ho,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class zo{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new U,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new zo(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new L(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ho(e,t){if(k("AsyncQueue",`${t}: ${e}`),Ne(e))return new L(M.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{static emptySet(e){return new qo(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||se.comparator(t.key,n.key):(e,t)=>se.comparator(e.key,t.key),this.keyedMap=Zn(),this.sortedSet=new ft(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof qo))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new qo;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this.ga=new ft(se.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):O(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Go{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Go(e,t,qo.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$n(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Qo{constructor(){this.queries=Xo(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=P(e),r=n.queries;n.queries=Xo(),r.forEach((e,n)=>{for(const r of n.Sa)r.onError(t)})}(this,new L(M.ABORTED,"Firestore shutting down"))}}function Xo(){return new Qn(e=>zn(e),$n)}async function Yo(e,t){const n=P(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.ba()&&t.Da()&&(r=2):(s=new Wo,r=t.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=Ho(e,`Initialization of query '${Hn(t.query)}' failed`);return void t.onError(n)}n.queries.set(i,s),s.Sa.push(t),t.va(n.onlineState),s.wa&&t.Fa(s.wa)&&ta(n)}async function Jo(e,t){const n=P(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.Sa.indexOf(t);e>=0&&(s.Sa.splice(e,1),0===s.Sa.length?i=t.Da()?0:1:!s.ba()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Zo(e,t){const n=P(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(i)&&(r=!0);t.wa=i}}r&&ta(n)}function ea(e,t,n){const r=P(e),i=r.queries.get(t);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(t)}function ta(e){e.Ca.forEach(e=>{e.next()})}var na,ra;(ra=na||(na={})).Ma="default",ra.Cache="cache";class ia{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Go(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Go.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==na.Cache}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sa{constructor(e){this.key=e}}class oa{constructor(e){this.key=e}}class aa{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=or(),this.mutatedKeys=or(),this.eu=Gn(e),this.tu=new qo(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Ko,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=qn(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),f=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let d=!1;u&&l?u.data.isEqual(l.data)?h!==f&&(n.track({type:3,doc:l}),d=!0):this.su(u,l)||(n.track({type:2,doc:l}),d=!0,(a&&this.eu(l,a)>0||c&&this.eu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),d=!0):u&&!l&&(n.track({type:1,doc:u}),d=!0,(a||c)&&(o=!0)),d&&(l?(s=s.add(l),i=f?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:s,iu:n,Cs:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:e})}};return n(e)-n(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,c=a!==this.Za;return this.Za=a,0!==s.length||c?{snapshot:new Go(this.query,e.tu,i,s,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ko,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=or(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new oa(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new sa(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=or();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Go.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const ca="SyncEngine";class ua{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class la{constructor(e){this.key=e,this.hu=!1}}class ha{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new Qn(e=>zn(e),$n),this.Iu=new Map,this.Eu=new Set,this.du=new ft(se.comparator),this.Au=new Map,this.Ru=new gs,this.Vu={},this.mu=new Map,this.fu=ts.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function fa(e,t,n=!0){const r=Pa(e);let i;const s=r.Tu.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await pa(r,t,n,!0),i}async function da(e,t){const n=Pa(e);await pa(n,t,!0,!1)}async function pa(e,t,n,r){const i=await Vs(e.localStore,Fn(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await ga(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&mo(e.remoteStore,i),a}async function ga(e,t,n,r,i){e.pu=(t,n,r)=>async function(e,t,n,r){let i=t.view.ru(n);i.Cs&&(i=await js(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return ka(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const s=await js(e.localStore,t,!0),o=new aa(t,s.Qs),a=o.ru(s.documents),c=ri.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);ka(e,n,u.au);const l=new ua(t,n,o);return e.Tu.set(t,l),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),u.snapshot}async function ma(e,t,n){const r=P(e),i=r.Tu.get(t),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(e=>!$n(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Fs(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&yo(r.remoteStore,i.targetId),Ca(r,i.targetId)}).catch(Ae)):(Ca(r,i.targetId),await Fs(r.localStore,i.targetId,!0))}async function ya(e,t){const n=P(e),r=n.Tu.get(t),i=n.Iu.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),yo(n.remoteStore,r.targetId))}async function va(e,t,n){const r=Ma(e);try{const e=await function(e,t){const n=P(e),r=ye.now(),i=t.reduce((e,t)=>e.add(t.key),or());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Yn(),c=or();return n.Ns.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=xr(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Mr(e.key,t,rn(t.value.mapValue),Cr.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:er(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||(r=new ft(W)),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r}(r,e.batchId,n),await Oa(r,e.changes),await No(r.remoteStore)}catch(e){const t=Ho(e,"Failed to persist write");n.reject(t)}}async function wa(e,t){const n=P(e);try{const e=await Ms(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(D(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?D(r.hu,14607):e.removedDocuments.size>0&&(D(r.hu,42227),r.hu=!1))}),await Oa(n,e,t)}catch(e){await Ae(e)}}function _a(e,t,n){const r=P(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const i=r.view.va(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=P(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.Sa)i.va(t)&&(r=!0)}),r&&ta(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function ba(e,t,n){const r=P(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Au.get(t),s=i&&i.key;if(s){let e=new ft(se.comparator);e=e.insert(s,sn.newNoDocument(s,ve.min()));const n=or().add(s),i=new ni(ve.min(),new Map,new ft(W),e,n);await wa(r,i),r.du=r.du.remove(s),r.Au.delete(t),Na(r)}else await Fs(r.localStore,t,!1).then(()=>Ca(r,t,n)).catch(Ae)}async function Ea(e,t){const n=P(e),r=t.batch.batchId;try{const e=await Ds(n.localStore,t);Sa(n,r,null),Ia(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Oa(n,e)}catch(e){await Ae(e)}}async function Ta(e,t,n){const r=P(e);try{const e=await function(e,t){const n=P(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(D(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);Sa(r,t,n),Ia(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Oa(r,e)}catch(n){await Ae(n)}}function Ia(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function Sa(e,t,n){const r=P(e);let i=r.Vu[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.Vu[r.currentUser.toKey()]=i}}function Ca(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||Aa(e,t)})}function Aa(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(yo(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),Na(e))}function ka(e,t,n){for(const r of n)r instanceof sa?(e.Ru.addReference(r.key,t),Ra(e,r)):r instanceof oa?(A(ca,"Document no longer in limbo: "+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||Aa(e,r.key)):O(19791,{wu:r})}function Ra(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(A(ca,"New document in limbo: "+n),e.Eu.add(r),Na(e))}function Na(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new se(ne.fromString(t)),r=e.fu.next();e.Au.set(r,new la(n)),e.du=e.du.insert(n,r),mo(e.remoteStore,new Ki(Fn(Mn(n.path)),r,"TargetPurposeLimboResolution",Oe.ce))}}async function Oa(e,t,n){const r=P(e),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){i.push(e);const t=Ss.As(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.Pu.H_(i),await async function(e,t){const n=P(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>ke.forEach(t,t=>ke.forEach(t.Es,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>ke.forEach(t.ds,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Ne(e))throw e;A(ks,"Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.Ms.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(e,i)}}}(r.localStore,s))}async function xa(e,t){const n=P(e);if(!n.currentUser.isEqual(t)){A(ca,"User change. New user:",t.toKey());const e=await xs(n.localStore,t);n.currentUser=t,function(e,t){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new L(M.CANCELLED,t))})}),e.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Oa(n,e.Ls)}}function Da(e,t){const n=P(e),r=n.Au.get(t);if(r&&r.hu)return or().add(r.key);{let e=or();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function Pa(e){const t=P(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=wa.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Da.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=ba.bind(null,t),t.Pu.H_=Zo.bind(null,t.eventManager),t.Pu.yu=ea.bind(null,t.eventManager),t}function Ma(e){const t=P(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ea.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Ta.bind(null,t),t}class La{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=no(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Os(this.persistence,new As,e.initialUser,this.serializer)}Cu(e){return new bs(Ts.mi,this.serializer)}Du(e){return new zs}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}La.provider={build:()=>new La};class Ua extends La{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){D(this.persistence.referenceDelegate instanceof Is,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new os(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?es.withCacheSize(this.cacheSizeBytes):es.DEFAULT;return new bs(e=>Is.mi(e,t),this.serializer)}}class Va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>_a(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=xa.bind(null,this.syncEngine),await jo(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Qo}()}createDatastore(e){const t=no(e.databaseInfo.databaseId),n=function(e){return new eo(e)}(e.databaseInfo);return function(e,t,n,r){return new uo(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,i){return new fo(e,t,n,r,i)}(this.localStore,this.datastore,e.asyncQueue,e=>_a(this.syncEngine,e,0),function(){return Ks.v()?new Ks:new Hs}())}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new ha(e,t,n,r,i,s);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=P(e);A(ho,"RemoteStore shutting down."),t.Ea.add(5),await go(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Va.provider={build:()=>new Va};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fa{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):k("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ja="FirestoreClient";class Ba{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=T.UNAUTHENTICATED,this.clientId=G.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{A(ja,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(A(ja,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new U;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Ho(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function $a(e,t){e.asyncQueue.verifyOperationInProgress(),A(ja,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await xs(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function za(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Ha(e);A(ja,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Fo(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Fo(t.remoteStore,n)),e._onlineComponents=t}async function Ha(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){A(ja,"Using user provided OfflineComponentProvider");try{await $a(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===M.FAILED_PRECONDITION||e.code===M.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;R("Error using user provided cache. Falling back to memory cache: "+n),await $a(e,new La)}}else A(ja,"Using default OfflineComponentProvider"),await $a(e,new Ua(void 0));return e._offlineComponents}async function qa(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(A(ja,"Using user provided OnlineComponentProvider"),await za(e,e._uninitializedComponentsProvider._online)):(A(ja,"Using default OnlineComponentProvider"),await za(e,new Va))),e._onlineComponents}function Ka(e){return qa(e).then(e=>e.syncEngine)}async function Ga(e){const t=await qa(e),n=t.eventManager;return n.onListen=fa.bind(null,t.syncEngine),n.onUnlisten=ma.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=da.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=ya.bind(null,t.syncEngine),n}function Wa(e,t,n={}){const r=new U;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Fa({next:a=>{s.Nu(),t.enqueueAndForget(()=>Jo(e,o));const c=a.docs.has(n);!c&&a.fromCache?i.reject(new L(M.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?i.reject(new L(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new ia(Mn(n.path),s,{includeMetadataChanges:!0,qa:!0});return Yo(e,o)}(await Ga(e),e.asyncQueue,t,n,r)),r.promise}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qa(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Xa=new Map,Ya="firestore.googleapis.com",Ja=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new L(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ya,this.ssl=Ja}else this.host=e.host,this.ssl=e.ssl??Ja;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Zi;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<rs)throw new L(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ae("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qa(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new L(M.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new L(M.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new L(M.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ec{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Za({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new L(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Za(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new F;switch(e.type){case"firstParty":return new z(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new L(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Xa.get(e);t&&(A("ComponentProvider","Removing Datastore"),Xa.delete(e),t.terminate())}(this),Promise.resolve()}}function tc(e,t,n,r={}){e=fe(e,ec);const i=(0,c.zJ)(t),s=e._getSettings(),o={...s,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;i&&((0,c.gE)(`https://${a}`),(0,c.P1)("Firestore",!0)),s.host!==Ya&&s.host!==a&&R("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:a,ssl:i,emulatorOptions:r};if(!(0,c.bD)(u,o)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=T.MOCK_USER;else{t=(0,c.Fy)(r.mockUserToken,e._app?.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new L(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new T(i)}e._authCredentials=new j(new V(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new nc(this.firestore,e,this._query)}}class rc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ic(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rc(this.firestore,e,this._key)}toJSON(){return{type:rc._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(pe(t,rc._jsonSchema))return new rc(e,n||null,new se(ne.fromString(t.referencePath)))}}rc._jsonSchemaVersion="firestore/documentReference/1.0",rc._jsonSchema={type:de("string",rc._jsonSchemaVersion),referencePath:de("string")};class ic extends nc{constructor(e,t,n){super(e,t,Mn(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rc(this.firestore,null,new se(e))}withConverter(e){return new ic(this.firestore,e,this._path)}}function sc(e,t,...n){if(e=(0,c.Ku)(e),oe("collection","path",t),e instanceof ec){const r=ne.fromString(t,...n);return ue(r),new ic(e,null,r)}{if(!(e instanceof rc||e instanceof ic))throw new L(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ne.fromString(t,...n));return ue(r),new ic(e.firestore,null,r)}}function oc(e,t,...n){if(e=(0,c.Ku)(e),1===arguments.length&&(t=G.newId()),oe("doc","path",t),e instanceof ec){const r=ne.fromString(t,...n);return ce(r),new rc(e,null,new se(r))}{if(!(e instanceof rc||e instanceof ic))throw new L(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ne.fromString(t,...n));return ce(r),new rc(e.firestore,e instanceof ic?e.converter:null,new se(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ac="AsyncQueue";class cc{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ro(this,"async_queue_retry"),this._c=()=>{const e=to();e&&A(ac,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=to();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=to();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new U;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Ne(e))throw e;A(ac,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,k("INTERNAL UNHANDLED ERROR: ",uc(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=zo.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&O(47125,{Pc:uc(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function uc(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function lc(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,["next","error","complete"])}class hc extends ec{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new cc,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new cc(e),this._firestoreClient=void 0,await e}}}function fc(e,t){const n="object"==typeof e?e:(0,s.Sx)(),r="string"==typeof e?e:t||xt,i=(0,s.j6)(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const e=(0,c.yU)("firestore");e&&tc(i,...e)}return i}function dc(e){if(e._terminated)throw new L(M.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||pc(e),e._firestoreClient}function pc(e){const t=e._freezeSettings(),n=function(e,t,n,r){return new Ot(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,Qa(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator)}(e._databaseId,e._app?.options.appId||"",e._persistenceKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new Ba(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gc(wt.fromBase64String(e))}catch(e){throw new L(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new gc(wt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:gc._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(pe(e,gc._jsonSchema))return gc.fromBase64String(e.bytes)}}gc._jsonSchemaVersion="firestore/bytes/1.0",gc._jsonSchema={type:de("string",gc._jsonSchemaVersion),bytes:de("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mc{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new L(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yc{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:vc._jsonSchemaVersion}}static fromJSON(e){if(pe(e,vc._jsonSchema))return new vc(e.latitude,e.longitude)}}vc._jsonSchemaVersion="firestore/geoPoint/1.0",vc._jsonSchema={type:de("string",vc._jsonSchemaVersion),latitude:de("number"),longitude:de("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wc{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:wc._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(pe(e,wc._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new wc(e.vectorValues);throw new L(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}wc._jsonSchemaVersion="firestore/vectorValue/1.0",wc._jsonSchema={type:de("string",wc._jsonSchemaVersion),vectorValues:de("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _c=/^__.*__$/;class bc{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Mr(e,this.data,this.fieldMask,t,this.fieldTransforms):new Pr(e,this.data,t,this.fieldTransforms)}}function Ec(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:e})}}class Tc{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Tc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Pc(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(Ec(this.Ac)&&_c.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Ic{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||no(e)}Cc(e,t,n,r=!1){return new Tc({Ac:e,methodName:t,Dc:n,path:ie.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sc(e){const t=e._freezeSettings(),n=no(e._databaseId);return new Ic(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Cc(e,t,n,r,i,s={}){const o=e.Cc(s.merge||s.mergeFields?2:0,t,n,i);Nc("Data must be an object, but it was:",o,r);const a=kc(r,o);let c,u;if(s.merge)c=new yt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=Oc(t,r,n);if(!o.contains(i))throw new L(M.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Mc(e,i)||e.push(i)}c=new yt(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new bc(new nn(a),c,u)}function Ac(e,t){if(Rc(e=(0,c.Ku)(e)))return Nc("Unsupported field value:",t,e),kc(e,t);if(e instanceof yc)return function(e,t){if(!Ec(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Ac(i,t.wc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,c.Ku)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return hr(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ye.fromDate(e);return{timestampValue:mi(t.serializer,n)}}if(e instanceof ye){const n=new ye(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:mi(t.serializer,n)}}if(e instanceof vc)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof gc)return{bytesValue:yi(t.serializer,e._byteString)};if(e instanceof rc){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:_i(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof wc)return function(e,t){const n={fields:{[Pt]:{stringValue:Ut},[Vt]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return ur(t.serializer,e)})}}}};return{mapValue:n}}(e,t);throw t.Sc(`Unsupported field value: ${he(e)}`)}(e,t)}function kc(e,t){const n={};return ht(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):lt(e,(e,r)=>{const i=Ac(r,t.mc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function Rc(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ye||e instanceof vc||e instanceof gc||e instanceof rc||e instanceof yc||e instanceof wc)}function Nc(e,t,n){if(!Rc(n)||!le(n)){const r=he(n);throw"an object"===r?t.Sc(e+" a custom object"):t.Sc(e+" "+r)}}function Oc(e,t,n){if((t=(0,c.Ku)(t))instanceof mc)return t._internalPath;if("string"==typeof t)return Dc(e,t);throw Pc("Field path arguments must be of type string or ",e,!1,void 0,n)}const xc=new RegExp("[~\\*/\\[\\]]");function Dc(e,t,n){if(t.search(xc)>=0)throw Pc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new mc(...t.split("."))._internalPath}catch(r){throw Pc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Pc(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new L(M.INVALID_ARGUMENT,a+e+c)}function Mc(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new rc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Uc(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Vc("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Uc extends Lc{data(){return super.data()}}function Vc(e,t){return"string"==typeof t?Dc(e,t):t instanceof mc?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new L(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jc{convertValue(e,t="none"){switch(Ft(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Et(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw O(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return lt(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[Vt].arrayValue?.values?.map(e=>Et(e.doubleValue));return new wc(t)}convertGeoPoint(e){return new vc(Et(e.latitude),Et(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Rt(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Nt(e));default:return null}}convertTimestamp(e){const t=bt(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ne.fromString(e);D(qi(n),9688,{name:e});const r=new Dt(n.get(1),n.get(3)),i=new se(n.popFirst(5));return r.isEqual(t)||k(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class $c{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zc extends Lc{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Hc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Vc("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=zc._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}zc._jsonSchemaVersion="firestore/documentSnapshot/1.0",zc._jsonSchema={type:de("string",zc._jsonSchemaVersion),bundleSource:de("string","DocumentSnapshot"),bundleName:de("string"),bundle:de("string")};class Hc extends zc{data(e={}){return super.data(e)}}class qc{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new $c(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Hc(this._firestore,this._userDataWriter,n.key,n,new $c(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Hc(e._firestore,e._userDataWriter,n.doc.key,n.doc,new $c(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Hc(e._firestore,e._userDataWriter,t.doc.key,t.doc,new $c(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:Kc(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qc._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=G.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Kc(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:e})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gc(e){e=fe(e,rc);const t=fe(e.firestore,hc);return Wa(dc(t),e._key).then(n=>Jc(t,e,n))}qc._jsonSchemaVersion="firestore/querySnapshot/1.0",qc._jsonSchema={type:de("string",qc._jsonSchemaVersion),bundleSource:de("string","QuerySnapshot"),bundleName:de("string"),bundle:de("string")};class Wc extends jc{constructor(e){super(),this.firestore=e}convertBytes(e){return new gc(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new rc(this.firestore,null,t)}}function Qc(e,t,n){e=fe(e,rc);const r=fe(e.firestore,hc),i=Bc(e.converter,t,n);return Yc(r,[Cc(Sc(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,Cr.none())])}function Xc(e,...t){e=(0,c.Ku)(e);let n={includeMetadataChanges:!1,source:"default"},r=0;"object"!=typeof t[r]||lc(t[r])||(n=t[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(lc(t[r])){const e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let s,o,a;if(e instanceof rc)o=fe(e.firestore,hc),a=Mn(e._key.path),s={next:n=>{t[r]&&t[r](Jc(o,e,n))},error:t[r+1],complete:t[r+2]};else{const n=fe(e,nc);o=fe(n.firestore,hc),a=n._query;const i=new Wc(o);s={next:e=>{t[r]&&t[r](new qc(o,i,n,e))},error:t[r+1],complete:t[r+2]},Fc(e._query)}return function(e,t,n,r){const i=new Fa(r),s=new ia(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Yo(await Ga(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>Jo(await Ga(e),s))}}(dc(o),a,i,s)}function Yc(e,t){return function(e,t){const n=new U;return e.asyncQueue.enqueueAndForget(async()=>va(await Ka(e),t,n)),n.promise}(dc(e),t)}function Jc(e,t,n){const r=n.docs.get(t._key),i=new Wc(e);return new zc(e,i,t._key,r,new $c(n.hasPendingWrites,n.fromCache),t.converter)}new WeakMap;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){!function(e){I=e}(s.MF),(0,s.om)(new o.uA("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new hc(new B(e.getProvider("auth-internal")),new q(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new L(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Dt(e.options.projectId,t)}(i,n),i);return r={useFetchStreams:t,...r},s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,s.KO)(b,E,e),(0,s.KO)(b,E,"esm2020")}()},2839:function(e,t,n){var r=n(4576),i=r.navigator,s=i&&i.userAgent;e.exports=s?String(s):""},2967:function(e,t,n){var r=n(6706),i=n(34),s=n(7750),o=n(3506);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.prototype,"__proto__","set"),e(n,[]),t=n instanceof Array}catch(a){}return function(n,r){return s(n),o(r),i(n)?(t?e(n,r):n.__proto__=r,n):n}}():void 0)},3167:function(e,t,n){var r=n(4901),i=n(34),s=n(2967);e.exports=function(e,t,n){var o,a;return s&&r(o=t.constructor)&&o!==n&&i(a=o.prototype)&&a!==n.prototype&&s(e,a),e}},3238:function(e,t,n){var r=n(4576),i=n(7811),s=n(7394),o=r.DataView;e.exports=function(e){if(!i||0!==s(e))return!1;try{return new o(e),!1}catch(t){return!0}}},3392:function(e,t,n){var r=n(9504),i=0,s=Math.random(),o=r(1.1.toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+o(++i+s,36)}},3440:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(5170),a=n(3789),c=n(8469),u=n(507),l=i.has,h=i.remove;e.exports=function(e){var t=r(this),n=a(e),i=s(t);return o(t)<=n.size?c(t,function(e){n.includes(e)&&h(i,e)}):u(n.getIterator(),function(e){l(i,e)&&h(i,e)}),i}},3463:function(e){var t=TypeError;e.exports=function(e){if("string"==typeof e)return e;throw new t("Argument is not a string")}},3506:function(e,t,n){var r=n(3925),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s("Can't set "+i(e)+" as a prototype")}},3579:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("some",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{some:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},3650:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(3789),a=n(507),c=i.add,u=i.has,l=i.remove;e.exports=function(e){var t=r(this),n=o(e).getIterator(),i=s(t);return a(n,function(e){u(t,e)?l(i,e):c(i,e)}),i}},3706:function(e,t,n){var r=n(9504),i=n(4901),s=n(7629),o=r(Function.toString);i(s.inspectSource)||(s.inspectSource=function(e){return o(e)}),e.exports=s.inspectSource},3717:function(e,t){t.f=Object.getOwnPropertySymbols},3724:function(e,t,n){var r=n(9039);e.exports=!r(function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]})},3789:function(e,t,n){var r=n(9306),i=n(8551),s=n(9565),o=n(1291),a=n(1767),c="Invalid size",u=RangeError,l=TypeError,h=Math.max,f=function(e,t){this.set=e,this.size=h(t,0),this.has=r(e.has),this.keys=r(e.keys)};f.prototype={getIterator:function(){return a(i(s(this.keys,this.set)))},includes:function(e){return s(this.has,this.set,e)}},e.exports=function(e){i(e);var t=+e.size;if(t!==t)throw new l(c);var n=o(t);if(n<0)throw new u(c);return new f(e,n)}},3838:function(e,t,n){var r=n(7080),i=n(5170),s=n(8469),o=n(3789);e.exports=function(e){var t=r(this),n=o(e);return!(i(t)>n.size)&&!1!==s(t,function(e){if(!n.includes(e))return!1},!0)}},3853:function(e,t,n){var r=n(6518),i=n(4449),s=n(4916),o=!s("isDisjointFrom",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isDisjointFrom:i})},3925:function(e,t,n){var r=n(34);e.exports=function(e){return r(e)||null===e}},3972:function(e,t,n){var r=n(34),i=String,s=TypeError;e.exports=function(e){if(void 0===e||r(e))return e;throw new s(i(e)+" is not an object or undefined")}},4055:function(e,t,n){var r=n(4576),i=n(34),s=r.document,o=i(s)&&i(s.createElement);e.exports=function(e){return o?s.createElement(e):{}}},4114:function(e,t,n){var r=n(6518),i=n(8981),s=n(6198),o=n(4527),a=n(6837),c=n(9039),u=c(function(){return 4294967297!==[].push.call({length:4294967296},1)}),l=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=u||!l();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=i(this),n=s(t),r=arguments.length;a(n+r);for(var c=0;c<r;c++)t[n]=arguments[c],n++;return o(t,n),n}})},4117:function(e){e.exports=function(e){return null===e||void 0===e}},4154:function(e,t,n){var r=n(6955),i=TypeError;e.exports=function(e){if("Uint8Array"===r(e))return e;throw new i("Argument is not an Uint8Array")}},4204:function(e,t,n){var r=n(7080),i=n(4402).add,s=n(9286),o=n(3789),a=n(507);e.exports=function(e){var t=r(this),n=o(e).getIterator(),c=s(t);return a(n,function(e){i(c,e)}),c}},4209:function(e,t,n){var r=n(8227),i=n(6269),s=r("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||o[s]===e)}},4215:function(e,t,n){var r=n(4576),i=n(2839),s=n(2195),o=function(e){return i.slice(0,e.length)===e};e.exports=function(){return o("Bun/")?"BUN":o("Cloudflare-Workers")?"CLOUDFLARE":o("Deno/")?"DENO":o("Node.js/")?"NODE":r.Bun&&"string"==typeof Bun.version?"BUN":r.Deno&&"object"==typeof Deno.version?"DENO":"process"===s(r.process)?"NODE":r.window&&r.document?"BROWSER":"REST"}()},4226:function(e,t,n){var r=n(6518),i=n(4576),s=n(3463),o=n(4154),a=n(5169),c=n(2303);i.Uint8Array&&r({target:"Uint8Array",proto:!0},{setFromHex:function(e){o(this),s(e),a(this.buffer);var t=c(e,this).read;return{read:t,written:t/2}}})},4232:function(e,t,n){n.d(t,{$3:function(){return d},$H:function(){return U},BH:function(){return q},BX:function(){return ne},Bm:function(){return b},C4:function(){return Y},CE:function(){return g},CP:function(){return u},DY:function(){return V},Gv:function(){return E},J$:function(){return Z},Kg:function(){return _},MZ:function(){return i},Mp:function(){return c},NO:function(){return a},Oj:function(){return s},PT:function(){return x},Qd:function(){return A},Ro:function(){return B},SU:function(){return R},TF:function(){return h},Tg:function(){return P},Tn:function(){return w},Tr:function(){return K},We:function(){return z},X$:function(){return l},Y2:function(){return ee},ZH:function(){return M},Zf:function(){return C},bB:function(){return j},cy:function(){return p},gd:function(){return v},pD:function(){return r},rU:function(){return L},tE:function(){return o},u3:function(){return re},vM:function(){return m},v_:function(){return se},yI:function(){return k},yL:function(){return T},yQ:function(){return F}});n(4114),n(8111),n(2489),n(7588);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function r(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return e=>e in t}const i={},s=[],o=()=>{},a=()=>!1,c=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),u=e=>e.startsWith("onUpdate:"),l=Object.assign,h=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},f=Object.prototype.hasOwnProperty,d=(e,t)=>f.call(e,t),p=Array.isArray,g=e=>"[object Map]"===S(e),m=e=>"[object Set]"===S(e),y=e=>"[object Date]"===S(e),v=e=>"[object RegExp]"===S(e),w=e=>"function"===typeof e,_=e=>"string"===typeof e,b=e=>"symbol"===typeof e,E=e=>null!==e&&"object"===typeof e,T=e=>(E(e)||w(e))&&w(e.then)&&w(e.catch),I=Object.prototype.toString,S=e=>I.call(e),C=e=>S(e).slice(8,-1),A=e=>"[object Object]"===S(e),k=e=>_(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,R=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),N=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},O=/-(\w)/g,x=N(e=>e.replace(O,(e,t)=>t?t.toUpperCase():"")),D=/\B([A-Z])/g,P=N(e=>e.replace(D,"-$1").toLowerCase()),M=N(e=>e.charAt(0).toUpperCase()+e.slice(1)),L=N(e=>{const t=e?`on${M(e)}`:"";return t}),U=(e,t)=>!Object.is(e,t),V=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},F=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},j=e=>{const t=parseFloat(e);return isNaN(t)?e:t},B=e=>{const t=_(e)?Number(e):NaN;return isNaN(t)?e:t};let $;const z=()=>$||($="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{});const H="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",q=r(H);function K(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=_(r)?X(r):K(r);if(i)for(const e in i)t[e]=i[e]}return t}if(_(e)||E(e))return e}const G=/;(?![^(]*\))/g,W=/:([^]+)/,Q=/\/\*[^]*?\*\//g;function X(e){const t={};return e.replace(Q,"").split(G).forEach(e=>{if(e){const n=e.split(W);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Y(e){let t="";if(_(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const r=Y(e[n]);r&&(t+=r+" ")}else if(E(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const J="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Z=r(J);function ee(e){return!!e||""===e}function te(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ne(e[r],t[r]);return n}function ne(e,t){if(e===t)return!0;let n=y(e),r=y(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=b(e),r=b(t),n||r)return e===t;if(n=p(e),r=p(t),n||r)return!(!n||!r)&&te(e,t);if(n=E(e),r=E(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,s=Object.keys(t).length;if(i!==s)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ne(e[n],t[n]))return!1}}return String(e)===String(t)}function re(e,t){return e.findIndex(e=>ne(e,t))}const ie=e=>!(!e||!0!==e["__v_isRef"]),se=e=>_(e)?e:null==e?"":p(e)||E(e)&&(e.toString===I||!w(e.toString))?ie(e)?se(e.value):JSON.stringify(e,oe,2):String(e),oe=(e,t)=>ie(t)?oe(e,t.value):g(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[ae(t,r)+" =>"]=n,e),{})}:m(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ae(e))}:b(t)?ae(t):!E(t)||p(t)||A(t)?t:String(t),ae=(e,t="")=>{var n;return b(e)?`Symbol(${null!=(n=e.description)?n:t})`:e}},4270:function(e,t,n){var r=n(9565),i=n(4901),s=n(34),o=TypeError;e.exports=function(e,t){var n,a;if("string"===t&&i(n=e.toString)&&!s(a=r(n,e)))return a;if(i(n=e.valueOf)&&!s(a=r(n,e)))return a;if("string"!==t&&i(n=e.toString)&&!s(a=r(n,e)))return a;throw new o("Can't convert object to primitive value")}},4376:function(e,t,n){var r=n(2195);e.exports=Array.isArray||function(e){return"Array"===r(e)}},4388:function(e,t,n){n.d(t,{xI:function(){return Jr},hg:function(){return jt},zK:function(){return Nt},p:function(){return Ut}});n(4114),n(8111),n(2489),n(116),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(4603),n(7566),n(8721);var r=n(262),i=n(2455),s=n(6189),o=n(798);function a(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const c=a,u=new i.FA("auth","Firebase",a()),l=new s.Vy("@firebase/auth");function h(e,...t){l.logLevel<=s.$b.WARN&&l.warn(`Auth (${r.MF}): ${e}`,...t)}function f(e,...t){l.logLevel<=s.$b.ERROR&&l.error(`Auth (${r.MF}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function g(e,t,n){const r={...c(),[t]:n},s=new i.FA("auth","Firebase",r);return s.create(t,{appName:e.name})}function m(e){return g(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function y(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return u.create(e,...t)}function v(e,t,...n){if(!e)throw y(t,...n)}function w(e){const t="INTERNAL ASSERTION FAILED: "+e;throw f(t),new Error(t)}function _(e,t){e||w(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!==typeof self&&self.location?.href||""}function E(){return"http:"===T()||"https:"===T()}function T(){return"undefined"!==typeof self&&self.location?.protocol||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(E()||(0,i.sr)()||"connection"in navigator))||navigator.onLine}function S(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.shortDelay=e,this.longDelay=t,_(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return I()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e,t){_(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void w("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void w("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void w("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"missing-password",["INVALID_LOGIN_CREDENTIALS"]:"invalid-credential",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]:"password-does-not-meet-requirements",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error",["RECAPTCHA_NOT_ENABLED"]:"recaptcha-not-enabled",["MISSING_RECAPTCHA_TOKEN"]:"missing-recaptcha-token",["INVALID_RECAPTCHA_TOKEN"]:"invalid-recaptcha-token",["INVALID_RECAPTCHA_ACTION"]:"invalid-recaptcha-action",["MISSING_CLIENT_TYPE"]:"missing-client-type",["MISSING_RECAPTCHA_VERSION"]:"missing-recaptcha-version",["INVALID_RECAPTCHA_VERSION"]:"invalid-recaptcha-version",["INVALID_REQ_TYPE"]:"invalid-req-type"},N=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],O=new C(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function D(e,t,n,r,s={}){return P(e,s,async()=>{let s={},o={};r&&("GET"===t?o=r:s={body:JSON.stringify(r)});const a=(0,i.Am)({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:c,...s};return(0,i.c1)()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(u.credentials="include"),k.fetch()(await L(e,e.config.apiHost,n,a),u)})}async function P(e,t,n){e._canInitEmulator=!1;const r={...R,...t};try{const t=new V(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw F(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw F(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw F(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw F(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw g(e,a,o);d(e,a)}}catch(s){if(s instanceof i.g)throw s;d(e,"network-request-failed",{message:String(s)})}}async function M(e,t,n,r,i={}){const s=await D(e,t,n,r,i);return"mfaPendingCredential"in s&&d(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function L(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?A(e.config,i):`${e.config.apiScheme}://${i}`;if(N.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){const e=s._getPersistence();return e._getFinalTarget(o).toString()}return o}function U(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class V{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),O.get())})}}function F(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e){return void 0!==e&&void 0!==e.enterprise}class B{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return U(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t){return D(e,"GET","/v2/recaptchaConfig",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e,t){return D(e,"POST","/v1/accounts:delete",t)}async function H(e,t){return D(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e,t=!1){const n=(0,i.Ku)(e),r=await n.getIdToken(t),s=W(r);v(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"===typeof s.firebase?s.firebase:void 0,a=o?.["sign_in_provider"];return{claims:s,token:r,authTime:q(G(s.auth_time)),issuedAtTime:q(G(s.iat)),expirationTime:q(G(s.exp)),signInProvider:a||null,signInSecondFactor:o?.["sign_in_second_factor"]||null}}function G(e){return 1e3*Number(e)}function W(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return f("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(f("Failed to decode base64 JWT payload"),null)}catch(s){return f("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Q(e){const t=W(e);return v(t,"internal-error"),v("undefined"!==typeof t.exp,"internal-error"),v("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof i.g&&Y(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function Y({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=this.user.stsTokenManager.expirationTime??0,t=e-Date.now()-3e5;return Math.max(0,t)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=q(this.lastLoginAt),this.creationTime=q(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ee(e){const t=e.auth,n=await e.getIdToken(),r=await X(e,H(t,{idToken:n}));v(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=i.providerUserInfo?.length?re(i.providerUserInfo):[],o=ne(e.providerData,s),a=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!o?.length,u=!!a&&c,l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Z(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,l)}async function te(e){const t=(0,i.Ku)(e);await ee(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function ne(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}function re(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ie(e,t){const n=await P(e,{},async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,o=await L(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),k.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function se(e,t){return D(e,"POST","/v2/accounts:revokeToken",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v("undefined"!==typeof e.idToken,"internal-error"),v("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):Q(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(0!==e.length,"internal-error");const t=Q(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await ie(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new oe;return n&&(v("string"===typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(v("string"===typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(v("number"===typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new oe,this.toJSON())}_performRefresh(){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(e,t){v("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class ce{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new J(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Z(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await X(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return K(this,e)}reload(){return te(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ce({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ee(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(m(this.auth));const e=await this.getIdToken();return await X(this,z(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:f,providerData:d,stsTokenManager:p}=t;v(l&&p,e,"internal-error");const g=oe.fromJSON(this.name,p);v("string"===typeof l,e,"internal-error"),ae(n,e.name),ae(r,e.name),v("boolean"===typeof h,e,"internal-error"),v("boolean"===typeof f,e,"internal-error"),ae(i,e.name),ae(s,e.name),ae(o,e.name),ae(a,e.name),ae(c,e.name),ae(u,e.name);const m=new ce({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:f,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:g,createdAt:c,lastLoginAt:u});return d&&Array.isArray(d)&&(m.providerData=d.map(e=>({...e}))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,t,n=!1){const r=new oe;r.updateFromServerResponse(t);const i=new ce({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await ee(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];v(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?re(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,o=new oe;o.updateFromIdToken(n);const a=new ce({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Z(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Map;function le(e){_(e instanceof Function,"Expected a class definition");let t=ue.get(e);return t?(_(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ue.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}he.type="NONE";const fe=he;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(e,t,n){return`firebase:${e}:${t}:${n}`}class pe{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=de(this.userKey,r.apiKey,i),this.fullPersistenceKey=de("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await H(this.auth,{idToken:e}).catch(()=>{});return t?ce._fromGetAccountInfoResponse(this.auth,t,e):null}return ce._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new pe(le(fe),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||le(fe);const s=de(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(s);if(t){let n;if("string"===typeof t){const r=await H(e,{idToken:t}).catch(()=>{});if(!r)break;n=await ce._fromGetAccountInfoResponse(e,r,t)}else n=ce._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}})),new pe(i,e,n)):new pe(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(we(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(me(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(be(t))return"Blackberry";if(Ee(t))return"Webos";if(ye(t))return"Safari";if((t.includes("chrome/")||ve(t))&&!t.includes("edge/"))return"Chrome";if(_e(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function me(e=(0,i.ZQ)()){return/firefox\//i.test(e)}function ye(e=(0,i.ZQ)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ve(e=(0,i.ZQ)()){return/crios\//i.test(e)}function we(e=(0,i.ZQ)()){return/iemobile/i.test(e)}function _e(e=(0,i.ZQ)()){return/android/i.test(e)}function be(e=(0,i.ZQ)()){return/blackberry/i.test(e)}function Ee(e=(0,i.ZQ)()){return/webos/i.test(e)}function Te(e=(0,i.ZQ)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ie(e=(0,i.ZQ)()){return Te(e)&&!!window.navigator?.standalone}function Se(){return(0,i.lT)()&&10===document.documentMode}function Ce(e=(0,i.ZQ)()){return Te(e)||_e(e)||Ee(e)||be(e)||/windows phone/i.test(e)||we(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(e,t=[]){let n;switch(e){case"Browser":n=ge((0,i.ZQ)());break;case"Worker":n=`${ge((0,i.ZQ)())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${r.MF}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{const r=e(t);n(r)}catch(i){r(i)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Re(e,t={}){return D(e,"GET","/v2/passwordPolicy",x(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne=6;class Oe{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ne,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Pe(this),this.idTokenSubscription=new Pe(this),this.beforeStateQueue=new ke(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=u,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=le(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await pe.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await H(this,{idToken:e}),n=await ce._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==r||!s?.user||(n=s.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(s){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ee(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=S()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(m(this));const t=e?(0,i.Ku)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(m(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(m(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(le(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Re(this),t=new Oe(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(n.tenantId=this.tenantId),await se(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&le(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await pe.create(this,[le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ae(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&h(`Error while retrieving App Check token: ${e.error}`),e?.token}}function De(e){return(0,i.Ku)(e)}class Pe{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)(e=>this.observer=e)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Me={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Le(e){Me=e}function Ue(e){return Me.loadJS(e)}function Ve(){return Me.recaptchaEnterpriseScript}function Fe(){return Me.gapiScript}function je(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.enterprise=new $e}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class $e{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ze="recaptcha-enterprise",He="NO_RECAPTCHA";class qe{constructor(e){this.type=ze,this.auth=De(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{$(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new B(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const i=window.grecaptcha;j(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(He)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){const e=new Be;return e.execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&j(window.grecaptcha))r(n,e,i);else{if("undefined"===typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=Ve();0!==t.length&&(t+=n),Ue(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function Ke(e,t,n,r=!1,i=!1){const s=new qe(e);let o;if(i)o=He;else try{o=await s.verify(n)}catch(c){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ge(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)})}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ke(e,t,n);return r(e,i).catch(async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ke(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{const i=await Ke(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function We(e){const t=De(e),n=await $(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new B(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){const e=new qe(t);e.verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;d(e,"already-initialized")}const s=n.initialize({options:t});return s}function Xe(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(le);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function Ye(e,t,n){const r=De(e);v(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!!n?.disableWarnings,o=Je(t),{host:a,port:c}=Ze(t),u=null===c?"":`:${c}`,l={url:`${o}//${a}${u}/`},h=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator)return v(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void v((0,i.bD)(l,r.config.emulator)&&(0,i.bD)(h,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(a)?((0,i.gE)(`${o}//${a}${u}`),(0,i.P1)("Auth",!0)):s||tt()}function Je(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Ze(e){const t=Je(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:et(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:et(t)}}}function et(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function tt(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return w("not implemented")}_getIdTokenResponse(e){return w("not implemented")}_linkToIdToken(e,t){return w("not implemented")}_getReauthenticationResolver(e){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rt(e,t){return D(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function it(e,t){return M(e,"POST","/v1/accounts:signInWithPassword",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function st(e,t){return M(e,"POST","/v1/accounts:signInWithEmailLink",x(e,t))}async function ot(e,t){return M(e,"POST","/v1/accounts:signInWithEmailLink",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends nt{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new at(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new at(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,t,"signInWithPassword",it,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return st(e,{email:this._email,oobCode:this._password});default:d(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,n,"signUpPassword",rt,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ot(e,{idToken:t,email:this._email,oobCode:this._password});default:d(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ct(e,t){return M(e,"POST","/v1/accounts:signInWithIdp",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="http://localhost";class lt extends nt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new lt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):d("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new lt(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return ct(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,ct(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ct(e,t)}buildRequest(){const e={requestUri:ut,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=(0,i.Am)(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ht(e,t){return D(e,"POST","/v1/accounts:sendVerificationCode",x(e,t))}async function ft(e,t){return M(e,"POST","/v1/accounts:signInWithPhoneNumber",x(e,t))}async function dt(e,t){const n=await M(e,"POST","/v1/accounts:signInWithPhoneNumber",x(e,t));if(n.temporaryProof)throw F(e,"account-exists-with-different-credential",n);return n}const pt={["USER_NOT_FOUND"]:"user-not-found"};async function gt(e,t){const n={...t,operation:"REAUTH"};return M(e,"POST","/v1/accounts:signInWithPhoneNumber",x(e,n),pt)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends nt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new mt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new mt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ft(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return dt(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return gt(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new mt({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function vt(e){const t=(0,i.I9)((0,i.hp)(e))["link"],n=t?(0,i.I9)((0,i.hp)(t))["deep_link_id"]:null,r=(0,i.I9)((0,i.hp)(e))["deep_link_id"],s=r?(0,i.I9)((0,i.hp)(r))["link"]:null;return s||r||n||t||e}class wt{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t["apiKey"]??null,r=t["oobCode"]??null,s=yt(t["mode"]??null);v(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t["continueUrl"]??null,this.languageCode=t["lang"]??null,this.tenantId=t["tenantId"]??null}static parseLink(e){const t=vt(e);try{return new wt(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t{constructor(){this.providerId=_t.PROVIDER_ID}static credential(e,t){return at._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=wt.parseLink(t);return v(n,"argument-error"),at._fromEmailAndCode(e,n.code,n.tenantId)}}_t.PROVIDER_ID="password",_t.EMAIL_PASSWORD_SIGN_IN_METHOD="password",_t.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends bt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tt extends Et{constructor(){super("facebook.com")}static credential(e){return lt._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Tt.credential(e.oauthAccessToken)}catch{return null}}}Tt.FACEBOOK_SIGN_IN_METHOD="facebook.com",Tt.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class It extends Et{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return lt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return It.credential(t,n)}catch{return null}}}It.GOOGLE_SIGN_IN_METHOD="google.com",It.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class St extends Et{constructor(){super("github.com")}static credential(e){return lt._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com",St.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ct extends Et{constructor(){super("twitter.com")}static credential(e,t){return lt._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ct.credential(t,n)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function At(e,t){return M(e,"POST","/v1/accounts:signUp",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ct.TWITTER_SIGN_IN_METHOD="twitter.com",Ct.PROVIDER_ID="twitter.com";class kt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await ce._fromIdTokenResponse(e,n,r),s=Rt(n),o=new kt({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Rt(n);return new kt({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Rt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nt(e){if((0,r.xZ)(e.app))return Promise.reject(m(e));const t=De(e);if(await t._initializationPromise,t.currentUser?.isAnonymous)return new kt({user:t.currentUser,providerId:null,operationType:"signIn"});const n=await At(t,{returnSecureToken:!0}),i=await kt._fromIdTokenResponse(t,"signIn",n,!0);return await t._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Ot.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Ot(e,t,n,r)}}function xt(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Ot._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dt(e,t,n=!1){const r=await X(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return kt._forOperation(e,"link",r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Pt(e,t,n=!1){const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(m(i));const s="reauthenticate";try{const r=await X(e,xt(i,s,t,e),n);v(r.idToken,i,"internal-error");const o=W(r.idToken);v(o,i,"internal-error");const{sub:a}=o;return v(e.uid===a,i,"user-mismatch"),kt._forOperation(e,s,r)}catch(o){throw"auth/user-not-found"===o?.code&&d(i,"user-mismatch"),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mt(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i="signIn",s=await xt(e,i,t),o=await kt._fromIdTokenResponse(e,i,s);return n||await e._updateCurrentUser(o.user),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Lt(e,t){return M(e,"POST","/v1/accounts:signInWithCustomToken",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ut(e,t){if((0,r.xZ)(e.app))return Promise.reject(m(e));const n=De(e),i=await Lt(n,{token:t,returnSecureToken:!0}),s=await kt._fromIdTokenResponse(n,"signIn",i);return await n._updateCurrentUser(s.user),s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(e,t,n,r){return(0,i.Ku)(e).onIdTokenChanged(t,n,r)}function Ft(e,t,n){return(0,i.Ku)(e).beforeAuthStateChanged(t,n)}function jt(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Bt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:start",x(e,t))}function $t(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:finalize",x(e,t))}function zt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:start",x(e,t))}function Ht(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:finalize",x(e,t))}new WeakMap;const qt="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(qt,"1"),this.storage.removeItem(qt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=1e3,Wt=10;class Qt extends Kt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ce(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Se()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Wt):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Gt)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Qt.type="LOCAL";const Xt=Qt,Yt=1e3;
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function Zt(e){const t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class en{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=Zt(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return Jt(t)}async _remove(e){if(!this._isAvailable())return;const t=await this._get(e);if(!t)return;const n=Zt(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=Zt(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);const i=e.deleted.find(e=>e.name===n);i&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=Jt(n);const i=setInterval(()=>{const e=Jt(n);e!==r&&(t(e),r=e)},Yt),s=()=>clearInterval(i);this.listenerUnsubscribes.set(t,s)}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}en.type="COOKIE";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tn extends Kt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tn.type="SESSION";const nn=tn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(e){return Promise.all(e.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new sn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await rn(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function on(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sn.receivers=[];class an{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=on("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(){return window}function un(e){cn().location.href=e}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(){return"undefined"!==typeof cn()["WorkerGlobalScope"]&&"function"===typeof cn()["importScripts"]}async function hn(){if(!navigator?.serviceWorker)return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch{return null}}function fn(){return navigator?.serviceWorker?.controller||null}function dn(){return ln()?self:null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="firebaseLocalStorageDb",gn=1,mn="firebaseLocalStorage",yn="fbase_key";class vn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function wn(e,t){return e.transaction([mn],t?"readwrite":"readonly").objectStore(mn)}function _n(){const e=indexedDB.deleteDatabase(pn);return new vn(e).toPromise()}function bn(){const e=indexedDB.open(pn,gn);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(mn,{keyPath:yn})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(mn)?t(n):(n.close(),await _n(),t(await bn()))})})}async function En(e,t,n){const r=wn(e,!0).put({[yn]:t,value:n});return new vn(r).toPromise()}async function Tn(e,t){const n=wn(e,!1).get(t),r=await new vn(n).toPromise();return void 0===r?null:r.value}function In(e,t){const n=wn(e,!0).delete(t);return new vn(n).toPromise()}const Sn=800,Cn=3;class An{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await bn()),this.db}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>Cn)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ln()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sn._getInstance(dn()),this.receiver._subscribe("keyChanged",async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await hn(),!this.activeServiceWorker)return;this.sender=new an(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&fn()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bn();return await En(e,qt,"1"),await In(e,qt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>En(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>Tn(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>In(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=wn(e,!1).getAll();return new vn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sn)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}An.type="LOCAL";const kn=An;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:start",x(e,t))}function Nn(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:finalize",x(e,t))}function On(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:finalize",x(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je("rcb"),new C(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xn="recaptcha";async function Dn(e,t,n){if(!e._getRecaptchaConfig())try{await We(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){v("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===He){v(n?.type===xn,e,"argument-error");const r=await Pn(e,t,n);return Bt(e,r)}return Bt(e,t)},o=Ge(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),a=await o.catch(e=>Promise.reject(e));return a.phoneSessionInfo.sessionInfo}{v("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;v(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===He){v(n?.type===xn,e,"argument-error");const r=await Pn(e,t,n);return Rn(e,r)}return Rn(e,t)},a=Ge(e,s,"mfaSmsSignIn",o,"PHONE_PROVIDER"),c=await a.catch(e=>Promise.reject(e));return c.phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===He){v(n?.type===xn,e,"argument-error");const r=await Pn(e,t,n);return ht(e,r)}return ht(e,t)},s=Ge(e,t,"sendVerificationCode",i,"PHONE_PROVIDER"),o=await s.catch(e=>Promise.reject(e));return o.sessionInfo}}finally{n?._reset()}}async function Pn(e,t,n){v(n.type===xn,e,"argument-error");const r=await n.verify();v("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this.providerId=Mn.PROVIDER_ID,this.auth=De(e)}verifyPhoneNumber(e,t){return Dn(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return mt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Mn.credentialFromTaggedObject(t)}static credentialFromError(e){return Mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?mt._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ln(e,t){return t?le(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mn.PROVIDER_ID="phone",Mn.PHONE_SIGN_IN_METHOD="phone";class Un extends nt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ct(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ct(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ct(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Vn(e){return Mt(e.auth,new Un(e),e.bypassAuthState)}function Fn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Pt(n,new Un(e),e.bypassAuthState)}async function jn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Dt(n,new Un(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Vn;case"linkViaPopup":case"linkViaRedirect":return jn;case"reauthViaPopup":case"reauthViaRedirect":return Fn;default:d(this.auth,"internal-error")}}resolve(e){_(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new C(2e3,1e4);class zn extends Bn{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,zn.currentPopupAction&&zn.currentPopupAction.cancel(),zn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){_(1===this.filter.length,"Popup operations only handle one event");const e=on();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zn.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,$n.get())};e()}}zn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Hn="pendingRedirect",qn=new Map;class Kn extends Bn{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=qn.get(this.auth._key());if(!e){try{const t=await Gn(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}qn.set(this.auth._key(),e)}return this.bypassAuthState||qn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Gn(e,t){const n=Xn(t),r=Qn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}function Wn(e,t){qn.set(e._key(),t)}function Qn(e){return le(e._redirectPersistence)}function Xn(e){return de(Hn,e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yn(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i=De(e),s=Ln(i,t),o=new Kn(i,s,n),a=await o.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jn=6e5;class Zn{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nr(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!tr(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Jn&&this.cachedEventUids.clear(),this.cachedEventUids.has(er(e))}saveEventToCache(e){this.cachedEventUids.add(er(e)),this.lastProcessedEventTime=Date.now()}}function er(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function tr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function nr(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tr(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rr(e,t={}){return D(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sr=/^https?/;async function or(e){if(e.config.emulator)return;const{authorizedDomains:t}=await rr(e);for(const n of t)try{if(ar(n))return}catch{}d(e,"unauthorized-domain")}function ar(e){const t=b(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!sr.test(n))return!1;if(ir.test(e))return r===e;const i=e.replace(/\./g,"\\."),s=new RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=new C(3e4,6e4);function ur(){const e=cn().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function lr(e){return new Promise((t,n)=>{function r(){ur(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{ur(),n(p(e,"network-request-failed"))},timeout:cr.get()})}if(cn().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!cn().gapi?.load){const t=je("iframefcb");return cn()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},Ue(`${Fe()}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw hr=null,e})}let hr=null;function fr(e){return hr=hr||lr(e),hr}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=new C(5e3,15e3),pr="__/auth/iframe",gr="emulator/auth/iframe",mr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},yr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vr(e){const t=e.config;v(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?A(t,gr):`https://${e.config.authDomain}/${pr}`,s={apiKey:t.apiKey,appName:e.name,v:r.MF},o=yr.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${(0,i.Am)(s).slice(1)}`}async function wr(e){const t=await fr(e),n=cn().gapi;return v(n,e,"internal-error"),t.open({where:document.body,url:vr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:mr,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),s=cn().setTimeout(()=>{r(i)},dr.get());function o(){cn().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},br=500,Er=600,Tr="_blank",Ir="http://localhost";class Sr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Cr(e,t,n,r=br,s=Er){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={..._r,width:r.toString(),height:s.toString(),top:o,left:a},l=(0,i.ZQ)().toLowerCase();n&&(c=ve(l)?Tr:n),me(l)&&(t=t||Ir,u.scrollbars="yes");const h=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(Ie(l)&&"_self"!==c)return Ar(t||"",c),new Sr(null);const f=window.open(t||"",c,h);v(f,e,"popup-blocked");try{f.focus()}catch(d){}return new Sr(f)}function Ar(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr="__/auth/handler",Rr="emulator/auth/handler",Nr=encodeURIComponent("fac");async function Or(e,t,n,s,o,a){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:r.MF,eventId:o};if(t instanceof bt){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof Et){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const u=c;for(const r of Object.keys(u))void 0===u[r]&&delete u[r];const l=await e._getAppCheckToken(),h=l?`#${Nr}=${encodeURIComponent(l)}`:"";return`${xr(e)}?${(0,i.Am)(u).slice(1)}${h}`}function xr({config:e}){return e.emulator?A(e,Rr):`https://${e.authDomain}/${kr}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr="webStorageSupport";class Pr{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=nn,this._completeRedirectFn=Yn,this._overrideRedirectResult=Wn}async _openPopup(e,t,n,r){_(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Or(e,t,n,b(),r);return Cr(e,i,on())}async _openRedirect(e,t,n,r){await this._originValidation(e);const i=await Or(e,t,n,b(),r);return un(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(_(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await wr(e),n=new Zn(e);return t.register("authEvent",t=>{v(t?.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(Dr,{type:Dr},n=>{const r=n?.[0]?.[Dr];void 0!==r&&t(!!r),d(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=or(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ce()||ye()||Te()}}const Mr=Pr;class Lr{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return w("unexpected MultiFactorSessionType")}}}class Ur extends Lr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Ur(e)}_finalizeEnroll(e,t,n){return $t(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Nn(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Vr{constructor(){}static assertion(e){return Ur._fromCredential(e)}}Vr.FACTOR_ID="phone";class Fr{static assertionForEnrollment(e,t){return jr._fromSecret(e,t)}static assertionForSignIn(e,t){return jr._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;v("undefined"!==typeof t.user?.auth,"internal-error");const n=await zt(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Br._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}Fr.FACTOR_ID="totp";class jr extends Lr{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new jr(t,void 0,e)}static _fromEnrollmentId(e,t){return new jr(t,e)}async _finalizeEnroll(e,t,n){return v("undefined"!==typeof this.secret,e,"argument-error"),Ht(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){v(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return On(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class Br{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Br(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return($r(e)||$r(t))&&(n=!0),n&&($r(e)&&(e=this.auth.currentUser?.email||"unknownuser"),$r(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function $r(e){return"undefined"===typeof e||0===e?.length}var zr="@firebase/auth",Hr="1.11.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Gr(e){(0,r.om)(new o.uA("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ae(e)},u=new xe(r,i,s,c);return Xe(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()})),(0,r.om)(new o.uA("auth-internal",e=>{const t=De(e.getProvider("auth").getImmediate());return(e=>new qr(e))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(zr,Hr,Kr(e)),(0,r.KO)(zr,Hr,"esm2020")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=300,Qr=(0,i.XA)("authIdTokenMaxAge")||Wr;let Xr=null;const Yr=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Qr)return;const i=n?.token;Xr!==i&&(Xr=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Jr(e=(0,r.Sx)()){const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Qe(e,{popupRedirectResolver:Mr,persistence:[kn,Xt,nn]}),s=(0,i.XA)("authTokenSyncURL");if(s&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=Yr(e.toString());Ft(n,t,()=>t(n.currentUser)),Vt(n,e=>t(e))}}const o=(0,i.Tj)("auth");return o&&Ye(n,`http://${o}`),n}function Zr(){return document.getElementsByTagName("head")?.[0]??document}Le({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",Zr().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),Gr("Browser")},4402:function(e,t,n){var r=n(9504),i=Set.prototype;e.exports={Set:Set,add:r(i.add),has:r(i.has),remove:r(i["delete"]),proto:i}},4449:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(8469),c=n(507),u=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<=n.size)return!1!==a(t,function(e){if(n.includes(e))return!1},!0);var l=n.getIterator();return!1!==c(l,function(e){if(i(t,e))return u(l,"normal",!1)})}},4483:function(e,t,n){var r,i,s,o,a=n(4576),c=n(9429),u=n(1548),l=a.structuredClone,h=a.ArrayBuffer,f=a.MessageChannel,d=!1;if(u)d=function(e){l(e,{transfer:[e]})};else if(h)try{f||(r=c("worker_threads"),r&&(f=r.MessageChannel)),f&&(i=new f,s=new h(2),o=function(e){i.port1.postMessage(null,[e])},2===s.byteLength&&(o(s),0===s.byteLength&&(d=o)))}catch(p){}e.exports=d},4495:function(e,t,n){var r=n(9519),i=n(9039),s=n(4576),o=s.String;e.exports=!!Object.getOwnPropertySymbols&&!i(function(){var e=Symbol("symbol detection");return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41})},4527:function(e,t,n){var r=n(3724),i=n(4376),s=TypeError,o=Object.getOwnPropertyDescriptor,a=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=a?function(e,t){if(i(e)&&!o(e,"length").writable)throw new s("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},4549:function(e,t,n){var r=n(4576);e.exports=function(e,t){var n=r.Iterator,i=n&&n.prototype,s=i&&i[e],o=!1;if(s)try{s.call({next:function(){return{done:!0}},return:function(){o=!0}},-1)}catch(a){a instanceof t||(o=!1)}if(!o)return s}},4576:function(e,t,n){var r=function(e){return e&&e.Math===Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||r("object"==typeof this&&this)||function(){return this}()||Function("return this")()},4603:function(e,t,n){var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,u=i(c.append),l=i(c["delete"]),h=i(c.forEach),f=i([].push),d=new a("a=1&a=2&b=3");d["delete"]("a",1),d["delete"]("b",void 0),d+""!=="a=2"&&r(c,"delete",function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return l(this,e);var r=[];h(this,function(e,t){f(r,{key:t,value:e})}),o(t,1);var i,a=s(e),c=s(n),d=0,p=0,g=!1,m=r.length;while(d<m)i=r[d++],g||i.key===a?(g=!0,l(this,i.key)):p++;while(p<m)i=r[p++],i.key===a&&i.value===c||u(this,i.key,i.value)},{enumerable:!0,unsafe:!0})},4644:function(e,t,n){var r,i,s,o=n(7811),a=n(3724),c=n(4576),u=n(4901),l=n(34),h=n(9297),f=n(6955),d=n(6823),p=n(6699),g=n(6840),m=n(2106),y=n(1625),v=n(2787),w=n(2967),_=n(8227),b=n(3392),E=n(1181),T=E.enforce,I=E.get,S=c.Int8Array,C=S&&S.prototype,A=c.Uint8ClampedArray,k=A&&A.prototype,R=S&&v(S),N=C&&v(C),O=Object.prototype,x=c.TypeError,D=_("toStringTag"),P=b("TYPED_ARRAY_TAG"),M="TypedArrayConstructor",L=o&&!!w&&"Opera"!==f(c.opera),U=!1,V={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},F={BigInt64Array:8,BigUint64Array:8},j=function(e){if(!l(e))return!1;var t=f(e);return"DataView"===t||h(V,t)||h(F,t)},B=function(e){var t=v(e);if(l(t)){var n=I(t);return n&&h(n,M)?n[M]:B(t)}},$=function(e){if(!l(e))return!1;var t=f(e);return h(V,t)||h(F,t)},z=function(e){if($(e))return e;throw new x("Target is not a typed array")},H=function(e){if(u(e)&&(!w||y(R,e)))return e;throw new x(d(e)+" is not a typed array constructor")},q=function(e,t,n,r){if(a){if(n)for(var i in V){var s=c[i];if(s&&h(s.prototype,e))try{delete s.prototype[e]}catch(o){try{s.prototype[e]=t}catch(u){}}}N[e]&&!n||g(N,e,n?t:L&&C[e]||t,r)}},K=function(e,t,n){var r,i;if(a){if(w){if(n)for(r in V)if(i=c[r],i&&h(i,e))try{delete i[e]}catch(s){}if(R[e]&&!n)return;try{return g(R,e,n?t:L&&R[e]||t)}catch(s){}}for(r in V)i=c[r],!i||i[e]&&!n||g(i,e,t)}};for(r in V)i=c[r],s=i&&i.prototype,s?T(s)[M]=i:L=!1;for(r in F)i=c[r],s=i&&i.prototype,s&&(T(s)[M]=i);if((!L||!u(R)||R===Function.prototype)&&(R=function(){throw new x("Incorrect invocation")},L))for(r in V)c[r]&&w(c[r],R);if((!L||!N||N===O)&&(N=R.prototype,L))for(r in V)c[r]&&w(c[r].prototype,N);if(L&&v(k)!==N&&w(k,N),a&&!h(N,D))for(r in U=!0,m(N,D,{configurable:!0,get:function(){return l(this)?this[P]:void 0}}),V)c[r]&&p(c[r],P,r);e.exports={NATIVE_ARRAY_BUFFER_VIEWS:L,TYPED_ARRAY_TAG:U&&P,aTypedArray:z,aTypedArrayConstructor:H,exportTypedArrayMethod:q,exportTypedArrayStaticMethod:K,getTypedArrayConstructor:B,isView:j,isTypedArray:$,TypedArray:R,TypedArrayPrototype:N}},4659:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=function(e,t,n){r?i.f(e,t,s(0,n)):e[t]=n}},4901:function(e){var t="object"==typeof document&&document.all;e.exports="undefined"==typeof t&&void 0!==t?function(e){return"function"==typeof e||e===t}:function(e){return"function"==typeof e}},4913:function(e,t,n){var r=n(3724),i=n(5917),s=n(8686),o=n(8551),a=n(6969),c=TypeError,u=Object.defineProperty,l=Object.getOwnPropertyDescriptor,h="enumerable",f="configurable",d="writable";t.f=r?s?function(e,t,n){if(o(e),t=a(t),o(n),"function"===typeof e&&"prototype"===t&&"value"in n&&d in n&&!n[d]){var r=l(e,t);r&&r[d]&&(e[t]=n.value,n={configurable:f in n?n[f]:r[f],enumerable:h in n?n[h]:r[h],writable:!1})}return u(e,t,n)}:u:function(e,t,n){if(o(e),t=a(t),o(n),i)try{return u(e,t,n)}catch(r){}if("get"in n||"set"in n)throw new c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},4916:function(e,t,n){var r=n(7751),i=function(e){return{size:e,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}},s=function(e){return{size:e,has:function(){return!0},keys:function(){throw new Error("e")}}};e.exports=function(e,t){var n=r("Set");try{(new n)[e](i(0));try{return(new n)[e](i(-1)),!1}catch(a){if(!t)return!0;try{return(new n)[e](s(-1/0)),!1}catch(c){var o=new n;return o.add(1),o.add(2),t(o[e](s(1/0)))}}}catch(c){return!1}}},4979:function(e,t,n){var r=n(6518),i=n(4576),s=n(7751),o=n(6980),a=n(4913).f,c=n(9297),u=n(679),l=n(3167),h=n(2603),f=n(5002),d=n(6193),p=n(3724),g=n(6395),m="DOMException",y=s("Error"),v=s(m),w=function(){u(this,_);var e=arguments.length,t=h(e<1?void 0:arguments[0]),n=h(e<2?void 0:arguments[1],"Error"),r=new v(t,n),i=new y(t);return i.name=m,a(r,"stack",o(1,d(i.stack,1))),l(r,this,w),r},_=w.prototype=v.prototype,b="stack"in new y(m),E="stack"in new v(1,2),T=v&&p&&Object.getOwnPropertyDescriptor(i,m),I=!!T&&!(T.writable&&T.configurable),S=b&&!I&&!E;r({global:!0,constructor:!0,forced:g||S},{DOMException:S?w:v});var C=s(m),A=C.prototype;if(A.constructor!==C)for(var k in g||a(A,"constructor",o(1,C)),f)if(c(f,k)){var R=f[k],N=R.s;c(C,N)||a(C,N,o(6,R.c))}},5002:function(e){e.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},5024:function(e,t,n){var r=n(6518),i=n(3650),s=n(9835),o=n(4916),a=!o("symmetricDifference")||!s("symmetricDifference");r({target:"Set",proto:!0,real:!0,forced:a},{symmetricDifference:i})},5031:function(e,t,n){var r=n(7751),i=n(9504),s=n(8480),o=n(3717),a=n(8551),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=s.f(a(e)),n=o.f;return n?c(t,n(e)):t}},5130:function(e,t,n){n.d(t,{Ef:function(){return K}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(6768),i=n(4232);n(144);
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let s;const o="undefined"!==typeof window&&window.trustedTypes;if(o)try{s=o.createPolicy("vue",{createHTML:e=>e})}catch(Q){}const a=s?e=>s.createHTML(e):e=>e,c="http://www.w3.org/2000/svg",u="http://www.w3.org/1998/Math/MathML",l="undefined"!==typeof document?document:null,h=l&&l.createElement("template"),f={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i="svg"===t?l.createElementNS(c,e):"mathml"===t?l.createElementNS(u,e):n?l.createElement(e,{is:n}):l.createElement(e);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>l.createTextNode(e),createComment:e=>l.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>l.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===s||!(i=i.nextSibling))break}else{h.innerHTML=a("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);const i=h.content;if("svg"===r||"mathml"===r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},d=Symbol("_vtc"),p={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};r.QP;function g(e,t,n){const r=e[d];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const m=Symbol("_vod"),y=Symbol("_vsh");const v=Symbol("");const w=/(^|;)\s*display\s*:/;function _(e,t,n){const r=e.style,s=(0,i.Kg)(n);let o=!1;if(n&&!s){if(t)if((0,i.Kg)(t))for(const e of t.split(";")){const t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&E(r,t,"")}else for(const e in t)null==n[e]&&E(r,e,"");for(const e in n)"display"===e&&(o=!0),E(r,e,n[e])}else if(s){if(t!==n){const e=r[v];e&&(n+=";"+e),r.cssText=n,o=w.test(n)}}else t&&e.removeAttribute("style");m in e&&(e[m]=o?r.display:"",e[y]&&(r.display="none"))}const b=/\s*!important$/;function E(e,t,n){if((0,i.cy)(n))n.forEach(n=>E(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=S(e,t);b.test(n)?e.setProperty((0,i.Tg)(r),n.replace(b,""),"important"):e[r]=n}}const T=["Webkit","Moz","ms"],I={};function S(e,t){const n=I[t];if(n)return n;let r=(0,i.PT)(t);if("filter"!==r&&r in e)return I[t]=r;r=(0,i.ZH)(r);for(let i=0;i<T.length;i++){const n=T[i]+r;if(n in e)return I[t]=n}return t}const C="http://www.w3.org/1999/xlink";function A(e,t,n,r,s,o=(0,i.J$)(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(C,t.slice(6,t.length)):e.setAttributeNS(C,t,n):null==n||o&&!(0,i.Y2)(n)?e.removeAttribute(t):e.setAttribute(t,o?"":(0,i.Bm)(n)?String(n):n)}function k(e,t,n,r,s){if("innerHTML"===t||"textContent"===t)return void(null!=n&&(e[t]="innerHTML"===t?a(n):n));const o=e.tagName;if("value"===t&&"PROGRESS"!==o&&!o.includes("-")){const r="OPTION"===o?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);return r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),void(e._value=n)}let c=!1;if(""===n||null==n){const r=typeof e[t];"boolean"===r?n=(0,i.Y2)(n):null==n&&"string"===r?(n="",c=!0):"number"===r&&(n=0,c=!0)}try{e[t]=n}catch(Q){0}c&&e.removeAttribute(s||t)}function R(e,t,n,r){e.addEventListener(t,n,r)}function N(e,t,n,r){e.removeEventListener(t,n,r)}const O=Symbol("_vei");function x(e,t,n,r,i=null){const s=e[O]||(e[O]={}),o=s[t];if(r&&o)o.value=r;else{const[n,a]=P(t);if(r){const o=s[t]=V(r,i);R(e,n,o,a)}else o&&(N(e,n,o,a),s[t]=void 0)}}const D=/(?:Once|Passive|Capture)$/;function P(e){let t;if(D.test(e)){let n;t={};while(n=e.match(D))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):(0,i.Tg)(e.slice(2));return[n,t]}let M=0;const L=Promise.resolve(),U=()=>M||(L.then(()=>M=0),M=Date.now());function V(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();(0,r.qL)(F(e,n.value),t,5,[e])};return n.value=e,n.attached=U(),n}function F(e,t){if((0,i.cy)(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}return t}const j=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,B=(e,t,n,r,s,o)=>{const a="svg"===s;"class"===t?g(e,r,a):"style"===t?_(e,n,r):(0,i.Mp)(t)?(0,i.CP)(t)||x(e,t,n,r,o):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):$(e,t,r,a))?(k(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||A(e,t,r,a,o,"value"!==t)):!e._isVueCE||!/[A-Z]/.test(t)&&(0,i.Kg)(r)?("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),A(e,t,r,a)):k(e,(0,i.PT)(t),r,o,t)};function $(e,t,n,r){if(r)return"innerHTML"===t||"textContent"===t||!!(t in e&&j(t)&&(0,i.Tn)(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"autocorrect"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}return(!j(t)||!(0,i.Kg)(n))&&t in e}
/*! #__NO_SIDE_EFFECTS__ */
"undefined"!==typeof HTMLElement&&HTMLElement;Symbol("_moveCb"),Symbol("_enterCb");Symbol("_assign");const z=(0,i.X$)({patchProp:B},f);let H;function q(){return H||(H=(0,r.K9)(z))}const K=(...e)=>{const t=q().createApp(...e);const{mount:n}=t;return t.mount=e=>{const r=W(e);if(!r)return;const s=t._component;(0,i.Tn)(s)||s.render||s.template||(s.template=r.innerHTML),1===r.nodeType&&(r.textContent="");const o=n(r,!1,G(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t};function G(e){return e instanceof SVGElement?"svg":"function"===typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function W(e){if((0,i.Kg)(e)){const t=document.querySelector(e);return t}return e}},5169:function(e,t,n){var r=n(3238),i=TypeError;e.exports=function(e){if(r(e))throw new i("ArrayBuffer is detached");return e}},5170:function(e,t,n){var r=n(6706),i=n(4402);e.exports=r(i.proto,"size","get")||function(e){return e.size}},5397:function(e,t,n){var r=n(7055),i=n(7750);e.exports=function(e){return r(i(e))}},5610:function(e,t,n){var r=n(1291),i=Math.max,s=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):s(n,t)}},5623:function(e,t,n){n(456)},5636:function(e,t,n){var r=n(4576),i=n(9504),s=n(6706),o=n(7696),a=n(5169),c=n(7394),u=n(4483),l=n(1548),h=r.structuredClone,f=r.ArrayBuffer,d=r.DataView,p=Math.min,g=f.prototype,m=d.prototype,y=i(g.slice),v=s(g,"resizable","get"),w=s(g,"maxByteLength","get"),_=i(m.getInt8),b=i(m.setInt8);e.exports=(l||u)&&function(e,t,n){var r,i=c(e),s=void 0===t?i:o(t),g=!v||!v(e);if(a(e),l&&(e=h(e,{transfer:[e]}),i===s&&(n||g)))return e;if(i>=s&&(!n||g))r=y(e,0,s);else{var m=n&&!g&&w?{maxByteLength:w(e)}:void 0;r=new f(s,m);for(var E=new d(e),T=new d(r),I=p(s,i),S=0;S<I;S++)b(T,S,_(E,S))}return l||u(e),r}},5745:function(e,t,n){var r=n(7629);e.exports=function(e,t){return r[e]||(r[e]=t||{})}},5854:function(e,t,n){var r=n(2777),i=TypeError;e.exports=function(e){var t=r(e,"number");if("number"==typeof t)throw new i("Can't convert number to bigint");return BigInt(t)}},5876:function(e,t,n){var r=n(6518),i=n(3838),s=n(4916),o=!s("isSubsetOf",function(e){return e});r({target:"Set",proto:!0,real:!0,forced:o},{isSubsetOf:i})},5917:function(e,t,n){var r=n(3724),i=n(9039),s=n(4055);e.exports=!r&&!i(function(){return 7!==Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a})},5966:function(e,t,n){var r=n(9306),i=n(4117);e.exports=function(e,t){var n=e[t];return i(n)?void 0:r(n)}},6080:function(e,t,n){var r=n(7476),i=n(9306),s=n(616),o=r(r.bind);e.exports=function(e,t){return i(e),void 0===t?e:s?o(e,t):function(){return e.apply(t,arguments)}}},6119:function(e,t,n){var r=n(5745),i=n(3392),s=r("keys");e.exports=function(e){return s[e]||(s[e]=i(e))}},6189:function(e,t,n){n.d(t,{$b:function(){return i},Vy:function(){return u}});n(4114),n(8111),n(2489),n(1701);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(i||(i={}));const s={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class u{constructor(e){this.name=e,this._logLevel=o,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}},6193:function(e,t,n){var r=n(9504),i=Error,s=r("".replace),o=function(e){return String(new i(e).stack)}("zxcasd"),a=/\n\s*at [^:]*:[^\n]*/,c=a.test(o);e.exports=function(e,t){if(c&&"string"==typeof e&&!i.prepareStackTrace)while(t--)e=s(e,a,"");return e}},6198:function(e,t,n){var r=n(8014);e.exports=function(e){return r(e.length)}},6269:function(e){e.exports={}},6279:function(e,t,n){var r=n(6840);e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},6319:function(e,t,n){var r=n(8551),i=n(9539);e.exports=function(e,t,n,s){try{return s?t(r(n)[0],n[1]):t(n)}catch(o){i(e,"throw",o)}}},6395:function(e){e.exports=!1},6400:function(e,t,n){n.d(t,{Wp:function(){return r.Wp}});var r=n(262),i="firebase",s="12.1.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,r.KO)(i,s,"app")},6518:function(e,t,n){var r=n(4576),i=n(7347).f,s=n(6699),o=n(6840),a=n(9433),c=n(7740),u=n(2796);e.exports=function(e,t){var n,l,h,f,d,p,g=e.target,m=e.global,y=e.stat;if(l=m?r:y?r[g]||a(g,{}):r[g]&&r[g].prototype,l)for(h in t){if(d=t[h],e.dontCallGetSet?(p=i(l,h),f=p&&p.value):f=l[h],n=u(m?h:g+(y?".":"#")+h,e.forced),!n&&void 0!==f){if(typeof d==typeof f)continue;c(d,f)}(e.sham||f&&f.sham)&&s(d,"sham",!0),o(l,h,d,e)}}},6573:function(e,t,n){var r=n(3724),i=n(2106),s=n(3238),o=ArrayBuffer.prototype;r&&!("detached"in o)&&i(o,"detached",{configurable:!0,get:function(){return s(this)}})},6632:function(e,t,n){var r=n(6518),i=n(4576),s=n(9143),o=n(4154),a=i.Uint8Array,c=!a||!a.prototype.setFromBase64||!function(){var e=new a([255,255,255,255,255]);try{return void e.setFromBase64("",null)}catch(t){}try{return void e.setFromBase64("a")}catch(t){}try{e.setFromBase64("MjYyZg===")}catch(t){return 50===e[0]&&54===e[1]&&50===e[2]&&255===e[3]&&255===e[4]}}();a&&r({target:"Uint8Array",proto:!0,forced:c},{setFromBase64:function(e){o(this);var t=s(e,arguments.length>1?arguments[1]:void 0,this,this.length);return{read:t.read,written:t.written}}})},6699:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=r?function(e,t,n){return i.f(e,t,s(1,n))}:function(e,t,n){return e[t]=n,e}},6706:function(e,t,n){var r=n(9504),i=n(9306);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(s){}}},6768:function(e,t,n){n.d(t,{$u:function(){return re},CE:function(){return Kt},Df:function(){return j},FK:function(){return Mt},Gy:function(){return P},K9:function(){return ct},Lk:function(){return Jt},MZ:function(){return F},OW:function(){return V},QP:function(){return L},Wv:function(){return Gt},bF:function(){return Zt},dY:function(){return m},g2:function(){return he},nI:function(){return pn},pI:function(){return ge},qL:function(){return o},uX:function(){return Bt}});n(4114),n(8111),n(1148),n(2489),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(144),i=n(4232);function s(e,t,n,r){try{return r?e(...r):e()}catch(i){a(i,t,n)}}function o(e,t,n,r){if((0,i.Tn)(e)){const o=s(e,t,n,r);return o&&(0,i.yL)(o)&&o.catch(e=>{a(e,t,n)}),o}if((0,i.cy)(e)){const i=[];for(let s=0;s<e.length;s++)i.push(o(e[s],t,n,r));return i}}function a(e,t,n,o=!0){const a=t?t.vnode:null,{errorHandler:u,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||i.MZ;if(t){let i=t.parent;const o=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;while(i){const t=i.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,a))return;i=i.parent}if(u)return(0,r.C4)(),s(u,null,10,[e,o,a]),void(0,r.bl)()}c(e,n,a,o,l)}function c(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}const u=[];let l=-1;const h=[];let f=null,d=0;const p=Promise.resolve();let g=null;function m(e){const t=g||p;return e?t.then(this?e.bind(this):e):t}function y(e){let t=l+1,n=u.length;while(t<n){const r=t+n>>>1,i=u[r],s=T(i);s<e||s===e&&2&i.flags?t=r+1:n=r}return t}function v(e){if(!(1&e.flags)){const t=T(e),n=u[u.length-1];!n||!(2&e.flags)&&t>=T(n)?u.push(e):u.splice(y(t),0,e),e.flags|=1,w()}}function w(){g||(g=p.then(I))}function _(e){(0,i.cy)(e)?h.push(...e):f&&-1===e.id?f.splice(d+1,0,e):1&e.flags||(h.push(e),e.flags|=1),w()}function b(e,t,n=l+1){for(0;n<u.length;n++){const t=u[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;0,u.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2)}}}function E(e){if(h.length){const e=[...new Set(h)].sort((e,t)=>T(e)-T(t));if(h.length=0,f)return void f.push(...e);for(f=e,d=0;d<f.length;d++){const e=f[d];0,4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2}f=null,d=0}}const T=e=>null==e.id?2&e.flags?-1:1/0:e.id;function I(e){i.tE;try{for(l=0;l<u.length;l++){const e=u[l];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),s(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2))}}finally{for(;l<u.length;l++){const e=u[l];e&&(e.flags&=-2)}l=-1,u.length=0,E(e),g=null,(u.length||h.length)&&I(e)}}let S=null,C=null;function A(e){const t=S;return S=e,C=e&&e.type.__scopeId||null,t}function k(e,t=S,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&Ht(-1);const i=A(t);let s;try{s=e(...n)}finally{A(i),r._d&&Ht(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function R(e,t,n,i){const s=e.dirs,a=t&&t.dirs;for(let c=0;c<s.length;c++){const u=s[c];a&&(u.oldValue=a[c].value);let l=u.dir[i];l&&((0,r.C4)(),o(l,n,8,[e.el,u,e,t]),(0,r.bl)())}}const N=Symbol("_vte"),O=e=>e.__isTeleport;const x=Symbol("_leaveCb"),D=Symbol("_enterCb");function P(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return te(()=>{e.isMounted=!0}),ie(()=>{e.isUnmounting=!0}),e}const M=[Function,Array],L={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:M,onEnter:M,onAfterEnter:M,onEnterCancelled:M,onBeforeLeave:M,onLeave:M,onAfterLeave:M,onLeaveCancelled:M,onBeforeAppear:M,onAppear:M,onAfterAppear:M,onAppearCancelled:M};function U(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function V(e,t,n,r,s){const{appear:a,mode:c,persisted:u=!1,onBeforeEnter:l,onEnter:h,onAfterEnter:f,onEnterCancelled:d,onBeforeLeave:p,onLeave:g,onAfterLeave:m,onLeaveCancelled:y,onBeforeAppear:v,onAppear:w,onAfterAppear:_,onAppearCancelled:b}=t,E=String(e.key),T=U(n,e),I=(e,t)=>{e&&o(e,r,9,t)},S=(e,t)=>{const n=t[1];I(e,t),(0,i.cy)(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},C={mode:c,persisted:u,beforeEnter(t){let r=l;if(!n.isMounted){if(!a)return;r=v||l}t[x]&&t[x](!0);const i=T[E];i&&Qt(e,i)&&i.el[x]&&i.el[x](),I(r,[t])},enter(e){let t=h,r=f,i=d;if(!n.isMounted){if(!a)return;t=w||h,r=_||f,i=b||d}let s=!1;const o=e[D]=t=>{s||(s=!0,I(t?i:r,[e]),C.delayedLeave&&C.delayedLeave(),e[D]=void 0)};t?S(t,[e,o]):o()},leave(t,r){const i=String(e.key);if(t[D]&&t[D](!0),n.isUnmounting)return r();I(p,[t]);let s=!1;const o=t[x]=n=>{s||(s=!0,r(),I(n?y:m,[t]),t[x]=void 0,T[i]===e&&delete T[i])};T[i]=e,g?S(g,[t,o]):o()},clone(e){const i=V(e,t,n,r,s);return s&&s(i),i}};return C}function F(e,t){6&e.shapeFlag&&e.component?(e.transition=t,F(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function j(e,t=!1,n){let r=[],i=0;for(let s=0;s<e.length;s++){let o=e[s];const a=null==n?o.key:String(n)+String(null!=o.key?o.key:s);o.type===Mt?(128&o.patchFlag&&i++,r=r.concat(j(o.children,t,a))):(t||o.type!==Ut)&&r.push(null!=a?nn(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}
/*! #__NO_SIDE_EFFECTS__ */function B(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function $(e,t,n,o,a=!1){if((0,i.cy)(e))return void e.forEach((e,r)=>$(e,t&&((0,i.cy)(t)?t[r]:t),n,o,a));if(z(o)&&!a)return void(512&o.shapeFlag&&o.type.__asyncResolved&&o.component.subTree.component&&$(e,t,n,o.component.subTree));const c=4&o.shapeFlag?Rn(o.component):o.el,u=a?null:c,{i:l,r:h}=e;const f=t&&t.r,d=l.refs===i.MZ?l.refs={}:l.refs,p=l.setupState,g=(0,r.ux)(p),m=p===i.MZ?()=>!1:e=>(0,i.$3)(g,e);if(null!=f&&f!==h&&((0,i.Kg)(f)?(d[f]=null,m(f)&&(p[f]=null)):(0,r.i9)(f)&&(f.value=null)),(0,i.Tn)(h))s(h,l,12,[u,d]);else{const t=(0,i.Kg)(h),s=(0,r.i9)(h);if(t||s){const r=()=>{if(e.f){const n=t?m(h)?p[h]:d[h]:h.value;a?(0,i.cy)(n)&&(0,i.TF)(n,c):(0,i.cy)(n)?n.includes(c)||n.push(c):t?(d[h]=[c],m(h)&&(p[h]=d[h])):(h.value=[c],e.k&&(d[e.k]=h.value))}else t?(d[h]=u,m(h)&&(p[h]=u)):s&&(h.value=u,e.k&&(d[e.k]=u))};u?(r.id=-1,at(r,n)):r()}else 0}}(0,i.We)().requestIdleCallback,(0,i.We)().cancelIdleCallback;const z=e=>!!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */const H=e=>e.type.__isKeepAlive;RegExp,RegExp;function q(e,t){return(0,i.cy)(e)?e.some(e=>q(e,t)):(0,i.Kg)(e)?e.split(",").includes(t):!!(0,i.gd)(e)&&(e.lastIndex=0,e.test(t))}function K(e,t){W(e,"a",t)}function G(e,t){W(e,"da",t)}function W(e,t,n=dn){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(J(t,r,n),n){let e=n.parent;while(e&&e.parent)H(e.parent.vnode)&&Q(r,t,n,e),e=e.parent}}function Q(e,t,n,r){const s=J(t,e,r,!0);se(()=>{(0,i.TF)(r[t],s)},n)}function X(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Y(e){return 128&e.shapeFlag?e.ssContent:e}function J(e,t,n=dn,i=!1){if(n){const s=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...i)=>{(0,r.C4)();const s=yn(n),a=o(t,n,e,i);return s(),(0,r.bl)(),a});return i?s.unshift(a):s.push(a),a}}const Z=e=>(t,n=dn)=>{En&&"sp"!==e||J(e,(...e)=>t(...e),n)},ee=Z("bm"),te=Z("m"),ne=Z("bu"),re=Z("u"),ie=Z("bum"),se=Z("um"),oe=Z("sp"),ae=Z("rtg"),ce=Z("rtc");function ue(e,t=dn){J("ec",e,t)}const le="components";function he(e,t){return de(le,e,!0,t)||e}const fe=Symbol.for("v-ndc");function de(e,t,n=!0,r=!1){const s=S||dn;if(s){const n=s.type;if(e===le){const e=Nn(n,!1);if(e&&(e===t||e===(0,i.PT)(t)||e===(0,i.ZH)((0,i.PT)(t))))return n}const o=pe(s[e]||n[e],t)||pe(s.appContext[e],t);return!o&&r?n:o}}function pe(e,t){return e&&(e[t]||e[(0,i.PT)(t)]||e[(0,i.ZH)((0,i.PT)(t))])}function ge(e,t,n,s){let o;const a=n&&n[s],c=(0,i.cy)(e);if(c||(0,i.Kg)(e)){const n=c&&(0,r.g8)(e);let i=!1,s=!1;n&&(i=!(0,r.fE)(e),s=(0,r.Tm)(e),e=(0,r.qA)(e)),o=new Array(e.length);for(let c=0,u=e.length;c<u;c++)o[c]=t(i?s?(0,r.a1)((0,r.lJ)(e[c])):(0,r.lJ)(e[c]):e[c],c,void 0,a&&a[c])}else if("number"===typeof e){0,o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,a&&a[n])}else if((0,i.Gv)(e))if(e[Symbol.iterator])o=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{const n=Object.keys(e);o=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];o[r]=t(e[i],i,r,a&&a[r])}}else o=[];return n&&(n[s]=o),o}const me=e=>e?wn(e)?Rn(e):me(e.parent):null,ye=(0,i.X$)(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>me(e.parent),$root:e=>me(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ce(e),$forceUpdate:e=>e.f||(e.f=()=>{v(e.update)}),$nextTick:e=>e.n||(e.n=m.bind(e.proxy)),$watch:e=>bt.bind(e)}),ve=(e,t)=>e!==i.MZ&&!e.__isScriptSetup&&(0,i.$3)(e,t),we={get({_:e},t){if("__v_skip"===t)return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:l}=e;let h;if("$"!==t[0]){const r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return n[t];case 3:return a[t]}else{if(ve(s,t))return c[t]=1,s[t];if(o!==i.MZ&&(0,i.$3)(o,t))return c[t]=2,o[t];if((h=e.propsOptions[0])&&(0,i.$3)(h,t))return c[t]=3,a[t];if(n!==i.MZ&&(0,i.$3)(n,t))return c[t]=4,n[t];be&&(c[t]=0)}}const f=ye[t];let d,p;return f?("$attrs"===t&&(0,r.u4)(e.attrs,"get",""),f(e)):(d=u.__cssModules)&&(d=d[t])?d:n!==i.MZ&&(0,i.$3)(n,t)?(c[t]=4,n[t]):(p=l.config.globalProperties,(0,i.$3)(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return ve(s,t)?(s[t]=n,!0):r!==i.MZ&&(0,i.$3)(r,t)?(r[t]=n,!0):!(0,i.$3)(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(o[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},a){let c;return!!n[a]||e!==i.MZ&&(0,i.$3)(e,a)||ve(t,a)||(c=o[0])&&(0,i.$3)(c,a)||(0,i.$3)(r,a)||(0,i.$3)(ye,a)||(0,i.$3)(s.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:(0,i.$3)(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function _e(e){return(0,i.cy)(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let be=!0;function Ee(e){const t=Ce(e),n=e.proxy,s=e.ctx;be=!1,t.beforeCreate&&Ie(t.beforeCreate,e,"bc");const{data:o,computed:a,methods:c,watch:u,provide:l,inject:h,created:f,beforeMount:d,mounted:p,beforeUpdate:g,updated:m,activated:y,deactivated:v,beforeDestroy:w,beforeUnmount:_,destroyed:b,unmounted:E,render:T,renderTracked:I,renderTriggered:S,errorCaptured:C,serverPrefetch:A,expose:k,inheritAttrs:R,components:N,directives:O,filters:x}=t,D=null;if(h&&Te(h,s,D),c)for(const r in c){const e=c[r];(0,i.Tn)(e)&&(s[r]=e.bind(n))}if(o){0;const t=o.call(n,n);0,(0,i.Gv)(t)&&(e.data=(0,r.Kh)(t))}if(be=!0,a)for(const r in a){const e=a[r],t=(0,i.Tn)(e)?e.bind(n,n):(0,i.Tn)(e.get)?e.get.bind(n,n):i.tE;0;const o=!(0,i.Tn)(e)&&(0,i.Tn)(e.set)?e.set.bind(n):i.tE,c=xn({get:t,set:o});Object.defineProperty(s,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:e=>c.value=e})}if(u)for(const r in u)Se(u[r],s,n,r);if(l){const e=(0,i.Tn)(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{je(t,e[t])})}function P(e,t){(0,i.cy)(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(f&&Ie(f,e,"c"),P(ee,d),P(te,p),P(ne,g),P(re,m),P(K,y),P(G,v),P(ue,C),P(ce,I),P(ae,S),P(ie,_),P(se,E),P(oe,A),(0,i.cy)(k))if(k.length){const t=e.exposed||(e.exposed={});k.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||(e.exposed={});T&&e.render===i.tE&&(e.render=T),null!=R&&(e.inheritAttrs=R),N&&(e.components=N),O&&(e.directives=O),A&&B(e)}function Te(e,t,n=i.tE){(0,i.cy)(e)&&(e=Oe(e));for(const s in e){const n=e[s];let o;o=(0,i.Gv)(n)?"default"in n?Be(n.from||s,n.default,!0):Be(n.from||s):Be(n),(0,r.i9)(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}function Ie(e,t,n){o((0,i.cy)(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Se(e,t,n,r){let s=r.includes(".")?Et(n,r):()=>n[r];if((0,i.Kg)(e)){const n=t[e];(0,i.Tn)(n)&&wt(s,n)}else if((0,i.Tn)(e))wt(s,e.bind(n));else if((0,i.Gv)(e))if((0,i.cy)(e))e.forEach(e=>Se(e,t,n,r));else{const r=(0,i.Tn)(e.handler)?e.handler.bind(n):t[e.handler];(0,i.Tn)(r)&&wt(s,r,e)}else 0}function Ce(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:a}}=e.appContext,c=o.get(t);let u;return c?u=c:s.length||n||r?(u={},s.length&&s.forEach(e=>Ae(u,e,a,!0)),Ae(u,t,a)):u=t,(0,i.Gv)(t)&&o.set(t,u),u}function Ae(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&Ae(e,s,n,!0),i&&i.forEach(t=>Ae(e,t,n,!0));for(const o in t)if(r&&"expose"===o);else{const r=ke[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const ke={data:Re,props:Pe,emits:Pe,methods:De,computed:De,beforeCreate:xe,created:xe,beforeMount:xe,mounted:xe,beforeUpdate:xe,updated:xe,beforeDestroy:xe,beforeUnmount:xe,destroyed:xe,unmounted:xe,activated:xe,deactivated:xe,errorCaptured:xe,serverPrefetch:xe,components:De,directives:De,watch:Me,provide:Re,inject:Ne};function Re(e,t){return t?e?function(){return(0,i.X$)((0,i.Tn)(e)?e.call(this,this):e,(0,i.Tn)(t)?t.call(this,this):t)}:t:e}function Ne(e,t){return De(Oe(e),Oe(t))}function Oe(e){if((0,i.cy)(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function xe(e,t){return e?[...new Set([].concat(e,t))]:t}function De(e,t){return e?(0,i.X$)(Object.create(null),e,t):t}function Pe(e,t){return e?(0,i.cy)(e)&&(0,i.cy)(t)?[...new Set([...e,...t])]:(0,i.X$)(Object.create(null),_e(e),_e(null!=t?t:{})):t}function Me(e,t){if(!e)return t;if(!t)return e;const n=(0,i.X$)(Object.create(null),e);for(const r in t)n[r]=xe(e[r],t[r]);return n}function Le(){return{app:null,config:{isNativeTag:i.NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ue=0;function Ve(e,t){return function(n,r=null){(0,i.Tn)(n)||(n=(0,i.X$)({},n)),null==r||(0,i.Gv)(r)||(r=null);const s=Le(),a=new WeakSet,c=[];let u=!1;const l=s.app={_uid:Ue++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:Dn,get config(){return s.config},set config(e){0},use(e,...t){return a.has(e)||(e&&(0,i.Tn)(e.install)?(a.add(e),e.install(l,...t)):(0,i.Tn)(e)&&(a.add(e),e(l,...t))),l},mixin(e){return s.mixins.includes(e)||s.mixins.push(e),l},component(e,t){return t?(s.components[e]=t,l):s.components[e]},directive(e,t){return t?(s.directives[e]=t,l):s.directives[e]},mount(i,o,a){if(!u){0;const c=l._ceVNode||Zt(n,r);return c.appContext=s,!0===a?a="svg":!1===a&&(a=void 0),o&&t?t(c,i):e(c,i,a),u=!0,l._container=i,i.__vue_app__=l,Rn(c.component)}},onUnmount(e){c.push(e)},unmount(){u&&(o(c,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return s.provides[e]=t,l},runWithContext(e){const t=Fe;Fe=l;try{return e()}finally{Fe=t}}};return l}}let Fe=null;function je(e,t){if(dn){let n=dn.provides;const r=dn.parent&&dn.parent.provides;r===n&&(n=dn.provides=Object.create(r)),n[e]=t}else 0}function Be(e,t,n=!1){const r=pn();if(r||Fe){let s=Fe?Fe._context.provides:r?null==r.parent||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&(0,i.Tn)(t)?t.call(r&&r.proxy):t}else 0}const $e={},ze=()=>Object.create($e),He=e=>Object.getPrototypeOf(e)===$e;function qe(e,t,n,i=!1){const s={},o=ze();e.propsDefaults=Object.create(null),Ge(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:(0,r.Gc)(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function Ke(e,t,n,s){const{props:o,attrs:a,vnode:{patchFlag:c}}=e,u=(0,r.ux)(o),[l]=e.propsOptions;let h=!1;if(!(s||c>0)||16&c){let r;Ge(e,t,o,a)&&(h=!0);for(const s in u)t&&((0,i.$3)(t,s)||(r=(0,i.Tg)(s))!==s&&(0,i.$3)(t,r))||(l?!n||void 0===n[s]&&void 0===n[r]||(o[s]=We(l,u,s,void 0,e,!0)):delete o[s]);if(a!==u)for(const e in a)t&&(0,i.$3)(t,e)||(delete a[e],h=!0)}else if(8&c){const n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(Ct(e.emitsOptions,s))continue;const c=t[s];if(l)if((0,i.$3)(a,s))c!==a[s]&&(a[s]=c,h=!0);else{const t=(0,i.PT)(s);o[t]=We(l,u,t,c,e,!1)}else c!==a[s]&&(a[s]=c,h=!0)}}h&&(0,r.hZ)(e.attrs,"set","")}function Ge(e,t,n,s){const[o,a]=e.propsOptions;let c,u=!1;if(t)for(let r in t){if((0,i.SU)(r))continue;const l=t[r];let h;o&&(0,i.$3)(o,h=(0,i.PT)(r))?a&&a.includes(h)?(c||(c={}))[h]=l:n[h]=l:Ct(e.emitsOptions,r)||r in s&&l===s[r]||(s[r]=l,u=!0)}if(a){const t=(0,r.ux)(n),s=c||i.MZ;for(let r=0;r<a.length;r++){const c=a[r];n[c]=We(o,t,c,s[c],e,!(0,i.$3)(s,c))}}return u}function We(e,t,n,r,s,o){const a=e[n];if(null!=a){const e=(0,i.$3)(a,"default");if(e&&void 0===r){const e=a.default;if(a.type!==Function&&!a.skipFactory&&(0,i.Tn)(e)){const{propsDefaults:i}=s;if(n in i)r=i[n];else{const o=yn(s);r=i[n]=e.call(null,t),o()}}else r=e;s.ce&&s.ce._setProp(n,r)}a[0]&&(o&&!e?r=!1:!a[1]||""!==r&&r!==(0,i.Tg)(n)||(r=!0))}return r}const Qe=new WeakMap;function Xe(e,t,n=!1){const r=n?Qe:t.propsCache,s=r.get(e);if(s)return s;const o=e.props,a={},c=[];let u=!1;if(!(0,i.Tn)(e)){const r=e=>{u=!0;const[n,r]=Xe(e,t,!0);(0,i.X$)(a,n),r&&c.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!o&&!u)return(0,i.Gv)(e)&&r.set(e,i.Oj),i.Oj;if((0,i.cy)(o))for(let h=0;h<o.length;h++){0;const e=(0,i.PT)(o[h]);Ye(e)&&(a[e]=i.MZ)}else if(o){0;for(const e in o){const t=(0,i.PT)(e);if(Ye(t)){const n=o[e],r=a[t]=(0,i.cy)(n)||(0,i.Tn)(n)?{type:n}:(0,i.X$)({},n),s=r.type;let u=!1,l=!0;if((0,i.cy)(s))for(let e=0;e<s.length;++e){const t=s[e],n=(0,i.Tn)(t)&&t.name;if("Boolean"===n){u=!0;break}"String"===n&&(l=!1)}else u=(0,i.Tn)(s)&&"Boolean"===s.name;r[0]=u,r[1]=l,(u||(0,i.$3)(r,"default"))&&c.push(t)}}}const l=[a,c];return(0,i.Gv)(e)&&r.set(e,l),l}function Ye(e){return"$"!==e[0]&&!(0,i.SU)(e)}const Je=e=>"_"===e||"__"===e||"_ctx"===e||"$stable"===e,Ze=e=>(0,i.cy)(e)?e.map(sn):[sn(e)],et=(e,t,n)=>{if(t._n)return t;const r=k((...e)=>Ze(t(...e)),n);return r._c=!1,r},tt=(e,t,n)=>{const r=e._ctx;for(const s in e){if(Je(s))continue;const n=e[s];if((0,i.Tn)(n))t[s]=et(s,n,r);else if(null!=n){0;const e=Ze(n);t[s]=()=>e}}},nt=(e,t)=>{const n=Ze(t);e.slots.default=()=>n},rt=(e,t,n)=>{for(const r in t)!n&&Je(r)||(e[r]=t[r])},it=(e,t,n)=>{const r=e.slots=ze();if(32&e.vnode.shapeFlag){const e=t.__;e&&(0,i.yQ)(r,"__",e,!0);const s=t._;s?(rt(r,t,n),n&&(0,i.yQ)(r,"_",s,!0)):tt(t,r)}else t&&nt(e,t)},st=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,a=i.MZ;if(32&r.shapeFlag){const e=t._;e?n&&1===e?o=!1:rt(s,t,n):(o=!t.$stable,tt(t,s)),a=t}else t&&(nt(e,t),a={default:1});if(o)for(const i in s)Je(i)||null!=a[i]||delete s[i]};function ot(){"boolean"!==typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&((0,i.We)().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__=!1)}const at=Pt;function ct(e){return ut(e)}function ut(e,t){ot();const n=(0,i.We)();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:c,createText:u,createComment:l,setText:h,setElementText:f,parentNode:d,nextSibling:p,setScopeId:g=i.tE,insertStaticContent:m}=e,y=(e,t,n,r=null,i=null,s=null,o=void 0,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Qt(e,t)&&(r=Z(e),W(e,i,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:u,ref:l,shapeFlag:h}=t;switch(u){case Lt:w(e,t,n,r);break;case Ut:_(e,t,n,r);break;case Vt:null==e&&T(t,n,r,o);break;case Mt:M(e,t,n,r,i,s,o,a,c);break;default:1&h?C(e,t,n,r,i,s,o,a,c):6&h?L(e,t,n,r,i,s,o,a,c):(64&h||128&h)&&u.process(e,t,n,r,i,s,o,a,c,ne)}null!=l&&i?$(l,e&&e.ref,s,t||e,!t):null==l&&e&&null!=e.ref&&$(e.ref,null,s,e,!0)},w=(e,t,n,r)=>{if(null==e)s(t.el=u(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&h(n,t.children)}},_=(e,t,n,r)=>{null==e?s(t.el=l(t.children||""),n,r):t.el=e.el},T=(e,t,n,r)=>{[e.el,e.anchor]=m(e.children,t,n,r,e.el,e.anchor)},I=({el:e,anchor:t},n,r)=>{let i;while(e&&e!==t)i=p(e),s(e,n,r),e=i;s(t,n,r)},S=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=p(e),o(e),e=n;o(t)},C=(e,t,n,r,i,s,o,a,c)=>{"svg"===t.type?o="svg":"math"===t.type&&(o="mathml"),null==e?A(t,n,r,i,s,o,a,c):x(e,t,i,s,o,a,c)},A=(e,t,n,r,o,u,l,h)=>{let d,p;const{props:g,shapeFlag:m,transition:y,dirs:v}=e;if(d=e.el=c(e.type,u,g&&g.is,g),8&m?f(d,e.children):16&m&&O(e.children,d,null,r,o,lt(e,u),l,h),v&&R(e,null,r,"created"),k(d,e,e.scopeId,l,r),g){for(const e in g)"value"===e||(0,i.SU)(e)||a(d,e,null,g[e],u,r);"value"in g&&a(d,"value",null,g.value,u),(p=g.onVnodeBeforeMount)&&un(p,r,e)}v&&R(e,null,r,"beforeMount");const w=ft(o,y);w&&y.beforeEnter(d),s(d,t,n),((p=g&&g.onVnodeMounted)||w||v)&&at(()=>{p&&un(p,r,e),w&&y.enter(d),v&&R(e,null,r,"mounted")},o)},k=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let s=0;s<r.length;s++)g(e,r[s]);if(i){let n=i.subTree;if(t===n||Dt(n.type)&&(n.ssContent===t||n.ssFallback===t)){const t=i.vnode;k(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},O=(e,t,n,r,i,s,o,a,c=0)=>{for(let u=c;u<e.length;u++){const c=e[u]=a?on(e[u]):sn(e[u]);y(null,c,t,n,r,i,s,o,a)}},x=(e,t,n,r,s,o,c)=>{const u=t.el=e.el;let{patchFlag:l,dynamicChildren:h,dirs:d}=t;l|=16&e.patchFlag;const p=e.props||i.MZ,g=t.props||i.MZ;let m;if(n&&ht(n,!1),(m=g.onVnodeBeforeUpdate)&&un(m,n,t,e),d&&R(t,e,n,"beforeUpdate"),n&&ht(n,!0),(p.innerHTML&&null==g.innerHTML||p.textContent&&null==g.textContent)&&f(u,""),h?D(e.dynamicChildren,h,u,n,r,lt(t,s),o):c||B(e,t,u,null,n,r,lt(t,s),o,!1),l>0){if(16&l)P(u,p,g,n,s);else if(2&l&&p.class!==g.class&&a(u,"class",null,g.class,s),4&l&&a(u,"style",p.style,g.style,s),8&l){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const r=e[t],i=p[r],o=g[r];o===i&&"value"!==r||a(u,r,i,o,s,n)}}1&l&&e.children!==t.children&&f(u,t.children)}else c||null!=h||P(u,p,g,n,s);((m=g.onVnodeUpdated)||d)&&at(()=>{m&&un(m,n,t,e),d&&R(t,e,n,"updated")},r)},D=(e,t,n,r,i,s,o)=>{for(let a=0;a<t.length;a++){const c=e[a],u=t[a],l=c.el&&(c.type===Mt||!Qt(c,u)||198&c.shapeFlag)?d(c.el):n;y(c,u,l,null,r,i,s,o,!0)}},P=(e,t,n,r,s)=>{if(t!==n){if(t!==i.MZ)for(const o in t)(0,i.SU)(o)||o in n||a(e,o,t[o],null,s,r);for(const o in n){if((0,i.SU)(o))continue;const c=n[o],u=t[o];c!==u&&"value"!==o&&a(e,o,u,c,s,r)}"value"in n&&a(e,"value",t.value,n.value,s)}},M=(e,t,n,r,i,o,a,c,l)=>{const h=t.el=e?e.el:u(""),f=t.anchor=e?e.anchor:u("");let{patchFlag:d,dynamicChildren:p,slotScopeIds:g}=t;g&&(c=c?c.concat(g):g),null==e?(s(h,n,r),s(f,n,r),O(t.children||[],n,f,i,o,a,c,l)):d>0&&64&d&&p&&e.dynamicChildren?(D(e.dynamicChildren,p,n,i,o,a,c),(null!=t.key||i&&t===i.subTree)&&dt(e,t,!0)):B(e,t,n,f,i,o,a,c,l)},L=(e,t,n,r,i,s,o,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,o,c):U(t,n,r,i,s,o,c):V(e,t,c)},U=(e,t,n,r,i,s,o)=>{const a=e.component=fn(e,r,i);if(H(e)&&(a.ctx.renderer=ne),Tn(a,!1,o),a.asyncDep){if(i&&i.registerDep(a,F,o),!e.el){const r=a.subTree=Zt(Ut);_(null,r,t,n),e.placeholder=r.el}}else F(a,e,t,n,i,s,o)},V=(e,t,n)=>{const r=t.component=e.component;if(Nt(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void j(r,t,n);r.next=t,r.update()}else t.el=e.el,r.vnode=t},F=(e,t,n,s,o,a,c)=>{const u=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:l}=e;{const n=gt(e);if(n)return t&&(t.el=l.el,j(e,t,c)),void n.asyncDep.then(()=>{e.isUnmounted||u()})}let h,f=t;0,ht(e,!1),t?(t.el=l.el,j(e,t,c)):t=l,n&&(0,i.DY)(n),(h=t.props&&t.props.onVnodeBeforeUpdate)&&un(h,s,t,l),ht(e,!0);const p=At(e);0;const g=e.subTree;e.subTree=p,y(g,p,d(g.el),Z(g),e,o,a),t.el=p.el,null===f&&xt(e,p.el),r&&at(r,o),(h=t.props&&t.props.onVnodeUpdated)&&at(()=>un(h,s,t,l),o)}else{let r;const{el:c,props:u}=t,{bm:l,m:h,parent:f,root:d,type:p}=e,g=z(t);if(ht(e,!1),l&&(0,i.DY)(l),!g&&(r=u&&u.onVnodeBeforeMount)&&un(r,f,t),ht(e,!0),c&&ie){const t=()=>{e.subTree=At(e),ie(c,e.subTree,e,o,null)};g&&p.__asyncHydrate?p.__asyncHydrate(c,e,t):t()}else{d.ce&&!1!==d.ce._def.shadowRoot&&d.ce._injectChildStyle(p);const r=e.subTree=At(e);0,y(null,r,n,s,e,o,a),t.el=r.el}if(h&&at(h,o),!g&&(r=u&&u.onVnodeMounted)){const e=t;at(()=>un(r,f,e),o)}(256&t.shapeFlag||f&&z(f.vnode)&&256&f.vnode.shapeFlag)&&e.a&&at(e.a,o),e.isMounted=!0,t=n=s=null}};e.scope.on();const l=e.effect=new r.X2(u);e.scope.off();const h=e.update=l.run.bind(l),f=e.job=l.runIfDirty.bind(l);f.i=e,f.id=e.uid,l.scheduler=()=>v(f),ht(e,!0),h()},j=(e,t,n)=>{t.component=e;const i=e.vnode.props;e.vnode=t,e.next=null,Ke(e,t.props,i,n),st(e,t.children,n),(0,r.C4)(),b(e),(0,r.bl)()},B=(e,t,n,r,i,s,o,a,c=!1)=>{const u=e&&e.children,l=e?e.shapeFlag:0,h=t.children,{patchFlag:d,shapeFlag:p}=t;if(d>0){if(128&d)return void K(u,h,n,r,i,s,o,a,c);if(256&d)return void q(u,h,n,r,i,s,o,a,c)}8&p?(16&l&&J(u,i,s),h!==u&&f(n,h)):16&l?16&p?K(u,h,n,r,i,s,o,a,c):J(u,i,s,!0):(8&l&&f(n,""),16&p&&O(h,n,r,i,s,o,a,c))},q=(e,t,n,r,s,o,a,c,u)=>{e=e||i.Oj,t=t||i.Oj;const l=e.length,h=t.length,f=Math.min(l,h);let d;for(d=0;d<f;d++){const r=t[d]=u?on(t[d]):sn(t[d]);y(e[d],r,n,null,s,o,a,c,u)}l>h?J(e,s,o,!0,!1,f):O(t,n,r,s,o,a,c,u,f)},K=(e,t,n,r,s,o,a,c,u)=>{let l=0;const h=t.length;let f=e.length-1,d=h-1;while(l<=f&&l<=d){const r=e[l],i=t[l]=u?on(t[l]):sn(t[l]);if(!Qt(r,i))break;y(r,i,n,null,s,o,a,c,u),l++}while(l<=f&&l<=d){const r=e[f],i=t[d]=u?on(t[d]):sn(t[d]);if(!Qt(r,i))break;y(r,i,n,null,s,o,a,c,u),f--,d--}if(l>f){if(l<=d){const e=d+1,i=e<h?t[e].el:r;while(l<=d)y(null,t[l]=u?on(t[l]):sn(t[l]),n,i,s,o,a,c,u),l++}}else if(l>d)while(l<=f)W(e[l],s,o,!0),l++;else{const p=l,g=l,m=new Map;for(l=g;l<=d;l++){const e=t[l]=u?on(t[l]):sn(t[l]);null!=e.key&&m.set(e.key,l)}let v,w=0;const _=d-g+1;let b=!1,E=0;const T=new Array(_);for(l=0;l<_;l++)T[l]=0;for(l=p;l<=f;l++){const r=e[l];if(w>=_){W(r,s,o,!0);continue}let i;if(null!=r.key)i=m.get(r.key);else for(v=g;v<=d;v++)if(0===T[v-g]&&Qt(r,t[v])){i=v;break}void 0===i?W(r,s,o,!0):(T[i-g]=l+1,i>=E?E=i:b=!0,y(r,t[i],n,null,s,o,a,c,u),w++)}const I=b?pt(T):i.Oj;for(v=I.length-1,l=_-1;l>=0;l--){const e=g+l,i=t[e],f=t[e+1],d=e+1<h?f.el||f.placeholder:r;0===T[l]?y(null,i,n,d,s,o,a,c,u):b&&(v<0||l!==I[v]?G(i,n,d,2):v--)}}},G=(e,t,n,r,i=null)=>{const{el:a,type:c,transition:u,children:l,shapeFlag:h}=e;if(6&h)return void G(e.component.subTree,t,n,r);if(128&h)return void e.suspense.move(t,n,r);if(64&h)return void c.move(e,t,n,ne);if(c===Mt){s(a,t,n);for(let e=0;e<l.length;e++)G(l[e],t,n,r);return void s(e.anchor,t,n)}if(c===Vt)return void I(e,t,n);const f=2!==r&&1&h&&u;if(f)if(0===r)u.beforeEnter(a),s(a,t,n),at(()=>u.enter(a),i);else{const{leave:r,delayLeave:i,afterLeave:c}=u,l=()=>{e.ctx.isUnmounted?o(a):s(a,t,n)},h=()=>{r(a,()=>{l(),c&&c()})};i?i(a,l,h):h()}else s(a,t,n)},W=(e,t,n,i=!1,s=!1)=>{const{type:o,props:a,ref:c,children:u,dynamicChildren:l,shapeFlag:h,patchFlag:f,dirs:d,cacheIndex:p}=e;if(-2===f&&(s=!1),null!=c&&((0,r.C4)(),$(c,null,n,e,!0),(0,r.bl)()),null!=p&&(t.renderCache[p]=void 0),256&h)return void t.ctx.deactivate(e);const g=1&h&&d,m=!z(e);let y;if(m&&(y=a&&a.onVnodeBeforeUnmount)&&un(y,t,e),6&h)Y(e.component,n,i);else{if(128&h)return void e.suspense.unmount(n,i);g&&R(e,null,t,"beforeUnmount"),64&h?e.type.remove(e,t,n,ne,i):l&&!l.hasOnce&&(o!==Mt||f>0&&64&f)?J(l,t,n,!1,!0):(o===Mt&&384&f||!s&&16&h)&&J(u,t,n),i&&Q(e)}(m&&(y=a&&a.onVnodeUnmounted)||g)&&at(()=>{y&&un(y,t,e),g&&R(e,null,t,"unmounted")},n)},Q=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Mt)return void X(n,r);if(t===Vt)return void S(e);const s=()=>{o(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,o=()=>t(n,s);r?r(e.el,s,o):o()}else s()},X=(e,t)=>{let n;while(e!==t)n=p(e),o(e),e=n;o(t)},Y=(e,t,n)=>{const{bum:r,scope:s,job:o,subTree:a,um:c,m:u,a:l,parent:h,slots:{__:f}}=e;mt(u),mt(l),r&&(0,i.DY)(r),h&&(0,i.cy)(f)&&f.forEach(e=>{h.renderCache[e]=void 0}),s.stop(),o&&(o.flags|=8,W(a,e,t,n)),c&&at(c,t),at(()=>{e.isUnmounted=!0},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},J=(e,t,n,r=!1,i=!1,s=0)=>{for(let o=s;o<e.length;o++)W(e[o],t,n,r,i)},Z=e=>{if(6&e.shapeFlag)return Z(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();const t=p(e.anchor||e.el),n=t&&t[N];return n?p(n):t};let ee=!1;const te=(e,t,n)=>{null==e?t._vnode&&W(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ee||(ee=!0,b(),E(),ee=!1)},ne={p:y,um:W,m:G,r:Q,mt:U,mc:O,pc:B,pbc:D,n:Z,o:e};let re,ie;return t&&([re,ie]=t(ne)),{render:te,hydrate:re,createApp:Ve(te,re)}}function lt({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function ht({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function ft(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function dt(e,t,n=!1){const r=e.children,s=t.children;if((0,i.cy)(r)&&(0,i.cy)(s))for(let i=0;i<r.length;i++){const e=r[i];let t=s[i];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=s[i]=on(s[i]),t.el=e.el),n||-2===t.patchFlag||dt(e,t)),t.type===Lt&&(t.el=e.el),t.type!==Ut||t.el||(t.el=e.el)}}function pt(e){const t=e.slice(),n=[0];let r,i,s,o,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}s=0,o=n.length-1;while(s<o)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}s=n.length,o=n[s-1];while(s-- >0)n[s]=o,o=t[o];return n}function gt(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:gt(t)}function mt(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const yt=Symbol.for("v-scx"),vt=()=>{{const e=Be(yt);return e}};function wt(e,t,n){return _t(e,t,n)}function _t(e,t,n=i.MZ){const{immediate:s,deep:a,flush:c,once:u}=n;const l=(0,i.X$)({},n);const h=t&&s||!t&&"post"!==c;let f;if(En)if("sync"===c){const e=vt();f=e.__watcherHandles||(e.__watcherHandles=[])}else if(!h){const e=()=>{};return e.stop=i.tE,e.resume=i.tE,e.pause=i.tE,e}const d=dn;l.call=(e,t,n)=>o(e,d,t,n);let p=!1;"post"===c?l.scheduler=e=>{at(e,d&&d.suspense)}:"sync"!==c&&(p=!0,l.scheduler=(e,t)=>{t?e():v(e)}),l.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,d&&(e.id=d.uid,e.i=d))};const g=(0,r.wB)(e,t,l);return En&&(f?f.push(g):h&&g()),g}function bt(e,t,n){const r=this.proxy,s=(0,i.Kg)(e)?e.includes(".")?Et(r,e):()=>r[e]:e.bind(r,r);let o;(0,i.Tn)(t)?o=t:(o=t.handler,n=t);const a=yn(this),c=_t(s,o.bind(r),n);return a(),c}function Et(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}const Tt=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${(0,i.PT)(t)}Modifiers`]||e[`${(0,i.Tg)(t)}Modifiers`];function It(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||i.MZ;let s=n;const a=t.startsWith("update:"),c=a&&Tt(r,t.slice(7));let u;c&&(c.trim&&(s=n.map(e=>(0,i.Kg)(e)?e.trim():e)),c.number&&(s=n.map(i.bB)));let l=r[u=(0,i.rU)(t)]||r[u=(0,i.rU)((0,i.PT)(t))];!l&&a&&(l=r[u=(0,i.rU)((0,i.Tg)(t))]),l&&o(l,e,6,s);const h=r[u+"Once"];if(h){if(e.emitted){if(e.emitted[u])return}else e.emitted={};e.emitted[u]=!0,o(h,e,6,s)}}function St(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(void 0!==s)return s;const o=e.emits;let a={},c=!1;if(!(0,i.Tn)(e)){const r=e=>{const n=St(e,t,!0);n&&(c=!0,(0,i.X$)(a,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return o||c?((0,i.cy)(o)?o.forEach(e=>a[e]=null):(0,i.X$)(a,o),(0,i.Gv)(e)&&r.set(e,a),a):((0,i.Gv)(e)&&r.set(e,null),null)}function Ct(e,t){return!(!e||!(0,i.Mp)(t))&&(t=t.slice(2).replace(/Once$/,""),(0,i.$3)(e,t[0].toLowerCase()+t.slice(1))||(0,i.$3)(e,(0,i.Tg)(t))||(0,i.$3)(e,t))}function At(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[o],slots:c,attrs:u,emit:l,render:h,renderCache:f,props:d,data:p,setupState:g,ctx:m,inheritAttrs:y}=e,v=A(e);let w,_;try{if(4&n.shapeFlag){const e=s||r,t=e;w=sn(h.call(t,e,f,d,g,p,m)),_=u}else{const e=t;0,w=sn(e.length>1?e(d,{attrs:u,slots:c,emit:l}):e(d,null)),_=t.props?u:kt(u)}}catch(E){Ft.length=0,a(E,e,1),w=Zt(Ut)}let b=w;if(_&&!1!==y){const e=Object.keys(_),{shapeFlag:t}=b;e.length&&7&t&&(o&&e.some(i.CP)&&(_=Rt(_,o)),b=nn(b,_,!1,!0))}return n.dirs&&(b=nn(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&F(b,n.transition),w=b,A(v),w}const kt=e=>{let t;for(const n in e)("class"===n||"style"===n||(0,i.Mp)(n))&&((t||(t={}))[n]=e[n]);return t},Rt=(e,t)=>{const n={};for(const r in e)(0,i.CP)(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function Nt(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:c}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==o&&(r?!o||Ot(r,o,u):!!o);if(1024&c)return!0;if(16&c)return r?Ot(r,o,u):!!o;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(o[n]!==r[n]&&!Ct(u,n))return!0}}return!1}function Ot(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!Ct(n,s))return!0}return!1}function xt({vnode:e,parent:t},n){while(t){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r!==e)break;(e=t.vnode).el=n,t=t.parent}}const Dt=e=>e.__isSuspense;function Pt(e,t){t&&t.pendingBranch?(0,i.cy)(e)?t.effects.push(...e):t.effects.push(e):_(e)}const Mt=Symbol.for("v-fgt"),Lt=Symbol.for("v-txt"),Ut=Symbol.for("v-cmt"),Vt=Symbol.for("v-stc"),Ft=[];let jt=null;function Bt(e=!1){Ft.push(jt=e?null:[])}function $t(){Ft.pop(),jt=Ft[Ft.length-1]||null}let zt=1;function Ht(e,t=!1){zt+=e,e<0&&jt&&t&&(jt.hasOnce=!0)}function qt(e){return e.dynamicChildren=zt>0?jt||i.Oj:null,$t(),zt>0&&jt&&jt.push(e),e}function Kt(e,t,n,r,i,s){return qt(Jt(e,t,n,r,i,s,!0))}function Gt(e,t,n,r,i){return qt(Zt(e,t,n,r,i,!0))}function Wt(e){return!!e&&!0===e.__v_isVNode}function Qt(e,t){return e.type===t.type&&e.key===t.key}const Xt=({key:e})=>null!=e?e:null,Yt=({ref:e,ref_key:t,ref_for:n})=>("number"===typeof e&&(e=""+e),null!=e?(0,i.Kg)(e)||(0,r.i9)(e)||(0,i.Tn)(e)?{i:S,r:e,k:t,f:!!n}:e:null);function Jt(e,t=null,n=null,r=0,s=null,o=(e===Mt?0:1),a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Xt(t),ref:t&&Yt(t),scopeId:C,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:S};return c?(an(u,n),128&o&&e.normalize(u)):n&&(u.shapeFlag|=(0,i.Kg)(n)?8:16),zt>0&&!a&&jt&&(u.patchFlag>0||6&o)&&32!==u.patchFlag&&jt.push(u),u}const Zt=en;function en(e,t=null,n=null,s=0,o=null,a=!1){if(e&&e!==fe||(e=Ut),Wt(e)){const r=nn(e,t,!0);return n&&an(r,n),zt>0&&!a&&jt&&(6&r.shapeFlag?jt[jt.indexOf(e)]=r:jt.push(r)),r.patchFlag=-2,r}if(On(e)&&(e=e.__vccOpts),t){t=tn(t);let{class:e,style:n}=t;e&&!(0,i.Kg)(e)&&(t.class=(0,i.C4)(e)),(0,i.Gv)(n)&&((0,r.ju)(n)&&!(0,i.cy)(n)&&(n=(0,i.X$)({},n)),t.style=(0,i.Tr)(n))}const c=(0,i.Kg)(e)?1:Dt(e)?128:O(e)?64:(0,i.Gv)(e)?4:(0,i.Tn)(e)?2:0;return Jt(e,t,n,s,o,c,a,!0)}function tn(e){return e?(0,r.ju)(e)||He(e)?(0,i.X$)({},e):e:null}function nn(e,t,n=!1,r=!1){const{props:s,ref:o,patchFlag:a,children:c,transition:u}=e,l=t?cn(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Xt(l),ref:t&&t.ref?n&&o?(0,i.cy)(o)?o.concat(Yt(t)):[o,Yt(t)]:Yt(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Mt?-1===a?16:16|a:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&nn(e.ssContent),ssFallback:e.ssFallback&&nn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&r&&F(h,u.clone(h)),h}function rn(e=" ",t=0){return Zt(Lt,null,e,t)}function sn(e){return null==e||"boolean"===typeof e?Zt(Ut):(0,i.cy)(e)?Zt(Mt,null,e.slice()):Wt(e)?on(e):Zt(Lt,null,String(e))}function on(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:nn(e)}function an(e,t){let n=0;const{shapeFlag:r}=e;if(null==t)t=null;else if((0,i.cy)(t))n=16;else if("object"===typeof t){if(65&r){const n=t.default;return void(n&&(n._c&&(n._d=!1),an(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||He(t)?3===r&&S&&(1===S.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=S}}else(0,i.Tn)(t)?(t={default:t,_ctx:S},n=32):(t=String(t),64&r?(n=16,t=[rn(t)]):n=8);e.children=t,e.shapeFlag|=n}function cn(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=(0,i.C4)([t.class,r.class]));else if("style"===e)t.style=(0,i.Tr)([t.style,r.style]);else if((0,i.Mp)(e)){const n=t[e],s=r[e];!s||n===s||(0,i.cy)(n)&&n.includes(s)||(t[e]=n?[].concat(n,s):s)}else""!==e&&(t[e]=r[e])}return t}function un(e,t,n,r=null){o(e,t,7,[n,r])}const ln=Le();let hn=0;function fn(e,t,n){const s=e.type,o=(t?t.appContext:e.appContext)||ln,a={uid:hn++,vnode:e,type:s,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new r.yC(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xe(s,o),emitsOptions:St(s,o),emit:null,emitted:null,propsDefaults:i.MZ,inheritAttrs:s.inheritAttrs,ctx:i.MZ,data:i.MZ,props:i.MZ,attrs:i.MZ,slots:i.MZ,refs:i.MZ,setupState:i.MZ,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=It.bind(null,a),e.ce&&e.ce(a),a}let dn=null;const pn=()=>dn||S;let gn,mn;{const e=(0,i.We)(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};gn=t("__VUE_INSTANCE_SETTERS__",e=>dn=e),mn=t("__VUE_SSR_SETTERS__",e=>En=e)}const yn=e=>{const t=dn;return gn(e),e.scope.on(),()=>{e.scope.off(),gn(t)}},vn=()=>{dn&&dn.scope.off(),gn(null)};function wn(e){return 4&e.vnode.shapeFlag}let _n,bn,En=!1;function Tn(e,t=!1,n=!1){t&&mn(t);const{props:r,children:i}=e.vnode,s=wn(e);qe(e,r,s,t),it(e,i,n||t);const o=s?In(e,t):void 0;return t&&mn(!1),o}function In(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,we);const{setup:o}=n;if(o){(0,r.C4)();const n=e.setupContext=o.length>1?kn(e):null,c=yn(e),u=s(o,e,0,[e.props,n]),l=(0,i.yL)(u);if((0,r.bl)(),c(),!l&&!e.sp||z(e)||B(e),l){if(u.then(vn,vn),t)return u.then(n=>{Sn(e,n,t)}).catch(t=>{a(t,e,0)});e.asyncDep=u}else Sn(e,u,t)}else Cn(e,t)}function Sn(e,t,n){(0,i.Tn)(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:(0,i.Gv)(t)&&(e.setupState=(0,r.Pr)(t)),Cn(e,n)}function Cn(e,t,n){const s=e.type;if(!e.render){if(!t&&_n&&!s.render){const t=s.template||Ce(e).template;if(t){0;const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:o,compilerOptions:a}=s,c=(0,i.X$)((0,i.X$)({isCustomElement:n,delimiters:o},r),a);s.render=_n(t,c)}}e.render=s.render||i.tE,bn&&bn(e)}{const t=yn(e);(0,r.C4)();try{Ee(e)}finally{(0,r.bl)(),t()}}}const An={get(e,t){return(0,r.u4)(e,"get",""),e[t]}};function kn(e){const t=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,An),slots:e.slots,emit:e.emit,expose:t}}function Rn(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy((0,r.Pr)((0,r.IG)(e.exposed)),{get(t,n){return n in t?t[n]:n in ye?ye[n](e):void 0},has(e,t){return t in e||t in ye}})):e.proxy}function Nn(e,t=!0){return(0,i.Tn)(e)?e.displayName||e.name:e.name||t&&e.__name}function On(e){return(0,i.Tn)(e)&&"__vccOpts"in e}const xn=(e,t)=>{const n=(0,r.EW)(e,t,En);return n};const Dn="3.5.18"},6801:function(e,t,n){var r=n(3724),i=n(8686),s=n(4913),o=n(8551),a=n(5397),c=n(1072);t.f=r&&!i?Object.defineProperties:function(e,t){o(e);var n,r=a(t),i=c(t),u=i.length,l=0;while(u>l)s.f(e,n=i[l++],r[n]);return e}},6823:function(e){var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},6837:function(e){var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},6840:function(e,t,n){var r=n(4901),i=n(4913),s=n(283),o=n(9433);e.exports=function(e,t,n,a){a||(a={});var c=a.enumerable,u=void 0!==a.name?a.name:t;if(r(n)&&s(n,u,a),a.global)c?e[t]=n:o(t,n);else{try{a.unsafe?e[t]&&(c=!0):delete e[t]}catch(l){}c?e[t]=n:i.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e}},6955:function(e,t,n){var r=n(2140),i=n(4901),s=n(2195),o=n(8227),a=o("toStringTag"),c=Object,u="Arguments"===s(function(){return arguments}()),l=function(e,t){try{return e[t]}catch(n){}};e.exports=r?s:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=l(t=c(e),a))?n:u?s(t):"Object"===(r=s(t))&&i(t.callee)?"Arguments":r}},6969:function(e,t,n){var r=n(2777),i=n(757);e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},6980:function(e){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},7040:function(e,t,n){var r=n(4495);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},7055:function(e,t,n){var r=n(9504),i=n(9039),s=n(2195),o=Object,a=r("".split);e.exports=i(function(){return!o("z").propertyIsEnumerable(0)})?function(e){return"String"===s(e)?a(e,""):o(e)}:o},7080:function(e,t,n){var r=n(4402).has;e.exports=function(e){return r(e),e}},7347:function(e,t,n){var r=n(3724),i=n(9565),s=n(8773),o=n(6980),a=n(5397),c=n(6969),u=n(9297),l=n(5917),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),l)try{return h(e,t)}catch(n){}if(u(e,t))return o(!i(s.f,e,t),e[t])}},7394:function(e,t,n){var r=n(4576),i=n(6706),s=n(2195),o=r.ArrayBuffer,a=r.TypeError;e.exports=o&&i(o.prototype,"byteLength","get")||function(e){if("ArrayBuffer"!==s(e))throw new a("ArrayBuffer expected");return e.byteLength}},7476:function(e,t,n){var r=n(2195),i=n(9504);e.exports=function(e){if("Function"===r(e))return i(e)}},7566:function(e,t,n){var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,u=i(c.getAll),l=i(c.has),h=new a("a=1");!h.has("a",2)&&h.has("a",void 0)||r(c,"has",function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return l(this,e);var r=u(this,e);o(t,1);var i=s(n),a=0;while(a<r.length)if(r[a++]===i)return!0;return!1},{enumerable:!0,unsafe:!0})},7588:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("forEach",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{forEach:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;s(t,function(t){e(t,n++)},{IS_RECORD:!0})}})},7629:function(e,t,n){var r=n(6395),i=n(4576),s=n(9433),o="__core-js_shared__",a=e.exports=i[o]||s(o,{});(a.versions||(a.versions=[])).push({version:"3.45.0",mode:r?"pure":"global",copyright:"© 2014-2025 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.45.0/LICENSE",source:"https://github.com/zloirock/core-js"})},7642:function(e,t,n){var r=n(6518),i=n(3440),s=n(9039),o=n(4916),a=!o("difference",function(e){return 0===e.size}),c=a||s(function(){var e={size:1,has:function(){return!0},keys:function(){var e=0;return{next:function(){var n=e++>1;return t.has(1)&&t.clear(),{done:n,value:2}}}}},t=new Set([1,2,3,4]);return 3!==t.difference(e).size});r({target:"Set",proto:!0,real:!0,forced:c},{difference:i})},7657:function(e,t,n){var r,i,s,o=n(9039),a=n(4901),c=n(34),u=n(2360),l=n(2787),h=n(6840),f=n(8227),d=n(6395),p=f("iterator"),g=!1;[].keys&&(s=[].keys(),"next"in s?(i=l(l(s)),i!==Object.prototype&&(r=i)):g=!0);var m=!c(r)||o(function(){var e={};return r[p].call(e)!==e});m?r={}:d&&(r=u(r)),a(r[p])||h(r,p,function(){return this}),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:g}},7696:function(e,t,n){var r=n(1291),i=n(8014),s=RangeError;e.exports=function(e){if(void 0===e)return 0;var t=r(e),n=i(t);if(t!==n)throw new s("Wrong length or index");return n}},7740:function(e,t,n){var r=n(9297),i=n(5031),s=n(7347),o=n(4913);e.exports=function(e,t,n){for(var a=i(t),c=o.f,u=s.f,l=0;l<a.length;l++){var h=a[l];r(e,h)||n&&r(n,h)||c(e,h,u(t,h))}}},7750:function(e,t,n){var r=n(4117),i=TypeError;e.exports=function(e){if(r(e))throw new i("Can't call method on "+e);return e}},7751:function(e,t,n){var r=n(4576),i=n(4901),s=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?s(r[e]):r[e]&&r[e][t]}},7811:function(e){e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},7936:function(e,t,n){var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transferToFixedLength:function(){return i(this,arguments.length?arguments[0]:void 0,!1)}})},8004:function(e,t,n){var r=n(6518),i=n(9039),s=n(8750),o=n(4916),a=!o("intersection",function(e){return 2===e.size&&e.has(1)&&e.has(2)})||i(function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))});r({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},8014:function(e,t,n){var r=n(1291),i=Math.min;e.exports=function(e){var t=r(e);return t>0?i(t,9007199254740991):0}},8100:function(e,t,n){var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transfer:function(){return i(this,arguments.length?arguments[0]:void 0,!0)}})},8111:function(e,t,n){var r=n(6518),i=n(4576),s=n(679),o=n(8551),a=n(4901),c=n(2787),u=n(2106),l=n(4659),h=n(9039),f=n(9297),d=n(8227),p=n(7657).IteratorPrototype,g=n(3724),m=n(6395),y="constructor",v="Iterator",w=d("toStringTag"),_=TypeError,b=i[v],E=m||!a(b)||b.prototype!==p||!h(function(){b({})}),T=function(){if(s(this,p),c(this)===p)throw new _("Abstract class Iterator not directly constructable")},I=function(e,t){g?u(p,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===p)throw new _("You can't redefine this property");f(this,e)?this[e]=t:l(this,e,t)}}):p[e]=t};f(p,w)||I(w,v),!E&&f(p,y)&&p[y]!==Object||I(y,T),T.prototype=p,r({global:!0,constructor:!0,forced:E},{Iterator:T})},8227:function(e,t,n){var r=n(4576),i=n(5745),s=n(9297),o=n(3392),a=n(4495),c=n(7040),u=r.Symbol,l=i("wks"),h=c?u["for"]||u:u&&u.withoutSetter||o;e.exports=function(e){return s(l,e)||(l[e]=a&&s(u,e)?u[e]:h("Symbol."+e)),l[e]}},8237:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767),c=n(9539),u=n(4549),l=n(8745),h=n(9039),f=TypeError,d=h(function(){[].keys().reduce(function(){},void 0)}),p=!d&&u("reduce",f);r({target:"Iterator",proto:!0,real:!0,forced:d||p},{reduce:function(e){o(this);try{s(e)}catch(h){c(this,"throw",h)}var t=arguments.length<2,n=t?void 0:arguments[1];if(p)return l(p,this,t?[e]:[e,n]);var r=a(this),u=0;if(i(r,function(r){t?(t=!1,n=r):n=e(n,r,u),u++},{IS_RECORD:!0}),t)throw new f("Reduce of empty iterator with no initial value");return n}})},8469:function(e,t,n){var r=n(9504),i=n(507),s=n(4402),o=s.Set,a=s.proto,c=r(a.forEach),u=r(a.keys),l=u(new o).next;e.exports=function(e,t,n){return n?i({iterator:u(e),next:l},t):c(e,t)}},8480:function(e,t,n){var r=n(1828),i=n(8727),s=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},8527:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(507),c=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<n.size)return!1;var u=n.getIterator();return!1!==a(u,function(e){if(!i(t,e))return c(u,"normal",!1)})}},8551:function(e,t,n){var r=n(34),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not an object")}},8574:function(e,t,n){var r=n(4215);e.exports="NODE"===r},8622:function(e,t,n){var r=n(4576),i=n(4901),s=r.WeakMap;e.exports=i(s)&&/native code/.test(String(s))},8646:function(e,t,n){var r=n(9565),i=n(8551),s=n(1767),o=n(851);e.exports=function(e,t){t&&"string"===typeof e||i(e);var n=o(e);return s(i(void 0!==n?r(n,e):e))}},8686:function(e,t,n){var r=n(3724),i=n(9039);e.exports=r&&i(function(){return 42!==Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype})},8721:function(e,t,n){var r=n(3724),i=n(9504),s=n(2106),o=URLSearchParams.prototype,a=i(o.forEach);r&&!("size"in o)&&s(o,"size",{get:function(){var e=0;return a(this,function(){e++}),e},configurable:!0,enumerable:!0})},8727:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},8745:function(e,t,n){var r=n(616),i=Function.prototype,s=i.apply,o=i.call;e.exports="object"==typeof Reflect&&Reflect.apply||(r?o.bind(s):function(){return o.apply(s,arguments)})},8750:function(e,t,n){var r=n(7080),i=n(4402),s=n(5170),o=n(3789),a=n(8469),c=n(507),u=i.Set,l=i.add,h=i.has;e.exports=function(e){var t=r(this),n=o(e),i=new u;return s(t)>n.size?c(n.getIterator(),function(e){h(t,e)&&l(i,e)}):a(t,function(e){n.includes(e)&&l(i,e)}),i}},8773:function(e,t){var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},8981:function(e,t,n){var r=n(7750),i=Object;e.exports=function(e){return i(r(e))}},9039:function(e){e.exports=function(e){try{return!!e()}catch(t){return!0}}},9143:function(e,t,n){var r=n(4576),i=n(9504),s=n(3972),o=n(3463),a=n(9297),c=n(2804),u=n(944),l=n(5169),h=c.c2i,f=c.c2iUrl,d=r.SyntaxError,p=r.TypeError,g=i("".charAt),m=function(e,t){for(var n=e.length;t<n;t++){var r=g(e,t);if(" "!==r&&"\t"!==r&&"\n"!==r&&"\f"!==r&&"\r"!==r)break}return t},y=function(e,t,n){var r=e.length;r<4&&(e+=2===r?"AA":"A");var i=(t[g(e,0)]<<18)+(t[g(e,1)]<<12)+(t[g(e,2)]<<6)+t[g(e,3)],s=[i>>16&255,i>>8&255,255&i];if(2===r){if(n&&0!==s[1])throw new d("Extra bits");return[s[0]]}if(3===r){if(n&&0!==s[2])throw new d("Extra bits");return[s[0],s[1]]}return s},v=function(e,t,n){for(var r=t.length,i=0;i<r;i++)e[n+i]=t[i];return n+r};e.exports=function(e,t,n,r){o(e),s(t);var i="base64"===u(t)?h:f,c=t?t.lastChunkHandling:void 0;if(void 0===c&&(c="loose"),"loose"!==c&&"strict"!==c&&"stop-before-partial"!==c)throw new p("Incorrect `lastChunkHandling` option");n&&l(n.buffer);var w=e.length,_=n||[],b=0,E=0,T="",I=0;if(r)while(1){if(I=m(e,I),I===w){if(T.length>0){if("stop-before-partial"===c)break;if("loose"!==c)throw new d("Missing padding");if(1===T.length)throw new d("Malformed padding: exactly one additional character");b=v(_,y(T,i,!1),b)}E=w;break}var S=g(e,I);if(++I,"="===S){if(T.length<2)throw new d("Padding is too early");if(I=m(e,I),2===T.length){if(I===w){if("stop-before-partial"===c)break;throw new d("Malformed padding: only one =")}"="===g(e,I)&&(++I,I=m(e,I))}if(I<w)throw new d("Unexpected character after padding");b=v(_,y(T,i,"strict"===c),b),E=w;break}if(!a(i,S))throw new d("Unexpected character");var C=r-b;if(1===C&&2===T.length||2===C&&3===T.length)break;if(T+=S,4===T.length&&(b=v(_,y(T,i,!1),b),T="",E=I,b===r))break}return{bytes:_,read:E,written:b}}},9286:function(e,t,n){var r=n(4402),i=n(8469),s=r.Set,o=r.add;e.exports=function(e){var t=new s;return i(e,function(e){o(t,e)}),t}},9297:function(e,t,n){var r=n(9504),i=n(8981),s=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return s(i(e),t)}},9306:function(e,t,n){var r=n(4901),i=n(6823),s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not a function")}},9429:function(e,t,n){var r=n(4576),i=n(8574);e.exports=function(e){if(i){try{return r.process.getBuiltinModule(e)}catch(t){}try{return Function('return require("'+e+'")')()}catch(t){}}}},9433:function(e,t,n){var r=n(4576),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},9462:function(e,t,n){var r=n(9565),i=n(2360),s=n(6699),o=n(6279),a=n(8227),c=n(1181),u=n(5966),l=n(7657).IteratorPrototype,h=n(2529),f=n(9539),d=n(1385),p=a("toStringTag"),g="IteratorHelper",m="WrapForValidIterator",y="normal",v="throw",w=c.set,_=function(e){var t=c.getterFor(e?m:g);return o(i(l),{next:function(){var n=t(this);if(e)return n.nextHandler();if(n.done)return h(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:h(r,n.done)}catch(i){throw n.done=!0,i}},return:function(){var n=t(this),i=n.iterator;if(n.done=!0,e){var s=u(i,"return");return s?r(s,i):h(void 0,!0)}if(n.inner)try{f(n.inner.iterator,y)}catch(o){return f(i,v,o)}if(n.openIters)try{d(n.openIters,y)}catch(o){return f(i,v,o)}return i&&f(i,y),h(void 0,!0)}})},b=_(!0),E=_(!1);s(E,p,"Iterator Helper"),e.exports=function(e,t,n){var r=function(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?m:g,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,w(this,i)};return r.prototype=t?b:E,r}},9486:function(e,t,n){var r=n(6518),i=n(4576),s=n(9504),o=n(3972),a=n(4154),c=n(5169),u=n(2804),l=n(944),h=u.i2c,f=u.i2cUrl,d=s("".charAt),p=i.Uint8Array,g=!p||!p.prototype.toBase64||!function(){try{var e=new p;e.toBase64(null)}catch(t){return!0}}();p&&r({target:"Uint8Array",proto:!0,forced:g},{toBase64:function(){var e=a(this),t=arguments.length?o(arguments[0]):void 0,n="base64"===l(t)?h:f,r=!!t&&!!t.omitPadding;c(this.buffer);for(var i,s="",u=0,p=e.length,g=function(e){return d(n,i>>6*e&63)};u+2<p;u+=3)i=(e[u]<<16)+(e[u+1]<<8)+e[u+2],s+=g(3)+g(2)+g(1)+g(0);return u+2===p?(i=(e[u]<<16)+(e[u+1]<<8),s+=g(3)+g(2)+g(1)+(r?"":"=")):u+1===p&&(i=e[u]<<16,s+=g(3)+g(2)+(r?"":"==")),s}})},9504:function(e,t,n){var r=n(616),i=Function.prototype,s=i.call,o=r&&i.bind.bind(s,s);e.exports=r?o:function(e){return function(){return s.apply(e,arguments)}}},9519:function(e,t,n){var r,i,s=n(4576),o=n(2839),a=s.process,c=s.Deno,u=a&&a.versions||c&&c.version,l=u&&u.v8;l&&(r=l.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},9539:function(e,t,n){var r=n(9565),i=n(8551),s=n(5966);e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},9565:function(e,t,n){var r=n(616),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},9577:function(e,t,n){var r=n(9928),i=n(4644),s=n(1108),o=n(1291),a=n(5854),c=i.aTypedArray,u=i.getTypedArrayConstructor,l=i.exportTypedArrayMethod,h=function(){try{new Int8Array(1)["with"](2,{valueOf:function(){throw 8}})}catch(e){return 8===e}}(),f=h&&function(){try{new Int8Array(1)["with"](-.5,1)}catch(e){return!0}}();l("with",{with:function(e,t){var n=c(this),i=o(e),l=s(n)?a(t):+t;return r(n,u(n),i,l)}}["with"],!h||f)},9617:function(e,t,n){var r=n(5397),i=n(5610),s=n(6198),o=function(e){return function(t,n,o){var a=r(t),c=s(a);if(0===c)return!e&&-1;var u,l=i(o,c);if(e&&n!==n){while(c>l)if(u=a[l++],u!==u)return!0}else for(;c>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}};e.exports={includes:o(!0),indexOf:o(!1)}},9631:function(e,t,n){n(9486)},9797:function(e,t,n){n(4226)},9835:function(e){e.exports=function(e){try{var t=new Set,n={size:0,has:function(){return!0},keys:function(){return Object.defineProperty({},"next",{get:function(){return t.clear(),t.add(4),function(){return{done:!0}}}})}},r=t[e](n);return 1===r.size&&4===r.values().next().value}catch(i){return!1}}},9928:function(e,t,n){var r=n(6198),i=n(1291),s=RangeError;e.exports=function(e,t,n,o){var a=r(e),c=i(n),u=c<0?a+c:c;if(u>=a||u<0)throw new s("Incorrect index");for(var l=new t(a),h=0;h<a;h++)l[h]=h===u?o:e[h];return l}}}]);
//# sourceMappingURL=chunk-vendors.52ddc572.js.map