(self.AMP=self.AMP||[]).push({n:"amp-form",v:"1809142227020",f:(function(AMP,_){
var k;function m(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};var aa=Object.prototype.toString;function ba(a){if(!a)return[];for(var b=Array(a.length),c=0;c<a.length;c++)b[c]=a[c];return b}function ca(a){return"[object Object]"===aa.call(a)};self.log=self.log||{user:null,dev:null,userForEmbed:null};var n=self.log;function p(){if(!n.user)throw Error("failed to call initLogConstructor");return n.user}function da(){if(n.dev)return n.dev;throw Error("failed to call initLogConstructor");};var ea=Object.prototype.hasOwnProperty;function q(){var a,b=Object.create(null);a&&Object.assign(b,a);return b}function t(a){return a||{}}
function fa(a,b){var c;c=void 0===c?10:c;var d=[],e=[];e.push({t:a,s:b,d:0});for(a={};0<e.length;){b=e.shift();a.t=b.t;a.s=b.s;a.d=b.d;if(d.includes(a.s))throw Error("Source object has a circular reference.");d.push(a.s);a.t!==a.s&&(a.d>c?Object.assign(a.t,a.s):(Object.keys(a.s).forEach(function(a){return function(b){var c=a.s[b];if(ea.call(a.t,b)){var d=a.t[b];if(ca(c)&&ca(d)){e.push({t:d,s:c,d:a.d+1});return}}a.t[b]=c}}(a)),a={s:a.s,t:a.t,d:a.d}))}};function ga(a,b){return b.length>a.length?!1:0==a.lastIndexOf(b,0)};var u=self.AMP_CONFIG||{},ha={thirdParty:u.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:u.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:("string"==typeof u.thirdPartyFrameRegex?new RegExp(u.thirdPartyFrameRegex):u.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,cdn:u.cdnUrl||"https://cdn.ampproject.org",cdnProxyRegex:("string"==typeof u.cdnProxyRegex?new RegExp(u.cdnProxyRegex):u.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,
errorReporting:u.errorReportingUrl||"https://amp-error-reporting.appspot.com/r",localDev:u.localDev||!1};function v(a){this.ea=a;this.P=this.W=0;this.J=Object.create(null)}v.prototype.has=function(a){return!!this.J[a]};v.prototype.get=function(a){var b=this.J[a];if(b)return b.access=++this.P,b.payload};v.prototype.put=function(a,b){this.has(a)||this.W++;this.J[a]={payload:b,access:this.P};if(!(this.W<=this.ea)){da().warn("lru-cache","Trimming LRU cache");a=this.J;var c=this.P+1,d,e;for(e in a){var g=a[e].access;g<c&&(c=g,d=e)}void 0!==d&&(delete a[d],this.W--)}};var ia=t({c:!0,v:!0,a:!0,ad:!0}),ja,ka,la=/[?&]amp_js[^&]*/,na=/[?&]amp_gsa[^&]*/,oa=/[?&]amp_r[^&]*/,pa=/[?&]usqp[^&]*/;
function w(a){var b;ja||(ja=self.document.createElement("a"),ka=self.UrlCache||(self.UrlCache=new v(100)));var c=b?null:ka,d=ja;if(c&&c.has(a))a=c.get(a);else{d.href=a;d.protocol||(d.href=d.href);var e={href:d.href,protocol:d.protocol,host:d.host,hostname:d.hostname,port:"0"==d.port?"":d.port,pathname:d.pathname,search:d.search,hash:d.hash,origin:null};"/"!==e.pathname[0]&&(e.pathname="/"+e.pathname);if("http:"==e.protocol&&80==e.port||"https:"==e.protocol&&443==e.port)e.port="",e.host=e.hostname;
e.origin=d.origin&&"null"!=d.origin?d.origin:"data:"!=e.protocol&&e.host?e.protocol+"//"+e.host:e.href;c&&c.put(a,e);a=e}return a};function qa(){var a,b;this.promise=new Promise(function(c,d){a=c;b=d});this.resolve=a;this.reject=b}function ra(a){return new Promise(function(b){b(a())})}function sa(a){var b,c;this.Z=new Promise(function(a,d){b=a;c=d});this.ia=b;this.ga=c;this.R=0;if(a)for(var d=0;d<a.length;d++)this.add(a[d])}sa.prototype.add=function(a){var b=this,c=++this.R;Promise.resolve(a).then(function(a){b.R===c&&b.ia(a)},function(a){b.R===c&&b.ga(a)});return this.Z};
sa.prototype.then=function(a,b){return this.Z.then(a,b)};function x(a,b){if(a.nodeType){var c=(a.ownerDocument||a).defaultView;if(c=c!=(c.__AMP_TOP||c)&&ta(c,b)?y(c,b):null)return c}return z(a,b)}function A(a,b){a=a.__AMP_TOP||a;return y(a,b)}function z(a,b){a=B(a);a=C(a);return y(a,b)}function B(a){return a.nodeType?A((a.ownerDocument||a).defaultView,"ampdoc").getAmpDoc(a):a}function C(a){a=B(a);return a.isSingleDoc()?a.win:a}
function y(a,b){ta(a,b);var c=ua(a);a=c[b];a.obj||(a.obj=new a.ctor(a.context),a.ctor=null,a.context=null,a.resolve&&a.resolve(a.obj));return a.obj}function va(a){var b=ua(a)["amp-analytics-instrumentation"];if(b){if(b.promise)return b.promise;y(a,"amp-analytics-instrumentation");return b.promise=Promise.resolve(b.obj)}return null}function ua(a){var b=a.services;b||(b=a.services={});return b}function ta(a,b){a=a.services&&a.services[b];return!(!a||!a.ctor&&!a.obj)};/*
 https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
var wa=/(\0)|^(-)$|([\x01-\x1f\x7f]|^-?[0-9])|([\x80-\uffff0-9a-zA-Z_-]+)|[^]/g;function xa(a,b,c,d,e){return e?e:b?"\ufffd":d?a.slice(0,-1)+"\\"+a.slice(-1).charCodeAt(0).toString(16)+" ":"\\"+a};var D;function ya(a,b){for(var c=[],d=a.parentElement;d;d=d.parentElement)b(d)&&c.push(d);return c}function za(a){var b="fieldset",b=b.toUpperCase();return ya(a,function(a){return a.tagName==b})}function E(a,b){for(var c=0,d;void 0!==(d=a[c]);c++)b(d,c)};function Aa(a){var b=B(a),c=va(C(a));return c?c:b.whenBodyAvailable().then(function(){var a;a=b.win;var c=b.getHeadNode(),g;if(c){g=[];for(var c=c.querySelectorAll("script[custom-element]"),f=0;f<c.length;f++)g.push(c[f].getAttribute("custom-element"))}else g=[];a=g.includes("amp-analytics")?A(a,"extensions").waitForExtension(a,"amp-analytics"):Promise.resolve();return a}).then(function(){var c;c=b.win;if(c.ampExtendedElements&&c.ampExtendedElements["amp-analytics"]){c=C(a);var e=va(c);if(!e){var g=
new qa,e=g.promise,g=g.resolve;ua(c)["amp-analytics-instrumentation"]={obj:null,promise:e,resolve:g,context:null,ctor:null}}c=e}else c=null;return c})};function Ba(a,b,c,d){var e={detail:c};Object.assign(e,d);if("function"==typeof a.CustomEvent)return new a.CustomEvent(b,e);a=a.document.createEvent("CustomEvent");a.initCustomEvent(b,!!e.bubbles,!!e.cancelable,c);return a};function Ca(a){return JSON.parse(a)};var F,Da="Webkit webkit Moz moz ms O o".split(" ");function Ea(a,b){var c=void 0;if(ga(b,"--"))return b;F||(F=q());var d=F[b];if(!d||c){d=b;if(void 0===a[b]){var e=b.charAt(0).toUpperCase()+b.slice(1);a:{for(var g=0;g<Da.length;g++){var f=Da[g]+e;if(void 0!==a[f]){e=f;break a}}e=""}var h=e;void 0!==a[h]&&(d=h)}c||(F[b]=d)}return d}function Fa(a,b,c){var d;(b=Ea(a.style,b))&&(a.style[b]=d?c+d:c)}
function Ga(a,b){if(void 0===b){var c;c=(c=Ea(a.style,"display"))?a.style[c]:void 0;b="none"==c}Fa(a,"display",b?"":"none")};function Ha(a,b){var c='form.amp-form-submit-error [submit-error],form.amp-form-submit-success [submit-success],form.amp-form-submitting [submitting]{display:block}.i-amphtml-validation-bubble{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);background-color:#fff;box-shadow:0 5px 15px 0 rgba(0,0,0,0.5);max-width:200px;position:absolute;display:block;box-sizing:border-box;padding:10px;border-radius:5px}.i-amphtml-validation-bubble:after{content:" ";position:absolute;bottom:-8px;left:30px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #fff}[visible-when-invalid]{display:none;color:red}[visible-when-invalid].visible{display:initial}\n/*# sourceURL=/extensions/amp-form/0.1/amp-form.css*/',
d=!1,e="amp-form",g=a.getHeadNode(),f=Ia(g,Ja(g,c),d||!1,e||null);if(b){var h=a.getRootNode();if(Ka(h,f))b(f);else var l=setInterval(function(){Ka(h,f)&&(clearInterval(l),b(f))},4)}}
function Ia(a,b,c,d){var e=a.__AMP_CSS_SM;e||(e=a.__AMP_CSS_SM=q());var g=!c&&d&&"amp-custom"!=d&&"amp-keyframes"!=d,f=c?"amp-runtime":g?"amp-extension="+d:null;if(f){var h=La(a,e,f);if(h)return h.textContent!==b&&(h.textContent=b),h}var l=(a.ownerDocument||a).createElement("style");l.textContent=b;var r=null;c?l.setAttribute("amp-runtime",""):g?(l.setAttribute("amp-extension",d||""),r=La(a,e,"amp-runtime")):(d&&l.setAttribute(d,""),r=a.lastChild);b=r;a.insertBefore(l,b?b.nextSibling:a.firstChild);
f&&(e[f]=l);return l}function La(a,b,c){return b[c]?b[c]:(a=a.querySelector("style["+c+"]"))?b[c]=a:null}function Ja(a,b){return(a=a.__AMP_CSS_TR)?a(b):b}function Ka(a,b){var c=a.styleSheets;for(a=0;a<c.length;a++){var d=c[a];if(d.ownerNode==b)return!0}return!1};function Ma(a,b,c){Aa(a).then(function(d){d&&d.triggerEventForTarget(a,b,c)})};function Na(a){if("undefined"!==typeof TextEncoder)a=(new TextEncoder("utf-8")).encode(a);else{a=unescape(encodeURIComponent(a));for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b}return a};function G(a){var b={},c=a.elements,d=/^(?:input|select|textarea)$/i,e=/^(?:button|image|file|reset)$/i,g=/^(?:checkbox|radio)$/i;for(a=0;a<c.length;a++){var f=c[a],h;if(h=f.name){a:if(f.disabled)h=!0;else{h=za(f);for(var l=0;l<h.length;l++)if(h[l].disabled){h=!0;break a}h=!1}h=!h}!h||!d.test(f.tagName)||e.test(f.type)||g.test(f.type)&&!f.checked||(void 0===b[f.name]&&(b[f.name]=[]),b[f.name].push(f.value))}return b};function H(a){this.B=new FormData(a);this.L=this.B.entries?null:a?G(a):q()}H.prototype.append=function(a,b){if(!this.B.entries){var c=String(a);this.L[c]=this.L[c]||[];this.L[a].push(String(b))}return this.B.append(a,b)};H.prototype.entries=function(){if(this.B.entries)return this.B.entries();var a=[],b=this.L;Object.keys(b).forEach(function(c){b[c].forEach(function(b){return a.push([c,b])})});var c=0;return{next:function(){return c<a.length?{value:a[c++],done:!1}:{value:void 0,done:!0}}}};
H.prototype.getFormData=function(){return this.B};var Oa=["GET","POST"];function Pa(a,b){var c=Object.assign({},b),d=b.body;if(d&&"function"==typeof d.getFormData){c.headers["Content-Type"]="multipart/form-data;charset=utf-8";b=b.body.entries();for(var d=[],e=b.next();!e.done;e=b.next())d.push(e.value);c.body=d}return{input:a,init:c}}
function Qa(a,b){p().assert(ca(a),"Object expected: %s",a);var c="document"==b;if("function"===typeof Response&&!c)return new Response(a.body,a.init);var d=q(),e={status:200,statusText:"OK",responseText:a.body?String(a.body):"",getResponseHeader:function(a){return d[String(a).toLowerCase()]||null}};a.init&&(a=a.init,Array.isArray(a.headers)&&a.headers.forEach(function(a){var b=a[0],c=a[1];d[String(b).toLowerCase()]=String(c)}),a.status&&(e.status=parseInt(a.status,10)),a.statusText&&(e.statusText=
String(a.statusText)));c&&(e.responseXML=(new DOMParser).parseFromString(e.responseText,"text/html"));return new I(e)}function I(a){this.m=a;this.status=this.m.status;this.ok=200<=this.status&&300>this.status;this.headers=new Ra(a);this.bodyUsed=!1;this.body=null}I.prototype.clone=function(){return new I(this.m)};function Sa(a){a.bodyUsed=!0;return Promise.resolve(a.m.responseText)}I.prototype.text=function(){return Sa(this)};I.prototype.json=function(){return Sa(this).then(Ca)};
I.prototype.arrayBuffer=function(){return Sa(this).then(Na)};function Ra(a){this.m=a}Ra.prototype.get=function(a){return this.m.getResponseHeader(a)};Ra.prototype.has=function(a){return null!=this.m.getResponseHeader(a)};function J(a,b,c){this.C=b;this.l=c;this.X=new XMLSerializer;this.ka=a}J.prototype.isSupported=function(){var a=this.C.ampdoc;return a.isSingleDoc()&&a.getRootNode().documentElement.hasAttribute("allow-viewer-render-template")?this.C.hasCapability("viewerRenderTemplate"):!1};
J.prototype.fetchAndRenderTemplate=function(a,b,c,d){c=void 0===c?null:c;d=void 0===d?{}:d;var e;c||this.l.maybeFindTemplate(a)&&(e=this.X.serializeToString(this.l.findTemplate(a)));return this.C.sendMessageAwaitResponse("viewerRenderTemplate",Ta(this,b,e,c,d))};
function Ta(a,b,c,d,e){e=void 0===e?{}:e;var g=t({type:a.ka,successTemplate:{type:"amp-mustache",payload:d?a.X.serializeToString(d.successTemplate):c},errorTemplate:{type:"amp-mustache",payload:d?a.X.serializeToString(d.errorTemplate):null}}),f=t({originalRequest:Pa(b.xhrUrl,b.fetchOpt),ampComponent:g}),h=e&&Object.keys(e);h&&Object.keys(e).forEach(function(a){f[a]=e[a]});return f}
J.prototype.verifySsrResponse=function(a,b,c){b=Qa(b,c.fetchOpt.responseType);var d=c.fetchOpt;if(c=b.headers.get("AMP-Access-Control-Allow-Source-Origin")){a=a.location.href;"string"==typeof a&&(a=w(a));b=a;"string"==typeof b&&(b=w(b));if(ha.cdnProxyRegex.test(b.origin)){b=a.pathname.split("/");d=b[1];p().assert(ia[d],"Unknown path prefix in url %s",a.href);var d=b[2],e="s"==d?"https://"+decodeURIComponent(b[3]):"http://"+decodeURIComponent(d);p().assert(0<e.indexOf("."),"Expected a . in origin %s",
e);b.splice(1,"s"==d?3:2);b=e+b.join("/");d=(d=a.search)&&"?"!=d?(d=d.replace(la,"").replace(na,"").replace(oa,"").replace(pa,"").replace(/^[?&]/,""))?"?"+d:"":"";a=b+d+(a.hash||"")}else a=a.href;a=w(a).origin;p().assert(c==a,"Returned AMP-Access-Control-Allow-Source-Origin is not equal to the current: "+c+(" vs "+a))}else d.requireAmpResponseSourceOrigin&&p().assert(!1,"Response must contain the AMP-Access-Control-Allow-Source-Origin header")};function Ua(a){var b=a.ownerDocument.defaultView;b.FormProxy||(b.FormProxy=Va(b));var c=b.FormProxy,d=new c(a);"action"in d||Wa(a,d);a.$p=d}
function Va(a){function b(a){this.h=a}var c=b.prototype,d=a.Object,e=d.prototype,g=[a.HTMLFormElement,a.EventTarget],f=g.reduce(function(a,b){for(b=b&&b.prototype;b&&b!==e&&!(0<=a.indexOf(b));)a.push(b),b=d.getPrototypeOf(b);return a},[]);f.forEach(function(b){var d={},f;for(f in b)if(d.property=a.Object.getOwnPropertyDescriptor(b,f),d.property&&f.toUpperCase()!=f&&!ga(f,"on")&&!e.hasOwnProperty.call(c,f)){if("function"==typeof d.property.value)d.method=d.property.value,c[f]=function(a){return function(){return a.method.apply(this.h,
arguments)}}(d);else{var g={};d.property.get&&(g.get=function(a){return function(){return a.property.get.call(this.h)}}(d));d.property.set&&(g.set=function(a){return function(b){return a.property.set.call(this.h,b)}}(d));a.Object.defineProperty(c,f,g)}d={method:d.method,property:d.property}}});return b}
function Wa(a,b){var c=a.ownerDocument.defaultView.HTMLFormElement.prototype.cloneNode.call(a,!1),d={},e;for(e in c)if(d.name=e,!(d.name in b||d.name.toUpperCase()==d.name||ga(d.name,"on"))){d.desc=Xa[d.name];var g=a[d.name];if(d.desc)if(d.desc.access==K){d.actual=void 0;if(g&&g.nodeType){var f=c=g,h=f.nextSibling,f=f.parentNode;f.removeChild(c);try{d.actual=a[d.name]}finally{f.insertBefore(c,h)}}else d.actual=g;Object.defineProperty(b,d.name,{get:function(a){return function(){return a.actual}}(d)})}else d.desc.access==
L&&(d.attr=d.desc.attr||d.name,Object.defineProperty(b,d.name,{get:function(c){return function(){var d=b.getAttribute(c.attr);return null==d&&void 0!==c.desc.def?c.desc.def:c.desc.type==Ya?"true"===d:c.desc.type==M?null!=d:c.desc.type==Za?(d=d||"",x(a,"url").parse(d).href):d}}(d),set:function(a){return function(c){a.desc.type==M&&(c=c?"":null);null!=c?b.setAttribute(a.attr,c):b.removeAttribute(a.attr)}}(d)}));else Object.defineProperty(b,d.name,{get:function(b){return function(){return a[b.name]}}(d),
set:function(b){return function(c){a[b.name]=c}}(d)});d={actual:d.actual,attr:d.attr,desc:d.desc,name:d.name}}}
var L=1,K=2,Za=1,Ya=2,M=3,Xa={acceptCharset:{access:L,attr:"accept-charset"},accessKey:{access:L,attr:"accesskey"},action:{access:L,type:Za},attributes:{access:K},autocomplete:{access:L,def:"on"},children:{access:K},dataset:{access:K},dir:{access:L},draggable:{access:L,type:Ya,def:!1},elements:{access:K},encoding:{access:K},enctype:{access:L},hidden:{access:L,type:M,def:!1},id:{access:L,def:""},lang:{access:L},localName:{access:K},method:{access:L,def:"get"},name:{access:L},noValidate:{access:L,attr:"novalidate",
type:M,def:!1},prefix:{access:K},spellcheck:{access:L},style:{access:K},target:{access:L,def:""},title:{access:L},translate:{access:L}};function $a(a,b){return a.hasAttribute("verify-xhr")?new ab(a,b):new bb(a)}function N(a){this.h=a}N.prototype.onCommit=function(){cb(this);return db(this)?this.ba():Promise.resolve({updatedElements:[],errors:[]})};N.prototype.ba=function(){return Promise.resolve({updatedElements:[],errors:[]})};
function db(a){a=a.h.elements;for(var b=0;b<a.length;b++){var c=a[b];if(!c.disabled)switch(c.type){case "select-multiple":case "select-one":for(var c=c.options,d=0;d<c.length;d++)if(c[d].selected!==c[d].defaultSelected)return!0;break;case "checkbox":case "radio":if(c.checked!==c.defaultChecked)return!0;break;default:if(c.value!==c.defaultValue)return!0}}return!1}function cb(a){(a=a.h.elements)&&E(a,function(a){a.setCustomValidity("")})}function bb(a){N.apply(this,arguments)}m(bb,N);
function ab(a,b){this.h=a;this.K=b;this.H=null;this.Y=[]}m(ab,N);ab.prototype.ba=function(){var a=this,b=this.K().then(function(){return[]},function(a){return eb(a)});return fb(this,b).then(function(b){return gb(a,b)})};function fb(a,b){if(!a.H){a.H=new sa;var c=function(){return a.H=null};a.H.then(c,c)}return a.H.add(b)}
function gb(a,b){function c(a){return b.every(function(b){return a.name!==b.name})}var d=[],e=a.Y;a.Y=b;for(var g=0;g<b.length;g++){var f=b[g],h=p().assertString(f.name,"Verification errors must have a name property"),f=p().assertString(f.message,"Verification errors must have a message property"),h=p().assertElement(a.h.querySelector('[name="'+h+'"]'),"Verification error name property must match a field name");h.checkValidity()&&(h.setCustomValidity(f),d.push(h))}var l=e.filter(c).map(function(b){return a.h.querySelector('[name="'+
b.name+'"]')});return{updatedElements:d.concat(l),errors:b}}function eb(a){return(a=a.response)?a.json().then(function(a){return a.verifyErrors||[]},function(){return[]}):Promise.resolve([])};function O(a,b){this.V=b;this.pa=z(a,"viewport");this.ca=A(a.win,"vsync");this.T=null;this.S="";this.N=!1;this.A=a.win.document.createElement("div");Ga(this.A,!1);this.A.classList.add("i-amphtml-validation-bubble");this.A.__BUBBLE_OBJ=this;a.getBody().appendChild(this.A)}O.prototype.isActiveOn=function(a){return this.N&&a==this.T};O.prototype.hide=function(){this.N&&(this.N=!1,this.T=null,this.S="",this.ca.run({measure:void 0,mutate:hb},{bubbleElement:this.A}))};
O.prototype.show=function(a,b){if(!this.isActiveOn(a)||b!=this.S){this.N=!0;this.T=a;this.S=b;var c={message:b,targetElement:a,bubbleElement:this.A,viewport:this.pa,id:this.V};this.ca.run({measure:ib,mutate:jb},c)}};function hb(a){a.bubbleElement.removeAttribute("aria-alert");a.bubbleElement.removeAttribute("role");for(var b=a.bubbleElement;b.firstChild;)b.removeChild(b.firstChild);Ga(a.bubbleElement,!1)}function ib(a){a.targetRect=a.viewport.getLayoutRect(a.targetElement)}
function jb(a){for(var b=a.bubbleElement;b.firstChild;)b.removeChild(b.firstChild);var c=a.bubbleElement.ownerDocument.createElement("div");c.id="bubble-message-"+a.id;c.textContent=a.message;a.bubbleElement.setAttribute("aria-labeledby",c.id);a.bubbleElement.setAttribute("role","alert");a.bubbleElement.setAttribute("aria-live","assertive");a.bubbleElement.appendChild(c);Ga(a.bubbleElement,!0);b=a.bubbleElement;a={top:a.targetRect.top-10+"px",left:a.targetRect.left+a.targetRect.width/2+"px"};for(var d in a)Fa(b,
d,a[d])};var kb,lb,mb=0;function P(a){this.form=a;this.ampdoc=B(a);this.resources=z(a,"resources");this.root=this.ampdoc.getRootNode();this.M=null}k=P.prototype;k.report=function(){};k.onBlur=function(){};k.onInput=function(){};k.inputs=function(){return this.form.querySelectorAll("input,select,textarea")};k.fireValidityEventIfNecessary=function(){var a=this.M;this.M=this.form.checkValidity();if(a!==this.M){var b=Ba(this.form.ownerDocument.defaultView,this.M?"valid":"invalid",null,{bubbles:!0});this.form.dispatchEvent(b)}};
function nb(a){P.apply(this,arguments)}m(nb,P);nb.prototype.report=function(){this.form.reportValidity();this.fireValidityEventIfNecessary()};function Q(a){P.call(this,a);var b="i-amphtml-validation-bubble-"+mb++;this.F=new O(this.ampdoc,b)}m(Q,P);Q.prototype.report=function(){for(var a=this.inputs(),b=0;b<a.length;b++)if(!a[b].checkValidity()){a[b].focus();this.F.show(a[b],a[b].validationMessage);break}this.fireValidityEventIfNecessary()};Q.prototype.onBlur=function(){this.F.hide()};
Q.prototype.onInput=function(a){a=a.target;this.F.isActiveOn(a)&&(a.checkValidity()?(a.removeAttribute("aria-invalid"),this.F.hide()):(a.setAttribute("aria-invalid","true"),this.F.show(a,a.validationMessage)))};function R(a){P.call(this,a)}m(R,P);k=R.prototype;k.reportInput=function(a){var b;a:{for(b in a.validity)if(a.validity[b])break a;b=null}var c=b;c&&this.showValidationFor(a,c)};k.hideAllValidations=function(){for(var a=this.inputs(),b=0;b<a.length;b++)this.hideValidationFor(a[b])};
k.getValidationFor=function(a,b){if(!a.id)return null;var c="__AMP_VALIDATION_"+b;c in a||(a[c]=this.root.querySelector("[visible-when-invalid="+b+"]"+("[validation-for="+a.id+"]")));return a[c]};k.showValidationFor=function(a,b){var c=this.getValidationFor(a,b);c&&(c.textContent.trim()||(c.textContent=a.validationMessage),a.__AMP_VISIBLE_VALIDATION=c,this.resources.mutateElement(a,function(){return a.setAttribute("aria-invalid","true")}),this.resources.mutateElement(c,function(){return c.classList.add("visible")}))};
k.hideValidationFor=function(a){var b=this.getVisibleValidationFor(a);b&&(delete a.__AMP_VISIBLE_VALIDATION,this.resources.mutateElement(a,function(){return a.removeAttribute("aria-invalid")}),this.resources.mutateElement(b,function(){return b.classList.remove("visible")}))};k.getVisibleValidationFor=function(a){return a.__AMP_VISIBLE_VALIDATION};k.shouldValidateOnInteraction=function(){throw Error("Not Implemented");};
k.onInteraction=function(a){a=a.target;var b=!!a.checkValidity&&this.shouldValidateOnInteraction(a);this.hideValidationFor(a);b&&!a.checkValidity()&&this.reportInput(a)};k.onBlur=function(a){this.onInteraction(a)};k.onInput=function(a){this.onInteraction(a)};function S(a){R.apply(this,arguments)}m(S,R);S.prototype.report=function(){this.hideAllValidations();for(var a=this.inputs(),b=0;b<a.length;b++)if(!a[b].checkValidity()){this.reportInput(a[b]);a[b].focus();break}this.fireValidityEventIfNecessary()};
S.prototype.shouldValidateOnInteraction=function(a){return!!this.getVisibleValidationFor(a)};function T(a){R.apply(this,arguments)}m(T,R);T.prototype.report=function(){this.hideAllValidations();for(var a=null,b=this.inputs(),c=0;c<b.length;c++)b[c].checkValidity()||(a=a||b[c],this.reportInput(b[c]));a&&a.focus();this.fireValidityEventIfNecessary()};T.prototype.shouldValidateOnInteraction=function(a){return!!this.getVisibleValidationFor(a)};function U(a){R.apply(this,arguments)}m(U,R);
U.prototype.shouldValidateOnInteraction=function(){return!0};U.prototype.onInteraction=function(a){R.prototype.onInteraction.call(this,a);this.fireValidityEventIfNecessary()};function V(a){T.apply(this,arguments)}m(V,T);V.prototype.shouldValidateOnInteraction=function(){return!0};V.prototype.onInteraction=function(a){T.prototype.onInteraction.call(this,a);this.fireValidityEventIfNecessary()};
function ob(a){var b=a.getAttribute("custom-validation-reporting");switch(b){case "as-you-go":return new U(a);case "show-all-on-submit":return new T(a);case "interact-and-submit":return new V(a);case "show-first-on-submit":return new S(a)}a.ownerDocument&&void 0===kb&&(kb=!!document.createElement("form").reportValidity);return kb?new nb(a):new Q(a)};var pb=["amp-selector"];
function qb(a,b){var c=this;try{Ua(a)}catch(g){da().error("amp-form","form proxy failed to install",g)}a.__AMP_FORM=this;this.V=b;this.j=a.ownerDocument.defaultView;this.na=A(this.j,"timer");this.aa=x(a,"url-replace");this.U=null;this.h=a;this.l=A(this.j,"templates");this.m=A(this.j,"xhr");this.I=x(this.h,"action");this.ja=z(this.h,"resources");this.C=z(this.h,"viewer");this.D=new J("amp-form",this.C,this.l);this.o=(this.h.getAttribute("method")||"GET").toUpperCase();this.ma=this.h.getAttribute("target");
this.G=rb(this,"action-xhr");this.sa=rb(this,"verify-xhr");this.$=!this.h.hasAttribute("novalidate");this.h.setAttribute("novalidate","");this.$||this.h.setAttribute("amp-novalidate","");this.h.classList.add("i-amphtml-form");var d=this.h.querySelectorAll('[type="submit"]');this.la=ba(d);this.w="initial";a=this.h.elements;for(b=0;b<a.length;b++){var e=a[b].name;p().assert("__amp_source_origin"!=e&&"__amp_form_verify"!=e,"Illegal input name, %s found: %s",e,a[b])}this.O=ob(this.h);this.oa=$a(this.h,
function(){return sb(c)});this.I.installActionHandler(this.h,this.da.bind(this),100);tb(this);this.ha=this.ra=null}function rb(a,b){var c=a.h.getAttribute(b);if(c){var d=x(a.h,"url");d.assertHttpsUrl(c,a.h,b);p().assert(!d.isProxyOrigin(c),"form "+b+" should not be on AMP CDN: %s",a.h)}return c}k=qb.prototype;
k.requestForFormFetch=function(a,b,c){var d,e,g="GET"==b||"HEAD"==b;if(g){ub(this);var f=G(this.h);c&&fa(f,c);var h,l=[];for(h in f){var r=f[h];if(null!=r)if(Array.isArray(r))for(var ma=0;ma<r.length;ma++)l.push(encodeURIComponent(h)+"="+encodeURIComponent(r[ma]));else l.push(encodeURIComponent(h)+"="+encodeURIComponent(r))}h=l.join("&");h?(a=a.split("#",2),f=a[0].split("?",2),h=f[0]+(f[1]?"?"+f[1]+"&"+h:"?"+h),d=h+=a[1]?"#"+a[1]:""):d=a}else for(f in d=a,e=new H(this.h),c)e.append(f,c[f]);return{xhrUrl:d,
fetchOpt:t({body:e,method:b,credentials:"include",headers:t({Accept:"application/json"})})}};k.da=function(a){var b=this;"submit"==a.method?vb(this).then(function(){var c=a;"submitting"!=b.w&&wb(b)&&(xb(b,c.trust),"GET"!=b.o||b.G||b.h.submit())}):"clear"===a.method&&yb(this);return null};function vb(a){if(a.U)return a.U;var b=a.h.querySelectorAll(pb.join(",")),c=ba(b).map(function(a){return a.whenBuilt()});return a.U=zb(a,c,2E3)}
function tb(a){a.C.whenNextVisible().then(function(){var b=a.h.querySelector("[autofocus]");if(b)try{b.focus()}catch(c){}});a.h.addEventListener("submit",a.fa.bind(a),!0);a.h.addEventListener("blur",function(b){Ab(b.target);a.O.onBlur(b)},!0);a.D.isSupported()||a.h.addEventListener("change",function(b){a.oa.onCommit().then(function(c){var d=c.updatedElements,e=c.errors;d.forEach(Ab);a.O.onBlur(b);"verifying"===a.w&&(e.length?(W(a,"verify-error"),X(a,{verifyErrors:e}).then(function(){Y(a,"verify-error",
e)})):W(a,"initial"))})});a.h.addEventListener("input",function(b){Ab(b.target);a.O.onInput(b)})}function Bb(a,b){Cb(a,"Form analytics not supported");var c={},d=G(a.h),e;for(e in d)Object.prototype.hasOwnProperty.call(d,e)&&(c["formFields["+e+"]"]=d[e].join(","));c.formId=a.h.id;Ma(a.h,b,c)}
function yb(a){a.h.reset();W(a,"initial");a.h.classList.remove("user-valid");a.h.classList.remove("user-invalid");var b=a.h.querySelectorAll(".user-valid, .user-invalid");E(b,function(a){a.classList.remove("user-valid");a.classList.remove("user-invalid")});var c=a.h.querySelectorAll(".visible[validation-for]");E(c,function(a){a.classList.remove("visible")});Db(a.h)}
k.fa=function(a){"submitting"!=this.w&&wb(this)?((this.G||"POST"==this.o)&&a.preventDefault(),xb(this,100)):(a.stopImmediatePropagation(),a.preventDefault())};function xb(a,b){var c=Eb(a);if(a.G)Fb(a,c,b);else if("POST"==a.o)p().assert(!1,"Only XHR based (via action-xhr attribute) submissions are supported for POST requests. %s",a.h);else if("GET"==a.o){var d=c;Cb(a,"Non-XHR GETs not supported.");ub(a);for(var e=0;e<d.length;e++)a.aa.expandInputValueSync(d[e]);Bb(a,"amp-form-submit")}}
function Eb(a){return a.h.querySelectorAll('[type="hidden"][data-amp-replace]')}function sb(a){if("submitting"===a.w)return Promise.resolve();W(a,"verifying");Y(a,"verify",null);return Gb(a,Eb(a)).then(function(){var b={};return a.K(a.sa,a.o,(b.__amp_form_verify=!0,b))})}function Fb(a,b,c){W(a,"submitting");var d=Gb(a,b);a.D.isSupported()?d.then(function(){return Hb(a,c)}):d.then(function(){Ib(a,c);return a.K(a.G,a.o)}).then(function(b){return Jb(a,b)},function(b){return Kb(a,b)})}
function Hb(a,b){var c,d=G(a.h);return X(a,d).then(function(){a.I.trigger(a.h,"submit",null,b)}).then(function(){c=a.requestForFormFetch(a.G,a.o);var b=c.fetchOpt||{},d;d=b.method;void 0===d?d="GET":(d=d.toUpperCase(),Oa.includes(d));b.method=d;b.headers=b.headers||t({});var f=a.j;d=c.xhrUrl;b=c.fetchOpt;!1===b.ampCors&&(b.requireAmpResponseSourceOrigin=!1);!0===b.requireAmpResponseSourceOrigin&&da().error("XHR","requireAmpResponseSourceOrigin is deprecated, use ampCors instead");void 0===b.requireAmpResponseSourceOrigin&&
(b.requireAmpResponseSourceOrigin=!0);f=f.origin||w(f.location.href).origin;d=w(d).origin;f==d&&(b.headers=b.headers||{},b.headers["AMP-Same-Origin"]="true");return a.D.fetchAndRenderTemplate(a.h,c,Lb(a))}).then(function(b){return Mb(a,b,c)},function(b){return Nb(a,b)})}function Lb(a){var b=a.h.querySelector("div[submit-success]"),c=a.h.querySelector("div[submit-error]"),d,e;b&&(d=a.l.maybeFindTemplate(b));c&&(e=a.l.maybeFindTemplate(c));return{successTemplate:d,errorTemplate:e}}
function Nb(a,b){W(a,"submit-error");p().error("amp-form","Form submission failed: "+b);return ra(function(){X(a,b||{}).then(function(){Y(a,"submit-error",b)})})}function Ib(a,b){Bb(a,"amp-form-submit");var c=G(a.h);X(a,c).then(function(){a.I.trigger(a.h,"submit",null,b)})}function Gb(a,b){for(var c=[],d=0;d<b.length;d++)c.push(a.aa.expandInputValueAsync(b[d]));return zb(a,c,100)}
k.K=function(a,b,c){Cb(this,"XHRs should be proxied.");a=this.requestForFormFetch(a,b,c);return this.m.fetch(a.xhrUrl,a.fetchOpt)};function Mb(a,b,c){a.D.verifySsrResponse(a.j,b,c);return Ob(a,ra(function(){return b.html}))}function Jb(a,b){return Ob(a,b.json()).then(function(){Bb(a,"amp-form-submit-success");Pb(a,b)})}
function Ob(a,b){return b.then(function(b){W(a,"submit-success");X(a,b||{}).then(function(){Y(a,"submit-success",b)})},function(a){p().error("amp-form","Failed to parse response JSON: "+a)})}function Kb(a,b){return(b&&b.response?b.response.json().catch(function(){return null}):Promise.resolve(null)).then(function(c){Bb(a,"amp-form-submit-error");W(a,"submit-error");X(a,c||{}).then(function(){Y(a,"submit-error",c)});Pb(a,b.response);p().error("amp-form","Form submission failed: "+b)})}
function Cb(a,b){var c=a.D.isSupported();p().assert(!1===c,"[amp-form]: viewerRenderTemplate | "+b)}function ub(a){var b=a.h.querySelectorAll("input[type=password],input[type=file]");p().assert(0==b.length,"input[type=password] or input[type=file] may only appear in form[method=post]")}function wb(a){void 0===lb&&(lb=!!a.j.document.createElement("input").checkValidity);if(lb){var b=Qb(a.h);if(a.$)return a.O.report(),b}return!0}
function Pb(a,b){Cb(a,"Redirects not supported.");if(b&&b.headers){var c=b.headers.get("AMP-Redirect-To");if(c){p().assert("_blank"!=a.ma,"Redirecting to target=_blank using AMP-Redirect-To is currently not supported, use target=_top instead. %s",a.h);try{var d=x(a.h,"url");d.assertAbsoluteHttpOrHttpsUrl(c);d.assertHttpsUrl(c,"AMP-Redirect-To","Url")}catch(e){p().assert(!1,"The `AMP-Redirect-To` header value must be an absolute URL starting with https://. Found %s",c)}b=B(a.h);b=C(b);y(b,"navigation").navigateTo(a.j,
c,"AMP-Redirect-To")}}}function Y(a,b,c){c=Ba(a.j,"amp-form."+b,t({response:c}));a.I.trigger(a.h,b,c,100)}function zb(a,b,c){return Promise.race([Promise.all(b),a.na.promise(c)])}function W(a,b){var c=a.w;a.h.classList.remove("amp-form-"+c);a.h.classList.add("amp-form-"+b);Rb(a,c);a.w=b;a.la.forEach(function(a){"submitting"==b?a.setAttribute("disabled",""):a.removeAttribute("disabled")})}
function X(a,b){var c=a.h.querySelector("["+a.w+"]"),d=Promise.resolve();if(c){var e="rendered-message-"+a.V;c.setAttribute("role","alert");c.setAttribute("aria-labeledby",e);c.setAttribute("aria-live","assertive");a.l.hasTemplate(c)?d=a.l.findAndRenderTemplate(c,b).then(function(b){b.id=e;b.setAttribute("i-amphtml-rendered","");c.appendChild(b);var d=Ba(a.j,"amp:dom-update",null,{bubbles:!0});c.dispatchEvent(d)}):a.ja.mutateElement(c,function(){})}return d}
function Rb(a,b){if(a=a.h.querySelector("["+b+"]")){var c;if(null==D){b=a.ownerDocument;try{c=b.createElement("div");var d=b.createElement("div");c.appendChild(d);D=c.querySelector(":scope div")===d}catch(g){D=!1}}D?c=a.querySelector(":scope > [i-amphtml-rendered]"):(a.classList.add("i-amphtml-scoped"),c=a.querySelector(".i-amphtml-scoped > [i-amphtml-rendered]"),a.classList.remove("i-amphtml-scoped"));var e=c;e&&(c=e,c.parentElement&&c.parentElement.removeChild(c))}}k.ta=function(){return this.ha};
k.ua=function(){return this.ra};function Qb(a){E(a.querySelectorAll("input,select,textarea,fieldset"),function(a){return Z(a)});return Z(a)}function Db(a){var b=document.createElement("input"),c={},d;for(d in b.validity){c.validityState=d;var e=a.querySelectorAll("."+String(c.validityState).replace(wa,xa));E(e,function(a){return function(b){return b.classList.remove(a.validityState)}}(c));c={validityState:c.validityState}}}
function Z(a,b){b=void 0===b?!1:b;if(!a.checkValidity)return!0;var c=!1,d=a.classList.contains("user-valid")?"valid":a.classList.contains("user-invalid")?"invalid":"none",e=a.checkValidity();"valid"!=d&&e?(a.classList.add("user-valid"),a.classList.remove("user-invalid"),c="invalid"==d):"invalid"==d||e||(a.classList.add("user-invalid"),a.classList.remove("user-valid"),c=!0);if(a.validity)for(var g in a.validity)a.classList.toggle(g,a.validity[g]);if(b&&c){g=za(a);for(var f=0;f<g.length;f++)Z(g[f]);
a.form&&Z(a.form)}return e}function Ab(a){Z(a,!0)}function Sb(a){this.qa=Tb(a).then(function(){return Ub(a)})}Sb.prototype.whenInitialized=function(){return this.qa};function Tb(a){var b=new qa;Ha(a,b.resolve);return b.promise}function Ub(a){return a.whenReady().then(function(){Vb(a.getRootNode().querySelectorAll("form"));Wb(a.getRootNode())})}function Vb(a){a&&E(a,function(a,c){var b=a.__AMP_FORM||null;b||new qb(a,"amp-form-"+c)})}
function Wb(a){a.addEventListener("amp:dom-update",function(){Vb(a.querySelectorAll("form"))})}(function(a){a.registerServiceForDoc("amp-form",Sb)})(self.AMP);
})});
//# sourceMappingURL=amp-form-0.1.js.map
