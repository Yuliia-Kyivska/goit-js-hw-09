const t=document.querySelector("body"),e=document.querySelector('button[data-action = "start"]'),a=document.querySelector('button[data-action = "stop"]');let d=null;e.addEventListener("click",(()=>{d=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,a.disabled=!1})),a.addEventListener("click",(()=>{clearInterval(d),e.disabled=!1,a.disabled=!0}));
//# sourceMappingURL=01-color-switcher.61b2400c.js.map