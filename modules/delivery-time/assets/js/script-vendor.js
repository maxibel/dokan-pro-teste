!function(e){const t={init:function(){e("#vendor-delivery-time-date-picker").on("change",t.set_delivery_time_date_picker),e("#vendor-delivery-time-slot-picker").on("change",t.check_delivery_time_slot),e("#dokan-store-pickup-location").on("change",t.set_selected_store_location).trigger("change"),e(".delivery-type-delivery").on("click",t.set_delivery_order_type),e(".delivery-type-pickup").on("click",t.set_pickup_order_type)},init_dashboard_calendar:function(){if("undefined"==typeof FullCalendar)return;let d="";const a=FullCalendar.globalLocales.length;for(let e=0;e<a;e++){if(0!==dokan_helper.week_starts_day&&(FullCalendar.globalLocales[e].week.dow=dokan_helper.week_starts_day),FullCalendar.globalLocales[e].code===dokan_full_calendar_i18n.code){d=dokan_full_calendar_i18n.code;break}if(FullCalendar.globalLocales[e].code===dokan_full_calendar_i18n.code_1){d=dokan_full_calendar_i18n.code_1;break}}let i=document.getElementById("delivery-time-calendar");new FullCalendar.Calendar(i,{locale:d,initialView:"dayGridMonth",initialDate:new Date,headerToolbar:{start:"dayGridMonth,timeGridWeek,timeGridDay,listWeek",center:"title",end:"today prev,next"},events:function(e,d,a){let i={action:"dokan_get_dashboard_calendar_event",start_date:moment(e.start).format("YYYY-MM-DD"),end_date:moment(e.end).format("YYYY-MM-DD"),nonce:dokan_delivery_time_calendar_nonce},r=t.get_filter_query_param("delivery_type_filter");r&&(i.type_filter=r),jQuery.post(dokan.ajaxurl,i,(function(e){e.success&&e.data.calendar_events&&d(Array.prototype.slice.call(e.data.calendar_events))}))},eventDidMount:function(t){e(t.el).tooltip({title:t.event.extendedProps.info.body,placement:"top",trigger:"hover",container:"body",animation:!0,html:!0})}}).render()},set_delivery_time_date_picker:function(){let d=e("#vendor-delivery-time-date-picker"),a=d.data("vendor_id"),i=d.data("nonce"),r=d.attr("value");r?e("#vendor-delivery-time-date-picker").fadeIn(400):e("#vendor-delivery-time-date-picker").fadeOut(400);let n={action:"dokan_get_delivery_time_slot",vendor_id:a,nonce:i,date:r};n.date&&(e("#dokan_update_delivery_time").prop("disabled",!0),t.get_delivery_time_slots(n))},check_delivery_time_slot:function(){e("#vendor-delivery-time-slot-picker").val()&&("delivery"!==e("#vendor-delivery-type #selected-delivery-type").val()?e("#dokan-store-pickup-location").val()&&e("#dokan_update_delivery_time").prop("disabled",!1):e("#dokan_update_delivery_time").prop("disabled",!1))},set_order_details_delivery_calendar_config:function(){if("undefined"==typeof vendorInfo)return;const e=vendorInfo;let t={disable:[],minDate:e.default_date,altInput:!0,altFormat:dokan_helper.i18n_date_format.replace("jS","J"),dateFormat:"Y-m-d",locale:dokan_flatpickr_i18n,defaultDate:e.default_date};const d=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];let a=Object.entries(e.vendor_delivery_options.delivery_day).map((e=>parseInt(e[1])||e[0]===e[1]?e[0]:"")).filter((e=>null!==e?e:"")),i=[];d.forEach((e=>{a.includes(e)||i.push(d.indexOf(e))}));const r=e.vendor_vacation_days,n=e.vendor_preorder_blocked_dates;t.disable=[function(e){return i.includes(e.getDay())}],t.disable=[...t.disable,...r,...n],flatpickr("#vendor-delivery-time-date-picker",t)},get_delivery_time_slots:function(t){const d=e(".dokan-vendor-panel");d.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),e("#vendor-delivery-time-slot-picker").prop("disabled",!0),jQuery.post(dokan.ajaxurl,t,(function(t){d.unblock(),t.success&&(e("#vendor-delivery-time-slot-picker option:gt(0)").remove(),e.each(t.data.vendor_delivery_slots,(function(t,d){let a=dokan_get_formatted_time(d.start,dokan_get_i18n_time_format(),"hh:mm a"),i=dokan_get_formatted_time(d.end,dokan_get_i18n_time_format(),"hh:mm a");e("#vendor-delivery-time-slot-picker").append(e("<option></option>").attr("value",t).text(`${a} - ${i}`))})),e("#vendor-delivery-time-slot-picker").prop("disabled",!1))}))},get_filter_query_param:function(e){let t=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.search);return null!==t&&(t[1]||0)},set_selected_store_location:function(){const t=e(this),d=t.val(),a=t.children("option:selected").data("value"),i=e(".delivery-time-slot-picker").val(),r=e("#vendor-delivery-type #selected-delivery-type").val();a?(i&&e("#dokan_update_delivery_time").prop("disabled",!1),e(".store-address").slideDown(300,(function(){e("#delivery-store-location-address").text(a)}))):e(".store-address").slideUp(300),"delivery"===r||d||e("#dokan_update_delivery_time").prop("disabled",!0)},set_delivery_order_type:function(){e("input.delivery-type-delivery")[0].hasAttribute("checked")||(e("input.delivery-type-delivery").attr("checked","checked"),e("input.delivery-type-pickup").removeAttr("checked")),t.update_vendor_delivery_content("slideUp","delivery")},set_pickup_order_type:function(){e("input.delivery-type-pickup")[0].hasAttribute("checked")||(e("input.delivery-type-pickup").attr("checked","checked"),e("input.delivery-type-delivery").removeAttr("checked")),t.update_vendor_delivery_content("slideDown","pickup")},update_vendor_delivery_content:function(d,a){let i=Vendor_Delivery_Data[a+"_date"],r=Vendor_Delivery_Data[a+"_time_heading"],n=Vendor_Delivery_Data[a+"_placeholder"];t.check_delivery_time_slot(),e("#vendor-delivery-type #selected-delivery-type").val(a),e(".delivery-time-box-heading").text(r),e(".delivery-type-date-info span").text(i),e(".delivery-time-date-picker").attr("placeholder",n),e(".store-pickup-select-options")[d](300),e("#dokan-store-pickup-location")[d](300)}};jQuery(document).ready((function(e){t.init(),t.set_order_details_delivery_calendar_config(),t.init_dashboard_calendar()}))}(jQuery);