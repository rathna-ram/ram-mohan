import{r as l,j as e,u as i,A as c}from"./index-DNZ7i425.js";const a=({label:s,onClick:t})=>{const[n,o]=l.useState(!1),r=()=>{o(!n),t&&t()};return e.jsx("button",{onClick:r,className:`
        px-4 py-2 
        rounded-lg 
        text-white 
        transition duration-300 
        bg-blue-500 hover:bg-green-600
      `,children:s})},g=()=>{const s=i(),{theme:t}=l.useContext(c);return e.jsxs("div",{className:`min-h-screen flex flex-col items-center justify-center ${t==="dark"?"bg-slate-900 text-white":"bg-gray-100 text-black"}`,children:[e.jsx("h1",{className:"text-4xl font-bold mb-6 text-center",children:"Welcome to RathnaWeb"}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx(a,{label:"Login",onClick:()=>s("/login")}),e.jsx(a,{label:"Register",onClick:()=>alert("Register not implemented")})]})]})};export{g as default};
