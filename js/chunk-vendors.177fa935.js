"use strict";(self["webpackChunkclass_room"]=self["webpackChunkclass_room"]||[]).push([[504],{34:function(e,t,n){var r=n(4901);e.exports=function(e){return"object"==typeof e?null!==e:r(e)}},81:function(e,t,n){var r=n(9565),i=n(9306),s=n(8551),o=n(6823),a=n(851),c=TypeError;e.exports=function(e,t){var n=arguments.length<2?a(e):t;if(i(n))return s(r(n,e));throw new c(o(e)+" is not iterable")}},116:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("find",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{find:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r(t)},{IS_RECORD:!0,INTERRUPTED:!0}).result}})},144:function(e,t,n){n.d(t,{BA:function(){return He},C4:function(){return k},EW:function(){return et},Gc:function(){return Ie},IG:function(){return De},IJ:function(){return Fe},KR:function(){return Ue},Kh:function(){return Te},PP:function(){return nt},Pr:function(){return Ge},QW:function(){return ze},QZ:function(){return I},R1:function(){return Be},Tm:function(){return Ne},Ul:function(){return tt},X2:function(){return h},Yv:function(){return ot},a1:function(){return xe},bl:function(){return N},ch:function(){return at},ds:function(){return S},fE:function(){return Re},g8:function(){return ke},hV:function(){return ut},hZ:function(){return j},i9:function(){return Me},jr:function(){return u},ju:function(){return Oe},lJ:function(){return Le},lW:function(){return Qe},mu:function(){return $e},nD:function(){return Ce},o5:function(){return c},qA:function(){return H},rY:function(){return qe},tB:function(){return Se},u4:function(){return V},uY:function(){return a},ux:function(){return Pe},wB:function(){return ct},yC:function(){return o}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(4232);let i,s;class o{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=i;try{return i=this,e()}finally{i=t}}else 0}on(){1===++this._on&&(this.prevScope=i,i=this)}off(){this._on>0&&0===--this._on&&(i=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){let t,n;for(this._active=!1,t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}}function a(e){return new o(e)}function c(){return i}function u(e,t=!1){i&&i.cleanups.push(e)}const l=new WeakSet;class h{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,l.has(this)&&(l.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||m(this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,R(this),v(this);const e=s,t=C;s=this,C=!0;try{return this.fn()}finally{0,_(this),s=e,C=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)b(e);this.deps=this.depsTail=void 0,R(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?l.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){E(this)&&this.run()}get dirty(){return E(this)}}let f,d,p=0;function m(e,t=!1){if(e.flags|=8,t)return e.next=d,void(d=e);e.next=f,f=e}function g(){p++}function y(){if(--p>0)return;if(d){let e=d;d=void 0;while(e){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;while(f){let n=f;f=void 0;while(n){const r=n.next;if(n.next=void 0,n.flags&=-9,1&n.flags)try{n.trigger()}catch(t){e||(e=t)}n=r}}if(e)throw e}function v(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function _(e){let t,n=e.depsTail,r=n;while(r){const e=r.prevDep;-1===r.version?(r===n&&(n=e),b(r),T(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function E(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(w(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function w(e){if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===O)return;if(e.globalVersion=O,!e.isSSR&&128&e.flags&&(!e.deps&&!e._dirty||!E(e)))return;e.flags|=2;const t=e.dep,n=s,i=C;s=e,C=!0;try{v(e);const n=e.fn(e._value);(0===t.version||(0,r.$H)(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(o){throw t.version++,o}finally{s=n,C=i,_(e),e.flags&=-3}}function b(e,t=!1){const{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)b(e,!0)}t||--n.sc||!n.map||n.map.delete(n.key)}function T(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function I(e,t){e.effect instanceof h&&(e=e.effect.fn);const n=new h(e);t&&(0,r.X$)(n,t);try{n.run()}catch(s){throw n.stop(),s}const i=n.run.bind(n);return i.effect=n,i}function S(e){e.effect.stop()}let C=!0;const A=[];function k(){A.push(C),C=!1}function N(){const e=A.pop();C=void 0===e||e}function R(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=s;s=void 0;try{t()}finally{s=e}}}let O=0;class P{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class D{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!s||!C||s===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==s)t=this.activeLink=new P(s,this),s.deps?(t.prevDep=s.depsTail,s.depsTail.nextDep=t,s.depsTail=t):s.deps=s.depsTail=t,L(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=s.depsTail,t.nextDep=void 0,s.depsTail.nextDep=t,s.depsTail=t,s.deps===t&&(s.deps=e)}return t}trigger(e){this.version++,O++,this.notify(e)}notify(e){g();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{y()}}}function L(e){if(e.dep.sc++,4&e.sub.flags){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)L(e)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const x=new WeakMap,M=Symbol(""),U=Symbol(""),F=Symbol("");function V(e,t,n){if(C&&s){let t=x.get(e);t||x.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new D),r.map=t,r.key=n),r.track()}}function j(e,t,n,i,s,o){const a=x.get(e);if(!a)return void O++;const c=e=>{e&&e.trigger()};if(g(),"clear"===t)a.forEach(c);else{const s=(0,r.cy)(e),o=s&&(0,r.yI)(n);if(s&&"length"===n){const e=Number(i);a.forEach((t,n)=>{("length"===n||n===F||!(0,r.Bm)(n)&&n>=e)&&c(t)})}else switch((void 0!==n||a.has(void 0))&&c(a.get(n)),o&&c(a.get(F)),t){case"add":s?o&&c(a.get("length")):(c(a.get(M)),(0,r.CE)(e)&&c(a.get(U)));break;case"delete":s||(c(a.get(M)),(0,r.CE)(e)&&c(a.get(U)));break;case"set":(0,r.CE)(e)&&c(a.get(M));break}}y()}function $(e,t){const n=x.get(e);return n&&n.get(t)}function B(e){const t=Pe(e);return t===e?t:(V(t,"iterate",F),Re(e)?t:t.map(Le))}function H(e){return V(e=Pe(e),"iterate",F),e}const W={__proto__:null,[Symbol.iterator](){return G(this,Symbol.iterator,Le)},concat(...e){return B(this).concat(...e.map(e=>(0,r.cy)(e)?B(e):e))},entries(){return G(this,"entries",e=>(e[1]=Le(e[1]),e))},every(e,t){return q(this,"every",e,t,void 0,arguments)},filter(e,t){return q(this,"filter",e,t,e=>e.map(Le),arguments)},find(e,t){return q(this,"find",e,t,Le,arguments)},findIndex(e,t){return q(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return q(this,"findLast",e,t,Le,arguments)},findLastIndex(e,t){return q(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return q(this,"forEach",e,t,void 0,arguments)},includes(...e){return Y(this,"includes",e)},indexOf(...e){return Y(this,"indexOf",e)},join(e){return B(this).join(e)},lastIndexOf(...e){return Y(this,"lastIndexOf",e)},map(e,t){return q(this,"map",e,t,void 0,arguments)},pop(){return X(this,"pop")},push(...e){return X(this,"push",e)},reduce(e,...t){return z(this,"reduce",e,t)},reduceRight(e,...t){return z(this,"reduceRight",e,t)},shift(){return X(this,"shift")},some(e,t){return q(this,"some",e,t,void 0,arguments)},splice(...e){return X(this,"splice",e)},toReversed(){return B(this).toReversed()},toSorted(e){return B(this).toSorted(e)},toSpliced(...e){return B(this).toSpliced(...e)},unshift(...e){return X(this,"unshift",e)},values(){return G(this,"values",Le)}};function G(e,t,n){const r=H(e),i=r[t]();return r===e||Re(e)||(i._next=i.next,i.next=()=>{const e=i._next();return e.value&&(e.value=n(e.value)),e}),i}const K=Array.prototype;function q(e,t,n,r,i,s){const o=H(e),a=o!==e&&!Re(e),c=o[t];if(c!==K[t]){const t=c.apply(e,s);return a?Le(t):t}let u=n;o!==e&&(a?u=function(t,r){return n.call(this,Le(t),r,e)}:n.length>2&&(u=function(t,r){return n.call(this,t,r,e)}));const l=c.call(o,u,r);return a&&i?i(l):l}function z(e,t,n,r){const i=H(e);let s=n;return i!==e&&(Re(e)?n.length>3&&(s=function(t,r,i){return n.call(this,t,r,i,e)}):s=function(t,r,i){return n.call(this,t,Le(r),i,e)}),i[t](s,...r)}function Y(e,t,n){const r=Pe(e);V(r,"iterate",F);const i=r[t](...n);return-1!==i&&!1!==i||!Oe(n[0])?i:(n[0]=Pe(n[0]),r[t](...n))}function X(e,t,n=[]){k(),g();const r=Pe(e)[t].apply(e,n);return y(),N(),r}const Q=(0,r.pD)("__proto__,__v_isRef,__isVue"),J=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(r.Bm));function Z(e){(0,r.Bm)(e)||(e=String(e));const t=Pe(this);return V(t,"has",e),t.hasOwnProperty(e)}class ee{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if("__v_skip"===t)return e["__v_skip"];const i=this._isReadonly,s=this._isShallow;if("__v_isReactive"===t)return!i;if("__v_isReadonly"===t)return i;if("__v_isShallow"===t)return s;if("__v_raw"===t)return n===(i?s?Ee:_e:s?ve:ye).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=(0,r.cy)(e);if(!i){let e;if(o&&(e=W[t]))return e;if("hasOwnProperty"===t)return Z}const a=Reflect.get(e,t,Me(e)?e:n);return((0,r.Bm)(t)?J.has(t):Q(t))?a:(i||V(e,"get",t),s?a:Me(a)?o&&(0,r.yI)(t)?a:a.value:(0,r.Gv)(a)?i?Se(a):Te(a):a)}}class te extends ee{constructor(e=!1){super(!1,e)}set(e,t,n,i){let s=e[t];if(!this._isShallow){const t=Ne(s);if(Re(n)||Ne(n)||(s=Pe(s),n=Pe(n)),!(0,r.cy)(e)&&Me(s)&&!Me(n))return!t&&(s.value=n,!0)}const o=(0,r.cy)(e)&&(0,r.yI)(t)?Number(t)<e.length:(0,r.$3)(e,t),a=Reflect.set(e,t,n,Me(e)?e:i);return e===Pe(i)&&(o?(0,r.$H)(n,s)&&j(e,"set",t,n,s):j(e,"add",t,n)),a}deleteProperty(e,t){const n=(0,r.$3)(e,t),i=e[t],s=Reflect.deleteProperty(e,t);return s&&n&&j(e,"delete",t,void 0,i),s}has(e,t){const n=Reflect.has(e,t);return(0,r.Bm)(t)&&J.has(t)||V(e,"has",t),n}ownKeys(e){return V(e,"iterate",(0,r.cy)(e)?"length":M),Reflect.ownKeys(e)}}class ne extends ee{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const re=new te,ie=new ne,se=new te(!0),oe=new ne(!0),ae=e=>e,ce=e=>Reflect.getPrototypeOf(e);function ue(e,t,n){return function(...i){const s=this["__v_raw"],o=Pe(s),a=(0,r.CE)(o),c="entries"===e||e===Symbol.iterator&&a,u="keys"===e&&a,l=s[e](...i),h=n?ae:t?xe:Le;return!t&&V(o,"iterate",u?U:M),{next(){const{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function le(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function he(e,t){const n={get(n){const i=this["__v_raw"],s=Pe(i),o=Pe(n);e||((0,r.$H)(n,o)&&V(s,"get",n),V(s,"get",o));const{has:a}=ce(s),c=t?ae:e?xe:Le;return a.call(s,n)?c(i.get(n)):a.call(s,o)?c(i.get(o)):void(i!==s&&i.get(n))},get size(){const t=this["__v_raw"];return!e&&V(Pe(t),"iterate",M),Reflect.get(t,"size",t)},has(t){const n=this["__v_raw"],i=Pe(n),s=Pe(t);return e||((0,r.$H)(t,s)&&V(i,"has",t),V(i,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)},forEach(n,r){const i=this,s=i["__v_raw"],o=Pe(s),a=t?ae:e?xe:Le;return!e&&V(o,"iterate",M),s.forEach((e,t)=>n.call(r,a(e),a(t),i))}};(0,r.X$)(n,e?{add:le("add"),set:le("set"),delete:le("delete"),clear:le("clear")}:{add(e){t||Re(e)||Ne(e)||(e=Pe(e));const n=Pe(this),r=ce(n),i=r.has.call(n,e);return i||(n.add(e),j(n,"add",e,e)),this},set(e,n){t||Re(n)||Ne(n)||(n=Pe(n));const i=Pe(this),{has:s,get:o}=ce(i);let a=s.call(i,e);a||(e=Pe(e),a=s.call(i,e));const c=o.call(i,e);return i.set(e,n),a?(0,r.$H)(n,c)&&j(i,"set",e,n,c):j(i,"add",e,n),this},delete(e){const t=Pe(this),{has:n,get:r}=ce(t);let i=n.call(t,e);i||(e=Pe(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,o=t.delete(e);return i&&j(t,"delete",e,void 0,s),o},clear(){const e=Pe(this),t=0!==e.size,n=void 0,r=e.clear();return t&&j(e,"clear",void 0,void 0,n),r}});const i=["keys","values","entries",Symbol.iterator];return i.forEach(r=>{n[r]=ue(r,e,t)}),n}function fe(e,t){const n=he(e,t);return(t,i,s)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get((0,r.$3)(n,i)&&i in t?n:t,i,s)}const de={get:fe(!1,!1)},pe={get:fe(!1,!0)},me={get:fe(!0,!1)},ge={get:fe(!0,!0)};const ye=new WeakMap,ve=new WeakMap,_e=new WeakMap,Ee=new WeakMap;function we(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function be(e){return e["__v_skip"]||!Object.isExtensible(e)?0:we((0,r.Zf)(e))}function Te(e){return Ne(e)?e:Ae(e,!1,re,de,ye)}function Ie(e){return Ae(e,!1,se,pe,ve)}function Se(e){return Ae(e,!0,ie,me,_e)}function Ce(e){return Ae(e,!0,oe,ge,Ee)}function Ae(e,t,n,i,s){if(!(0,r.Gv)(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const o=be(e);if(0===o)return e;const a=s.get(e);if(a)return a;const c=new Proxy(e,2===o?i:n);return s.set(e,c),c}function ke(e){return Ne(e)?ke(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function Ne(e){return!(!e||!e["__v_isReadonly"])}function Re(e){return!(!e||!e["__v_isShallow"])}function Oe(e){return!!e&&!!e["__v_raw"]}function Pe(e){const t=e&&e["__v_raw"];return t?Pe(t):e}function De(e){return!(0,r.$3)(e,"__v_skip")&&Object.isExtensible(e)&&(0,r.yQ)(e,"__v_skip",!0),e}const Le=e=>(0,r.Gv)(e)?Te(e):e,xe=e=>(0,r.Gv)(e)?Se(e):e;function Me(e){return!!e&&!0===e["__v_isRef"]}function Ue(e){return Ve(e,!1)}function Fe(e){return Ve(e,!0)}function Ve(e,t){return Me(e)?e:new je(e,t)}class je{constructor(e,t){this.dep=new D,this["__v_isRef"]=!0,this["__v_isShallow"]=!1,this._rawValue=t?e:Pe(e),this._value=t?e:Le(e),this["__v_isShallow"]=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,n=this["__v_isShallow"]||Re(e)||Ne(e);e=n?e:Pe(e),(0,r.$H)(e,t)&&(this._rawValue=e,this._value=n?e:Le(e),this.dep.trigger())}}function $e(e){e.dep&&e.dep.trigger()}function Be(e){return Me(e)?e.value:e}function He(e){return(0,r.Tn)(e)?e():Be(e)}const We={get:(e,t,n)=>"__v_raw"===t?e:Be(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return Me(i)&&!Me(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Ge(e){return ke(e)?e:new Proxy(e,We)}class Ke{constructor(e){this["__v_isRef"]=!0,this._value=void 0;const t=this.dep=new D,{get:n,set:r}=e(t.track.bind(t),t.trigger.bind(t));this._get=n,this._set=r}get value(){return this._value=this._get()}set value(e){this._set(e)}}function qe(e){return new Ke(e)}function ze(e){const t=(0,r.cy)(e)?new Array(e.length):{};for(const n in e)t[n]=Je(e,n);return t}class Ye{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this["__v_isRef"]=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return $(Pe(this._object),this._key)}}class Xe{constructor(e){this._getter=e,this["__v_isRef"]=!0,this["__v_isReadonly"]=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Qe(e,t,n){return Me(e)?e:(0,r.Tn)(e)?new Xe(e):(0,r.Gv)(e)&&arguments.length>1?Je(e,t,n):Ue(e)}function Je(e,t,n){const r=e[t];return Me(r)?r:new Ye(e,t,n)}class Ze{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new D(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=O-1,this.next=void 0,this.effect=this,this["__v_isReadonly"]=!t,this.isSSR=n}notify(){if(this.flags|=16,!(8&this.flags||s===this))return m(this,!0),!0}get value(){const e=this.dep.track();return w(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function et(e,t,n=!1){let i,s;(0,r.Tn)(e)?i=e:(i=e.get,s=e.set);const o=new Ze(i,s,n);return o}const tt={GET:"get",HAS:"has",ITERATE:"iterate"},nt={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},rt={},it=new WeakMap;let st;function ot(){return st}function at(e,t=!1,n=st){if(n){let t=it.get(n);t||it.set(n,t=[]),t.push(e)}else 0}function ct(e,t,n=r.MZ){const{immediate:i,deep:s,once:o,scheduler:a,augmentJob:u,call:l}=n,f=e=>s?e:Re(e)||!1===s||0===s?ut(e,1):ut(e);let d,p,m,g,y=!1,v=!1;if(Me(e)?(p=()=>e.value,y=Re(e)):ke(e)?(p=()=>f(e),y=!0):(0,r.cy)(e)?(v=!0,y=e.some(e=>ke(e)||Re(e)),p=()=>e.map(e=>Me(e)?e.value:ke(e)?f(e):(0,r.Tn)(e)?l?l(e,2):e():void 0)):p=(0,r.Tn)(e)?t?l?()=>l(e,2):e:()=>{if(m){k();try{m()}finally{N()}}const t=st;st=d;try{return l?l(e,3,[g]):e(g)}finally{st=t}}:r.tE,t&&s){const e=p,t=!0===s?1/0:s;p=()=>ut(e(),t)}const _=c(),E=()=>{d.stop(),_&&_.active&&(0,r.TF)(_.effects,d)};if(o&&t){const e=t;t=(...t)=>{e(...t),E()}}let w=v?new Array(e.length).fill(rt):rt;const b=e=>{if(1&d.flags&&(d.dirty||e))if(t){const e=d.run();if(s||y||(v?e.some((e,t)=>(0,r.$H)(e,w[t])):(0,r.$H)(e,w))){m&&m();const n=st;st=d;try{const n=[e,w===rt?void 0:v&&w[0]===rt?[]:w,g];w=e,l?l(t,3,n):t(...n)}finally{st=n}}}else d.run()};return u&&u(b),d=new h(p),d.scheduler=a?()=>a(b,!1):b,g=e=>at(e,!1,d),m=d.onStop=()=>{const e=it.get(d);if(e){if(l)l(e,4);else for(const t of e)t();it.delete(d)}},t?i?b(!0):w=d.run():a?a(b.bind(null,!0),!0):d.run(),E.pause=d.pause.bind(d),E.resume=d.resume.bind(d),E.stop=E,E}function ut(e,t=1/0,n){if(t<=0||!(0,r.Gv)(e)||e["__v_skip"])return e;if(n=n||new Set,n.has(e))return e;if(n.add(e),t--,Me(e))ut(e.value,t,n);else if((0,r.cy)(e))for(let r=0;r<e.length;r++)ut(e[r],t,n);else if((0,r.vM)(e)||(0,r.CE)(e))e.forEach(e=>{ut(e,t,n)});else if((0,r.Qd)(e)){for(const r in e)ut(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&ut(e[r],t,n)}return e}},262:function(e,t,n){n.d(t,{MF:function(){return _e},j6:function(){return pe},xZ:function(){return me},om:function(){return de},Sx:function(){return we},Wp:function(){return Ee},KO:function(){return be}});n(4114),n(8111),n(2489),n(1701),n(3579);var r=n(798),i=n(6189),s=n(2455);n(4979);const o=(e,t)=>t.some(t=>e instanceof t);let a,c;function u(){return a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function l(){return c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const h=new WeakMap,f=new WeakMap,d=new WeakMap,p=new WeakMap,m=new WeakMap;function g(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(b(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),m.set(t,e),t}function y(e){if(f.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});f.set(e,t)}let v={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return f.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function _(e){v=e(v)}function E(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?l().includes(e)?function(...t){return e.apply(T(this),t),b(h.get(this))}:function(...t){return b(e.apply(T(this),t))}:function(t,...n){const r=e.call(T(this),t,...n);return d.set(r,t.sort?t.sort():[t]),b(r)}}function w(e){return"function"===typeof e?E(e):(e instanceof IDBTransaction&&y(e),o(e,u())?new Proxy(e,v):e)}function b(e){if(e instanceof IDBRequest)return g(e);if(p.has(e))return p.get(e);const t=w(e);return t!==e&&(p.set(e,t),m.set(t,e)),t}const T=e=>m.get(e);function I(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=b(o);return r&&o.addEventListener("upgradeneeded",e=>{r(b(o.result),e.oldVersion,e.newVersion,b(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}const S=["get","getKey","getAll","getAllKeys","count"],C=["put","add","delete","clear"],A=new Map;function k(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(A.get(t))return A.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=C.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!S.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return A.set(t,s),s}_(e=>({...e,get:(t,n,r)=>k(t,n)||e.get(t,n,r),has:(t,n)=>!!k(t,n)||e.has(t,n)}));
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
class N{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(R(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function R(e){const t=e.getComponent();return"VERSION"===t?.type}const O="@firebase/app",P="0.14.1",D=new i.Vy("@firebase/app"),L="@firebase/app-compat",x="@firebase/analytics-compat",M="@firebase/analytics",U="@firebase/app-check-compat",F="@firebase/app-check",V="@firebase/auth",j="@firebase/auth-compat",$="@firebase/database",B="@firebase/data-connect",H="@firebase/database-compat",W="@firebase/functions",G="@firebase/functions-compat",K="@firebase/installations",q="@firebase/installations-compat",z="@firebase/messaging",Y="@firebase/messaging-compat",X="@firebase/performance",Q="@firebase/performance-compat",J="@firebase/remote-config",Z="@firebase/remote-config-compat",ee="@firebase/storage",te="@firebase/storage-compat",ne="@firebase/firestore",re="@firebase/ai",ie="@firebase/firestore-compat",se="firebase",oe="12.1.0",ae="[DEFAULT]",ce={[O]:"fire-core",[L]:"fire-core-compat",[M]:"fire-analytics",[x]:"fire-analytics-compat",[F]:"fire-app-check",[U]:"fire-app-check-compat",[V]:"fire-auth",[j]:"fire-auth-compat",[$]:"fire-rtdb",[B]:"fire-data-connect",[H]:"fire-rtdb-compat",[W]:"fire-fn",[G]:"fire-fn-compat",[K]:"fire-iid",[q]:"fire-iid-compat",[z]:"fire-fcm",[Y]:"fire-fcm-compat",[X]:"fire-perf",[Q]:"fire-perf-compat",[J]:"fire-rc",[Z]:"fire-rc-compat",[ee]:"fire-gcs",[te]:"fire-gcs-compat",[ne]:"fire-fst",[ie]:"fire-fst-compat",[re]:"fire-vertex","fire-js":"fire-js",[se]:"fire-js-all"},ue=new Map,le=new Map,he=new Map;function fe(e,t){try{e.container.addComponent(t)}catch(n){D.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function de(e){const t=e.name;if(he.has(t))return D.debug(`There were multiple attempts to register component ${t}.`),!1;he.set(t,e);for(const n of ue.values())fe(n,e);for(const n of le.values())fe(n,e);return!0}function pe(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function me(e){return null!==e&&void 0!==e&&void 0!==e.settings}
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
const ge={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}'",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["server-app-deleted"]:"Firebase Server App has been deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",["finalization-registry-not-supported"]:"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",["invalid-server-app-environment"]:"FirebaseServerApp is not for use in browser environments."},ye=new s.FA("app","Firebase",ge);
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
const _e=oe;function Ee(e,t={}){let n=e;if("object"!==typeof t){const e=t;t={name:e}}const i={name:ae,automaticDataCollectionEnabled:!0,...t},o=i.name;if("string"!==typeof o||!o)throw ye.create("bad-app-name",{appName:String(o)});if(n||(n=(0,s.T9)()),!n)throw ye.create("no-options");const a=ue.get(o);if(a){if((0,s.bD)(n,a.options)&&(0,s.bD)(i,a.config))return a;throw ye.create("duplicate-app",{appName:o})}const c=new r.h1(o);for(const r of he.values())c.addComponent(r);const u=new ve(n,i,c);return ue.set(o,u),u}function we(e=ae){const t=ue.get(e);if(!t&&e===ae&&(0,s.T9)())return Ee();if(!t)throw ye.create("no-app",{appName:e});return t}function be(e,t,n){let i=ce[e]??e;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${i}" with version "${t}":`];return s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void D.warn(e.join(" "))}de(new r.uA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}
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
const Te="firebase-heartbeat-database",Ie=1,Se="firebase-heartbeat-store";let Ce=null;function Ae(){return Ce||(Ce=I(Te,Ie,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Se)}catch(n){console.warn(n)}}}}).catch(e=>{throw ye.create("idb-open",{originalErrorMessage:e.message})})),Ce}async function ke(e){try{const t=await Ae(),n=t.transaction(Se),r=await n.objectStore(Se).get(Re(e));return await n.done,r}catch(t){if(t instanceof s.g)D.warn(t.message);else{const e=ye.create("idb-get",{originalErrorMessage:t?.message});D.warn(e.message)}}}async function Ne(e,t){try{const n=await Ae(),r=n.transaction(Se,"readwrite"),i=r.objectStore(Se);await i.put(t,Re(e)),await r.done}catch(n){if(n instanceof s.g)D.warn(n.message);else{const e=ye.create("idb-set",{originalErrorMessage:n?.message});D.warn(e.message)}}}function Re(e){return`${e.name}!${e.options.appId}`}
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
 */const Oe=1024,Pe=30;class De{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Me(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=Le();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>Pe){const e=Fe(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){D.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Le(),{heartbeatsToSend:t,unsentEntries:n}=xe(this._heartbeatsCache.heartbeats),r=(0,s.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return D.warn(e),""}}}function Le(){const e=new Date;return e.toISOString().substring(0,10)}function xe(e,t=Oe){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Ue(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ue(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Me{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,s.zW)()&&(0,s.eX)().then(()=>!0).catch(()=>!1)}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await ke(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ue(e){return(0,s.Uj)(JSON.stringify({version:2,heartbeats:e})).length}function Fe(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
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
 */function Ve(e){de(new r.uA("platform-logger",e=>new N(e),"PRIVATE")),de(new r.uA("heartbeat",e=>new De(e),"PRIVATE")),be(O,P,e),be(O,P,"esm2020"),be("fire-js","")}Ve("")},283:function(e,t,n){var r=n(9504),i=n(9039),s=n(4901),o=n(9297),a=n(3724),c=n(350).CONFIGURABLE,u=n(3706),l=n(1181),h=l.enforce,f=l.get,d=String,p=Object.defineProperty,m=r("".slice),g=r("".replace),y=r([].join),v=a&&!i(function(){return 8!==p(function(){},"length",{value:8}).length}),_=String(String).split("String"),E=e.exports=function(e,t,n){"Symbol("===m(d(t),0,7)&&(t="["+g(d(t),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!o(e,"name")||c&&e.name!==t)&&(a?p(e,"name",{value:t,configurable:!0}):e.name=t),v&&n&&o(n,"arity")&&e.length!==n.arity&&p(e,"length",{value:n.arity});try{n&&o(n,"constructor")&&n.constructor?a&&p(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(i){}var r=h(e);return o(r,"source")||(r.source=y(_,"string"==typeof t?t:"")),e};Function.prototype.toString=E(function(){return s(this)&&f(this).source||u(this)},"toString")},350:function(e,t,n){var r=n(3724),i=n(9297),s=Function.prototype,o=r&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,u=a&&(!r||r&&o(s,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:u}},397:function(e,t,n){var r=n(7751);e.exports=r("document","documentElement")},421:function(e){e.exports={}},456:function(e,t,n){var r=n(6518),i=n(4576),s=n(9504),o=n(4154),a=n(5169),c=s(1.1.toString),u=i.Uint8Array,l=!u||!u.prototype.toHex||!function(){try{var e=new u([255,255,255,255,255,255,255,255]);return"ffffffffffffffff"===e.toHex()}catch(t){return!1}}();u&&r({target:"Uint8Array",proto:!0,forced:l},{toHex:function(){o(this),a(this.buffer);for(var e="",t=0,n=this.length;t<n;t++){var r=c(this[t],16);e+=1===r.length?"0"+r:r}return e}})},507:function(e,t,n){var r=n(9565);e.exports=function(e,t,n){var i,s,o=n?e:e.iterator,a=e.next;while(!(i=r(a,o)).done)if(s=t(i.value),void 0!==s)return s}},616:function(e,t,n){var r=n(9039);e.exports=!r(function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")})},655:function(e,t,n){var r=n(6955),i=String;e.exports=function(e){if("Symbol"===r(e))throw new TypeError("Cannot convert a Symbol value to a string");return i(e)}},679:function(e,t,n){var r=n(1625),i=TypeError;e.exports=function(e,t){if(r(t,e))return e;throw new i("Incorrect invocation")}},684:function(e){e.exports=function(e,t){var n="function"==typeof Iterator&&Iterator.prototype[e];if(n)try{n.call({next:null},t).next()}catch(r){return!0}}},741:function(e){var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},757:function(e,t,n){var r=n(7751),i=n(4901),s=n(1625),o=n(7040),a=Object;e.exports=o?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return i(t)&&s(t.prototype,a(e))}},798:function(e,t,n){n.d(t,{h1:function(){return u},uA:function(){return i}});n(8111),n(2489),n(1701),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(2455);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
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
 */class u{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},851:function(e,t,n){var r=n(6955),i=n(5966),s=n(4117),o=n(6269),a=n(8227),c=a("iterator");e.exports=function(e){if(!s(e))return i(e,c)||i(e,"@@iterator")||o[r(e)]}},944:function(e){var t=TypeError;e.exports=function(e){var n=e&&e.alphabet;if(void 0===n||"base64"===n||"base64url"===n)return n||"base64";throw new t("Incorrect `alphabet` option")}},1072:function(e,t,n){var r=n(1828),i=n(8727);e.exports=Object.keys||function(e){return r(e,i)}},1108:function(e,t,n){var r=n(6955);e.exports=function(e){var t=r(e);return"BigInt64Array"===t||"BigUint64Array"===t}},1148:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("every",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{every:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return!s(t,function(t,r){if(!e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},1181:function(e,t,n){var r,i,s,o=n(8622),a=n(4576),c=n(34),u=n(6699),l=n(9297),h=n(7629),f=n(6119),d=n(421),p="Object already initialized",m=a.TypeError,g=a.WeakMap,y=function(e){return s(e)?i(e):r(e,{})},v=function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw new m("Incompatible receiver, "+e+" required");return n}};if(o||h.state){var _=h.state||(h.state=new g);_.get=_.get,_.has=_.has,_.set=_.set,r=function(e,t){if(_.has(e))throw new m(p);return t.facade=e,_.set(e,t),t},i=function(e){return _.get(e)||{}},s=function(e){return _.has(e)}}else{var E=f("state");d[E]=!0,r=function(e,t){if(l(e,E))throw new m(p);return t.facade=e,u(e,E,t),t},i=function(e){return l(e,E)?e[E]:{}},s=function(e){return l(e,E)}}e.exports={set:r,get:i,has:s,enforce:y,getterFor:v}},1241:function(e,t){t.A=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},1291:function(e,t,n){var r=n(741);e.exports=function(e){var t=+e;return t!==t||0===t?0:r(t)}},1385:function(e,t,n){var r=n(9539);e.exports=function(e,t,n){for(var i=e.length-1;i>=0;i--)if(void 0!==e[i])try{n=r(e[i].iterator,t,n)}catch(s){t="throw",n=s}if("throw"===t)throw n;return n}},1549:function(e,t,n){n(6632)},1625:function(e,t,n){var r=n(9504);e.exports=r({}.isPrototypeOf)},1698:function(e,t,n){var r=n(6518),i=n(4204),s=n(9835),o=n(4916),a=!o("union")||!s("union");r({target:"Set",proto:!0,real:!0,forced:a},{union:i})},1701:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),u=n(6319),l=n(9539),h=n(684),f=n(4549),d=n(6395),p=!d&&!h("map",function(){}),m=!d&&!p&&f("map",TypeError),g=d||p||m,y=c(function(){var e=this.iterator,t=o(i(this.next,e)),n=this.done=!!t.done;if(!n)return u(e,this.mapper,[t.value,this.counter++],!0)});r({target:"Iterator",proto:!0,real:!0,forced:g},{map:function(e){o(this);try{s(e)}catch(t){l(this,"throw",t)}return m?i(m,this,e):new y(a(this),{mapper:e})}})},1767:function(e){e.exports=function(e){return{iterator:e,next:e.next,done:!1}}},1806:function(e,t,n){var r=n(6518),i=n(8551),s=n(2652),o=n(1767),a=[].push;r({target:"Iterator",proto:!0,real:!0},{toArray:function(){var e=[];return s(o(i(this)),a,{that:e,IS_RECORD:!0}),e}})},1828:function(e,t,n){var r=n(9504),i=n(9297),s=n(5397),o=n(9617).indexOf,a=n(421),c=r([].push);e.exports=function(e,t){var n,r=s(e),u=0,l=[];for(n in r)!i(a,n)&&i(r,n)&&c(l,n);while(t.length>u)i(r,n=t[u++])&&(~o(l,n)||c(l,n));return l}},2106:function(e,t,n){var r=n(283),i=n(4913);e.exports=function(e,t,n){return n.get&&r(n.get,t,{getter:!0}),n.set&&r(n.set,t,{setter:!0}),i.f(e,t,n)}},2140:function(e,t,n){var r=n(8227),i=r("toStringTag"),s={};s[i]="z",e.exports="[object z]"===String(s)},2195:function(e,t,n){var r=n(9504),i=r({}.toString),s=r("".slice);e.exports=function(e){return s(i(e),8,-1)}},2211:function(e,t,n){var r=n(9039);e.exports=!r(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},2303:function(e,t,n){var r=n(4576),i=n(9504),s=r.Uint8Array,o=r.SyntaxError,a=r.parseInt,c=Math.min,u=/[^\da-f]/i,l=i(u.exec),h=i("".slice);e.exports=function(e,t){var n=e.length;if(n%2!==0)throw new o("String should be an even number of characters");var r=t?c(t.length,n/2):n/2,i=t||new s(r),f=0,d=0;while(d<r){var p=h(e,f,f+=2);if(l(u,p))throw new o("String should only contain hex characters");i[d++]=a(p,16)}return{bytes:i,read:f}}},2360:function(e,t,n){var r,i=n(8551),s=n(6801),o=n(8727),a=n(421),c=n(397),u=n(4055),l=n(6119),h=">",f="<",d="prototype",p="script",m=l("IE_PROTO"),g=function(){},y=function(e){return f+p+h+e+f+"/"+p+h},v=function(e){e.write(y("")),e.close();var t=e.parentWindow.Object;return e=null,t},_=function(){var e,t=u("iframe"),n="java"+p+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(y("document.F=Object")),e.close(),e.F},E=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}E="undefined"!=typeof document?document.domain&&r?v(r):_():v(r);var e=o.length;while(e--)delete E[d][o[e]];return E()};a[m]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(g[d]=i(e),n=new g,g[d]=null,n[m]=e):n=E(),void 0===t?n:s.f(n,t)}},2455:function(e,t,n){n.d(t,{cY:function(){return E},FA:function(){return B},g:function(){return $},u:function(){return l},Uj:function(){return u},Fy:function(){return T},tD:function(){return Q},bD:function(){return K},hp:function(){return X},T9:function(){return v},Tj:function(){return g},yU:function(){return y},XA:function(){return _},mS:function(){return h},Ku:function(){return te},ZQ:function(){return N},sr:function(){return D},zJ:function(){return w},c1:function(){return P},Im:function(){return G},lT:function(){return x},zW:function(){return F},jZ:function(){return R},lV:function(){return L},nr:function(){return M},Ov:function(){return U},gE:function(){return b},Am:function(){return z},I9:function(){return Y},P1:function(){return k},eX:function(){return V}});n(4114),n(8111),n(7588),n(4979);const r=()=>{},i=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,u=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,f=63&c;a||(f=64,s||(h=64)),r.push(n[u],n[l],n[h],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length,o=s?n[e.charAt(i)]:0;++i;const c=i<e.length,u=c?n[e.charAt(i)]:64;++i;const l=i<e.length,h=l?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==u||null==h)throw new a;const f=t<<2|o>>4;if(r.push(f),64!==u){const e=o<<4&240|u>>2;if(r.push(e),64!==h){const e=u<<6&192|h;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){const t=i(e);return o.encodeByteArray(t,!0)},u=function(e){return c(e).replace(/\./g,"")},l=function(e){try{return o.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
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
 */const f=()=>h().__FIREBASE_DEFAULTS__,d=()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",VUE_APP_FIREBASE_API_KEY:"AIzaSyAcjyDX_tAYYxWxP8Y1N1CBh_XwVf4XtgM",VUE_APP_FIREBASE_AUTH_DOMAIN:"classroom-b81c6.firebaseapp.com",VUE_APP_FIREBASE_PROJECT_ID:"classroom-b81c6",VUE_APP_FIREBASE_STORAGE_BUCKET:"classroom-b81c6.firebasestorage.app",VUE_APP_FIREBASE_MESSAGING_SENDER_ID:"903823177785",VUE_APP_FIREBASE_APP_ID:"1:903823177785:web:68340bb3d3a6f6eb6775e8",BASE_URL:"/ClassRoom/"}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},p=()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&l(e[1]);return t&&JSON.parse(t)},m=()=>{try{return r()||f()||d()||p()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},g=e=>m()?.emulatorHosts?.[e],y=e=>{const t=g(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},v=()=>m()?.config,_=e=>m()?.[`_${e}`];
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
class E{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
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
 */function w(e){try{const t=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return t.endsWith(".cloudworkstations.dev")}catch{return!1}}async function b(e){const t=await fetch(e,{credentials:"include"});return t.ok}
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
 */function T(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e},a="";return[u(JSON.stringify(n)),u(JSON.stringify(o)),a].join(".")}const I={};function S(){const e={prod:[],emulator:[]};for(const t of Object.keys(I))I[t]?e.emulator.push(t):e.prod.push(t);return e}function C(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let A=!1;function k(e,t){if("undefined"===typeof window||"undefined"===typeof document||!w(window.location.host)||I[e]===t||I[e]||A)return;function n(e){return`__firebase__banner__${e}`}I[e]=t;const r="__firebase__banner",i=S(),s=i.prod.length>0;function o(){const e=document.getElementById(r);e&&e.remove()}function a(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}function c(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}function u(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{A=!0,o()},e}function l(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}function h(){const e=C(r),t=n("text"),i=document.getElementById(t)||document.createElement("span"),o=n("learnmore"),h=document.getElementById(o)||document.createElement("a"),f=n("preprendIcon"),d=document.getElementById(f)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;a(t),l(h,o);const n=u();c(d,f),t.append(d,i,h,n),document.body.appendChild(t)}s?(i.innerText="Preview backend disconnected.",d.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(d.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',i.innerText="Preview backend running in this workspace."),i.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",h):h()}
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
 */function N(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function R(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(N())}function O(){const e=m()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(t){return!1}}function P(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function D(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function L(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function x(){const e=N();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function M(){return!O()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function U(){return!O()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function F(){try{return"object"===typeof indexedDB}catch(e){return!1}}function V(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}
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
const j="FirebaseError";class $ extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=j,Object.setPrototypeOf(this,$.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,B.prototype.create)}}class B{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?H(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new $(r,o,n);return a}}function H(e,t){return e.replace(W,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}const W=/\{\$([^}]+)}/g;
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
 */function G(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function K(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(q(n)&&q(s)){if(!K(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function q(e){return null!==e&&"object"===typeof e}
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
function z(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Y(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function X(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
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
 */function Q(e,t){const n=new J(e,t);return n.subscribe.bind(n)}class J{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=Z(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=ee),void 0===r.error&&(r.error=ee),void 0===r.complete&&(r.complete=ee);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Z(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function ee(){}
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
function te(e){return e&&e._delegate?e._delegate:e}},2475:function(e,t,n){var r=n(6518),i=n(8527),s=n(4916),o=!s("isSupersetOf",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isSupersetOf:i})},2489:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),u=n(6319),l=n(6395),h=n(9539),f=n(684),d=n(4549),p=!l&&!f("filter",function(){}),m=!l&&!p&&d("filter",TypeError),g=l||p||m,y=c(function(){var e,t,n,r=this.iterator,s=this.predicate,a=this.next;while(1){if(e=o(i(a,r)),t=this.done=!!e.done,t)return;if(n=e.value,u(r,s,[n,this.counter++],!0))return n}});r({target:"Iterator",proto:!0,real:!0,forced:g},{filter:function(e){o(this);try{s(e)}catch(t){h(this,"throw",t)}return m?i(m,this,e):new y(a(this),{predicate:e})}})},2529:function(e){e.exports=function(e,t){return{value:e,done:t}}},2603:function(e,t,n){var r=n(655);e.exports=function(e,t){return void 0===e?arguments.length<2?"":t:r(e)}},2652:function(e,t,n){var r=n(6080),i=n(9565),s=n(8551),o=n(6823),a=n(4209),c=n(6198),u=n(1625),l=n(81),h=n(851),f=n(9539),d=TypeError,p=function(e,t){this.stopped=e,this.result=t},m=p.prototype;e.exports=function(e,t,n){var g,y,v,_,E,w,b,T=n&&n.that,I=!(!n||!n.AS_ENTRIES),S=!(!n||!n.IS_RECORD),C=!(!n||!n.IS_ITERATOR),A=!(!n||!n.INTERRUPTED),k=r(t,T),N=function(e){return g&&f(g,"normal"),new p(!0,e)},R=function(e){return I?(s(e),A?k(e[0],e[1],N):k(e[0],e[1])):A?k(e,N):k(e)};if(S)g=e.iterator;else if(C)g=e;else{if(y=h(e),!y)throw new d(o(e)+" is not iterable");if(a(y)){for(v=0,_=c(e);_>v;v++)if(E=R(e[v]),E&&u(m,E))return E;return new p(!1)}g=l(e,y)}w=S?e.next:g.next;while(!(b=i(w,g)).done){try{E=R(b.value)}catch(O){f(g,"throw",O)}if("object"==typeof E&&E&&u(m,E))return E}return new p(!1)}},2777:function(e,t,n){var r=n(9565),i=n(34),s=n(757),o=n(5966),a=n(4270),c=n(8227),u=TypeError,l=c("toPrimitive");e.exports=function(e,t){if(!i(e)||s(e))return e;var n,c=o(e,l);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!i(n)||s(n))return n;throw new u("Can't convert object to primitive value")}return void 0===t&&(t="number"),a(e,t)}},2787:function(e,t,n){var r=n(9297),i=n(4901),s=n(8981),o=n(6119),a=n(2211),c=o("IE_PROTO"),u=Object,l=u.prototype;e.exports=a?u.getPrototypeOf:function(e){var t=s(e);if(r(t,c))return t[c];var n=t.constructor;return i(n)&&t instanceof n?n.prototype:t instanceof u?l:null}},2796:function(e,t,n){var r=n(9039),i=n(4901),s=/#|\.prototype\./,o=function(e,t){var n=c[a(e)];return n===l||n!==u&&(i(t)?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(s,".").toLowerCase()},c=o.data={},u=o.NATIVE="N",l=o.POLYFILL="P";e.exports=o},2804:function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t+"+/",r=t+"-_",i=function(e){for(var t={},n=0;n<64;n++)t[e.charAt(n)]=n;return t};e.exports={i2c:n,c2i:i(n),i2cUrl:r,c2iUrl:i(r)}},2832:function(e,t,n){n.d(t,{rJ:function(){return lc},Cs:function(){return hc},H9:function(){return fc},x7:function(){return vu},GG:function(){return Eu},aU:function(){return vc},AB:function(){return au},aQ:function(){return Tu},My:function(){return su},P:function(){return eu},O5:function(){return ku},BN:function(){return wu},mZ:function(){return bu},_M:function(){return nu},wP:function(){return Nu}});n(4114),n(8111),n(1148),n(2489),n(116),n(7588),n(1701),n(8237),n(3579),n(1806),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(9577),n(1549),n(9797),n(9631),n(5623),n(4979);var r,i,s=n(262),o=n(798),a=n(6189),c=n(2455),u="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},l={};(function(){var e;
/** @license
         Copyright The Closure Library Authors.
         SPDX-License-Identifier: Apache-2.0
         */function t(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function o(e,t,n){n||(n=0);var r=Array(16);if("string"===typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^n&(i^s))+r[0]+3614090360&4294967295;t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[1]+3905402710&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[2]+606105819&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[3]+3250441966&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[4]+4118548399&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[5]+1200080426&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[6]+2821735955&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[7]+4249261313&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[8]+1770035416&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[9]+2336552879&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[10]+4294925233&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[11]+2304563134&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(s^n&(i^s))+r[12]+1804603682&4294967295,t=n+(o<<7&4294967295|o>>>25),o=s+(i^t&(n^i))+r[13]+4254626195&4294967295,s=t+(o<<12&4294967295|o>>>20),o=i+(n^s&(t^n))+r[14]+2792965006&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(t^i&(s^t))+r[15]+1236535329&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(i^s&(n^i))+r[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[6]+3225465664&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[0]+3921069994&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[10]+38016083&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[4]+3889429448&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[14]+3275163606&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[8]+1163531501&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[2]+4243563512&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[12]+2368359562&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(n^i^s)+r[5]+4294588738&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[8]+2272392833&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[11]+1839030562&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[14]+4259657740&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[1]+2763975236&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[4]+1272893353&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[7]+4139469664&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[10]+3200236656&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[13]+681279174&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[0]+3936430074&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[3]+3572445317&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[6]+76029189&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^s)+r[9]+3654602809&4294967295,t=n+(o<<4&4294967295|o>>>28),o=s+(t^n^i)+r[12]+3873151461&4294967295,s=t+(o<<11&4294967295|o>>>21),o=i+(s^t^n)+r[15]+530742520&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^t)+r[2]+3299628645&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(i^(n|~s))+r[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[7]+1126891415&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[5]+4237533241&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[3]+2399980690&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[1]+2240044497&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[15]+4264355552&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[13]+1309151649&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[11]+3174756917&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function a(e,t){var n=u;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}function c(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}t(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},s.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=this.B,i=this.h,s=0;s<t;){if(0==i)for(;s<=n;)o(this,e,s),s+=this.blockSize;if("string"===typeof e){for(;s<t;)if(r[i++]=e.charCodeAt(s++),i==this.blockSize){o(this,r),i=0;break}}else for(;s<t;)if(r[i++]=e[s++],i==this.blockSize){o(this,r),i=0;break}}this.h=i,this.o+=t},s.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var u={};function h(e){return-128<=e&&128>e?a(e,function(e){return new c([0|e],0>e?-1:0)}):new c([0|e],0>e?-1:0)}function f(e){if(isNaN(e)||!isFinite(e))return p;if(0>e)return _(f(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new c(t,0)}function d(e,t){if(0==e.length)throw Error("number format error: empty string");if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if("-"==e.charAt(0))return _(d(e.substring(1),t));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=f(Math.pow(t,8)),r=p,i=0;i<e.length;i+=8){var s=Math.min(8,e.length-i),o=parseInt(e.substring(i,i+s),t);8>s?(s=f(Math.pow(t,s)),r=r.j(s).add(f(o))):(r=r.j(n),r=r.add(f(o)))}return r}var p=h(0),m=h(1),g=h(16777216);function y(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function v(e){return-1==e.h}function _(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new c(n,~e.h).add(m)}function E(e,t){return e.add(_(t))}function w(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function b(e,t){this.g=e,this.h=t}function T(e,t){if(y(t))throw Error("division by zero");if(y(e))return new b(p,p);if(v(e))return t=T(_(e),t),new b(_(t.g),_(t.h));if(v(t))return t=T(e,_(t)),new b(_(t.g),t.h);if(30<e.g.length){if(v(e)||v(t))throw Error("slowDivide_ only works with positive integers.");for(var n=m,r=t;0>=r.l(e);)n=I(n),r=I(r);var i=S(n,1),s=S(r,1);for(r=S(r,2),n=S(n,2);!y(r);){var o=s.add(r);0>=o.l(e)&&(i=i.add(n),s=o),r=S(r,1),n=S(n,1)}return t=E(e,i.j(t)),new b(i,t)}for(i=p;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),s=f(n),o=s.j(t);v(o)||0<o.l(e);)n-=r,s=f(n),o=s.j(t);y(s)&&(s=m),i=i.add(s),e=E(e,o)}return new b(i,e)}function I(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new c(n,e.h)}function S(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,i=[],s=0;s<r;s++)i[s]=0<t?e.i(s+n)>>>t|e.i(s+n+1)<<32-t:e.i(s+n);return new c(i,e.h)}e=c.prototype,e.m=function(){if(v(this))return-_(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.i(n);e+=(0<=r?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(y(this))return"0";if(v(this))return"-"+_(this).toString(e);for(var t=f(Math.pow(e,6)),n=this,r="";;){var i=T(n,t).g;n=E(n,i.j(t));var s=((0<n.g.length?n.g[0]:n.h)>>>0).toString(e);if(n=i,y(n))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return e=E(this,e),v(e)?-1:y(e)?0:1},e.abs=function(){return v(this)?_(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,i=0;i<=t;i++){var s=r+(65535&this.i(i))+(65535&e.i(i)),o=(s>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);r=o>>>16,s&=65535,o&=65535,n[i]=o<<16|s}return new c(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(y(this)||y(e))return p;if(v(this))return v(e)?_(this).j(_(e)):_(_(this).j(e));if(v(e))return _(this.j(_(e)));if(0>this.l(g)&&0>e.l(g))return f(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<e.g.length;i++){var s=this.i(r)>>>16,o=65535&this.i(r),a=e.i(i)>>>16,u=65535&e.i(i);n[2*r+2*i]+=o*u,w(n,2*r+2*i),n[2*r+2*i+1]+=s*u,w(n,2*r+2*i+1),n[2*r+2*i+1]+=o*a,w(n,2*r+2*i+1),n[2*r+2*i+2]+=s*a,w(n,2*r+2*i+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new c(n,0)},e.A=function(e){return T(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new c(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new c(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new c(n,this.h^e.h)},s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,i=l.Md5=s,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=d,r=l.Integer=c}).apply("undefined"!==typeof u?u:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});var h,f,d,p,m,g,y,v,_="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},E={};(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e};function n(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof _&&_];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}var r=n(this);function i(e,n){if(n)e:{var i=r;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}e=e[e.length-1],s=i[e],n=n(s),n!=s&&null!=n&&t(i,e,{configurable:!0,writable:!0,value:n})}}function s(e,t){e instanceof String&&(e+="");var n=0,r=!1,i={next:function(){if(!r&&n<e.length){var i=n++;return{value:t(i,e[i]),done:!1}}return r=!0,{done:!0,value:void 0}}};return i[Symbol.iterator]=function(){return i},i}i("Array.prototype.values",function(e){return e||function(){return s(this,function(e,t){return t})}});
/** @license
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */
var o=o||{},a=this||self;function c(e){var t=typeof e;return t="object"!=t?t:e?Array.isArray(e)?"array":t:"null","array"==t||"object"==t&&"number"==typeof e.length}function u(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function l(e,t,n){return e.call.apply(e.bind,arguments)}function w(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function b(e,t,n){return b=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?l:w,b.apply(null,arguments)}function T(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function I(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function S(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function C(e,t){for(let n=1;n<arguments.length;n++){const t=arguments[n];if(c(t)){const n=e.length||0,r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}class A{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function k(e){return/^[\s\xa0]*$/.test(e)}function N(){var e=a.navigator;return e&&(e=e.userAgent)?e:""}function R(e){return R[" "](e),e}R[" "]=function(){};var O=-1!=N().indexOf("Gecko")&&!(-1!=N().toLowerCase().indexOf("webkit")&&-1==N().indexOf("Edge"))&&!(-1!=N().indexOf("Trident")||-1!=N().indexOf("MSIE"))&&-1==N().indexOf("Edge");function P(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function D(e,t){for(const n in e)t.call(void 0,e[n],n,e)}function L(e){const t={};for(const n in e)t[n]=e[n];return t}const x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function M(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<x.length;t++)n=x[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function U(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function F(e){a.setTimeout(()=>{throw e},0)}function V(){var e=G;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class j{constructor(){this.h=this.g=null}add(e,t){const n=$.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var $=new A(()=>new B,e=>e.reset());class B{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let H,W=!1,G=new j,K=()=>{const e=a.Promise.resolve(void 0);H=()=>{e.then(q)}};var q=()=>{for(var e;e=V();){try{e.h.call(e.g)}catch(n){F(n)}var t=$;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}W=!1};function z(){this.s=this.s,this.C=this.C}function Y(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}z.prototype.s=!1,z.prototype.ma=function(){this.s||(this.s=!0,this.N())},z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},Y.prototype.h=function(){this.defaultPrevented=!0};var X=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};a.addEventListener("test",e,t),a.removeEventListener("test",e,t)}catch(n){}return e}();function Q(e,t){if(Y.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(O){e:{try{R(t.nodeName);var i=!0;break e}catch(s){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"===typeof e.pointerType?e.pointerType:J[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Q.aa.h.call(this)}}I(Q,Y);var J={2:"touch",3:"pen",4:"mouse"};Q.prototype.h=function(){Q.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Z="closure_listenable_"+(1e6*Math.random()|0),ee=0;function te(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++ee,this.da=this.fa=!1}function ne(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function re(e){this.src=e,this.g={},this.h=0}function ie(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(ne(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function se(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}re.prototype.add=function(e,t,n,r,i){var s=e.toString();e=this.g[s],e||(e=this.g[s]=[],this.h++);var o=se(e,t,r,i);return-1<o?(t=e[o],n||(t.fa=!1)):(t=new te(t,this.src,s,!!r,i),t.fa=n,e.push(t)),t};var oe="closure_lm_"+(1e6*Math.random()|0),ae={};function ce(e,t,n,r,i){if(r&&r.once)return he(e,t,n,r,i);if(Array.isArray(t)){for(var s=0;s<t.length;s++)ce(e,t[s],n,r,i);return null}return n=ve(n),e&&e[Z]?e.K(t,n,u(r)?!!r.capture:!!r,i):ue(e,t,n,!1,r,i)}function ue(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=u(i)?!!i.capture:!!i,a=ge(e);if(a||(e[oe]=a=new re(e)),n=a.add(t,n,r,o,s),n.proxy)return n;if(r=le(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)X||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(pe(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function le(){function e(n){return t.call(e.src,e.listener,n)}const t=me;return e}function he(e,t,n,r,i){if(Array.isArray(t)){for(var s=0;s<t.length;s++)he(e,t[s],n,r,i);return null}return n=ve(n),e&&e[Z]?e.L(t,n,u(r)?!!r.capture:!!r,i):ue(e,t,n,!0,r,i)}function fe(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)fe(e,t[s],n,r,i);else r=u(r)?!!r.capture:!!r,n=ve(n),e&&e[Z]?(e=e.i,t=String(t).toString(),t in e.g&&(s=e.g[t],n=se(s,n,r,i),-1<n&&(ne(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete e.g[t],e.h--)))):e&&(e=ge(e))&&(t=e.g[t.toString()],e=-1,t&&(e=se(t,n,r,i)),(n=-1<e?t[e]:null)&&de(n))}function de(e){if("number"!==typeof e&&e&&!e.da){var t=e.src;if(t&&t[Z])ie(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(pe(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=ge(t))?(ie(n,e),0==n.h&&(n.src=null,t[oe]=null)):ne(e)}}}function pe(e){return e in ae?ae[e]:ae[e]="on"+e}function me(e,t){if(e.da)e=!0;else{t=new Q(t,this);var n=e.listener,r=e.ha||e.src;e.fa&&de(e),e=n.call(r,t)}return e}function ge(e){return e=e[oe],e instanceof re?e:null}var ye="__closure_events_fn_"+(1e9*Math.random()>>>0);function ve(e){return"function"===typeof e?e:(e[ye]||(e[ye]=function(t){return e.handleEvent(t)}),e[ye])}function _e(){z.call(this),this.i=new re(this),this.M=this,this.F=null}function Ee(e,t){var n,r=e.F;if(r)for(n=[];r;r=r.F)n.push(r);if(e=e.M,r=t.type||t,"string"===typeof t)t=new Y(t,e);else if(t instanceof Y)t.target=t.target||e;else{var i=t;t=new Y(r,e),M(t,i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=we(o,r,!0,t)&&i}if(o=t.g=e,i=we(o,r,!0,t)&&i,i=we(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)o=t.g=n[s],i=we(o,r,!1,t)&&i}function we(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&ie(e.i,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}function be(e,t,n){if("function"===typeof e)n&&(e=b(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=b(e.handleEvent,e)}return 2147483647<Number(t)?-1:a.setTimeout(e,t||0)}function Te(e){e.g=be(()=>{e.g=null,e.i&&(e.i=!1,Te(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}I(_e,z),_e.prototype[Z]=!0,_e.prototype.removeEventListener=function(e,t,n,r){fe(this,e,t,n,r)},_e.prototype.N=function(){if(_e.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)ne(n[r]);delete t.g[e],t.h--}}this.F=null},_e.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},_e.prototype.L=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Ie extends z{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Te(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Se(e){z.call(this),this.h=e,this.g={}}I(Se,z);var Ce=[];function Ae(e){P(e.g,function(e,t){this.g.hasOwnProperty(t)&&de(e)},e),e.g={}}Se.prototype.N=function(){Se.aa.N.call(this),Ae(this)},Se.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ke=a.JSON.stringify,Ne=a.JSON.parse,Re=class{stringify(e){return a.JSON.stringify(e,void 0)}parse(e){return a.JSON.parse(e,void 0)}};function Oe(){}function Pe(e){return e.h||(e.h=e.i())}function De(){}Oe.prototype.h=null;var Le={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function xe(){Y.call(this,"d")}function Me(){Y.call(this,"c")}I(xe,Y),I(Me,Y);var Ue={},Fe=null;function Ve(){return Fe=Fe||new _e}function je(e){Y.call(this,Ue.La,e)}function $e(e){const t=Ve();Ee(t,new je(t))}function Be(e,t){Y.call(this,Ue.STAT_EVENT,e),this.stat=t}function He(e){const t=Ve();Ee(t,new Be(t,e))}function We(e,t){Y.call(this,Ue.Ma,e),this.size=t}function Ge(e,t){if("function"!==typeof e)throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){e()},t)}function Ke(){this.g=!0}function qe(e,t,n,r,i,s){e.info(function(){if(e.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+u+"&":o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}function ze(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}function Ye(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+Qe(e,n)+(r?" "+r:"")})}function Xe(e,t){e.info(function(){return"TIMEOUT: "+t})}function Qe(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return ke(n)}catch(a){return t}}Ue.La="serverreachability",I(je,Y),Ue.STAT_EVENT="statevent",I(Be,Y),Ue.Ma="timingevent",I(We,Y),Ke.prototype.xa=function(){this.g=!1},Ke.prototype.info=function(){};var Je,Ze={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},et={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function tt(){}function nt(e,t,n,r){this.j=e,this.i=t,this.l=n,this.R=r||1,this.U=new Se(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new rt}function rt(){this.i=null,this.g="",this.h=!1}I(tt,Oe),tt.prototype.g=function(){return new XMLHttpRequest},tt.prototype.i=function(){return{}},Je=new tt;var it={},st={};function ot(e,t,n){e.L=1,e.v=xt(Rt(t)),e.m=n,e.P=!0,at(e,null)}function at(e,t){e.F=Date.now(),lt(e),e.A=Rt(e.v);var n=e.A,r=e.R;Array.isArray(r)||(r=[String(r)]),zt(n.i,"t",r),e.C=0,n=e.j.J,e.h=new rt,e.g=$n(e.j,n?t:null,!e.m),0<e.O&&(e.M=new Ie(b(e.Y,e,e.g),e.O)),t=e.U,n=e.g,r=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(Ce[0]=i.toString()),i=Ce);for(var s=0;s<i.length;s++){var o=ce(n,i[s],r||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?L(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),$e(),qe(e.i,e.u,e.A,e.l,e.R,e.m)}function ct(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.j.Ca)}function ut(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?st:(n=Number(t.substring(n,r)),isNaN(n)?it:(r+=1,r+n>t.length?st:(t=t.slice(r,r+n),e.C=r+n,t)))}function lt(e){e.S=Date.now()+e.I,ht(e,e.I)}function ht(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Ge(b(e.ba,e),t)}function ft(e){e.B&&(a.clearTimeout(e.B),e.B=null)}function dt(e){0==e.j.G||e.J||Mn(e.j,e)}function pt(e){ft(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,Ae(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function mt(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||Et(n.h,e)))if(!e.K&&Et(n.h,e)&&3==n.G){try{var r=n.Da.g.parse(t)}catch(u){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;xn(n),In(n)}Pn(n),He(18)}}else n.za=i[1],0<n.za-n.T&&37500>i[2]&&n.F&&0==n.v&&!n.C&&(n.C=Ge(b(n.Za,n),6e3));if(1>=_t(n.h)&&n.ca){try{n.ca()}catch(u){}n.ca=void 0}}else Fn(n,11)}else if((e.K||n.g==e)&&xn(n),!k(t))for(i=n.Da.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.K=u[1],n.ia=u[2];const t=u[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const i=u[4];null!=i&&(n.Aa=i,n.j.info("SVER="+n.Aa));const l=u[5];null!=l&&"number"===typeof l&&0<l&&(r=1.5*l,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(wt(s,s.h),s.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.ya=e,Lt(r.I,r.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms")),r=n;var o=e;if(r.qa=jn(r,r.J?r.ia:null,r.W),o.K){bt(r.h,o);var a=o,c=r.L;c&&(a.I=c),a.B&&(ft(a),lt(a)),r.g=o}else On(r);0<n.i.length&&Cn(n)}else"stop"!=u[0]&&"close"!=u[0]||Fn(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?Fn(n,7):Tn(n):"noop"!=u[0]&&n.l&&n.l.ta(u),n.v=0)}$e(4)}catch(u){}}nt.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==vn(e)?t.j():this.Y(e)},nt.prototype.Y=function(e){try{if(e==this.g)e:{const f=vn(this.g);var t=this.g.Ba();const d=this.g.Z();if(!(3>f)&&(3!=f||this.g&&(this.h.h||this.g.oa()||_n(this.g)))){this.J||4!=f||7==t||$e(8==t||0>=d?3:2),ft(this);var n=this.g.Z();this.X=n;t:if(ct(this)){var r=_n(this.g);e="";var i=r.length,s=4==vn(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){pt(this),dt(this);var o="";break t}this.h.i=new a.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:!(s&&t==i-1)});r.length=0,this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.oa();if(this.o=200==n,ze(this.i,this.u,this.A,this.l,this.R,f,n),this.o){if(this.T&&!this.K){t:{if(this.g){var c,u=this.g;if((c=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(c)){var l=c;break t}}l=null}if(!(n=l)){this.o=!1,this.s=3,He(12),pt(this),dt(this);break e}Ye(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,mt(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<o.length;){if(e=ut(this,o),e==st){4==f&&(this.s=4,He(14),n=!1),Ye(this.i,this.l,null,"[Incomplete Response]");break}if(e==it){this.s=4,He(15),Ye(this.i,this.l,o,"[Invalid Chunk]"),n=!1;break}Ye(this.i,this.l,e,null),mt(this,e)}if(ct(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=f||0!=o.length||this.h.h||(this.s=1,He(16),n=!1),this.o=this.o&&n,n){if(0<o.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+o.length),Dn(h),h.M=!0,He(11))}}else Ye(this.i,this.l,o,"[Invalid Chunked Response]"),pt(this),dt(this)}else Ye(this.i,this.l,o,null),mt(this,o);4==f&&pt(this),this.o&&!this.J&&(4==f?Mn(this.j,this):(this.o=!1,lt(this)))}else En(this.g),400==n&&0<o.indexOf("Unknown SID")?(this.s=3,He(12)):(this.s=0,He(13)),pt(this),dt(this)}}}catch(f){}},nt.prototype.cancel=function(){this.J=!0,pt(this)},nt.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(Xe(this.i,this.A),2!=this.L&&($e(),He(17)),pt(this),this.s=2,dt(this)):ht(this,this.S-e)};var gt=class{constructor(e,t){this.g=e,this.map=t}};function yt(e){this.l=e||10,a.PerformanceNavigationTiming?(e=a.performance.getEntriesByType("navigation"),e=0<e.length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol)):e=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function vt(e){return!!e.h||!!e.g&&e.g.size>=e.j}function _t(e){return e.h?1:e.g?e.g.size:0}function Et(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function wt(e,t){e.g?e.g.add(t):e.h=t}function bt(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Tt(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return S(e.i)}function It(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!==typeof Map&&e instanceof Map||"undefined"!==typeof Set&&e instanceof Set)return Array.from(e.values());if("string"===typeof e)return e.split("");if(c(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}function St(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!==typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!==typeof Set&&e instanceof Set)){if(c(e)||"string"===typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}function Ct(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(c(e)||"string"===typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=St(e),r=It(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}yt.prototype.cancel=function(){if(this.i=Tt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var At=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kt(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function Nt(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof Nt){this.h=e.h,Ot(this,e.j),this.o=e.o,this.g=e.g,Pt(this,e.s),this.l=e.l;var t=e.i,n=new Wt;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),Dt(this,n),this.m=e.m}else e&&(t=String(e).match(At))?(this.h=!1,Ot(this,t[1]||"",!0),this.o=Mt(t[2]||""),this.g=Mt(t[3]||"",!0),Pt(this,t[4]),this.l=Mt(t[5]||"",!0),Dt(this,t[6]||"",!0),this.m=Mt(t[7]||"")):(this.h=!1,this.i=new Wt(null,this.h))}function Rt(e){return new Nt(e)}function Ot(e,t,n){e.j=n?Mt(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Pt(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function Dt(e,t,n){t instanceof Wt?(e.i=t,Xt(e.i,e.h)):(n||(t=Ut(t,Bt)),e.i=new Wt(t,e.h))}function Lt(e,t,n){e.i.set(t,n)}function xt(e){return Lt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Mt(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Ut(e,t,n){return"string"===typeof e?(e=encodeURI(e).replace(t,Ft),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Ft(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(15&e).toString(16)}Nt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(Ut(t,Vt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(Ut(t,Vt,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.s,null!=n&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(Ut(n,"/"==n.charAt(0)?$t:jt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",Ut(n,Ht)),e.join("")};var Vt=/[#\/\?@]/g,jt=/[#\?:]/g,$t=/[#\?]/g,Bt=/[#\?@]/g,Ht=/#/g;function Wt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Gt(e){e.g||(e.g=new Map,e.h=0,e.i&&kt(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function Kt(e,t){Gt(e),t=Yt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function qt(e,t){return Gt(e),t=Yt(e,t),e.g.has(t)}function zt(e,t,n){Kt(e,t),0<n.length&&(e.i=null,e.g.set(Yt(e,t),S(n)),e.h+=n.length)}function Yt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Xt(e,t){t&&!e.j&&(Gt(e),e.i=null,e.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(Kt(this,t),zt(this,n,e))},e)),e.j=t}function Qt(e,t){const n=new Ke;if(a.Image){const r=new Image;r.onload=T(Zt,n,"TestLoadImage: loaded",!0,t,r),r.onerror=T(Zt,n,"TestLoadImage: error",!1,t,r),r.onabort=T(Zt,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=T(Zt,n,"TestLoadImage: timeout",!1,t,r),a.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}function Jt(e,t){const n=new Ke,r=new AbortController,i=setTimeout(()=>{r.abort(),Zt(n,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:r.signal}).then(e=>{clearTimeout(i),e.ok?Zt(n,"TestPingServer: ok",!0,t):Zt(n,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),Zt(n,"TestPingServer: error",!1,t)})}function Zt(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function en(){this.g=new Re}function tn(e,t,n){const r=n||"";try{Ct(e,function(e,n){let i=e;u(e)&&(i=ke(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function nn(e){this.l=e.Ub||null,this.j=e.eb||!1}function rn(e,t){_e.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function sn(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function on(e){e.readyState=4,e.l=null,e.j=null,e.v=null,an(e)}function an(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function cn(e){let t="";return P(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function un(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=cn(n),"string"===typeof e?null!=n&&encodeURIComponent(String(n)):Lt(e,t,n))}function ln(e){_e.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}e=Wt.prototype,e.add=function(e,t){Gt(this),this.i=null,e=Yt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){Gt(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.na=function(){Gt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},e.V=function(e){Gt(this);let t=[];if("string"===typeof e)qt(this,e)&&(t=t.concat(this.g.get(Yt(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return Gt(this),this.i=null,e=Yt(this,e),qt(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e?(e=this.V(e),0<e.length?String(e[0]):t):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const s=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")},I(nn,Oe),nn.prototype.g=function(){return new rn(this.l,this.j)},nn.prototype.i=function(e){return function(){return e}}({}),I(rn,_e),e=rn.prototype,e.open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,an(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||a).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,on(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,an(this)),this.g&&(this.readyState=3,an(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if("undefined"!==typeof a.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;sn(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?on(this):an(this),3==this.readyState&&sn(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,on(this))},e.Qa=function(e){this.g&&(this.response=e,on(this))},e.ga=function(){this.g&&on(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(rn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),I(ln,_e);var hn=/^https?$/i,fn=["POST","PUT"];function dn(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,pn(e),gn(e)}function pn(e){e.A||(e.A=!0,Ee(e,"complete"),Ee(e,"error"))}function mn(e){if(e.h&&"undefined"!=typeof o&&(!e.v[1]||4!=vn(e)||2!=e.Z()))if(e.u&&4==vn(e))be(e.Ea,0,e);else if(Ee(e,"readystatechange"),4==vn(e)){e.h=!1;try{const o=e.Z();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===o){var i=String(e.D).match(At)[1]||null;!i&&a.self&&a.self.location&&(i=a.self.location.protocol.slice(0,-1)),r=!hn.test(i?i.toLowerCase():"")}n=r}if(n)Ee(e,"complete"),Ee(e,"success");else{e.m=6;try{var s=2<vn(e)?e.g.statusText:""}catch(c){s=""}e.l=s+" ["+e.Z()+"]",pn(e)}}finally{gn(e)}}}function gn(e,t){if(e.g){yn(e);const r=e.g,i=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||Ee(e,"ready");try{r.onreadystatechange=i}catch(n){}}}function yn(e){e.I&&(a.clearTimeout(e.I),e.I=null)}function vn(e){return e.g?e.g.readyState:0}function _n(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function En(e){const t={};e=(e.g&&2<=vn(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(k(e[r]))continue;var n=U(e[r]);const i=n[0];if(n=n[1],"string"!==typeof n)continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}D(t,function(e){return e.join(", ")})}function wn(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function bn(e){this.Aa=0,this.i=[],this.j=new Ke,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=wn("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=wn("baseRetryDelayMs",5e3,e),this.cb=wn("retryDelaySeedMs",1e4,e),this.Wa=wn("forwardChannelMaxRetries",2,e),this.wa=wn("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new yt(e&&e.concurrentRequestLimit),this.Da=new en,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function Tn(e){if(Sn(e),3==e.G){var t=e.U++,n=Rt(e.I);if(Lt(n,"SID",e.K),Lt(n,"RID",t),Lt(n,"TYPE","terminate"),Nn(e,n),t=new nt(e,e.j,t),t.L=2,t.v=xt(Rt(n)),n=!1,a.navigator&&a.navigator.sendBeacon)try{n=a.navigator.sendBeacon(t.v.toString(),"")}catch(r){}!n&&a.Image&&((new Image).src=t.v,n=!0),n||(t.g=$n(t.j,null),t.g.ea(t.v)),t.F=Date.now(),lt(t)}Vn(e)}function In(e){e.g&&(Dn(e),e.g.cancel(),e.g=null)}function Sn(e){In(e),e.u&&(a.clearTimeout(e.u),e.u=null),xn(e),e.h.cancel(),e.s&&("number"===typeof e.s&&a.clearTimeout(e.s),e.s=null)}function Cn(e){if(!vt(e.h)&&!e.s){e.s=!0;var t=e.Ga;H||K(),W||(H(),W=!0),G.add(t,e),e.B=0}}function An(e,t){return!(_t(e.h)>=e.h.j-(e.s?1:0))&&(e.s?(e.i=t.D.concat(e.i),!0):!(1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa))&&(e.s=Ge(b(e.Ga,e,t),Un(e,e.B)),e.B++,!0))}function kn(e,t){var n;n=t?t.l:e.U++;const r=Rt(e.I);Lt(r,"SID",e.K),Lt(r,"RID",n),Lt(r,"AID",e.T),Nn(e,r),e.m&&e.o&&un(r,e.m,e.o),n=new nt(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=Rn(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),wt(e.h,n),ot(n,r,t)}function Nn(e,t){e.H&&P(e.H,function(e,n){Lt(t,n,e)}),e.l&&Ct({},function(e,n){Lt(t,n,e)})}function Rn(e,t,n){n=Math.min(e.i.length,n);var r=e.l?b(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<n;a++){let n=i[a].g;const c=i[a].map;if(n-=t,0>n)t=Math.max(0,i[a].g-100),o=!1;else try{tn(c,e,"req"+n+"_")}catch(s){r&&r(c)}}if(o){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function On(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;H||K(),W||(H(),W=!0),G.add(t,e),e.v=0}}function Pn(e){return!(e.g||e.u||3<=e.v)&&(e.Y++,e.u=Ge(b(e.Fa,e),Un(e,e.v)),e.v++,!0)}function Dn(e){null!=e.A&&(a.clearTimeout(e.A),e.A=null)}function Ln(e){e.g=new nt(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=Rt(e.qa);Lt(t,"RID","rpc"),Lt(t,"SID",e.K),Lt(t,"AID",e.T),Lt(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&Lt(t,"TO",e.ja),Lt(t,"TYPE","xmlhttp"),Nn(e,t),e.m&&e.o&&un(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=xt(Rt(t)),n.m=null,n.P=!0,at(n,e)}function xn(e){null!=e.C&&(a.clearTimeout(e.C),e.C=null)}function Mn(e,t){var n=null;if(e.g==t){xn(e),Dn(e),e.g=null;var r=2}else{if(!Et(e.h,t))return;n=t.D,bt(e.h,t),r=1}if(0!=e.G)if(t.o)if(1==r){n=t.m?t.m.length:0,t=Date.now()-t.F;var i=e.B;r=Ve(),Ee(r,new We(r,n)),Cn(e)}else On(e);else if(i=t.s,3==i||0==i&&0<t.X||!(1==r&&An(e,t)||2==r&&Pn(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:Fn(e,5);break;case 4:Fn(e,10);break;case 3:Fn(e,6);break;default:Fn(e,2)}}function Un(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function Fn(e,t){if(e.j.info("Error code "+t),2==t){var n=b(e.fb,e),r=e.Xa;const t=!r;r=new Nt(r||"//www.google.com/images/cleardot.gif"),a.location&&"http"==a.location.protocol||Ot(r,"https"),xt(r),t?Qt(r.toString(),n):Jt(r.toString(),n)}else He(2);e.G=0,e.l&&e.l.sa(t),Vn(e),Sn(e)}function Vn(e){if(e.G=0,e.ka=[],e.l){const t=Tt(e.h);0==t.length&&0==e.i.length||(C(e.ka,t),C(e.ka,e.i),e.h.i.length=0,S(e.i),e.i.length=0),e.l.ra()}}function jn(e,t,n){var r=n instanceof Nt?Rt(n):new Nt(n);if(""!=r.g)t&&(r.g=t+"."+r.g),Pt(r,r.s);else{var i=a.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new Nt(null);r&&Ot(s,r),t&&(s.g=t),i&&Pt(s,i),n&&(s.l=n),r=s}return n=e.D,t=e.ya,n&&t&&Lt(r,n,t),Lt(r,"VER",e.la),Nn(e,r),r}function $n(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return t=e.Ca&&!e.pa?new ln(new nn({eb:n})):new ln(e.pa),t.Ha(e.J),t}function Bn(){}function Hn(){}function Wn(e,t){_e.call(this),this.g=new bn(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!k(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!k(t)&&(this.g.D=t,e=this.h,null!==e&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new qn(this)}function Gn(e){xe.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function Kn(){Me.call(this),this.status=1}function qn(e){this.g=e}e=ln.prototype,e.Ha=function(e){this.J=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Je.g(),this.v=this.o?Pe(this.o):Pe(Je),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(s){return void dn(this,s)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!==typeof r.keys||"function"!==typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=a.FormData&&e instanceof a.FormData,!(0<=Array.prototype.indexOf.call(fn,t,void 0))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[o,a]of n)this.g.setRequestHeader(o,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{yn(this),this.u=!0,this.g.send(e),this.u=!1}catch(s){dn(this,s)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,Ee(this,"complete"),Ee(this,"abort"),gn(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),gn(this,!0)),ln.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?mn(this):this.bb())},e.bb=function(){mn(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<vn(this)?this.g.status:-1}catch(e){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Ne(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"===typeof this.l?this.l:String(this.l)},e=bn.prototype,e.la=8,e.G=1,e.connect=function(e,t,n,r){He(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=jn(this,null,this.W),Cn(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new nt(this,this.j,e);let s=this.o;if(this.S&&(s?(s=L(s),M(s,this.S)):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(r="__data__"in r.map&&(r=r.map.__data__,"string"===typeof r)?r.length:void 0,void 0===r)break;if(t+=r,4096<t){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Rn(this,i,t),n=Rt(this.I),Lt(n,"RID",e),Lt(n,"CVER",22),this.D&&Lt(n,"X-HTTP-Session-Id",this.D),Nn(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(cn(s)))+"&"+t:this.m&&un(n,this.m,s)),wt(this.h,i),this.Ua&&Lt(n,"TYPE","init"),this.P?(Lt(n,"$req",t),Lt(n,"SID","null"),i.T=!0,ot(i,n,null)):ot(i,n,t),this.G=2}}else 3==this.G&&(e?kn(this,e):0==this.i.length||vt(this.h)||kn(this))},e.Fa=function(){if(this.u=null,Ln(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=Ge(b(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,He(10),In(this),Ln(this))},e.Za=function(){null!=this.C&&(this.C=null,In(this),Pn(this),He(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),He(2)):(this.j.info("Failed to ping google.com"),He(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},e=Bn.prototype,e.ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},Hn.prototype.g=function(e,t){return new Wn(e,t)},I(Wn,_e),Wn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Wn.prototype.close=function(){Tn(this.g)},Wn.prototype.o=function(e){var t=this.g;if("string"===typeof e){var n={};n.__data__=e,e=n}else this.u&&(n={},n.__data__=ke(e),e=n);t.i.push(new gt(t.Ya++,e)),3==t.G&&Cn(t)},Wn.prototype.N=function(){this.g.l=null,delete this.j,Tn(this.g),delete this.g,Wn.aa.N.call(this)},I(Gn,xe),I(Kn,Me),I(qn,Bn),qn.prototype.ua=function(){Ee(this.g,"a")},qn.prototype.ta=function(e){Ee(this.g,new Gn(e))},qn.prototype.sa=function(e){Ee(this.g,new Kn)},qn.prototype.ra=function(){Ee(this.g,"b")},Hn.prototype.createWebChannel=Hn.prototype.g,Wn.prototype.send=Wn.prototype.o,Wn.prototype.open=Wn.prototype.m,Wn.prototype.close=Wn.prototype.close,v=E.createWebChannelTransport=function(){return new Hn},y=E.getStatEventTarget=function(){return Ve()},g=E.Event=Ue,m=E.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ze.NO_ERROR=0,Ze.TIMEOUT=8,Ze.HTTP_ERROR=6,p=E.ErrorCode=Ze,et.COMPLETE="complete",d=E.EventType=et,De.EventType=Le,Le.OPEN="a",Le.CLOSE="b",Le.ERROR="c",Le.MESSAGE="d",_e.prototype.listen=_e.prototype.K,f=E.WebChannel=De,E.FetchXmlHttpFactory=nn,ln.prototype.listenOnce=ln.prototype.L,ln.prototype.getLastError=ln.prototype.Ka,ln.prototype.getLastErrorCode=ln.prototype.Ba,ln.prototype.getStatus=ln.prototype.Z,ln.prototype.getResponseJson=ln.prototype.Oa,ln.prototype.getResponseText=ln.prototype.oa,ln.prototype.send=ln.prototype.ea,ln.prototype.setWithCredentials=ln.prototype.Ha,h=E.XhrIo=ln}).apply("undefined"!==typeof _?_:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});const w="@firebase/firestore",b="4.9.0";
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
 */const S=new a.Vy("@firebase/firestore");function C(){return S.logLevel}function A(e,...t){if(S.logLevel<=a.$b.DEBUG){const n=t.map(R);S.debug(`Firestore (${I}): ${e}`,...n)}}function k(e,...t){if(S.logLevel<=a.$b.ERROR){const n=t.map(R);S.error(`Firestore (${I}): ${e}`,...n)}}function N(e,...t){if(S.logLevel<=a.$b.WARN){const n=t.map(R);S.warn(`Firestore (${I}): ${e}`,...n)}}function R(e){if("string"==typeof e)return e;try{
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
 */function O(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,P(e,r,n)}function P(e,t,n){let r=`FIRESTORE (${I}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw k(r),new Error(r)}function D(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||P(t,i,r)}function L(e,t){return e}
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
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends c.g{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class F{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class V{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(T.UNAUTHENTICATED))}shutdown(){}}class j{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class ${constructor(e){this.t=e,this.currentUser=T.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){D(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new U;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new U,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{A("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(A("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new U)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(A("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(D("string"==typeof t.accessToken,31837,{l:t}),new F(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return D(null===e||"string"==typeof e,2055,{h:e}),new T(e)}}class B{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=T.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class H{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new B(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(T.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class W{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class G{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,s.xZ)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){D(void 0===this.o,3512);const n=e=>{null!=e.error&&A("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,A("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{A("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):A("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new W(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(D("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new W(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */class q{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let n="";for(;n.length<20;){const r=K(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%62))}return n}}function z(e,t){return e<t?-1:e>t?1:0}function Y(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return J(n)===J(i)?z(n,i):J(n)?1:-1}return z(e.length,t.length)}const X=55296,Q=57343;function J(e){const t=e.charCodeAt(0);return t>=X&&t<=Q}function Z(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
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
const ee="__name__";class te{constructor(e,t,n){void 0===t?t=0:t>e.length&&O(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&O(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===te.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof te?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=te.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return z(e.length,t.length)}static compareSegments(e,t){const n=te.isNumericId(e),r=te.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?te.extractNumericId(e).compare(te.extractNumericId(t)):Y(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return r.fromString(e.substring(4,e.length-2))}}class ne extends te{construct(e,t,n){return new ne(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new M(x.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const re=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ie extends te{construct(e,t,n){return new ie(e,t,n)}static isValidIdentifier(e){return re.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===ee}static keyField(){return new ie([ee])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new M(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new M(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new M(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new M(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ie(t)}static emptyPath(){return new ie([])}}
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
 */function oe(e,t,n){if(!n)throw new M(x.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function ae(e,t,n,r){if(!0===t&&!0===r)throw new M(x.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ce(e){if(!se.isDocumentKey(e))throw new M(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ue(e){if(se.isDocumentKey(e))throw new M(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function le(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function he(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":O(12329,{type:typeof e})}function fe(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new M(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=he(e);throw new M(x.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function de(e,t){if(t<=0)throw new M(x.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function pe(e,t){const n={typeString:e};return t&&(n.value=t),n}function me(e,t){if(!le(e))throw new M(x.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new M(x.INVALID_ARGUMENT,n);return!0}
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
 */const ge=-62135596800,ye=1e6;class ve{static now(){return ve.fromMillis(Date.now())}static fromDate(e){return ve.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*ye);return new ve(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ge)throw new M(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ye}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(me(e,ve._jsonSchema))return new ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ge;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ve._jsonSchemaVersion="firestore/timestamp/1.0",ve._jsonSchema={type:pe("string",ve._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};
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
class _e{static fromTimestamp(e){return new _e(e)}static min(){return new _e(new ve(0,0))}static max(){return new _e(new ve(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const Ee=-1;class we{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}we.UNKNOWN_ID=-1;function be(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=_e.fromTimestamp(1e9===r?new ve(n+1,0):new ve(n,r));return new Ie(i,se.empty(),t)}function Te(e){return new Ie(e.readTime,e.key,Ee)}class Ie{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ie(_e.min(),se.empty(),Ee)}static max(){return new Ie(_e.max(),se.empty(),Ee)}}function Se(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=se.comparator(e.documentKey,t.documentKey),0!==n?n:z(e.largestBatchId,t.largestBatchId)
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
 */)}const Ce="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ae{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */async function ke(e){if(e.code!==x.FAILED_PRECONDITION||e.message!==Ce)throw e;A("LocalStore","Unexpectedly lost primary lease")}
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
 */class Ne{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Ne((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof Ne?t:Ne.resolve(t)}catch(e){return Ne.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):Ne.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):Ne.reject(t)}static resolve(e){return new Ne((t,n)=>{t(e)})}static reject(e){return new Ne((t,n)=>{n(e)})}static waitFor(e){return new Ne((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=Ne.resolve(!1);for(const n of e)t=t.next(e=>e?Ne.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new Ne((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new Ne((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
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
 */function Re(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Oe(e){return"IndexedDbTransactionError"===e.name}
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
class Pe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Pe.ce=-1;
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
 */const De=-1;function Le(e){return null==e}function xe(e){return 0===e&&1/e==-1/0}function Me(e){return"number"==typeof e&&Number.isInteger(e)&&!xe(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
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
 */const Ue="";function Fe(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=je(t)),t=Ve(e.get(n),t);return je(t)}function Ve(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case Ue:n+="";break;default:n+=t}}return n}function je(e){return e+Ue+""}
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
const $e="remoteDocuments",Be="owner",He="mutationQueues",We="mutations";
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
 */const Ge="documentMutations",Ke="remoteDocumentsV14",qe="remoteDocumentGlobal",ze="targets",Ye="targetDocuments",Xe="targetGlobal",Qe="collectionParents",Je="clientMetadata",Ze="bundles",et="namedQueries",tt="indexConfiguration",nt="indexState",rt="indexEntries",it="documentOverlays",st="globals",ot=[He,We,Ge,$e,ze,Be,Xe,Ye,Je,qe,Qe,Ze,et],at=[He,We,Ge,Ke,ze,Be,Xe,Ye,Je,qe,Qe,Ze,et,it],ct=at,ut=[...ct,tt,nt,rt];
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
function lt(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function ht(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function ft(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class dt{constructor(e,t){this.comparator=e,this.root=t||mt.EMPTY}insert(e,t){return new dt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,mt.BLACK,null,null))}remove(e){return new dt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,mt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new pt(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new pt(this.root,e,this.comparator,!1)}getReverseIterator(){return new pt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new pt(this.root,e,this.comparator,!0)}}class pt{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class mt{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:mt.RED,this.left=null!=r?r:mt.EMPTY,this.right=null!=i?i:mt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new mt(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return mt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return mt.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,mt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,mt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw O(27949);return e+(this.isRed()?0:1)}}mt.EMPTY=null,mt.RED=!0,mt.BLACK=!1,mt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new mt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class gt{constructor(e){this.comparator=e,this.data=new dt(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yt(this.data.getIterator())}getIteratorFrom(e){return new yt(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof gt))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new gt(this.comparator);return t.data=e,t}}class yt{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
class vt{constructor(e){this.fields=e,e.sort(ie.comparator)}static empty(){return new vt([])}unionWith(e){let t=new gt(ie.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new vt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Z(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */class _t extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
class Et{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new _t("Invalid base64 string: "+e):e}}(e);return new Et(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Et(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Et.EMPTY_BYTE_STRING=new Et("");const wt=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bt(e){if(D(!!e,39018),"string"==typeof e){let t=0;const n=wt.exec(e);if(D(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Tt(e.seconds),nanos:Tt(e.nanos)}}function Tt(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function It(e){return"string"==typeof e?Et.fromBase64String(e):Et.fromUint8Array(e)}
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
 */const St="server_timestamp",Ct="__type__",At="__previous_value__",kt="__local_write_time__";function Nt(e){const t=(e?.mapValue?.fields||{})[Ct]?.stringValue;return t===St}function Rt(e){const t=e.mapValue.fields[At];return Nt(t)?Rt(t):t}function Ot(e){const t=bt(e.mapValue.fields[kt].timestampValue);return new ve(t.seconds,t.nanos)}
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
 */class Pt{constructor(e,t,n,r,i,s,o,a,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u}}const Dt="(default)";class Lt{constructor(e,t){this.projectId=e,this.database=t||Dt}static empty(){return new Lt("","")}get isDefaultDatabase(){return this.database===Dt}isEqual(e){return e instanceof Lt&&e.projectId===this.projectId&&e.database===this.database}}
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
 */const xt="__type__",Mt="__max__",Ut={mapValue:{fields:{__type__:{stringValue:Mt}}}},Ft="__vector__",Vt="value";function jt(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Nt(e)?4:rn(e)?9007199254740991:tn(e)?10:11:O(28295,{value:e})}function $t(e,t){if(e===t)return!0;const n=jt(e);if(n!==jt(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ot(e).isEqual(Ot(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=bt(e.timestampValue),r=bt(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return It(e.bytesValue).isEqual(It(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Tt(e.geoPointValue.latitude)===Tt(t.geoPointValue.latitude)&&Tt(e.geoPointValue.longitude)===Tt(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Tt(e.integerValue)===Tt(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Tt(e.doubleValue),r=Tt(t.doubleValue);return n===r?xe(n)===xe(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Z(e.arrayValue.values||[],t.arrayValue.values||[],$t);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(lt(n)!==lt(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!$t(n[i],r[i])))return!1;return!0}(e,t);default:return O(52216,{left:e})}}function Bt(e,t){return void 0!==(e.values||[]).find(e=>$t(e,t))}function Ht(e,t){if(e===t)return 0;const n=jt(e),r=jt(t);if(n!==r)return z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return z(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Tt(e.integerValue||e.doubleValue),r=Tt(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Wt(e.timestampValue,t.timestampValue);case 4:return Wt(Ot(e),Ot(t));case 5:return Y(e.stringValue,t.stringValue);case 6:return function(e,t){const n=It(e),r=It(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=z(n[i],r[i]);if(0!==e)return e}return z(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=z(Tt(e.latitude),Tt(t.latitude));return 0!==n?n:z(Tt(e.longitude),Tt(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Gt(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},i=n[Vt]?.arrayValue,s=r[Vt]?.arrayValue,o=z(i?.values?.length||0,s?.values?.length||0);return 0!==o?o:Gt(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Ut.mapValue&&t===Ut.mapValue)return 0;if(e===Ut.mapValue)return 1;if(t===Ut.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=Y(r[o],s[o]);if(0!==e)return e;const t=Ht(n[r[o]],i[s[o]]);if(0!==t)return t}return z(r.length,s.length)}(e.mapValue,t.mapValue);default:throw O(23264,{he:n})}}function Wt(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return z(e,t);const n=bt(e),r=bt(t),i=z(n.seconds,r.seconds);return 0!==i?i:z(n.nanos,r.nanos)}function Gt(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=Ht(n[i],r[i]);if(e)return e}return z(n.length,r.length)}function Kt(e){return qt(e)}function qt(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=bt(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return It(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return se.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=qt(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${qt(e.fields[i])}`;return n+"}"}(e.mapValue):O(61005,{value:e})}function zt(e){switch(jt(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Rt(e);return t?16+zt(t):16;case 5:return 2*e.stringValue.length;case 6:return It(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+zt(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return ht(e.fields,(e,n)=>{t+=e.length+zt(n)}),t}(e.mapValue);default:throw O(13486,{value:e})}}function Yt(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Xt(e){return!!e&&"integerValue"in e}function Qt(e){return!!e&&"arrayValue"in e}function Jt(e){return!!e&&"nullValue"in e}function Zt(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function en(e){return!!e&&"mapValue"in e}function tn(e){const t=(e?.mapValue?.fields||{})[xt]?.stringValue;return t===Ft}function nn(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return ht(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=nn(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=nn(e.arrayValue.values[n]);return t}return{...e}}function rn(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Mt}
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
class sn{constructor(e){this.value=e}static empty(){return new sn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!en(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=nn(t)}setAll(e){let t=ie.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=nn(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());en(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $t(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];en(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){ht(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new sn(nn(this.value))}}function on(e){const t=[];return ht(e.fields,(e,n)=>{const r=new ie([e]);if(en(n)){const e=on(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new vt(t)
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
 */}class an{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new an(e,0,_e.min(),_e.min(),_e.min(),sn.empty(),0)}static newFoundDocument(e,t,n,r){return new an(e,1,t,_e.min(),n,r,0)}static newNoDocument(e,t){return new an(e,2,t,_e.min(),_e.min(),sn.empty(),0)}static newUnknownDocument(e,t){return new an(e,3,t,_e.min(),_e.min(),sn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(_e.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=sn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=sn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=_e.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof an&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new an(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class cn{constructor(e,t){this.position=e,this.inclusive=t}}function un(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?se.comparator(se.fromName(o.referenceValue),n.key):Ht(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function ln(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!$t(e.position[n],t.position[n]))return!1;return!0}
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
 */class hn{constructor(e,t="asc"){this.field=e,this.dir=t}}function fn(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class dn{}class pn extends dn{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new bn(e,t,n):"array-contains"===t?new Cn(e,n):"in"===t?new An(e,n):"not-in"===t?new kn(e,n):"array-contains-any"===t?new Nn(e,n):new pn(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Tn(e,n):new In(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Ht(t,this.value)):null!==t&&jt(this.value)===jt(t)&&this.matchesComparison(Ht(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class mn extends dn{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new mn(e,t)}matches(e){return gn(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function gn(e){return"and"===e.op}function yn(e){return vn(e)&&gn(e)}function vn(e){for(const t of e.filters)if(t instanceof mn)return!1;return!0}function _n(e){if(e instanceof pn)return e.field.canonicalString()+e.op.toString()+Kt(e.value);if(yn(e))return e.filters.map(e=>_n(e)).join(",");{const t=e.filters.map(e=>_n(e)).join(",");return`${e.op}(${t})`}}function En(e,t){return e instanceof pn?function(e,t){return t instanceof pn&&e.op===t.op&&e.field.isEqual(t.field)&&$t(e.value,t.value)}(e,t):e instanceof mn?function(e,t){return t instanceof mn&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&En(n,t.filters[r]),!0)}(e,t):void O(19439)}function wn(e){return e instanceof pn?function(e){return`${e.field.canonicalString()} ${e.op} ${Kt(e.value)}`}(e):e instanceof mn?function(e){return e.op.toString()+" {"+e.getFilters().map(wn).join(" ,")+"}"}(e):"Filter"}class bn extends pn{constructor(e,t,n){super(e,t,n),this.key=se.fromName(n.referenceValue)}matches(e){const t=se.comparator(e.key,this.key);return this.matchesComparison(t)}}class Tn extends pn{constructor(e,t){super(e,"in",t),this.keys=Sn("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class In extends pn{constructor(e,t){super(e,"not-in",t),this.keys=Sn("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Sn(e,t){return(t.arrayValue?.values||[]).map(e=>se.fromName(e.referenceValue))}class Cn extends pn{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qt(t)&&Bt(t.arrayValue,this.value)}}class An extends pn{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Bt(this.value.arrayValue,t)}}class kn extends pn{constructor(e,t){super(e,"not-in",t)}matches(e){if(Bt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Bt(this.value.arrayValue,t)}}class Nn extends pn{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qt(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Bt(this.value.arrayValue,e))}}
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
 */class Rn{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.Te=null}}function On(e,t=null,n=[],r=[],i=null,s=null,o=null){return new Rn(e,t,n,r,i,s,o)}function Pn(e){const t=L(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>_n(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),Le(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Kt(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Kt(e)).join(",")),t.Te=e}return t.Te}function Dn(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!fn(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!En(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!ln(e.startAt,t.startAt)&&ln(e.endAt,t.endAt)}function Ln(e){return se.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
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
class xn{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Mn(e,t,n,r,i,s,o,a){return new xn(e,t,n,r,i,s,o,a)}function Un(e){return new xn(e)}function Fn(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Vn(e){return null!==e.collectionGroup}function jn(e){const t=L(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new gt(ie.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new hn(r,n))}),e.has(ie.keyField().canonicalString())||t.Ie.push(new hn(ie.keyField(),n))}return t.Ie}function $n(e){const t=L(e);return t.Ee||(t.Ee=Bn(t,jn(e))),t.Ee}function Bn(e,t){if("F"===e.limitType)return On(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new hn(e.field,t)});const n=e.endAt?new cn(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new cn(e.startAt.position,e.startAt.inclusive):null;return On(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Hn(e,t){const n=e.filters.concat([t]);return new xn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Wn(e,t,n){return new xn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Gn(e,t){return Dn($n(e),$n(t))&&e.limitType===t.limitType}function Kn(e){return`${Pn($n(e))}|lt:${e.limitType}`}function qn(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>wn(e)).join(", ")}]`),Le(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Kt(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Kt(e)).join(",")),`Target(${t})`}($n(e))}; limitType=${e.limitType})`}function zn(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):se.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of jn(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=un(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,jn(e),t))&&!(e.endAt&&!function(e,t,n){const r=un(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,jn(e),t))}(e,t)}function Yn(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Xn(e){return(t,n)=>{let r=!1;for(const i of jn(e)){const e=Qn(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Qn(e,t,n){const r=e.field.isKeyField()?se.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Ht(r,i):O(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return O(19790,{direction:e.dir})}}
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
 */class Jn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){ht(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return ft(this.inner)}size(){return this.innerSize}}
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
 */const Zn=new dt(se.comparator);function er(){return Zn}const tr=new dt(se.comparator);function nr(...e){let t=tr;for(const n of e)t=t.insert(n.key,n);return t}function rr(e){let t=tr;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ir(){return or()}function sr(){return or()}function or(){return new Jn(e=>e.toString(),(e,t)=>e.isEqual(t))}const ar=new dt(se.comparator),cr=new gt(se.comparator);function ur(...e){let t=cr;for(const n of e)t=t.add(n);return t}const lr=new gt(z);function hr(){return lr}
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
 */function fr(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xe(t)?"-0":t}}function dr(e){return{integerValue:""+e}}function pr(e,t){return Me(t)?dr(t):fr(e,t)}
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
 */class mr{constructor(){this._=void 0}}function gr(e,t,n){return e instanceof _r?function(e,t){const n={fields:{[Ct]:{stringValue:St},[kt]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Nt(t)&&(t=Rt(t)),t&&(n.fields[At]=t),{mapValue:n}}(n,t):e instanceof Er?wr(e,t):e instanceof br?Tr(e,t):function(e,t){const n=vr(e,t),r=Sr(n)+Sr(e.Ae);return Xt(n)&&Xt(e.Ae)?dr(r):fr(e.serializer,r)}(e,t)}function yr(e,t,n){return e instanceof Er?wr(e,t):e instanceof br?Tr(e,t):n}function vr(e,t){return e instanceof Ir?function(e){return Xt(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class _r extends mr{}class Er extends mr{constructor(e){super(),this.elements=e}}function wr(e,t){const n=Cr(t);for(const r of e.elements)n.some(e=>$t(e,r))||n.push(r);return{arrayValue:{values:n}}}class br extends mr{constructor(e){super(),this.elements=e}}function Tr(e,t){let n=Cr(t);for(const r of e.elements)n=n.filter(e=>!$t(e,r));return{arrayValue:{values:n}}}class Ir extends mr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Sr(e){return Tt(e.integerValue||e.doubleValue)}function Cr(e){return Qt(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class Ar{constructor(e,t){this.field=e,this.transform=t}}function kr(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Er&&t instanceof Er||e instanceof br&&t instanceof br?Z(e.elements,t.elements,$t):e instanceof Ir&&t instanceof Ir?$t(e.Ae,t.Ae):e instanceof _r&&t instanceof _r}(e.transform,t.transform)}class Nr{constructor(e,t){this.version=e,this.transformResults=t}}class Rr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Rr}static exists(e){return new Rr(void 0,e)}static updateTime(e){return new Rr(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Or(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Pr{}function Dr(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Hr(e.key,Rr.none()):new Fr(e.key,e.data,Rr.none());{const n=e.data,r=sn.empty();let i=new gt(ie.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Vr(e.key,r,new vt(i.toArray()),Rr.none())}}function Lr(e,t,n){e instanceof Fr?function(e,t,n){const r=e.value.clone(),i=$r(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Vr?function(e,t,n){if(!Or(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=$r(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(jr(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function xr(e,t,n,r){return e instanceof Fr?function(e,t,n,r){if(!Or(e.precondition,t))return n;const i=e.value.clone(),s=Br(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Vr?function(e,t,n,r){if(!Or(e.precondition,t))return n;const i=Br(e.fieldTransforms,r,t),s=t.data;return s.setAll(jr(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return Or(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Mr(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=vr(r.transform,e||null);null!=i&&(null===n&&(n=sn.empty()),n.set(r.field,i))}return n||null}function Ur(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Z(e,t,(e,t)=>kr(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Fr extends Pr{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Vr extends Pr{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function jr(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function $r(e,t,n){const r=new Map;D(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,yr(o,a,n[i]))}return r}function Br(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,gr(e,s,t))}return r}class Hr extends Pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Wr extends Pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class Gr{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Lr(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=xr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=xr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=sr();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Dr(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(_e.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ur())}isEqual(e){return this.batchId===e.batchId&&Z(this.mutations,e.mutations,(e,t)=>Ur(e,t))&&Z(this.baseMutations,e.baseMutations,(e,t)=>Ur(e,t))}}class Kr{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){D(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return ar}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Kr(e,t,n,r)}}
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
 */class qr{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
class zr{constructor(e,t){this.count=e,this.unchangedNames=t}}
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
 */var Yr,Xr;function Qr(e){switch(e){case x.OK:return O(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return O(15467,{code:e})}}function Jr(e){if(void 0===e)return k("GRPC error has no .code"),x.UNKNOWN;switch(e){case Yr.OK:return x.OK;case Yr.CANCELLED:return x.CANCELLED;case Yr.UNKNOWN:return x.UNKNOWN;case Yr.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case Yr.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case Yr.INTERNAL:return x.INTERNAL;case Yr.UNAVAILABLE:return x.UNAVAILABLE;case Yr.UNAUTHENTICATED:return x.UNAUTHENTICATED;case Yr.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case Yr.NOT_FOUND:return x.NOT_FOUND;case Yr.ALREADY_EXISTS:return x.ALREADY_EXISTS;case Yr.PERMISSION_DENIED:return x.PERMISSION_DENIED;case Yr.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case Yr.ABORTED:return x.ABORTED;case Yr.OUT_OF_RANGE:return x.OUT_OF_RANGE;case Yr.UNIMPLEMENTED:return x.UNIMPLEMENTED;case Yr.DATA_LOSS:return x.DATA_LOSS;default:return O(39323,{code:e})}}(Xr=Yr||(Yr={}))[Xr.OK=0]="OK",Xr[Xr.CANCELLED=1]="CANCELLED",Xr[Xr.UNKNOWN=2]="UNKNOWN",Xr[Xr.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Xr[Xr.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Xr[Xr.NOT_FOUND=5]="NOT_FOUND",Xr[Xr.ALREADY_EXISTS=6]="ALREADY_EXISTS",Xr[Xr.PERMISSION_DENIED=7]="PERMISSION_DENIED",Xr[Xr.UNAUTHENTICATED=16]="UNAUTHENTICATED",Xr[Xr.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Xr[Xr.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Xr[Xr.ABORTED=10]="ABORTED",Xr[Xr.OUT_OF_RANGE=11]="OUT_OF_RANGE",Xr[Xr.UNIMPLEMENTED=12]="UNIMPLEMENTED",Xr[Xr.INTERNAL=13]="INTERNAL",Xr[Xr.UNAVAILABLE=14]="UNAVAILABLE",Xr[Xr.DATA_LOSS=15]="DATA_LOSS";
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
let Zr=null;
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
 */function ei(){return new TextEncoder}
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
 */const ti=new r([4294967295,4294967295],0);function ni(e){const t=ei().encode(e),n=new i;return n.update(t),new Uint8Array(n.digest())}function ri(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new r([n,i],0),new r([s,o],0)]}class ii{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new si(`Invalid padding: ${t}`);if(n<0)throw new si(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new si(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new si(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=r.fromNumber(this.ge)}ye(e,t,n){let i=e.add(t.multiply(r.fromNumber(n)));return 1===i.compare(ti)&&(i=new r([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=ni(e),[n,r]=ri(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new ii(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.ge)return;const t=ni(e),[n,r]=ri(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class oi{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,ai.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new oi(_e.min(),r,new dt(z),er(),ur())}}class ai{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ai(n,t,ur(),ur(),ur())}}
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
 */class ci{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class ui{constructor(e,t){this.targetId=e,this.Ce=t}}class li{constructor(e,t,n=Et.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class hi{constructor(){this.ve=0,this.Fe=pi(),this.Me=Et.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ur(),t=ur(),n=ur();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:O(38017,{changeType:i})}}),new ai(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=pi()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,D(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class fi{constructor(e){this.Ge=e,this.ze=new Map,this.je=er(),this.Je=di(),this.He=di(),this.Ye=new dt(z)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:O(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Ln(i))if(0===n){const e=new se(i.path);this.et(t,e,an.newNoDocument(e,_e.min()))}else D(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),i=n?this.ct(n,e,r):1;if(0!==i){this.it(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}Zr?.lt(function(e,t,n,r,i){const s={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(s.bloomFilter={applied:0===i,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),s}
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
 */(r,e.Ce,this.Ge.ht(),n,i))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=It(n).toUint8Array()}catch(e){if(e instanceof _t)return N("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new ii(s,r,i)}catch(e){return N(e instanceof si?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const i=this.ot(r);if(i){if(n.current&&Ln(i.target)){const t=new se(i.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,an.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=ur();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new oi(e,t,this.Ye,this.je,n);return this.je=er(),this.Je=di(),this.He=di(),this.Ye=new dt(z),r}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new hi,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new gt(z),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new gt(z),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||A("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new hi),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function di(){return new dt(se.comparator)}function pi(){return new dt(se.comparator)}const mi=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),gi=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})(),yi=(()=>{const e={and:"AND",or:"OR"};return e})();class vi{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _i(e,t){return e.useProto3Json||Le(t)?t:{value:t}}function Ei(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function wi(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function bi(e,t){return Ei(e,t.toTimestamp())}function Ti(e){return D(!!e,49232),_e.fromTimestamp(function(e){const t=bt(e);return new ve(t.seconds,t.nanos)}(e))}function Ii(e,t){return Si(e,t).canonicalString()}function Si(e,t){const n=function(e){return new ne(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Ci(e){const t=ne.fromString(e);return D(Yi(t),10190,{key:t.toString()}),t}function Ai(e,t){return Ii(e.databaseId,t.path)}function ki(e,t){const n=Ci(t);if(n.get(1)!==e.databaseId.projectId)throw new M(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new M(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new se(Pi(n))}function Ni(e,t){return Ii(e.databaseId,t)}function Ri(e){const t=Ci(e);return 4===t.length?ne.emptyPath():Pi(t)}function Oi(e){return new ne(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Pi(e){return D(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Di(e,t,n){return{name:Ai(e,t),fields:n.value.mapValue.fields}}function Li(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:O(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.useProto3Json?(D(void 0===t||"string"==typeof t,58123),Et.fromBase64String(t||"")):(D(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Et.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?x.UNKNOWN:Jr(e.code);return new M(t,e.message||"")}(o);n=new li(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=ki(e,r.document.name),s=Ti(r.document.updateTime),o=r.document.createTime?Ti(r.document.createTime):_e.min(),a=new sn({mapValue:{fields:r.document.fields}}),c=an.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new ci(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=ki(e,r.document),s=r.readTime?Ti(r.readTime):_e.min(),o=an.newNoDocument(i,s),a=r.removedTargetIds||[];n=new ci([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=ki(e,r.document),s=r.removedTargetIds||[];n=new ci([],s,i,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new zr(r,i),o=e.targetId;n=new ui(o,s)}}return n}function xi(e,t){let n;if(t instanceof Fr)n={update:Di(e,t.key,t.value)};else if(t instanceof Hr)n={delete:Ai(e,t.key)};else if(t instanceof Vr)n={update:Di(e,t.key,t.data),updateMask:zi(t.fieldMask)};else{if(!(t instanceof Wr))return O(16599,{Vt:t.type});n={verify:Ai(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof _r)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Er)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof br)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ir)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw O(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:bi(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:O(27497)}(e,t.precondition)),n}function Mi(e,t){return e&&e.length>0?(D(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Ti(e.updateTime):Ti(t);return n.isEqual(_e.min())&&(n=Ti(t)),new Nr(n,e.transformResults||[])}(e,t))):[]}function Ui(e,t){return{documents:[Ni(e,t.path)]}}function Fi(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Ni(e,i);const s=function(e){if(0!==e.length)return qi(mn.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:Gi(e.field),direction:Bi(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=_i(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i}}function Vi(e){let t=Ri(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){D(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=$i(e);return t instanceof mn&&yn(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new hn(Ki(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Le(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new cn(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new cn(n,t)}(n.endAt)),Mn(t,i,o,s,a,"F",c,u)}function ji(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}function $i(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Ki(e.unaryFilter.field);return pn.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Ki(e.unaryFilter.field);return pn.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Ki(e.unaryFilter.field);return pn.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Ki(e.unaryFilter.field);return pn.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(e):void 0!==e.fieldFilter?function(e){return pn.create(Ki(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return mn.create(e.compositeFilter.filters.map(e=>$i(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(e):O(30097,{filter:e})}function Bi(e){return mi[e]}function Hi(e){return gi[e]}function Wi(e){return yi[e]}function Gi(e){return{fieldPath:e.canonicalString()}}function Ki(e){return ie.fromServerFormat(e.fieldPath)}function qi(e){return e instanceof pn?function(e){if("=="===e.op){if(Zt(e.value))return{unaryFilter:{field:Gi(e.field),op:"IS_NAN"}};if(Jt(e.value))return{unaryFilter:{field:Gi(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Zt(e.value))return{unaryFilter:{field:Gi(e.field),op:"IS_NOT_NAN"}};if(Jt(e.value))return{unaryFilter:{field:Gi(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gi(e.field),op:Hi(e.op),value:e.value}}}(e):e instanceof mn?function(e){const t=e.getFilters().map(e=>qi(e));return 1===t.length?t[0]:{compositeFilter:{op:Wi(e.op),filters:t}}}(e):O(54877,{filter:e})}function zi(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Yi(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
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
 */class Xi{constructor(e,t,n,r,i=_e.min(),s=_e.min(),o=Et.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new Xi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Xi(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Xi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Xi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class Qi{constructor(e){this.yt=e}}function Ji(e){const t=Vi({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Wn(t,t.limit,"L"):t}
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
 */class Zi{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(Tt(e.integerValue));else if("doubleValue"in e){const n=Tt(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),xe(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=bt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(It(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?rn(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):tn(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):O(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const r of Object.keys(n))this.Ot(r,t),this.Ct(n[r],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=Vt,i=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(Tt(i)),this.Ot(r,t),this.Ct(n[r],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const r of n)this.Ct(r,t)}Lt(e,t){this.Ft(t,37),se.fromName(e).path.forEach(e=>{this.Ft(t,60),this.Ut(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Zi.Kt=new Zi;
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
class es{constructor(){this.Cn=new ts}addToCollectionParentIndex(e,t){return this.Cn.add(t),Ne.resolve()}getCollectionParents(e,t){return Ne.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return Ne.resolve()}deleteFieldIndex(e,t){return Ne.resolve()}deleteAllFieldIndexes(e){return Ne.resolve()}createTargetIndexes(e,t){return Ne.resolve()}getDocumentsMatchingTarget(e,t){return Ne.resolve(null)}getIndexType(e,t){return Ne.resolve(0)}getFieldIndexes(e,t){return Ne.resolve([])}getNextCollectionGroupToUpdate(e){return Ne.resolve(null)}getMinOffset(e,t){return Ne.resolve(Ie.min())}getMinOffsetFromCollectionGroup(e,t){return Ne.resolve(Ie.min())}updateCollectionGroup(e,t,n){return Ne.resolve()}updateIndexEntries(e,t){return Ne.resolve()}}class ts{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new gt(ne.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new gt(ne.comparator)).toArray()}}
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
const ns={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},rs=41943040;class is{static withCacheSize(e){return new is(e,is.DEFAULT_COLLECTION_PERCENTILE,is.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
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
 */is.DEFAULT_COLLECTION_PERCENTILE=10,is.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,is.DEFAULT=new is(rs,is.DEFAULT_COLLECTION_PERCENTILE,is.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),is.DISABLED=new is(-1,0,0);
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
class ss{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new ss(0)}static cr(){return new ss(-1)}}
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
const os="LruGarbageCollector",as=1048576;function cs([e,t],[n,r]){const i=z(e,n);return 0===i?z(t,r):i}class us{constructor(e){this.Ir=e,this.buffer=new gt(cs),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();cs(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ls{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){A(os,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Oe(e)?A(os,"Ignoring IndexedDB error during garbage collection: ",e):await ke(e)}await this.Vr(3e5)})}}class hs{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return Ne.resolve(Pe.ce);const n=new us(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(A("LruGarbageCollector","Garbage collection skipped; disabled"),Ne.resolve(ns)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(A("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ns):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,i,s,o,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(A("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),C()<=a.$b.DEBUG&&A("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-l}ms\n\tDetermined least recently used ${r} in `+(o-s)+"ms\n"+`\tRemoved ${i} targets in `+(c-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`),Ne.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}function fs(e,t){return new hs(e,t)}
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
class ds{constructor(){this.changes=new Jn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,an.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Ne.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
class ps{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
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
 */class ms{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&xr(n.mutation,e,vt.empty(),ve.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ur()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ur()){const r=ir();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=nr();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=ir();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ur()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=er();const s=or(),o=function(){return or()}();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Vr)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),xr(o.mutation,t,o.mutation.getFieldMask(),ve.now())):s.set(t.key,vt.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>o.set(e,new ps(t,s.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=or();let r=new dt((e,t)=>e-t),i=ur();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||vt.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||ur()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=sr();c.forEach(e=>{if(!i.has(e)){const r=Dr(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return Ne.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return function(e){return se.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Vn(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):Ne.resolve(ir());let o=Ee,a=i;return s.next(t=>Ne.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?Ne.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,ur())).next(e=>({batchId:o,changes:rr(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new se(t)).next(e=>{let t=nr();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=nr();return this.indexManager.getCollectionParents(e,i).next(o=>Ne.forEach(o,o=>{const a=function(e,t){return new xn(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,an.newInvalidDocument(r)))});let n=nr();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&xr(s.mutation,r,vt.empty(),ve.now()),zn(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class gs{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return Ne.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:Ti(e.createTime)}}(t)),Ne.resolve()}getNamedQuery(e,t){return Ne.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(e){return{name:e.name,query:Ji(e.bundledQuery),readTime:Ti(e.readTime)}}(t)),Ne.resolve()}}
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
 */class ys{constructor(){this.overlays=new dt(se.comparator),this.qr=new Map}getOverlay(e,t){return Ne.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ir();return Ne.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),Ne.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),Ne.resolve()}getOverlaysForCollection(e,t,n){const r=ir(),i=t.length+1,s=new se(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return Ne.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new dt((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=ir(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=ir(),a=i.getIterator();for(;a.hasNext();)if(a.getNext().value.forEach((e,t)=>o.set(e,t)),o.size()>=r)break;return Ne.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new qr(t,n));let i=this.qr.get(t);void 0===i&&(i=ur(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}
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
 */class vs{constructor(){this.sessionToken=Et.EMPTY_BYTE_STRING}getSessionToken(e){return Ne.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,Ne.resolve()}}
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
 */class _s{constructor(){this.Qr=new gt(Es.$r),this.Ur=new gt(Es.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new Es(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new Es(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new se(new ne([])),n=new Es(t,e),r=new Es(t,e+1),i=[];return this.Ur.forEachInRange([n,r],e=>{this.Gr(e),i.push(e.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new se(new ne([])),n=new Es(t,e),r=new Es(t,e+1);let i=ur();return this.Ur.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new Es(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Es{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return se.comparator(e.key,t.key)||z(e.Yr,t.Yr)}static Kr(e,t){return z(e.Yr,t.Yr)||se.comparator(e.key,t.key)}}
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
 */class ws{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new gt(Es.$r)}checkEmpty(e){return Ne.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new Gr(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.Zr=this.Zr.add(new Es(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return Ne.resolve(s)}lookupMutationBatch(e,t){return Ne.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ei(n),i=r<0?0:r;return Ne.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Ne.resolve(0===this.mutationQueue.length?De:this.tr-1)}getAllMutationBatches(e){return Ne.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Es(t,0),r=new Es(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,r],e=>{const t=this.Xr(e.Yr);i.push(t)}),Ne.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new gt(z);return t.forEach(e=>{const t=new Es(e,0),r=new Es(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,r],e=>{n=n.add(e.Yr)})}),Ne.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;se.isDocumentKey(i)||(i=i.child(""));const s=new Es(new se(i),0);let o=new gt(z);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)},s),Ne.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){D(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return Ne.forEach(t.mutations,r=>{const i=new Es(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new Es(t,0),r=this.Zr.firstAfterOrEqual(n);return Ne.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,Ne.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
 */class bs{constructor(e){this.ri=e,this.docs=function(){return new dt(se.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Ne.resolve(n?n.document.mutableCopy():an.newInvalidDocument(t))}getEntries(e,t){let n=er();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():an.newInvalidDocument(e))}),Ne.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=er();const s=t.path,o=new se(s.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||Se(Te(o),n)<=0||(r.has(o.key)||zn(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return Ne.resolve(i)}getAllFromCollectionGroup(e,t,n,r){O(9500)}ii(e,t){return Ne.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new Ts(this)}getSize(e){return Ne.resolve(this.size)}}class Ts extends ds{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)}),Ne.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
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
 */class Is{constructor(e){this.persistence=e,this.si=new Jn(e=>Pn(e),Dn),this.lastRemoteSnapshotVersion=_e.min(),this.highestTargetId=0,this.oi=0,this._i=new _s,this.targetCount=0,this.ai=ss.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),Ne.resolve()}getLastRemoteSnapshotVersion(e){return Ne.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Ne.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),Ne.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),Ne.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new ss(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,Ne.resolve()}updateTargetData(e,t){return this.Pr(t),Ne.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,Ne.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.si.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),Ne.waitFor(i).next(()=>r)}getTargetCount(e){return Ne.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return Ne.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),Ne.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),Ne.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),Ne.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return Ne.resolve(n)}containsKey(e,t){return Ne.resolve(this._i.containsKey(t))}}
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
 */class Ss{constructor(e,t){this.ui={},this.overlays={},this.ci=new Pe(0),this.li=!1,this.li=!0,this.hi=new vs,this.referenceDelegate=e(this),this.Pi=new Is(this),this.indexManager=new es,this.remoteDocumentCache=function(e){return new bs(e)}(e=>this.referenceDelegate.Ti(e)),this.serializer=new Qi(t),this.Ii=new gs(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ys,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new ws(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){A("MemoryPersistence","Starting transaction:",e);const r=new Cs(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(e=>this.referenceDelegate.di(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ai(e,t){return Ne.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class Cs extends Ae{constructor(e){super(),this.currentSequenceNumber=e}}class As{constructor(e){this.persistence=e,this.Ri=new _s,this.Vi=null}static mi(e){return new As(e)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),Ne.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),Ne.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),Ne.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ne.forEach(this.fi,n=>{const r=se.fromPath(n);return this.gi(e,r).next(e=>{e||t.removeEntry(r,_e.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return Ne.or([()=>Ne.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class ks{constructor(e,t){this.persistence=e,this.pi=new Jn(e=>Fe(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=fs(this,t)}static mi(e,t){return new ks(e,t)}Ei(){}di(e){return Ne.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return Ne.forEach(this.pi,(n,r)=>this.br(e,n,r).next(e=>e?Ne.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,r=>this.br(e,r,t).next(e=>{e||(n++,i.removeEntry(r,_e.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),Ne.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),Ne.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),Ne.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),Ne.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=zt(e.data.value)),t}br(e,t,n){return Ne.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return Ne.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
class Ns{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(e,t){let n=ur(),r=ur();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ns(e,t.fromCache,n,r)}}
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
 */class Rs{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class Os{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return(0,c.nr)()?8:Re((0,c.ZQ)())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.ys(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ws(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Rs;return this.Ss(e,t,n).next(r=>{if(i.result=r,this.Vs)return this.bs(e,t,n,r.size)})}).next(()=>i.result)}bs(e,t,n,r){return n.documentReadCount<this.fs?(C()<=a.$b.DEBUG&&A("QueryEngine","SDK will not create cache indexes for query:",qn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),Ne.resolve()):(C()<=a.$b.DEBUG&&A("QueryEngine","Query:",qn(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(C()<=a.$b.DEBUG&&A("QueryEngine","The SDK decides to create cache indexes for query:",qn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$n(t))):Ne.resolve())}ys(e,t){if(Fn(t))return Ne.resolve(null);let n=$n(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Wn(t,null,"F"),n=$n(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=ur(...r);return this.ps.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.Ds(t,r);return this.Cs(t,s,i,n.readTime)?this.ys(e,Wn(t,null,"F")):this.vs(e,s,t,n)}))})))}ws(e,t,n,r){return Fn(t)||r.isEqual(_e.min())?Ne.resolve(null):this.ps.getDocuments(e,n).next(i=>{const s=this.Ds(t,i);return this.Cs(t,s,n,r)?Ne.resolve(null):(C()<=a.$b.DEBUG&&A("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),qn(t)),this.vs(e,s,t,be(r,Ee)).next(e=>e))})}Ds(e,t){let n=new gt(Xn(e));return t.forEach((t,r)=>{zn(e,r)&&(n=n.add(r))}),n}Cs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,n){return C()<=a.$b.DEBUG&&A("QueryEngine","Using full collection scan to execute query:",qn(t)),this.ps.getDocumentsMatchingQuery(e,t,Ie.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const Ps="LocalStore",Ds=3e8;class Ls{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new dt(z),this.xs=new Jn(e=>Pn(e),Dn),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ms(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function xs(e,t,n,r){return new Ls(e,t,n,r)}async function Ms(e,t){const n=L(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=ur();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:i,addedBatchIds:s}))})})}function Us(e,t){const n=L(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=Ne.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);D(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ur();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function Fs(e){const t=L(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function Vs(e,t){const n=L(e),r=t.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,s.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(Et.EMPTY_BYTE_STRING,_e.min()).withLastLimboFreeSnapshotVersion(_e.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(a,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;const r=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(r>=Ds)return!0;const i=n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size;return i>0}(c,u,s)&&o.push(n.Pi.updateTargetData(e,u))});let a=er(),c=ur();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(js(e,s,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!r.isEqual(_e.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return Ne.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=i,e))}function js(e,t,n){let r=ur(),i=ur();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=er();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(_e.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):A(Ps,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{ks:r,qs:i}})}function $s(e,t){const n=L(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=De),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Bs(e,t){const n=L(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Pi.getTargetData(e,t).next(i=>i?(r=i,Ne.resolve(r)):n.Pi.allocateTargetId(e).next(i=>(r=new Xi(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.Ms.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}async function Hs(e,t,n){const r=L(e),i=r.Ms.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!Oe(e))throw e;A(Ps,`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ms=r.Ms.remove(t),r.xs.delete(i.target)}function Ws(e,t,n){const r=L(e);let i=_e.min(),s=ur();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=L(e),i=r.xs.get(n);return void 0!==i?Ne.resolve(r.Ms.get(i)):r.Pi.getTargetData(t,n)}(r,e,$n(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Fs.getDocumentsMatchingQuery(e,t,n?i:_e.min(),n?s:ur())).next(e=>(Gs(r,Yn(t),e),{documents:e,Qs:s})))}function Gs(e,t,n){let r=e.Os.get(t)||_e.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Os.set(t,r)}class Ks{constructor(){this.activeTargetIds=hr()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qs{constructor(){this.Mo=new Ks,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Ks,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class zs{Oo(e){}shutdown(){}}
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
 */const Ys="ConnectivityMonitor";class Xs{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){A(Ys,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){A(Ys,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let Qs=null;function Js(){return null===Qs?Qs=function(){return 268435456+Math.round(2147483648*Math.random())}():Qs++,"0x"+Qs.toString(16)
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
 */}const Zs="RestConnection",eo={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class to{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===Dt?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,i){const s=Js(),o=this.zo(e,t.toUriEncodedString());A(Zs,`Sending RPC '${e}' ${s}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,i);const{host:u}=new URL(o),l=(0,c.zJ)(u);return this.Jo(e,o,a,n,l).then(t=>(A(Zs,`Received RPC '${e}' ${s}: `,t),t),t=>{throw N(Zs,`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,r,i,s){return this.Go(e,t,n,r,i)}jo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+I}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=eo[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
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
 */class no{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
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
 */const ro="WebChannelConnection";class io extends to{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,i){const s=Js();return new Promise((i,o)=>{const a=new h;a.setWithCredentials(!0),a.listenOnce(d.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case p.NO_ERROR:const t=a.getResponseJson();A(ro,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case p.TIMEOUT:A(ro,`RPC '${e}' ${s} timed out`),o(new M(x.DEADLINE_EXCEEDED,"Request time out"));break;case p.HTTP_ERROR:const n=a.getStatus();if(A(ro,`RPC '${e}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(t)>=0?t:x.UNKNOWN}(t.status);o(new M(e,t.message))}else o(new M(x.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new M(x.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:e,streamId:s,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{A(ro,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(r);A(ro,`RPC '${e}' ${s} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=Js(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=v(),o=y(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const u=i.join("");A(ro,`Creating RPC '${e}' stream ${r}: ${u}`,a);const l=s.createWebChannel(u,a);this.I_(l);let h=!1,d=!1;const p=new no({Yo:t=>{d?A(ro,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(h||(A(ro,`Opening RPC '${e}' stream ${r} transport.`),l.open(),h=!0),A(ro,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},Zo:()=>l.close()}),_=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return _(l,f.EventType.OPEN,()=>{d||(A(ro,`RPC '${e}' stream ${r} transport opened.`),p.o_())}),_(l,f.EventType.CLOSE,()=>{d||(d=!0,A(ro,`RPC '${e}' stream ${r} transport closed`),p.a_(),this.E_(l))}),_(l,f.EventType.ERROR,t=>{d||(d=!0,N(ro,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),p.a_(new M(x.UNAVAILABLE,"The operation could not be completed")))}),_(l,f.EventType.MESSAGE,t=>{if(!d){const n=t.data[0];D(!!n,16349);const i=n,s=i?.error||i[0]?.error;if(s){A(ro,`RPC '${e}' stream ${r} received error:`,s);const t=s.status;let n=function(e){const t=Yr[e];if(void 0!==t)return Jr(t)}(t),i=s.message;void 0===n&&(n=x.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),d=!0,p.a_(new M(n,i)),l.close()}else A(ro,`RPC '${e}' stream ${r} received:`,n),p.u_(n)}}),_(o,g.STAT_EVENT,t=>{t.stat===m.PROXY?A(ro,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===m.NOPROXY&&A(ro,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{p.__()},0),p}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}
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
 */function so(){return"undefined"!=typeof document?document:null}
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
 */function oo(e){return new vi(e,!0)}
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
 */class ao{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&A("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
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
 */const co="PersistentStream";class uo{constructor(e,t,n,r,i,s,o,a){this.Mi=e,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ao(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(k(t.toString()),k("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new M(x.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return A(co,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(A(co,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class lo extends uo{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Li(this.serializer,e),n=function(e){if(!("targetChange"in e))return _e.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?_e.min():t.readTime?Ti(t.readTime):_e.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Oi(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=Ln(r)?{documents:Ui(e,r)}:{query:Fi(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=wi(e,t.resumeToken);const r=_i(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(_e.min())>0){n.readTime=Ei(e,t.snapshotVersion.toTimestamp());const r=_i(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=ji(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Oi(this.serializer),t.removeTarget=e,this.q_(t)}}class ho extends uo{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return D(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,D(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){D(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Mi(e.writeResults,e.commitTime),n=Ti(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Oi(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>xi(this.serializer,e))};this.q_(t)}}
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
 */class fo{}class po extends fo{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new M(x.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,Si(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new M(x.UNKNOWN,e.toString())})}Ho(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Ho(e,Si(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new M(x.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class mo{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(k(t),this.aa=!1):A("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
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
 */const go="RemoteStore";class yo{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{Co(this)&&(A(go,"Restarting streams for network reachability change."),await async function(e){const t=L(e);t.Ea.add(4),await _o(t),t.Ra.set("Unknown"),t.Ea.delete(4),await vo(t)}(this))})}),this.Ra=new mo(n,r)}}async function vo(e){if(Co(e))for(const t of e.da)await t(!0)}async function _o(e){for(const t of e.da)await t(!1)}function Eo(e,t){const n=L(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),So(n)?Io(n):Go(n).O_()&&bo(n,t))}function wo(e,t){const n=L(e),r=Go(n);n.Ia.delete(t),r.O_()&&To(n,t),0===n.Ia.size&&(r.O_()?r.L_():Co(n)&&n.Ra.set("Unknown"))}function bo(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(_e.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Go(e).Y_(t)}function To(e,t){e.Va.Ue(t),Go(e).Z_(t)}function Io(e){e.Va=new fi({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Go(e).start(),e.Ra.ua()}function So(e){return Co(e)&&!Go(e).x_()&&e.Ia.size>0}function Co(e){return 0===L(e).Ea.size}function Ao(e){e.Va=void 0}async function ko(e){e.Ra.set("Online")}async function No(e){e.Ia.forEach((t,n)=>{bo(e,t)})}async function Ro(e,t){Ao(e),So(e)?(e.Ra.ha(t),Io(e)):e.Ra.set("Unknown")}async function Oo(e,t,n){if(e.Ra.set("Online"),t instanceof li&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))}(e,t)}catch(n){A(go,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Po(e,n)}else if(t instanceof ci?e.Va.Ze(t):t instanceof ui?e.Va.st(t):e.Va.tt(t),!n.isEqual(_e.min()))try{const t=await Fs(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ia.get(r);i&&e.Ia.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(Et.EMPTY_BYTE_STRING,r.snapshotVersion)),To(e,t);const i=new Xi(r.target,t,n,r.sequenceNumber);bo(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){A(go,"Failed to raise snapshot:",t),await Po(e,t)}}async function Po(e,t,n){if(!Oe(t))throw t;e.Ea.add(1),await _o(e),e.Ra.set("Offline"),n||(n=()=>Fs(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{A(go,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await vo(e)})}function Do(e,t){return t().catch(n=>Po(e,n,t))}async function Lo(e){const t=L(e),n=Ko(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:De;for(;xo(t);)try{const e=await $s(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,Mo(t,e)}catch(e){await Po(t,e)}Uo(t)&&Fo(t)}function xo(e){return Co(e)&&e.Ta.length<10}function Mo(e,t){e.Ta.push(t);const n=Ko(e);n.O_()&&n.X_&&n.ea(t.mutations)}function Uo(e){return Co(e)&&!Ko(e).x_()&&e.Ta.length>0}function Fo(e){Ko(e).start()}async function Vo(e){Ko(e).ra()}async function jo(e){const t=Ko(e);for(const n of e.Ta)t.ea(n.mutations)}async function $o(e,t,n){const r=e.Ta.shift(),i=Kr.from(r,t,n);await Do(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await Lo(e)}async function Bo(e,t){t&&Ko(e).X_&&await async function(e,t){if(function(e){return Qr(e)&&e!==x.ABORTED}(t.code)){const n=e.Ta.shift();Ko(e).B_(),await Do(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Lo(e)}}(e,t),Uo(e)&&Fo(e)}async function Ho(e,t){const n=L(e);n.asyncQueue.verifyOperationInProgress(),A(go,"RemoteStore received new credentials");const r=Co(n);n.Ea.add(3),await _o(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await vo(n)}async function Wo(e,t){const n=L(e);t?(n.Ea.delete(2),await vo(n)):t||(n.Ea.add(2),await _o(n),n.Ra.set("Unknown"))}function Go(e){return e.ma||(e.ma=function(e,t,n){const r=L(e);return r.sa(),new lo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
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
 */}(e.datastore,e.asyncQueue,{Xo:ko.bind(null,e),t_:No.bind(null,e),r_:Ro.bind(null,e),H_:Oo.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),So(e)?Io(e):e.Ra.set("Unknown")):(await e.ma.stop(),Ao(e))})),e.ma}function Ko(e){return e.fa||(e.fa=function(e,t,n){const r=L(e);return r.sa(),new ho(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:Vo.bind(null,e),r_:Bo.bind(null,e),ta:jo.bind(null,e),na:$o.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await Lo(e)):(await e.fa.stop(),e.Ta.length>0&&(A(go,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
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
 */}class qo{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new U,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new qo(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new M(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function zo(e,t){if(k("AsyncQueue",`${t}: ${e}`),Oe(e))return new M(x.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class Yo{static emptySet(e){return new Yo(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||se.comparator(t.key,n.key):(e,t)=>se.comparator(e.key,t.key),this.keyedMap=nr(),this.sortedSet=new dt(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Yo))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Yo;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
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
 */class Xo{constructor(){this.ga=new dt(se.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):O(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Qo{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Qo(e,t,Yo.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Gn(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class Jo{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Zo{constructor(){this.queries=ea(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=L(e),r=n.queries;n.queries=ea(),r.forEach((e,n)=>{for(const r of n.Sa)r.onError(t)})}(this,new M(x.ABORTED,"Firestore shutting down"))}}function ea(){return new Jn(e=>Kn(e),Gn)}async function ta(e,t){const n=L(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.ba()&&t.Da()&&(r=2):(s=new Jo,r=t.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=zo(e,`Initialization of query '${qn(t.query)}' failed`);return void t.onError(n)}n.queries.set(i,s),s.Sa.push(t),t.va(n.onlineState),s.wa&&t.Fa(s.wa)&&sa(n)}async function na(e,t){const n=L(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.Sa.indexOf(t);e>=0&&(s.Sa.splice(e,1),0===s.Sa.length?i=t.Da()?0:1:!s.ba()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function ra(e,t){const n=L(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(i)&&(r=!0);t.wa=i}}r&&sa(n)}function ia(e,t,n){const r=L(e),i=r.queries.get(t);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(t)}function sa(e){e.Ca.forEach(e=>{e.next()})}var oa,aa;(aa=oa||(oa={})).Ma="default",aa.Cache="cache";class ca{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Qo(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Qo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==oa.Cache}}
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
class ua{constructor(e){this.key=e}}class la{constructor(e){this.key=e}}class ha{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ur(),this.mutatedKeys=ur(),this.eu=Xn(e),this.tu=new Yo(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Xo,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=zn(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),f=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let d=!1;u&&l?u.data.isEqual(l.data)?h!==f&&(n.track({type:3,doc:l}),d=!0):this.su(u,l)||(n.track({type:2,doc:l}),d=!0,(a&&this.eu(l,a)>0||c&&this.eu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),d=!0):u&&!l&&(n.track({type:1,doc:u}),d=!0,(a||c)&&(o=!0)),d&&(l?(s=s.add(l),i=f?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:s,iu:n,Cs:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:e})}};return n(e)-n(t)}
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
 */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,c=a!==this.Za;return this.Za=a,0!==s.length||c?{snapshot:new Qo(this.query,e.tu,i,s,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Xo,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ur(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new la(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new ua(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=ur();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Qo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const fa="SyncEngine";class da{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class pa{constructor(e){this.key=e,this.hu=!1}}class ma{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new Jn(e=>Kn(e),Gn),this.Iu=new Map,this.Eu=new Set,this.du=new dt(se.comparator),this.Au=new Map,this.Ru=new _s,this.Vu={},this.mu=new Map,this.fu=ss.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function ga(e,t,n=!0){const r=Fa(e);let i;const s=r.Tu.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await va(r,t,n,!0),i}async function ya(e,t){const n=Fa(e);await va(n,t,!0,!1)}async function va(e,t,n,r){const i=await Bs(e.localStore,$n(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await _a(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&Eo(e.remoteStore,i),a}async function _a(e,t,n,r,i){e.pu=(t,n,r)=>async function(e,t,n,r){let i=t.view.ru(n);i.Cs&&(i=await Ws(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return Pa(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const s=await Ws(e.localStore,t,!0),o=new ha(t,s.Qs),a=o.ru(s.documents),c=ai.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);Pa(e,n,u.au);const l=new da(t,n,o);return e.Tu.set(t,l),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),u.snapshot}async function Ea(e,t,n){const r=L(e),i=r.Tu.get(t),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(e=>!Gn(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Hs(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&wo(r.remoteStore,i.targetId),Ra(r,i.targetId)}).catch(ke)):(Ra(r,i.targetId),await Hs(r.localStore,i.targetId,!0))}async function wa(e,t){const n=L(e),r=n.Tu.get(t),i=n.Iu.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),wo(n.remoteStore,r.targetId))}async function ba(e,t,n){const r=Va(e);try{const e=await function(e,t){const n=L(e),r=ve.now(),i=t.reduce((e,t)=>e.add(t.key),ur());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=er(),c=ur();return n.Ns.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=Mr(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Vr(e.key,t,on(t.value.mapValue),Rr.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:rr(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||(r=new dt(z)),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r}(r,e.batchId,n),await xa(r,e.changes),await Lo(r.remoteStore)}catch(e){const t=zo(e,"Failed to persist write");n.reject(t)}}async function Ta(e,t){const n=L(e);try{const e=await Vs(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(D(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?D(r.hu,14607):e.removedDocuments.size>0&&(D(r.hu,42227),r.hu=!1))}),await xa(n,e,t)}catch(e){await ke(e)}}function Ia(e,t,n){const r=L(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const i=r.view.va(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=L(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.Sa)i.va(t)&&(r=!0)}),r&&sa(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Sa(e,t,n){const r=L(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Au.get(t),s=i&&i.key;if(s){let e=new dt(se.comparator);e=e.insert(s,an.newNoDocument(s,_e.min()));const n=ur().add(s),i=new oi(_e.min(),new Map,new dt(z),e,n);await Ta(r,i),r.du=r.du.remove(s),r.Au.delete(t),La(r)}else await Hs(r.localStore,t,!1).then(()=>Ra(r,t,n)).catch(ke)}async function Ca(e,t){const n=L(e),r=t.batch.batchId;try{const e=await Us(n.localStore,t);Na(n,r,null),ka(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await xa(n,e)}catch(e){await ke(e)}}async function Aa(e,t,n){const r=L(e);try{const e=await function(e,t){const n=L(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(D(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);Na(r,t,n),ka(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await xa(r,e)}catch(n){await ke(n)}}function ka(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function Na(e,t,n){const r=L(e);let i=r.Vu[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.Vu[r.currentUser.toKey()]=i}}function Ra(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||Oa(e,t)})}function Oa(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(wo(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),La(e))}function Pa(e,t,n){for(const r of n)r instanceof ua?(e.Ru.addReference(r.key,t),Da(e,r)):r instanceof la?(A(fa,"Document no longer in limbo: "+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||Oa(e,r.key)):O(19791,{wu:r})}function Da(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(A(fa,"New document in limbo: "+n),e.Eu.add(r),La(e))}function La(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new se(ne.fromString(t)),r=e.fu.next();e.Au.set(r,new pa(n)),e.du=e.du.insert(n,r),Eo(e.remoteStore,new Xi($n(Un(n.path)),r,"TargetPurposeLimboResolution",Pe.ce))}}async function xa(e,t,n){const r=L(e),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){i.push(e);const t=Ns.As(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.Pu.H_(i),await async function(e,t){const n=L(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>Ne.forEach(t,t=>Ne.forEach(t.Es,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>Ne.forEach(t.ds,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Oe(e))throw e;A(Ps,"Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.Ms.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(e,i)}}}(r.localStore,s))}async function Ma(e,t){const n=L(e);if(!n.currentUser.isEqual(t)){A(fa,"User change. New user:",t.toKey());const e=await Ms(n.localStore,t);n.currentUser=t,function(e,t){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new M(x.CANCELLED,t))})}),e.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await xa(n,e.Ls)}}function Ua(e,t){const n=L(e),r=n.Au.get(t);if(r&&r.hu)return ur().add(r.key);{let e=ur();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function Fa(e){const t=L(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ta.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ua.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Sa.bind(null,t),t.Pu.H_=ra.bind(null,t.eventManager),t.Pu.yu=ia.bind(null,t.eventManager),t}function Va(e){const t=L(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ca.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Aa.bind(null,t),t}class ja{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=oo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return xs(this.persistence,new Os,e.initialUser,this.serializer)}Cu(e){return new Ss(As.mi,this.serializer)}Du(e){return new qs}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ja.provider={build:()=>new ja};class $a extends ja{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){D(this.persistence.referenceDelegate instanceof ks,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new ls(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?is.withCacheSize(this.cacheSizeBytes):is.DEFAULT;return new Ss(e=>ks.mi(e,t),this.serializer)}}class Ba{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Ia(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ma.bind(null,this.syncEngine),await Wo(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Zo}()}createDatastore(e){const t=oo(e.databaseInfo.databaseId),n=function(e){return new io(e)}(e.databaseInfo);return function(e,t,n,r){return new po(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,i){return new yo(e,t,n,r,i)}(this.localStore,this.datastore,e.asyncQueue,e=>Ia(this.syncEngine,e,0),function(){return Xs.v()?new Xs:new zs}())}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new ma(e,t,n,r,i,s);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=L(e);A(go,"RemoteStore shutting down."),t.Ea.add(5),await _o(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ba.provider={build:()=>new Ba};
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
class Ha{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):k("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
const Wa="FirestoreClient";class Ga{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=T.UNAUTHENTICATED,this.clientId=q.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{A(Wa,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(A(Wa,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new U;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=zo(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ka(e,t){e.asyncQueue.verifyOperationInProgress(),A(Wa,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Ms(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function qa(e,t){e.asyncQueue.verifyOperationInProgress();const n=await za(e);A(Wa,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Ho(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Ho(t.remoteStore,n)),e._onlineComponents=t}async function za(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){A(Wa,"Using user provided OfflineComponentProvider");try{await Ka(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===x.FAILED_PRECONDITION||e.code===x.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;N("Error using user provided cache. Falling back to memory cache: "+n),await Ka(e,new ja)}}else A(Wa,"Using default OfflineComponentProvider"),await Ka(e,new $a(void 0));return e._offlineComponents}async function Ya(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(A(Wa,"Using user provided OnlineComponentProvider"),await qa(e,e._uninitializedComponentsProvider._online)):(A(Wa,"Using default OnlineComponentProvider"),await qa(e,new Ba))),e._onlineComponents}function Xa(e){return Ya(e).then(e=>e.syncEngine)}async function Qa(e){const t=await Ya(e),n=t.eventManager;return n.onListen=ga.bind(null,t.syncEngine),n.onUnlisten=Ea.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=ya.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=wa.bind(null,t.syncEngine),n}function Ja(e,t,n={}){const r=new U;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Ha({next:a=>{s.Nu(),t.enqueueAndForget(()=>na(e,o));const c=a.docs.has(n);!c&&a.fromCache?i.reject(new M(x.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?i.reject(new M(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new ca(Un(n.path),s,{includeMetadataChanges:!0,qa:!0});return ta(e,o)}(await Qa(e),e.asyncQueue,t,n,r)),r.promise}function Za(e,t,n={}){const r=new U;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Ha({next:n=>{s.Nu(),t.enqueueAndForget(()=>na(e,o)),n.fromCache&&"server"===r.source?i.reject(new M(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new ca(n,s,{includeMetadataChanges:!0,qa:!0});return ta(e,o)}(await Qa(e),e.asyncQueue,t,n,r)),r.promise}
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
function ec(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
 */}const tc=new Map,nc="firestore.googleapis.com",rc=!0;
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
 */class ic{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new M(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=nc,this.ssl=rc}else this.host=e.host,this.ssl=e.ssl??rc;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=rs;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<as)throw new M(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ae("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ec(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new M(x.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new M(x.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new M(x.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sc{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ic({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new M(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ic(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new V;switch(e.type){case"firstParty":return new H(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new M(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=tc.get(e);t&&(A("ComponentProvider","Removing Datastore"),tc.delete(e),t.terminate())}(this),Promise.resolve()}}function oc(e,t,n,r={}){e=fe(e,sc);const i=(0,c.zJ)(t),s=e._getSettings(),o={...s,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;i&&((0,c.gE)(`https://${a}`),(0,c.P1)("Firestore",!0)),s.host!==nc&&s.host!==a&&N("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:a,ssl:i,emulatorOptions:r};if(!(0,c.bD)(u,o)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=T.MOCK_USER;else{t=(0,c.Fy)(r.mockUserToken,e._app?.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new M(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new T(i)}e._authCredentials=new j(new F(t,n))}}
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
 */class ac{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ac(this.firestore,e,this._query)}}class cc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new uc(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new cc(this.firestore,e,this._key)}toJSON(){return{type:cc._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(me(t,cc._jsonSchema))return new cc(e,n||null,new se(ne.fromString(t.referencePath)))}}cc._jsonSchemaVersion="firestore/documentReference/1.0",cc._jsonSchema={type:pe("string",cc._jsonSchemaVersion),referencePath:pe("string")};class uc extends ac{constructor(e,t,n){super(e,t,Un(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new cc(this.firestore,null,new se(e))}withConverter(e){return new uc(this.firestore,e,this._path)}}function lc(e,t,...n){if(e=(0,c.Ku)(e),oe("collection","path",t),e instanceof sc){const r=ne.fromString(t,...n);return ue(r),new uc(e,null,r)}{if(!(e instanceof cc||e instanceof uc))throw new M(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ne.fromString(t,...n));return ue(r),new uc(e.firestore,null,r)}}function hc(e,t){if(e=fe(e,sc),oe("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new M(x.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ac(e,null,function(e){return new xn(ne.emptyPath(),e)}(t))}function fc(e,t,...n){if(e=(0,c.Ku)(e),1===arguments.length&&(t=q.newId()),oe("doc","path",t),e instanceof sc){const r=ne.fromString(t,...n);return ce(r),new cc(e,null,new se(r))}{if(!(e instanceof cc||e instanceof uc))throw new M(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ne.fromString(t,...n));return ce(r),new cc(e.firestore,e instanceof uc?e.converter:null,new se(r))}}
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
const dc="AsyncQueue";class pc{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ao(this,"async_queue_retry"),this._c=()=>{const e=so();e&&A(dc,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=so();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=so();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new U;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Oe(e))throw e;A(dc,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,k("INTERNAL UNHANDLED ERROR: ",mc(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=qo.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&O(47125,{Pc:mc(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function mc(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
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
 */}function gc(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
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
 */(e,["next","error","complete"])}class yc extends sc{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new pc,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pc(e),this._firestoreClient=void 0,await e}}}function vc(e,t){const n="object"==typeof e?e:(0,s.Sx)(),r="string"==typeof e?e:t||Dt,i=(0,s.j6)(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const e=(0,c.yU)("firestore");e&&oc(i,...e)}return i}function _c(e){if(e._terminated)throw new M(x.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||Ec(e),e._firestoreClient}function Ec(e){const t=e._freezeSettings(),n=function(e,t,n,r){return new Pt(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,ec(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator)}(e._databaseId,e._app?.options.appId||"",e._persistenceKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new Ga(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
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
class wc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new wc(Et.fromBase64String(e))}catch(e){throw new M(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new wc(Et.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:wc._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(me(e,wc._jsonSchema))return wc.fromBase64String(e.bytes)}}wc._jsonSchemaVersion="firestore/bytes/1.0",wc._jsonSchema={type:pe("string",wc._jsonSchemaVersion),bytes:pe("string")};
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
class bc{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new M(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
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
class Tc{constructor(e){this._methodName=e}}
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
 */class Ic{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ic._jsonSchemaVersion}}static fromJSON(e){if(me(e,Ic._jsonSchema))return new Ic(e.latitude,e.longitude)}}Ic._jsonSchemaVersion="firestore/geoPoint/1.0",Ic._jsonSchema={type:pe("string",Ic._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};
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
class Sc{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Sc._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(me(e,Sc._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Sc(e.vectorValues);throw new M(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Sc._jsonSchemaVersion="firestore/vectorValue/1.0",Sc._jsonSchema={type:pe("string",Sc._jsonSchemaVersion),vectorValues:pe("object")};
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
const Cc=/^__.*__$/;class Ac{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Vr(e,this.data,this.fieldMask,t,this.fieldTransforms):new Fr(e,this.data,t,this.fieldTransforms)}}class kc{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Vr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Nc(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:e})}}class Rc{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Rc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Kc(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(Nc(this.Ac)&&Cc.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Oc{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||oo(e)}Cc(e,t,n,r=!1){return new Rc({Ac:e,methodName:t,Dc:n,path:ie.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Pc(e){const t=e._freezeSettings(),n=oo(e._databaseId);return new Oc(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Dc(e,t,n,r,i,s={}){const o=e.Cc(s.merge||s.mergeFields?2:0,t,n,i);Bc("Data must be an object, but it was:",o,r);const a=jc(r,o);let c,u;if(s.merge)c=new vt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=Hc(t,r,n);if(!o.contains(i))throw new M(x.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);qc(e,i)||e.push(i)}c=new vt(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new Ac(new sn(a),c,u)}class Lc extends Tc{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Lc}}class xc extends Tc{_toFieldTransform(e){return new Ar(e.path,new _r)}isEqual(e){return e instanceof xc}}function Mc(e,t,n,r){const i=e.Cc(1,t,n);Bc("Data must be an object, but it was:",i,r);const s=[],o=sn.empty();ht(r,(e,r)=>{const a=Gc(t,e,n);r=(0,c.Ku)(r);const u=i.yc(a);if(r instanceof Lc)s.push(a);else{const e=Vc(r,u);null!=e&&(s.push(a),o.set(a,e))}});const a=new vt(s);return new kc(o,a,i.fieldTransforms)}function Uc(e,t,n,r,i,s){const o=e.Cc(1,t,n),a=[Hc(t,r,n)],u=[i];if(s.length%2!=0)throw new M(x.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let c=0;c<s.length;c+=2)a.push(Hc(t,s[c])),u.push(s[c+1]);const l=[],h=sn.empty();for(let d=a.length-1;d>=0;--d)if(!qc(l,a[d])){const e=a[d];let t=u[d];t=(0,c.Ku)(t);const n=o.yc(e);if(t instanceof Lc)l.push(e);else{const r=Vc(t,n);null!=r&&(l.push(e),h.set(e,r))}}const f=new vt(l);return new kc(h,f,o.fieldTransforms)}function Fc(e,t,n,r=!1){return Vc(n,e.Cc(r?4:3,t))}function Vc(e,t){if($c(e=(0,c.Ku)(e)))return Bc("Unsupported field value:",t,e),jc(e,t);if(e instanceof Tc)return function(e,t){if(!Nc(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Vc(i,t.wc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,c.Ku)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return pr(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ve.fromDate(e);return{timestampValue:Ei(t.serializer,n)}}if(e instanceof ve){const n=new ve(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Ei(t.serializer,n)}}if(e instanceof Ic)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof wc)return{bytesValue:wi(t.serializer,e._byteString)};if(e instanceof cc){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ii(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Sc)return function(e,t){const n={fields:{[xt]:{stringValue:Ft},[Vt]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return fr(t.serializer,e)})}}}};return{mapValue:n}}(e,t);throw t.Sc(`Unsupported field value: ${he(e)}`)}(e,t)}function jc(e,t){const n={};return ft(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ht(e,(e,r)=>{const i=Vc(r,t.mc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function $c(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ve||e instanceof Ic||e instanceof wc||e instanceof cc||e instanceof Tc||e instanceof Sc)}function Bc(e,t,n){if(!$c(n)||!le(n)){const r=he(n);throw"an object"===r?t.Sc(e+" a custom object"):t.Sc(e+" "+r)}}function Hc(e,t,n){if((t=(0,c.Ku)(t))instanceof bc)return t._internalPath;if("string"==typeof t)return Gc(e,t);throw Kc("Field path arguments must be of type string or ",e,!1,void 0,n)}const Wc=new RegExp("[~\\*/\\[\\]]");function Gc(e,t,n){if(t.search(Wc)>=0)throw Kc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new bc(...t.split("."))._internalPath}catch(r){throw Kc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Kc(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new M(x.INVALID_ARGUMENT,a+e+c)}function qc(e,t){return e.some(e=>e.isEqual(t))}
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
 */class zc{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new cc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Yc(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Xc("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Yc extends zc{data(){return super.data()}}function Xc(e,t){return"string"==typeof t?Gc(e,t):t instanceof bc?t._internalPath:t._delegate._internalPath}
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
 */function Qc(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new M(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Jc{}class Zc extends Jc{}function eu(e,t,...n){let r=[];t instanceof Jc&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof ru).length,n=e.filter(e=>e instanceof tu).length;if(t>1||t>0&&n>0)throw new M(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
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
 */(r);for(const i of r)e=i._apply(e);return e}class tu extends Zc{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new tu(e,t,n)}_apply(e){const t=this._parse(e);return lu(e._query,t),new ac(e.firestore,e.converter,Hn(e._query,t))}_parse(e){const t=Pc(e.firestore),n=function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new M(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){uu(o,s);const t=[];for(const n of o)t.push(cu(r,e,n));a={arrayValue:{values:t}}}else a=cu(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||uu(o,s),a=Fc(n,t,o,"in"===s||"not-in"===s);const c=pn.create(i,s,a);return c}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function nu(e,t,n){const r=t,i=Xc("where",e);return tu._create(i,r,n)}class ru extends Jc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ru(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:mn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)lu(n,i),n=Hn(n,i)}(e._query,t),new ac(e.firestore,e.converter,Hn(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class iu extends Zc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new iu(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new M(x.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new M(x.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new hn(t,n);return r}(e._query,this._field,this._direction);return new ac(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new xn(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function su(e,t="asc"){const n=t,r=Xc("orderBy",e);return iu._create(r,n)}class ou extends Zc{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ou(e,t,n)}_apply(e){return new ac(e.firestore,e.converter,Wn(e._query,this._limit,this._limitType))}}function au(e){return de("limit",e),ou._create("limit",e,"F")}function cu(e,t,n){if("string"==typeof(n=(0,c.Ku)(n))){if(""===n)throw new M(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Vn(t)&&-1!==n.indexOf("/"))throw new M(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(ne.fromString(n));if(!se.isDocumentKey(r))throw new M(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Yt(e,new se(r))}if(n instanceof cc)return Yt(e,n._key);throw new M(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${he(n)}.`)}function uu(e,t){if(!Array.isArray(e)||0===e.length)throw new M(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function lu(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new M(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new M(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class hu{convertValue(e,t="none"){switch(jt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Tt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(It(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw O(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return ht(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[Vt].arrayValue?.values?.map(e=>Tt(e.doubleValue));return new Sc(t)}convertGeoPoint(e){return new Ic(Tt(e.latitude),Tt(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Rt(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Ot(e));default:return null}}convertTimestamp(e){const t=bt(e);return new ve(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ne.fromString(e);D(Yi(n),9688,{name:e});const r=new Lt(n.get(1),n.get(3)),i=new se(n.popFirst(5));return r.isEqual(t)||k(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
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
 */function fu(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class du{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pu extends zc{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new mu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Xc("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=pu._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}pu._jsonSchemaVersion="firestore/documentSnapshot/1.0",pu._jsonSchema={type:pe("string",pu._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class mu extends pu{data(e={}){return super.data(e)}}class gu{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new du(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new mu(this._firestore,this._userDataWriter,n.key,n,new du(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new mu(e._firestore,e._userDataWriter,n.doc.key,n.doc,new du(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new mu(e._firestore,e._userDataWriter,t.doc.key,t.doc,new du(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:yu(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=gu._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=q.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function yu(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:e})}}
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
function vu(e){e=fe(e,cc);const t=fe(e.firestore,yc);return Ja(_c(t),e._key).then(n=>Su(t,e,n))}gu._jsonSchemaVersion="firestore/querySnapshot/1.0",gu._jsonSchema={type:pe("string",gu._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};class _u extends hu{constructor(e){super(),this.firestore=e}convertBytes(e){return new wc(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new cc(this.firestore,null,t)}}function Eu(e){e=fe(e,ac);const t=fe(e.firestore,yc),n=_c(t),r=new _u(t);return Qc(e._query),Za(n,e._query).then(n=>new gu(t,r,e,n))}function wu(e,t,n){e=fe(e,cc);const r=fe(e.firestore,yc),i=fu(e.converter,t,n);return Iu(r,[Dc(Pc(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,Rr.none())])}function bu(e,t,n,...r){e=fe(e,cc);const i=fe(e.firestore,yc),s=Pc(i);let o;return o="string"==typeof(t=(0,c.Ku)(t))||t instanceof bc?Uc(s,"updateDoc",e._key,t,n,r):Mc(s,"updateDoc",e._key,t),Iu(i,[o.toMutation(e._key,Rr.exists(!0))])}function Tu(e,...t){e=(0,c.Ku)(e);let n={includeMetadataChanges:!1,source:"default"},r=0;"object"!=typeof t[r]||gc(t[r])||(n=t[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(gc(t[r])){const e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let s,o,a;if(e instanceof cc)o=fe(e.firestore,yc),a=Un(e._key.path),s={next:n=>{t[r]&&t[r](Su(o,e,n))},error:t[r+1],complete:t[r+2]};else{const n=fe(e,ac);o=fe(n.firestore,yc),a=n._query;const i=new _u(o);s={next:e=>{t[r]&&t[r](new gu(o,i,n,e))},error:t[r+1],complete:t[r+2]},Qc(e._query)}return function(e,t,n,r){const i=new Ha(r),s=new ca(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>ta(await Qa(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>na(await Qa(e),s))}}(_c(o),a,i,s)}function Iu(e,t){return function(e,t){const n=new U;return e.asyncQueue.enqueueAndForget(async()=>ba(await Xa(e),t,n)),n.promise}(_c(e),t)}function Su(e,t,n){const r=n.docs.get(t._key),i=new _u(e);return new pu(e,i,t._key,r,new du(n.hasPendingWrites,n.fromCache),t.converter)}
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
class Cu{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Pc(e)}set(e,t,n){this._verifyNotCommitted();const r=Au(e,this._firestore),i=fu(r.converter,t,n),s=Dc(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,Rr.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=Au(e,this._firestore);let s;return s="string"==typeof(t=(0,c.Ku)(t))||t instanceof bc?Uc(this._dataReader,"WriteBatch.update",i._key,t,n,r):Mc(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,Rr.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Au(e,this._firestore);return this._mutations=this._mutations.concat(new Hr(t._key,Rr.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new M(x.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Au(e,t){if((e=(0,c.Ku)(e)).firestore!==t)throw new M(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
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
 */function ku(){return new xc("serverTimestamp")}
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
function Nu(e){return _c(e=fe(e,yc)),new Cu(e,t=>Iu(e,t))
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
 */}new WeakMap;
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
 */!function(e,t=!0){!function(e){I=e}(s.MF),(0,s.om)(new o.uA("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new yc(new $(e.getProvider("auth-internal")),new G(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new M(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Lt(e.options.projectId,t)}(i,n),i);return r={useFetchStreams:t,...r},s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,s.KO)(w,b,e),(0,s.KO)(w,b,"esm2020")}()},2839:function(e,t,n){var r=n(4576),i=r.navigator,s=i&&i.userAgent;e.exports=s?String(s):""},2967:function(e,t,n){var r=n(6706),i=n(34),s=n(7750),o=n(3506);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.prototype,"__proto__","set"),e(n,[]),t=n instanceof Array}catch(a){}return function(n,r){return s(n),o(r),i(n)?(t?e(n,r):n.__proto__=r,n):n}}():void 0)},3001:function(e,t,n){n.d(t,{hU:function(){return Pr}});var r={};n.r(r),n.d(r,{BaseTransition:function(){return Vn.pR},BaseTransitionPropsValidators:function(){return Vn.QP},Comment:function(){return Vn.Mw},DeprecationTypes:function(){return Vn.aT},EffectScope:function(){return Vn.yC},ErrorCodes:function(){return Vn.tG},ErrorTypeStrings:function(){return Vn.ZQ},Fragment:function(){return Vn.FK},KeepAlive:function(){return Vn.PR},ReactiveEffect:function(){return Vn.X2},Static:function(){return Vn.jC},Suspense:function(){return Vn.tY},Teleport:function(){return Vn.Im},Text:function(){return Vn.EY},TrackOpTypes:function(){return Vn.Ul},Transition:function(){return Vn.eB},TransitionGroup:function(){return Vn.F},TriggerOpTypes:function(){return Vn.PP},VueElement:function(){return Vn.Vy},assertNumber:function(){return Vn.U4},callWithAsyncErrorHandling:function(){return Vn.qL},callWithErrorHandling:function(){return Vn.gh},camelize:function(){return Vn.PT},capitalize:function(){return Vn.ZH},cloneVNode:function(){return Vn.E3},compatUtils:function(){return Vn.Y5},compile:function(){return jn},computed:function(){return Vn.EW},createApp:function(){return Vn.Ef},createBlock:function(){return Vn.Wv},createCommentVNode:function(){return Vn.Q3},createElementBlock:function(){return Vn.CE},createElementVNode:function(){return Vn.Lk},createHydrationRenderer:function(){return Vn.ci},createPropsRestProxy:function(){return Vn.bn},createRenderer:function(){return Vn.K9},createSSRApp:function(){return Vn.m1},createSlots:function(){return Vn.eX},createStaticVNode:function(){return Vn.Fv},createTextVNode:function(){return Vn.eW},createVNode:function(){return Vn.bF},customRef:function(){return Vn.rY},defineAsyncComponent:function(){return Vn.$V},defineComponent:function(){return Vn.pM},defineCustomElement:function(){return Vn.Xq},defineEmits:function(){return Vn.qP},defineExpose:function(){return Vn.wk},defineModel:function(){return Vn.NP},defineOptions:function(){return Vn.GM},defineProps:function(){return Vn.Yj},defineSSRCustomElement:function(){return Vn.Po},defineSlots:function(){return Vn.Lu},devtools:function(){return Vn.lt},effect:function(){return Vn.QZ},effectScope:function(){return Vn.uY},getCurrentInstance:function(){return Vn.nI},getCurrentScope:function(){return Vn.o5},getCurrentWatcher:function(){return Vn.Yv},getTransitionRawChildren:function(){return Vn.Df},guardReactiveProps:function(){return Vn.Ng},h:function(){return Vn.h},handleError:function(){return Vn.H4},hasInjectionContext:function(){return Vn.PS},hydrate:function(){return Vn.Qv},hydrateOnIdle:function(){return Vn.rU},hydrateOnInteraction:function(){return Vn.Tq},hydrateOnMediaQuery:function(){return Vn.dA},hydrateOnVisible:function(){return Vn.Pn},initCustomFormatter:function(){return Vn.y$},initDirectivesForSSR:function(){return Vn.Ib},inject:function(){return Vn.WQ},isMemoSame:function(){return Vn.Bs},isProxy:function(){return Vn.ju},isReactive:function(){return Vn.g8},isReadonly:function(){return Vn.Tm},isRef:function(){return Vn.i9},isRuntimeOnly:function(){return Vn.wX},isShallow:function(){return Vn.fE},isVNode:function(){return Vn.vv},markRaw:function(){return Vn.IG},mergeDefaults:function(){return Vn.HF},mergeModels:function(){return Vn.zz},mergeProps:function(){return Vn.v6},nextTick:function(){return Vn.dY},normalizeClass:function(){return Vn.C4},normalizeProps:function(){return Vn._B},normalizeStyle:function(){return Vn.Tr},onActivated:function(){return Vn.n},onBeforeMount:function(){return Vn.KC},onBeforeUnmount:function(){return Vn.xo},onBeforeUpdate:function(){return Vn.Ic},onDeactivated:function(){return Vn.Y4},onErrorCaptured:function(){return Vn.qG},onMounted:function(){return Vn.sV},onRenderTracked:function(){return Vn.qR},onRenderTriggered:function(){return Vn.bj},onScopeDispose:function(){return Vn.jr},onServerPrefetch:function(){return Vn.SS},onUnmounted:function(){return Vn.hi},onUpdated:function(){return Vn.$u},onWatcherCleanup:function(){return Vn.ch},openBlock:function(){return Vn.uX},popScopeId:function(){return Vn.jt},provide:function(){return Vn.Gt},proxyRefs:function(){return Vn.Pr},pushScopeId:function(){return Vn.Qi},queuePostFlushCb:function(){return Vn.Dl},reactive:function(){return Vn.Kh},readonly:function(){return Vn.tB},ref:function(){return Vn.KR},registerRuntimeCompiler:function(){return Vn.tC},render:function(){return Vn.XX},renderList:function(){return Vn.pI},renderSlot:function(){return Vn.RG},resolveComponent:function(){return Vn.g2},resolveDirective:function(){return Vn.gN},resolveDynamicComponent:function(){return Vn.$y},resolveFilter:function(){return Vn.LJ},resolveTransitionHooks:function(){return Vn.OW},setBlockTracking:function(){return Vn.Vq},setDevtoolsHook:function(){return Vn.iD},setTransitionHooks:function(){return Vn.MZ},shallowReactive:function(){return Vn.Gc},shallowReadonly:function(){return Vn.nD},shallowRef:function(){return Vn.IJ},ssrContextKey:function(){return Vn.Fw},ssrUtils:function(){return Vn.Gw},stop:function(){return Vn.ds},toDisplayString:function(){return Vn.v_},toHandlerKey:function(){return Vn.Kf},toHandlers:function(){return Vn.Tb},toRaw:function(){return Vn.ux},toRef:function(){return Vn.lW},toRefs:function(){return Vn.QW},toValue:function(){return Vn.BA},transformVNodeArgs:function(){return Vn.gW},triggerRef:function(){return Vn.mu},unref:function(){return Vn.R1},useAttrs:function(){return Vn.OA},useCssModule:function(){return Vn.D},useCssVars:function(){return Vn.$9},useHost:function(){return Vn.KT},useId:function(){return Vn.Bi},useModel:function(){return Vn.fn},useSSRContext:function(){return Vn.LM},useShadowRoot:function(){return Vn._U},useSlots:function(){return Vn.Ht},useTemplateRef:function(){return Vn.rk},useTransitionState:function(){return Vn.Gy},vModelCheckbox:function(){return Vn.lH},vModelDynamic:function(){return Vn.hp},vModelRadio:function(){return Vn.XL},vModelSelect:function(){return Vn.u1},vModelText:function(){return Vn.Jo},vShow:function(){return Vn.aG},version:function(){return Vn.rE},warn:function(){return Vn.R8},watch:function(){return Vn.wB},watchEffect:function(){return Vn.nT},watchPostEffect:function(){return Vn.p9},watchSyncEffect:function(){return Vn.U_},withAsyncContext:function(){return Vn.E},withCtx:function(){return Vn.k6},withDefaults:function(){return Vn.rO},withDirectives:function(){return Vn.bo},withKeys:function(){return Vn.jR},withMemo:function(){return Vn.bU},withModifiers:function(){return Vn.D$},withScopeId:function(){return Vn.YY}});n(4114),n(8111),n(2489),n(116),n(7588),n(1701),n(8237),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);
/*!
  * shared v11.4.8
  * (c) 2026 kazuya kawaguchi
  * Released under the MIT License.
  */
const i="undefined"!==typeof window;const s=(e,t=!1)=>t?Symbol.for(e):Symbol(e),o=(e,t,n)=>a({l:e,k:t,s:n}),a=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),c=e=>"number"===typeof e&&isFinite(e),u=e=>"[object Date]"===C(e),l=e=>"[object RegExp]"===C(e),h=e=>A(e)&&0===Object.keys(e).length,f=Object.assign,d=Object.create,p=(e=null)=>d(e);let m;const g=()=>m||(m="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof global?global:p()),y=Object.prototype.hasOwnProperty;function v(e,t){return y.call(e,t)}const _=Array.isArray,E=e=>"function"===typeof e,w=e=>"string"===typeof e,b=e=>"boolean"===typeof e,T=e=>null!==e&&"object"===typeof e,I=e=>T(e)&&E(e.then)&&E(e.catch),S=Object.prototype.toString,C=e=>S.call(e),A=e=>"[object Object]"===C(e),k=e=>null==e?"":_(e)||A(e)&&e.toString===S?JSON.stringify(e,null,2):String(e);function N(e,t=""){return e.reduce((e,n,r)=>0===r?e+n:e+t+n,"")}function R(e,t){"undefined"!==typeof console&&(console.warn("[intlify] "+e),t&&console.warn(t.stack))}function O(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/\//g,"&#x2F;").replace(/=/g,"&#x3D;")}function P(e){return e.replace(/&(?![a-z0-9#]{2,6};)/gi,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const D=/^javascript:/i,L=/^(?:href|src|action|formaction)$/i,x=/&#(?:x([0-9a-f]+)|(\d+));?/gi,M=/&(?:Tab|NewLine);/g,U=/&colon;?/gi,F=/[\u0000-\u0020\u007f-\u009f]/g,V=/(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i,j=/(^|[\s"'<>/])on(\w+\s*=)/gi,$=/(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;function B(e,t,n){const r=t||n;if(!r)return e;const i=Number.parseInt(r,t?16:10);return i<=127?String.fromCharCode(i):e}function H(e){const t=e.replace(x,B).replace(M,"").replace(U,":").replace(F,"");return D.test(t)}function W(e){const t=/url\s*\(/gi;let n,r="",i=0;while(null!==(n=t.exec(e))){const s=n.index,o=t.lastIndex-1;let a=o+1,c=1,u=null;for(;a<e.length;a++){const t=e[a];if(u)t===u&&(u=null);else if('"'===t||"'"===t)u=t;else if("("===t)c++;else if(")"===t&&(c--,0===c))break}if(0!==c)break;const l=e.slice(o+1,a).trim(),h=l.startsWith('"')&&l.endsWith('"')||l.startsWith("'")&&l.endsWith("'")?l.slice(1,-1).trim():l;r+=e.slice(i,s),r+=H(h)?"url(about:blank)":e.slice(s,a+1),i=a+1}return r+e.slice(i)}function G(e,t){if(L.test(e)&&H(t))return"about:blank";const n="style"===e.toLowerCase()?W(t):t;return P(n)}function K(e){return e=e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g,(e,t,n)=>`${t}="${G(t,n)}"`),e=e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g,(e,t,n)=>`${t}='${G(t,n)}'`),V.test(e)&&(e=e.replace(j,"$1&#111;n$2")),e=e.replace($,(e,t,n,r)=>H(r)?`${t}${n}about:blank`:e),e}const q=e=>!T(e)||_(e);function z(e,t){if(q(e)||q(t))throw new Error("Invalid value");const n=[{src:e,des:t}];while(n.length){const{src:e,des:t}=n.pop();Object.keys(e).forEach(r=>{"__proto__"!==r&&(T(e[r])&&!T(t[r])&&(t[r]=Array.isArray(e[r])?[]:p()),q(t[r])||q(e[r])?t[r]=e[r]:n.push({src:e[r],des:t[r]}))})}}function Y(e,t,n){return{line:e,column:t,offset:n}}function X(e,t,n){const r={start:e,end:t};return null!=n&&(r.source=n),r}const Q={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,UNHANDLED_CODEGEN_NODE_TYPE:15,UNHANDLED_MINIFIER_NODE_TYPE:16},J=17;Q.EXPECTED_TOKEN,Q.INVALID_TOKEN_IN_PLACEHOLDER,Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,Q.UNKNOWN_ESCAPE_SEQUENCE,Q.INVALID_UNICODE_ESCAPE_SEQUENCE,Q.UNBALANCED_CLOSING_BRACE,Q.UNTERMINATED_CLOSING_BRACE,Q.EMPTY_PLACEHOLDER,Q.NOT_ALLOW_NEST_PLACEHOLDER,Q.INVALID_LINKED_FORMAT,Q.MUST_HAVE_MESSAGES_IN_PLURAL,Q.UNEXPECTED_EMPTY_LINKED_MODIFIER,Q.UNEXPECTED_EMPTY_LINKED_KEY,Q.UNEXPECTED_LEXICAL_ANALYSIS,Q.UNHANDLED_CODEGEN_NODE_TYPE,Q.UNHANDLED_MINIFIER_NODE_TYPE;function Z(e,t,n={}){const{domain:r,messages:i,args:s}=n,o=e,a=new SyntaxError(String(o));return a.code=e,t&&(a.location=t),a.domain=r,a}function ee(e){throw e}const te=" ",ne="\r",re="\n",ie=String.fromCharCode(8232),se=String.fromCharCode(8233);function oe(e){const t=e;let n=0,r=1,i=1,s=0;const o=e=>t[e]===ne&&t[e+1]===re,a=e=>t[e]===re,c=e=>t[e]===se,u=e=>t[e]===ie,l=e=>o(e)||a(e)||c(e)||u(e),h=()=>n,f=()=>r,d=()=>i,p=()=>s,m=e=>o(e)||c(e)||u(e)?re:t[e],g=()=>m(n),y=()=>m(n+s);function v(){return s=0,l(n)&&(r++,i=0),o(n)&&n++,n++,i++,t[n]}function _(){return o(n+s)&&s++,s++,t[n+s]}function E(){n=0,r=1,i=1,s=0}function w(e=0){s=e}function b(){const e=n+s;while(e!==n)v();s=0}return{index:h,line:f,column:d,peekOffset:p,charAt:m,currentChar:g,currentPeek:y,next:v,peek:_,reset:E,resetPeek:w,skipToPeek:b}}const ae=void 0,ce="'",ue="tokenizer";function le(e,t={}){const n=!1!==t.location,r=oe(e),i=()=>r.index(),s=()=>Y(r.line(),r.column(),r.index()),o=s(),a=i(),c={currentType:13,offset:a,startLoc:o,endLoc:o,lastType:13,lastOffset:a,lastStartLoc:o,lastEndLoc:o,braceNest:0,inLinked:!1,text:""},u=()=>c,{onError:l}=t;function h(e,t,r,...i){const s=u();if(t.column+=r,t.offset+=r,l){const r=n?X(s.startLoc,t):null,o=Z(e,r,{domain:ue,args:i});l(o)}}function f(e,t,r){e.endLoc=s(),e.currentType=t;const i={type:t};return n&&(i.loc=X(e.startLoc,e.endLoc)),null!=r&&(i.value=r),i}const d=e=>f(e,13);function p(e,t){return e.currentChar()===t?(e.next(),t):(h(Q.EXPECTED_TOKEN,s(),0,t),"")}function m(e){let t="";while(e.currentPeek()===te||e.currentPeek()===re)t+=e.currentPeek(),e.peek();return t}function g(e){const t=m(e);return e.skipToPeek(),t}function y(e){if(e===ae)return!1;const t=e.charCodeAt(0);return t>=97&&t<=122||t>=65&&t<=90||95===t}function v(e){if(e===ae)return!1;const t=e.charCodeAt(0);return t>=48&&t<=57}function _(e,t){const{currentType:n}=t;if(2!==n)return!1;m(e);const r=y(e.currentPeek());return e.resetPeek(),r}function E(e,t){const{currentType:n}=t;if(2!==n)return!1;m(e);const r="-"===e.currentPeek()?e.peek():e.currentPeek(),i=v(r);return e.resetPeek(),i}function w(e,t){const{currentType:n}=t;if(2!==n)return!1;m(e);const r=e.currentPeek()===ce;return e.resetPeek(),r}function b(e,t){const{currentType:n}=t;if(7!==n)return!1;m(e);const r="."===e.currentPeek();return e.resetPeek(),r}function T(e,t){const{currentType:n}=t;if(8!==n)return!1;m(e);const r=y(e.currentPeek());return e.resetPeek(),r}function I(e,t){const{currentType:n}=t;if(7!==n&&11!==n)return!1;m(e);const r=":"===e.currentPeek();return e.resetPeek(),r}function S(e,t){const{currentType:n}=t;if(9!==n)return!1;const r=()=>{const t=e.currentPeek();return"{"===t?y(e.peek()):!("@"===t||"|"===t||":"===t||"."===t||t===te||!t)&&(t===re?(e.peek(),r()):A(e,!1))},i=r();return e.resetPeek(),i}function C(e){m(e);const t="|"===e.currentPeek();return e.resetPeek(),t}function A(e,t=!0){const n=(t=!1,r="")=>{const i=e.currentPeek();return"{"===i?t:"@"!==i&&i?"|"===i?!(r===te||r===re):i===te?(e.peek(),n(!0,te)):i!==re||(e.peek(),n(!0,re)):t},r=n();return t&&e.resetPeek(),r}function k(e,t){const n=e.currentChar();return n===ae?ae:t(n)?(e.next(),n):null}function N(e){const t=e.charCodeAt(0);return t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57||95===t||36===t}function R(e){return k(e,N)}function O(e){const t=e.charCodeAt(0);return t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57||95===t||36===t||45===t}function P(e){return k(e,O)}function D(e){const t=e.charCodeAt(0);return t>=48&&t<=57}function L(e){return k(e,D)}function x(e){const t=e.charCodeAt(0);return t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102}function M(e){return k(e,x)}function U(e){let t="",n="";while(t=L(e))n+=t;return n}function F(e){let t="";while(1){const n=e.currentChar();if("\\"===n){const r=e.peek();"{"===r||"}"===r||"@"===r||"|"===r||"\\"===r?(t+=n+r,e.next(),e.next()):(e.resetPeek(),t+=n,e.next())}else{if("{"===n||"}"===n||"@"===n||"|"===n||!n)break;if(n===te||n===re)if(A(e))t+=n,e.next();else{if(C(e))break;t+=n,e.next()}else t+=n,e.next()}}return t}function V(e){g(e);let t="",n="";while(t=P(e))n+=t;const r=e.currentChar();if(r&&"}"!==r&&r!==ae&&r!==te&&r!==re&&"　"!==r){const t=K(e);return h(Q.INVALID_TOKEN_IN_PLACEHOLDER,s(),0,n+t),n+t}return e.currentChar()===ae&&h(Q.UNTERMINATED_CLOSING_BRACE,s(),0),n}function j(e){g(e);let t="";return"-"===e.currentChar()?(e.next(),t+=`-${U(e)}`):t+=U(e),e.currentChar()===ae&&h(Q.UNTERMINATED_CLOSING_BRACE,s(),0),t}function $(e){return e!==ce&&e!==re}function B(e){g(e),p(e,"'");let t="",n="";while(t=k(e,$))n+="\\"===t?H(e):t;const r=e.currentChar();return r===re||r===ae?(h(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,s(),0),r===re&&(e.next(),p(e,"'")),n):(p(e,"'"),n)}function H(e){const t=e.currentChar();switch(t){case"\\":case"'":return e.next(),`\\${t}`;case"u":return W(e,t,4);case"U":return W(e,t,6);default:return h(Q.UNKNOWN_ESCAPE_SEQUENCE,s(),0,t),""}}function W(e,t,n){p(e,t);let r="";for(let i=0;i<n;i++){const n=M(e);if(!n){h(Q.INVALID_UNICODE_ESCAPE_SEQUENCE,s(),0,`\\${t}${r}${e.currentChar()}`);break}r+=n}return`\\${t}${r}`}function G(e){return"{"!==e&&"}"!==e&&e!==te&&e!==re}function K(e){g(e);let t="",n="";while(t=k(e,G))n+=t;return n}function q(e){let t="",n="";while(t=R(e))n+=t;return n}function z(e){const t=n=>{const r=e.currentChar();return"{"!==r&&"@"!==r&&"|"!==r&&"("!==r&&")"!==r&&r?r===te?n:(n+=r,e.next(),t(n)):n};return t("")}function J(e){g(e);const t=p(e,"|");return g(e),t}function ee(e,t){let n=null;const r=e.currentChar();switch(r){case"{":return t.braceNest>=1&&h(Q.NOT_ALLOW_NEST_PLACEHOLDER,s(),0),e.next(),n=f(t,2,"{"),g(e),t.braceNest++,n;case"}":return t.braceNest>0&&2===t.currentType&&h(Q.EMPTY_PLACEHOLDER,s(),0),e.next(),n=f(t,3,"}"),t.braceNest--,t.braceNest>0&&g(e),t.inLinked&&0===t.braceNest&&(t.inLinked=!1),n;case"@":return t.braceNest>0&&h(Q.UNTERMINATED_CLOSING_BRACE,s(),0),n=ne(e,t)||d(t),t.braceNest=0,n;default:{let r=!0,i=!0,o=!0;if(C(e))return t.braceNest>0&&h(Q.UNTERMINATED_CLOSING_BRACE,s(),0),n=f(t,1,J(e)),t.braceNest=0,t.inLinked=!1,n;if(t.braceNest>0&&(4===t.currentType||5===t.currentType||6===t.currentType))return h(Q.UNTERMINATED_CLOSING_BRACE,s(),0),t.braceNest=0,ie(e,t);if(r=_(e,t))return n=f(t,4,V(e)),g(e),n;if(i=E(e,t))return n=f(t,5,j(e)),g(e),n;if(o=w(e,t))return n=f(t,6,B(e)),g(e),n;if(!r&&!i&&!o)return n=f(t,12,K(e)),h(Q.INVALID_TOKEN_IN_PLACEHOLDER,s(),0,n.value),g(e),n;break}}return n}function ne(e,t){const{currentType:n}=t;let r=null;const i=e.currentChar();switch(7!==n&&8!==n&&11!==n&&9!==n||i!==re&&i!==te||h(Q.INVALID_LINKED_FORMAT,s(),0),i){case"@":return e.next(),r=f(t,7,"@"),t.inLinked=!0,r;case".":return g(e),e.next(),f(t,8,".");case":":return g(e),e.next(),f(t,9,":");default:return C(e)?(r=f(t,1,J(e)),t.braceNest=0,t.inLinked=!1,r):b(e,t)||I(e,t)?(g(e),ne(e,t)):T(e,t)?(g(e),f(t,11,q(e))):S(e,t)?(g(e),"{"===i?ee(e,t)||r:f(t,10,z(e))):(7===n&&h(Q.INVALID_LINKED_FORMAT,s(),0),t.braceNest=0,t.inLinked=!1,ie(e,t))}}function ie(e,t){let n={type:13};if(t.braceNest>0)return ee(e,t)||d(t);if(t.inLinked)return ne(e,t)||d(t);const r=e.currentChar();switch(r){case"{":return ee(e,t)||d(t);case"}":return h(Q.UNBALANCED_CLOSING_BRACE,s(),0),e.next(),f(t,3,"}");case"@":return ne(e,t)||d(t);default:if(C(e))return n=f(t,1,J(e)),t.braceNest=0,t.inLinked=!1,n;if(A(e))return f(t,0,F(e));break}return n}function se(){const{currentType:e,offset:t,startLoc:n,endLoc:o}=c;return c.lastType=e,c.lastOffset=t,c.lastStartLoc=n,c.lastEndLoc=o,c.offset=i(),c.startLoc=s(),r.currentChar()===ae?f(c,13):ie(r,c)}return{nextToken:se,currentOffset:i,currentPosition:s,context:u}}const he="parser",fe=/(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g,de=/\\([\\@{}|])/g;function pe(e,t){return t}function me(e,t,n){switch(e){case"\\\\":return"\\";case"\\'":return"'";default:{const e=parseInt(t||n,16);return e<=55295||e>=57344?String.fromCodePoint(e):"�"}}}function ge(e={}){const t=!1!==e.location,{onError:n}=e;function r(e,r,i,s,...o){const a=e.currentPosition();if(a.offset+=s,a.column+=s,n){const e=t?X(i,a):null,s=Z(r,e,{domain:he,args:o});n(s)}}function i(e,n,r){const i={type:e};return t&&(i.start=n,i.end=n,i.loc={start:r,end:r}),i}function s(e,n,r,i){t&&(e.end=n,e.loc&&(e.loc.end=r))}function o(e,t){const n=e.context(),r=i(3,n.offset,n.startLoc);return r.value=t.replace(de,pe),s(r,e.currentOffset(),e.currentPosition()),r}function a(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:o}=n,a=i(5,r,o);return a.index=parseInt(t,10),e.nextToken(),s(a,e.currentOffset(),e.currentPosition()),a}function c(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:o}=n,a=i(4,r,o);return a.key=t,e.nextToken(),s(a,e.currentOffset(),e.currentPosition()),a}function u(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:o}=n,a=i(9,r,o);return a.value=t.replace(fe,me),e.nextToken(),s(a,e.currentOffset(),e.currentPosition()),a}function l(e){const t=e.nextToken(),n=e.context(),{lastOffset:o,lastStartLoc:a}=n,c=i(8,o,a);return 11!==t.type?(r(e,Q.UNEXPECTED_EMPTY_LINKED_MODIFIER,n.lastStartLoc,0),c.value="",s(c,o,a),{nextConsumeToken:t,node:c}):(null==t.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,n.lastStartLoc,0,ye(t)),c.value=t.value||"",s(c,e.currentOffset(),e.currentPosition()),{node:c})}function h(e,t){const n=e.context(),r=i(7,n.offset,n.startLoc);return r.value=t,s(r,e.currentOffset(),e.currentPosition()),r}function d(e){const t=e.context(),n=i(6,t.offset,t.startLoc);let o=e.nextToken();if(8===o.type){const t=l(e);n.modifier=t.node,o=t.nextConsumeToken||e.nextToken()}switch(9!==o.type&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(o)),o=e.nextToken(),2===o.type&&(o=e.nextToken()),o.type){case 10:null==o.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(o)),n.key=h(e,o.value||"");break;case 4:null==o.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(o)),n.key=c(e,o.value||"");break;case 5:null==o.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(o)),n.key=a(e,o.value||"");break;case 6:null==o.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(o)),n.key=u(e,o.value||"");break;default:{r(e,Q.UNEXPECTED_EMPTY_LINKED_KEY,t.lastStartLoc,0);const a=e.context(),c=i(7,a.offset,a.startLoc);return c.value="",s(c,a.offset,a.startLoc),n.key=c,s(n,a.offset,a.startLoc),{nextConsumeToken:o,node:n}}}return s(n,e.currentOffset(),e.currentPosition()),{node:n}}function p(e){const t=e.context(),n=1===t.currentType?e.currentOffset():t.offset,l=1===t.currentType?t.endLoc:t.startLoc,h=i(2,n,l);h.items=[];let f=null;do{const n=f||e.nextToken();switch(f=null,n.type){case 0:null==n.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(n)),h.items.push(o(e,n.value||""));break;case 5:null==n.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(n)),h.items.push(a(e,n.value||""));break;case 4:null==n.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(n)),h.items.push(c(e,n.value||""));break;case 6:null==n.value&&r(e,Q.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,ye(n)),h.items.push(u(e,n.value||""));break;case 7:{const t=d(e);h.items.push(t.node),f=t.nextConsumeToken||null;break}}}while(13!==t.currentType&&1!==t.currentType);const p=1===t.currentType?t.lastOffset:e.currentOffset(),m=1===t.currentType?t.lastEndLoc:e.currentPosition();return s(h,p,m),h}function m(e,t,n,o){const a=e.context();let c=0===o.items.length;const u=i(1,t,n);u.cases=[],u.cases.push(o);do{const t=p(e);c||(c=0===t.items.length),u.cases.push(t)}while(13!==a.currentType);return c&&r(e,Q.MUST_HAVE_MESSAGES_IN_PLURAL,n,0),s(u,e.currentOffset(),e.currentPosition()),u}function g(e){const t=e.context(),{offset:n,startLoc:r}=t,i=p(e);return 13===t.currentType?i:m(e,n,r,i)}function y(n){const o=le(n,f({},e)),a=o.context(),c=i(0,a.offset,a.startLoc);return t&&c.loc&&(c.loc.source=n),c.body=g(o),e.onCacheKey&&(c.cacheKey=e.onCacheKey(n)),13!==a.currentType&&r(o,Q.UNEXPECTED_LEXICAL_ANALYSIS,a.lastStartLoc,0,n[a.offset]||""),s(c,o.currentOffset(),o.currentPosition()),c}return{parse:y}}function ye(e){if(13===e.type)return"EOF";const t=(e.value||"").replace(/\r?\n/gu,"\\n");return t.length>10?t.slice(0,9)+"…":t}function ve(e,t={}){const n={ast:e,helpers:new Set},r=()=>n,i=e=>(n.helpers.add(e),e);return{context:r,helper:i}}function _e(e,t){for(let n=0;n<e.length;n++)Ee(e[n],t)}function Ee(e,t){switch(e.type){case 1:_e(e.cases,t),t.helper("plural");break;case 2:_e(e.items,t);break;case 6:{const n=e;Ee(n.key,t),t.helper("linked"),t.helper("type");break}case 5:t.helper("interpolate"),t.helper("list");break;case 4:t.helper("interpolate"),t.helper("named");break}}function we(e,t={}){const n=ve(e);n.helper("normalize"),e.body&&Ee(e.body,n);const r=n.context();e.helpers=Array.from(r.helpers)}function be(e){const t=e.body;return 2===t.type?Te(t):t.cases.forEach(e=>Te(e)),e}function Te(e){if(1===e.items.length){const t=e.items[0];3!==t.type&&9!==t.type||(e.static=t.value,delete t.value)}else{const t=[];for(let n=0;n<e.items.length;n++){const r=e.items[n];if(3!==r.type&&9!==r.type)break;if(null==r.value)break;t.push(r.value)}if(t.length===e.items.length){e.static=N(t);for(let t=0;t<e.items.length;t++){const n=e.items[t];3!==n.type&&9!==n.type||delete n.value}}}}function Ie(e){switch(e.t=e.type,e.type){case 0:{const t=e;Ie(t.body),t.b=t.body,delete t.body;break}case 1:{const t=e,n=t.cases;for(let e=0;e<n.length;e++)Ie(n[e]);t.c=n,delete t.cases;break}case 2:{const t=e,n=t.items;for(let e=0;e<n.length;e++)Ie(n[e]);t.i=n,delete t.items,t.static&&(t.s=t.static,delete t.static);break}case 3:case 9:case 8:case 7:{const t=e;t.value&&(t.v=t.value,delete t.value);break}case 6:{const t=e;Ie(t.key),t.k=t.key,delete t.key,t.modifier&&(Ie(t.modifier),t.m=t.modifier,delete t.modifier);break}case 5:{const t=e;t.i=t.index,delete t.index;break}case 4:{const t=e;t.k=t.key,delete t.key;break}default:0}delete e.type}function Se(e,t){const{filename:n,breakLineCode:r,needIndent:i}=t,s=!1!==t.location,o={filename:n,code:"",column:1,line:1,offset:0,map:void 0,breakLineCode:r,needIndent:i,indentLevel:0};s&&e.loc&&(o.source=e.loc.source);const a=()=>o;function c(e,t){o.code+=e}function u(e,t=!0){const n=t?r:"";c(i?n+"  ".repeat(e):n)}function l(e=!0){const t=++o.indentLevel;e&&u(t)}function h(e=!0){const t=--o.indentLevel;e&&u(t)}function f(){u(o.indentLevel)}const d=e=>`_${e}`,p=()=>o.needIndent;return{context:a,push:c,indent:l,deindent:h,newline:f,helper:d,needIndent:p}}function Ce(e,t){const{helper:n}=e;e.push(`${n("linked")}(`),Re(e,t.key),t.modifier?(e.push(", "),Re(e,t.modifier),e.push(", _type")):e.push(", undefined, _type"),e.push(")")}function Ae(e,t){const{helper:n,needIndent:r}=e;e.push(`${n("normalize")}([`),e.indent(r());const i=t.items.length;for(let s=0;s<i;s++){if(Re(e,t.items[s]),s===i-1)break;e.push(", ")}e.deindent(r()),e.push("])")}function ke(e,t){const{helper:n,needIndent:r}=e;if(t.cases.length>1){e.push(`${n("plural")}([`),e.indent(r());const i=t.cases.length;for(let n=0;n<i;n++){if(Re(e,t.cases[n]),n===i-1)break;e.push(", ")}e.deindent(r()),e.push("])")}}function Ne(e,t){t.body?Re(e,t.body):e.push("null")}function Re(e,t){const{helper:n}=e;switch(t.type){case 0:Ne(e,t);break;case 1:ke(e,t);break;case 2:Ae(e,t);break;case 6:Ce(e,t);break;case 8:e.push(JSON.stringify(t.value),t);break;case 7:e.push(JSON.stringify(t.value),t);break;case 5:e.push(`${n("interpolate")}(${n("list")}(${t.index}))`,t);break;case 4:e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`,t);break;case 9:e.push(JSON.stringify(t.value),t);break;case 3:e.push(JSON.stringify(t.value),t);break;default:0}}const Oe=(e,t={})=>{const n=w(t.mode)?t.mode:"normal",r=w(t.filename)?t.filename:"message.intl";t.sourceMap;const i=null!=t.breakLineCode?t.breakLineCode:"arrow"===n?";":"\n",s=t.needIndent?t.needIndent:"arrow"!==n,o=e.helpers||[],a=Se(e,{filename:r,breakLineCode:i,needIndent:s});a.push("normal"===n?"function __msg__ (ctx) {":"(ctx) => {"),a.indent(s),o.length>0&&(a.push(`const { ${N(o.map(e=>`${e}: _${e}`),", ")} } = ctx`),a.newline()),a.push("return "),Re(a,e),a.deindent(s),a.push("}"),delete e.helpers;const{code:c,map:u}=a.context();return{ast:e,code:c,map:u?u.toJSON():void 0}};function Pe(e,t={}){const n=f({},t),r=!!n.jit,i=!!n.minify,s=null==n.optimize||n.optimize,o=ge(n),a=o.parse(e);return r?(s&&be(a),i&&Ie(a),{ast:a,code:""}):(we(a,n),Oe(a,n))}
/*!
  * core-base v11.4.8
  * (c) 2026 kazuya kawaguchi
  * Released under the MIT License.
  */
function De(){"boolean"!==typeof __INTLIFY_PROD_DEVTOOLS__&&(g().__INTLIFY_PROD_DEVTOOLS__=!1),"boolean"!==typeof __INTLIFY_DROP_MESSAGE_COMPILER__&&(g().__INTLIFY_DROP_MESSAGE_COMPILER__=!1)}function Le(e){return T(e)&&0===We(e)&&(v(e,"b")||v(e,"body"))}const xe=["b","body"];function Me(e){return Qe(e,xe)}const Ue=["c","cases"];function Fe(e){return Qe(e,Ue,[])}const Ve=["s","static"];function je(e){return Qe(e,Ve)}const $e=["i","items"];function Be(e){return Qe(e,$e,[])}const He=["t","type"];function We(e){return Qe(e,He)}const Ge=["v","value"];function Ke(e,t){const n=Qe(e,Ge);if(null!=n)return n;throw Ze(t)}const qe=["m","modifier"];function ze(e){return Qe(e,qe)}const Ye=["k","key"];function Xe(e){const t=Qe(e,Ye);if(t)return t;throw Ze(6)}function Qe(e,t,n){for(let r=0;r<t.length;r++){const n=t[r];if(v(e,n)&&null!=e[n])return e[n]}return n}const Je=[...xe,...Ue,...Ve,...$e,...Ye,...qe,...Ge,...He];function Ze(e){return new Error(`unhandled node type: ${e}`)}function et(e){const t=t=>tt(t,e);return t}function tt(e,t){const n=Me(t);if(null==n)throw Ze(0);const r=We(n);if(1===r){const t=n,r=Fe(t);return e.plural(r.reduce((t,n)=>[...t,nt(e,n)],[]))}return nt(e,n)}function nt(e,t){const n=je(t);if(null!=n)return"text"===e.type?n:e.normalize([n]);{const n=Be(t).reduce((t,n)=>[...t,rt(e,n)],[]);return e.normalize(n)}}function rt(e,t){const n=We(t);switch(n){case 3:return Ke(t,n);case 9:return Ke(t,n);case 4:{const r=t;if(v(r,"k")&&r.k)return e.interpolate(e.named(r.k));if(v(r,"key")&&r.key)return e.interpolate(e.named(r.key));throw Ze(n)}case 5:{const r=t;if(v(r,"i")&&c(r.i))return e.interpolate(e.list(r.i));if(v(r,"index")&&c(r.index))return e.interpolate(e.list(r.index));throw Ze(n)}case 6:{const n=t,r=ze(n),i=Xe(n);return e.linked(rt(e,i),r?rt(e,r):void 0,e.type)}case 7:return Ke(t,n);case 8:return Ke(t,n);default:throw new Error(`unhandled node on format message part: ${n}`)}}const it=e=>e;let st=p();function ot(e,t={}){let n=!1;const r=t.onError||ee;return t.onError=e=>{n=!0,r(e)},{...Pe(e,t),detectError:n}}function at(e,t){if(!__INTLIFY_DROP_MESSAGE_COMPILER__&&w(e)){!b(t.warnHtmlMessage)||t.warnHtmlMessage;const n=t.onCacheKey||it,r=n(e),i=st[r];if(i)return i;const{ast:s,detectError:o}=ot(e,{...t,location:!1,jit:!0}),a=et(s);return o?a:st[r]=a}{0;const t=e.cacheKey;if(t){const n=st[t];return n||(st[t]=et(e))}return et(e)}}let ct=null;function ut(e){ct=e}function lt(e,t,n){ct&&ct.emit("i18n:init",{timestamp:Date.now(),i18n:e,version:t,meta:n})}const ht=ft("function:translate");function ft(e){return t=>ct&&ct.emit(e,t)}const dt={INVALID_ARGUMENT:J,INVALID_DATE_ARGUMENT:18,INVALID_ISO_DATE_ARGUMENT:19,NOT_SUPPORT_NON_STRING_MESSAGE:20,NOT_SUPPORT_LOCALE_PROMISE_VALUE:21,NOT_SUPPORT_LOCALE_ASYNC_FUNCTION:22,NOT_SUPPORT_LOCALE_TYPE:23},pt=24;function mt(e){return Z(e,null,void 0)}dt.INVALID_ARGUMENT,dt.INVALID_DATE_ARGUMENT,dt.INVALID_ISO_DATE_ARGUMENT,dt.NOT_SUPPORT_NON_STRING_MESSAGE,dt.NOT_SUPPORT_LOCALE_PROMISE_VALUE,dt.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION,dt.NOT_SUPPORT_LOCALE_TYPE;function gt(e,t){return null!=t.locale?vt(t.locale):vt(e.locale)}let yt;function vt(e){if(w(e))return e;if(E(e)){if(e.resolvedOnce&&null!=yt)return yt;if("Function"===e.constructor.name){const t=e();if(I(t))throw mt(dt.NOT_SUPPORT_LOCALE_PROMISE_VALUE);return yt=t}throw mt(dt.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)}throw mt(dt.NOT_SUPPORT_LOCALE_TYPE)}function _t(e,t,n){return[...new Set([n,..._(t)?t:T(t)?Object.keys(t):w(t)?[t]:[n]])]}function Et(e,t,n){const r=w(n)?n:Ft,i=e;i.__localeChainCache||(i.__localeChainCache=new Map);let s=i.__localeChainCache.get(r);if(!s){s=[];let e=[n];while(_(e))e=wt(s,e,t);const o=_(t)||!A(t)?t:t["default"]?t["default"]:null;e=w(o)?[o]:o,_(e)&&wt(s,e,!1),i.__localeChainCache.set(r,s)}return s}function wt(e,t,n){let r=!0;for(let i=0;i<t.length&&b(r);i++){const s=t[i];w(s)&&(r=bt(e,t[i],n))}return r}function bt(e,t,n){let r;const i=t.split("-");do{const t=i.join("-");r=Tt(e,t,n),i.splice(-1,1)}while(i.length&&!0===r);return r}function Tt(e,t,n){let r=!1;if(!e.includes(t)&&(r=!0,t)){r="!"!==t[t.length-1];const i=t.replace(/!/g,"");e.push(i),(_(n)||A(n))&&n[i]&&(r=n[i])}return r}const It=[];It[0]={["w"]:[0],["i"]:[3,0],["["]:[4],["o"]:[7]},It[1]={["w"]:[1],["."]:[2],["["]:[4],["o"]:[7]},It[2]={["w"]:[2],["i"]:[3,0],["0"]:[3,0]},It[3]={["i"]:[3,0],["0"]:[3,0],["w"]:[1,1],["."]:[2,1],["["]:[4,1],["o"]:[7,1]},It[4]={["'"]:[5,0],['"']:[6,0],["["]:[4,2],["]"]:[1,3],["o"]:8,["l"]:[4,0]},It[5]={["'"]:[4,0],["o"]:8,["l"]:[5,0]},It[6]={['"']:[4,0],["o"]:8,["l"]:[6,0]};const St=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function Ct(e){return St.test(e)}function At(e){const t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t!==n||34!==t&&39!==t?e:e.slice(1,-1)}function kt(e){if(void 0===e||null===e)return"o";const t=e.charCodeAt(0);switch(t){case 91:case 93:case 46:case 34:case 39:return e;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function Nt(e){const t=e.trim();return("0"!==e.charAt(0)||!isNaN(parseInt(e)))&&(Ct(t)?At(t):"*"+t)}function Rt(e){const t=[];let n,r,i,s,o,a,c,u=-1,l=0,h=0;const f=[];function d(){const t=e[u+1];if(5===l&&"'"===t||6===l&&'"'===t)return u++,i="\\"+t,f[0](),!0}f[0]=()=>{void 0===r?r=i:r+=i},f[1]=()=>{void 0!==r&&(t.push(r),r=void 0)},f[2]=()=>{f[0](),h++},f[3]=()=>{if(h>0)h--,l=4,f[0]();else{if(h=0,void 0===r)return!1;if(r=Nt(r),!1===r)return!1;f[1]()}};while(null!==l)if(u++,n=e[u],"\\"!==n||!d()){if(s=kt(n),c=It[l],o=c[s]||c["l"]||8,8===o)return;if(l=o[0],void 0!==o[1]&&(a=f[o[1]],a&&(i=n,!1===a())))return;if(7===l)return t}}const Ot=new Map;function Pt(e,t){return T(e)?e[t]:null}function Dt(e,t){if(!T(e))return null;let n=Ot.get(t);if(n||(n=Rt(t),n&&Ot.set(t,n)),!n)return null;const r=n.length;let i=e,s=0;while(s<r){const e=n[s];if(Je.includes(e)&&Le(i))return null;if(!T(i))return null;if(!v(i,e))return null;const t=i[e];if(void 0===t)return null;if(E(i))return null;i=t,s++}return i}const Lt={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER:7,INVALID_NUMBER_ARGUMENT:8,INVALID_DATE_ARGUMENT:9},xt=10;Lt.NOT_FOUND_KEY,Lt.FALLBACK_TO_TRANSLATE,Lt.CANNOT_FORMAT_NUMBER,Lt.FALLBACK_TO_NUMBER_FORMAT,Lt.CANNOT_FORMAT_DATE,Lt.FALLBACK_TO_DATE_FORMAT,Lt.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER,Lt.INVALID_NUMBER_ARGUMENT,Lt.INVALID_DATE_ARGUMENT;const Mt="11.4.8",Ut=-1,Ft="en-US",Vt="",jt=e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;function $t(){return{upper:(e,t)=>"text"===t&&w(e)?e.toUpperCase():"vnode"===t&&T(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>"text"===t&&w(e)?e.toLowerCase():"vnode"===t&&T(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>"text"===t&&w(e)?jt(e):"vnode"===t&&T(e)&&"__v_isVNode"in e?jt(e.children):e}}let Bt,Ht,Wt;function Gt(e){Bt=e}function Kt(e){Ht=e}function qt(e){Wt=e}let zt=null;const Yt=e=>{zt=e},Xt=()=>zt;let Qt=null;const Jt=e=>{Qt=e},Zt=()=>Qt;let en=0;function tn(e={}){const t=E(e.onWarn)?e.onWarn:R,n=w(e.version)?e.version:Mt,r=w(e.locale)||E(e.locale)?e.locale:Ft,i=E(r)?Ft:r,s=_(e.fallbackLocale)||A(e.fallbackLocale)||w(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:i,o=A(e.messages)?e.messages:nn(i),a=A(e.datetimeFormats)?e.datetimeFormats:nn(i),c=A(e.numberFormats)?e.numberFormats:nn(i),u=f(p(),e.modifiers,$t()),h=e.pluralRules||p(),d=E(e.missing)?e.missing:null,m=!b(e.missingWarn)&&!l(e.missingWarn)||e.missingWarn,g=!b(e.fallbackWarn)&&!l(e.fallbackWarn)||e.fallbackWarn,y=!!e.fallbackFormat,v=!!e.unresolving,I=E(e.postTranslation)?e.postTranslation:null,S=A(e.processor)?e.processor:null,C=!b(e.warnHtmlMessage)||e.warnHtmlMessage,k=!!e.escapeParameter,N=E(e.messageCompiler)?e.messageCompiler:Bt;const O=E(e.messageResolver)?e.messageResolver:Ht||Pt,P=E(e.localeFallbacker)?e.localeFallbacker:Wt||_t,D=T(e.fallbackContext)?e.fallbackContext:void 0,L=e,x=T(L.__datetimeFormatters)?L.__datetimeFormatters:new Map,M=T(L.__numberFormatters)?L.__numberFormatters:new Map,U=T(L.__meta)?L.__meta:{};en++;const F={version:n,cid:en,locale:r,fallbackLocale:s,messages:o,modifiers:u,pluralRules:h,missing:d,missingWarn:m,fallbackWarn:g,fallbackFormat:y,unresolving:v,postTranslation:I,processor:S,warnHtmlMessage:C,escapeParameter:k,messageCompiler:N,messageResolver:O,localeFallbacker:P,fallbackContext:D,onWarn:t,__meta:U};return F.datetimeFormats=a,F.numberFormats=c,F.__datetimeFormatters=x,F.__numberFormatters=M,__INTLIFY_PROD_DEVTOOLS__&&lt(F,n,U),F}const nn=e=>({[e]:p()});function rn(e,t,n,r,i){const{missing:s,onWarn:o}=e;if(null!==s){const r=s(e,n,t,i);return w(r)?r:t}return t}function sn(e,t,n){const r=e;r.__localeChainCache=new Map,e.localeFallbacker(e,n,t)}function on(e,t){return e!==t&&e.split("-")[0]===t.split("-")[0]}function an(e,t){const n=t.indexOf(e);if(-1===n)return!1;for(let r=n+1;r<t.length;r++)if(on(e,t[r]))return!0;return!1}function cn(e,t,n,r,i,s,o){const{fallbackLocale:a,localeFallbacker:c,onWarn:u}=e,l=c(e,a,n);let h=n;for(let f=0;f<l.length;f++){const n=l[f];0;const s=(r[n]||{})[t];if(A(s)&&w(n))return n;rn(e,t,n,i,o),h=n}return null}function un(e,t,n){let r=`${e}__${t}`;return A(n)&&!h(n)&&(r=`${r}__${JSON.stringify(n)}`),r}function ln(e,t,n){for(const r in n){const n=`${t}__${r}`;for(const t of e.keys())(t===n||t.startsWith(`${n}__`))&&e.delete(t)}}function hn(e,t,n,r){const[,i,s,o]=e;let a=n;return w(i)?t.key=i:A(i)&&Object.keys(i).forEach(e=>{r.includes(e)?a[e]=i[e]:t[e]=i[e]}),w(s)?t.locale=s:A(s)&&(a=s),A(o)&&(a=o),a}const fn="undefined"!==typeof Intl;fn&&Intl.DateTimeFormat,fn&&Intl.NumberFormat;function dn(e,...t){const{datetimeFormats:n,unresolving:r,onWarn:i}=e,{__datetimeFormatters:s}=e;if(!w(t[0])&&!u(t[0])&&!c(t[0]))return Vt;const[o,a,l,h]=mn(...t),d=b(l.missingWarn)?l.missingWarn:e.missingWarn,p=b(l.fallbackWarn)?l.fallbackWarn:e.fallbackWarn,m=!!l.part,g=gt(e,l);if(!w(o)||""===o){const e=new Intl.DateTimeFormat(g.replace(/!/g,""),h);return m?e.formatToParts(a):e.format(a)}const y=cn(e,o,g,n,d,p,"datetime format");if(!w(y))return r?Ut:o;const v=n[y][o],_=un(y,o,h);let E=s.get(_);return E||(E=new Intl.DateTimeFormat(y,f({},v,h)),s.set(_,E)),m?E.formatToParts(a):E.format(a)}const pn=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function mn(...e){const[t]=e,n=p(),r=p();let i;if(w(t)){const e=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!e)throw mt(dt.INVALID_ISO_DATE_ARGUMENT);const n=e[3]?e[3].trim().startsWith("T")?`${e[1].trim()}${e[3].trim()}`:`${e[1].trim()}T${e[3].trim()}`:e[1].trim();i=new Date(n);try{i.toISOString()}catch{throw mt(dt.INVALID_ISO_DATE_ARGUMENT)}}else if(u(t)){if(isNaN(t.getTime()))throw mt(dt.INVALID_DATE_ARGUMENT);i=t}else{if(!c(t))throw mt(dt.INVALID_ARGUMENT);i=t}const s=hn(e,n,r,pn);return[n.key||"",i,n,s]}function gn(e,t,n){const r=e;ln(r.__datetimeFormatters,t,n)}function yn(e,...t){const{numberFormats:n,unresolving:r,onWarn:i}=e,{__numberFormatters:s}=e;if(!c(t[0]))return Vt;const[o,a,u,l]=_n(...t),h=b(u.missingWarn)?u.missingWarn:e.missingWarn,d=b(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn,p=!!u.part,m=gt(e,u);if(!w(o)||""===o){const e=new Intl.NumberFormat(m.replace(/!/g,""),l);return p?e.formatToParts(a):e.format(a)}const g=cn(e,o,m,n,h,d,"number format");if(!w(g))return r?Ut:o;const y=n[g][o],v=un(g,o,l);let _=s.get(v);return _||(_=new Intl.NumberFormat(g,f({},y,l)),s.set(v,_)),p?_.formatToParts(a):_.format(a)}const vn=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function _n(...e){const[t]=e,n=p(),r=p();if(!c(t))throw mt(dt.INVALID_ARGUMENT);const i=t,s=hn(e,n,r,vn);return[n.key||"",i,n,s]}function En(e,t,n){const r=e;ln(r.__numberFormatters,t,n)}const wn=e=>e,bn=e=>"",Tn="text",In=e=>0===e.length?"":N(e),Sn=k;function Cn(e,t){return e=Math.abs(e),2===t?1===e?0:1:Math.min(e,2)}function An(e){const t=c(e.pluralIndex)?e.pluralIndex:-1;return c(e.named?.count)?e.named.count:c(e.named?.n)?e.named.n:t}function kn(e={}){const t=e.locale,n=An(e),r=w(t)&&E(e.pluralRules?.[t])?e.pluralRules[t]:Cn,i=r===Cn?void 0:Cn,s=e=>e[r(n,e.length,i)],o=e.list||[],a=e=>o[e],u=e.named||p();c(e.pluralIndex)&&(u.count||=e.pluralIndex,u.n||=e.pluralIndex);const l=e=>u[e];function h(t,n){const r=E(e.messages)?e.messages(t,!!n):!!T(e.messages)&&e.messages[t];return r||(e.parent?e.parent.message(t):bn)}const d=t=>e.modifiers?e.modifiers[t]:wn,m=E(e.processor?.normalize)?e.processor.normalize:In,g=E(e.processor?.interpolate)?e.processor.interpolate:Sn,y=w(e.processor?.type)?e.processor.type:Tn,v=(e,...t)=>{const[n,r]=t;let i="text",s="";1===t.length?T(n)?(s=n.modifier||s,i=n.type||i):w(n)&&(s=n||s):2===t.length&&(w(n)&&(s=n||s),w(r)&&(i=r||i));const o=h(e,!0)(b),a=""===o||void 0===o?e:o,c="vnode"===i&&_(a)&&s?a[0]:a;return s?d(s)(c,i):c},b={["list"]:a,["named"]:l,["plural"]:s,["linked"]:v,["message"]:h,["type"]:y,["interpolate"]:g,["normalize"]:m,["values"]:f(p(),o,u)};return b}const Nn=()=>"",Rn=e=>E(e);function On(e,...t){const{fallbackFormat:n,postTranslation:r,unresolving:i,messageCompiler:s,fallbackLocale:o,messages:a}=e,[c,u]=Mn(...t),l=b(u.missingWarn)?u.missingWarn:e.missingWarn,h=b(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn,d=b(u.escapeParameter)?u.escapeParameter:e.escapeParameter,m=!!u.resolvedMessage,g=w(u.default)||b(u.default)?b(u.default)?s?c:()=>c:u.default:n?s?c:()=>c:null,y=n||null!=g&&(w(g)||E(g)),v=gt(e,u);d&&Pn(u);let[_,T,I]=m?[c,v,a[v]||p()]:Dn(e,c,v,o,h,l),S=_,C=c;if(m||w(S)||Le(S)||Rn(S)||y&&(S=g,C=S),!m&&(!(w(S)||Le(S)||Rn(S))||!w(T)))return i?Ut:c;let A=!1;const k=()=>{A=!0},N=Rn(S)?S:Ln(e,c,T,S,C,k);if(A)return S;const R=Fn(e,T,I,u),O=kn(R),P=xn(e,N,O);let D=r?r(P,c):P;if(d&&w(D)&&(D=K(D)),__INTLIFY_PROD_DEVTOOLS__){const t={timestamp:Date.now(),key:w(c)?c:Rn(S)?S.key:"",locale:T||(Rn(S)?S.locale:""),format:w(S)?S:Rn(S)?S.source:"",message:D};t.meta=f({},e.__meta,Xt()||{}),ht(t)}return D}function Pn(e){_(e.list)?e.list=e.list.map(e=>w(e)?O(e):e):T(e.named)&&Object.keys(e.named).forEach(t=>{w(e.named[t])&&(e.named[t]=O(e.named[t]))})}function Dn(e,t,n,r,i,s){const{messages:o,onWarn:a,messageResolver:c,localeFallbacker:u}=e,l=u(e,r,n);let h,f=p(),d=null,m=n,g=null;const y="translate";for(let v=0;v<l.length;v++){h=g=l[v];0,f=o[h]||p();if(null===(d=c(f,t))&&(d=f[t]),w(d)||Le(d)||Rn(d))break;if(!an(h,l)){const n=rn(e,t,h,s,y);n!==t&&(d=n)}m=g}return[d,h,f]}function Ln(e,t,n,r,i,s){const{messageCompiler:o,warnHtmlMessage:a}=e;if(Rn(r)){const e=r;return e.locale=e.locale||n,e.key=e.key||t,e}if(null==o){const e=()=>r;return e.locale=n,e.key=t,e}const c=o(r,Un(e,n,i,r,a,s));return c.locale=n,c.key=t,c.source=r,c}function xn(e,t,n){const r=t(n);return r}function Mn(...e){const[t,n,r]=e,i=p();if(!w(t)&&!c(t)&&!Rn(t)&&!Le(t))throw mt(dt.INVALID_ARGUMENT);const s=c(t)?String(t):(Rn(t),t);return c(n)?i.plural=n:w(n)?i.default=n:A(n)&&!h(n)?i.named=n:_(n)&&(i.list=n),c(r)?i.plural=r:w(r)?i.default=r:A(r)&&f(i,r),[s,i]}function Un(e,t,n,r,i,s){return{locale:t,key:n,warnHtmlMessage:i,onError:e=>{throw s&&s(e),e},onCacheKey:e=>o(t,n,e)}}function Fn(e,t,n,r){const{modifiers:i,pluralRules:s,messageResolver:o,fallbackLocale:a,fallbackWarn:u,missingWarn:l,fallbackContext:h}=e,f=(r,i)=>{let s=o(n,r);if(null==s&&(h||i)){const[n,,i]=Dn(h||e,r,t,a,u,l);s=n??o(i,r)}if(w(s)||Le(s)){let n=!1;const i=()=>{n=!0},o=Ln(e,r,t,s,r,i);return n?Nn:o}return Rn(s)?s:Nn},d={locale:t,modifiers:i,pluralRules:s,messages:f};return e.processor&&(d.processor=e.processor),r.list&&(d.list=r.list),r.named&&(d.named=r.named),c(r.plural)&&(d.pluralIndex=r.plural),d}De();var Vn=n(5130);const jn=()=>{0};var $n=n(6768),Bn=n(144);
/*!
  * vue-i18n v11.4.8
  * (c) 2026 kazuya kawaguchi
  * Released under the MIT License.
  */
const Hn="11.4.8";function Wn(){"boolean"!==typeof __VUE_I18N_FULL_INSTALL__&&(g().__VUE_I18N_FULL_INSTALL__=!0),"boolean"!==typeof __VUE_I18N_LEGACY_API__&&(g().__VUE_I18N_LEGACY_API__=!0),"boolean"!==typeof __INTLIFY_DROP_MESSAGE_COMPILER__&&(g().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),"boolean"!==typeof __INTLIFY_PROD_DEVTOOLS__&&(g().__INTLIFY_PROD_DEVTOOLS__=!1)}const Gn={UNEXPECTED_RETURN_TYPE:pt,INVALID_ARGUMENT:25,MUST_BE_CALL_SETUP_TOP:26,NOT_INSTALLED:27,REQUIRED_VALUE:28,INVALID_VALUE:29,CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:30,NOT_INSTALLED_WITH_PROVIDE:31,UNEXPECTED_ERROR:32,NOT_COMPATIBLE_LEGACY_VUE_I18N:33,NOT_AVAILABLE_COMPOSITION_IN_LEGACY:34};function Kn(e,...t){return Z(e,null,void 0)}Gn.UNEXPECTED_RETURN_TYPE,Gn.INVALID_ARGUMENT,Gn.MUST_BE_CALL_SETUP_TOP,Gn.NOT_INSTALLED,Gn.UNEXPECTED_ERROR,Gn.REQUIRED_VALUE,Gn.INVALID_VALUE,Gn.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN,Gn.NOT_INSTALLED_WITH_PROVIDE,Gn.NOT_COMPATIBLE_LEGACY_VUE_I18N,Gn.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;const qn=s("__translateVNode"),zn=s("__datetimeParts"),Yn=s("__numberParts"),Xn=s("__setPluralRules");s("__intlifyMeta");const Qn=s("__injectWithOption"),Jn=s("__dispose"),Zn={FALLBACK_TO_ROOT:xt,NOT_FOUND_PARENT_SCOPE:xt+1,IGNORE_OBJ_FLATTEN:xt+2,DEPRECATE_LEGACY_MODE:xt+3,DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE:xt+4,DUPLICATE_USE_I18N_CALLING:xt+5};Zn.FALLBACK_TO_ROOT,Zn.NOT_FOUND_PARENT_SCOPE,Zn.IGNORE_OBJ_FLATTEN,Zn.DEPRECATE_LEGACY_MODE,Zn.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE,Zn.DUPLICATE_USE_I18N_CALLING;function er(e){if(!T(e))return e;if(Le(e))return e;for(const t in e)if(v(e,t))if(t.includes(".")){const n=t.split("."),r=n.length-1;let i=e,s=!1;for(let e=0;e<r;e++){if("__proto__"===n[e])throw new Error(`unsafe key: ${n[e]}`);if(n[e]in i||(i[n[e]]=p()),!T(i[n[e]])){s=!0;break}i=i[n[e]]}if(s||(Le(i)?Je.includes(n[r])||delete e[t]:(i[n[r]]=e[t],delete e[t])),!Le(i)){const e=i[n[r]];T(e)&&er(e)}}else T(e[t])&&er(e[t]);return e}function tr(e,t){const{messages:n,__i18n:r,messageResolver:i,flatJson:s}=t,o=A(n)?n:_(r)?p():{[e]:p()};if(_(r)&&r.forEach(e=>{if("locale"in e&&"resource"in e){const{locale:t,resource:n}=e;t?(o[t]=o[t]||p(),z(n,o[t])):z(n,o)}else w(e)&&z(JSON.parse(e),o)}),null==i&&s)for(const a in o)v(o,a)&&er(o[a]);return o}function nr(e){return e.type}function rr(e,t,n){let r=T(t.messages)?t.messages:p();"__i18nGlobal"in n&&(r=tr(e.locale.value,{messages:r,__i18n:n.__i18nGlobal}));const i=Object.keys(r);if(i.length&&i.forEach(t=>{e.mergeLocaleMessage(t,r[t])}),T(t.datetimeFormats)){const n=Object.keys(t.datetimeFormats);n.length&&n.forEach(n=>{e.mergeDateTimeFormat(n,t.datetimeFormats[n])})}if(T(t.numberFormats)){const n=Object.keys(t.numberFormats);n.length&&n.forEach(n=>{e.mergeNumberFormat(n,t.numberFormats[n])})}}function ir(e){return(0,$n.bF)($n.EY,null,e,0)}function sr(){const e="currentInstance";return e in r?r[e]:$n.nI()}const or="__INTLIFY_META__",ar=()=>[],cr=()=>!1;let ur=0;function lr(e){return(t,n,r,i)=>e(n,r,sr()||void 0,i)}const hr=()=>{const e=sr();let t=null;return e&&(t=nr(e)[or])?{[or]:t}:null};function fr(e={}){const{__root:t,__injectWithOption:n}=e,r=void 0===t,s=e.flatJson,o=i?Bn.KR:Bn.IJ;let a=!b(e.inheritLocale)||e.inheritLocale;const u=o(t&&a?t.locale.value:w(e.locale)?e.locale:Ft),h=o(t&&a?t.fallbackLocale.value:w(e.fallbackLocale)||_(e.fallbackLocale)||A(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:u.value),d=o(tr(u.value,e)),p=o(A(e.datetimeFormats)?e.datetimeFormats:{[u.value]:{}}),m=o(A(e.numberFormats)?e.numberFormats:{[u.value]:{}});let g=t?t.missingWarn:!b(e.missingWarn)&&!l(e.missingWarn)||e.missingWarn,y=t?t.fallbackWarn:!b(e.fallbackWarn)&&!l(e.fallbackWarn)||e.fallbackWarn,I=t?t.fallbackRoot:!b(e.fallbackRoot)||e.fallbackRoot,S=!!e.fallbackFormat,C=E(e.missing)?e.missing:null,k=E(e.missing)?lr(e.missing):null,N=E(e.postTranslation)?e.postTranslation:null,R=t?t.warnHtmlMessage:!b(e.warnHtmlMessage)||e.warnHtmlMessage,O=!!e.escapeParameter;const P=t?t.modifiers:A(e.modifiers)?e.modifiers:{};let D,L=e.pluralRules||t&&t.pluralRules;const x=()=>{r&&Jt(null);const t={version:Hn,locale:u.value,fallbackLocale:h.value,messages:d.value,modifiers:P,pluralRules:L,missing:null===k?void 0:k,missingWarn:g,fallbackWarn:y,fallbackFormat:S,unresolving:!0,postTranslation:null===N?void 0:N,warnHtmlMessage:R,escapeParameter:O,messageResolver:e.messageResolver,messageCompiler:e.messageCompiler,__meta:{framework:"vue"}};t.datetimeFormats=p.value,t.numberFormats=m.value,t.__datetimeFormatters=A(D)?D.__datetimeFormatters:void 0,t.__numberFormatters=A(D)?D.__numberFormatters:void 0;const n=tn(t);return r&&Jt(n),n};function M(){return[u.value,h.value,d.value,p.value,m.value]}D=x(),sn(D,u.value,h.value);const U=(0,$n.EW)({get:()=>u.value,set:e=>{D.locale=e,u.value=e}}),F=(0,$n.EW)({get:()=>h.value,set:e=>{D.fallbackLocale=e,h.value=e,sn(D,u.value,e)}}),V=(0,$n.EW)(()=>d.value),j=(0,$n.EW)(()=>p.value),$=(0,$n.EW)(()=>m.value);function B(){return E(N)?N:null}function H(e){N=e,D.postTranslation=e}function W(){return C}function G(e){null!==e&&(k=lr(e)),C=e,D.missing=k}const K=(e,n,i,s,o,a)=>{let u;M();try{__INTLIFY_PROD_DEVTOOLS__&&Yt(hr()),r||(D.fallbackContext=t?Zt():void 0),u=e(D)}finally{__INTLIFY_PROD_DEVTOOLS__&&Yt(null),r||(D.fallbackContext=void 0)}if("translate exists"!==i&&c(u)&&u===Ut||"translate exists"===i&&!u){const[e,r]=n();return t&&I?s(t):o(e)}if(a(u))return u;throw Kn(Gn.UNEXPECTED_RETURN_TYPE)};function q(...e){return K(t=>Reflect.apply(On,null,[t,...e]),()=>Mn(...e),"translate",t=>Reflect.apply(t.t,t,[...e]),e=>e,e=>w(e))}function Y(...e){const[t,n,r]=e;if(r&&!T(r))throw Kn(Gn.INVALID_ARGUMENT);return q(t,n,f({resolvedMessage:!0},r||{}))}function X(...e){return K(t=>Reflect.apply(dn,null,[t,...e]),()=>mn(...e),"datetime format",t=>Reflect.apply(t.d,t,[...e]),()=>Vt,e=>w(e)||_(e))}function Q(...e){return K(t=>Reflect.apply(yn,null,[t,...e]),()=>_n(...e),"number format",t=>Reflect.apply(t.n,t,[...e]),()=>Vt,e=>w(e)||_(e))}function J(e){return e.map(e=>w(e)||c(e)||b(e)?ir(String(e)):e)}const Z=e=>e,ee={normalize:J,interpolate:Z,type:"vnode"};function te(...e){return K(t=>{let n;const r=t;try{r.processor=ee,n=Reflect.apply(On,null,[r,...e])}finally{r.processor=null}return n},()=>Mn(...e),"translate",t=>t[qn](...e),e=>[ir(e)],e=>_(e))}function ne(...e){return K(t=>Reflect.apply(yn,null,[t,...e]),()=>_n(...e),"number format",t=>t[Yn](...e),ar,e=>w(e)||_(e))}function re(...e){return K(t=>Reflect.apply(dn,null,[t,...e]),()=>mn(...e),"datetime format",t=>t[zn](...e),ar,e=>w(e)||_(e))}function ie(e){L=e,D.pluralRules=L}function se(e,t){return K(()=>{if(!e)return!1;const n=w(t)?t:u.value,r=w(t)?[n]:Et(D,h.value,n);for(let t=0;t<r.length;t++){const n=ce(r[t]);let i=D.messageResolver(n,e);if(null===i&&(i=n[e]),Le(i)||Rn(i)||w(i))return!0}return!1},()=>[e],"translate exists",n=>Reflect.apply(n.te,n,[e,t]),cr,e=>b(e))}function oe(e){let t=null;const n=Et(D,h.value,u.value);for(let r=0;r<n.length;r++){const i=d.value[n[r]]||{},s=D.messageResolver(i,e);if(null!=s){t=s;break}}return t}function ae(e){const n=oe(e);return null!=n?n:t&&t.tm(e)||{}}function ce(e){return d.value[e]||{}}function ue(e,t){if(s){const n={[e]:t};for(const e in n)v(n,e)&&er(n[e]);t=n[e]}d.value[e]=t,D.messages=d.value}function le(e,t){d.value[e]=d.value[e]||{};const n={[e]:t};if(s)for(const r in n)v(n,r)&&er(n[r]);t=n[e],z(t,d.value[e]),D.messages=d.value}function he(e){return p.value[e]||{}}function fe(e,t){p.value[e]=t,D.datetimeFormats=p.value,gn(D,e,t)}function de(e,t){p.value[e]=f(p.value[e]||{},t),D.datetimeFormats=p.value,gn(D,e,t)}function pe(e){return m.value[e]||{}}function me(e,t){m.value[e]=t,D.numberFormats=m.value,En(D,e,t)}function ge(e,t){m.value[e]=f(m.value[e]||{},t),D.numberFormats=m.value,En(D,e,t)}ur++,t&&i&&((0,$n.wB)(t.locale,e=>{a&&(u.value=e,D.locale=e,sn(D,u.value,h.value))}),(0,$n.wB)(t.fallbackLocale,e=>{a&&(h.value=e,D.fallbackLocale=e,sn(D,u.value,h.value))}));const ye={id:ur,locale:U,fallbackLocale:F,get inheritLocale(){return a},set inheritLocale(e){a=e,e&&t&&(u.value=t.locale.value,h.value=t.fallbackLocale.value,sn(D,u.value,h.value))},get availableLocales(){return Object.keys(d.value).sort()},messages:V,get modifiers(){return P},get pluralRules(){return L||{}},get isGlobal(){return r},get missingWarn(){return g},set missingWarn(e){g=e,D.missingWarn=g},get fallbackWarn(){return y},set fallbackWarn(e){y=e,D.fallbackWarn=y},get fallbackRoot(){return I},set fallbackRoot(e){I=e},get fallbackFormat(){return S},set fallbackFormat(e){S=e,D.fallbackFormat=S},get warnHtmlMessage(){return R},set warnHtmlMessage(e){R=e,D.warnHtmlMessage=e},get escapeParameter(){return O},set escapeParameter(e){O=e,D.escapeParameter=e},t:q,getLocaleMessage:ce,setLocaleMessage:ue,mergeLocaleMessage:le,getPostTranslationHandler:B,setPostTranslationHandler:H,getMissingHandler:W,setMissingHandler:G,[Xn]:ie};return ye.datetimeFormats=j,ye.numberFormats=$,ye.rt=Y,ye.te=se,ye.tm=ae,ye.d=X,ye.n=Q,ye.getDateTimeFormat=he,ye.setDateTimeFormat=fe,ye.mergeDateTimeFormat=de,ye.getNumberFormat=pe,ye.setNumberFormat=me,ye.mergeNumberFormat=ge,ye[Qn]=n,ye[qn]=te,ye[zn]=re,ye[Yn]=ne,ye}function dr(e){const t=w(e.locale)?e.locale:Ft,n=w(e.fallbackLocale)||_(e.fallbackLocale)||A(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:t,r=E(e.missing)?e.missing:void 0,i=!b(e.silentTranslationWarn)&&!l(e.silentTranslationWarn)||!e.silentTranslationWarn,s=!b(e.silentFallbackWarn)&&!l(e.silentFallbackWarn)||!e.silentFallbackWarn,o=!b(e.fallbackRoot)||e.fallbackRoot,a=!!e.formatFallbackMessages,c=A(e.modifiers)?e.modifiers:{},u=e.pluralizationRules,h=E(e.postTranslation)?e.postTranslation:void 0,d=!w(e.warnHtmlInMessage)||"off"!==e.warnHtmlInMessage,p=!!e.escapeParameterHtml,m=!b(e.sync)||e.sync;let g=e.messages;if(A(e.sharedMessages)){const t=e.sharedMessages,n=Object.keys(t);g=n.reduce((e,n)=>{const r=e[n]||(e[n]={});return f(r,t[n]),e},g||{})}const{__i18n:y,__root:v,__injectWithOption:T}=e,I=e.datetimeFormats,S=e.numberFormats,C=e.flatJson;return{locale:t,fallbackLocale:n,messages:g,flatJson:C,datetimeFormats:I,numberFormats:S,missing:r,missingWarn:i,fallbackWarn:s,fallbackRoot:o,fallbackFormat:a,modifiers:c,pluralRules:u,postTranslation:h,warnHtmlMessage:d,escapeParameter:p,messageResolver:e.messageResolver,inheritLocale:m,__i18n:y,__root:v,__injectWithOption:T}}function pr(e={}){const t=fr(dr(e)),{__extender:n}=e,r={id:t.id,get locale(){return t.locale.value},set locale(e){t.locale.value=e},get fallbackLocale(){return t.fallbackLocale.value},set fallbackLocale(e){t.fallbackLocale.value=e},get messages(){return t.messages.value},get datetimeFormats(){return t.datetimeFormats.value},get numberFormats(){return t.numberFormats.value},get availableLocales(){return t.availableLocales},get missing(){return t.getMissingHandler()},set missing(e){t.setMissingHandler(e)},get silentTranslationWarn(){return b(t.missingWarn)?!t.missingWarn:t.missingWarn},set silentTranslationWarn(e){t.missingWarn=b(e)?!e:e},get silentFallbackWarn(){return b(t.fallbackWarn)?!t.fallbackWarn:t.fallbackWarn},set silentFallbackWarn(e){t.fallbackWarn=b(e)?!e:e},get modifiers(){return t.modifiers},get formatFallbackMessages(){return t.fallbackFormat},set formatFallbackMessages(e){t.fallbackFormat=e},get postTranslation(){return t.getPostTranslationHandler()},set postTranslation(e){t.setPostTranslationHandler(e)},get sync(){return t.inheritLocale},set sync(e){t.inheritLocale=e},get warnHtmlInMessage(){return t.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(e){t.warnHtmlMessage="off"!==e},get escapeParameterHtml(){return t.escapeParameter},set escapeParameterHtml(e){t.escapeParameter=e},get pluralizationRules(){return t.pluralRules||{}},__composer:t,t(...e){return Reflect.apply(t.t,t,[...e])},rt(...e){return Reflect.apply(t.rt,t,[...e])},te(e,n){return t.te(e,n)},tm(e){return t.tm(e)},getLocaleMessage(e){return t.getLocaleMessage(e)},setLocaleMessage(e,n){t.setLocaleMessage(e,n)},mergeLocaleMessage(e,n){t.mergeLocaleMessage(e,n)},d(...e){return Reflect.apply(t.d,t,[...e])},getDateTimeFormat(e){return t.getDateTimeFormat(e)},setDateTimeFormat(e,n){t.setDateTimeFormat(e,n)},mergeDateTimeFormat(e,n){t.mergeDateTimeFormat(e,n)},n(...e){return Reflect.apply(t.n,t,[...e])},getNumberFormat(e){return t.getNumberFormat(e)},setNumberFormat(e,n){t.setNumberFormat(e,n)},mergeNumberFormat(e,n){t.mergeNumberFormat(e,n)}};return r.__extender=n,r}function mr(e,t,n){return{beforeCreate(){const r=sr();if(!r)throw Kn(Gn.UNEXPECTED_ERROR);const i=this.$options;if(i.i18n){const r=i.i18n;if(i.__i18n&&(r.__i18n=i.__i18n),r.__root=t,this===this.$root)this.$i18n=gr(e,r);else{r.__injectWithOption=!0,r.__extender=n.__vueI18nExtend,this.$i18n=pr(r);const e=this.$i18n;e.__extender&&(e.__disposer=e.__extender(this.$i18n))}}else if(i.__i18n)if(this===this.$root)this.$i18n=gr(e,i);else{this.$i18n=pr({__i18n:i.__i18n,__injectWithOption:!0,__extender:n.__vueI18nExtend,__root:t});const e=this.$i18n;e.__extender&&(e.__disposer=e.__extender(this.$i18n))}else this.$i18n=e;i.__i18nGlobal&&rr(t,i,i),this.$t=(...e)=>this.$i18n.t(...e),this.$rt=(...e)=>this.$i18n.rt(...e),this.$te=(e,t)=>this.$i18n.te(e,t),this.$d=(...e)=>this.$i18n.d(...e),this.$n=(...e)=>this.$i18n.n(...e),this.$tm=e=>this.$i18n.tm(e),n.__setInstance(r,this.$i18n)},mounted(){0},unmounted(){const e=sr();if(!e)throw Kn(Gn.UNEXPECTED_ERROR);const t=this.$i18n;t&&(delete this.$t,delete this.$rt,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,t?.__disposer&&(t.__disposer(),delete t.__disposer,delete t.__extender),n.__deleteInstance(e),delete this.$i18n)}}}function gr(e,t){e.locale=t.locale||e.locale,e.fallbackLocale=t.fallbackLocale||e.fallbackLocale,e.missing=t.missing||e.missing,e.silentTranslationWarn=t.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=t.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=t.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=t.postTranslation||e.postTranslation,e.warnHtmlInMessage=t.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=t.escapeParameterHtml||e.escapeParameterHtml,e.sync=t.sync||e.sync,e.__composer[Xn](t.pluralizationRules||e.pluralizationRules);const n=tr(e.locale,{messages:t.messages,__i18n:t.__i18n});return Object.keys(n).forEach(t=>e.mergeLocaleMessage(t,n[t])),t.datetimeFormats&&Object.keys(t.datetimeFormats).forEach(n=>e.mergeDateTimeFormat(n,t.datetimeFormats[n])),t.numberFormats&&Object.keys(t.numberFormats).forEach(n=>e.mergeNumberFormat(n,t.numberFormats[n])),e}const yr={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>"parent"===e||"global"===e,default:"parent"},i18n:{type:Object}};function vr({slots:e},t){if(1===t.length&&"default"===t[0]){const t=e.default?e.default():[];return t.reduce((e,t)=>[...e,...t.type===$n.FK?t.children:[t]],[])}return t.reduce((t,n)=>{const r=e[n];return r&&(t[n]=r()),t},p())}function _r(){return $n.FK}const Er=(0,$n.pM)({name:"i18n-t",props:f({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>c(e)||!isNaN(e)}},yr),setup(e,t){const{slots:n,attrs:r}=t,i=e.i18n||Dr({useScope:e.scope,__useComponent:!0});return()=>{const s=()=>{const r=Object.keys(n).filter(e=>"_"!==e[0]),s=p();e.locale&&(s.locale=e.locale),void 0!==e.plural&&(s.plural=w(e.plural)?+e.plural:e.plural);const o=vr(t,r);return i[qn](e.keypath,o,s)},o=f(p(),r),a=w(e.tag)||T(e.tag)?e.tag:_r();return T(a)?(0,$n.h)(a,o,{default:s}):(0,$n.h)(a,o,s())}}}),wr=Er;function br(e){return _(e)&&!w(e[0])}function Tr(e,t,n,r){const{slots:i,attrs:s}=t;return()=>{const t=()=>{const t={part:!0};let s=p();e.locale&&(t.locale=e.locale),w(e.format)?t.key=e.format:T(e.format)&&(w(e.format.key)&&(t.key=e.format.key),s=Object.keys(e.format).reduce((t,r)=>n.includes(r)?f(p(),t,{[r]:e.format[r]}):t,p()));const o=r(e.value,t,s);let a=[t.key];return _(o)?a=o.map((e,t)=>{const n=i[e.type],r=n?n({[e.type]:e.value,index:t,parts:o}):[e.value];return br(r)&&(r[0].key=`${e.type}-${t}`),r}):w(o)&&(a=[o]),a},o=f(p(),s),a=w(e.tag)||T(e.tag)?e.tag:_r();return T(a)?(0,$n.h)(a,o,{default:t}):(0,$n.h)(a,o,t())}}const Ir=(0,$n.pM)({name:"i18n-n",props:f({value:{type:Number,required:!0},format:{type:[String,Object]}},yr),setup(e,t){const n=e.i18n||Dr({useScope:e.scope,__useComponent:!0});return Tr(e,t,vn,(...e)=>n[Yn](...e))}}),Sr=Ir;function Cr(e,t){const n=e;if("composition"===e.mode)return n.__getInstance(t)||e.global;{const r=n.__getInstance(t);return null!=r?r.__composer:e.global.__composer}}function Ar(e){const t=t=>{const{instance:n,value:r}=t;if(!n||!n.$)throw Kn(Gn.UNEXPECTED_ERROR);const i=Cr(e,n.$),s=kr(r);return[Reflect.apply(i.t,i,[...Nr(s)]),i]},n=(e,n)=>{const[r,s]=t(n);i&&(e.__i18nWatcher=(0,$n.wB)(s.locale,()=>{n.instance&&n.instance.$forceUpdate()})),e.__composer=s,e.textContent=r},r=e=>{i&&e.__i18nWatcher&&(e.__i18nWatcher(),e.__i18nWatcher=void 0,delete e.__i18nWatcher),e.__composer&&(e.__composer=void 0,delete e.__composer)},s=(e,{value:t})=>{if(e.__composer){const n=e.__composer,r=kr(t);e.textContent=Reflect.apply(n.t,n,[...Nr(r)])}},o=e=>{const[n]=t(e);return{textContent:n}};return{created:n,unmounted:r,beforeUpdate:s,getSSRProps:o}}function kr(e){if(w(e))return{path:e};if(A(e)){if(!("path"in e))throw Kn(Gn.REQUIRED_VALUE,"path");return e}throw Kn(Gn.INVALID_VALUE)}function Nr(e){const{path:t,locale:n,args:r,choice:i,plural:s}=e,o={},a=r||{};return w(n)&&(o.locale=n),c(i)&&(o.plural=i),c(s)&&(o.plural=s),[t,a,o]}function Rr(e,t,...n){const r=A(n[0])?n[0]:{},i=!b(r.globalInstall)||r.globalInstall;i&&([wr.name,"I18nT"].forEach(t=>e.component(t,wr)),[Sr.name,"I18nN"].forEach(t=>e.component(t,Sr)),[Gr.name,"I18nD"].forEach(t=>e.component(t,Gr))),e.directive("t",Ar(t))}const Or=s("global-vue-i18n");function Pr(e={}){const t=__VUE_I18N_LEGACY_API__&&b(e.legacy)?e.legacy:__VUE_I18N_LEGACY_API__;const n=!b(e.globalInjection)||e.globalInjection,r=new Map,[i,o]=Lr(e,t),a=s("");function c(e){return r.get(e)||null}function u(e,t){r.set(e,t)}function l(e){r.delete(e)}const h={get mode(){return __VUE_I18N_LEGACY_API__&&t?"legacy":"composition"},async install(e,...r){if(e.__VUE_I18N_SYMBOL__=a,e.provide(e.__VUE_I18N_SYMBOL__,h),A(r[0])){const e=r[0];h.__composerExtend=e.__composerExtend,h.__vueI18nExtend=e.__vueI18nExtend}let i=null;!t&&n&&(i=Hr(e,h.global)),__VUE_I18N_FULL_INSTALL__&&Rr(e,h,...r),__VUE_I18N_LEGACY_API__&&t&&e.mixin(mr(o,o.__composer,h));const s=e.unmount;e.unmount=()=>{i&&i(),h.dispose(),s()}},get global(){return o},dispose(){i.stop()},__instances:r,__getInstance:c,__setInstance:u,__deleteInstance:l};return h}function Dr(e={}){const t=sr();if(null==t)throw Kn(Gn.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&null!=t.appContext.app&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw Kn(Gn.NOT_INSTALLED);const n=xr(t),r=Ur(n),i=nr(t),s=Mr(e,i);if("global"===s)return rr(r,e,i),r;if("parent"===s){let i=Fr(n,t,e.__useComponent);return null==i&&(i=r),i}if("isolated"===s){if("composition"!==n.mode)throw Kn(Gn.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const i=n,s=f({},e),o=Fr(n,t);s.__root=o||r;const a=fr(s);i.__composerExtend&&(a[Jn]=i.__composerExtend(a));0;const c=(0,Bn.o5)();return c&&(0,Bn.jr)(()=>{const e=a[Jn];e&&(e(),delete a[Jn])}),a}const o=n;let a=o.__getInstance(t);if(null==a){const n=f({},e);"__i18n"in i&&(n.__i18n=i.__i18n),r&&(n.__root=r),a=fr(n),o.__composerExtend&&(a[Jn]=o.__composerExtend(a)),jr(o,t,a),o.__setInstance(t,a)}else 0;return a}function Lr(e,t){const n=(0,Bn.uY)(),r=__VUE_I18N_LEGACY_API__&&t?n.run(()=>pr(e)):n.run(()=>fr(e));if(null==r)throw Kn(Gn.UNEXPECTED_ERROR);return[n,r]}function xr(e){const t=(0,$n.WQ)(e.isCE?Or:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw Kn(e.isCE?Gn.NOT_INSTALLED_WITH_PROVIDE:Gn.UNEXPECTED_ERROR);return t}function Mr(e,t){return h(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}function Ur(e){return"composition"===e.mode?e.global:e.global.__composer}function Fr(e,t,n=!1){let r=null;const i=t.root;let s=Vr(t,n);while(null!=s){const t=e;if("composition"===e.mode)r=t.__getInstance(s);else if(__VUE_I18N_LEGACY_API__){const e=t.__getInstance(s);null!=e&&(r=e.__composer,n&&r&&!r[Qn]&&(r=null))}if(null!=r)break;if(i===s)break;s=s.parent}return r}function Vr(e,t=!1){return null==e?null:t&&e.vnode.ctx||e.parent}function jr(e,t,n){(0,$n.sV)(()=>{0},t),(0,$n.hi)(()=>{const r=n;e.__deleteInstance(t);const i=r[Jn];i&&(i(),delete r[Jn])},t)}const $r=["locale","fallbackLocale","availableLocales"],Br=["t","rt","d","n","tm","te"];function Hr(e,t){const n=Object.create(null);$r.forEach(e=>{const r=Object.getOwnPropertyDescriptor(t,e);if(!r)throw Kn(Gn.UNEXPECTED_ERROR);const i=(0,Bn.i9)(r.value)?{get(){return r.value.value},set(e){r.value.value=e}}:{get(){return r.get&&r.get()}};Object.defineProperty(n,e,i)}),e.config.globalProperties.$i18n=n,Br.forEach(n=>{const r=Object.getOwnPropertyDescriptor(t,n);if(!r||!r.value)throw Kn(Gn.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${n}`,r)});const r=()=>{delete e.config.globalProperties.$i18n,Br.forEach(t=>{delete e.config.globalProperties[`$${t}`]})};return r}const Wr=(0,$n.pM)({name:"i18n-d",props:f({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},yr),setup(e,t){const n=e.i18n||Dr({useScope:e.scope,__useComponent:!0});return Tr(e,t,pn,(...e)=>n[zn](...e))}}),Gr=Wr;if(Wn(),Gt(at),Kt(Dt),qt(Et),__INTLIFY_PROD_DEVTOOLS__){const e=g();e.__INTLIFY__=!0,ut(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}},3167:function(e,t,n){var r=n(4901),i=n(34),s=n(2967);e.exports=function(e,t,n){var o,a;return s&&r(o=t.constructor)&&o!==n&&i(a=o.prototype)&&a!==n.prototype&&s(e,a),e}},3238:function(e,t,n){var r=n(4576),i=n(7811),s=n(7394),o=r.DataView;e.exports=function(e){if(!i||0!==s(e))return!1;try{return new o(e),!1}catch(t){return!0}}},3392:function(e,t,n){var r=n(9504),i=0,s=Math.random(),o=r(1.1.toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+o(++i+s,36)}},3440:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(5170),a=n(3789),c=n(8469),u=n(507),l=i.has,h=i.remove;e.exports=function(e){var t=r(this),n=a(e),i=s(t);return o(t)<=n.size?c(t,function(e){n.includes(e)&&h(i,e)}):u(n.getIterator(),function(e){l(i,e)&&h(i,e)}),i}},3463:function(e){var t=TypeError;e.exports=function(e){if("string"==typeof e)return e;throw new t("Argument is not a string")}},3506:function(e,t,n){var r=n(3925),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s("Can't set "+i(e)+" as a prototype")}},3579:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("some",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{some:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},3650:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(3789),a=n(507),c=i.add,u=i.has,l=i.remove;e.exports=function(e){var t=r(this),n=o(e).getIterator(),i=s(t);return a(n,function(e){u(t,e)?l(i,e):c(i,e)}),i}},3706:function(e,t,n){var r=n(9504),i=n(4901),s=n(7629),o=r(Function.toString);i(s.inspectSource)||(s.inspectSource=function(e){return o(e)}),e.exports=s.inspectSource},3717:function(e,t){t.f=Object.getOwnPropertySymbols},3724:function(e,t,n){var r=n(9039);e.exports=!r(function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]})},3789:function(e,t,n){var r=n(9306),i=n(8551),s=n(9565),o=n(1291),a=n(1767),c="Invalid size",u=RangeError,l=TypeError,h=Math.max,f=function(e,t){this.set=e,this.size=h(t,0),this.has=r(e.has),this.keys=r(e.keys)};f.prototype={getIterator:function(){return a(i(s(this.keys,this.set)))},includes:function(e){return s(this.has,this.set,e)}},e.exports=function(e){i(e);var t=+e.size;if(t!==t)throw new l(c);var n=o(t);if(n<0)throw new u(c);return new f(e,n)}},3838:function(e,t,n){var r=n(7080),i=n(5170),s=n(8469),o=n(3789);e.exports=function(e){var t=r(this),n=o(e);return!(i(t)>n.size)&&!1!==s(t,function(e){if(!n.includes(e))return!1},!0)}},3853:function(e,t,n){var r=n(6518),i=n(4449),s=n(4916),o=!s("isDisjointFrom",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isDisjointFrom:i})},3925:function(e,t,n){var r=n(34);e.exports=function(e){return r(e)||null===e}},3972:function(e,t,n){var r=n(34),i=String,s=TypeError;e.exports=function(e){if(void 0===e||r(e))return e;throw new s(i(e)+" is not an object or undefined")}},4055:function(e,t,n){var r=n(4576),i=n(34),s=r.document,o=i(s)&&i(s.createElement);e.exports=function(e){return o?s.createElement(e):{}}},4114:function(e,t,n){var r=n(6518),i=n(8981),s=n(6198),o=n(4527),a=n(6837),c=n(9039),u=c(function(){return 4294967297!==[].push.call({length:4294967296},1)}),l=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=u||!l();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=i(this),n=s(t),r=arguments.length;a(n+r);for(var c=0;c<r;c++)t[n]=arguments[c],n++;return o(t,n),n}})},4117:function(e){e.exports=function(e){return null===e||void 0===e}},4154:function(e,t,n){var r=n(6955),i=TypeError;e.exports=function(e){if("Uint8Array"===r(e))return e;throw new i("Argument is not an Uint8Array")}},4204:function(e,t,n){var r=n(7080),i=n(4402).add,s=n(9286),o=n(3789),a=n(507);e.exports=function(e){var t=r(this),n=o(e).getIterator(),c=s(t);return a(n,function(e){i(c,e)}),c}},4209:function(e,t,n){var r=n(8227),i=n(6269),s=r("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||o[s]===e)}},4226:function(e,t,n){var r=n(6518),i=n(4576),s=n(3463),o=n(4154),a=n(5169),c=n(2303);i.Uint8Array&&r({target:"Uint8Array",proto:!0},{setFromHex:function(e){o(this),s(e),a(this.buffer);var t=c(e,this).read;return{read:t,written:t/2}}})},4232:function(e,t,n){n.d(t,{$3:function(){return d},$H:function(){return U},BH:function(){return G},BX:function(){return le},Bm:function(){return w},C4:function(){return J},CE:function(){return m},CP:function(){return u},DY:function(){return F},Gv:function(){return b},J$:function(){return te},Kg:function(){return E},MZ:function(){return i},Mp:function(){return c},NO:function(){return a},Oj:function(){return s},PT:function(){return P},Qd:function(){return A},Ro:function(){return $},SU:function(){return N},TF:function(){return h},Tg:function(){return L},Tn:function(){return _},Tr:function(){return K},Vp:function(){return oe},W0:function(){return ne},We:function(){return H},X$:function(){return l},XW:function(){return ce},Y2:function(){return re},ZH:function(){return x},Zf:function(){return C},_B:function(){return Z},bB:function(){return j},cy:function(){return p},gd:function(){return v},pD:function(){return r},pU:function(){return ge},rU:function(){return M},tE:function(){return o},tl:function(){return Q},u3:function(){return he},vM:function(){return g},v_:function(){return de},wQ:function(){return ie},yI:function(){return k},yL:function(){return T},yQ:function(){return V},z3:function(){return se}});n(4114),n(8111),n(2489),n(7588);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function r(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return e=>e in t}const i={},s=[],o=()=>{},a=()=>!1,c=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),u=e=>e.startsWith("onUpdate:"),l=Object.assign,h=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},f=Object.prototype.hasOwnProperty,d=(e,t)=>f.call(e,t),p=Array.isArray,m=e=>"[object Map]"===S(e),g=e=>"[object Set]"===S(e),y=e=>"[object Date]"===S(e),v=e=>"[object RegExp]"===S(e),_=e=>"function"===typeof e,E=e=>"string"===typeof e,w=e=>"symbol"===typeof e,b=e=>null!==e&&"object"===typeof e,T=e=>(b(e)||_(e))&&_(e.then)&&_(e.catch),I=Object.prototype.toString,S=e=>I.call(e),C=e=>S(e).slice(8,-1),A=e=>"[object Object]"===S(e),k=e=>E(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,N=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),R=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},O=/-(\w)/g,P=R(e=>e.replace(O,(e,t)=>t?t.toUpperCase():"")),D=/\B([A-Z])/g,L=R(e=>e.replace(D,"-$1").toLowerCase()),x=R(e=>e.charAt(0).toUpperCase()+e.slice(1)),M=R(e=>{const t=e?`on${x(e)}`:"";return t}),U=(e,t)=>!Object.is(e,t),F=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},V=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},j=e=>{const t=parseFloat(e);return isNaN(t)?e:t},$=e=>{const t=E(e)?Number(e):NaN;return isNaN(t)?e:t};let B;const H=()=>B||(B="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{});const W="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",G=r(W);function K(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=E(r)?X(r):K(r);if(i)for(const e in i)t[e]=i[e]}return t}if(E(e)||b(e))return e}const q=/;(?![^(]*\))/g,z=/:([^]+)/,Y=/\/\*[^]*?\*\//g;function X(e){const t={};return e.replace(Y,"").split(q).forEach(e=>{if(e){const n=e.split(z);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Q(e){if(!e)return"";if(E(e))return e;let t="";for(const n in e){const r=e[n];if(E(r)||"number"===typeof r){const e=n.startsWith("--")?n:L(n);t+=`${e}:${r};`}}return t}function J(e){let t="";if(E(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const r=J(e[n]);r&&(t+=r+" ")}else if(b(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function Z(e){if(!e)return null;let{class:t,style:n}=e;return t&&!E(t)&&(e.class=J(t)),n&&(e.style=K(n)),e}const ee="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",te=r(ee),ne=r(ee+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function re(e){return!!e||""===e}const ie=r("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"),se=r("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");function oe(e){if(null==e)return!1;const t=typeof e;return"string"===t||"number"===t||"boolean"===t}const ae=/[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;function ce(e,t){return e.replace(ae,e=>t?'"'===e?'\\\\\\"':`\\\\${e}`:`\\${e}`)}function ue(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=le(e[r],t[r]);return n}function le(e,t){if(e===t)return!0;let n=y(e),r=y(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=w(e),r=w(t),n||r)return e===t;if(n=p(e),r=p(t),n||r)return!(!n||!r)&&ue(e,t);if(n=b(e),r=b(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,s=Object.keys(t).length;if(i!==s)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!le(e[n],t[n]))return!1}}return String(e)===String(t)}function he(e,t){return e.findIndex(e=>le(e,t))}const fe=e=>!(!e||!0!==e["__v_isRef"]),de=e=>E(e)?e:null==e?"":p(e)||b(e)&&(e.toString===I||!_(e.toString))?fe(e)?de(e.value):JSON.stringify(e,pe,2):String(e),pe=(e,t)=>fe(t)?pe(e,t.value):m(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[me(t,r)+" =>"]=n,e),{})}:g(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>me(e))}:w(t)?me(t):!b(t)||p(t)||A(t)?t:String(t),me=(e,t="")=>{var n;return w(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};function ge(e){return null==e?"initial":"string"===typeof e?""===e?" ":e:("number"===typeof e&&Number.isFinite(e),String(e))}},4270:function(e,t,n){var r=n(9565),i=n(4901),s=n(34),o=TypeError;e.exports=function(e,t){var n,a;if("string"===t&&i(n=e.toString)&&!s(a=r(n,e)))return a;if(i(n=e.valueOf)&&!s(a=r(n,e)))return a;if("string"!==t&&i(n=e.toString)&&!s(a=r(n,e)))return a;throw new o("Can't convert object to primitive value")}},4376:function(e,t,n){var r=n(2195);e.exports=Array.isArray||function(e){return"Array"===r(e)}},4388:function(e,t,n){n.d(t,{IX:function(){return wt},xI:function(){return ni},hg:function(){return Ht},kZ:function(){return Mt},x9:function(){return Ft},CI:function(){return Wt},f3:function(){return Vt}});n(4114),n(8111),n(2489),n(116),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(262),i=n(2455),s=n(6189),o=n(798);function a(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const c=a,u=new i.FA("auth","Firebase",a()),l=new s.Vy("@firebase/auth");function h(e,...t){l.logLevel<=s.$b.WARN&&l.warn(`Auth (${r.MF}): ${e}`,...t)}function f(e,...t){l.logLevel<=s.$b.ERROR&&l.error(`Auth (${r.MF}): ${e}`,...t)}
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
 */function d(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function m(e,t,n){const r={...c(),[t]:n},s=new i.FA("auth","Firebase",r);return s.create(t,{appName:e.name})}function g(e){return m(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function y(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return u.create(e,...t)}function v(e,t,...n){if(!e)throw y(t,...n)}function _(e){const t="INTERNAL ASSERTION FAILED: "+e;throw f(t),new Error(t)}function E(e,t){e||_(t)}
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
 */function w(){return"undefined"!==typeof self&&self.location?.href||""}function b(){return"http:"===T()||"https:"===T()}function T(){return"undefined"!==typeof self&&self.location?.protocol||null}
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
 */function I(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(b()||(0,i.sr)()||"connection"in navigator))||navigator.onLine}function S(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
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
 */class C{constructor(e,t){this.shortDelay=e,this.longDelay=t,E(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return I()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
 */function A(e,t){E(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
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
 */class k{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void _("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void _("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void _("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const N={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"missing-password",["INVALID_LOGIN_CREDENTIALS"]:"invalid-credential",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]:"password-does-not-meet-requirements",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error",["RECAPTCHA_NOT_ENABLED"]:"recaptcha-not-enabled",["MISSING_RECAPTCHA_TOKEN"]:"missing-recaptcha-token",["INVALID_RECAPTCHA_TOKEN"]:"invalid-recaptcha-token",["INVALID_RECAPTCHA_ACTION"]:"invalid-recaptcha-action",["MISSING_CLIENT_TYPE"]:"missing-client-type",["MISSING_RECAPTCHA_VERSION"]:"missing-recaptcha-version",["INVALID_RECAPTCHA_VERSION"]:"invalid-recaptcha-version",["INVALID_REQ_TYPE"]:"invalid-req-type"},R=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],O=new C(3e4,6e4);
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
 */function P(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function D(e,t,n,r,s={}){return L(e,s,async()=>{let s={},o={};r&&("GET"===t?o=r:s={body:JSON.stringify(r)});const a=(0,i.Am)({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:c,...s};return(0,i.c1)()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(u.credentials="include"),k.fetch()(await M(e,e.config.apiHost,n,a),u)})}async function L(e,t,n){e._canInitEmulator=!1;const r={...N,...t};try{const t=new F(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw V(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw V(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw V(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw V(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw m(e,a,o);d(e,a)}}catch(s){if(s instanceof i.g)throw s;d(e,"network-request-failed",{message:String(s)})}}async function x(e,t,n,r,i={}){const s=await D(e,t,n,r,i);return"mfaPendingCredential"in s&&d(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function M(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?A(e.config,i):`${e.config.apiScheme}://${i}`;if(R.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){const e=s._getPersistence();return e._getFinalTarget(o).toString()}return o}function U(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class F{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),O.get())})}}function V(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}
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
 */function j(e){return void 0!==e&&void 0!==e.enterprise}class ${constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return U(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
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
 */async function B(e,t){return D(e,"GET","/v2/recaptchaConfig",P(e,t))}
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
 */async function H(e,t){return D(e,"POST","/v1/accounts:delete",t)}async function W(e,t){return D(e,"POST","/v1/accounts:lookup",t)}
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
 */function G(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
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
 */async function K(e,t=!1){const n=(0,i.Ku)(e),r=await n.getIdToken(t),s=z(r);v(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"===typeof s.firebase?s.firebase:void 0,a=o?.["sign_in_provider"];return{claims:s,token:r,authTime:G(q(s.auth_time)),issuedAtTime:G(q(s.iat)),expirationTime:G(q(s.exp)),signInProvider:a||null,signInSecondFactor:o?.["sign_in_second_factor"]||null}}function q(e){return 1e3*Number(e)}function z(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return f("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(f("Failed to decode base64 JWT payload"),null)}catch(s){return f("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Y(e){const t=z(e);return v(t,"internal-error"),v("undefined"!==typeof t.exp,"internal-error"),v("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
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
 */async function X(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof i.g&&Q(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function Q({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
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
 */class Z{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=G(this.lastLoginAt),this.creationTime=G(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
 */async function ee(e){const t=e.auth,n=await e.getIdToken(),r=await X(e,W(t,{idToken:n}));v(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=i.providerUserInfo?.length?re(i.providerUserInfo):[],o=ne(e.providerData,s),a=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!o?.length,u=!!a&&c,l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Z(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,l)}async function te(e){const t=(0,i.Ku)(e);await ee(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function ne(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}function re(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
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
 */async function ie(e,t){const n=await L(e,{},async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,o=await M(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),k.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function se(e,t){return D(e,"POST","/v2/accounts:revokeToken",P(e,t))}
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
 */class oe{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v("undefined"!==typeof e.idToken,"internal-error"),v("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):Y(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(0!==e.length,"internal-error");const t=Y(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await ie(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new oe;return n&&(v("string"===typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(v("string"===typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(v("number"===typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new oe,this.toJSON())}_performRefresh(){return _("not implemented")}}
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
 */function ae(e,t){v("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class ce{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new J(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Z(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await X(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return K(this,e)}reload(){return te(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ce({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ee(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(g(this.auth));const e=await this.getIdToken();return await X(this,H(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:f,providerData:d,stsTokenManager:p}=t;v(l&&p,e,"internal-error");const m=oe.fromJSON(this.name,p);v("string"===typeof l,e,"internal-error"),ae(n,e.name),ae(r,e.name),v("boolean"===typeof h,e,"internal-error"),v("boolean"===typeof f,e,"internal-error"),ae(i,e.name),ae(s,e.name),ae(o,e.name),ae(a,e.name),ae(c,e.name),ae(u,e.name);const g=new ce({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:f,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return d&&Array.isArray(d)&&(g.providerData=d.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new oe;r.updateFromServerResponse(t);const i=new ce({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await ee(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];v(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?re(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,o=new oe;o.updateFromIdToken(n);const a=new ce({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Z(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,c),a}}
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
 */const ue=new Map;function le(e){E(e instanceof Function,"Expected a class definition");let t=ue.get(e);return t?(E(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ue.set(e,t),t)}
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
 */function de(e,t,n){return`firebase:${e}:${t}:${n}`}class pe{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=de(this.userKey,r.apiKey,i),this.fullPersistenceKey=de("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await W(this.auth,{idToken:e}).catch(()=>{});return t?ce._fromGetAccountInfoResponse(this.auth,t,e):null}return ce._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new pe(le(fe),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||le(fe);const s=de(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(s);if(t){let n;if("string"===typeof t){const r=await W(e,{idToken:t}).catch(()=>{});if(!r)break;n=await ce._fromGetAccountInfoResponse(e,r,t)}else n=ce._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}})),new pe(i,e,n)):new pe(i,e,n)}}
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
 */function me(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(_e(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(ge(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(we(t))return"Blackberry";if(be(t))return"Webos";if(ye(t))return"Safari";if((t.includes("chrome/")||ve(t))&&!t.includes("edge/"))return"Chrome";if(Ee(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function ge(e=(0,i.ZQ)()){return/firefox\//i.test(e)}function ye(e=(0,i.ZQ)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ve(e=(0,i.ZQ)()){return/crios\//i.test(e)}function _e(e=(0,i.ZQ)()){return/iemobile/i.test(e)}function Ee(e=(0,i.ZQ)()){return/android/i.test(e)}function we(e=(0,i.ZQ)()){return/blackberry/i.test(e)}function be(e=(0,i.ZQ)()){return/webos/i.test(e)}function Te(e=(0,i.ZQ)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ie(e=(0,i.ZQ)()){return Te(e)&&!!window.navigator?.standalone}function Se(){return(0,i.lT)()&&10===document.documentMode}function Ce(e=(0,i.ZQ)()){return Te(e)||Ee(e)||be(e)||we(e)||/windows phone/i.test(e)||_e(e)}
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
 */function Ae(e,t=[]){let n;switch(e){case"Browser":n=me((0,i.ZQ)());break;case"Worker":n=`${me((0,i.ZQ)())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${r.MF}/${s}`}
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
 */async function Ne(e,t={}){return D(e,"GET","/v2/passwordPolicy",P(e,t))}
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
 */const Re=6;class Oe{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Re,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
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
 */class Pe{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Le(this),this.idTokenSubscription=new Le(this),this.beforeStateQueue=new ke(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=u,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=le(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await pe.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await W(this,{idToken:e}),n=await ce._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==r||!s?.user||(n=s.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(s){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ee(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=S()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(g(this));const t=e?(0,i.Ku)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(g(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(g(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(le(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ne(this),t=new Oe(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(n.tenantId=this.tenantId),await se(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&le(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await pe.create(this,[le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ae(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&h(`Error while retrieving App Check token: ${e.error}`),e?.token}}function De(e){return(0,i.Ku)(e)}class Le{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)(e=>this.observer=e)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
 */let xe={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Me(e){xe=e}function Ue(e){return xe.loadJS(e)}function Fe(){return xe.recaptchaEnterpriseScript}function Ve(){return xe.gapiScript}function je(e){return`__${e}${Math.floor(1e6*Math.random())}`}
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
 */class $e{constructor(){this.enterprise=new Be}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Be{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const He="recaptcha-enterprise",We="NO_RECAPTCHA";class Ge{constructor(e){this.type=He,this.auth=De(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{B(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new $(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const i=window.grecaptcha;j(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(We)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){const e=new $e;return e.execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&j(window.grecaptcha))r(n,e,i);else{if("undefined"===typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=Fe();0!==t.length&&(t+=n),Ue(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function Ke(e,t,n,r=!1,i=!1){const s=new Ge(e);let o;if(i)o=We;else try{o=await s.verify(n)}catch(c){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function qe(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)})}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ke(e,t,n);return r(e,i).catch(async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ke(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{const i=await Ke(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function ze(e){const t=De(e),n=await B(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new $(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){const e=new Ge(t);e.verify()}}
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
 */function Ye(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;d(e,"already-initialized")}const s=n.initialize({options:t});return s}function Xe(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(le);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function Qe(e,t,n){const r=De(e);v(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!!n?.disableWarnings,o=Je(t),{host:a,port:c}=Ze(t),u=null===c?"":`:${c}`,l={url:`${o}//${a}${u}/`},h=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator)return v(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void v((0,i.bD)(l,r.config.emulator)&&(0,i.bD)(h,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(a)?((0,i.gE)(`${o}//${a}${u}`),(0,i.P1)("Auth",!0)):s||tt()}function Je(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Ze(e){const t=Je(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:et(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:et(t)}}}function et(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function tt(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
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
 */class nt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _("not implemented")}_getIdTokenResponse(e){return _("not implemented")}_linkToIdToken(e,t){return _("not implemented")}_getReauthenticationResolver(e){return _("not implemented")}}
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
 */async function rt(e,t){return D(e,"POST","/v1/accounts:update",t)}async function it(e,t){return D(e,"POST","/v1/accounts:signUp",t)}
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
async function st(e,t){return x(e,"POST","/v1/accounts:signInWithPassword",P(e,t))}
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
async function ot(e,t){return x(e,"POST","/v1/accounts:signInWithEmailLink",P(e,t))}async function at(e,t){return x(e,"POST","/v1/accounts:signInWithEmailLink",P(e,t))}
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
 */class ct extends nt{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ct(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ct(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qe(e,t,"signInWithPassword",st,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ot(e,{email:this._email,oobCode:this._password});default:d(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qe(e,n,"signUpPassword",it,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return at(e,{idToken:t,email:this._email,oobCode:this._password});default:d(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
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
 */async function ut(e,t){return x(e,"POST","/v1/accounts:signInWithIdp",P(e,t))}
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
 */const lt="http://localhost";class ht extends nt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):d("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new ht(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return ut(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,ut(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ut(e,t)}buildRequest(){const e={requestUri:lt,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=(0,i.Am)(t)}return e}}
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
 */async function ft(e,t){return D(e,"POST","/v1/accounts:sendVerificationCode",P(e,t))}async function dt(e,t){return x(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,t))}async function pt(e,t){const n=await x(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,t));if(n.temporaryProof)throw V(e,"account-exists-with-different-credential",n);return n}const mt={["USER_NOT_FOUND"]:"user-not-found"};async function gt(e,t){const n={...t,operation:"REAUTH"};return x(e,"POST","/v1/accounts:signInWithPhoneNumber",P(e,n),mt)}
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
 */class yt extends nt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new yt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new yt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return dt(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return pt(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return gt(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new yt({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
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
 */function vt(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _t(e){const t=(0,i.I9)((0,i.hp)(e))["link"],n=t?(0,i.I9)((0,i.hp)(t))["deep_link_id"]:null,r=(0,i.I9)((0,i.hp)(e))["deep_link_id"],s=r?(0,i.I9)((0,i.hp)(r))["link"]:null;return s||r||n||t||e}class Et{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t["apiKey"]??null,r=t["oobCode"]??null,s=vt(t["mode"]??null);v(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t["continueUrl"]??null,this.languageCode=t["lang"]??null,this.tenantId=t["tenantId"]??null}static parseLink(e){const t=_t(e);try{return new Et(t)}catch{return null}}}
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
class wt{constructor(){this.providerId=wt.PROVIDER_ID}static credential(e,t){return ct._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Et.parseLink(t);return v(n,"argument-error"),ct._fromEmailAndCode(e,n.code,n.tenantId)}}wt.PROVIDER_ID="password",wt.EMAIL_PASSWORD_SIGN_IN_METHOD="password",wt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
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
 */class Tt extends bt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
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
class It extends Tt{constructor(){super("facebook.com")}static credential(e){return ht._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.FACEBOOK_SIGN_IN_METHOD="facebook.com",It.PROVIDER_ID="facebook.com";
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
class St extends Tt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ht._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return St.credential(t,n)}catch{return null}}}St.GOOGLE_SIGN_IN_METHOD="google.com",St.PROVIDER_ID="google.com";
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
class Ct extends Tt{constructor(){super("github.com")}static credential(e){return ht._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com",Ct.PROVIDER_ID="github.com";
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
class At extends Tt{constructor(){super("twitter.com")}static credential(e,t){return ht._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return At.credential(t,n)}catch{return null}}}At.TWITTER_SIGN_IN_METHOD="twitter.com",At.PROVIDER_ID="twitter.com";
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
class kt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await ce._fromIdTokenResponse(e,n,r),s=Nt(n),o=new kt({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Nt(n);return new kt({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Nt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
class Rt extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Rt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Rt(e,t,n,r)}}function Ot(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Rt._fromErrorAndOperation(e,n,t,r);throw n})}
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
 */async function Pt(e,t,n=!1){const r=await X(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return kt._forOperation(e,"link",r)}
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
async function Dt(e,t,n=!1){const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(g(i));const s="reauthenticate";try{const r=await X(e,Ot(i,s,t,e),n);v(r.idToken,i,"internal-error");const o=z(r.idToken);v(o,i,"internal-error");const{sub:a}=o;return v(e.uid===a,i,"user-mismatch"),kt._forOperation(e,s,r)}catch(o){throw"auth/user-not-found"===o?.code&&d(i,"user-mismatch"),o}}
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
 */async function Lt(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i="signIn",s=await Ot(e,i,t),o=await kt._fromIdTokenResponse(e,i,s);return n||await e._updateCurrentUser(o.user),o}async function xt(e,t){return Lt(De(e),t)}async function Mt(e,t){return Dt((0,i.Ku)(e),t)}
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
async function Ut(e){const t=De(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}function Ft(e,t,n){return(0,r.xZ)(e.app)?Promise.reject(g(e)):xt((0,i.Ku)(e),wt.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Ut(e),t})}
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
 */function Vt(e,t){return jt((0,i.Ku)(e),null,t)}async function jt(e,t,n){const{auth:r}=e,i=await e.getIdToken(),s={idToken:i,returnSecureToken:!0};t&&(s.email=t),n&&(s.password=n);const o=await X(e,rt(r,s));await e._updateTokensIfNecessary(o,!0)}
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
 */function $t(e,t,n,r){return(0,i.Ku)(e).onIdTokenChanged(t,n,r)}function Bt(e,t,n){return(0,i.Ku)(e).beforeAuthStateChanged(t,n)}function Ht(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}function Wt(e){return(0,i.Ku)(e).signOut()}
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
function Gt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:start",P(e,t))}function Kt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:finalize",P(e,t))}function qt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:start",P(e,t))}function zt(e,t){return D(e,"POST","/v2/accounts/mfaEnrollment:finalize",P(e,t))}new WeakMap;const Yt="__sak";
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
 */class Xt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Yt,"1"),this.storage.removeItem(Yt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
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
 */const Qt=1e3,Jt=10;class Zt extends Xt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ce(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Se()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Jt):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Qt)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Zt.type="LOCAL";const en=Zt,tn=1e3;
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
 */function nn(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function rn(e){const t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class sn{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=rn(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return nn(t)}async _remove(e){if(!this._isAvailable())return;const t=await this._get(e);if(!t)return;const n=rn(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=rn(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);const i=e.deleted.find(e=>e.name===n);i&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=nn(n);const i=setInterval(()=>{const e=nn(n);e!==r&&(t(e),r=e)},tn),s=()=>clearInterval(i);this.listenerUnsubscribes.set(t,s)}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}sn.type="COOKIE";
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
class on extends Xt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}on.type="SESSION";const an=on;
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
 */function cn(e){return Promise.all(e.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}
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
 */class un{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new un(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await cn(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
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
function ln(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
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
 */un.receivers=[];class hn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=ln("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
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
 */function fn(){return window}function dn(e){fn().location.href=e}
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
 */function pn(){return"undefined"!==typeof fn()["WorkerGlobalScope"]&&"function"===typeof fn()["importScripts"]}async function mn(){if(!navigator?.serviceWorker)return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch{return null}}function gn(){return navigator?.serviceWorker?.controller||null}function yn(){return pn()?self:null}
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
 */const vn="firebaseLocalStorageDb",_n=1,En="firebaseLocalStorage",wn="fbase_key";class bn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Tn(e,t){return e.transaction([En],t?"readwrite":"readonly").objectStore(En)}function In(){const e=indexedDB.deleteDatabase(vn);return new bn(e).toPromise()}function Sn(){const e=indexedDB.open(vn,_n);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(En,{keyPath:wn})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(En)?t(n):(n.close(),await In(),t(await Sn()))})})}async function Cn(e,t,n){const r=Tn(e,!0).put({[wn]:t,value:n});return new bn(r).toPromise()}async function An(e,t){const n=Tn(e,!1).get(t),r=await new bn(n).toPromise();return void 0===r?null:r.value}function kn(e,t){const n=Tn(e,!0).delete(t);return new bn(n).toPromise()}const Nn=800,Rn=3;class On{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Sn()),this.db}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>Rn)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return pn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=un._getInstance(yn()),this.receiver._subscribe("keyChanged",async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await mn(),!this.activeServiceWorker)return;this.sender=new hn(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&gn()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Sn();return await Cn(e,Yt,"1"),await kn(e,Yt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cn(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>An(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>kn(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=Tn(e,!1).getAll();return new bn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Nn)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}On.type="LOCAL";const Pn=On;
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
 */function Dn(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:start",P(e,t))}function Ln(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:finalize",P(e,t))}function xn(e,t){return D(e,"POST","/v2/accounts/mfaSignIn:finalize",P(e,t))}
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
const Mn="recaptcha";async function Un(e,t,n){if(!e._getRecaptchaConfig())try{await ze(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){v("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===We){v(n?.type===Mn,e,"argument-error");const r=await Fn(e,t,n);return Gt(e,r)}return Gt(e,t)},o=qe(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),a=await o.catch(e=>Promise.reject(e));return a.phoneSessionInfo.sessionInfo}{v("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;v(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===We){v(n?.type===Mn,e,"argument-error");const r=await Fn(e,t,n);return Dn(e,r)}return Dn(e,t)},a=qe(e,s,"mfaSmsSignIn",o,"PHONE_PROVIDER"),c=await a.catch(e=>Promise.reject(e));return c.phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===We){v(n?.type===Mn,e,"argument-error");const r=await Fn(e,t,n);return ft(e,r)}return ft(e,t)},s=qe(e,t,"sendVerificationCode",i,"PHONE_PROVIDER"),o=await s.catch(e=>Promise.reject(e));return o.sessionInfo}}finally{n?._reset()}}async function Fn(e,t,n){v(n.type===Mn,e,"argument-error");const r=await n.verify();v("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
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
 */class Vn{constructor(e){this.providerId=Vn.PROVIDER_ID,this.auth=De(e)}verifyPhoneNumber(e,t){return Un(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return yt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Vn.credentialFromTaggedObject(t)}static credentialFromError(e){return Vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?yt._fromTokenResponse(t,n):null}}
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
function jn(e,t){return t?le(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
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
 */Vn.PROVIDER_ID="phone",Vn.PHONE_SIGN_IN_METHOD="phone";class $n extends nt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ut(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ut(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ut(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Bn(e){return Lt(e.auth,new $n(e),e.bypassAuthState)}function Hn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Dt(n,new $n(e),e.bypassAuthState)}async function Wn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Pt(n,new $n(e),e.bypassAuthState)}
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
 */class Gn{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Bn;case"linkViaPopup":case"linkViaRedirect":return Wn;case"reauthViaPopup":case"reauthViaRedirect":return Hn;default:d(this.auth,"internal-error")}}resolve(e){E(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){E(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const Kn=new C(2e3,1e4);class qn extends Gn{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,qn.currentPopupAction&&qn.currentPopupAction.cancel(),qn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){E(1===this.filter.length,"Popup operations only handle one event");const e=ln();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qn.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Kn.get())};e()}}qn.currentPopupAction=null;
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
const zn="pendingRedirect",Yn=new Map;class Xn extends Gn{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Yn.get(this.auth._key());if(!e){try{const t=await Qn(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Yn.set(this.auth._key(),e)}return this.bypassAuthState||Yn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Qn(e,t){const n=er(t),r=Zn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}function Jn(e,t){Yn.set(e._key(),t)}function Zn(e){return le(e._redirectPersistence)}function er(e){return de(zn,e.config.apiKey,e.name)}
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
 */async function tr(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i=De(e),s=jn(i,t),o=new Xn(i,s,n),a=await o.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}
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
const nr=6e5;class rr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!or(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!sr(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nr&&this.cachedEventUids.clear(),this.cachedEventUids.has(ir(e))}saveEventToCache(e){this.cachedEventUids.add(ir(e)),this.lastProcessedEventTime=Date.now()}}function ir(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function sr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function or(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sr(e);default:return!1}}
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
 */async function ar(e,t={}){return D(e,"GET","/v1/projects",t)}
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
 */const cr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ur=/^https?/;async function lr(e){if(e.config.emulator)return;const{authorizedDomains:t}=await ar(e);for(const n of t)try{if(hr(n))return}catch{}d(e,"unauthorized-domain")}function hr(e){const t=w(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!ur.test(n))return!1;if(cr.test(e))return r===e;const i=e.replace(/\./g,"\\."),s=new RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}
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
 */const fr=new C(3e4,6e4);function dr(){const e=fn().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function pr(e){return new Promise((t,n)=>{function r(){dr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{dr(),n(p(e,"network-request-failed"))},timeout:fr.get()})}if(fn().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!fn().gapi?.load){const t=je("iframefcb");return fn()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},Ue(`${Ve()}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw mr=null,e})}let mr=null;function gr(e){return mr=mr||pr(e),mr}
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
 */const yr=new C(5e3,15e3),vr="__/auth/iframe",_r="emulator/auth/iframe",Er={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function br(e){const t=e.config;v(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?A(t,_r):`https://${e.config.authDomain}/${vr}`,s={apiKey:t.apiKey,appName:e.name,v:r.MF},o=wr.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${(0,i.Am)(s).slice(1)}`}async function Tr(e){const t=await gr(e),n=fn().gapi;return v(n,e,"internal-error"),t.open({where:document.body,url:br(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Er,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),s=fn().setTimeout(()=>{r(i)},yr.get());function o(){fn().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
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
 */const Ir={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Sr=500,Cr=600,Ar="_blank",kr="http://localhost";class Nr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Rr(e,t,n,r=Sr,s=Cr){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Ir,width:r.toString(),height:s.toString(),top:o,left:a},l=(0,i.ZQ)().toLowerCase();n&&(c=ve(l)?Ar:n),ge(l)&&(t=t||kr,u.scrollbars="yes");const h=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(Ie(l)&&"_self"!==c)return Or(t||"",c),new Nr(null);const f=window.open(t||"",c,h);v(f,e,"popup-blocked");try{f.focus()}catch(d){}return new Nr(f)}function Or(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
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
 */const Pr="__/auth/handler",Dr="emulator/auth/handler",Lr=encodeURIComponent("fac");async function xr(e,t,n,s,o,a){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:r.MF,eventId:o};if(t instanceof bt){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof Tt){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const u=c;for(const r of Object.keys(u))void 0===u[r]&&delete u[r];const l=await e._getAppCheckToken(),h=l?`#${Lr}=${encodeURIComponent(l)}`:"";return`${Mr(e)}?${(0,i.Am)(u).slice(1)}${h}`}function Mr({config:e}){return e.emulator?A(e,Dr):`https://${e.authDomain}/${Pr}`}
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
 */const Ur="webStorageSupport";class Fr{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=an,this._completeRedirectFn=tr,this._overrideRedirectResult=Jn}async _openPopup(e,t,n,r){E(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await xr(e,t,n,w(),r);return Rr(e,i,ln())}async _openRedirect(e,t,n,r){await this._originValidation(e);const i=await xr(e,t,n,w(),r);return dn(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(E(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Tr(e),n=new rr(e);return t.register("authEvent",t=>{v(t?.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(Ur,{type:Ur},n=>{const r=n?.[0]?.[Ur];void 0!==r&&t(!!r),d(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=lr(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ce()||ye()||Te()}}const Vr=Fr;class jr{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return _("unexpected MultiFactorSessionType")}}}class $r extends jr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new $r(e)}_finalizeEnroll(e,t,n){return Kt(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Ln(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Br{constructor(){}static assertion(e){return $r._fromCredential(e)}}Br.FACTOR_ID="phone";class Hr{static assertionForEnrollment(e,t){return Wr._fromSecret(e,t)}static assertionForSignIn(e,t){return Wr._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;v("undefined"!==typeof t.user?.auth,"internal-error");const n=await qt(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Gr._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}Hr.FACTOR_ID="totp";class Wr extends jr{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new Wr(t,void 0,e)}static _fromEnrollmentId(e,t){return new Wr(t,e)}async _finalizeEnroll(e,t,n){return v("undefined"!==typeof this.secret,e,"argument-error"),zt(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){v(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return xn(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class Gr{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Gr(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(Kr(e)||Kr(t))&&(n=!0),n&&(Kr(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Kr(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Kr(e){return"undefined"===typeof e||0===e?.length}var qr="@firebase/auth",zr="1.11.0";
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
class Yr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
 */function Xr(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Qr(e){(0,r.om)(new o.uA("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ae(e)},u=new Pe(r,i,s,c);return Xe(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()})),(0,r.om)(new o.uA("auth-internal",e=>{const t=De(e.getProvider("auth").getImmediate());return(e=>new Yr(e))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(qr,zr,Xr(e)),(0,r.KO)(qr,zr,"esm2020")}
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
 */const Jr=300,Zr=(0,i.XA)("authIdTokenMaxAge")||Jr;let ei=null;const ti=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Zr)return;const i=n?.token;ei!==i&&(ei=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ni(e=(0,r.Sx)()){const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Ye(e,{popupRedirectResolver:Vr,persistence:[Pn,en,an]}),s=(0,i.XA)("authTokenSyncURL");if(s&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=ti(e.toString());Bt(n,t,()=>t(n.currentUser)),$t(n,e=>t(e))}}const o=(0,i.Tj)("auth");return o&&Qe(n,`http://${o}`),n}function ri(){return document.getElementsByTagName("head")?.[0]??document}Me({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",ri().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),Qr("Browser")},4402:function(e,t,n){var r=n(9504),i=Set.prototype;e.exports={Set:Set,add:r(i.add),has:r(i.has),remove:r(i["delete"]),proto:i}},4449:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(8469),c=n(507),u=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<=n.size)return!1!==a(t,function(e){if(n.includes(e))return!1},!0);var l=n.getIterator();return!1!==c(l,function(e){if(i(t,e))return u(l,"normal",!1)})}},4495:function(e,t,n){var r=n(9519),i=n(9039),s=n(4576),o=s.String;e.exports=!!Object.getOwnPropertySymbols&&!i(function(){var e=Symbol("symbol detection");return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41})},4527:function(e,t,n){var r=n(3724),i=n(4376),s=TypeError,o=Object.getOwnPropertyDescriptor,a=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=a?function(e,t){if(i(e)&&!o(e,"length").writable)throw new s("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},4549:function(e,t,n){var r=n(4576);e.exports=function(e,t){var n=r.Iterator,i=n&&n.prototype,s=i&&i[e],o=!1;if(s)try{s.call({next:function(){return{done:!0}},return:function(){o=!0}},-1)}catch(a){a instanceof t||(o=!1)}if(!o)return s}},4576:function(e,t,n){var r=function(e){return e&&e.Math===Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||r("object"==typeof this&&this)||function(){return this}()||Function("return this")()},4644:function(e,t,n){var r,i,s,o=n(7811),a=n(3724),c=n(4576),u=n(4901),l=n(34),h=n(9297),f=n(6955),d=n(6823),p=n(6699),m=n(6840),g=n(2106),y=n(1625),v=n(2787),_=n(2967),E=n(8227),w=n(3392),b=n(1181),T=b.enforce,I=b.get,S=c.Int8Array,C=S&&S.prototype,A=c.Uint8ClampedArray,k=A&&A.prototype,N=S&&v(S),R=C&&v(C),O=Object.prototype,P=c.TypeError,D=E("toStringTag"),L=w("TYPED_ARRAY_TAG"),x="TypedArrayConstructor",M=o&&!!_&&"Opera"!==f(c.opera),U=!1,F={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},V={BigInt64Array:8,BigUint64Array:8},j=function(e){if(!l(e))return!1;var t=f(e);return"DataView"===t||h(F,t)||h(V,t)},$=function(e){var t=v(e);if(l(t)){var n=I(t);return n&&h(n,x)?n[x]:$(t)}},B=function(e){if(!l(e))return!1;var t=f(e);return h(F,t)||h(V,t)},H=function(e){if(B(e))return e;throw new P("Target is not a typed array")},W=function(e){if(u(e)&&(!_||y(N,e)))return e;throw new P(d(e)+" is not a typed array constructor")},G=function(e,t,n,r){if(a){if(n)for(var i in F){var s=c[i];if(s&&h(s.prototype,e))try{delete s.prototype[e]}catch(o){try{s.prototype[e]=t}catch(u){}}}R[e]&&!n||m(R,e,n?t:M&&C[e]||t,r)}},K=function(e,t,n){var r,i;if(a){if(_){if(n)for(r in F)if(i=c[r],i&&h(i,e))try{delete i[e]}catch(s){}if(N[e]&&!n)return;try{return m(N,e,n?t:M&&N[e]||t)}catch(s){}}for(r in F)i=c[r],!i||i[e]&&!n||m(i,e,t)}};for(r in F)i=c[r],s=i&&i.prototype,s?T(s)[x]=i:M=!1;for(r in V)i=c[r],s=i&&i.prototype,s&&(T(s)[x]=i);if((!M||!u(N)||N===Function.prototype)&&(N=function(){throw new P("Incorrect invocation")},M))for(r in F)c[r]&&_(c[r],N);if((!M||!R||R===O)&&(R=N.prototype,M))for(r in F)c[r]&&_(c[r].prototype,R);if(M&&v(k)!==R&&_(k,R),a&&!h(R,D))for(r in U=!0,g(R,D,{configurable:!0,get:function(){return l(this)?this[L]:void 0}}),F)c[r]&&p(c[r],L,r);e.exports={NATIVE_ARRAY_BUFFER_VIEWS:M,TYPED_ARRAY_TAG:U&&L,aTypedArray:H,aTypedArrayConstructor:W,exportTypedArrayMethod:G,exportTypedArrayStaticMethod:K,getTypedArrayConstructor:$,isView:j,isTypedArray:B,TypedArray:N,TypedArrayPrototype:R}},4659:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=function(e,t,n){r?i.f(e,t,s(0,n)):e[t]=n}},4901:function(e){var t="object"==typeof document&&document.all;e.exports="undefined"==typeof t&&void 0!==t?function(e){return"function"==typeof e||e===t}:function(e){return"function"==typeof e}},4913:function(e,t,n){var r=n(3724),i=n(5917),s=n(8686),o=n(8551),a=n(6969),c=TypeError,u=Object.defineProperty,l=Object.getOwnPropertyDescriptor,h="enumerable",f="configurable",d="writable";t.f=r?s?function(e,t,n){if(o(e),t=a(t),o(n),"function"===typeof e&&"prototype"===t&&"value"in n&&d in n&&!n[d]){var r=l(e,t);r&&r[d]&&(e[t]=n.value,n={configurable:f in n?n[f]:r[f],enumerable:h in n?n[h]:r[h],writable:!1})}return u(e,t,n)}:u:function(e,t,n){if(o(e),t=a(t),o(n),i)try{return u(e,t,n)}catch(r){}if("get"in n||"set"in n)throw new c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},4916:function(e,t,n){var r=n(7751),i=function(e){return{size:e,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}},s=function(e){return{size:e,has:function(){return!0},keys:function(){throw new Error("e")}}};e.exports=function(e,t){var n=r("Set");try{(new n)[e](i(0));try{return(new n)[e](i(-1)),!1}catch(a){if(!t)return!0;try{return(new n)[e](s(-1/0)),!1}catch(c){var o=new n;return o.add(1),o.add(2),t(o[e](s(1/0)))}}}catch(c){return!1}}},4979:function(e,t,n){var r=n(6518),i=n(4576),s=n(7751),o=n(6980),a=n(4913).f,c=n(9297),u=n(679),l=n(3167),h=n(2603),f=n(5002),d=n(6193),p=n(3724),m=n(6395),g="DOMException",y=s("Error"),v=s(g),_=function(){u(this,E);var e=arguments.length,t=h(e<1?void 0:arguments[0]),n=h(e<2?void 0:arguments[1],"Error"),r=new v(t,n),i=new y(t);return i.name=g,a(r,"stack",o(1,d(i.stack,1))),l(r,this,_),r},E=_.prototype=v.prototype,w="stack"in new y(g),b="stack"in new v(1,2),T=v&&p&&Object.getOwnPropertyDescriptor(i,g),I=!!T&&!(T.writable&&T.configurable),S=w&&!I&&!b;r({global:!0,constructor:!0,forced:m||S},{DOMException:S?_:v});var C=s(g),A=C.prototype;if(A.constructor!==C)for(var k in m||a(A,"constructor",o(1,C)),f)if(c(f,k)){var N=f[k],R=N.s;c(C,R)||a(C,R,o(6,N.c))}},5002:function(e){e.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},5024:function(e,t,n){var r=n(6518),i=n(3650),s=n(9835),o=n(4916),a=!o("symmetricDifference")||!s("symmetricDifference");r({target:"Set",proto:!0,real:!0,forced:a},{symmetricDifference:i})},5031:function(e,t,n){var r=n(7751),i=n(9504),s=n(8480),o=n(3717),a=n(8551),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=s.f(a(e)),n=o.f;return n?c(t,n(e)):t}},5130:function(e,t,n){n.d(t,{$9:function(){return B},$V:function(){return r.$V},$u:function(){return r.$u},$y:function(){return r.$y},BA:function(){return r.BA},Bi:function(){return r.Bi},Bs:function(){return r.Bs},C4:function(){return r.C4},CE:function(){return r.CE},D:function(){return be},D$:function(){return Je},Df:function(){return r.Df},Dl:function(){return r.Dl},E:function(){return r.E},E3:function(){return r.E3},EW:function(){return r.EW},EY:function(){return r.EY},Ef:function(){return ct},F:function(){return Ne},FK:function(){return r.FK},Fv:function(){return r.Fv},Fw:function(){return r.Fw},GM:function(){return r.GM},Gc:function(){return r.Gc},Gt:function(){return r.Gt},Gw:function(){return r.Gw},Gy:function(){return r.Gy},H4:function(){return r.H4},HF:function(){return r.HF},Ht:function(){return r.Ht},IG:function(){return r.IG},IJ:function(){return r.IJ},Ib:function(){return dt},Ic:function(){return r.Ic},Im:function(){return r.Im},Jo:function(){return Fe},K9:function(){return r.K9},KC:function(){return r.KC},KR:function(){return r.KR},KT:function(){return Ee},Kf:function(){return r.Kf},Kh:function(){return r.Kh},LJ:function(){return r.LJ},LM:function(){return r.LM},Lk:function(){return r.Lk},Lu:function(){return r.Lu},MZ:function(){return r.MZ},Mw:function(){return r.Mw},NP:function(){return r.NP},Ng:function(){return r.Ng},OA:function(){return r.OA},OW:function(){return r.OW},PP:function(){return r.PP},PR:function(){return r.PR},PS:function(){return r.PS},PT:function(){return r.PT},Pn:function(){return r.Pn},Po:function(){return ye},Pr:function(){return r.Pr},Q3:function(){return r.Q3},QP:function(){return r.QP},QW:function(){return r.QW},QZ:function(){return r.QZ},Qi:function(){return r.Qi},Qv:function(){return at},R1:function(){return r.R1},R8:function(){return r.R8},RG:function(){return r.RG},SS:function(){return r.SS},Tb:function(){return r.Tb},Tm:function(){return r.Tm},Tq:function(){return r.Tq},Tr:function(){return r.Tr},U4:function(){return r.U4},U_:function(){return r.U_},Ul:function(){return r.Ul},Vq:function(){return r.Vq},Vy:function(){return _e},WQ:function(){return r.WQ},Wv:function(){return r.Wv},X2:function(){return r.X2},XL:function(){return $e},XX:function(){return ot},Xq:function(){return ge},Y4:function(){return r.Y4},Y5:function(){return r.Y5},YY:function(){return r.YY},Yj:function(){return r.Yj},Yv:function(){return r.Yv},ZH:function(){return r.ZH},ZQ:function(){return r.ZQ},_B:function(){return r._B},_U:function(){return we},aG:function(){return F},aT:function(){return r.aT},bF:function(){return r.bF},bU:function(){return r.bU},bj:function(){return r.bj},bn:function(){return r.bn},bo:function(){return r.bo},ch:function(){return r.ch},ci:function(){return r.ci},dA:function(){return r.dA},dY:function(){return r.dY},ds:function(){return r.ds},eB:function(){return E},eW:function(){return r.eW},eX:function(){return r.eX},fE:function(){return r.fE},fn:function(){return r.fn},g2:function(){return r.g2},g8:function(){return r.g8},gN:function(){return r.gN},gW:function(){return r.gW},gh:function(){return r.gh},h:function(){return r.h},hi:function(){return r.hi},hp:function(){return Ke},i9:function(){return r.i9},iD:function(){return r.iD},jC:function(){return r.jC},jR:function(){return et},jr:function(){return r.jr},jt:function(){return r.jt},ju:function(){return r.ju},k6:function(){return r.k6},lH:function(){return Ve},lW:function(){return r.lW},lt:function(){return r.lt},m1:function(){return ut},mu:function(){return r.mu},n:function(){return r.n},nD:function(){return r.nD},nI:function(){return r.nI},nT:function(){return r.nT},o5:function(){return r.o5},p9:function(){return r.p9},pI:function(){return r.pI},pM:function(){return r.pM},pR:function(){return r.pR},qG:function(){return r.qG},qL:function(){return r.qL},qP:function(){return r.qP},qR:function(){return r.qR},rE:function(){return r.rE},rO:function(){return r.rO},rU:function(){return r.rU},rY:function(){return r.rY},rk:function(){return r.rk},sV:function(){return r.sV},tB:function(){return r.tB},tC:function(){return r.tC},tG:function(){return r.tG},tY:function(){return r.tY},u1:function(){return Be},uX:function(){return r.uX},uY:function(){return r.uY},ux:function(){return r.ux},v6:function(){return r.v6},v_:function(){return r.v_},vv:function(){return r.vv},wB:function(){return r.wB},wX:function(){return r.wX},wk:function(){return r.wk},xo:function(){return r.xo},y$:function(){return r.y$},yC:function(){return r.yC},zz:function(){return r.zz}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(6768),i=n(4232),s=n(144);
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let o;const a="undefined"!==typeof window&&window.trustedTypes;if(a)try{o=a.createPolicy("vue",{createHTML:e=>e})}catch(pt){}const c=o?e=>o.createHTML(e):e=>e,u="http://www.w3.org/2000/svg",l="http://www.w3.org/1998/Math/MathML",h="undefined"!==typeof document?document:null,f=h&&h.createElement("template"),d={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i="svg"===t?h.createElementNS(u,e):"mathml"===t?h.createElementNS(l,e):n?h.createElement(e,{is:n}):h.createElement(e);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>h.createTextNode(e),createComment:e=>h.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>h.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===s||!(i=i.nextSibling))break}else{f.innerHTML=c("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);const i=f.content;if("svg"===r||"mathml"===r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},p="transition",m="animation",g=Symbol("_vtc"),y={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},v=(0,i.X$)({},r.QP,y),_=e=>(e.displayName="Transition",e.props=v,e),E=_((e,{slots:t})=>(0,r.h)(r.pR,T(e),t)),w=(e,t=[])=>{(0,i.cy)(e)?e.forEach(e=>e(...t)):e&&e(...t)},b=e=>!!e&&((0,i.cy)(e)?e.some(e=>e.length>1):e.length>1);function T(e){const t={};for(const i in e)i in y||(t[i]=e[i]);if(!1===e.css)return t;const{name:n="v",type:r,duration:s,enterFromClass:o=`${n}-enter-from`,enterActiveClass:a=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:u=o,appearActiveClass:l=a,appearToClass:h=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:d=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,m=I(s),g=m&&m[0],v=m&&m[1],{onBeforeEnter:_,onEnter:E,onEnterCancelled:T,onLeave:S,onLeaveCancelled:N,onBeforeAppear:O=_,onAppear:P=E,onAppearCancelled:D=T}=t,x=(e,t,n,r)=>{e._enterCancelled=r,A(e,t?h:c),A(e,t?l:a),n&&n()},M=(e,t)=>{e._isLeaving=!1,A(e,f),A(e,p),A(e,d),t&&t()},U=e=>(t,n)=>{const i=e?P:E,s=()=>x(t,e,n);w(i,[t,s]),k(()=>{A(t,e?u:o),C(t,e?h:c),b(i)||R(t,r,g,s)})};return(0,i.X$)(t,{onBeforeEnter(e){w(_,[e]),C(e,o),C(e,a)},onBeforeAppear(e){w(O,[e]),C(e,u),C(e,l)},onEnter:U(!1),onAppear:U(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>M(e,t);C(e,f),e._enterCancelled?(C(e,d),L()):(L(),C(e,d)),k(()=>{e._isLeaving&&(A(e,f),C(e,p),b(S)||R(e,r,v,n))}),w(S,[e,n])},onEnterCancelled(e){x(e,!1,void 0,!0),w(T,[e])},onAppearCancelled(e){x(e,!0,void 0,!0),w(D,[e])},onLeaveCancelled(e){M(e),w(N,[e])}})}function I(e){if(null==e)return null;if((0,i.Gv)(e))return[S(e.enter),S(e.leave)];{const t=S(e);return[t,t]}}function S(e){const t=(0,i.Ro)(e);return t}function C(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[g]||(e[g]=new Set)).add(t)}function A(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));const n=e[g];n&&(n.delete(t),n.size||(e[g]=void 0))}function k(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let N=0;function R(e,t,n,r){const i=e._endId=++N,s=()=>{i===e._endId&&r()};if(null!=n)return setTimeout(s,n);const{type:o,timeout:a,propCount:c}=O(e,t);if(!o)return r();const u=o+"end";let l=0;const h=()=>{e.removeEventListener(u,f),s()},f=t=>{t.target===e&&++l>=c&&h()};setTimeout(()=>{l<c&&h()},a+1),e.addEventListener(u,f)}function O(e,t){const n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${p}Delay`),s=r(`${p}Duration`),o=P(i,s),a=r(`${m}Delay`),c=r(`${m}Duration`),u=P(a,c);let l=null,h=0,f=0;t===p?o>0&&(l=p,h=o,f=s.length):t===m?u>0&&(l=m,h=u,f=c.length):(h=Math.max(o,u),l=h>0?o>u?p:m:null,f=l?l===p?s.length:c.length:0);const d=l===p&&/\b(transform|all)(,|$)/.test(r(`${p}Property`).toString());return{type:l,timeout:h,propCount:f,hasTransform:d}}function P(e,t){while(e.length<t.length)e=e.concat(e);return Math.max(...t.map((t,n)=>D(t)+D(e[n])))}function D(e){return"auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function L(){return document.body.offsetHeight}function x(e,t,n){const r=e[g];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const M=Symbol("_vod"),U=Symbol("_vsh"),F={beforeMount(e,{value:t},{transition:n}){e[M]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):V(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!==!n&&(r?t?(r.beforeEnter(e),V(e,!0),r.enter(e)):r.leave(e,()=>{V(e,!1)}):V(e,t))},beforeUnmount(e,{value:t}){V(e,t)}};function V(e,t){e.style.display=t?e[M]:"none",e[U]=!t}function j(){F.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}const $=Symbol("");function B(e){const t=(0,r.nI)();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(e=>W(e,n))};const s=()=>{const r=e(t.proxy);t.ce?W(t.ce,r):H(t.subTree,r),n(r)};(0,r.Ic)(()=>{(0,r.Dl)(s)}),(0,r.sV)(()=>{(0,r.wB)(s,i.tE,{flush:"post"});const e=new MutationObserver(s);e.observe(t.subTree.el.parentNode,{childList:!0}),(0,r.hi)(()=>e.disconnect())})}function H(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{H(n.activeBranch,t)})}while(e.component)e=e.component.subTree;if(1&e.shapeFlag&&e.el)W(e.el,t);else if(e.type===r.FK)e.children.forEach(e=>H(e,t));else if(e.type===r.jC){let{el:n,anchor:r}=e;while(n){if(W(n,t),n===r)break;n=n.nextSibling}}}function W(e,t){if(1===e.nodeType){const n=e.style;let r="";for(const e in t){const s=(0,i.pU)(t[e]);n.setProperty(`--${e}`,s),r+=`--${e}: ${s};`}n[$]=r}}const G=/(^|;)\s*display\s*:/;function K(e,t,n){const r=e.style,s=(0,i.Kg)(n);let o=!1;if(n&&!s){if(t)if((0,i.Kg)(t))for(const e of t.split(";")){const t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&z(r,t,"")}else for(const e in t)null==n[e]&&z(r,e,"");for(const e in n)"display"===e&&(o=!0),z(r,e,n[e])}else if(s){if(t!==n){const e=r[$];e&&(n+=";"+e),r.cssText=n,o=G.test(n)}}else t&&e.removeAttribute("style");M in e&&(e[M]=o?r.display:"",e[U]&&(r.display="none"))}const q=/\s*!important$/;function z(e,t,n){if((0,i.cy)(n))n.forEach(n=>z(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Q(e,t);q.test(n)?e.setProperty((0,i.Tg)(r),n.replace(q,""),"important"):e[r]=n}}const Y=["Webkit","Moz","ms"],X={};function Q(e,t){const n=X[t];if(n)return n;let r=(0,i.PT)(t);if("filter"!==r&&r in e)return X[t]=r;r=(0,i.ZH)(r);for(let i=0;i<Y.length;i++){const n=Y[i]+r;if(n in e)return X[t]=n}return t}const J="http://www.w3.org/1999/xlink";function Z(e,t,n,r,s,o=(0,i.J$)(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(J,t.slice(6,t.length)):e.setAttributeNS(J,t,n):null==n||o&&!(0,i.Y2)(n)?e.removeAttribute(t):e.setAttribute(t,o?"":(0,i.Bm)(n)?String(n):n)}function ee(e,t,n,r,s){if("innerHTML"===t||"textContent"===t)return void(null!=n&&(e[t]="innerHTML"===t?c(n):n));const o=e.tagName;if("value"===t&&"PROGRESS"!==o&&!o.includes("-")){const r="OPTION"===o?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);return r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),void(e._value=n)}let a=!1;if(""===n||null==n){const r=typeof e[t];"boolean"===r?n=(0,i.Y2)(n):null==n&&"string"===r?(n="",a=!0):"number"===r&&(n=0,a=!0)}try{e[t]=n}catch(pt){0}a&&e.removeAttribute(s||t)}function te(e,t,n,r){e.addEventListener(t,n,r)}function ne(e,t,n,r){e.removeEventListener(t,n,r)}const re=Symbol("_vei");function ie(e,t,n,r,i=null){const s=e[re]||(e[re]={}),o=s[t];if(r&&o)o.value=r;else{const[n,a]=oe(t);if(r){const o=s[t]=le(r,i);te(e,n,o,a)}else o&&(ne(e,n,o,a),s[t]=void 0)}}const se=/(?:Once|Passive|Capture)$/;function oe(e){let t;if(se.test(e)){let n;t={};while(n=e.match(se))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):(0,i.Tg)(e.slice(2));return[n,t]}let ae=0;const ce=Promise.resolve(),ue=()=>ae||(ce.then(()=>ae=0),ae=Date.now());function le(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();(0,r.qL)(he(e,n.value),t,5,[e])};return n.value=e,n.attached=ue(),n}function he(e,t){if((0,i.cy)(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}return t}const fe=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,de=(e,t,n,r,s,o)=>{const a="svg"===s;"class"===t?x(e,r,a):"style"===t?K(e,n,r):(0,i.Mp)(t)?(0,i.CP)(t)||ie(e,t,n,r,o):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):pe(e,t,r,a))?(ee(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||Z(e,t,r,a,o,"value"!==t)):!e._isVueCE||!/[A-Z]/.test(t)&&(0,i.Kg)(r)?("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),Z(e,t,r,a)):ee(e,(0,i.PT)(t),r,o,t)};function pe(e,t,n,r){if(r)return"innerHTML"===t||"textContent"===t||!!(t in e&&fe(t)&&(0,i.Tn)(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"autocorrect"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}return(!fe(t)||!(0,i.Kg)(n))&&t in e}const me={};
/*! #__NO_SIDE_EFFECTS__ */function ge(e,t,n){const s=(0,r.pM)(e,t);(0,i.Qd)(s)&&(0,i.X$)(s,t);class o extends _e{constructor(e){super(s,e,n)}}return o.def=s,o}
/*! #__NO_SIDE_EFFECTS__ */const ye=(e,t)=>ge(e,t,ut),ve="undefined"!==typeof HTMLElement?HTMLElement:class{};class _e extends ve{constructor(e,t={},n=ct){super(),this._def=e,this._props=t,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._ob=null,this.shadowRoot&&n!==ct?this._root=this.shadowRoot:!1!==e.shadowRoot?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;this.shadowRoot||this._resolved||this._parseSlots(),this._connected=!0;let e=this;while(e=e&&(e.parentNode||e.host))if(e instanceof _e){this._parent=e;break}this._instance||(this._resolved?this._mount(this._def):e&&e._pendingResolve?this._pendingResolve=e._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef()}):this._resolveDef())}_setParent(e=this._parent){e&&(this._instance.parent=e._instance,this._inheritParentContext(e))}_inheritParentContext(e=this._parent){e&&this._app&&Object.setPrototypeOf(this._app._context.provides,e._instance.provides)}disconnectedCallback(){this._connected=!1,(0,r.dY)(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null)})}_resolveDef(){if(this._pendingResolve)return;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver(e=>{for(const t of e)this._setAttr(t.attributeName)}),this._ob.observe(this,{attributes:!0});const e=(e,t=!1)=>{this._resolved=!0,this._pendingResolve=void 0;const{props:n,styles:r}=e;let s;if(n&&!(0,i.cy)(n))for(const o in n){const e=n[o];(e===Number||e&&e.type===Number)&&(o in this._props&&(this._props[o]=(0,i.Ro)(this._props[o])),(s||(s=Object.create(null)))[(0,i.PT)(o)]=!0)}this._numberProps=s,this._resolveProps(e),this.shadowRoot&&this._applyStyles(r),this._mount(e)},t=this._def.__asyncLoader;t?this._pendingResolve=t().then(t=>{t.configureApp=this._def.configureApp,e(this._def=t,!0)}):e(this._def)}_mount(e){this._app=this._createApp(e),this._inheritParentContext(),e.configureApp&&e.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);const t=this._instance&&this._instance.exposed;if(t)for(const n in t)(0,i.$3)(this,n)||Object.defineProperty(this,n,{get:()=>(0,s.R1)(t[n])})}_resolveProps(e){const{props:t}=e,n=(0,i.cy)(t)?t:Object.keys(t||{});for(const r of Object.keys(this))"_"!==r[0]&&n.includes(r)&&this._setProp(r,this[r]);for(const r of n.map(i.PT))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(e){this._setProp(r,e,!0,!0)}})}_setAttr(e){if(e.startsWith("data-v-"))return;const t=this.hasAttribute(e);let n=t?this.getAttribute(e):me;const r=(0,i.PT)(e);t&&this._numberProps&&this._numberProps[r]&&(n=(0,i.Ro)(n)),this._setProp(r,n,!1,!0)}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,r=!1){if(t!==this._props[e]&&(t===me?delete this._props[e]:(this._props[e]=t,"key"===e&&this._app&&(this._app._ceVNode.key=t)),r&&this._instance&&this._update(),n)){const n=this._ob;n&&n.disconnect(),!0===t?this.setAttribute((0,i.Tg)(e),""):"string"===typeof t||"number"===typeof t?this.setAttribute((0,i.Tg)(e),t+""):t||this.removeAttribute((0,i.Tg)(e)),n&&n.observe(this,{attributes:!0})}}_update(){const e=this._createVNode();this._app&&(e.appContext=this._app._context),ot(e,this._root)}_createVNode(){const e={};this.shadowRoot||(e.onVnodeMounted=e.onVnodeUpdated=this._renderSlots.bind(this));const t=(0,r.bF)(this._def,(0,i.X$)(e,this._props));return this._instance||(t.ce=e=>{this._instance=e,e.ce=this,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,(0,i.Qd)(t[0])?(0,i.X$)({detail:t},t[0]):{detail:t}))};e.emit=(e,...n)=>{t(e,n),(0,i.Tg)(e)!==e&&t((0,i.Tg)(e),n)},this._setParent()}),t}_applyStyles(e,t){if(!e)return;if(t){if(t===this._def||this._styleChildren.has(t))return;this._styleChildren.add(t)}const n=this._nonce;for(let r=e.length-1;r>=0;r--){const t=document.createElement("style");n&&t.setAttribute("nonce",n),t.textContent=e[r],this.shadowRoot.prepend(t)}}_parseSlots(){const e=this._slots={};let t;while(t=this.firstChild){const n=1===t.nodeType&&t.getAttribute("slot")||"default";(e[n]||(e[n]=[])).push(t),this.removeChild(t)}}_renderSlots(){const e=(this._teleportTarget||this).querySelectorAll("slot"),t=this._instance.type.__scopeId;for(let n=0;n<e.length;n++){const r=e[n],i=r.getAttribute("name")||"default",s=this._slots[i],o=r.parentNode;if(s)for(const e of s){if(t&&1===e.nodeType){const n=t+"-s",r=document.createTreeWalker(e,1);let i;e.setAttribute(n,"");while(i=r.nextNode())i.setAttribute(n,"")}o.insertBefore(e,r)}else while(r.firstChild)o.insertBefore(r.firstChild,r);o.removeChild(r)}}_injectChildStyle(e){this._applyStyles(e.styles,e)}_removeChildStyle(e){0}}function Ee(e){const t=(0,r.nI)(),n=t&&t.ce;return n||null}function we(){const e=Ee();return e&&e.shadowRoot}function be(e="$style"){{const t=(0,r.nI)();if(!t)return i.MZ;const n=t.type.__cssModules;if(!n)return i.MZ;const s=n[e];return s||i.MZ}}const Te=new WeakMap,Ie=new WeakMap,Se=Symbol("_moveCb"),Ce=Symbol("_enterCb"),Ae=e=>(delete e.props.mode,e),ke=Ae({name:"TransitionGroup",props:(0,i.X$)({},v,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=(0,r.nI)(),i=(0,r.Gy)();let o,a;return(0,r.$u)(()=>{if(!o.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!De(o[0].el,n.vnode.el,t))return void(o=[]);o.forEach(Re),o.forEach(Oe);const r=o.filter(Pe);L(),r.forEach(e=>{const n=e.el,r=n.style;C(n,t),r.transform=r.webkitTransform=r.transitionDuration="";const i=n[Se]=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",i),n[Se]=null,A(n,t))};n.addEventListener("transitionend",i)}),o=[]}),()=>{const c=(0,s.ux)(e),u=T(c);let l=c.tag||r.FK;if(o=[],a)for(let e=0;e<a.length;e++){const t=a[e];t.el&&t.el instanceof Element&&(o.push(t),(0,r.MZ)(t,(0,r.OW)(t,u,i,n)),Te.set(t,t.el.getBoundingClientRect()))}a=t.default?(0,r.Df)(t.default()):[];for(let e=0;e<a.length;e++){const t=a[e];null!=t.key&&(0,r.MZ)(t,(0,r.OW)(t,u,i,n))}return(0,r.bF)(l,null,a)}}}),Ne=ke;function Re(e){const t=e.el;t[Se]&&t[Se](),t[Ce]&&t[Ce]()}function Oe(e){Ie.set(e,e.el.getBoundingClientRect())}function Pe(e){const t=Te.get(e),n=Ie.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}function De(e,t,n){const r=e.cloneNode(),i=e[g];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e))}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display="none";const s=1===t.nodeType?t:t.parentNode;s.appendChild(r);const{hasTransform:o}=O(r);return s.removeChild(r),o}const Le=e=>{const t=e.props["onUpdate:modelValue"]||!1;return(0,i.cy)(t)?e=>(0,i.DY)(t,e):t};function xe(e){e.target.composing=!0}function Me(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Ue=Symbol("_assign"),Fe={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[Ue]=Le(s);const o=r||s.props&&"number"===s.props.type;te(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),o&&(r=(0,i.bB)(r)),e[Ue](r)}),n&&te(e,"change",()=>{e.value=e.value.trim()}),t||(te(e,"compositionstart",xe),te(e,"compositionend",Me),te(e,"change",Me))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:o}},a){if(e[Ue]=Le(a),e.composing)return;const c=!o&&"number"!==e.type||/^0\d/.test(e.value)?e.value:(0,i.bB)(e.value),u=null==t?"":t;if(c!==u){if(document.activeElement===e&&"range"!==e.type){if(r&&t===n)return;if(s&&e.value.trim()===u)return}e.value=u}}},Ve={deep:!0,created(e,t,n){e[Ue]=Le(n),te(e,"change",()=>{const t=e._modelValue,n=We(e),r=e.checked,s=e[Ue];if((0,i.cy)(t)){const e=(0,i.u3)(t,n),o=-1!==e;if(r&&!o)s(t.concat(n));else if(!r&&o){const n=[...t];n.splice(e,1),s(n)}}else if((0,i.vM)(t)){const e=new Set(t);r?e.add(n):e.delete(n),s(e)}else s(Ge(e,r))})},mounted:je,beforeUpdate(e,t,n){e[Ue]=Le(n),je(e,t,n)}};function je(e,{value:t,oldValue:n},r){let s;if(e._modelValue=t,(0,i.cy)(t))s=(0,i.u3)(t,r.props.value)>-1;else if((0,i.vM)(t))s=t.has(r.props.value);else{if(t===n)return;s=(0,i.BX)(t,Ge(e,!0))}e.checked!==s&&(e.checked=s)}const $e={created(e,{value:t},n){e.checked=(0,i.BX)(t,n.props.value),e[Ue]=Le(n),te(e,"change",()=>{e[Ue](We(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[Ue]=Le(r),t!==n&&(e.checked=(0,i.BX)(t,r.props.value))}},Be={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=(0,i.vM)(t);te(e,"change",()=>{const t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?(0,i.bB)(We(e)):We(e));e[Ue](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,(0,r.dY)(()=>{e._assigning=!1})}),e[Ue]=Le(s)},mounted(e,{value:t}){He(e,t)},beforeUpdate(e,t,n){e[Ue]=Le(n)},updated(e,{value:t}){e._assigning||He(e,t)}};function He(e,t){const n=e.multiple,r=(0,i.cy)(t);if(!n||r||(0,i.vM)(t)){for(let s=0,o=e.options.length;s<o;s++){const o=e.options[s],a=We(o);if(n)if(r){const e=typeof a;o.selected="string"===e||"number"===e?t.some(e=>String(e)===String(a)):(0,i.u3)(t,a)>-1}else o.selected=t.has(a);else if((0,i.BX)(We(o),t))return void(e.selectedIndex!==s&&(e.selectedIndex=s))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function We(e){return"_value"in e?e._value:e.value}function Ge(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Ke={created(e,t,n){ze(e,t,n,null,"created")},mounted(e,t,n){ze(e,t,n,null,"mounted")},beforeUpdate(e,t,n,r){ze(e,t,n,r,"beforeUpdate")},updated(e,t,n,r){ze(e,t,n,r,"updated")}};function qe(e,t){switch(e){case"SELECT":return Be;case"TEXTAREA":return Fe;default:switch(t){case"checkbox":return Ve;case"radio":return $e;default:return Fe}}}function ze(e,t,n,r,i){const s=qe(e.tagName,n.props&&n.props.type),o=s[i];o&&o(e,t,n,r)}function Ye(){Fe.getSSRProps=({value:e})=>({value:e}),$e.getSSRProps=({value:e},t)=>{if(t.props&&(0,i.BX)(t.props.value,e))return{checked:!0}},Ve.getSSRProps=({value:e},t)=>{if((0,i.cy)(e)){if(t.props&&(0,i.u3)(e,t.props.value)>-1)return{checked:!0}}else if((0,i.vM)(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Ke.getSSRProps=(e,t)=>{if("string"!==typeof t.type)return;const n=qe(t.type.toUpperCase(),t.props&&t.props.type);return n.getSSRProps?n.getSSRProps(e,t):void 0}}const Xe=["ctrl","shift","alt","meta"],Qe={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Xe.some(n=>e[`${n}Key`]&&!t.includes(n))},Je=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){const r=Qe[t[e]];if(r&&r(n,t))return}return e(n,...r)})},Ze={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},et=(e,t)=>{const n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;const r=(0,i.Tg)(n.key);return t.some(e=>e===r||Ze[e]===r)?e(n):void 0})},tt=(0,i.X$)({patchProp:de},d);let nt,rt=!1;function it(){return nt||(nt=(0,r.K9)(tt))}function st(){return nt=rt?nt:(0,r.ci)(tt),rt=!0,nt}const ot=(...e)=>{it().render(...e)},at=(...e)=>{st().hydrate(...e)},ct=(...e)=>{const t=it().createApp(...e);const{mount:n}=t;return t.mount=e=>{const r=ht(e);if(!r)return;const s=t._component;(0,i.Tn)(s)||s.render||s.template||(s.template=r.innerHTML),1===r.nodeType&&(r.textContent="");const o=n(r,!1,lt(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t},ut=(...e)=>{const t=st().createApp(...e);const{mount:n}=t;return t.mount=e=>{const t=ht(e);if(t)return n(t,!0,lt(t))},t};function lt(e){return e instanceof SVGElement?"svg":"function"===typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function ht(e){if((0,i.Kg)(e)){const t=document.querySelector(e);return t}return e}let ft=!1;const dt=()=>{ft||(ft=!0,Ye(),j())}},5169:function(e,t,n){var r=n(3238),i=TypeError;e.exports=function(e){if(r(e))throw new i("ArrayBuffer is detached");return e}},5170:function(e,t,n){var r=n(6706),i=n(4402);e.exports=r(i.proto,"size","get")||function(e){return e.size}},5397:function(e,t,n){var r=n(7055),i=n(7750);e.exports=function(e){return r(i(e))}},5610:function(e,t,n){var r=n(1291),i=Math.max,s=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):s(n,t)}},5623:function(e,t,n){n(456)},5745:function(e,t,n){var r=n(7629);e.exports=function(e,t){return r[e]||(r[e]=t||{})}},5854:function(e,t,n){var r=n(2777),i=TypeError;e.exports=function(e){var t=r(e,"number");if("number"==typeof t)throw new i("Can't convert number to bigint");return BigInt(t)}},5876:function(e,t,n){var r=n(6518),i=n(3838),s=n(4916),o=!s("isSubsetOf",function(e){return e});r({target:"Set",proto:!0,real:!0,forced:o},{isSubsetOf:i})},5917:function(e,t,n){var r=n(3724),i=n(9039),s=n(4055);e.exports=!r&&!i(function(){return 7!==Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a})},5966:function(e,t,n){var r=n(9306),i=n(4117);e.exports=function(e,t){var n=e[t];return i(n)?void 0:r(n)}},6080:function(e,t,n){var r=n(7476),i=n(9306),s=n(616),o=r(r.bind);e.exports=function(e,t){return i(e),void 0===t?e:s?o(e,t):function(){return e.apply(t,arguments)}}},6119:function(e,t,n){var r=n(5745),i=n(3392),s=r("keys");e.exports=function(e){return s[e]||(s[e]=i(e))}},6189:function(e,t,n){n.d(t,{$b:function(){return i},Vy:function(){return u}});n(4114),n(8111),n(2489),n(1701);
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
(0,r.KO)(i,s,"app")},6518:function(e,t,n){var r=n(4576),i=n(7347).f,s=n(6699),o=n(6840),a=n(9433),c=n(7740),u=n(2796);e.exports=function(e,t){var n,l,h,f,d,p,m=e.target,g=e.global,y=e.stat;if(l=g?r:y?r[m]||a(m,{}):r[m]&&r[m].prototype,l)for(h in t){if(d=t[h],e.dontCallGetSet?(p=i(l,h),f=p&&p.value):f=l[h],n=u(g?h:m+(y?".":"#")+h,e.forced),!n&&void 0!==f){if(typeof d==typeof f)continue;c(d,f)}(e.sham||f&&f.sham)&&s(d,"sham",!0),o(l,h,d,e)}}},6632:function(e,t,n){var r=n(6518),i=n(4576),s=n(9143),o=n(4154),a=i.Uint8Array,c=!a||!a.prototype.setFromBase64||!function(){var e=new a([255,255,255,255,255]);try{return void e.setFromBase64("",null)}catch(t){}try{return void e.setFromBase64("a")}catch(t){}try{e.setFromBase64("MjYyZg===")}catch(t){return 50===e[0]&&54===e[1]&&50===e[2]&&255===e[3]&&255===e[4]}}();a&&r({target:"Uint8Array",proto:!0,forced:c},{setFromBase64:function(e){o(this);var t=s(e,arguments.length>1?arguments[1]:void 0,this,this.length);return{read:t.read,written:t.written}}})},6699:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=r?function(e,t,n){return i.f(e,t,s(1,n))}:function(e,t,n){return e[t]=n,e}},6706:function(e,t,n){var r=n(9504),i=n(9306);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(s){}}},6768:function(e,t,n){n.d(t,{$V:function(){return tt},$u:function(){return vt},$y:function(){return Nt},BA:function(){return r.BA},Bi:function(){return Ce},Bs:function(){return qi},C4:function(){return i.C4},CE:function(){return Xr},Df:function(){return Ie},Dl:function(){return D},E:function(){return rn},E3:function(){return ai},EW:function(){return Hi},EY:function(){return Vr},FK:function(){return Fr},Fv:function(){return ui},Fw:function(){return rr},GM:function(){return Kt},Gc:function(){return r.Gc},Gt:function(){return In},Gw:function(){return es},Gy:function(){return fe},H4:function(){return E},HF:function(){return en},Ht:function(){return Xt},IG:function(){return r.IG},IJ:function(){return r.IJ},Ic:function(){return yt},Im:function(){return ae},K9:function(){return qn},KC:function(){return mt},KR:function(){return r.KR},Kf:function(){return i.rU},Kh:function(){return r.Kh},LJ:function(){return ts},LM:function(){return ir},Lk:function(){return ri},Lu:function(){return qt},MZ:function(){return Te},Mw:function(){return jr},NP:function(){return zt},Ng:function(){return oi},OA:function(){return Qt},OW:function(){return Ee},PP:function(){return r.PP},PR:function(){return st},PS:function(){return Cn},PT:function(){return i.PT},Pn:function(){return Xe},Pr:function(){return r.Pr},Q3:function(){return li},QP:function(){return pe},QW:function(){return r.QW},QZ:function(){return r.QZ},Qi:function(){return G},R1:function(){return r.R1},R8:function(){return Yi},RG:function(){return xt},SS:function(){return wt},Tb:function(){return Ut},Tm:function(){return r.Tm},Tq:function(){return Je},Tr:function(){return i.Tr},U4:function(){return m},U_:function(){return ar},Ul:function(){return r.Ul},Vq:function(){return zr},WQ:function(){return Sn},Wv:function(){return Qr},X2:function(){return r.X2},Y4:function(){return ct},Y5:function(){return ns},YY:function(){return q},Yj:function(){return Ht},Yv:function(){return r.Yv},ZH:function(){return i.ZH},ZQ:function(){return Xi},_B:function(){return i._B},aT:function(){return rs},bF:function(){return ii},bU:function(){return Ki},bj:function(){return bt},bn:function(){return nn},bo:function(){return Y},ch:function(){return r.ch},ci:function(){return zn},dA:function(){return Qe},dY:function(){return N},ds:function(){return r.ds},eW:function(){return ci},eX:function(){return Lt},fE:function(){return r.fE},fn:function(){return fr},g2:function(){return At},g8:function(){return r.g8},gN:function(){return Rt},gW:function(){return ei},gh:function(){return v},h:function(){return Wi},hi:function(){return Et},i9:function(){return r.i9},iD:function(){return Ji},jC:function(){return $r},jr:function(){return r.jr},jt:function(){return K},ju:function(){return r.ju},k6:function(){return z},lW:function(){return r.lW},lt:function(){return Qi},mu:function(){return r.mu},n:function(){return at},nD:function(){return r.nD},nI:function(){return Ei},nT:function(){return sr},o5:function(){return r.o5},p9:function(){return or},pI:function(){return Dt},pM:function(){return Se},pR:function(){return ve},qG:function(){return It},qL:function(){return _},qP:function(){return Wt},qR:function(){return Tt},rE:function(){return zi},rO:function(){return Yt},rU:function(){return ze},rY:function(){return r.rY},rk:function(){return ke},sV:function(){return gt},tB:function(){return r.tB},tC:function(){return Pi},tG:function(){return g},tY:function(){return Ar},uX:function(){return Wr},uY:function(){return r.uY},ux:function(){return r.ux},v6:function(){return pi},v_:function(){return i.v_},vv:function(){return Jr},wB:function(){return cr},wX:function(){return Di},wk:function(){return Gt},xo:function(){return _t},y$:function(){return Gi},yC:function(){return r.yC},zz:function(){return tn}});n(4114),n(8111),n(1148),n(2489),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(144),i=n(4232);
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const s=[];function o(e){s.push(e)}function a(){s.pop()}let c=!1;function u(e,...t){if(c)return;c=!0,(0,r.C4)();const n=s.length?s[s.length-1].component:null,i=n&&n.appContext.config.warnHandler,o=l();if(i)v(i,n,11,[e+t.map(e=>{var t,n;return null!=(n=null==(t=e.toString)?void 0:t.call(e))?n:JSON.stringify(e)}).join(""),n&&n.proxy,o.map(({vnode:e})=>`at <${$i(n,e.type)}>`).join("\n"),o]);else{const n=[`[Vue warn]: ${e}`,...t];o.length&&n.push("\n",...h(o)),console.warn(...n)}(0,r.bl)(),c=!1}function l(){let e=s[s.length-1];if(!e)return[];const t=[];while(e){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const r=e.component&&e.component.parent;e=r&&r.vnode}return t}function h(e){const t=[];return e.forEach((e,n)=>{t.push(...0===n?[]:["\n"],...f(e))}),t}function f({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",r=!!e.component&&null==e.component.parent,i=` at <${$i(e.component,e.type,r)}`,s=">"+n;return e.props?[i,...d(e.props),s]:[i+s]}function d(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(n=>{t.push(...p(n,e[n]))}),n.length>3&&t.push(" ..."),t}function p(e,t,n){return(0,i.Kg)(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):"number"===typeof t||"boolean"===typeof t||null==t?n?t:[`${e}=${t}`]:(0,r.i9)(t)?(t=p(e,(0,r.ux)(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):(0,i.Tn)(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=(0,r.ux)(t),n?t:[`${e}=`,t])}function m(e,t){}const g={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},y={["sp"]:"serverPrefetch hook",["bc"]:"beforeCreate hook",["c"]:"created hook",["bm"]:"beforeMount hook",["m"]:"mounted hook",["bu"]:"beforeUpdate hook",["u"]:"updated",["bum"]:"beforeUnmount hook",["um"]:"unmounted hook",["a"]:"activated hook",["da"]:"deactivated hook",["ec"]:"errorCaptured hook",["rtc"]:"renderTracked hook",["rtg"]:"renderTriggered hook",[0]:"setup function",[1]:"render function",[2]:"watcher getter",[3]:"watcher callback",[4]:"watcher cleanup function",[5]:"native event handler",[6]:"component event handler",[7]:"vnode hook",[8]:"directive hook",[9]:"transition hook",[10]:"app errorHandler",[11]:"app warnHandler",[12]:"ref function",[13]:"async component loader",[14]:"scheduler flush",[15]:"component update",[16]:"app unmount cleanup function"};function v(e,t,n,r){try{return r?e(...r):e()}catch(i){E(i,t,n)}}function _(e,t,n,r){if((0,i.Tn)(e)){const s=v(e,t,n,r);return s&&(0,i.yL)(s)&&s.catch(e=>{E(e,t,n)}),s}if((0,i.cy)(e)){const i=[];for(let s=0;s<e.length;s++)i.push(_(e[s],t,n,r));return i}}function E(e,t,n,s=!0){const o=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:c}=t&&t.appContext.config||i.MZ;if(t){let i=t.parent;const s=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${n}`;while(i){const t=i.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,s,o))return;i=i.parent}if(a)return(0,r.C4)(),v(a,null,10,[e,s,o]),void(0,r.bl)()}w(e,n,o,s,c)}function w(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}const b=[];let T=-1;const I=[];let S=null,C=0;const A=Promise.resolve();let k=null;function N(e){const t=k||A;return e?t.then(this?e.bind(this):e):t}function R(e){let t=T+1,n=b.length;while(t<n){const r=t+n>>>1,i=b[r],s=M(i);s<e||s===e&&2&i.flags?t=r+1:n=r}return t}function O(e){if(!(1&e.flags)){const t=M(e),n=b[b.length-1];!n||!(2&e.flags)&&t>=M(n)?b.push(e):b.splice(R(t),0,e),e.flags|=1,P()}}function P(){k||(k=A.then(U))}function D(e){(0,i.cy)(e)?I.push(...e):S&&-1===e.id?S.splice(C+1,0,e):1&e.flags||(I.push(e),e.flags|=1),P()}function L(e,t,n=T+1){for(0;n<b.length;n++){const t=b[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;0,b.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2)}}}function x(e){if(I.length){const e=[...new Set(I)].sort((e,t)=>M(e)-M(t));if(I.length=0,S)return void S.push(...e);for(S=e,C=0;C<S.length;C++){const e=S[C];0,4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2}S=null,C=0}}const M=e=>null==e.id?2&e.flags?-1:1/0:e.id;function U(e){i.tE;try{for(T=0;T<b.length;T++){const e=b[T];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),v(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2))}}finally{for(;T<b.length;T++){const e=b[T];e&&(e.flags&=-2)}T=-1,b.length=0,x(e),k=null,(b.length||I.length)&&U(e)}}let F,V=[],j=!1;function $(e,t){var n,r;if(F=e,F)F.enabled=!0,V.forEach(({event:e,args:t})=>F.emit(e,...t)),V=[];else if("undefined"!==typeof window&&window.HTMLElement&&!(null==(r=null==(n=window.navigator)?void 0:n.userAgent)?void 0:r.includes("jsdom"))){const e=t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[];e.push(e=>{$(e,t)}),setTimeout(()=>{F||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,j=!0,V=[])},3e3)}else j=!0,V=[]}let B=null,H=null;function W(e){const t=B;return B=e,H=e&&e.type.__scopeId||null,t}function G(e){H=e}function K(){H=null}const q=e=>z;function z(e,t=B,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&zr(-1);const i=W(t);let s;try{s=e(...n)}finally{W(i),r._d&&zr(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function Y(e,t){if(null===B)return e;const n=Ui(B),s=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[e,a,c,u=i.MZ]=t[o];e&&((0,i.Tn)(e)&&(e={mounted:e,updated:e}),e.deep&&(0,r.hV)(a),s.push({dir:e,instance:n,value:a,oldValue:void 0,arg:c,modifiers:u}))}return e}function X(e,t,n,i){const s=e.dirs,o=t&&t.dirs;for(let a=0;a<s.length;a++){const c=s[a];o&&(c.oldValue=o[a].value);let u=c.dir[i];u&&((0,r.C4)(),_(u,n,8,[e.el,c,e,t]),(0,r.bl)())}}const Q=Symbol("_vte"),J=e=>e.__isTeleport,Z=e=>e&&(e.disabled||""===e.disabled),ee=e=>e&&(e.defer||""===e.defer),te=e=>"undefined"!==typeof SVGElement&&e instanceof SVGElement,ne=e=>"function"===typeof MathMLElement&&e instanceof MathMLElement,re=(e,t)=>{const n=e&&e.to;if((0,i.Kg)(n)){if(t){const e=t(n);return e}return null}return n},ie={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,s,o,a,c,u){const{mc:l,pc:h,pbc:f,o:{insert:d,querySelector:p,createText:m,createComment:g}}=u,y=Z(t.props);let{shapeFlag:v,children:_,dynamicChildren:E}=t;if(null==e){const e=t.el=m(""),u=t.anchor=m("");d(e,n,r),d(u,n,r);const h=(e,t)=>{16&v&&(i&&i.isCE&&(i.ce._teleportTarget=e),l(_,e,t,i,s,o,a,c))},f=()=>{const e=t.target=re(t.props,p),n=ue(e,t,m,d);e&&("svg"!==o&&te(e)?o="svg":"mathml"!==o&&ne(e)&&(o="mathml"),y||(h(e,n),ce(t,!1)))};y&&(h(n,u),ce(t,!0)),ee(t.props)?(t.el.__isMounted=!1,Kn(()=>{f(),delete t.el.__isMounted},s)):f()}else{if(ee(t.props)&&!1===e.el.__isMounted)return void Kn(()=>{ie.process(e,t,n,r,i,s,o,a,c,u)},s);t.el=e.el,t.targetStart=e.targetStart;const l=t.anchor=e.anchor,d=t.target=e.target,m=t.targetAnchor=e.targetAnchor,g=Z(e.props),v=g?n:d,_=g?l:m;if("svg"===o||te(d)?o="svg":("mathml"===o||ne(d))&&(o="mathml"),E?(f(e.dynamicChildren,E,v,i,s,o,a),Zn(e,t,!0)):c||h(e,t,v,_,i,s,o,a,!1),y)g?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):se(t,n,l,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=re(t.props,p);e&&se(t,e,null,u,0)}else g&&se(t,d,m,u,1);ce(t,y)}},remove(e,t,n,{um:r,o:{remove:i}},s){const{shapeFlag:o,children:a,anchor:c,targetStart:u,targetAnchor:l,target:h,props:f}=e;if(h&&(i(u),i(l)),s&&i(c),16&o){const e=s||!Z(f);for(let i=0;i<a.length;i++){const s=a[i];r(s,t,n,e,!!s.dynamicChildren)}}},move:se,hydrate:oe};function se(e,t,n,{o:{insert:r},m:i},s=2){0===s&&r(e.targetAnchor,t,n);const{el:o,anchor:a,shapeFlag:c,children:u,props:l}=e,h=2===s;if(h&&r(o,t,n),(!h||Z(l))&&16&c)for(let f=0;f<u.length;f++)i(u[f],t,n,2);h&&r(a,t,n)}function oe(e,t,n,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:u,createText:l}},h){const f=t.target=re(t.props,c);if(f){const c=Z(t.props),d=f._lpa||f.firstChild;if(16&t.shapeFlag)if(c)t.anchor=h(o(e),t,a(e),n,r,i,s),t.targetStart=d,t.targetAnchor=d&&o(d);else{t.anchor=o(e);let a=d;while(a){if(a&&8===a.nodeType)if("teleport start anchor"===a.data)t.targetStart=a;else if("teleport anchor"===a.data){t.targetAnchor=a,f._lpa=t.targetAnchor&&o(t.targetAnchor);break}a=o(a)}t.targetAnchor||ue(f,t,l,u),h(d&&o(d),t,f,n,r,i,s)}ce(t,c)}return t.anchor&&o(t.anchor)}const ae=ie;function ce(e,t){const n=e.ctx;if(n&&n.ut){let r,i;t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);while(r&&r!==i)1===r.nodeType&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut()}}function ue(e,t,n,r){const i=t.targetStart=n(""),s=t.targetAnchor=n("");return i[Q]=s,e&&(r(i,e),r(s,e)),s}const le=Symbol("_leaveCb"),he=Symbol("_enterCb");function fe(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return gt(()=>{e.isMounted=!0}),_t(()=>{e.isUnmounting=!0}),e}const de=[Function,Array],pe={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:de,onEnter:de,onAfterEnter:de,onEnterCancelled:de,onBeforeLeave:de,onLeave:de,onAfterLeave:de,onLeaveCancelled:de,onBeforeAppear:de,onAppear:de,onAfterAppear:de,onAppearCancelled:de},me=e=>{const t=e.subTree;return t.component?me(t.component):t},ge={name:"BaseTransition",props:pe,setup(e,{slots:t}){const n=Ei(),i=fe();return()=>{const s=t.default&&Ie(t.default(),!0);if(!s||!s.length)return;const o=ye(s),a=(0,r.ux)(e),{mode:c}=a;if(i.isLeaving)return we(o);const u=be(o);if(!u)return we(o);let l=Ee(u,a,i,n,e=>l=e);u.type!==jr&&Te(u,l);let h=n.subTree&&be(n.subTree);if(h&&h.type!==jr&&!Zr(u,h)&&me(n).type!==jr){let e=Ee(h,a,i,n);if(Te(h,e),"out-in"===c&&u.type!==jr)return i.isLeaving=!0,e.afterLeave=()=>{i.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave,h=void 0},we(o);"in-out"===c&&u.type!==jr?e.delayLeave=(e,t,n)=>{const r=_e(i,h);r[String(h.key)]=h,e[le]=()=>{t(),e[le]=void 0,delete l.delayedLeave,h=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return o}}};function ye(e){let t=e[0];if(e.length>1){let n=!1;for(const r of e)if(r.type!==jr){0,t=r,n=!0;break}}return t}const ve=ge;function _e(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Ee(e,t,n,r,s){const{appear:o,mode:a,persisted:c=!1,onBeforeEnter:u,onEnter:l,onAfterEnter:h,onEnterCancelled:f,onBeforeLeave:d,onLeave:p,onAfterLeave:m,onLeaveCancelled:g,onBeforeAppear:y,onAppear:v,onAfterAppear:E,onAppearCancelled:w}=t,b=String(e.key),T=_e(n,e),I=(e,t)=>{e&&_(e,r,9,t)},S=(e,t)=>{const n=t[1];I(e,t),(0,i.cy)(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},C={mode:a,persisted:c,beforeEnter(t){let r=u;if(!n.isMounted){if(!o)return;r=y||u}t[le]&&t[le](!0);const i=T[b];i&&Zr(e,i)&&i.el[le]&&i.el[le](),I(r,[t])},enter(e){let t=l,r=h,i=f;if(!n.isMounted){if(!o)return;t=v||l,r=E||h,i=w||f}let s=!1;const a=e[he]=t=>{s||(s=!0,I(t?i:r,[e]),C.delayedLeave&&C.delayedLeave(),e[he]=void 0)};t?S(t,[e,a]):a()},leave(t,r){const i=String(e.key);if(t[he]&&t[he](!0),n.isUnmounting)return r();I(d,[t]);let s=!1;const o=t[le]=n=>{s||(s=!0,r(),I(n?g:m,[t]),t[le]=void 0,T[i]===e&&delete T[i])};T[i]=e,p?S(p,[t,o]):o()},clone(e){const i=Ee(e,t,n,r,s);return s&&s(i),i}};return C}function we(e){if(rt(e))return e=ai(e),e.children=null,e}function be(e){if(!rt(e))return J(e.type)&&e.children?ye(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&(0,i.Tn)(n.default))return n.default()}}function Te(e,t){6&e.shapeFlag&&e.component?(e.transition=t,Te(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ie(e,t=!1,n){let r=[],i=0;for(let s=0;s<e.length;s++){let o=e[s];const a=null==n?o.key:String(n)+String(null!=o.key?o.key:s);o.type===Fr?(128&o.patchFlag&&i++,r=r.concat(Ie(o.children,t,a))):(t||o.type!==jr)&&r.push(null!=a?ai(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}
/*! #__NO_SIDE_EFFECTS__ */function Se(e,t){return(0,i.Tn)(e)?(()=>(0,i.X$)({name:e.name},t,{setup:e}))():e}function Ce(){const e=Ei();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Ae(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ke(e){const t=Ei(),n=(0,r.IJ)(null);if(t){const r=t.refs===i.MZ?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:e=>n.value=e})}else 0;const s=n;return s}function Ne(e,t,n,s,o=!1){if((0,i.cy)(e))return void e.forEach((e,r)=>Ne(e,t&&((0,i.cy)(t)?t[r]:t),n,s,o));if(et(s)&&!o)return void(512&s.shapeFlag&&s.type.__asyncResolved&&s.component.subTree.component&&Ne(e,t,n,s.component.subTree));const a=4&s.shapeFlag?Ui(s.component):s.el,c=o?null:a,{i:u,r:l}=e;const h=t&&t.r,f=u.refs===i.MZ?u.refs={}:u.refs,d=u.setupState,p=(0,r.ux)(d),m=d===i.MZ?()=>!1:e=>(0,i.$3)(p,e);if(null!=h&&h!==l&&((0,i.Kg)(h)?(f[h]=null,m(h)&&(d[h]=null)):(0,r.i9)(h)&&(h.value=null)),(0,i.Tn)(l))v(l,u,12,[c,f]);else{const t=(0,i.Kg)(l),s=(0,r.i9)(l);if(t||s){const r=()=>{if(e.f){const n=t?m(l)?d[l]:f[l]:l.value;o?(0,i.cy)(n)&&(0,i.TF)(n,a):(0,i.cy)(n)?n.includes(a)||n.push(a):t?(f[l]=[a],m(l)&&(d[l]=f[l])):(l.value=[a],e.k&&(f[e.k]=l.value))}else t?(f[l]=c,m(l)&&(d[l]=c)):s&&(l.value=c,e.k&&(f[e.k]=c))};c?(r.id=-1,Kn(r,n)):r()}else 0}}let Re=!1;const Oe=()=>{Re||(console.error("Hydration completed but contains mismatches."),Re=!0)},Pe=e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName,De=e=>e.namespaceURI.includes("MathML"),Le=e=>{if(1===e.nodeType)return Pe(e)?"svg":De(e)?"mathml":void 0},xe=e=>8===e.nodeType;function Me(e){const{mt:t,p:n,o:{patchProp:s,createText:o,nextSibling:a,parentNode:c,remove:l,insert:h,createComment:f}}=e,d=(e,t)=>{if(!t.hasChildNodes())return __VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&u("Attempting to hydrate existing markup but container is empty. Performing full mount instead."),n(null,e,t),x(),void(t._vnode=e);p(t.firstChild,e,null,null,null),x(),t._vnode=e},p=(n,r,i,s,l,f=!1)=>{f=f||!!r.dynamicChildren;const d=xe(n)&&"["===n.data,b=()=>v(n,r,i,s,l,d),{type:T,ref:I,shapeFlag:S,patchFlag:C}=r;let A=n.nodeType;r.el=n,-2===C&&(f=!1,r.dynamicChildren=null);let k=null;switch(T){case Vr:3!==A?""===r.children?(h(r.el=o(""),c(n),n),k=n):k=b():(n.data!==r.children&&(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&u("Hydration text mismatch in",n.parentNode,`\n  - rendered on server: ${JSON.stringify(n.data)}\n  - expected on client: ${JSON.stringify(r.children)}`),Oe(),n.data=r.children),k=a(n));break;case jr:w(n)?(k=a(n),E(r.el=n.content.firstChild,n,i)):k=8!==A||d?b():a(n);break;case $r:if(d&&(n=a(n),A=n.nodeType),1===A||3===A){k=n;const e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=1===k.nodeType?k.outerHTML:k.data),t===r.staticCount-1&&(r.anchor=k),k=a(k);return d?a(k):k}b();break;case Fr:k=d?y(n,r,i,s,l,f):b();break;default:if(1&S)k=1===A&&r.type.toLowerCase()===n.tagName.toLowerCase()||w(n)?m(n,r,i,s,l,f):b();else if(6&S){r.slotScopeIds=l;const e=c(n);if(k=d?_(n):xe(n)&&"teleport start"===n.data?_(n,n.data,"teleport end"):a(n),t(r,e,null,i,s,Le(e),f),et(r)&&!r.type.__asyncResolved){let t;d?(t=ii(Fr),t.anchor=k?k.previousSibling:e.lastChild):t=3===n.nodeType?ci(""):ii("div"),t.el=n,r.component.subTree=t}}else 64&S?k=8!==A?b():r.type.hydrate(n,r,i,s,l,f,e,g):128&S?k=r.type.hydrate(n,r,i,s,Le(c(n)),l,f,e,p):__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&u("Invalid HostVNode type:",T,`(${typeof T})`)}return null!=I&&Ne(I,null,s,r),k},m=(e,t,n,o,a,c)=>{c=c||!!t.dynamicChildren;const{type:h,props:f,patchFlag:d,shapeFlag:p,dirs:m,transition:y}=t,v="input"===h||"option"===h;if(v||-1!==d){m&&X(t,null,n,"created");let h,_=!1;if(w(e)){_=Jn(null,y)&&n&&n.vnode.props&&n.vnode.props.appear;const r=e.content.firstChild;if(_){const e=r.getAttribute("class");e&&(r.$cls=e),y.beforeEnter(r)}E(r,e,n),t.el=e=r}if(16&p&&(!f||!f.innerHTML&&!f.textContent)){let r=g(e.firstChild,t,e,n,o,a,c),i=!1;while(r){Ge(e,1)||(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&!i&&(u("Hydration children mismatch on",e,"\nServer rendered element contains more child nodes than client vdom."),i=!0),Oe());const t=r;r=r.nextSibling,l(t)}}else if(8&p){let n=t.children;"\n"!==n[0]||"PRE"!==e.tagName&&"TEXTAREA"!==e.tagName||(n=n.slice(1)),e.textContent!==n&&(Ge(e,0)||(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&u("Hydration text content mismatch on",e,`\n  - rendered on server: ${e.textContent}\n  - expected on client: ${t.children}`),Oe()),e.textContent=t.children)}if(f)if(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__||v||!c||48&d){const r=e.tagName.includes("-");for(const o in f)!__VUE_PROD_HYDRATION_MISMATCH_DETAILS__||m&&m.some(e=>e.dir.created)||!Ue(e,o,f[o],t,n)||Oe(),(v&&(o.endsWith("value")||"indeterminate"===o)||(0,i.Mp)(o)&&!(0,i.SU)(o)||"."===o[0]||r)&&s(e,o,null,f[o],void 0,n)}else if(f.onClick)s(e,"onClick",null,f.onClick,void 0,n);else if(4&d&&(0,r.g8)(f.style))for(const e in f.style)f.style[e];(h=f&&f.onVnodeBeforeMount)&&mi(h,n,t),m&&X(t,null,n,"beforeMount"),((h=f&&f.onVnodeMounted)||m||_)&&xr(()=>{h&&mi(h,n,t),_&&y.enter(e),m&&X(t,null,n,"mounted")},o)}return e.nextSibling},g=(e,t,r,i,s,c,l)=>{l=l||!!t.dynamicChildren;const f=t.children,d=f.length;let m=!1;for(let g=0;g<d;g++){const t=l?f[g]:f[g]=hi(f[g]),y=t.type===Vr;e?(y&&!l&&g+1<d&&hi(f[g+1]).type===Vr&&(h(o(e.data.slice(t.children.length)),r,a(e)),e.data=t.children),e=p(e,t,i,s,c,l)):y&&!t.children?h(t.el=o(""),r):(Ge(r,1)||(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&!m&&(u("Hydration children mismatch on",r,"\nServer rendered element contains fewer child nodes than client vdom."),m=!0),Oe()),n(null,t,r,null,i,s,Le(r),c))}return e},y=(e,t,n,r,i,s)=>{const{slotScopeIds:o}=t;o&&(i=i?i.concat(o):o);const u=c(e),l=g(a(e),t,u,n,r,i,s);return l&&xe(l)&&"]"===l.data?a(t.anchor=l):(Oe(),h(t.anchor=f("]"),u,l),l)},v=(e,t,r,i,s,o)=>{if(Ge(e.parentElement,1)||(__VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&u("Hydration node mismatch:\n- rendered on server:",e,3===e.nodeType?"(text)":xe(e)&&"["===e.data?"(start of fragment)":"","\n- expected on client:",t.type),Oe()),t.el=null,o){const t=_(e);while(1){const n=a(e);if(!n||n===t)break;l(n)}}const h=a(e),f=c(e);return l(e),n(null,t,f,h,r,i,Le(f),s),r&&(r.vnode.el=t.el,Tr(r,t.el)),h},_=(e,t="[",n="]")=>{let r=0;while(e)if(e=a(e),e&&xe(e)&&(e.data===t&&r++,e.data===n)){if(0===r)return a(e);r--}return e},E=(e,t,n)=>{const r=t.parentNode;r&&r.replaceChild(e,t);let i=n;while(i)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent},w=e=>1===e.nodeType&&"TEMPLATE"===e.tagName;return[d,p]}function Ue(e,t,n,r,s){let o,a,c,l;if("class"===t)e.$cls?(c=e.$cls,delete e.$cls):c=e.getAttribute("class"),l=(0,i.C4)(n),Ve(Fe(c||""),Fe(l))||(o=2,a="class");else if("style"===t){c=e.getAttribute("style")||"",l=(0,i.Kg)(n)?n:(0,i.tl)((0,i.Tr)(n));const t=je(c),u=je(l);if(r.dirs)for(const{dir:e,value:n}of r.dirs)"show"!==e.name||n||u.set("display","none");s&&Be(s,r,u),$e(t,u)||(o=3,a="style")}else(e instanceof SVGElement&&(0,i.z3)(t)||e instanceof HTMLElement&&((0,i.W0)(t)||(0,i.wQ)(t)))&&((0,i.W0)(t)?(c=e.hasAttribute(t),l=(0,i.Y2)(n)):null==n?(c=e.hasAttribute(t),l=!1):(c=e.hasAttribute(t)?e.getAttribute(t):"value"===t&&"TEXTAREA"===e.tagName&&e.value,l=!!(0,i.Vp)(n)&&String(n)),c!==l&&(o=4,a=t));if(null!=o&&!Ge(e,o)){const t=e=>!1===e?"(not rendered)":`${a}="${e}"`,n=`Hydration ${We[o]} mismatch on`,r=`\n  - rendered on server: ${t(c)}\n  - expected on client: ${t(l)}\n  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.\n  You should fix the source of the mismatch.`;return u(n,e,r),!0}return!1}function Fe(e){return new Set(e.trim().split(/\s+/))}function Ve(e,t){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}function je(e){const t=new Map;for(const n of e.split(";")){let[e,r]=n.split(":");e=e.trim(),r=r&&r.trim(),e&&r&&t.set(e,r)}return t}function $e(e,t){if(e.size!==t.size)return!1;for(const[n,r]of e)if(r!==t.get(n))return!1;return!0}function Be(e,t,n){const r=e.subTree;if(e.getCssVars&&(t===r||r&&r.type===Fr&&r.children.includes(t))){const t=e.getCssVars();for(const e in t){const r=(0,i.pU)(t[e]);n.set(`--${(0,i.XW)(e,!1)}`,r)}}t===r&&e.parent&&Be(e.parent,e.vnode,n)}const He="data-allow-mismatch",We={[0]:"text",[1]:"children",[2]:"class",[3]:"style",[4]:"attribute"};function Ge(e,t){if(0===t||1===t)while(e&&!e.hasAttribute(He))e=e.parentElement;const n=e&&e.getAttribute(He);if(null==n)return!1;if(""===n)return!0;{const e=n.split(",");return!(0!==t||!e.includes("children"))||e.includes(We[t])}}const Ke=(0,i.We)().requestIdleCallback||(e=>setTimeout(e,1)),qe=(0,i.We)().cancelIdleCallback||(e=>clearTimeout(e)),ze=(e=1e4)=>t=>{const n=Ke(t,{timeout:e});return()=>qe(n)};function Ye(e){const{top:t,left:n,bottom:r,right:i}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:o}=window;return(t>0&&t<s||r>0&&r<s)&&(n>0&&n<o||i>0&&i<o)}const Xe=e=>(t,n)=>{const r=new IntersectionObserver(e=>{for(const n of e)if(n.isIntersecting){r.disconnect(),t();break}},e);return n(e=>{if(e instanceof Element)return Ye(e)?(t(),r.disconnect(),!1):void r.observe(e)}),()=>r.disconnect()},Qe=e=>t=>{if(e){const n=matchMedia(e);if(!n.matches)return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t);t()}},Je=(e=[])=>(t,n)=>{(0,i.Kg)(e)&&(e=[e]);let r=!1;const s=e=>{r||(r=!0,o(),t(),e.target.dispatchEvent(new e.constructor(e.type,e)))},o=()=>{n(t=>{for(const n of e)t.removeEventListener(n,s)})};return n(t=>{for(const n of e)t.addEventListener(n,s,{once:!0})}),o};function Ze(e,t){if(xe(e)&&"["===e.data){let n=1,r=e.nextSibling;while(r){if(1===r.nodeType){const e=t(r);if(!1===e)break}else if(xe(r))if("]"===r.data){if(0===--n)break}else"["===r.data&&n++;r=r.nextSibling}}else t(e)}const et=e=>!!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */function tt(e){(0,i.Tn)(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:s,delay:o=200,hydrate:a,timeout:c,suspensible:u=!0,onError:l}=e;let h,f=null,d=0;const p=()=>(d++,f=null,m()),m=()=>{let e;return f||(e=f=t().catch(e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise((t,n)=>{const r=()=>t(p()),i=()=>n(e);l(e,r,i,d+1)});throw e}).then(t=>e!==f&&f?f:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),h=t,t)))};return Se({name:"AsyncComponentWrapper",__asyncLoader:m,__asyncHydrate(e,t,n){let r=!1;(t.bu||(t.bu=[])).push(()=>r=!0);const i=()=>{r||n()},s=a?()=>{const n=a(i,t=>Ze(e,t));n&&(t.bum||(t.bum=[])).push(n)}:i;h?s():m().then(()=>!t.isUnmounted&&s())},get __asyncResolved(){return h},setup(){const e=_i;if(Ae(e),h)return()=>nt(h,e);const t=t=>{f=null,E(t,e,13,!s)};if(u&&e.suspense||ki)return m().then(t=>()=>nt(t,e)).catch(e=>(t(e),()=>s?ii(s,{error:e}):null));const i=(0,r.KR)(!1),a=(0,r.KR)(),l=(0,r.KR)(!!o);return o&&setTimeout(()=>{l.value=!1},o),null!=c&&setTimeout(()=>{if(!i.value&&!a.value){const e=new Error(`Async component timed out after ${c}ms.`);t(e),a.value=e}},c),m().then(()=>{i.value=!0,e.parent&&rt(e.parent.vnode)&&e.parent.update()}).catch(e=>{t(e),a.value=e}),()=>i.value&&h?nt(h,e):a.value&&s?ii(s,{error:a.value}):n&&!l.value?ii(n):void 0}})}function nt(e,t){const{ref:n,props:r,children:i,ce:s}=t.vnode,o=ii(e,r,i);return o.ref=n,o.ce=s,delete t.vnode.ce,o}const rt=e=>e.type.__isKeepAlive,it={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=Ei(),r=n.ctx;if(!r.renderer)return()=>{const e=t.default&&t.default();return e&&1===e.length?e[0]:e};const s=new Map,o=new Set;let a=null;const c=n.suspense,{renderer:{p:u,m:l,um:h,o:{createElement:f}}}=r,d=f("div");function p(e){ht(e),h(e,n,c,!0)}function m(e){s.forEach((t,n)=>{const r=ji(t.type);r&&!e(r)&&g(n)})}function g(e){const t=s.get(e);!t||a&&Zr(t,a)?a&&ht(a):p(t),s.delete(e),o.delete(e)}r.activate=(e,t,n,r,s)=>{const o=e.component;l(e,t,n,0,c),u(o.vnode,e,t,n,o,c,r,e.slotScopeIds,s),Kn(()=>{o.isDeactivated=!1,o.a&&(0,i.DY)(o.a);const t=e.props&&e.props.onVnodeMounted;t&&mi(t,o.parent,e)},c)},r.deactivate=e=>{const t=e.component;nr(t.m),nr(t.a),l(e,d,null,1,c),Kn(()=>{t.da&&(0,i.DY)(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&mi(n,t.parent,e),t.isDeactivated=!0},c)},cr(()=>[e.include,e.exclude],([e,t])=>{e&&m(t=>ot(e,t)),t&&m(e=>!ot(t,e))},{flush:"post",deep:!0});let y=null;const v=()=>{null!=y&&(Ir(n.subTree.type)?Kn(()=>{s.set(y,ft(n.subTree))},n.subTree.suspense):s.set(y,ft(n.subTree)))};return gt(v),vt(v),_t(()=>{s.forEach(e=>{const{subTree:t,suspense:r}=n,i=ft(t);if(e.type===i.type&&e.key===i.key){ht(i);const e=i.component.da;return void(e&&Kn(e,r))}p(e)})}),()=>{if(y=null,!t.default)return a=null;const n=t.default(),r=n[0];if(n.length>1)return a=null,n;if(!Jr(r)||!(4&r.shapeFlag)&&!(128&r.shapeFlag))return a=null,r;let i=ft(r);if(i.type===jr)return a=null,i;const c=i.type,u=ji(et(i)?i.type.__asyncResolved||{}:c),{include:l,exclude:h,max:f}=e;if(l&&(!u||!ot(l,u))||h&&u&&ot(h,u))return i.shapeFlag&=-257,a=i,r;const d=null==i.key?c:i.key,p=s.get(d);return i.el&&(i=ai(i),128&r.shapeFlag&&(r.ssContent=i)),y=d,p?(i.el=p.el,i.component=p.component,i.transition&&Te(i,i.transition),i.shapeFlag|=512,o.delete(d),o.add(d)):(o.add(d),f&&o.size>parseInt(f,10)&&g(o.values().next().value)),i.shapeFlag|=256,a=i,Ir(r.type)?r:i}}},st=it;function ot(e,t){return(0,i.cy)(e)?e.some(e=>ot(e,t)):(0,i.Kg)(e)?e.split(",").includes(t):!!(0,i.gd)(e)&&(e.lastIndex=0,e.test(t))}function at(e,t){ut(e,"a",t)}function ct(e,t){ut(e,"da",t)}function ut(e,t,n=_i){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(dt(t,r,n),n){let e=n.parent;while(e&&e.parent)rt(e.parent.vnode)&&lt(r,t,n,e),e=e.parent}}function lt(e,t,n,r){const s=dt(t,e,r,!0);Et(()=>{(0,i.TF)(r[t],s)},n)}function ht(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function ft(e){return 128&e.shapeFlag?e.ssContent:e}function dt(e,t,n=_i,i=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...i)=>{(0,r.C4)();const s=Ti(n),o=_(t,n,e,i);return s(),(0,r.bl)(),o});return i?s.unshift(o):s.push(o),o}}const pt=e=>(t,n=_i)=>{ki&&"sp"!==e||dt(e,(...e)=>t(...e),n)},mt=pt("bm"),gt=pt("m"),yt=pt("bu"),vt=pt("u"),_t=pt("bum"),Et=pt("um"),wt=pt("sp"),bt=pt("rtg"),Tt=pt("rtc");function It(e,t=_i){dt("ec",e,t)}const St="components",Ct="directives";function At(e,t){return Ot(St,e,!0,t)||e}const kt=Symbol.for("v-ndc");function Nt(e){return(0,i.Kg)(e)?Ot(St,e,!1)||e:e||kt}function Rt(e){return Ot(Ct,e)}function Ot(e,t,n=!0,r=!1){const s=B||_i;if(s){const n=s.type;if(e===St){const e=ji(n,!1);if(e&&(e===t||e===(0,i.PT)(t)||e===(0,i.ZH)((0,i.PT)(t))))return n}const o=Pt(s[e]||n[e],t)||Pt(s.appContext[e],t);return!o&&r?n:o}}function Pt(e,t){return e&&(e[t]||e[(0,i.PT)(t)]||e[(0,i.ZH)((0,i.PT)(t))])}function Dt(e,t,n,s){let o;const a=n&&n[s],c=(0,i.cy)(e);if(c||(0,i.Kg)(e)){const n=c&&(0,r.g8)(e);let i=!1,s=!1;n&&(i=!(0,r.fE)(e),s=(0,r.Tm)(e),e=(0,r.qA)(e)),o=new Array(e.length);for(let c=0,u=e.length;c<u;c++)o[c]=t(i?s?(0,r.a1)((0,r.lJ)(e[c])):(0,r.lJ)(e[c]):e[c],c,void 0,a&&a[c])}else if("number"===typeof e){0,o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,a&&a[n])}else if((0,i.Gv)(e))if(e[Symbol.iterator])o=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{const n=Object.keys(e);o=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];o[r]=t(e[i],i,r,a&&a[r])}}else o=[];return n&&(n[s]=o),o}function Lt(e,t){for(let n=0;n<t.length;n++){const r=t[n];if((0,i.cy)(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{const t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn)}return e}function xt(e,t,n={},r,s){if(B.ce||B.parent&&et(B.parent)&&B.parent.ce)return"default"!==t&&(n.name=t),Wr(),Qr(Fr,null,[ii("slot",n,r&&r())],64);let o=e[t];o&&o._c&&(o._d=!1),Wr();const a=o&&Mt(o(n)),c=n.key||a&&a.key,u=Qr(Fr,{key:(c&&!(0,i.Bm)(c)?c:`_${t}`)+(!a&&r?"_fb":"")},a||(r?r():[]),a&&1===e._?64:-2);return!s&&u.scopeId&&(u.slotScopeIds=[u.scopeId+"-s"]),o&&o._c&&(o._d=!0),u}function Mt(e){return e.some(e=>!Jr(e)||e.type!==jr&&!(e.type===Fr&&!Mt(e.children)))?e:null}function Ut(e,t){const n={};for(const r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:(0,i.rU)(r)]=e[r];return n}const Ft=e=>e?Si(e)?Ui(e):Ft(e.parent):null,Vt=(0,i.X$)(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ft(e.parent),$root:e=>Ft(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>ln(e),$forceUpdate:e=>e.f||(e.f=()=>{O(e.update)}),$nextTick:e=>e.n||(e.n=N.bind(e.proxy)),$watch:e=>lr.bind(e)}),jt=(e,t)=>e!==i.MZ&&!e.__isScriptSetup&&(0,i.$3)(e,t),$t={get({_:e},t){if("__v_skip"===t)return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:l}=e;let h;if("$"!==t[0]){const r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return n[t];case 3:return a[t]}else{if(jt(s,t))return c[t]=1,s[t];if(o!==i.MZ&&(0,i.$3)(o,t))return c[t]=2,o[t];if((h=e.propsOptions[0])&&(0,i.$3)(h,t))return c[t]=3,a[t];if(n!==i.MZ&&(0,i.$3)(n,t))return c[t]=4,n[t];sn&&(c[t]=0)}}const f=Vt[t];let d,p;return f?("$attrs"===t&&(0,r.u4)(e.attrs,"get",""),f(e)):(d=u.__cssModules)&&(d=d[t])?d:n!==i.MZ&&(0,i.$3)(n,t)?(c[t]=4,n[t]):(p=l.config.globalProperties,(0,i.$3)(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return jt(s,t)?(s[t]=n,!0):r!==i.MZ&&(0,i.$3)(r,t)?(r[t]=n,!0):!(0,i.$3)(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(o[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},a){let c;return!!n[a]||e!==i.MZ&&(0,i.$3)(e,a)||jt(t,a)||(c=o[0])&&(0,i.$3)(c,a)||(0,i.$3)(r,a)||(0,i.$3)(Vt,a)||(0,i.$3)(s.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:(0,i.$3)(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};const Bt=(0,i.X$)({},$t,{get(e,t){if(t!==Symbol.unscopables)return $t.get(e,t,e)},has(e,t){const n="_"!==t[0]&&!(0,i.BH)(t);return n}});function Ht(){return null}function Wt(){return null}function Gt(e){0}function Kt(e){0}function qt(){return null}function zt(){0}function Yt(e,t){return null}function Xt(){return Jt("useSlots").slots}function Qt(){return Jt("useAttrs").attrs}function Jt(e){const t=Ei();return t.setupContext||(t.setupContext=Mi(t))}function Zt(e){return(0,i.cy)(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}function en(e,t){const n=Zt(e);for(const r in t){if(r.startsWith("__skip"))continue;let e=n[r];e?(0,i.cy)(e)||(0,i.Tn)(e)?e=n[r]={type:e,default:t[r]}:e.default=t[r]:null===e&&(e=n[r]={default:t[r]}),e&&t[`__skip_${r}`]&&(e.skipFactory=!0)}return n}function tn(e,t){return e&&t?(0,i.cy)(e)&&(0,i.cy)(t)?e.concat(t):(0,i.X$)({},Zt(e),Zt(t)):e||t}function nn(e,t){const n={};for(const r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n}function rn(e){const t=Ei();let n=e();return Ii(),(0,i.yL)(n)&&(n=n.catch(e=>{throw Ti(t),e})),[n,()=>Ti(t)]}let sn=!0;function on(e){const t=ln(e),n=e.proxy,s=e.ctx;sn=!1,t.beforeCreate&&cn(t.beforeCreate,e,"bc");const{data:o,computed:a,methods:c,watch:u,provide:l,inject:h,created:f,beforeMount:d,mounted:p,beforeUpdate:m,updated:g,activated:y,deactivated:v,beforeDestroy:_,beforeUnmount:E,destroyed:w,unmounted:b,render:T,renderTracked:I,renderTriggered:S,errorCaptured:C,serverPrefetch:A,expose:k,inheritAttrs:N,components:R,directives:O,filters:P}=t,D=null;if(h&&an(h,s,D),c)for(const r in c){const e=c[r];(0,i.Tn)(e)&&(s[r]=e.bind(n))}if(o){0;const t=o.call(n,n);0,(0,i.Gv)(t)&&(e.data=(0,r.Kh)(t))}if(sn=!0,a)for(const r in a){const e=a[r],t=(0,i.Tn)(e)?e.bind(n,n):(0,i.Tn)(e.get)?e.get.bind(n,n):i.tE;0;const o=!(0,i.Tn)(e)&&(0,i.Tn)(e.set)?e.set.bind(n):i.tE,c=Hi({get:t,set:o});Object.defineProperty(s,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:e=>c.value=e})}if(u)for(const r in u)un(u[r],s,n,r);if(l){const e=(0,i.Tn)(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{In(t,e[t])})}function L(e,t){(0,i.cy)(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(f&&cn(f,e,"c"),L(mt,d),L(gt,p),L(yt,m),L(vt,g),L(at,y),L(ct,v),L(It,C),L(Tt,I),L(bt,S),L(_t,E),L(Et,b),L(wt,A),(0,i.cy)(k))if(k.length){const t=e.exposed||(e.exposed={});k.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||(e.exposed={});T&&e.render===i.tE&&(e.render=T),null!=N&&(e.inheritAttrs=N),R&&(e.components=R),O&&(e.directives=O),A&&Ae(e)}function an(e,t,n=i.tE){(0,i.cy)(e)&&(e=mn(e));for(const s in e){const n=e[s];let o;o=(0,i.Gv)(n)?"default"in n?Sn(n.from||s,n.default,!0):Sn(n.from||s):Sn(n),(0,r.i9)(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}function cn(e,t,n){_((0,i.cy)(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function un(e,t,n,r){let s=r.includes(".")?hr(n,r):()=>n[r];if((0,i.Kg)(e)){const n=t[e];(0,i.Tn)(n)&&cr(s,n)}else if((0,i.Tn)(e))cr(s,e.bind(n));else if((0,i.Gv)(e))if((0,i.cy)(e))e.forEach(e=>un(e,t,n,r));else{const r=(0,i.Tn)(e.handler)?e.handler.bind(n):t[e.handler];(0,i.Tn)(r)&&cr(s,r,e)}else 0}function ln(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:a}}=e.appContext,c=o.get(t);let u;return c?u=c:s.length||n||r?(u={},s.length&&s.forEach(e=>hn(u,e,a,!0)),hn(u,t,a)):u=t,(0,i.Gv)(t)&&o.set(t,u),u}function hn(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&hn(e,s,n,!0),i&&i.forEach(t=>hn(e,t,n,!0));for(const o in t)if(r&&"expose"===o);else{const r=fn[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const fn={data:dn,props:vn,emits:vn,methods:yn,computed:yn,beforeCreate:gn,created:gn,beforeMount:gn,mounted:gn,beforeUpdate:gn,updated:gn,beforeDestroy:gn,beforeUnmount:gn,destroyed:gn,unmounted:gn,activated:gn,deactivated:gn,errorCaptured:gn,serverPrefetch:gn,components:yn,directives:yn,watch:_n,provide:dn,inject:pn};function dn(e,t){return t?e?function(){return(0,i.X$)((0,i.Tn)(e)?e.call(this,this):e,(0,i.Tn)(t)?t.call(this,this):t)}:t:e}function pn(e,t){return yn(mn(e),mn(t))}function mn(e){if((0,i.cy)(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function gn(e,t){return e?[...new Set([].concat(e,t))]:t}function yn(e,t){return e?(0,i.X$)(Object.create(null),e,t):t}function vn(e,t){return e?(0,i.cy)(e)&&(0,i.cy)(t)?[...new Set([...e,...t])]:(0,i.X$)(Object.create(null),Zt(e),Zt(null!=t?t:{})):t}function _n(e,t){if(!e)return t;if(!t)return e;const n=(0,i.X$)(Object.create(null),e);for(const r in t)n[r]=gn(e[r],t[r]);return n}function En(){return{app:null,config:{isNativeTag:i.NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let wn=0;function bn(e,t){return function(n,r=null){(0,i.Tn)(n)||(n=(0,i.X$)({},n)),null==r||(0,i.Gv)(r)||(r=null);const s=En(),o=new WeakSet,a=[];let c=!1;const u=s.app={_uid:wn++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:zi,get config(){return s.config},set config(e){0},use(e,...t){return o.has(e)||(e&&(0,i.Tn)(e.install)?(o.add(e),e.install(u,...t)):(0,i.Tn)(e)&&(o.add(e),e(u,...t))),u},mixin(e){return s.mixins.includes(e)||s.mixins.push(e),u},component(e,t){return t?(s.components[e]=t,u):s.components[e]},directive(e,t){return t?(s.directives[e]=t,u):s.directives[e]},mount(i,o,a){if(!c){0;const l=u._ceVNode||ii(n,r);return l.appContext=s,!0===a?a="svg":!1===a&&(a=void 0),o&&t?t(l,i):e(l,i,a),c=!0,u._container=i,i.__vue_app__=u,Ui(l.component)}},onUnmount(e){a.push(e)},unmount(){c&&(_(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(e,t){return s.provides[e]=t,u},runWithContext(e){const t=Tn;Tn=u;try{return e()}finally{Tn=t}}};return u}}let Tn=null;function In(e,t){if(_i){let n=_i.provides;const r=_i.parent&&_i.parent.provides;r===n&&(n=_i.provides=Object.create(r)),n[e]=t}else 0}function Sn(e,t,n=!1){const r=Ei();if(r||Tn){let s=Tn?Tn._context.provides:r?null==r.parent||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&(0,i.Tn)(t)?t.call(r&&r.proxy):t}else 0}function Cn(){return!(!Ei()&&!Tn)}const An={},kn=()=>Object.create(An),Nn=e=>Object.getPrototypeOf(e)===An;function Rn(e,t,n,i=!1){const s={},o=kn();e.propsDefaults=Object.create(null),Pn(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:(0,r.Gc)(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function On(e,t,n,s){const{props:o,attrs:a,vnode:{patchFlag:c}}=e,u=(0,r.ux)(o),[l]=e.propsOptions;let h=!1;if(!(s||c>0)||16&c){let r;Pn(e,t,o,a)&&(h=!0);for(const s in u)t&&((0,i.$3)(t,s)||(r=(0,i.Tg)(s))!==s&&(0,i.$3)(t,r))||(l?!n||void 0===n[s]&&void 0===n[r]||(o[s]=Dn(l,u,s,void 0,e,!0)):delete o[s]);if(a!==u)for(const e in a)t&&(0,i.$3)(t,e)||(delete a[e],h=!0)}else if(8&c){const n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(gr(e.emitsOptions,s))continue;const c=t[s];if(l)if((0,i.$3)(a,s))c!==a[s]&&(a[s]=c,h=!0);else{const t=(0,i.PT)(s);o[t]=Dn(l,u,t,c,e,!1)}else c!==a[s]&&(a[s]=c,h=!0)}}h&&(0,r.hZ)(e.attrs,"set","")}function Pn(e,t,n,s){const[o,a]=e.propsOptions;let c,u=!1;if(t)for(let r in t){if((0,i.SU)(r))continue;const l=t[r];let h;o&&(0,i.$3)(o,h=(0,i.PT)(r))?a&&a.includes(h)?(c||(c={}))[h]=l:n[h]=l:gr(e.emitsOptions,r)||r in s&&l===s[r]||(s[r]=l,u=!0)}if(a){const t=(0,r.ux)(n),s=c||i.MZ;for(let r=0;r<a.length;r++){const c=a[r];n[c]=Dn(o,t,c,s[c],e,!(0,i.$3)(s,c))}}return u}function Dn(e,t,n,r,s,o){const a=e[n];if(null!=a){const e=(0,i.$3)(a,"default");if(e&&void 0===r){const e=a.default;if(a.type!==Function&&!a.skipFactory&&(0,i.Tn)(e)){const{propsDefaults:i}=s;if(n in i)r=i[n];else{const o=Ti(s);r=i[n]=e.call(null,t),o()}}else r=e;s.ce&&s.ce._setProp(n,r)}a[0]&&(o&&!e?r=!1:!a[1]||""!==r&&r!==(0,i.Tg)(n)||(r=!0))}return r}const Ln=new WeakMap;function xn(e,t,n=!1){const r=n?Ln:t.propsCache,s=r.get(e);if(s)return s;const o=e.props,a={},c=[];let u=!1;if(!(0,i.Tn)(e)){const r=e=>{u=!0;const[n,r]=xn(e,t,!0);(0,i.X$)(a,n),r&&c.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!o&&!u)return(0,i.Gv)(e)&&r.set(e,i.Oj),i.Oj;if((0,i.cy)(o))for(let h=0;h<o.length;h++){0;const e=(0,i.PT)(o[h]);Mn(e)&&(a[e]=i.MZ)}else if(o){0;for(const e in o){const t=(0,i.PT)(e);if(Mn(t)){const n=o[e],r=a[t]=(0,i.cy)(n)||(0,i.Tn)(n)?{type:n}:(0,i.X$)({},n),s=r.type;let u=!1,l=!0;if((0,i.cy)(s))for(let e=0;e<s.length;++e){const t=s[e],n=(0,i.Tn)(t)&&t.name;if("Boolean"===n){u=!0;break}"String"===n&&(l=!1)}else u=(0,i.Tn)(s)&&"Boolean"===s.name;r[0]=u,r[1]=l,(u||(0,i.$3)(r,"default"))&&c.push(t)}}}const l=[a,c];return(0,i.Gv)(e)&&r.set(e,l),l}function Mn(e){return"$"!==e[0]&&!(0,i.SU)(e)}const Un=e=>"_"===e||"__"===e||"_ctx"===e||"$stable"===e,Fn=e=>(0,i.cy)(e)?e.map(hi):[hi(e)],Vn=(e,t,n)=>{if(t._n)return t;const r=z((...e)=>Fn(t(...e)),n);return r._c=!1,r},jn=(e,t,n)=>{const r=e._ctx;for(const s in e){if(Un(s))continue;const n=e[s];if((0,i.Tn)(n))t[s]=Vn(s,n,r);else if(null!=n){0;const e=Fn(n);t[s]=()=>e}}},$n=(e,t)=>{const n=Fn(t);e.slots.default=()=>n},Bn=(e,t,n)=>{for(const r in t)!n&&Un(r)||(e[r]=t[r])},Hn=(e,t,n)=>{const r=e.slots=kn();if(32&e.vnode.shapeFlag){const e=t.__;e&&(0,i.yQ)(r,"__",e,!0);const s=t._;s?(Bn(r,t,n),n&&(0,i.yQ)(r,"_",s,!0)):jn(t,r)}else t&&$n(e,t)},Wn=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,a=i.MZ;if(32&r.shapeFlag){const e=t._;e?n&&1===e?o=!1:Bn(s,t,n):(o=!t.$stable,jn(t,s)),a=t}else t&&($n(e,t),a={default:1});if(o)for(const i in s)Un(i)||null!=a[i]||delete s[i]};function Gn(){"boolean"!==typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&((0,i.We)().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__=!1)}const Kn=xr;function qn(e){return Yn(e)}function zn(e){return Yn(e,Me)}function Yn(e,t){Gn();const n=(0,i.We)();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:c,createText:u,createComment:l,setText:h,setElementText:f,parentNode:d,nextSibling:p,setScopeId:m=i.tE,insertStaticContent:g}=e,y=(e,t,n,r=null,i=null,s=null,o=void 0,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Zr(e,t)&&(r=z(e),H(e,i,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:u,ref:l,shapeFlag:h}=t;switch(u){case Vr:v(e,t,n,r);break;case jr:_(e,t,n,r);break;case $r:null==e&&E(t,n,r,o);break;case Fr:R(e,t,n,r,i,s,o,a,c);break;default:1&h?T(e,t,n,r,i,s,o,a,c):6&h?P(e,t,n,r,i,s,o,a,c):(64&h||128&h)&&u.process(e,t,n,r,i,s,o,a,c,Z)}null!=l&&i?Ne(l,e&&e.ref,s,t||e,!t):null==l&&e&&null!=e.ref&&Ne(e.ref,null,s,e,!0)},v=(e,t,n,r)=>{if(null==e)s(t.el=u(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&h(n,t.children)}},_=(e,t,n,r)=>{null==e?s(t.el=l(t.children||""),n,r):t.el=e.el},E=(e,t,n,r)=>{[e.el,e.anchor]=g(e.children,t,n,r,e.el,e.anchor)},w=({el:e,anchor:t},n,r)=>{let i;while(e&&e!==t)i=p(e),s(e,n,r),e=i;s(t,n,r)},b=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=p(e),o(e),e=n;o(t)},T=(e,t,n,r,i,s,o,a,c)=>{"svg"===t.type?o="svg":"math"===t.type&&(o="mathml"),null==e?I(t,n,r,i,s,o,a,c):A(e,t,i,s,o,a,c)},I=(e,t,n,r,o,u,l,h)=>{let d,p;const{props:m,shapeFlag:g,transition:y,dirs:v}=e;if(d=e.el=c(e.type,u,m&&m.is,m),8&g?f(d,e.children):16&g&&C(e.children,d,null,r,o,Xn(e,u),l,h),v&&X(e,null,r,"created"),S(d,e,e.scopeId,l,r),m){for(const e in m)"value"===e||(0,i.SU)(e)||a(d,e,null,m[e],u,r);"value"in m&&a(d,"value",null,m.value,u),(p=m.onVnodeBeforeMount)&&mi(p,r,e)}v&&X(e,null,r,"beforeMount");const _=Jn(o,y);_&&y.beforeEnter(d),s(d,t,n),((p=m&&m.onVnodeMounted)||_||v)&&Kn(()=>{p&&mi(p,r,e),_&&y.enter(d),v&&X(e,null,r,"mounted")},o)},S=(e,t,n,r,i)=>{if(n&&m(e,n),r)for(let s=0;s<r.length;s++)m(e,r[s]);if(i){let n=i.subTree;if(t===n||Ir(n.type)&&(n.ssContent===t||n.ssFallback===t)){const t=i.vnode;S(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},C=(e,t,n,r,i,s,o,a,c=0)=>{for(let u=c;u<e.length;u++){const c=e[u]=a?fi(e[u]):hi(e[u]);y(null,c,t,n,r,i,s,o,a)}},A=(e,t,n,r,s,o,c)=>{const u=t.el=e.el;let{patchFlag:l,dynamicChildren:h,dirs:d}=t;l|=16&e.patchFlag;const p=e.props||i.MZ,m=t.props||i.MZ;let g;if(n&&Qn(n,!1),(g=m.onVnodeBeforeUpdate)&&mi(g,n,t,e),d&&X(t,e,n,"beforeUpdate"),n&&Qn(n,!0),(p.innerHTML&&null==m.innerHTML||p.textContent&&null==m.textContent)&&f(u,""),h?k(e.dynamicChildren,h,u,n,r,Xn(t,s),o):c||V(e,t,u,null,n,r,Xn(t,s),o,!1),l>0){if(16&l)N(u,p,m,n,s);else if(2&l&&p.class!==m.class&&a(u,"class",null,m.class,s),4&l&&a(u,"style",p.style,m.style,s),8&l){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const r=e[t],i=p[r],o=m[r];o===i&&"value"!==r||a(u,r,i,o,s,n)}}1&l&&e.children!==t.children&&f(u,t.children)}else c||null!=h||N(u,p,m,n,s);((g=m.onVnodeUpdated)||d)&&Kn(()=>{g&&mi(g,n,t,e),d&&X(t,e,n,"updated")},r)},k=(e,t,n,r,i,s,o)=>{for(let a=0;a<t.length;a++){const c=e[a],u=t[a],l=c.el&&(c.type===Fr||!Zr(c,u)||198&c.shapeFlag)?d(c.el):n;y(c,u,l,null,r,i,s,o,!0)}},N=(e,t,n,r,s)=>{if(t!==n){if(t!==i.MZ)for(const o in t)(0,i.SU)(o)||o in n||a(e,o,t[o],null,s,r);for(const o in n){if((0,i.SU)(o))continue;const c=n[o],u=t[o];c!==u&&"value"!==o&&a(e,o,u,c,s,r)}"value"in n&&a(e,"value",t.value,n.value,s)}},R=(e,t,n,r,i,o,a,c,l)=>{const h=t.el=e?e.el:u(""),f=t.anchor=e?e.anchor:u("");let{patchFlag:d,dynamicChildren:p,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(s(h,n,r),s(f,n,r),C(t.children||[],n,f,i,o,a,c,l)):d>0&&64&d&&p&&e.dynamicChildren?(k(e.dynamicChildren,p,n,i,o,a,c),(null!=t.key||i&&t===i.subTree)&&Zn(e,t,!0)):V(e,t,n,f,i,o,a,c,l)},P=(e,t,n,r,i,s,o,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,o,c):D(t,n,r,i,s,o,c):M(e,t,c)},D=(e,t,n,r,i,s,o)=>{const a=e.component=vi(e,r,i);if(rt(e)&&(a.ctx.renderer=Z),Ni(a,!1,o),a.asyncDep){if(i&&i.registerDep(a,U,o),!e.el){const r=a.subTree=ii(jr);_(null,r,t,n),e.placeholder=r.el}}else U(a,e,t,n,i,s,o)},M=(e,t,n)=>{const r=t.component=e.component;if(wr(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void F(r,t,n);r.next=t,r.update()}else t.el=e.el,r.vnode=t},U=(e,t,n,s,o,a,c)=>{const u=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:l}=e;{const n=tr(e);if(n)return t&&(t.el=l.el,F(e,t,c)),void n.asyncDep.then(()=>{e.isUnmounted||u()})}let h,f=t;0,Qn(e,!1),t?(t.el=l.el,F(e,t,c)):t=l,n&&(0,i.DY)(n),(h=t.props&&t.props.onVnodeBeforeUpdate)&&mi(h,s,t,l),Qn(e,!0);const p=yr(e);0;const m=e.subTree;e.subTree=p,y(m,p,d(m.el),z(m),e,o,a),t.el=p.el,null===f&&Tr(e,p.el),r&&Kn(r,o),(h=t.props&&t.props.onVnodeUpdated)&&Kn(()=>mi(h,s,t,l),o)}else{let r;const{el:c,props:u}=t,{bm:l,m:h,parent:f,root:d,type:p}=e,m=et(t);if(Qn(e,!1),l&&(0,i.DY)(l),!m&&(r=u&&u.onVnodeBeforeMount)&&mi(r,f,t),Qn(e,!0),c&&te){const t=()=>{e.subTree=yr(e),te(c,e.subTree,e,o,null)};m&&p.__asyncHydrate?p.__asyncHydrate(c,e,t):t()}else{d.ce&&!1!==d.ce._def.shadowRoot&&d.ce._injectChildStyle(p);const r=e.subTree=yr(e);0,y(null,r,n,s,e,o,a),t.el=r.el}if(h&&Kn(h,o),!m&&(r=u&&u.onVnodeMounted)){const e=t;Kn(()=>mi(r,f,e),o)}(256&t.shapeFlag||f&&et(f.vnode)&&256&f.vnode.shapeFlag)&&e.a&&Kn(e.a,o),e.isMounted=!0,t=n=s=null}};e.scope.on();const l=e.effect=new r.X2(u);e.scope.off();const h=e.update=l.run.bind(l),f=e.job=l.runIfDirty.bind(l);f.i=e,f.id=e.uid,l.scheduler=()=>O(f),Qn(e,!0),h()},F=(e,t,n)=>{t.component=e;const i=e.vnode.props;e.vnode=t,e.next=null,On(e,t.props,i,n),Wn(e,t.children,n),(0,r.C4)(),L(e),(0,r.bl)()},V=(e,t,n,r,i,s,o,a,c=!1)=>{const u=e&&e.children,l=e?e.shapeFlag:0,h=t.children,{patchFlag:d,shapeFlag:p}=t;if(d>0){if(128&d)return void $(u,h,n,r,i,s,o,a,c);if(256&d)return void j(u,h,n,r,i,s,o,a,c)}8&p?(16&l&&q(u,i,s),h!==u&&f(n,h)):16&l?16&p?$(u,h,n,r,i,s,o,a,c):q(u,i,s,!0):(8&l&&f(n,""),16&p&&C(h,n,r,i,s,o,a,c))},j=(e,t,n,r,s,o,a,c,u)=>{e=e||i.Oj,t=t||i.Oj;const l=e.length,h=t.length,f=Math.min(l,h);let d;for(d=0;d<f;d++){const r=t[d]=u?fi(t[d]):hi(t[d]);y(e[d],r,n,null,s,o,a,c,u)}l>h?q(e,s,o,!0,!1,f):C(t,n,r,s,o,a,c,u,f)},$=(e,t,n,r,s,o,a,c,u)=>{let l=0;const h=t.length;let f=e.length-1,d=h-1;while(l<=f&&l<=d){const r=e[l],i=t[l]=u?fi(t[l]):hi(t[l]);if(!Zr(r,i))break;y(r,i,n,null,s,o,a,c,u),l++}while(l<=f&&l<=d){const r=e[f],i=t[d]=u?fi(t[d]):hi(t[d]);if(!Zr(r,i))break;y(r,i,n,null,s,o,a,c,u),f--,d--}if(l>f){if(l<=d){const e=d+1,i=e<h?t[e].el:r;while(l<=d)y(null,t[l]=u?fi(t[l]):hi(t[l]),n,i,s,o,a,c,u),l++}}else if(l>d)while(l<=f)H(e[l],s,o,!0),l++;else{const p=l,m=l,g=new Map;for(l=m;l<=d;l++){const e=t[l]=u?fi(t[l]):hi(t[l]);null!=e.key&&g.set(e.key,l)}let v,_=0;const E=d-m+1;let w=!1,b=0;const T=new Array(E);for(l=0;l<E;l++)T[l]=0;for(l=p;l<=f;l++){const r=e[l];if(_>=E){H(r,s,o,!0);continue}let i;if(null!=r.key)i=g.get(r.key);else for(v=m;v<=d;v++)if(0===T[v-m]&&Zr(r,t[v])){i=v;break}void 0===i?H(r,s,o,!0):(T[i-m]=l+1,i>=b?b=i:w=!0,y(r,t[i],n,null,s,o,a,c,u),_++)}const I=w?er(T):i.Oj;for(v=I.length-1,l=E-1;l>=0;l--){const e=m+l,i=t[e],f=t[e+1],d=e+1<h?f.el||f.placeholder:r;0===T[l]?y(null,i,n,d,s,o,a,c,u):w&&(v<0||l!==I[v]?B(i,n,d,2):v--)}}},B=(e,t,n,r,i=null)=>{const{el:a,type:c,transition:u,children:l,shapeFlag:h}=e;if(6&h)return void B(e.component.subTree,t,n,r);if(128&h)return void e.suspense.move(t,n,r);if(64&h)return void c.move(e,t,n,Z);if(c===Fr){s(a,t,n);for(let e=0;e<l.length;e++)B(l[e],t,n,r);return void s(e.anchor,t,n)}if(c===$r)return void w(e,t,n);const f=2!==r&&1&h&&u;if(f)if(0===r)u.beforeEnter(a),s(a,t,n),Kn(()=>u.enter(a),i);else{const{leave:r,delayLeave:i,afterLeave:c}=u,l=()=>{e.ctx.isUnmounted?o(a):s(a,t,n)},h=()=>{r(a,()=>{l(),c&&c()})};i?i(a,l,h):h()}else s(a,t,n)},H=(e,t,n,i=!1,s=!1)=>{const{type:o,props:a,ref:c,children:u,dynamicChildren:l,shapeFlag:h,patchFlag:f,dirs:d,cacheIndex:p}=e;if(-2===f&&(s=!1),null!=c&&((0,r.C4)(),Ne(c,null,n,e,!0),(0,r.bl)()),null!=p&&(t.renderCache[p]=void 0),256&h)return void t.ctx.deactivate(e);const m=1&h&&d,g=!et(e);let y;if(g&&(y=a&&a.onVnodeBeforeUnmount)&&mi(y,t,e),6&h)K(e.component,n,i);else{if(128&h)return void e.suspense.unmount(n,i);m&&X(e,null,t,"beforeUnmount"),64&h?e.type.remove(e,t,n,Z,i):l&&!l.hasOnce&&(o!==Fr||f>0&&64&f)?q(l,t,n,!1,!0):(o===Fr&&384&f||!s&&16&h)&&q(u,t,n),i&&W(e)}(g&&(y=a&&a.onVnodeUnmounted)||m)&&Kn(()=>{y&&mi(y,t,e),m&&X(e,null,t,"unmounted")},n)},W=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Fr)return void G(n,r);if(t===$r)return void b(e);const s=()=>{o(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,o=()=>t(n,s);r?r(e.el,s,o):o()}else s()},G=(e,t)=>{let n;while(e!==t)n=p(e),o(e),e=n;o(t)},K=(e,t,n)=>{const{bum:r,scope:s,job:o,subTree:a,um:c,m:u,a:l,parent:h,slots:{__:f}}=e;nr(u),nr(l),r&&(0,i.DY)(r),h&&(0,i.cy)(f)&&f.forEach(e=>{h.renderCache[e]=void 0}),s.stop(),o&&(o.flags|=8,H(a,e,t,n)),c&&Kn(c,t),Kn(()=>{e.isUnmounted=!0},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},q=(e,t,n,r=!1,i=!1,s=0)=>{for(let o=s;o<e.length;o++)H(e[o],t,n,r,i)},z=e=>{if(6&e.shapeFlag)return z(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();const t=p(e.anchor||e.el),n=t&&t[Q];return n?p(n):t};let Y=!1;const J=(e,t,n)=>{null==e?t._vnode&&H(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),t._vnode=e,Y||(Y=!0,L(),x(),Y=!1)},Z={p:y,um:H,m:B,r:W,mt:D,mc:C,pc:V,pbc:k,n:z,o:e};let ee,te;return t&&([ee,te]=t(Z)),{render:J,hydrate:ee,createApp:bn(J,ee)}}function Xn({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Qn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Jn(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Zn(e,t,n=!1){const r=e.children,s=t.children;if((0,i.cy)(r)&&(0,i.cy)(s))for(let i=0;i<r.length;i++){const e=r[i];let t=s[i];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=s[i]=fi(s[i]),t.el=e.el),n||-2===t.patchFlag||Zn(e,t)),t.type===Vr&&(t.el=e.el),t.type!==jr||t.el||(t.el=e.el)}}function er(e){const t=e.slice(),n=[0];let r,i,s,o,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}s=0,o=n.length-1;while(s<o)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}s=n.length,o=n[s-1];while(s-- >0)n[s]=o,o=t[o];return n}function tr(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:tr(t)}function nr(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const rr=Symbol.for("v-scx"),ir=()=>{{const e=Sn(rr);return e}};function sr(e,t){return ur(e,null,t)}function or(e,t){return ur(e,null,{flush:"post"})}function ar(e,t){return ur(e,null,{flush:"sync"})}function cr(e,t,n){return ur(e,t,n)}function ur(e,t,n=i.MZ){const{immediate:s,deep:o,flush:a,once:c}=n;const u=(0,i.X$)({},n);const l=t&&s||!t&&"post"!==a;let h;if(ki)if("sync"===a){const e=ir();h=e.__watcherHandles||(e.__watcherHandles=[])}else if(!l){const e=()=>{};return e.stop=i.tE,e.resume=i.tE,e.pause=i.tE,e}const f=_i;u.call=(e,t,n)=>_(e,f,t,n);let d=!1;"post"===a?u.scheduler=e=>{Kn(e,f&&f.suspense)}:"sync"!==a&&(d=!0,u.scheduler=(e,t)=>{t?e():O(e)}),u.augmentJob=e=>{t&&(e.flags|=4),d&&(e.flags|=2,f&&(e.id=f.uid,e.i=f))};const p=(0,r.wB)(e,t,u);return ki&&(h?h.push(p):l&&p()),p}function lr(e,t,n){const r=this.proxy,s=(0,i.Kg)(e)?e.includes(".")?hr(r,e):()=>r[e]:e.bind(r,r);let o;(0,i.Tn)(t)?o=t:(o=t.handler,n=t);const a=Ti(this),c=ur(s,o.bind(r),n);return a(),c}function hr(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function fr(e,t,n=i.MZ){const s=Ei();const o=(0,i.PT)(t);const a=(0,i.Tg)(t),c=dr(e,o),u=(0,r.rY)((r,c)=>{let u,l,h=i.MZ;return ar(()=>{const t=e[o];(0,i.$H)(u,t)&&(u=t,c())}),{get(){return r(),n.get?n.get(u):u},set(e){const r=n.set?n.set(e):e;if(!(0,i.$H)(r,u)&&(h===i.MZ||!(0,i.$H)(e,h)))return;const f=s.vnode.props;f&&(t in f||o in f||a in f)&&(`onUpdate:${t}`in f||`onUpdate:${o}`in f||`onUpdate:${a}`in f)||(u=e,c()),s.emit(`update:${t}`,r),(0,i.$H)(e,r)&&(0,i.$H)(e,h)&&!(0,i.$H)(r,l)&&c(),h=e,l=r}}});return u[Symbol.iterator]=()=>{let e=0;return{next(){return e<2?{value:e++?c||i.MZ:u,done:!1}:{done:!0}}}},u}const dr=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${(0,i.PT)(t)}Modifiers`]||e[`${(0,i.Tg)(t)}Modifiers`];function pr(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||i.MZ;let s=n;const o=t.startsWith("update:"),a=o&&dr(r,t.slice(7));let c;a&&(a.trim&&(s=n.map(e=>(0,i.Kg)(e)?e.trim():e)),a.number&&(s=n.map(i.bB)));let u=r[c=(0,i.rU)(t)]||r[c=(0,i.rU)((0,i.PT)(t))];!u&&o&&(u=r[c=(0,i.rU)((0,i.Tg)(t))]),u&&_(u,e,6,s);const l=r[c+"Once"];if(l){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,_(l,e,6,s)}}function mr(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(void 0!==s)return s;const o=e.emits;let a={},c=!1;if(!(0,i.Tn)(e)){const r=e=>{const n=mr(e,t,!0);n&&(c=!0,(0,i.X$)(a,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return o||c?((0,i.cy)(o)?o.forEach(e=>a[e]=null):(0,i.X$)(a,o),(0,i.Gv)(e)&&r.set(e,a),a):((0,i.Gv)(e)&&r.set(e,null),null)}function gr(e,t){return!(!e||!(0,i.Mp)(t))&&(t=t.slice(2).replace(/Once$/,""),(0,i.$3)(e,t[0].toLowerCase()+t.slice(1))||(0,i.$3)(e,(0,i.Tg)(t))||(0,i.$3)(e,t))}function yr(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[o],slots:a,attrs:c,emit:u,render:l,renderCache:h,props:f,data:d,setupState:p,ctx:m,inheritAttrs:g}=e,y=W(e);let v,_;try{if(4&n.shapeFlag){const e=s||r,t=e;v=hi(l.call(t,e,h,f,p,d,m)),_=c}else{const e=t;0,v=hi(e.length>1?e(f,{attrs:c,slots:a,emit:u}):e(f,null)),_=t.props?c:_r(c)}}catch(b){Br.length=0,E(b,e,1),v=ii(jr)}let w=v;if(_&&!1!==g){const e=Object.keys(_),{shapeFlag:t}=w;e.length&&7&t&&(o&&e.some(i.CP)&&(_=Er(_,o)),w=ai(w,_,!1,!0))}return n.dirs&&(w=ai(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(n.dirs):n.dirs),n.transition&&Te(w,n.transition),v=w,W(y),v}function vr(e,t=!0){let n;for(let r=0;r<e.length;r++){const t=e[r];if(!Jr(t))return;if(t.type!==jr||"v-if"===t.children){if(n)return;n=t}}return n}const _r=e=>{let t;for(const n in e)("class"===n||"style"===n||(0,i.Mp)(n))&&((t||(t={}))[n]=e[n]);return t},Er=(e,t)=>{const n={};for(const r in e)(0,i.CP)(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function wr(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:c}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==o&&(r?!o||br(r,o,u):!!o);if(1024&c)return!0;if(16&c)return r?br(r,o,u):!!o;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(o[n]!==r[n]&&!gr(u,n))return!0}}return!1}function br(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!gr(n,s))return!0}return!1}function Tr({vnode:e,parent:t},n){while(t){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r!==e)break;(e=t.vnode).el=n,t=t.parent}}const Ir=e=>e.__isSuspense;let Sr=0;const Cr={name:"Suspense",__isSuspense:!0,process(e,t,n,r,i,s,o,a,c,u){if(null==e)Nr(t,n,r,i,s,o,a,c,u);else{if(s&&s.deps>0&&!e.suspense.isInFallback)return t.suspense=e.suspense,t.suspense.vnode=t,void(t.el=e.el);Rr(e,t,n,r,i,o,a,c,u)}},hydrate:Pr,normalize:Dr},Ar=Cr;function kr(e,t){const n=e.props&&e.props[t];(0,i.Tn)(n)&&n()}function Nr(e,t,n,r,i,s,o,a,c){const{p:u,o:{createElement:l}}=c,h=l("div"),f=e.suspense=Or(e,i,r,t,h,n,s,o,a,c);u(null,f.pendingBranch=e.ssContent,h,null,r,f,s,o),f.deps>0?(kr(e,"onPending"),kr(e,"onFallback"),u(null,e.ssFallback,t,n,r,null,s,o),Mr(f,e.ssFallback)):f.resolve(!1,!0)}function Rr(e,t,n,r,i,s,o,a,{p:c,um:u,o:{createElement:l}}){const h=t.suspense=e.suspense;h.vnode=t,t.el=e.el;const f=t.ssContent,d=t.ssFallback,{activeBranch:p,pendingBranch:m,isInFallback:g,isHydrating:y}=h;if(m)h.pendingBranch=f,Zr(f,m)?(c(m,f,h.hiddenContainer,null,i,h,s,o,a),h.deps<=0?h.resolve():g&&(y||(c(p,d,n,r,i,null,s,o,a),Mr(h,d)))):(h.pendingId=Sr++,y?(h.isHydrating=!1,h.activeBranch=m):u(m,i,h),h.deps=0,h.effects.length=0,h.hiddenContainer=l("div"),g?(c(null,f,h.hiddenContainer,null,i,h,s,o,a),h.deps<=0?h.resolve():(c(p,d,n,r,i,null,s,o,a),Mr(h,d))):p&&Zr(f,p)?(c(p,f,n,r,i,h,s,o,a),h.resolve(!0)):(c(null,f,h.hiddenContainer,null,i,h,s,o,a),h.deps<=0&&h.resolve()));else if(p&&Zr(f,p))c(p,f,n,r,i,h,s,o,a),Mr(h,f);else if(kr(t,"onPending"),h.pendingBranch=f,512&f.shapeFlag?h.pendingId=f.component.suspenseId:h.pendingId=Sr++,c(null,f,h.hiddenContainer,null,i,h,s,o,a),h.deps<=0)h.resolve();else{const{timeout:e,pendingId:t}=h;e>0?setTimeout(()=>{h.pendingId===t&&h.fallback(d)},e):0===e&&h.fallback(d)}}function Or(e,t,n,r,s,o,a,c,u,l,h=!1){const{p:f,m:d,um:p,n:m,o:{parentNode:g,remove:y}}=l;let v;const _=Ur(e);_&&t&&t.pendingBranch&&(v=t.pendingId,t.deps++);const w=e.props?(0,i.Ro)(e.props.timeout):void 0;const b=o,T={vnode:e,parent:t,parentComponent:n,namespace:a,container:r,hiddenContainer:s,deps:0,pendingId:Sr++,timeout:"number"===typeof w?w:-1,activeBranch:null,pendingBranch:null,isInFallback:!h,isHydrating:h,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){const{vnode:r,activeBranch:i,pendingBranch:s,pendingId:a,effects:c,parentComponent:u,container:l}=T;let h=!1;T.isHydrating?T.isHydrating=!1:e||(h=i&&s.transition&&"out-in"===s.transition.mode,h&&(i.transition.afterLeave=()=>{a===T.pendingId&&(d(s,l,o===b?m(i):o,0),D(c))}),i&&(g(i.el)===l&&(o=m(i)),p(i,u,T,!0)),h||d(s,l,o,0)),Mr(T,s),T.pendingBranch=null,T.isInFallback=!1;let f=T.parent,y=!1;while(f){if(f.pendingBranch){f.effects.push(...c),y=!0;break}f=f.parent}y||h||D(c),T.effects=[],_&&t&&t.pendingBranch&&v===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),kr(r,"onResolve")},fallback(e){if(!T.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:s}=T;kr(t,"onFallback");const o=m(n),a=()=>{T.isInFallback&&(f(null,e,i,o,r,null,s,c,u),Mr(T,e))},l=e.transition&&"out-in"===e.transition.mode;l&&(n.transition.afterLeave=a),T.isInFallback=!0,p(n,r,null,!0),l||a()},move(e,t,n){T.activeBranch&&d(T.activeBranch,e,t,n),T.container=e},next(){return T.activeBranch&&m(T.activeBranch)},registerDep(e,t,n){const r=!!T.pendingBranch;r&&T.deps++;const i=e.vnode.el;e.asyncDep.catch(t=>{E(t,e,0)}).then(s=>{if(e.isUnmounted||T.isUnmounted||T.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:o}=e;Oi(e,s,!1),i&&(o.el=i);const c=!i&&e.subTree.el;t(e,o,g(i||e.subTree.el),i?null:m(e.subTree),T,a,n),c&&y(c),Tr(e,o.el),r&&0===--T.deps&&T.resolve()})},unmount(e,t){T.isUnmounted=!0,T.activeBranch&&p(T.activeBranch,n,e,t),T.pendingBranch&&p(T.pendingBranch,n,e,t)}};return T}function Pr(e,t,n,r,i,s,o,a,c){const u=t.suspense=Or(t,r,n,e.parentNode,document.createElement("div"),null,i,s,o,a,!0),l=c(e,u.pendingBranch=t.ssContent,n,u,s,o);return 0===u.deps&&u.resolve(!1,!0),l}function Dr(e){const{shapeFlag:t,children:n}=e,r=32&t;e.ssContent=Lr(r?n.default:n),e.ssFallback=r?Lr(n.fallback):ii(jr)}function Lr(e){let t;if((0,i.Tn)(e)){const n=qr&&e._c;n&&(e._d=!1,Wr()),e=e(),n&&(e._d=!0,t=Hr,Gr())}if((0,i.cy)(e)){const t=vr(e);0,e=t}return e=hi(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function xr(e,t){t&&t.pendingBranch?(0,i.cy)(e)?t.effects.push(...e):t.effects.push(e):D(e)}function Mr(e,t){e.activeBranch=t;const{vnode:n,parentComponent:r}=e;let i=t.el;while(!i&&t.component)t=t.component.subTree,i=t.el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,Tr(r,i))}function Ur(e){const t=e.props&&e.props.suspensible;return null!=t&&!1!==t}const Fr=Symbol.for("v-fgt"),Vr=Symbol.for("v-txt"),jr=Symbol.for("v-cmt"),$r=Symbol.for("v-stc"),Br=[];let Hr=null;function Wr(e=!1){Br.push(Hr=e?null:[])}function Gr(){Br.pop(),Hr=Br[Br.length-1]||null}let Kr,qr=1;function zr(e,t=!1){qr+=e,e<0&&Hr&&t&&(Hr.hasOnce=!0)}function Yr(e){return e.dynamicChildren=qr>0?Hr||i.Oj:null,Gr(),qr>0&&Hr&&Hr.push(e),e}function Xr(e,t,n,r,i,s){return Yr(ri(e,t,n,r,i,s,!0))}function Qr(e,t,n,r,i){return Yr(ii(e,t,n,r,i,!0))}function Jr(e){return!!e&&!0===e.__v_isVNode}function Zr(e,t){return e.type===t.type&&e.key===t.key}function ei(e){Kr=e}const ti=({key:e})=>null!=e?e:null,ni=({ref:e,ref_key:t,ref_for:n})=>("number"===typeof e&&(e=""+e),null!=e?(0,i.Kg)(e)||(0,r.i9)(e)||(0,i.Tn)(e)?{i:B,r:e,k:t,f:!!n}:e:null);function ri(e,t=null,n=null,r=0,s=null,o=(e===Fr?0:1),a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ti(t),ref:t&&ni(t),scopeId:H,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:B};return c?(di(u,n),128&o&&e.normalize(u)):n&&(u.shapeFlag|=(0,i.Kg)(n)?8:16),qr>0&&!a&&Hr&&(u.patchFlag>0||6&o)&&32!==u.patchFlag&&Hr.push(u),u}const ii=si;function si(e,t=null,n=null,s=0,o=null,a=!1){if(e&&e!==kt||(e=jr),Jr(e)){const r=ai(e,t,!0);return n&&di(r,n),qr>0&&!a&&Hr&&(6&r.shapeFlag?Hr[Hr.indexOf(e)]=r:Hr.push(r)),r.patchFlag=-2,r}if(Bi(e)&&(e=e.__vccOpts),t){t=oi(t);let{class:e,style:n}=t;e&&!(0,i.Kg)(e)&&(t.class=(0,i.C4)(e)),(0,i.Gv)(n)&&((0,r.ju)(n)&&!(0,i.cy)(n)&&(n=(0,i.X$)({},n)),t.style=(0,i.Tr)(n))}const c=(0,i.Kg)(e)?1:Ir(e)?128:J(e)?64:(0,i.Gv)(e)?4:(0,i.Tn)(e)?2:0;return ri(e,t,n,s,o,c,a,!0)}function oi(e){return e?(0,r.ju)(e)||Nn(e)?(0,i.X$)({},e):e:null}function ai(e,t,n=!1,r=!1){const{props:s,ref:o,patchFlag:a,children:c,transition:u}=e,l=t?pi(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&ti(l),ref:t&&t.ref?n&&o?(0,i.cy)(o)?o.concat(ni(t)):[o,ni(t)]:ni(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fr?-1===a?16:16|a:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ai(e.ssContent),ssFallback:e.ssFallback&&ai(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&r&&Te(h,u.clone(h)),h}function ci(e=" ",t=0){return ii(Vr,null,e,t)}function ui(e,t){const n=ii($r,null,e);return n.staticCount=t,n}function li(e="",t=!1){return t?(Wr(),Qr(jr,null,e)):ii(jr,null,e)}function hi(e){return null==e||"boolean"===typeof e?ii(jr):(0,i.cy)(e)?ii(Fr,null,e.slice()):Jr(e)?fi(e):ii(Vr,null,String(e))}function fi(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:ai(e)}function di(e,t){let n=0;const{shapeFlag:r}=e;if(null==t)t=null;else if((0,i.cy)(t))n=16;else if("object"===typeof t){if(65&r){const n=t.default;return void(n&&(n._c&&(n._d=!1),di(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||Nn(t)?3===r&&B&&(1===B.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=B}}else(0,i.Tn)(t)?(t={default:t,_ctx:B},n=32):(t=String(t),64&r?(n=16,t=[ci(t)]):n=8);e.children=t,e.shapeFlag|=n}function pi(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=(0,i.C4)([t.class,r.class]));else if("style"===e)t.style=(0,i.Tr)([t.style,r.style]);else if((0,i.Mp)(e)){const n=t[e],s=r[e];!s||n===s||(0,i.cy)(n)&&n.includes(s)||(t[e]=n?[].concat(n,s):s)}else""!==e&&(t[e]=r[e])}return t}function mi(e,t,n,r=null){_(e,t,7,[n,r])}const gi=En();let yi=0;function vi(e,t,n){const s=e.type,o=(t?t.appContext:e.appContext)||gi,a={uid:yi++,vnode:e,type:s,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new r.yC(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xn(s,o),emitsOptions:mr(s,o),emit:null,emitted:null,propsDefaults:i.MZ,inheritAttrs:s.inheritAttrs,ctx:i.MZ,data:i.MZ,props:i.MZ,attrs:i.MZ,slots:i.MZ,refs:i.MZ,setupState:i.MZ,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=pr.bind(null,a),e.ce&&e.ce(a),a}let _i=null;const Ei=()=>_i||B;let wi,bi;{const e=(0,i.We)(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};wi=t("__VUE_INSTANCE_SETTERS__",e=>_i=e),bi=t("__VUE_SSR_SETTERS__",e=>ki=e)}const Ti=e=>{const t=_i;return wi(e),e.scope.on(),()=>{e.scope.off(),wi(t)}},Ii=()=>{_i&&_i.scope.off(),wi(null)};function Si(e){return 4&e.vnode.shapeFlag}let Ci,Ai,ki=!1;function Ni(e,t=!1,n=!1){t&&bi(t);const{props:r,children:i}=e.vnode,s=Si(e);Rn(e,r,s,t),Hn(e,i,n||t);const o=s?Ri(e,t):void 0;return t&&bi(!1),o}function Ri(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,$t);const{setup:s}=n;if(s){(0,r.C4)();const n=e.setupContext=s.length>1?Mi(e):null,o=Ti(e),a=v(s,e,0,[e.props,n]),c=(0,i.yL)(a);if((0,r.bl)(),o(),!c&&!e.sp||et(e)||Ae(e),c){if(a.then(Ii,Ii),t)return a.then(n=>{Oi(e,n,t)}).catch(t=>{E(t,e,0)});e.asyncDep=a}else Oi(e,a,t)}else Li(e,t)}function Oi(e,t,n){(0,i.Tn)(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:(0,i.Gv)(t)&&(e.setupState=(0,r.Pr)(t)),Li(e,n)}function Pi(e){Ci=e,Ai=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Bt))}}const Di=()=>!Ci;function Li(e,t,n){const s=e.type;if(!e.render){if(!t&&Ci&&!s.render){const t=s.template||ln(e).template;if(t){0;const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:o,compilerOptions:a}=s,c=(0,i.X$)((0,i.X$)({isCustomElement:n,delimiters:o},r),a);s.render=Ci(t,c)}}e.render=s.render||i.tE,Ai&&Ai(e)}{const t=Ti(e);(0,r.C4)();try{on(e)}finally{(0,r.bl)(),t()}}}const xi={get(e,t){return(0,r.u4)(e,"get",""),e[t]}};function Mi(e){const t=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,xi),slots:e.slots,emit:e.emit,expose:t}}function Ui(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy((0,r.Pr)((0,r.IG)(e.exposed)),{get(t,n){return n in t?t[n]:n in Vt?Vt[n](e):void 0},has(e,t){return t in e||t in Vt}})):e.proxy}const Fi=/(?:^|[-_])(\w)/g,Vi=e=>e.replace(Fi,e=>e.toUpperCase()).replace(/[-_]/g,"");function ji(e,t=!0){return(0,i.Tn)(e)?e.displayName||e.name:e.name||t&&e.__name}function $i(e,t,n=!1){let r=ji(t);if(!r&&t.__file){const e=t.__file.match(/([^/\\]+)\.\w+$/);e&&(r=e[1])}if(!r&&e&&e.parent){const n=e=>{for(const n in e)if(e[n]===t)return n};r=n(e.components||e.parent.type.components)||n(e.appContext.components)}return r?Vi(r):n?"App":"Anonymous"}function Bi(e){return(0,i.Tn)(e)&&"__vccOpts"in e}const Hi=(e,t)=>{const n=(0,r.EW)(e,t,ki);return n};function Wi(e,t,n){const r=arguments.length;return 2===r?(0,i.Gv)(t)&&!(0,i.cy)(t)?Jr(t)?ii(e,null,[t]):ii(e,t):ii(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&Jr(n)&&(n=[n]),ii(e,t,n))}function Gi(){return void 0}function Ki(e,t,n,r){const i=n[r];if(i&&qi(i,e))return i;const s=t();return s.memo=e.slice(),s.cacheIndex=r,n[r]=s}function qi(e,t){const n=e.memo;if(n.length!=t.length)return!1;for(let r=0;r<n.length;r++)if((0,i.$H)(n[r],t[r]))return!1;return qr>0&&Hr&&Hr.push(e),!0}const zi="3.5.18",Yi=i.tE,Xi=y,Qi=F,Ji=$,Zi={createComponentInstance:vi,setupComponent:Ni,renderComponentRoot:yr,setCurrentRenderingInstance:W,isVNode:Jr,normalizeVNode:hi,getComponentPublicInstance:Ui,ensureValidVNode:Mt,pushWarningContext:o,popWarningContext:a},es=Zi,ts=null,ns=null,rs=null},6801:function(e,t,n){var r=n(3724),i=n(8686),s=n(4913),o=n(8551),a=n(5397),c=n(1072);t.f=r&&!i?Object.defineProperties:function(e,t){o(e);var n,r=a(t),i=c(t),u=i.length,l=0;while(u>l)s.f(e,n=i[l++],r[n]);return e}},6823:function(e){var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},6837:function(e){var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},6840:function(e,t,n){var r=n(4901),i=n(4913),s=n(283),o=n(9433);e.exports=function(e,t,n,a){a||(a={});var c=a.enumerable,u=void 0!==a.name?a.name:t;if(r(n)&&s(n,u,a),a.global)c?e[t]=n:o(t,n);else{try{a.unsafe?e[t]&&(c=!0):delete e[t]}catch(l){}c?e[t]=n:i.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e}},6955:function(e,t,n){var r=n(2140),i=n(4901),s=n(2195),o=n(8227),a=o("toStringTag"),c=Object,u="Arguments"===s(function(){return arguments}()),l=function(e,t){try{return e[t]}catch(n){}};e.exports=r?s:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=l(t=c(e),a))?n:u?s(t):"Object"===(r=s(t))&&i(t.callee)?"Arguments":r}},6969:function(e,t,n){var r=n(2777),i=n(757);e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},6980:function(e){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},7040:function(e,t,n){var r=n(4495);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},7055:function(e,t,n){var r=n(9504),i=n(9039),s=n(2195),o=Object,a=r("".split);e.exports=i(function(){return!o("z").propertyIsEnumerable(0)})?function(e){return"String"===s(e)?a(e,""):o(e)}:o},7080:function(e,t,n){var r=n(4402).has;e.exports=function(e){return r(e),e}},7347:function(e,t,n){var r=n(3724),i=n(9565),s=n(8773),o=n(6980),a=n(5397),c=n(6969),u=n(9297),l=n(5917),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),l)try{return h(e,t)}catch(n){}if(u(e,t))return o(!i(s.f,e,t),e[t])}},7394:function(e,t,n){var r=n(4576),i=n(6706),s=n(2195),o=r.ArrayBuffer,a=r.TypeError;e.exports=o&&i(o.prototype,"byteLength","get")||function(e){if("ArrayBuffer"!==s(e))throw new a("ArrayBuffer expected");return e.byteLength}},7476:function(e,t,n){var r=n(2195),i=n(9504);e.exports=function(e){if("Function"===r(e))return i(e)}},7588:function(e,t,n){var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),u=n(9539),l=n(4549),h=l("forEach",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{forEach:function(e){a(this);try{o(e)}catch(r){u(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;s(t,function(t){e(t,n++)},{IS_RECORD:!0})}})},7629:function(e,t,n){var r=n(6395),i=n(4576),s=n(9433),o="__core-js_shared__",a=e.exports=i[o]||s(o,{});(a.versions||(a.versions=[])).push({version:"3.45.0",mode:r?"pure":"global",copyright:"© 2014-2025 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.45.0/LICENSE",source:"https://github.com/zloirock/core-js"})},7642:function(e,t,n){var r=n(6518),i=n(3440),s=n(9039),o=n(4916),a=!o("difference",function(e){return 0===e.size}),c=a||s(function(){var e={size:1,has:function(){return!0},keys:function(){var e=0;return{next:function(){var n=e++>1;return t.has(1)&&t.clear(),{done:n,value:2}}}}},t=new Set([1,2,3,4]);return 3!==t.difference(e).size});r({target:"Set",proto:!0,real:!0,forced:c},{difference:i})},7657:function(e,t,n){var r,i,s,o=n(9039),a=n(4901),c=n(34),u=n(2360),l=n(2787),h=n(6840),f=n(8227),d=n(6395),p=f("iterator"),m=!1;[].keys&&(s=[].keys(),"next"in s?(i=l(l(s)),i!==Object.prototype&&(r=i)):m=!0);var g=!c(r)||o(function(){var e={};return r[p].call(e)!==e});g?r={}:d&&(r=u(r)),a(r[p])||h(r,p,function(){return this}),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:m}},7740:function(e,t,n){var r=n(9297),i=n(5031),s=n(7347),o=n(4913);e.exports=function(e,t,n){for(var a=i(t),c=o.f,u=s.f,l=0;l<a.length;l++){var h=a[l];r(e,h)||n&&r(n,h)||c(e,h,u(t,h))}}},7750:function(e,t,n){var r=n(4117),i=TypeError;e.exports=function(e){if(r(e))throw new i("Can't call method on "+e);return e}},7751:function(e,t,n){var r=n(4576),i=n(4901),s=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?s(r[e]):r[e]&&r[e][t]}},7811:function(e){e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},8004:function(e,t,n){var r=n(6518),i=n(9039),s=n(8750),o=n(4916),a=!o("intersection",function(e){return 2===e.size&&e.has(1)&&e.has(2)})||i(function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))});r({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},8014:function(e,t,n){var r=n(1291),i=Math.min;e.exports=function(e){var t=r(e);return t>0?i(t,9007199254740991):0}},8111:function(e,t,n){var r=n(6518),i=n(4576),s=n(679),o=n(8551),a=n(4901),c=n(2787),u=n(2106),l=n(4659),h=n(9039),f=n(9297),d=n(8227),p=n(7657).IteratorPrototype,m=n(3724),g=n(6395),y="constructor",v="Iterator",_=d("toStringTag"),E=TypeError,w=i[v],b=g||!a(w)||w.prototype!==p||!h(function(){w({})}),T=function(){if(s(this,p),c(this)===p)throw new E("Abstract class Iterator not directly constructable")},I=function(e,t){m?u(p,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===p)throw new E("You can't redefine this property");f(this,e)?this[e]=t:l(this,e,t)}}):p[e]=t};f(p,_)||I(_,v),!b&&f(p,y)&&p[y]!==Object||I(y,T),T.prototype=p,r({global:!0,constructor:!0,forced:b},{Iterator:T})},8227:function(e,t,n){var r=n(4576),i=n(5745),s=n(9297),o=n(3392),a=n(4495),c=n(7040),u=r.Symbol,l=i("wks"),h=c?u["for"]||u:u&&u.withoutSetter||o;e.exports=function(e){return s(l,e)||(l[e]=a&&s(u,e)?u[e]:h("Symbol."+e)),l[e]}},8237:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767),c=n(9539),u=n(4549),l=n(8745),h=n(9039),f=TypeError,d=h(function(){[].keys().reduce(function(){},void 0)}),p=!d&&u("reduce",f);r({target:"Iterator",proto:!0,real:!0,forced:d||p},{reduce:function(e){o(this);try{s(e)}catch(h){c(this,"throw",h)}var t=arguments.length<2,n=t?void 0:arguments[1];if(p)return l(p,this,t?[e]:[e,n]);var r=a(this),u=0;if(i(r,function(r){t?(t=!1,n=r):n=e(n,r,u),u++},{IS_RECORD:!0}),t)throw new f("Reduce of empty iterator with no initial value");return n}})},8469:function(e,t,n){var r=n(9504),i=n(507),s=n(4402),o=s.Set,a=s.proto,c=r(a.forEach),u=r(a.keys),l=u(new o).next;e.exports=function(e,t,n){return n?i({iterator:u(e),next:l},t):c(e,t)}},8480:function(e,t,n){var r=n(1828),i=n(8727),s=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},8527:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(507),c=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<n.size)return!1;var u=n.getIterator();return!1!==a(u,function(e){if(!i(t,e))return c(u,"normal",!1)})}},8551:function(e,t,n){var r=n(34),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not an object")}},8622:function(e,t,n){var r=n(4576),i=n(4901),s=r.WeakMap;e.exports=i(s)&&/native code/.test(String(s))},8686:function(e,t,n){var r=n(3724),i=n(9039);e.exports=r&&i(function(){return 42!==Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype})},8727:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},8745:function(e,t,n){var r=n(616),i=Function.prototype,s=i.apply,o=i.call;e.exports="object"==typeof Reflect&&Reflect.apply||(r?o.bind(s):function(){return o.apply(s,arguments)})},8750:function(e,t,n){var r=n(7080),i=n(4402),s=n(5170),o=n(3789),a=n(8469),c=n(507),u=i.Set,l=i.add,h=i.has;e.exports=function(e){var t=r(this),n=o(e),i=new u;return s(t)>n.size?c(n.getIterator(),function(e){h(t,e)&&l(i,e)}):a(t,function(e){n.includes(e)&&l(i,e)}),i}},8773:function(e,t){var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},8826:function(e,t,n){n.d(t,{Uz:function(){return M},Qg:function(){return F}});n(8111),n(1701);var r=n(262),i=n(2455),s=n(798);
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
const o="type.googleapis.com/google.protobuf.Int64Value",a="type.googleapis.com/google.protobuf.UInt64Value";function c(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function u(e){if(null==e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"===typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(e=>u(e));if("function"===typeof e||"object"===typeof e)return c(e,e=>u(e));throw new Error("Data cannot be encoded in JSON: "+e)}function l(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case o:case a:{const t=Number(e["value"]);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(e=>l(e)):"function"===typeof e||"object"===typeof e?c(e,e=>l(e)):e}
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
 */const h="functions",f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};
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
 */class d extends i.g{constructor(e,t,n){super(`${h}/${e}`,t||""),this.details=n,Object.setPrototypeOf(this,d.prototype)}}function p(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function m(e,t){let n,r=p(e),i=r;try{const e=t&&t.error;if(e){const t=e.status;if("string"===typeof t){if(!f[t])return new d("internal","internal");r=f[t],i=t}const s=e.message;"string"===typeof s&&(i=s),n=e.details,void 0!==n&&(n=l(n))}}catch(s){}return"ok"===r?null:new d(r,i,n)}
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
 */class g{constructor(e,t,n,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then(e=>this.auth=e,()=>{}),this.messaging||n.get().then(e=>this.messaging=e,()=>{}),this.appCheck||i?.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),n=await this.getMessagingToken(),r=await this.getAppCheckToken(e);return{authToken:t,messagingToken:n,appCheckToken:r}}}
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
 */const y="us-central1",v=/^data: (.*?)(?:\n|$)/;function _(e){let t=null;return{promise:new Promise((n,r)=>{t=setTimeout(()=>{r(new d("deadline-exceeded","deadline-exceeded"))},e)}),cancel:()=>{t&&clearTimeout(t)}}}class E{constructor(e,t,n,r,i=y,s=(...e)=>fetch(...e)){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new g(e,t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{const e=new URL(i);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=y}catch(o){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;if(null!==this.emulatorOrigin){const n=this.emulatorOrigin;return`${n}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function w(e,t,n){const r=(0,i.zJ)(t);e.emulatorOrigin=`http${r?"s":""}://${t}:${n}`,r&&((0,i.gE)(e.emulatorOrigin),(0,i.P1)("Functions",!0))}function b(e,t,n){const r=r=>S(e,t,r,n||{});return r.stream=(n,r)=>A(e,t,n,r),r}async function T(e,t,n,r){let i;n["Content-Type"]="application/json";try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(o){return{status:0,json:null}}let s=null;try{s=await i.json()}catch(o){}return{status:i.status,json:s}}async function I(e,t){const n={},r=await e.contextProvider.getContext(t.limitedUseAppCheckTokens);return r.authToken&&(n["Authorization"]="Bearer "+r.authToken),r.messagingToken&&(n["Firebase-Instance-ID-Token"]=r.messagingToken),null!==r.appCheckToken&&(n["X-Firebase-AppCheck"]=r.appCheckToken),n}function S(e,t,n,r){const i=e._url(t);return C(e,i,n,r)}async function C(e,t,n,r){n=u(n);const i={data:n},s=await I(e,r),o=r.timeout||7e4,a=_(o),c=await Promise.race([T(t,i,s,e.fetchImpl),a.promise,e.cancelAllRequests]);if(a.cancel(),!c)throw new d("cancelled","Firebase Functions instance was deleted.");const h=m(c.status,c.json);if(h)throw h;if(!c.json)throw new d("internal","Response is not valid JSON object.");let f=c.json.data;if("undefined"===typeof f&&(f=c.json.result),"undefined"===typeof f)throw new d("internal","Response is missing data field.");const p=l(f);return{data:p}}function A(e,t,n,r){const i=e._url(t);return k(e,i,n,r||{})}async function k(e,t,n,r){n=u(n);const i={data:n},s=await I(e,r);let o,a,c;s["Content-Type"]="application/json",s["Accept"]="text/event-stream";try{o=await e.fetchImpl(t,{method:"POST",body:JSON.stringify(i),headers:s,signal:r?.signal})}catch(p){if(p instanceof Error&&"AbortError"===p.name){const e=new d("cancelled","Request was cancelled.");return{data:Promise.reject(e),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(e)}}}}}}const e=m(0,null);return{data:Promise.reject(e),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(e)}}}}}}const l=new Promise((e,t)=>{a=e,c=t});r?.signal?.addEventListener("abort",()=>{const e=new d("cancelled","Request was cancelled.");c(e)});const h=o.body.getReader(),f=N(h,a,c,r?.signal);return{stream:{[Symbol.asyncIterator](){const e=f.getReader();return{async next(){const{value:t,done:n}=await e.read();return{value:t,done:n}},async return(){return await e.cancel(),{done:!0,value:void 0}}}}},data:l}}function N(e,t,n,r){const i=(e,r)=>{const i=e.match(v);if(!i)return;const s=i[1];try{const e=JSON.parse(s);if("result"in e)return void t(l(e.result));if("message"in e)return void r.enqueue(l(e.message));if("error"in e){const t=m(0,e);return r.error(t),void n(t)}}catch(o){if(o instanceof d)return r.error(o),void n(o)}},s=new TextDecoder;return new ReadableStream({start(t){let o="";return a();async function a(){if(r?.aborted){const e=new d("cancelled","Request was cancelled");return t.error(e),n(e),Promise.resolve()}try{const{value:c,done:u}=await e.read();if(u)return o.trim()&&i(o.trim(),t),void t.close();if(r?.aborted){const r=new d("cancelled","Request was cancelled");return t.error(r),n(r),void await e.cancel()}o+=s.decode(c,{stream:!0});const l=o.split("\n");o=l.pop()||"";for(const e of l)e.trim()&&i(e.trim(),t);return a()}catch(c){const e=c instanceof d?c:m(0,null);t.error(e),n(e)}}},cancel(){return e.cancel()}})}const R="@firebase/functions",O="0.13.0",P="auth-internal",D="app-check-internal",L="messaging-internal";function x(e){const t=(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider(P),i=e.getProvider(L),s=e.getProvider(D);return new E(n,r,i,s,t)};(0,r.om)(new s.uA(h,t,"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(R,O,e),(0,r.KO)(R,O,"esm2020")}
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
 */function M(e=(0,r.Sx)(),t=y){const n=(0,r.j6)((0,i.Ku)(e),h),s=n.getImmediate({identifier:t}),o=(0,i.yU)("functions");return o&&U(s,...o),s}function U(e,t,n){w((0,i.Ku)(e),t,n)}function F(e,t,n){return b((0,i.Ku)(e),t,n)}x()},8981:function(e,t,n){var r=n(7750),i=Object;e.exports=function(e){return i(r(e))}},9039:function(e){e.exports=function(e){try{return!!e()}catch(t){return!0}}},9143:function(e,t,n){var r=n(4576),i=n(9504),s=n(3972),o=n(3463),a=n(9297),c=n(2804),u=n(944),l=n(5169),h=c.c2i,f=c.c2iUrl,d=r.SyntaxError,p=r.TypeError,m=i("".charAt),g=function(e,t){for(var n=e.length;t<n;t++){var r=m(e,t);if(" "!==r&&"\t"!==r&&"\n"!==r&&"\f"!==r&&"\r"!==r)break}return t},y=function(e,t,n){var r=e.length;r<4&&(e+=2===r?"AA":"A");var i=(t[m(e,0)]<<18)+(t[m(e,1)]<<12)+(t[m(e,2)]<<6)+t[m(e,3)],s=[i>>16&255,i>>8&255,255&i];if(2===r){if(n&&0!==s[1])throw new d("Extra bits");return[s[0]]}if(3===r){if(n&&0!==s[2])throw new d("Extra bits");return[s[0],s[1]]}return s},v=function(e,t,n){for(var r=t.length,i=0;i<r;i++)e[n+i]=t[i];return n+r};e.exports=function(e,t,n,r){o(e),s(t);var i="base64"===u(t)?h:f,c=t?t.lastChunkHandling:void 0;if(void 0===c&&(c="loose"),"loose"!==c&&"strict"!==c&&"stop-before-partial"!==c)throw new p("Incorrect `lastChunkHandling` option");n&&l(n.buffer);var _=e.length,E=n||[],w=0,b=0,T="",I=0;if(r)while(1){if(I=g(e,I),I===_){if(T.length>0){if("stop-before-partial"===c)break;if("loose"!==c)throw new d("Missing padding");if(1===T.length)throw new d("Malformed padding: exactly one additional character");w=v(E,y(T,i,!1),w)}b=_;break}var S=m(e,I);if(++I,"="===S){if(T.length<2)throw new d("Padding is too early");if(I=g(e,I),2===T.length){if(I===_){if("stop-before-partial"===c)break;throw new d("Malformed padding: only one =")}"="===m(e,I)&&(++I,I=g(e,I))}if(I<_)throw new d("Unexpected character after padding");w=v(E,y(T,i,"strict"===c),w),b=_;break}if(!a(i,S))throw new d("Unexpected character");var C=r-w;if(1===C&&2===T.length||2===C&&3===T.length)break;if(T+=S,4===T.length&&(w=v(E,y(T,i,!1),w),T="",b=I,w===r))break}return{bytes:E,read:b,written:w}}},9286:function(e,t,n){var r=n(4402),i=n(8469),s=r.Set,o=r.add;e.exports=function(e){var t=new s;return i(e,function(e){o(t,e)}),t}},9297:function(e,t,n){var r=n(9504),i=n(8981),s=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return s(i(e),t)}},9306:function(e,t,n){var r=n(4901),i=n(6823),s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not a function")}},9433:function(e,t,n){var r=n(4576),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},9462:function(e,t,n){var r=n(9565),i=n(2360),s=n(6699),o=n(6279),a=n(8227),c=n(1181),u=n(5966),l=n(7657).IteratorPrototype,h=n(2529),f=n(9539),d=n(1385),p=a("toStringTag"),m="IteratorHelper",g="WrapForValidIterator",y="normal",v="throw",_=c.set,E=function(e){var t=c.getterFor(e?g:m);return o(i(l),{next:function(){var n=t(this);if(e)return n.nextHandler();if(n.done)return h(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:h(r,n.done)}catch(i){throw n.done=!0,i}},return:function(){var n=t(this),i=n.iterator;if(n.done=!0,e){var s=u(i,"return");return s?r(s,i):h(void 0,!0)}if(n.inner)try{f(n.inner.iterator,y)}catch(o){return f(i,v,o)}if(n.openIters)try{d(n.openIters,y)}catch(o){return f(i,v,o)}return i&&f(i,y),h(void 0,!0)}})},w=E(!0),b=E(!1);s(b,p,"Iterator Helper"),e.exports=function(e,t,n){var r=function(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?g:m,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,_(this,i)};return r.prototype=t?w:b,r}},9486:function(e,t,n){var r=n(6518),i=n(4576),s=n(9504),o=n(3972),a=n(4154),c=n(5169),u=n(2804),l=n(944),h=u.i2c,f=u.i2cUrl,d=s("".charAt),p=i.Uint8Array,m=!p||!p.prototype.toBase64||!function(){try{var e=new p;e.toBase64(null)}catch(t){return!0}}();p&&r({target:"Uint8Array",proto:!0,forced:m},{toBase64:function(){var e=a(this),t=arguments.length?o(arguments[0]):void 0,n="base64"===l(t)?h:f,r=!!t&&!!t.omitPadding;c(this.buffer);for(var i,s="",u=0,p=e.length,m=function(e){return d(n,i>>6*e&63)};u+2<p;u+=3)i=(e[u]<<16)+(e[u+1]<<8)+e[u+2],s+=m(3)+m(2)+m(1)+m(0);return u+2===p?(i=(e[u]<<16)+(e[u+1]<<8),s+=m(3)+m(2)+m(1)+(r?"":"=")):u+1===p&&(i=e[u]<<16,s+=m(3)+m(2)+(r?"":"==")),s}})},9504:function(e,t,n){var r=n(616),i=Function.prototype,s=i.call,o=r&&i.bind.bind(s,s);e.exports=r?o:function(e){return function(){return s.apply(e,arguments)}}},9519:function(e,t,n){var r,i,s=n(4576),o=n(2839),a=s.process,c=s.Deno,u=a&&a.versions||c&&c.version,l=u&&u.v8;l&&(r=l.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},9539:function(e,t,n){var r=n(9565),i=n(8551),s=n(5966);e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},9565:function(e,t,n){var r=n(616),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},9577:function(e,t,n){var r=n(9928),i=n(4644),s=n(1108),o=n(1291),a=n(5854),c=i.aTypedArray,u=i.getTypedArrayConstructor,l=i.exportTypedArrayMethod,h=function(){try{new Int8Array(1)["with"](2,{valueOf:function(){throw 8}})}catch(e){return 8===e}}(),f=h&&function(){try{new Int8Array(1)["with"](-.5,1)}catch(e){return!0}}();l("with",{with:function(e,t){var n=c(this),i=o(e),l=s(n)?a(t):+t;return r(n,u(n),i,l)}}["with"],!h||f)},9617:function(e,t,n){var r=n(5397),i=n(5610),s=n(6198),o=function(e){return function(t,n,o){var a=r(t),c=s(a);if(0===c)return!e&&-1;var u,l=i(o,c);if(e&&n!==n){while(c>l)if(u=a[l++],u!==u)return!0}else for(;c>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}};e.exports={includes:o(!0),indexOf:o(!1)}},9631:function(e,t,n){n(9486)},9797:function(e,t,n){n(4226)},9835:function(e){e.exports=function(e){try{var t=new Set,n={size:0,has:function(){return!0},keys:function(){return Object.defineProperty({},"next",{get:function(){return t.clear(),t.add(4),function(){return{done:!0}}}})}},r=t[e](n);return 1===r.size&&4===r.values().next().value}catch(i){return!1}}},9928:function(e,t,n){var r=n(6198),i=n(1291),s=RangeError;e.exports=function(e,t,n,o){var a=r(e),c=i(n),u=c<0?a+c:c;if(u>=a||u<0)throw new s("Incorrect index");for(var l=new t(a),h=0;h<a;h++)l[h]=h===u?o:e[h];return l}}}]);
//# sourceMappingURL=chunk-vendors.177fa935.js.map