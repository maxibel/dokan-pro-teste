(()=>{"use strict";class e{constructor(e,t){this.stripe=null,this.options=e,this.request=t}ajaxEndpoint(e,t="dokan_stripe_express_"){return this.options?.ajaxurl?.toString()?.replace("%%endpoint%%",t+e)}getErrorMessage(e){return this.options.messages[e]?this.options.messages[e]:this.options.messages.default}getStripe(){const{key:e,locale:t}=this.options;return this.stripe||(this.stripe=new Stripe(e,{locale:t})),this.stripe}loadStripe(){return new Promise((e=>{try{e(this.getStripe())}catch(t){e({error:t})}}))}initSetupIntent(){return this.request(this.ajaxEndpoint("init_setup_intent"),{_ajax_nonce:this.options?.nonce}).then((e=>{if(!e.success)throw e.data.error;return e.data})).catch((e=>{throw e.message?e:new Error(this.getErrorMessage(e.statusText))}))}createIntent(e){return this.request(this.ajaxEndpoint("create_payment_intent"),{order_id:e,_ajax_nonce:this.options?.nonce}).then((e=>{if(!e.success)throw e.data.error;return e.data})).catch((e=>{throw e.message?e:new Error(this.getErrorMessage(e.statusText))}))}updateIntent(e,t,r,n){if(!e.includes("seti_"))return this.request(this.ajaxEndpoint("update_payment_intent"),{order_id:t,payment_intent_id:e,save_payment_method:r,payment_type:n,_ajax_nonce:this.options?.nonce}).then((e=>{if("failure"===e.result)throw new Error(e.messages);return e})).catch((e=>{throw e.message?e:new Error(this.getErrorMessage(e.statusText))}))}confirmIntent(e,t){const r=e.match(/#dokan-stripe-express-confirm-(pi|si):(.+):(.+):(.+):(.+)$/);if(!r)return!0;const n="si"===r[1];let o=r[2];const a=r[3],i=r[4],s=r[5],l=e.indexOf("order-pay"),d=l>-1,c=d&&e.substring(l).match(/\d+/);let h;return c&&(o=c[0]),h="sepa_debit"===i||"ideal"===i?n?this.getStripe().confirmSepaDebitSetup(a):this.getStripe().confirmSepaDebitPayment(a):n?this.getStripe().confirmCardSetup(a):this.getStripe().confirmCardPayment(a),{request:h.then((e=>{const r=e.paymentIntent&&e.paymentIntent.id||e.setupIntent&&e.setupIntent.id||e.error&&e.error.payment_intent&&e.error.payment_intent.id||e.error.setup_intent&&e.error.setup_intent.id;return[this.request(this.ajaxEndpoint("update_order_status"),{_ajax_nonce:s,order_id:o,intent_id:r,is_setup:n?"yes":"no",payment_method_id:t||null}),e.error]})).then((([e,t])=>{if(t)throw t;return e.then((e=>{if(!e.success)throw e.data.error;return e.data.return_url}))})),isOrderPage:d}}processCheckout(e,t,r=null){return this.request(this.ajaxEndpoint("checkout",""),{...t,payment_intent_id:e}).then((e=>{if("failure"===e.result)throw new Error(e.messages);return e})).catch((e=>{throw e.message?e:new Error(this.getErrorMessage(e.statusText))}))}createSubscription(e){return this.request(this.ajaxEndpoint("create_subscription"),{product_id:e,_ajax_nonce:this.options?.nonce}).then((e=>e.data)).catch((e=>{throw e.message?e:new Error(this.getErrorMessage(e.statusText))}))}updateFailedOrder(e,t){this.request(this.ajaxEndpoint("update_failed_order"),{intent_id:e,order_id:t,_ajax_nonce:this.options?.nonce}).catch((e=>{}))}}const t=()=>{if(!dokanStripeExpress)throw new Error("Stripe initialization data is not available");return dokanStripeExpress};String.prototype.toCamelCase=function(){return this.toString().toLowerCase().split(/\s|_|-/g).reduce(((e,t)=>e+(t.charAt(0).toUpperCase()+t.slice(1))))};const r=(e="always")=>{const r=t()?.paymentMethodsConfig;return Object.keys(r).filter((e=>r[e].isReusable)).reduce(((t,r)=>(delete t[r],t[r.toCamelCase()]=e,t)),{})},n=["color","padding","paddingTop","paddingRight","paddingBottom","paddingLeft"],o=["fontFamily","fontSize","lineHeight","letterSpacing","fontWeight","fontVariation","textDecoration","textShadow","textTransform","-webkit-font-smoothing","-moz-osx-font-smoothing","transition"],a=["border","borderTop","borderRight","borderBottom","borderLeft","borderRadius","borderWidth","borderColor","borderStyle","borderTopWidth","borderTopColor","borderTopStyle","borderRightWidth","borderRightColor","borderRightStyle","borderBottomWidth","borderBottomColor","borderBottomStyle","borderLeftWidth","borderLeftColor","borderLeftStyle","borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius","outline","outlineOffset","backgroundColor","boxShadow"],i={".Label":[...n,...o],".Input":[...n,...o,...a],".Error":[...n,...o,...a],".Tab":[...n,...o,...a],".TabIcon":[...n],".TabLabel":[...n,...o]},s={".Label":i[".Label"],".Input":[...i[".Input"],"outlineColor","outlineWidth","outlineStyle"],".Error":i[".Error"],".Tab":["borderStyle","borderBottomStyle","borderTopStyle","borderRightStyle","borderLeftStyle","borderColor","borderBottomColor","borderTopColor","borderRightColor","borderLeftColor","borderWidth","borderBottomWidth","borderTopWidth","borderRightWidth","borderLeftWidth","backgroundColor","color","fontFamily"],".Tab--selected":["borderStyle","borderStyle","borderBottomStyle","borderTopStyle","borderRightStyle","borderLeftStyle","borderWidth","borderBottomWidth","borderTopWidth","borderRightWidth","borderLeftWidth","backgroundColor","color"],".TabIcon":i[".TabIcon"],".TabIcon--selected":["color"],".TabLabel":i[".TabLabel"]};function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}var d=/^\s+/,c=/\s+$/;function h(e,t){if(t=t||{},(e=e||"")instanceof h)return e;if(!(this instanceof h))return new h(e,t);var r=function(e){var t,r,n,o={r:0,g:0,b:0},a=1,i=null,s=null,h=null,u=!1,p=!1;return"string"==typeof e&&(e=function(e){e=e.replace(d,"").replace(c,"").toLowerCase();var t,r=!1;if(E[e])e=E[e],r=!0;else if("transparent"==e)return{r:0,g:0,b:0,a:0,format:"name"};return(t=N.rgb.exec(e))?{r:t[1],g:t[2],b:t[3]}:(t=N.rgba.exec(e))?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=N.hsl.exec(e))?{h:t[1],s:t[2],l:t[3]}:(t=N.hsla.exec(e))?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=N.hsv.exec(e))?{h:t[1],s:t[2],v:t[3]}:(t=N.hsva.exec(e))?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=N.hex8.exec(e))?{r:F(t[1]),g:F(t[2]),b:F(t[3]),a:U(t[4]),format:r?"name":"hex8"}:(t=N.hex6.exec(e))?{r:F(t[1]),g:F(t[2]),b:F(t[3]),format:r?"name":"hex"}:(t=N.hex4.exec(e))?{r:F(t[1]+""+t[1]),g:F(t[2]+""+t[2]),b:F(t[3]+""+t[3]),a:U(t[4]+""+t[4]),format:r?"name":"hex8"}:!!(t=N.hex3.exec(e))&&{r:F(t[1]+""+t[1]),g:F(t[2]+""+t[2]),b:F(t[3]+""+t[3]),format:r?"name":"hex"}}(e)),"object"==l(e)&&(W(e.r)&&W(e.g)&&W(e.b)?(t=e.r,r=e.g,n=e.b,o={r:255*T(t,255),g:255*T(r,255),b:255*T(n,255)},u=!0,p="%"===String(e.r).substr(-1)?"prgb":"rgb"):W(e.h)&&W(e.s)&&W(e.v)?(i=L(e.s),s=L(e.v),o=function(e,t,r){e=6*T(e,360),t=T(t,100),r=T(r,100);var n=Math.floor(e),o=e-n,a=r*(1-t),i=r*(1-o*t),s=r*(1-(1-o)*t),l=n%6;return{r:255*[r,i,a,a,s,r][l],g:255*[s,r,r,i,a,a][l],b:255*[a,a,s,r,r,i][l]}}(e.h,i,s),u=!0,p="hsv"):W(e.h)&&W(e.s)&&W(e.l)&&(i=L(e.s),h=L(e.l),o=function(e,t,r){var n,o,a;function i(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}if(e=T(e,360),t=T(t,100),r=T(r,100),0===t)n=o=a=r;else{var s=r<.5?r*(1+t):r+t-r*t,l=2*r-s;n=i(l,s,e+1/3),o=i(l,s,e),a=i(l,s,e-1/3)}return{r:255*n,g:255*o,b:255*a}}(e.h,i,h),u=!0,p="hsl"),e.hasOwnProperty("a")&&(a=e.a)),a=R(a),{ok:u,format:e.format||p,r:Math.min(255,Math.max(o.r,0)),g:Math.min(255,Math.max(o.g,0)),b:Math.min(255,Math.max(o.b,0)),a}}(e);this._originalInput=e,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=Math.round(100*this._a)/100,this._format=t.format||r.format,this._gradientType=t.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=r.ok}function u(e,t,r){e=T(e,255),t=T(t,255),r=T(r,255);var n,o,a=Math.max(e,t,r),i=Math.min(e,t,r),s=(a+i)/2;if(a==i)n=o=0;else{var l=a-i;switch(o=s>.5?l/(2-a-i):l/(a+i),a){case e:n=(t-r)/l+(t<r?6:0);break;case t:n=(r-e)/l+2;break;case r:n=(e-t)/l+4}n/=6}return{h:n,s:o,l:s}}function p(e,t,r){e=T(e,255),t=T(t,255),r=T(r,255);var n,o,a=Math.max(e,t,r),i=Math.min(e,t,r),s=a,l=a-i;if(o=0===a?0:l/a,a==i)n=0;else{switch(a){case e:n=(t-r)/l+(t<r?6:0);break;case t:n=(r-e)/l+2;break;case r:n=(e-t)/l+4}n/=6}return{h:n,s:o,v:s}}function m(e,t,r,n){var o=[B(Math.round(e).toString(16)),B(Math.round(t).toString(16)),B(Math.round(r).toString(16))];return n&&o[0].charAt(0)==o[0].charAt(1)&&o[1].charAt(0)==o[1].charAt(1)&&o[2].charAt(0)==o[2].charAt(1)?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function f(e,t,r,n){return[B(H(n)),B(Math.round(e).toString(16)),B(Math.round(t).toString(16)),B(Math.round(r).toString(16))].join("")}function g(e,t){t=0===t?0:t||10;var r=h(e).toHsl();return r.s-=t/100,r.s=P(r.s),h(r)}function b(e,t){t=0===t?0:t||10;var r=h(e).toHsl();return r.s+=t/100,r.s=P(r.s),h(r)}function _(e){return h(e).desaturate(100)}function y(e,t){t=0===t?0:t||10;var r=h(e).toHsl();return r.l+=t/100,r.l=P(r.l),h(r)}function w(e,t){t=0===t?0:t||10;var r=h(e).toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-t/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-t/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-t/100*255))),h(r)}function k(e,t){t=0===t?0:t||10;var r=h(e).toHsl();return r.l-=t/100,r.l=P(r.l),h(r)}function v(e,t){var r=h(e).toHsl(),n=(r.h+t)%360;return r.h=n<0?360+n:n,h(r)}function x(e){var t=h(e).toHsl();return t.h=(t.h+180)%360,h(t)}function S(e,t){if(isNaN(t)||t<=0)throw new Error("Argument to polyad must be a positive number");for(var r=h(e).toHsl(),n=[h(e)],o=360/t,a=1;a<t;a++)n.push(h({h:(r.h+a*o)%360,s:r.s,l:r.l}));return n}function M(e){var t=h(e).toHsl(),r=t.h;return[h(e),h({h:(r+72)%360,s:t.s,l:t.l}),h({h:(r+216)%360,s:t.s,l:t.l})]}function I(e,t,r){t=t||6,r=r||30;var n=h(e).toHsl(),o=360/r,a=[h(e)];for(n.h=(n.h-(o*t>>1)+720)%360;--t;)n.h=(n.h+o)%360,a.push(h(n));return a}function A(e,t){t=t||6;for(var r=h(e).toHsv(),n=r.h,o=r.s,a=r.v,i=[],s=1/t;t--;)i.push(h({h:n,s:o,v:a})),a=(a+s)%1;return i}h.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},getLuminance:function(){var e,t,r,n=this.toRgb();return e=n.r/255,t=n.g/255,r=n.b/255,.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))+.0722*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))},setAlpha:function(e){return this._a=R(e),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var e=p(this._r,this._g,this._b);return{h:360*e.h,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=p(this._r,this._g,this._b),t=Math.round(360*e.h),r=Math.round(100*e.s),n=Math.round(100*e.v);return 1==this._a?"hsv("+t+", "+r+"%, "+n+"%)":"hsva("+t+", "+r+"%, "+n+"%, "+this._roundA+")"},toHsl:function(){var e=u(this._r,this._g,this._b);return{h:360*e.h,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=u(this._r,this._g,this._b),t=Math.round(360*e.h),r=Math.round(100*e.s),n=Math.round(100*e.l);return 1==this._a?"hsl("+t+", "+r+"%, "+n+"%)":"hsla("+t+", "+r+"%, "+n+"%, "+this._roundA+")"},toHex:function(e){return m(this._r,this._g,this._b,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(e){return function(e,t,r,n,o){var a=[B(Math.round(e).toString(16)),B(Math.round(t).toString(16)),B(Math.round(r).toString(16)),B(H(n))];return o&&a[0].charAt(0)==a[0].charAt(1)&&a[1].charAt(0)==a[1].charAt(1)&&a[2].charAt(0)==a[2].charAt(1)&&a[3].charAt(0)==a[3].charAt(1)?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return"#"+this.toHex8(e)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(100*T(this._r,255))+"%",g:Math.round(100*T(this._g,255))+"%",b:Math.round(100*T(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+Math.round(100*T(this._r,255))+"%, "+Math.round(100*T(this._g,255))+"%, "+Math.round(100*T(this._b,255))+"%)":"rgba("+Math.round(100*T(this._r,255))+"%, "+Math.round(100*T(this._g,255))+"%, "+Math.round(100*T(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(C[m(this._r,this._g,this._b,!0)]||!1)},toFilter:function(e){var t="#"+f(this._r,this._g,this._b,this._a),r=t,n=this._gradientType?"GradientType = 1, ":"";if(e){var o=h(e);r="#"+f(o._r,o._g,o._b,o._a)}return"progid:DXImageTransform.Microsoft.gradient("+n+"startColorstr="+t+",endColorstr="+r+")"},toString:function(e){var t=!!e;e=e||this._format;var r=!1,n=this._a<1&&this._a>=0;return t||!n||"hex"!==e&&"hex6"!==e&&"hex3"!==e&&"hex4"!==e&&"hex8"!==e&&"name"!==e?("rgb"===e&&(r=this.toRgbString()),"prgb"===e&&(r=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(r=this.toHexString()),"hex3"===e&&(r=this.toHexString(!0)),"hex4"===e&&(r=this.toHex8String(!0)),"hex8"===e&&(r=this.toHex8String()),"name"===e&&(r=this.toName()),"hsl"===e&&(r=this.toHslString()),"hsv"===e&&(r=this.toHsvString()),r||this.toHexString()):"name"===e&&0===this._a?this.toName():this.toRgbString()},clone:function(){return h(this.toString())},_applyModification:function(e,t){var r=e.apply(null,[this].concat([].slice.call(t)));return this._r=r._r,this._g=r._g,this._b=r._b,this.setAlpha(r._a),this},lighten:function(){return this._applyModification(y,arguments)},brighten:function(){return this._applyModification(w,arguments)},darken:function(){return this._applyModification(k,arguments)},desaturate:function(){return this._applyModification(g,arguments)},saturate:function(){return this._applyModification(b,arguments)},greyscale:function(){return this._applyModification(_,arguments)},spin:function(){return this._applyModification(v,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(I,arguments)},complement:function(){return this._applyCombination(x,arguments)},monochromatic:function(){return this._applyCombination(A,arguments)},splitcomplement:function(){return this._applyCombination(M,arguments)},triad:function(){return this._applyCombination(S,[3])},tetrad:function(){return this._applyCombination(S,[4])}},h.fromRatio=function(e,t){if("object"==l(e)){var r={};for(var n in e)e.hasOwnProperty(n)&&(r[n]="a"===n?e[n]:L(e[n]));e=r}return h(e,t)},h.equals=function(e,t){return!(!e||!t)&&h(e).toRgbString()==h(t).toRgbString()},h.random=function(){return h.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})},h.mix=function(e,t,r){r=0===r?0:r||50;var n=h(e).toRgb(),o=h(t).toRgb(),a=r/100;return h({r:(o.r-n.r)*a+n.r,g:(o.g-n.g)*a+n.g,b:(o.b-n.b)*a+n.b,a:(o.a-n.a)*a+n.a})},h.readability=function(e,t){var r=h(e),n=h(t);return(Math.max(r.getLuminance(),n.getLuminance())+.05)/(Math.min(r.getLuminance(),n.getLuminance())+.05)},h.isReadable=function(e,t,r){var n,o,a,i,s,l=h.readability(e,t);switch(o=!1,(a=r,"AA"!==(i=((a=a||{level:"AA",size:"small"}).level||"AA").toUpperCase())&&"AAA"!==i&&(i="AA"),"small"!==(s=(a.size||"small").toLowerCase())&&"large"!==s&&(s="small"),n={level:i,size:s}).level+n.size){case"AAsmall":case"AAAlarge":o=l>=4.5;break;case"AAlarge":o=l>=3;break;case"AAAsmall":o=l>=7}return o},h.mostReadable=function(e,t,r){var n,o,a,i,s=null,l=0;o=(r=r||{}).includeFallbackColors,a=r.level,i=r.size;for(var d=0;d<t.length;d++)(n=h.readability(e,t[d]))>l&&(l=n,s=h(t[d]));return h.isReadable(e,s,{level:a,size:i})||!o?s:(r.includeFallbackColors=!1,h.mostReadable(e,["#fff","#000"],r))};var E=h.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},C=h.hexNames=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[e[r]]=r);return t}(E);function R(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function T(e,t){(function(e){return"string"==typeof e&&-1!=e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var r=function(e){return"string"==typeof e&&-1!=e.indexOf("%")}(e);return e=Math.min(t,Math.max(0,parseFloat(e))),r&&(e=parseInt(e*t,10)/100),Math.abs(e-t)<1e-6?1:e%t/parseFloat(t)}function P(e){return Math.min(1,Math.max(0,e))}function F(e){return parseInt(e,16)}function B(e){return 1==e.length?"0"+e:""+e}function L(e){return e<=1&&(e=100*e+"%"),e}function H(e){return Math.round(255*parseFloat(e)).toString(16)}function U(e){return F(e)/255}var j,q,O,N=(q="[\\s|\\(]+("+(j="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+j+")[,|\\s]+("+j+")\\s*\\)?",O="[\\s|\\(]+("+j+")[,|\\s]+("+j+")[,|\\s]+("+j+")[,|\\s]+("+j+")\\s*\\)?",{CSS_UNIT:new RegExp(j),rgb:new RegExp("rgb"+q),rgba:new RegExp("rgba"+O),hsl:new RegExp("hsl"+q),hsla:new RegExp("hsla"+O),hsv:new RegExp("hsv"+q),hsva:new RegExp("hsva"+O),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function W(e){return!!N.CSS_UNIT.exec(e)}const D=e=>{if(!e.backgroundColor||!e.color)return e;const t=((e,t)=>{const r={backgroundColor:e,color:t},n=h(e),o=h(t);if(!n.isValid()||!o.isValid())return{backgroundColor:"",color:""};const a=n.getBrightness()>50?h(n).darken(7):h(n).lighten(7),i=h.mostReadable(a,[o],{includeFallbackColors:!0});return r.backgroundColor=a.toRgbString(),r.color=i.toRgbString(),r})(e.backgroundColor,e.color),r=Object.assign({},e);return r.backgroundColor=t.backgroundColor,r.color=t.color,r},$=(e,t)=>{if(!document.querySelector(e))return{};const r=s[t],n=document.querySelector(e),o=window.getComputedStyle(n),a={};for(let e=0;e<o.length;e++){const t=o[e].replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()}));r.includes(t)&&(a[t]=o.getPropertyValue(o[e]))}if(".Input"===t){const e=((e,t="solid",r)=>e&&r?[e,t,r].join(" "):"")(a.outlineWidth,a.outlineStyle,a.outlineColor);""!==e&&(a.outline=e),delete a.outlineWidth,delete a.outlineColor,delete a.outlineStyle}return a},z=()=>{const e=[],t=document.styleSheets,r=["fonts.googleapis.com","fonts.gstatic.com","fast.fonts.com","use.typekit.net"];for(let n=0;n<t.length;n++){if(!t[n].href)continue;const o=new URL(t[n].href);-1!==r.indexOf(o.hostname)&&e.push({cssSrc:t[n].href})}return e},V=()=>{const e="#billing_first_name",r=$(e,".Input"),n=$("#dokan-stripe-express-hidden-input",".Input"),o=$("#dokan-stripe-express-hidden-invalid-input",".Input"),a=$(".woocommerce-checkout .form-row label",".Label"),i=$(e,".Tab"),s=$(".woocommerce-checkout .place-order .button.alt",".Tab--selected"),l=D(i),d=D(s);let c={".Input":r,".Input:focus":n,".Input--invalid":o,".Label":a,".Tab":i,".Tab:hover":l,".Tab--selected":s,".Tab--selected:hover":d,".TabIcon:hover":{color:l.color},".TabIcon--selected":{color:s.color},".TabIcon--selected:hover":{color:d.color}},h={colorText:"grey"},u=t()?.appearance?.theme;return c={},"dark_blue"===u&&(u="night",h={fontWeightNormal:"500",borderRadius:"8px",colorBackground:"#0A2540",colorPrimary:"#EFC078",colorPrimaryText:"#1A1B25",colorTextPlaceholder:"#727F96",colorIconTab:"white",colorLogo:"dark",...h},c={...c,".Block":{backgroundColor:"transparent",border:"1.5px solid var(--colorPrimary)"}}),{theme:u,variables:h,rules:c}};!function(n){const o={key:null,paymentMethodsConfig:{},enabledBillingFields:{},i18n:{},assets:{},sepaElementsOptions:{},loadingSelector:"",api:null,iban:null,elements:null,paymentElement:null,paymentIntentId:"",subscriptionId:"",isComplete:!1,selectedPaymentMethodRaw:"",hiddenBillingFields:{},init:()=>{o.setData(),o.key&&(o.setApi(),o.events(),o.subscription.init())},setApi:()=>{o.api=new e(t(),((e,t)=>new Promise(((r,o)=>{n.post(e,t).then(r).fail(o)}))))},initElements:()=>{if(!n("input#payment_method_dokan_stripe_express").is(":checked"))return;const e=o,r=e.subscription.exists();if(r||n("#dokan-stripe-express-element").length&&!n("#dokan-stripe-express-element").children().length){const n=t()?.isAddPaymentMethod||!(t()?.isPaymentNeeded??1);e.mountElement(n,r)}e.doesIbanNeedToBeMounted()&&e.iban.mount("#dokan-stripe-express-iban-element")},mountElement:(e=!1,r=!1)=>{if(!n("#dokan-stripe-express-element").length)return;if(n("#dokan-stripe-express-element").children().length)return;const a=o,i=a.subscription.getProductId(),s=i&&i.length;if(a.blockUI(n(a.loadingSelector)),!r&&a.paymentElement)return a.paymentElement.unmount(),void a.paymentElement.mount("#dokan-stripe-express-element");const l=t()?.isOrderPay,d=t()?.isCheckout,c=t()?.isAddPaymentMethod,h=t()?.isChangingPayment;let u,p;l&&(u=t()?.orderId),p=s?a.api.createSubscription(i):e?a.api.initSetupIntent():a.api.createIntent(u),p.then((e=>{if(e.error)return void a.showError(e.error.message);if(a.paymentElement||a.paymentIntentId)return a.paymentElement.unmount(),void a.paymentElement.mount("#dokan-stripe-express-element");const{client_secret:r,id:o}=e;a.paymentIntentId=o,e.subscription_id&&e.subscription_id.length&&(a.subscriptionId=e.subscription_id),a.assignExternalData(),a.elements=a.api.getStripe().elements({clientSecret:r,appearance:V(),fonts:z(),locale:t()?.locale});const i={business:{name:t()?.accountDescriptor}};d&&!l&&(i.fields={billingDetails:a.hiddenBillingFields}),(c||h)&&(i.wallets={applePay:"never",googlePay:"never"}),a.paymentElement=a.elements.create("payment",i),a.paymentElement.mount("#dokan-stripe-express-element"),a.paymentElement.on("ready",(()=>{a.unblockUI(n(a.loadingSelector))})),a.paymentElement.on("change",(e=>{a.selectedPaymentMethodRaw=e.value.type;const t="apple_pay"===e.value.type||"google_pay"===e.value.type?"card":e.value.type,r=a.paymentMethodsConfig[t].isReusable&&!a.isUsingSavedPaymentMethod();a.showNewPaymentMethodCheckbox(r),a.setSelectedPaymentType(t),a.isComplete=e.complete})),n(document.body).trigger("wc-credit-card-form-init")})).catch((e=>{a.unblockUI(n(a.loadingSelector)),a.showError(e.message),n(".payment_box.payment_method_woocommerce_payments").html(`<div>${a.i18n.tryAgain}</div>`)}))},createIbanElement:()=>{o.iban=o.api.getStripe().elements({fonts:z(),locale:t()?.locale}).create("iban")},checkout:async e=>{const t=o;if(!await t.validateForm(e))return;t.blockUI(e);const r=e.serializeArray().reduce(((e,t)=>(e[t.name]=t.value,e)),{});try{const e=await t.api.processCheckout(t.paymentIntentId,r,t.subscriptionId);let n=!1;if("apple_pay"===t.selectedPaymentMethodRaw){if(n=await dokan_sweetalert(t.i18n.confirmApplePayment,{action:"confirm",confirmButtonColor:"#363636",cancelButtonColor:"#b54545",confirmButtonText:t.i18n.proceed,cancelButtonText:t.i18n.decline,imageUrl:t.assets.applePayLogo,background:"#1a1a1a"}),n.isDismissed)throw t.i18n.paymentDismissed}else n={isConfirmed:!0};if(n.isConfirmed){let n;const o={elements:t.elements,confirmParams:{return_url:e.redirect_url,payment_method_data:{billing_details:t.getBillingDetails(r)}}};if(e.payment_needed?({error:n}=await t.api.getStripe().confirmPayment(o)):({error:n}=await t.api.getStripe().confirmSetup(o)),n){const o=r.dokan_stripe_express_payment_type;throw"boleto"!==o&&"oxxo"!==o&&await t.api.updateFailedOrder(t.paymentIntentId,e.order_id),n}}}catch(r){t.unblockUI(e),t.showError(r)}},processOrderPay:async e=>{const r=o;if(await r.validateForm(n("#order_review"))){r.blockUI(e);try{const e=n("#wc-dokan_stripe_express-new-payment-method").is(":checked")?"yes":"no",o=t()?.orderReturnURL+`&save_payment_method=${e}`,a=t()?.orderId,i=n("#dokan-stripe-express-payment-type").val();await r.api.updateIntent(r.paymentIntentId,a,e,i);const{error:s}=await r.api.getStripe().confirmPayment({elements:r.elements,confirmParams:{return_url:o}});if(s)throw"boleto"!==i&&"oxxo"!==i&&await r.api.updateFailedOrder(r.paymentIntentId,a),s}catch(t){r.unblockUI(e),r.showError(t.message)}}},processAddPayment:async e=>{const r=o;if(r.isStripeExpressChosen()&&await r.validateForm(e)){r.blockUI(e);try{const e=t()?.addPaymentReturnURL,{error:n}=await r.api.getStripe().confirmSetup({elements:r.elements,confirmParams:{return_url:e}});if(n)throw n}catch(t){r.unblockUI(e),r.showError(t.message)}}},getBillingDetails:e=>({name:`${e.billing_first_name} ${e.billing_last_name}`.trim()||"-",email:e.billing_email||"-",phone:e.billing_phone||"-",address:{country:e.billing_country||"-",line1:e.billing_address_1||"-",line2:e.billing_address_2||"-",city:e.billing_city||"-",state:e.billing_state||"-",postal_code:e.billing_postcode||"-"}}),validateForm:async e=>{const t=o;if(!t.paymentElement)return t.showError(t.i18n.incompleteInfo),!1;if(!t.isComplete){const{error:r}=await t.api.getStripe().confirmPayment({elements:t.elements,confirmParams:{return_url:"#"}});return t.unblockUI(e),t.showError(r.message),!1}return!0},maybeShowAuthenticationModal:()=>{const e=n("#dokan-stripe-express-payment-method").val(),r=n("#wc-dokan_stripe_express-new-payment-method").is(":checked"),a=o.api.confirmIntent(window.location.href,r?e:null);if(!0===a)return;const{request:i,isOrderPage:s}=a;s&&(blockUI(n("#order_review")),n("#payment").hide(500)),history.replaceState("",document.title,window.location.pathname+window.location.search),i.then((e=>{window.location=e})).catch((e=>{o.unblockUI(n("form.checkout")),o.unblockUI(n("#order_review")),n("#payment").show(500);let r=e.message;e instanceof Error&&(r=t()?.genericErrorMessage),o.showError(r)}))},assignExternalData:()=>{n("form.checkout").append(`<div class="dokan-stripe-express-external-data">\n                    <input type="hidden" name="subscription_id" value="${o.subscriptionId}" />\n                    <input type="hidden" name="payment_intent_id" value="${o.paymentIntentId}" />\n                </div>`)},isUsingSavedPaymentMethod:()=>n("#wc-dokan_stripe_express-payment-token-new").length&&!n("#wc-dokan_stripe_express-payment-token-new").is(":checked"),isStripeExpressChosen:function(){return n("#payment_method_dokan_stripe_express").is(":checked")||n("#payment_method_dokan_stripe_express").is(":checked")&&"new"===n('input[name="wc-dokan_stripe_express-payment-token-new"]:checked').val()},doesIbanNeedToBeMounted:()=>n("#dokan-stripe-express-iban-element").length&&!n("#dokan-stripe-express-iban-element").children().length,blockUI:e=>{e.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}})},unblockUI:e=>{e.removeClass("processing").unblock()},showError:e=>{"string"==typeof e||e instanceof String||("code"in e&&e.code in t()?e=t()[e.code]:"message"in e&&(e=e.message));let r="";r=(e=e.toString()).includes("woocommerce-error")?e:'<ul class="woocommerce-error" role="alert"><li>'+e+"</li></ul>";const o=n(".woocommerce-notices-wrapper").first();o.length&&(n(".woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message").remove(),o.prepend(r),n("form.checkout").find(".input-text, select, input:checkbox").trigger("validate").blur(),n.scroll_to_notices(o),n(document.body).trigger("checkout_error"))},showNewPaymentMethodCheckbox:(e=!0)=>{e?n(".woocommerce-SavedPaymentMethods-saveNew").show():(n(".woocommerce-SavedPaymentMethods-saveNew").hide(),n("input#wc-dokan_stripe_express-new-payment-method").prop("checked",!1),n("input#wc-dokan_stripe_express-new-payment-method").trigger("change"))},setSelectedPaymentType:e=>{n("#dokan-stripe-express-payment-type").val(e)},setData:()=>{const e=o;e.key=t()?.key,e.paymentMethodsConfig=t()?.paymentMethodsConfig,e.enabledBillingFields=t()?.billingFields,e.i18n=t()?.i18n,e.assets=t()?.assets,e.sepaElementsOptions=t()?.sepaElementsOptions??{},e.loadingSelector="#dokan-stripe-express-form",e.hiddenBillingFields={name:o.enabledBillingFields.includes("billing_first_name")||o.enabledBillingFields.includes("billing_last_name")?"never":"auto",email:o.enabledBillingFields.includes("billing_email")?"never":"auto",phone:o.enabledBillingFields.includes("billing_phone")?"never":"auto",address:{country:o.enabledBillingFields.includes("billing_country")?"never":"auto",line1:o.enabledBillingFields.includes("billing_address_1")?"never":"auto",line2:o.enabledBillingFields.includes("billing_address_2")?"never":"auto",city:o.enabledBillingFields.includes("billing_city")?"never":"auto",state:o.enabledBillingFields.includes("billing_state")?"never":"auto",postalCode:o.enabledBillingFields.includes("billing_postcode")?"never":"auto"}}},subscription:{init:()=>{const e=o.subscription;n("#early_renewal_modal_submit[data-payment-method]").length?n("#early_renewal_modal_submit[data-payment-method=dokan-stripe-express]").on("click",e.onEarlyRenewalSubmit):n("#early_renewal_modal_submit").on("click",e.onEarlyRenewalSubmit)},getProductId:()=>n("#dokan-stripe-express-subscription-product-id").val(),exists:()=>{const e=o.subscription.getProductId();return!(!e||!e.length)},onEarlyRenewalSubmit:e=>(e.preventDefault(),n.ajax({url:n("#early_renewal_modal_submit").attr("href"),method:"get",success:function(e){var t=JSON.parse(e);t.dokan_stripe_express_sca_required?o.maybeShowAuthenticationModal():window.location=t.redirect_url}}),!1)},events:()=>{const e=o;if(e.createIbanElement(),n(document.body).on("updated_checkout",e.initElements),n(document.body).on("change","input#payment_method_dokan_stripe_express",e.initElements),n("form#add_payment_method").length&&e.isStripeExpressChosen()||n("#wc-dokan_stripe_express-change-payment-method").length||n("form#order_review").length){if(n("#dokan-stripe-express-element").length&&!n("#dokan-stripe-express-element").children().length&&!e.paymentElement){const r=t()?.isChangingPayment,o=n("form#add_payment_method").length||r;if(r&&t()?.newTokenFormId){const e=t()?.newTokenFormId,r=t()?.stripeToken,o=n("form#order_review");o.find('input[name="payment_method_source"]').length||o.append(`<input name='payment_method_source' value='${r}' />`),n(e).prop("selected",!0).trigger("click"),n("form#order_review").append().submit()}e.mountElement(o)}e.doesIbanNeedToBeMounted()&&e.iban.mount("#dokan-stripe-express-iban-element")}n("form.checkout").on("checkout_place_order_dokan_stripe_express",(()=>{if(!e.isUsingSavedPaymentMethod()&&e.paymentIntentId)return e.checkout(n("form.checkout")),!1})),n("form#add_payment_method").on("submit",(()=>{if(!n("#wc-dokan_stripe_express-setup-intent").val()&&e.paymentIntentId)return e.processAddPayment(n("form#add_payment_method")),!1})),n("#order_review").on("submit",(()=>{if(!e.isUsingSavedPaymentMethod())return t()?.isChangingPayment?(e.processAddPayment(n("#order_review")),!1):(e.processOrderPay(n("#order_review")),!1)})),n(document).on("change","#wc-dokan_stripe_express-new-payment-method",(()=>{const t=n("#wc-dokan_stripe_express-new-payment-method").is(":checked")?"always":"never";e.paymentElement&&e.paymentElement.update({terms:r(t)})})),e.maybeShowAuthenticationModal(),n(window).on("hashchange",(()=>{window.location.hash.startsWith("#dokan-stripe-express-confirm-")&&e.maybeShowAuthenticationModal()}))}};n(document).ready((function(){o.init()}))}(jQuery)})();