var h=h,qe=e=>console.log(e),Ye=e=>console.error(e);function Ke(){}self.assert||(self.assert=(e,r)=>{if(!e)throw r});String.prototype.startsWith||(String.prototype.startsWith=function(e,r){return r===void 0&&(r=0),this.substring(r,e.length)===e});String.prototype.includes||(String.prototype.includes=function(e,r){return this.indexOf(e,r)!==-1});if(!ArrayBuffer.isView){const e=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];ArrayBuffer.isView=r=>r&&r.constructor&&e.indexOf(r.constructor)!==-1}Uint8Array.prototype.slice||(Uint8Array.prototype.slice=function(e,r){return new Uint8Array(this.subarray(e,r))});Date.now||(Date.now=()=>new Date().getTime());"performance"in self||(self.performance={now:()=>Date.now()});if(typeof console>"u"){const e=(r,t)=>{postMessage({target:"console",command:r,content:JSON.stringify(Array.prototype.slice.call(t))})};console={log:function(){e("log",arguments)},debug:function(){e("debug",arguments)},info:function(){e("info",arguments)},warn:function(){e("warn",arguments)},error:function(){e("error",arguments)}},console.log("Detected lack of console, overridden console")}const Se=(e,r)=>{const t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType=r?"arraybuffer":"text",t.send(null),t.response},Sr=(e,r,t)=>{const n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{if((n.status===200||n.status===0)&&n.response)return r(n.response);t()},n.onerror=t,n.send(null)};h={wasm:WebAssembly&&!WebAssembly.instantiateStreaming&&Se("jassub-worker.wasm",!0)};Ke=()=>postMessage({target:"ready"});qe=e=>{e==="JASSUB: No usable fontconfig configuration file found, using fallback."?console.debug(e):console.log(e)};Ye=e=>{e==="Fontconfig error: Cannot load default config file: No such file: (null)"?console.debug(e):console.error(e)};let J=0;const Fr=1;let E=null,He=!1,Fe=Date.now(),ie=24,Qe=!1,Ze="js",oe={};const Ve={};let Ar=0,Ne;self.width=0;self.height=0;let M=!1;self.addFont=({font:e})=>Ae(e);const Te=e=>{e=e.trim().toLowerCase(),e.startsWith("@")&&(e=e.substring(1)),!Ve[e]&&(Ve[e]=!0,oe[e]?Ae(oe[e]):Qe&&postMessage({target:"getLocalFont",font:e}))},Ae=e=>{ArrayBuffer.isView(e)?xe(e):Sr(e,r=>{xe(new Uint8Array(r))},console.error)},xe=e=>{const r=ve(e.byteLength);w.set(e,r),p.addFont("font-"+Ar++,r,e.byteLength),p.reloadFonts()},er=e=>{if(!oe)return;const r=Or(e);for(let i=0;i<r.length;i++)for(let s=0;s<r[i].body.length;s++)r[i].body[s].key==="Style"&&Te(r[i].body[s].value.Fontname);const t=/\\fn([^\\}]*?)[\\}]/g;let n;for(;(n=t.exec(e))!==null;)Te(n[1])};self.setTrack=({content:e})=>{er(e),p.createTrackMem(e),Oe=tr[p.trackColorSpace]};self.freeTrack=()=>{p.removeTrack()};self.setTrackByUrl=({url:e})=>{self.setTrack({content:Se(e)})};const kr=()=>{const e=(Date.now()-Fe)/1e3;return ae?J:(e>5&&(console.error("Didn't received currentTime > 5 seconds. Assuming video was paused."),rr(!0)),J+e*Fr)},Er=e=>{J=e,Fe=Date.now(),E||(He?E=Ee(se):(se(),setTimeout(()=>{He=!1},20)))};let ae=!0;const rr=e=>{e!==ae&&(ae=e,e?E&&(clearTimeout(E),E=null):(Fe=Date.now(),E=Ee(se)))},H="BT.601",ze="BT.709",Ge="SMPTE240M",tr=[H,H,H,H,H,ze,ze,Ge,Ge,"FCC","FCC"],ke=(e,r)=>{const t=performance.now(),n=Ze==="wasm"?p.renderBlend(e,r||0):p.renderImage(e,r||0),i={renderTime:performance.now()-t-p.time,decodeTime:p.time};if(p.changed!==0||r){const s=[];let o=[];const f=performance.now();if(!n)return _e({images:s,buffers:o,times:i,decodeStartTime:f});if(M){const a=[];for(let l=n,u=0;u<p.count;l=l.next,++u)s.push({w:l.w,h:l.h,x:l.x,y:l.y}),a.push(createImageBitmap(new ImageData(Ue.slice(l.image,l.image+l.w*l.h*4),l.w,l.h)));Promise.all(a).then(l=>{for(let u=0;u<s.length;u++)s[u].image=l[u];o=l,_e({images:s,buffers:o,times:i,decodeStartTime:f})})}else{for(let a=n,l=0;l<p.count;a=a.next,++l){const u={w:a.w,h:a.h,x:a.x,y:a.y,image:a.image};if(!j){const c=K.slice(a.image,a.image+a.w*a.h*4);o.push(c),u.image=c}s.push(u)}_e({images:s,buffers:o,times:i,decodeStartTime:f})}}else postMessage({target:"unbusy"})};self.demand=({time:e})=>{J=e,ke(e)};const se=e=>{E=0,ke(kr(),e),ae||(E=Ee(se))},_e=({times:e,images:r,decodeStartTime:t,buffers:n})=>{e.decodeTime=performance.now()-t;const i={target:"render",async:M,images:r,times:e,width:self.width,height:self.height,colorSpace:Oe};if(j){const s=performance.now();(D.height!==self.height||D.width!==self.width)&&(D.width=self.width,D.height=self.height),j.clearRect(0,0,self.width,self.height);for(const o of r)o.image&&(M?(j.drawImage(o.image,o.x,o.y),o.image.close()):(V.width=o.w,V.height=o.h,nr.putImageData(new ImageData(Ue.subarray(o.image,o.image+o.w*o.h*4),o.w,o.h),0,0),j.drawImage(V,o.x,o.y)));if(Ne){e.drawTime=performance.now()-s;let o=0;for(const f in e)o+=e[f];console.log("Bitmaps: "+r.length+" Total: "+Math.round(o)+"ms",e)}try{const o=D.transferToImageBitmap();i.images=[{image:o,x:0,y:0}],i.async=!0,postMessage(i,[o])}catch{postMessage({target:"unbusy"})}}else postMessage(i,n)},Or=e=>{let r,t,n,i,s,o,f,a,l,u;const c=[],d=e.split(/[\r\n]+/g);for(a=0;a<d.length;a++)if(r=d[a].match(/^\[(.*)\]$/),r)t=null,c.push({name:r[1],body:[]});else{if(/^\s*$/.test(d[a])||c.length===0)continue;if(u=c[c.length-1].body,d[a][0]===";")u.push({type:"comment",value:d[a].substring(1)});else{if(i=d[a].split(":"),s=i[0],o=i.slice(1).join(":").trim(),(t||s==="Format")&&(o=o.split(","),t&&o.length>t.length&&(n=o.slice(t.length-1).join(","),o=o.slice(0,t.length-1),o.push(n)),o=o.map(v=>v.trim()),t)){for(f={},l=0;l<o.length;l++)f[t[l]]=o[l];o=f}s==="Format"&&(t=o),u.push({key:s,value:o})}}return c},Ee=(()=>{let e=0;return r=>{const t=Date.now();if(e===0)e=t+1e3/ie;else for(;t+2>=e;)e+=1e3/ie;const n=Math.max(e-t,0);return setTimeout(r,n)}})(),de=(e,r)=>{for(const t of Object.keys(e))r[t]=e[t]};let D,j,V,nr,p,Oe;self.init=e=>{self.width=e.width,self.height=e.height,Ze=e.blendMode,M=e.asyncRender,M&&typeof createImageBitmap>"u"&&(M=!1,console.error("'createImageBitmap' needed for 'asyncRender' unsupported!")),oe=e.availableFonts,Ne=e.debug,ie=e.targetFps||ie,Qe=e.useLocalFonts;const r=e.fallbackFont.toLowerCase();p=new h.JASSUB(self.width,self.height,r||null),r&&Te(r);let t=e.subContent;t||(t=Se(e.subUrl)),er(t);for(const n of e.fonts||[])Ae(n);p.createTrackMem(t),Oe=tr[p.trackColorSpace],p.setDropAnimations(e.dropAllAnimations||0),(e.libassMemoryLimit>0||e.libassGlyphLimit>0)&&p.setMemoryLimits(e.libassGlyphLimit||0,e.libassMemoryLimit||0),e.offscreenRender&&(D=new OffscreenCanvas(self.height,self.width),j=D.getContext("2d",{desynchronized:!0}),M||(V=new OffscreenCanvas(self.height,self.width),nr=V.getContext("2d",{desynchronized:!0})))};self.canvas=({width:e,height:r,force:t})=>{if(e==null)throw new Error("Invalid canvas size specified");self.width=e,self.height=r,p.resizeCanvas(e,r),t&&ke(J)};self.video=({currentTime:e,isPaused:r,rate:t})=>{e!=null&&Er(e),r!=null&&rr(r),t=t||t};self.destroy=()=>{p.quitLibrary()};self.createEvent=({event:e})=>{de(e,p.getEvent(p.allocEvent()))};self.getEvents=()=>{const e=[];for(let r=0;r<p.getEventCount();r++){const{Start:t,Duration:n,ReadOrder:i,Layer:s,Style:o,MarginL:f,MarginR:a,MarginV:l,Name:u,Text:c,Effect:d}=p.getEvent(r);e.push({Start:t,Duration:n,ReadOrder:i,Layer:s,Style:o,MarginL:f,MarginR:a,MarginV:l,Name:u,Text:c,Effect:d})}postMessage({target:"getEvents",events:e})};self.setEvent=({event:e,index:r})=>{de(e,p.getEvent(r))};self.removeEvent=({index:e})=>{p.removeEvent(e)};self.createStyle=({style:e})=>{de(e,p.getStyle(p.allocStyle()))};self.getStyles=()=>{const e=[];for(let r=0;r<p.getStyleCount();r++){const{Name:t,FontName:n,FontSize:i,PrimaryColour:s,SecondaryColour:o,OutlineColour:f,BackColour:a,Bold:l,Italic:u,Underline:c,StrikeOut:d,ScaleX:v,ScaleY:y,Spacing:m,Angle:b,BorderStyle:C,Outline:U,Shadow:P,Alignment:be,MarginL:Z,MarginR:N,MarginV:ee,Encoding:Cr,treat_fontname_as_pattern:Tr,Blur:Pr,Justify:$r}=p.getStyle(r);e.push({Name:t,FontName:n,FontSize:i,PrimaryColour:s,SecondaryColour:o,OutlineColour:f,BackColour:a,Bold:l,Italic:u,Underline:c,StrikeOut:d,ScaleX:v,ScaleY:y,Spacing:m,Angle:b,BorderStyle:C,Outline:U,Shadow:P,Alignment:be,MarginL:Z,MarginR:N,MarginV:ee,Encoding:Cr,treat_fontname_as_pattern:Tr,Blur:Pr,Justify:$r})}postMessage({target:"getStyles",time:Date.now(),styles:e})};self.setStyle=({style:e,index:r})=>{de(e,p.getStyle(r))};self.removeStyle=({index:e})=>{p.removeStyle(e)};onmessage=({data:e})=>{if(self[e.target])self[e.target](e);else throw new Error("Unknown event target "+e.target)};let Ue=null;le=(e=>r=>{e(r),Ue=new Uint8ClampedArray(K)})(le);function ir(e){throw e}var or=new TextDecoder("utf8");function Ur(e,r,t){for(var n=r+t,i=r;e[i]&&!(i>=n);)++i;return or.decode(e.buffer?e.subarray(r,i):new Uint8Array(e.slice(r,i)))}function ne(e,r){if(!e)return"";for(var t=e+r,n=e;!(n>=t)&&w[n];)++n;return or.decode(w.subarray(e,n))}function Dr(e,r,t,n){if(!(n>0))return 0;for(var i=t,s=t+n-1,o=0;o<e.length;++o){var f=e.charCodeAt(o);if(f>=55296&&f<=57343){var a=e.charCodeAt(++o);f=65536+((f&1023)<<10)|a&1023}if(f<=127){if(t>=s)break;r[t++]=f}else if(f<=2047){if(t+1>=s)break;r[t++]=192|f>>6,r[t++]=128|f&63}else if(f<=65535){if(t+2>=s)break;r[t++]=224|f>>12,r[t++]=128|f>>6&63,r[t++]=128|f&63}else{if(t+3>=s)break;r[t++]=240|f>>18,r[t++]=128|f>>12&63,r[t++]=128|f>>6&63,r[t++]=128|f&63}}return r[t]=0,t-i}function Mr(e,r,t){return Dr(e,w,r,t)}function Wr(e){for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);n<=127?r++:n<=2047?r+=2:n>=55296&&n<=57343?(r+=4,++t):r+=3}return r}var De,X,W,w,ge,T,ar,sr,fe,K,fr;function le(e){K=e,De=new Int8Array(e),X=new Int16Array(e),W=new Int32Array(e),w=new Uint8Array(e),ge=new Uint16Array(e),T=new Uint32Array(e),ar=new Float32Array(e),sr=new Float64Array(e)}function Rr(e,r,t,n){ir("Assertion failed: "+ne(e)+", at: "+[r?ne(r):"unknown filename",t,n?ne(n):"unknown function"])}function jr(e,r,t){return 0}function Ir(e,r,t){}function Lr(e,r,t){return 0}function Br(e,r,t,n){}function Hr(e,r,t,n,i){}function Me(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+e)}}function Vr(){for(var e=new Array(256),r=0;r<256;++r)e[r]=String.fromCharCode(r);lr=e}var lr=void 0;function _(e){for(var r="",t=e;w[t];)r+=lr[w[t++]];return r}var I={},L={},ue={},xr=48,zr=57;function We(e){if(e===void 0)return"_unknown";e=e.replace(/[^a-zA-Z0-9_]/g,"$");var r=e.charCodeAt(0);return r>=xr&&r<=zr?"_"+e:e}function Re(e,r){return e=We(e),new Function("body","return function "+e+`() {
    "use strict";    return body.apply(this, arguments);
};
`)(r)}function je(e,r){var t=Re(r,function(n){this.name=r,this.message=n;var i=new Error(n).stack;i!==void 0&&(this.stack=this.toString()+`
`+i.replace(/^Error(:[^\n]*)?\n/,""))});return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},t}var B=void 0;function g(e){throw new B(e)}var ur=void 0;function ce(e){throw new ur(e)}function R(e,r,t){e.forEach(function(f){ue[f]=r});function n(f){var a=t(f);a.length!==e.length&&ce("Mismatched type converter count");for(var l=0;l<e.length;++l)A(e[l],a[l])}var i=new Array(r.length),s=[],o=0;r.forEach((f,a)=>{L.hasOwnProperty(f)?i[a]=L[f]:(s.push(f),I.hasOwnProperty(f)||(I[f]=[]),I[f].push(()=>{i[a]=L[f],++o,o===s.length&&n(i)}))}),s.length===0&&n(i)}function A(e,r,t={}){if(!("argPackAdvance"in r))throw new TypeError("registerType registeredInstance requires argPackAdvance");var n=r.name;if(e||g('type "'+n+'" must have a positive integer typeid pointer'),L.hasOwnProperty(e)){if(t.ignoreDuplicateRegistrations)return;g("Cannot register type '"+n+"' twice")}if(L[e]=r,delete ue[e],I.hasOwnProperty(e)){var i=I[e];delete I[e],i.forEach(s=>s())}}function Gr(e,r,t,n,i){var s=Me(t);r=_(r),A(e,{name:r,fromWireType:function(o){return!!o},toWireType:function(o,f){return f?n:i},argPackAdvance:8,readValueFromPointer:function(o){var f;if(t===1)f=De;else if(t===2)f=X;else if(t===4)f=W;else throw new TypeError("Unknown boolean type size: "+r);return this.fromWireType(f[o>>s])},destructorFunction:null})}function Jr(e){if(!(this instanceof k)||!(e instanceof k))return!1;for(var r=this.$$.ptrType.registeredClass,t=this.$$.ptr,n=e.$$.ptrType.registeredClass,i=e.$$.ptr;r.baseClass;)t=r.upcast(t),r=r.baseClass;for(;n.baseClass;)i=n.upcast(i),n=n.baseClass;return r===n&&t===i}function Xr(e){return{count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}}function Ie(e){function r(t){return t.$$.ptrType.registeredClass.name}g(r(e)+" instance already deleted")}var Ce=!1;function cr(e){}function qr(e){e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)}function dr(e){e.count.value-=1;var r=e.count.value===0;r&&qr(e)}function gr(e,r,t){if(r===t)return e;if(t.baseClass===void 0)return null;var n=gr(e,r,t.baseClass);return n===null?null:t.downcast(n)}var pr={};function Yr(){return Object.keys(z).length}function Kr(){var e=[];for(var r in z)z.hasOwnProperty(r)&&e.push(z[r]);return e}var q=[];function Le(){for(;q.length;){var e=q.pop();e.$$.deleteScheduled=!1,e.delete()}}var x=void 0;function Qr(e){x=e,q.length&&x&&x(Le)}function Zr(){h.getInheritedInstanceCount=Yr,h.getLiveInheritedInstances=Kr,h.flushPendingDeletes=Le,h.setDelayFunction=Qr}var z={};function Nr(e,r){for(r===void 0&&g("ptr should not be undefined");e.baseClass;)r=e.upcast(r),e=e.baseClass;return r}function et(e,r){return r=Nr(e,r),z[r]}function re(e,r){(!r.ptrType||!r.ptr)&&ce("makeClassHandle requires ptr and ptrType");var t=!!r.smartPtrType,n=!!r.smartPtr;return t!==n&&ce("Both smartPtrType and smartPtr must be specified"),r.count={value:1},G(Object.create(e,{$$:{value:r}}))}function rt(e){var r=this.getPointee(e);if(!r)return this.destructor(e),null;var t=et(this.registeredClass,r);if(t!==void 0){if(t.$$.count.value===0)return t.$$.ptr=r,t.$$.smartPtr=e,t.clone();var n=t.clone();return this.destructor(e),n}function i(){return this.isSmartPointer?re(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:r,smartPtrType:this,smartPtr:e}):re(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var s=this.registeredClass.getActualType(r),o=pr[s];if(!o)return i.call(this);var f;this.isConst?f=o.constPointerType:f=o.pointerType;var a=gr(r,this.registeredClass,f.registeredClass);return a===null?i.call(this):this.isSmartPointer?re(f.registeredClass.instancePrototype,{ptrType:f,ptr:a,smartPtrType:this,smartPtr:e}):re(f.registeredClass.instancePrototype,{ptrType:f,ptr:a})}function G(e){return typeof FinalizationRegistry>"u"?(G=r=>r,e):(Ce=new FinalizationRegistry(r=>{dr(r.$$)}),G=r=>{var t=r.$$,n=!!t.smartPtr;if(n){var i={$$:t};Ce.register(r,i,r)}return r},cr=r=>Ce.unregister(r),G(e))}function tt(){if(this.$$.ptr||Ie(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=G(Object.create(Object.getPrototypeOf(this),{$$:{value:Xr(this.$$)}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e}function nt(){this.$$.ptr||Ie(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&g("Object already scheduled for deletion"),cr(this),dr(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function it(){return!this.$$.ptr}function ot(){return this.$$.ptr||Ie(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&g("Object already scheduled for deletion"),q.push(this),q.length===1&&x&&x(Le),this.$$.deleteScheduled=!0,this}function at(){k.prototype.isAliasOf=Jr,k.prototype.clone=tt,k.prototype.delete=nt,k.prototype.isDeleted=it,k.prototype.deleteLater=ot}function k(){}function hr(e,r,t){if(e[r].overloadTable===void 0){var n=e[r];e[r]=function(){return e[r].overloadTable.hasOwnProperty(arguments.length)||g("Function '"+t+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+e[r].overloadTable+")!"),e[r].overloadTable[arguments.length].apply(this,arguments)},e[r].overloadTable=[],e[r].overloadTable[n.argCount]=n}}function st(e,r,t){h.hasOwnProperty(e)?((t===void 0||h[e].overloadTable!==void 0&&h[e].overloadTable[t]!==void 0)&&g("Cannot register public name '"+e+"' twice"),hr(h,e,e),h.hasOwnProperty(t)&&g("Cannot register multiple overloads of a function with the same number of arguments ("+t+")!"),h[e].overloadTable[t]=r):(h[e]=r,t!==void 0&&(h[e].numArguments=t))}function ft(e,r,t,n,i,s,o,f){this.name=e,this.constructor=r,this.instancePrototype=t,this.rawDestructor=n,this.baseClass=i,this.getActualType=s,this.upcast=o,this.downcast=f,this.pureVirtualFunctions=[]}function pe(e,r,t){for(;r!==t;)r.upcast||g("Expected null or instance of "+t.name+", got an instance of "+r.name),e=r.upcast(e),r=r.baseClass;return e}function lt(e,r){if(r===null)return this.isReference&&g("null is not a valid "+this.name),0;r.$$||g('Cannot pass "'+Be(r)+'" as a '+this.name),r.$$.ptr||g("Cannot pass deleted object as a pointer of type "+this.name);var t=r.$$.ptrType.registeredClass,n=pe(r.$$.ptr,t,this.registeredClass);return n}function ut(e,r){var t;if(r===null)return this.isReference&&g("null is not a valid "+this.name),this.isSmartPointer?(t=this.rawConstructor(),e!==null&&e.push(this.rawDestructor,t),t):0;r.$$||g('Cannot pass "'+Be(r)+'" as a '+this.name),r.$$.ptr||g("Cannot pass deleted object as a pointer of type "+this.name),!this.isConst&&r.$$.ptrType.isConst&&g("Cannot convert argument of type "+(r.$$.smartPtrType?r.$$.smartPtrType.name:r.$$.ptrType.name)+" to parameter type "+this.name);var n=r.$$.ptrType.registeredClass;if(t=pe(r.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(r.$$.smartPtr===void 0&&g("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:r.$$.smartPtrType===this?t=r.$$.smartPtr:g("Cannot convert argument of type "+(r.$$.smartPtrType?r.$$.smartPtrType.name:r.$$.ptrType.name)+" to parameter type "+this.name);break;case 1:t=r.$$.smartPtr;break;case 2:if(r.$$.smartPtrType===this)t=r.$$.smartPtr;else{var i=r.clone();t=this.rawShare(t,$e.toHandle(function(){i.delete()})),e!==null&&e.push(this.rawDestructor,t)}break;default:g("Unsupporting sharing policy")}return t}function ct(e,r){if(r===null)return this.isReference&&g("null is not a valid "+this.name),0;r.$$||g('Cannot pass "'+Be(r)+'" as a '+this.name),r.$$.ptr||g("Cannot pass deleted object as a pointer of type "+this.name),r.$$.ptrType.isConst&&g("Cannot convert argument of type "+r.$$.ptrType.name+" to parameter type "+this.name);var t=r.$$.ptrType.registeredClass,n=pe(r.$$.ptr,t,this.registeredClass);return n}function he(e){return this.fromWireType(W[e>>2])}function dt(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e}function gt(e){this.rawDestructor&&this.rawDestructor(e)}function pt(e){e!==null&&e.delete()}function ht(){S.prototype.getPointee=dt,S.prototype.destructor=gt,S.prototype.argPackAdvance=8,S.prototype.readValueFromPointer=he,S.prototype.deleteObject=pt,S.prototype.fromWireType=rt}function S(e,r,t,n,i,s,o,f,a,l,u){this.name=e,this.registeredClass=r,this.isReference=t,this.isConst=n,this.isSmartPointer=i,this.pointeeType=s,this.sharingPolicy=o,this.rawGetPointee=f,this.rawConstructor=a,this.rawShare=l,this.rawDestructor=u,!i&&r.baseClass===void 0?n?(this.toWireType=lt,this.destructorFunction=null):(this.toWireType=ct,this.destructorFunction=null):this.toWireType=ut}function vt(e,r,t){h.hasOwnProperty(e)||ce("Replacing nonexistant public symbol"),h[e].overloadTable!==void 0&&t!==void 0?h[e].overloadTable[t]=r:(h[e]=r,h[e].argCount=t)}function yt(e,r,t){var n=dynCalls[e];return t&&t.length?n.apply(null,[r].concat(t)):n.call(null,r)}var te=[];function Q(e){var r=te[e];return r||(e>=te.length&&(te.length=e+1),te[e]=r=fr.get(e)),r}function mt(e,r,t){if(e.includes("j"))return yt(e,r,t);var n=Q(r).apply(null,t);return n}function wt(e,r){var t=[];return function(){return t.length=0,Object.assign(t,arguments),mt(e,r,t)}}function O(e,r){e=_(e);function t(){return e.includes("j")?wt(e,r):Q(r)}var n=t();return typeof n!="function"&&g("unknown function pointer with signature "+e+": "+r),n}var vr=void 0;function bt(e){var r=_r(e),t=_(r);return F(r),t}function Y(e,r){var t=[],n={};function i(s){if(!n[s]&&!L[s]){if(ue[s]){ue[s].forEach(i);return}t.push(s),n[s]=!0}}throw r.forEach(i),new vr(e+": "+t.map(bt).join([", "]))}function _t(e,r,t,n,i,s,o,f,a,l,u,c,d){u=_(u),s=O(i,s),f&&(f=O(o,f)),l&&(l=O(a,l)),d=O(c,d);var v=We(u);st(v,function(){Y("Cannot construct "+u+" due to unbound types",[n])}),R([e,r,t],n?[n]:[],function(y){y=y[0];var m,b;n?(m=y.registeredClass,b=m.instancePrototype):b=k.prototype;var C=Re(v,function(){if(Object.getPrototypeOf(this)!==U)throw new B("Use 'new' to construct "+u);if(P.constructor_body===void 0)throw new B(u+" has no accessible constructor");var ee=P.constructor_body[arguments.length];if(ee===void 0)throw new B("Tried to invoke ctor of "+u+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(P.constructor_body).toString()+") parameters instead!");return ee.apply(this,arguments)}),U=Object.create(b,{constructor:{value:C}});C.prototype=U;var P=new ft(u,C,U,d,m,s,f,l),be=new S(u,P,!0,!1,!1),Z=new S(u+"*",P,!1,!1,!1),N=new S(u+" const*",P,!1,!0,!1);return pr[e]={pointerType:Z,constPointerType:N},vt(v,C),[be,Z,N]})}function yr(e,r){for(var t=[],n=0;n<e;n++)t.push(T[r+n*4>>2]);return t}function mr(e){for(;e.length;){var r=e.pop(),t=e.pop();t(r)}}function Ct(e,r){if(!(e instanceof Function))throw new TypeError("new_ called with constructor type "+typeof e+" which is not a function");var t=Re(e.name||"unknownFunctionName",function(){});t.prototype=e.prototype;var n=new t,i=e.apply(n,r);return i instanceof Object?i:n}function wr(e,r,t,n,i){var s=r.length;s<2&&g("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var o=r[1]!==null&&t!==null,f=!1,a=1;a<r.length;++a)if(r[a]!==null&&r[a].destructorFunction===void 0){f=!0;break}for(var l=r[0].name!=="void",u="",c="",a=0;a<s-2;++a)u+=(a!==0?", ":"")+"arg"+a,c+=(a!==0?", ":"")+"arg"+a+"Wired";var d="return function "+We(e)+"("+u+`) {
if (arguments.length !== `+(s-2)+`) {
throwBindingError('function `+e+" called with ' + arguments.length + ' arguments, expected "+(s-2)+` args!');
}
`;f&&(d+=`var destructors = [];
`);var v=f?"destructors":"null",y=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],m=[g,n,i,mr,r[0],r[1]];o&&(d+="var thisWired = classParam.toWireType("+v+`, this);
`);for(var a=0;a<s-2;++a)d+="var arg"+a+"Wired = argType"+a+".toWireType("+v+", arg"+a+"); // "+r[a+2].name+`
`,y.push("argType"+a),m.push(r[a+2]);if(o&&(c="thisWired"+(c.length>0?", ":"")+c),d+=(l?"var rv = ":"")+"invoker(fn"+(c.length>0?", ":"")+c+`);
`,f)d+=`runDestructors(destructors);
`;else for(var a=o?1:2;a<r.length;++a){var b=a===1?"thisWired":"arg"+(a-2)+"Wired";r[a].destructorFunction!==null&&(d+=b+"_dtor("+b+"); // "+r[a].name+`
`,y.push(b+"_dtor"),m.push(r[a].destructorFunction))}l&&(d+=`var ret = retType.fromWireType(rv);
return ret;
`),d+=`}
`,y.push(d);var C=Ct(Function,y).apply(null,m);return C}function Tt(e,r,t,n,i,s){assert(r>0);var o=yr(r,t);i=O(n,i),R([],[e],function(f){f=f[0];var a="constructor "+f.name;if(f.registeredClass.constructor_body===void 0&&(f.registeredClass.constructor_body=[]),f.registeredClass.constructor_body[r-1]!==void 0)throw new B("Cannot register multiple constructors with identical number of parameters ("+(r-1)+") for class '"+f.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return f.registeredClass.constructor_body[r-1]=()=>{Y("Cannot construct "+f.name+" due to unbound types",o)},R([],o,function(l){return l.splice(1,0,null),f.registeredClass.constructor_body[r-1]=wr(a,l,null,i,s),[]}),[]})}function Pt(e,r,t,n,i,s,o,f){var a=yr(t,n);r=_(r),s=O(i,s),R([],[e],function(l){l=l[0];var u=l.name+"."+r;r.startsWith("@@")&&(r=Symbol[r.substring(2)]),f&&l.registeredClass.pureVirtualFunctions.push(r);function c(){Y("Cannot call "+u+" due to unbound types",a)}var d=l.registeredClass.instancePrototype,v=d[r];return v===void 0||v.overloadTable===void 0&&v.className!==l.name&&v.argCount===t-2?(c.argCount=t-2,c.className=l.name,d[r]=c):(hr(d,r,u),d[r].overloadTable[t-2]=c),R([],a,function(y){var m=wr(u,y,l,s,o);return d[r].overloadTable===void 0?(m.argCount=t-2,d[r]=m):d[r].overloadTable[t-2]=m,[]}),[]})}function Je(e,r,t){return e instanceof Object||g(t+' with invalid "this": '+e),e instanceof r.registeredClass.constructor||g(t+' incompatible with "this" of type '+e.constructor.name),e.$$.ptr||g("cannot call emscripten binding method "+t+" on deleted object"),pe(e.$$.ptr,e.$$.ptrType.registeredClass,r.registeredClass)}function $t(e,r,t,n,i,s,o,f,a,l){r=_(r),i=O(n,i),R([],[e],function(u){u=u[0];var c=u.name+"."+r,d={get:function(){Y("Cannot access "+c+" due to unbound types",[t,o])},enumerable:!0,configurable:!0};return a?d.set=()=>{Y("Cannot access "+c+" due to unbound types",[t,o])}:d.set=v=>{g(c+" is a read-only property")},Object.defineProperty(u.registeredClass.instancePrototype,r,d),R([],a?[t,o]:[t],function(v){var y=v[0],m={get:function(){var C=Je(this,u,c+" getter");return y.fromWireType(i(s,C))},enumerable:!0};if(a){a=O(f,a);var b=v[1];m.set=function(C){var U=Je(this,u,c+" setter"),P=[];a(l,U,b.toWireType(P,C)),mr(P)}}return Object.defineProperty(u.registeredClass.instancePrototype,r,m),[]}),[]})}var Pe=[],$=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function St(e){e>4&&--$[e].refcount===0&&($[e]=void 0,Pe.push(e))}function Ft(){for(var e=0,r=5;r<$.length;++r)$[r]!==void 0&&++e;return e}function At(){for(var e=5;e<$.length;++e)if($[e]!==void 0)return $[e];return null}function kt(){h.count_emval_handles=Ft,h.get_first_emval=At}var $e={toValue:e=>(e||g("Cannot use deleted val. handle = "+e),$[e].value),toHandle:e=>{switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:{var r=Pe.length?Pe.pop():$.length;return $[r]={refcount:1,value:e},r}}}};function Et(e,r){r=_(r),A(e,{name:r,fromWireType:function(t){var n=$e.toValue(t);return St(t),n},toWireType:function(t,n){return $e.toHandle(n)},argPackAdvance:8,readValueFromPointer:he,destructorFunction:null})}function Be(e){if(e===null)return"null";var r=typeof e;return r==="object"||r==="array"||r==="function"?e.toString():""+e}function Ot(e,r){switch(r){case 2:return function(t){return this.fromWireType(ar[t>>2])};case 3:return function(t){return this.fromWireType(sr[t>>3])};default:throw new TypeError("Unknown float type: "+e)}}function Ut(e,r,t){var n=Me(t);r=_(r),A(e,{name:r,fromWireType:function(i){return i},toWireType:function(i,s){return s},argPackAdvance:8,readValueFromPointer:Ot(r,n),destructorFunction:null})}function Dt(e,r,t){switch(r){case 0:return t?function(i){return De[i]}:function(i){return w[i]};case 1:return t?function(i){return X[i>>1]}:function(i){return ge[i>>1]};case 2:return t?function(i){return W[i>>2]}:function(i){return T[i>>2]};default:throw new TypeError("Unknown integer type: "+e)}}function Mt(e,r,t,n,i){r=_(r);var s=Me(t),o=c=>c;if(n===0){var f=32-8*t;o=c=>c<<f>>>f}var a=r.includes("unsigned"),l=(c,d)=>{},u;a?u=function(c,d){return l(d,this.name),d>>>0}:u=function(c,d){return l(d,this.name),d},A(e,{name:r,fromWireType:o,toWireType:u,argPackAdvance:8,readValueFromPointer:Dt(r,s,n!==0),destructorFunction:null})}function Wt(e,r,t){var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],i=n[r];function s(o){o=o>>2;var f=T,a=f[o],l=f[o+1];return new i(K,l,a)}t=_(t),A(e,{name:t,fromWireType:s,argPackAdvance:8,readValueFromPointer:s},{ignoreDuplicateRegistrations:!0})}function Rt(e,r){r=_(r);var t=r==="std::string";A(e,{name:r,fromWireType:function(n){var i=T[n>>2],s=n+4,o;if(t)for(var f=s,a=0;a<=i;++a){var l=s+a;if(a==i||w[l]==0){var u=l-f,c=ne(f,u);o===void 0?o=c:(o+=String.fromCharCode(0),o+=c),f=l+1}}else{for(var d=new Array(i),a=0;a<i;++a)d[a]=String.fromCharCode(w[s+a]);o=d.join("")}return F(n),o},toWireType:function(n,i){i instanceof ArrayBuffer&&(i=new Uint8Array(i));var s,o=typeof i=="string";o||i instanceof Uint8Array||i instanceof Uint8ClampedArray||i instanceof Int8Array||g("Cannot pass non-string to std::string"),t&&o?s=Wr(i):s=i.length;var f=ve(4+s+1),a=f+4;if(T[f>>2]=s,t&&o)Mr(i,a,s+1);else if(o)for(var l=0;l<s;++l){var u=i.charCodeAt(l);u>255&&(F(a),g("String has UTF-16 code units that do not fit in 8 bits")),w[a+l]=u}else for(var l=0;l<s;++l)w[a+l]=i[l];return n!==null&&n.push(F,f),f},argPackAdvance:8,readValueFromPointer:he,destructorFunction:function(n){F(n)}})}var jt=new TextDecoder("utf-16le");function It(e,r){for(var t=e,n=t>>1,i=n+r/2;!(n>=i)&&ge[n];)++n;return t=n<<1,jt.decode(w.subarray(e,t))}function Lt(e,r,t){if(t===void 0&&(t=2147483647),t<2)return 0;t-=2;for(var n=r,i=t<e.length*2?t/2:e.length,s=0;s<i;++s){var o=e.charCodeAt(s);X[r>>1]=o,r+=2}return X[r>>1]=0,r-n}function Bt(e){return e.length*2}function Ht(e,r){for(var t=0,n="";!(t>=r/4);){var i=W[e+t*4>>2];if(i==0)break;if(++t,i>=65536){var s=i-65536;n+=String.fromCharCode(55296|s>>10,56320|s&1023)}else n+=String.fromCharCode(i)}return n}function Vt(e,r,t){if(t===void 0&&(t=2147483647),t<4)return 0;for(var n=r,i=n+t-4,s=0;s<e.length;++s){var o=e.charCodeAt(s);if(o>=55296&&o<=57343){var f=e.charCodeAt(++s);o=65536+((o&1023)<<10)|f&1023}if(W[r>>2]=o,r+=4,r+4>i)break}return W[r>>2]=0,r-n}function xt(e){for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);n>=55296&&n<=57343&&++t,r+=4}return r}function zt(e,r,t){t=_(t);var n,i,s,o,f;r===2?(n=It,i=Lt,o=Bt,s=()=>ge,f=1):r===4&&(n=Ht,i=Vt,o=xt,s=()=>T,f=2),A(e,{name:t,fromWireType:function(a){for(var l=T[a>>2],u=s(),c,d=a+4,v=0;v<=l;++v){var y=a+4+v*r;if(v==l||u[y>>f]==0){var m=y-d,b=n(d,m);c===void 0?c=b:(c+=String.fromCharCode(0),c+=b),d=y+r}}return F(a),c},toWireType:function(a,l){typeof l!="string"&&g("Cannot pass non-string to C++ string type "+t);var u=o(l),c=ve(4+u+r);return T[c>>2]=u>>f,i(l,c+4,u+r),a!==null&&a.push(F,c),c},argPackAdvance:8,readValueFromPointer:he,destructorFunction:function(a){F(a)}})}function Gt(e,r){r=_(r),A(e,{isVoid:!0,name:r,argPackAdvance:0,fromWireType:function(){},toWireType:function(t,n){}})}function Jt(){throw 1/0}function Xt(){ir("")}var br;br=()=>performance.now();function qt(e,r,t){w.copyWithin(e,r,r+t)}function Yt(){return 2147483648}function Kt(e){try{return fe.grow(e-K.byteLength+65535>>>16),le(fe.buffer),1}catch{}}function Qt(e){var r=w.length;e=e>>>0;var t=Yt();if(e>t)return!1;let n=(a,l)=>a+(l-a%l)%l;for(var i=1;i<=4;i*=2){var s=r*(1+.2/i);s=Math.min(s,e+100663296);var o=Math.min(t,n(Math.max(e,s),65536)),f=Kt(o);if(f)return!0}return!1}function Zt(e){throw"exit("+e+")"}var Nt=Zt;function en(e){return 52}function rn(e,r,t,n){return 52}function tn(e,r,t,n,i){return 70}var nn=[null,[],[]];function on(e,r){var t=nn[e];r===0||r===10?((e===1?qe:Ye)(Ur(t,0)),t.length=0):t.push(r)}function an(e,r,t,n){for(var i=0,s=0;s<t;s++){var o=T[r>>2],f=T[r+4>>2];r+=8;for(var a=0;a<f;a++)on(e,w[o+a]);i+=f}return T[n>>2]=i,0}Vr();B=h.BindingError=je(Error,"BindingError");ur=h.InternalError=je(Error,"InternalError");at();Zr();ht();vr=h.UnboundTypeError=je(Error,"UnboundTypeError");kt();var sn={a:Rr,m:jr,z:Ir,D:Lr,l:Br,t:Hr,p:Gr,j:_t,s:Tt,c:Pt,b:$t,E:Et,n:Ut,f:Mt,d:Wt,o:Rt,k:zt,q:Gt,x:Jt,e:Xt,g:br,A:qt,y:Qt,h:Nt,i:en,C:rn,r:tn,B:an,w:fn,u:un,v:ln};function fn(e,r,t){var n=me();try{return Q(e)(r,t)}catch(i){if(we(n),i!==i+0)throw i;ye(1,0)}}function ln(e,r,t,n,i){var s=me();try{return Q(e)(r,t,n,i)}catch(o){if(we(s),o!==o+0)throw o;ye(1,0)}}function un(e,r,t,n){var i=me();try{return Q(e)(r,t,n)}catch(s){if(we(i),s!==s+0)throw s;ye(1,0)}}function cn(e){e.G()}var Xe={a:sn},ve,F,_r,ye,me,we;(WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(fetch("jassub-worker.wasm"),Xe):WebAssembly.instantiate(h.wasm,Xe)).then(function(e){asm=(e.instance||e).exports,ve=asm.H,F=asm.I,_r=asm.J,asm.K,ye=asm.M,asm.N,me=asm.O,we=asm.P,asm.Q,asm.R,asm.S,asm.T,fr=asm.L,fe=asm.F,le(fe.buffer),cn(asm),Ke()});
