(this["webpackJsonpcsv-tool"]=this["webpackJsonpcsv-tool"]||[]).push([[0],{24:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(15),s=n.n(r),o=(n(23),n(24),n(3)),l=n(16),i=n.n(l),u=n(4),d=n.n(u),j=n(0),b=function(){var e=Object(c.useState)(10),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(),s=Object(o.a)(r,2),l=s[0],u=s[1],b=Object(c.useState)(1),h=Object(o.a)(b,2),f=h[0],O=h[1],g=Object(c.useState)(""),p=Object(o.a)(g,2),m=p[0],v=p[1],x=Object(c.useState)(),C=Object(o.a)(x,2),N=C[0],S=C[1];Object(c.useEffect)((function(){document.title="Assesment by Asim",i.a.get("http://jsonplaceholder.typicode.com/todos").then((function(e){S(e.data),u(d()(e.data).slice(0).take(n).value())})).catch((function(e){console.log(e)}))}),[]);var w=N?Math.ceil(N.length/n):0;if(1===w)return null;var k=d.a.range(1,w+1);return Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{className:"form-control download",onClick:function(){return function(){for(var e=[],t=[["id","userId","title","completed"]],n=0;n<N.length;n++)t.push([N[n].id,N[n].userId,N[n].title,N[n].completed]);console.log("ArrayData length",t.length);for(var c=0;c<t.length;c++)e.push(t[c].join(","));var a=e.join("%0A");console.log(a);var r=document.createElement("a");r.href="data:attachment/csv,"+a,r.target="_Blank",r.download="data.csv",document.body.appendChild(r),r.click()}()},children:N?"download as csv":"Use the template"}),Object(j.jsx)("input",{className:"form-control pagesize",type:"number",min:"10",defaultValue:10,onChange:function(e){e.target.value<10||null===e.target.value||""===e.target.value?a(25):e.target.value>N.length?(console.log(N.length),a(e.target.value)):a(e.target.value)}}),Object(j.jsx)("input",{className:"form-control search",type:"text",placeholder:"Search",onChange:function(e){v(e.target.value)}}),l?Object(j.jsxs)("table",{className:"table table-bordered",children:[Object(j.jsx)("thead",{className:"thead-dark",children:Object(j.jsx)("tr",{children:["Id","UserId","Title","Status"].map((function(e){return Object(j.jsx)("th",{style:{cursor:"pointer"},onClick:function(){return console.log(e)},children:e},e)}))})}),Object(j.jsx)("tbody",{children:l.filter((function(e){return""===m||e.id.toString().toLowerCase().includes(m.toLowerCase())||e.userId.toString().toLowerCase().includes(m.toLowerCase())||e.title.toLowerCase().includes(m.toLowerCase())||e.completed.toString().toLowerCase().includes(m.toLowerCase())?e:void 0})).map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.id}),Object(j.jsx)("td",{children:e.userId}),Object(j.jsx)("td",{children:e.title}),Object(j.jsx)("td",{children:Object(j.jsx)("p",{className:e.completed?"btn btn-success":"btn btn-danger",children:e.completed?"Completed":"Pending"})})]},t)}))})]}):"",Object(j.jsx)("nav",{className:"d-flex justify-content-center",children:Object(j.jsx)("ul",{className:"pagination",children:k.map((function(e){return Object(j.jsx)("li",{className:e===f?"page-item active":"page-item",children:Object(j.jsx)("p",{className:"page-link para",onClick:function(){return function(e){O(e);var t=(e-1)*n,c=d()(N).slice(t).take(n).value();u(c)}(e)},children:e})},e)}))})})]})},h=n(6),f=n.n(h),O=n(17),g=n(18),p=function(){var e=a.a.useState(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)([]),l=Object(o.a)(s,2),i=l[0],u=l[1];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"drag",children:[Object(j.jsx)("h1",{children:"CSV Tool"}),Object(j.jsx)("div",{className:"drag1 ".concat(n?"dragHigh":"dragNor"),onDragEnter:function(){r(!0)},onDragLeave:function(){r(!1)},onDragOver:function(e){e.preventDefault()},onDrop:function(e){e.preventDefault(),r(!1),Array.from(e.dataTransfer.files).filter((function(e){return"text/csv"===e.type})).forEach(function(){var e=Object(O.a)(f.a.mark((function e(t){var n,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:n=e.sent,c=Object(g.parse)(n,{header:!0}),u((function(){return c.data}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},children:"DROP CSV file"})]}),Object(j.jsx)("button",{className:"form-control reset",onClick:function(){u([])},children:"Reset"}),Object(j.jsx)("ul",{children:i.map((function(e){return Object(j.jsxs)("li",{children:[Object(j.jsx)("strong",{children:e.id}),": ",e.title]},e.id)}))})]})};var m=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)(p,{}),Object(j.jsx)(b,{})]})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(m,{})}),document.getElementById("root")),v()}},[[47,1,2]]]);
//# sourceMappingURL=main.b7700787.chunk.js.map