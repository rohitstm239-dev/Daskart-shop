let cart = [];

async function loadProducts(){
 const r = await fetch("/api/products");
 const data = await r.json();

 let html="";
 data.forEach(p=>{
   html+=`
   <div class="card">
     <img src="${p.image}" width="150"><br>
     <b>${p.name}</b>
     <p>${p.description||""}</p>
     <h4>₹${p.price}</h4>
     <button onclick='add(${JSON.stringify(p)})'>Add</button>
   </div>`;
 });

 document.getElementById("products").innerHTML=html;
}

function add(p){
 cart.push(p);
 renderCart();
}

function renderCart(){
 let t=0;
 let html="";
 cart.forEach(i=>{
   html+=`<li>${i.name} ₹${i.price}</li>`;
   t+=i.price;
 });
 document.getElementById("cartItems").innerHTML=html;
 document.getElementById("total").innerText=t;
}

async function placeOrder(){
 if(cart.length===0){
   alert("Cart empty");
   return;
 }

 await fetch("/api/orders",{
   method:"POST",
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({
     userId:"guest",
     items:cart,
     total:cart.reduce((a,b)=>a+b.price,0)
   })
 });

 alert("Order placed");
 cart=[];
 renderCart();
}

loadProducts();
