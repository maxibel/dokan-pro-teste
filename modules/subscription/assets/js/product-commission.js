(()=>{"use strict";var s,i={8529:()=>{const s=function(s,i,t,o,e,n){var a,m="function"==typeof s?s.options:s;if(i&&(m.render=i,m.staticRenderFns=[],m._compiled=!0),n&&(m._scopeId="data-v-"+n),a)if(m.functional){m._injectStyles=a;var r=m.render;m.render=function(s,i){return a.call(i),r(s,i)}}else{var d=m.beforeCreate;m.beforeCreate=d?[].concat(d,a):[a]}return{exports:s,options:m}}({name:"DokanSubCommission",components:{CategoryBasedCommission:dokan_get_lib("CategoryBasedCommission"),CombineInput:dokan_get_lib("CombineInput")},data:()=>({selectedCommission:"fixed",commission:{},commissionTypes:{},fixedCommission:{},productId:0,wcProduct:{}}),created(){let s=this;window.dokanCommission&&window.dokanCommission.commissionTypes&&(this.commissionTypes=window.dokanCommission.commissionTypes),document.addEventListener("DOMContentLoaded",(function(){let i=document.getElementById("post_ID");i&&i.value&&(s.productId=i.value);let t=document.getElementById("post");t&&t.addEventListener("submit",(function(i){s.saveCommission()})),s.fetchCommission(),s.initTooltips()}))},methods:{initTooltips(){jQuery(".dokan-tooltips-help").tipTip({attribute:"data-tip",fadeIn:50,fadeOut:50,delay:200})},commissionChanged(){this.initTooltips()},fetchCommission(){dokan.api.get(`/products/${this.productId}`).done(((s,i,t)=>{this.wcProduct=s,this.selectedCommission=this.getMetaData("_subscription_product_admin_commission_type","fixed"),this.fixedCommission={fixed:this.getMetaData("_subscription_product_admin_commission",""),percentage:this.getMetaData("_subscription_product_admin_additional_fee","")};let o=this.getMetaData("_subscription_product_admin_category_based_commission",{});o&&o.items&&Array.isArray(o.items)&&(o.items={}),this.commission=o}))},saveCommission(){let s={product_id:this.productId,commission_type:this.selectedCommission,commission:this.processItemsForDatabase()};dokan.api.post("/subscription/save-commission",s)},onCategoryUpdate(s){this.commission=s},fixedCOmmissionhandler(s,i){this.fixedCommission=s},processItemsForDatabase(){let s=[],i=this.commission.hasOwnProperty("all")?this.commission.all:{},t=this.commission.hasOwnProperty("items")?this.commission.items:{};return Object.keys(t).forEach((i=>{s.push({category_id:i,...t[i]})})),{fixed:{flat:this.fixedCommission.hasOwnProperty("fixed")?this.fixedCommission.fixed:"",percentage:this.fixedCommission.hasOwnProperty("percentage")?this.fixedCommission.percentage:""},category_based:{all:i,items:s}}},getMetaData(s,i=""){return Object.values(this.wcProduct).length&&this.wcProduct.hasOwnProperty("meta_data")&&"object"==typeof this.wcProduct.meta_data?(this.wcProduct.meta_data.forEach((t=>{t.hasOwnProperty("key")&&t.key===s&&(i=t.value)})),i):i}}},(function(){var s=this,i=s._self._c;return i("div",{staticClass:"p-3"},[i("div",{staticClass:"mb-5"},[i("p",{staticClass:"!p-0 !m-0 !font-semibold",attrs:{for:"_subscription_product_admin_commission_type"}},[s._v(s._s(s.__("Admin Commission type","dokan")))]),s._v(" "),i("div",{staticClass:"flex flex-col"},[i("select",{directives:[{name:"model",rawName:"v-model",value:s.selectedCommission,expression:"selectedCommission"}],staticClass:"select short",attrs:{id:"_subscription_product_admin_commission_type",name:"_subscription_product_admin_commission_type"},on:{change:[function(i){var t=Array.prototype.filter.call(i.target.options,(function(s){return s.selected})).map((function(s){return"_value"in s?s._value:s.value}));s.selectedCommission=i.target.multiple?t:t[0]},s.commissionChanged]}},s._l(s.commissionTypes,(function(t,o){return i("option",{domProps:{value:o}},[s._v(s._s(t))])})),0),s._v(" "),i("span",{staticClass:"description"},[s._v(s._s(s.__("Set the commission type admin will get under this subscription","dokan")))])])]),s._v(" "),"category_based"===s.selectedCommission?i("div",[i("p",{staticClass:"!p-0 !m-0 !font-semibold",attrs:{for:"_subscription_product_admin_commission_type"}},[s._v("\n            "+s._s(s.__("Admin Commission","dokan"))+"\n\n            "),i("span",{staticClass:"dokan-tooltips-help",attrs:{"data-tip":s.__("When the value is 0, no commissions will be deducted from this vendor.","dokan")}},[i("i",{staticClass:"fas fa-question-circle"})])]),s._v(" "),i("category-based-commission",{attrs:{value:s.commission},on:{change:s.onCategoryUpdate}})],1):"fixed"===s.selectedCommission?i("div",[i("p",{staticClass:"!p-0 !m-0 !font-semibold",attrs:{for:"_subscription_product_admin_commission_type"}},[s._v("\n            "+s._s(s.__("Admin Commission","dokan"))+"\n\n            "),i("span",{staticClass:"dokan-tooltips-help",attrs:{"data-tip":s.__("When the value is 0, no commissions will be deducted from this vendor.","dokan")}},[i("i",{staticClass:"fas fa-question-circle"})])]),s._v(" "),i("combine-input",{attrs:{value:s.fixedCommission},on:{change:s.fixedCOmmissionhandler}})],1):s._e()])}),0,0,0,"70d5c6ba").exports;new(dokan_get_lib("Vue"))({el:"#dokan_product_pack_commission_data_section",render:i=>i(s)})}},t={};function o(s){var e=t[s];if(void 0!==e)return e.exports;var n=t[s]={exports:{}};return i[s](n,n.exports,o),n.exports}o.m=i,s=[],o.O=(i,t,e,n)=>{if(!t){var a=1/0;for(c=0;c<s.length;c++){for(var[t,e,n]=s[c],m=!0,r=0;r<t.length;r++)(!1&n||a>=n)&&Object.keys(o.O).every((s=>o.O[s](t[r])))?t.splice(r--,1):(m=!1,n<a&&(a=n));if(m){s.splice(c--,1);var d=e();void 0!==d&&(i=d)}}return i}n=n||0;for(var c=s.length;c>0&&s[c-1][2]>n;c--)s[c]=s[c-1];s[c]=[t,e,n]},o.o=(s,i)=>Object.prototype.hasOwnProperty.call(s,i),(()=>{var s={1792:0,7624:0};o.O.j=i=>0===s[i];var i=(i,t)=>{var e,n,[a,m,r]=t,d=0;if(a.some((i=>0!==s[i]))){for(e in m)o.o(m,e)&&(o.m[e]=m[e]);if(r)var c=r(o)}for(i&&i(t);d<a.length;d++)n=a[d],o.o(s,n)&&s[n]&&s[n][0](),s[n]=0;return o.O(c)},t=self.webpackChunkdokan_pro=self.webpackChunkdokan_pro||[];t.forEach(i.bind(null,0)),t.push=i.bind(null,t.push.bind(t))})();var e=o.O(void 0,[7624],(()=>o(8529)));e=o.O(e)})();