_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[14],{RQJL:function(t,e,n){t.exports={"page-container":"page_page-container__3LRmt"}},"Rf+s":function(t,e,n){"use strict";n.r(e);var r=n("o0o1"),c=n.n(r),a=n("HaE+"),s=n("ODXe"),o=n("nKUr"),u=n("q1tI"),i=n("hDQs"),l=n("ofer"),d=n("TLva"),p=n("RQJL"),f=n.n(p),v=n("kzYg");e.default=function(){var t=u.useState({}),e=Object(s.a)(t,2),n=e[0],r=e[1],p=u.useState([]),h=Object(s.a)(p,2),j=h[0],b=h[1],w=u.useState(!1),O=Object(s.a)(w,2),x=(O[0],O[1],u.useState(null)),g=Object(s.a)(x,2),m=(g[0],g[1],function(){var t=Object(a.a)(c.a.mark((function t(){var e,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(i.e)("models");case 3:return e=t.sent,t.next=6,Object(v.e)({});case 6:n=t.sent,r(e),b(n),t.next=13;break;case 11:t.prev=11,t.t0=t.catch(0);case 13:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}());return Object(u.useEffect)((function(){m()}),[]),Object(o.jsx)(d.a,{children:Object(o.jsxs)("div",{className:"container ".concat(f.a["page-container"]),children:[Object(o.jsx)("div",{className:"row",children:Object(o.jsx)("div",{className:"col-12",children:Object(o.jsx)(l.a,{variant:"h4",children:n.title})})}),Object(o.jsx)("div",{className:"row",children:Object(o.jsx)("div",{className:"col-12",children:n.content})}),Object(o.jsx)("section",{children:(null!==j&&void 0!==j?j:[]).map((function(t){return Object(o.jsx)("div",{className:"row",children:Object(o.jsx)("div",{className:"col-12"})})}))})]})})}},gGcR:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/models",function(){return n("Rf+s")}])},kzYg:function(t,e,n){"use strict";n.d(e,"d",(function(){return p})),n.d(e,"e",(function(){return f})),n.d(e,"c",(function(){return v})),n.d(e,"a",(function(){return h})),n.d(e,"b",(function(){return j}));var r=n("o0o1"),c=n.n(r),a=n("HaE+"),s=n("vDqi"),o=n.n(s),u=null!=="https://facility-hub.cineca.it"?"https://facility-hub.cineca.it":"http://localhost:5000",i={filters:function(t){return"/filters/".concat(t)},datasets:function(){return"/search/dataset"},models:function(){return"/search/model"}},l={datasets:function(){return"/download/dataset"}},d=function(t){try{return t&&200===t.status?t.data:null}catch(e){throw e}},p=function(){var t=Object(a.a)(c.a.mark((function t(e){var n,r,a,s,l,p,f,v;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.query,r=e.region,a=e.cell_type,s=e.species,l=e.page,p=void 0===l?0:l,f="".concat(u).concat(i.datasets(),"/").concat(p),t.prev=2,t.next=5,o.a.post(f,{query:n,region:r,cell_type:a,species:s});case 5:return v=t.sent,t.abrupt("return",d(v));case 9:t.prev=9,t.t0=t.catch(2),console.error("@@@@error retrieving datasets"),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(a.a)(c.a.mark((function t(e){var n,r,a,s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.query,r=e.region,a="".concat(u).concat(i.models()),t.prev=2,t.next=5,o.a.post(a,{query:n,region:r});case 5:return s=t.sent,t.abrupt("return",d(s));case 9:t.prev=9,t.t0=t.catch(2),console.error("@@@@error retrieving datasets"),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(a.a)(c.a.mark((function t(e){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="".concat(u).concat(i.filters(e)),t.prev=1,t.next=4,o.a.get(n);case 4:return r=t.sent,t.abrupt("return",d(r));case 8:t.prev=8,t.t0=t.catch(1),console.error("@@@@error retrieving datasets"),console.error(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),h=function(){return"".concat(u).concat(l.datasets(),"/all")},j=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e="".concat(u).concat(l.datasets(),"?ids=").concat(t.join(","));return e}}},[["gGcR",0,2,4,1,3,5]]]);