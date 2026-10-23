const productos = {
cafes:{titulo:"Cafés",descripcion:"Elegí entre nuestros cafés calientes y fríos.",subcategorias:{
calientes:{titulo:"Cafés calientes",items:[
{nombre:"Café americano",descripcion:"Clásico, aromático y equilibrado.",precio:3800,imagen:"CAFEamericano.jpg"},
{nombre:"Cappuccino",descripcion:"Café intenso, leche y espuma.",precio:5200,imagen:"capuchino.jpg"},
{nombre:"Café latte",descripcion:"Espresso suave con leche cremosa.",precio:5500,imagen:"cafe latte.jfif"},
{nombre:"Cortado",descripcion:"Un clásico equilibrado y aromático.",precio:4000,imagen:"cafe cortado.jfif"},
{nombre:"Flat white",descripcion:"Espresso con una fina capa de leche.",precio:5800,imagen:"cafe flat white.jpg"},
{nombre:"Café raf",descripcion:"Cremoso, dulce y diferente.",precio:6000,imagen:"cafe raf.webp"},
{nombre:"Macchiato",descripcion:"Espresso con un toque de leche.",precio:4300,imagen:"CAFE MACHIATTO.jpg"},
{nombre:"Café matcha",descripcion:"Una alternativa suave y especial.",precio:5700,imagen:"CAFEmatcha.jpg"}]},
frios:{titulo:"Cafés fríos",items:[
{nombre:"Latte frío",descripcion:"Café con leche, servido bien frío.",precio:5800,imagen:"cafe latte.jfif"},
{nombre:"Cappuccino frío",descripcion:"Café cremoso con hielo.",precio:5600,imagen:"cafe cappuccino.jfif"},
{nombre:"Café americano frío",descripcion:"Refrescante, simple y aromático.",precio:4500,imagen:"CAFEamericano.jpg"},
{nombre:"Café con cupcake",descripcion:"Una combinación dulce para disfrutar.",precio:7500,imagen:"CAFE Y CUPCAKE.jpg"}]}}},
sandwiches:{titulo:"Sandwiches",descripcion:"Opciones saladas para acompañar tu café.",items:[
{nombre:"Sandwich clásico",descripcion:"Una opción rica y práctica.",precio:8500,imagen:"sandwiches.jpg"},
{nombre:"Sandwich especial",descripcion:"Pan dorado y relleno sabroso.",precio:9500,imagen:"sandwiches (2).jpg"},
{nombre:"Sandwich para compartir",descripcion:"Ideal para disfrutar acompañado.",precio:11500,imagen:"sandwiches (3).jpg"},
{nombre:"Sandwich de la casa",descripcion:"Una combinación para cualquier momento.",precio:9800,imagen:"sandiwch.jfif"}]},
tortas:{titulo:"Tortas",descripcion:"Un toque dulce para hacer más lindo el día.",items:[
{nombre:"Torta clásica",descripcion:"Porción de torta casera.",precio:6500,imagen:"torta.jpg"},
{nombre:"Torta de chocolate",descripcion:"Húmeda y bien chocolatera.",precio:7000,imagen:"torta chocolate.jfif"},
{nombre:"Torta especial",descripcion:"Una porción para darse un gusto.",precio:7500,imagen:"TORTA (2).jpg"},
{nombre:"Torta de limón",descripcion:"Dulce y cítrica, con sabor fresco.",precio:6800,imagen:"LIMON PORCION TORTA.jpg"}]},
budines:{titulo:"Budines",descripcion:"Budines caseros, perfectos para compartir.",items:[
{nombre:"Budín clásico",descripcion:"Un budín suave para acompañar el mate o café.",precio:5000,imagen:"BUDIN.jpg"},
{nombre:"Budín con chips",descripcion:"Con chips de chocolate.",precio:5800,imagen:"BUDIN CON CHIPS.jpg"},
{nombre:"Budín de naranja",descripcion:"Aromático y cítrico.",precio:5200,imagen:"BUDIN DE NARANJA.jpg"},
{nombre:"Budín de Oreo",descripcion:"Una versión golosa con Oreo.",precio:6000,imagen:"BUDIN DE OREO.jpg"},
{nombre:"Budín de limón",descripcion:"Fresco, suave y casero.",precio:5200,imagen:"BUDIN DELIMON.jpg"},
{nombre:"Budín marmolado",descripcion:"La mezcla clásica de vainilla y chocolate.",precio:5600,imagen:"BUDIN MARMOLADO.jpg"}]}};
const modal=document.getElementById("modal"),modalTitulo=document.getElementById("modal-titulo"),modalDescripcion=document.getElementById("modal-descripcion"),modalProductos=document.getElementById("modal-productos"),subcategorias=document.getElementById("subcategorias"),lista=document.getElementById("lista"),totalTexto=document.getElementById("total"),cantidadTexto=document.getElementById("cantidad"),mensaje=document.getElementById("mensaje"),checkoutModal=document.getElementById("checkout-modal");
let pedido=[];
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>abrirCategoria(b.dataset.categoria)));
function abrirCategoria(categoria){const elegida=productos[categoria];if(!elegida)return;modalTitulo.textContent=elegida.titulo;modalDescripcion.textContent=elegida.descripcion;subcategorias.innerHTML="";modalProductos.innerHTML="";
if(elegida.subcategorias){Object.entries(elegida.subcategorias).forEach(([clave,sub],i)=>{const b=document.createElement("button");b.className="subcategory-button"+(i===0?" active":"");b.textContent=sub.titulo;b.addEventListener("click",()=>{subcategorias.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");dibujarProductos(sub.items)});subcategorias.appendChild(b)});dibujarProductos(elegida.subcategorias.calientes.items)}else dibujarProductos(elegida.items);
modal.classList.add("visible");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";document.getElementById("cerrar-modal").focus()}
function dibujarProductos(items){modalProductos.innerHTML="";items.forEach(p=>{const card=document.createElement("article");card.className="product-card";const img=document.createElement("img");img.src=p.imagen;img.alt=p.nombre;img.loading="lazy";img.onerror=()=>img.style.display="none";const body=document.createElement("div");body.className="product-card-body";const h=document.createElement("h3");h.textContent=p.nombre;const d=document.createElement("p");d.textContent=p.descripcion;const price=document.createElement("span");price.className="price";price.textContent=pesos(p.precio);const add=document.createElement("button");add.className="add-button";add.textContent="＋ Agregar";add.addEventListener("click",()=>{agregar(p);add.textContent="✓ Agregado";setTimeout(()=>add.textContent="＋ Agregar",900)});body.append(h,d,price,add);card.append(img,body);modalProductos.appendChild(card)})}
function cerrarModal(){modal.classList.remove("visible");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function cerrarCheckout(){checkoutModal.classList.remove("visible");checkoutModal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("cerrar-modal").addEventListener("click",cerrarModal);modal.addEventListener("click",e=>{if(e.target===modal)cerrarModal()});document.getElementById("cerrar-checkout").addEventListener("click",cerrarCheckout);checkoutModal.addEventListener("click",e=>{if(e.target===checkoutModal)cerrarCheckout()});document.addEventListener("keydown",e=>{if(e.key==="Escape"){cerrarModal();cerrarCheckout()}});
function agregar(p){pedido.push({...p,id:Date.now()+Math.random()});dibujarPedido();mensaje.textContent=p.nombre+" se agregó al carrito."}
function eliminar(id){pedido=pedido.filter(p=>p.id!==id);dibujarPedido()}
function pesos(n){return "$"+n.toLocaleString("es-AR")}
function subtotal(){return pedido.reduce((s,p)=>s+p.precio,0)}
function dibujarPedido(){lista.innerHTML="";if(!pedido.length){const li=document.createElement("li");li.className="empty-state";li.textContent="Todavía no agregaste nada. ¡Elegí algo rico!";lista.appendChild(li)}
pedido.forEach(p=>{const li=document.createElement("li"),info=document.createElement("div");info.className="item-info";const name=document.createElement("strong");name.textContent=p.nombre;const price=document.createElement("small");price.textContent=pesos(p.precio);info.append(name,price);const remove=document.createElement("button");remove.className="remove-button";remove.textContent="Quitar";remove.addEventListener("click",()=>eliminar(p.id));li.append(info,remove);lista.appendChild(li)});
totalTexto.textContent=subtotal().toLocaleString("es-AR");cantidadTexto.textContent=pedido.length}
function actualizarTotales(){const sub=subtotal(),envio=sub>=20000||sub===0?0:1800;document.getElementById("checkout-subtotal").textContent=pesos(sub);document.getElementById("costo-envio").textContent=envio===0?"Gratis":pesos(envio);document.getElementById("checkout-total").textContent=pesos(sub+envio);document.getElementById("envio-mensaje").textContent=sub>=20000?"¡Tu compra supera los $20.000: el envío es gratis!":"El envío cuesta $1.800. ¡En compras desde $20.000 es gratis!"}
document.getElementById("confirmar").addEventListener("click",()=>{if(!pedido.length){mensaje.textContent="Primero agregá algo rico al carrito ☕";return}actualizarTotales();document.getElementById("checkout-mensaje").textContent="";checkoutModal.classList.add("visible");checkoutModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"});
document.getElementById("checkout-form").addEventListener("submit",e=>{e.preventDefault();if(!pedido.length)return;const data=new FormData(e.currentTarget),envio=subtotal()>=20000?0:1800;document.getElementById("checkout-mensaje").textContent=`Pedido de demostración preparado para ${data.get("nombre")}. Total: ${pesos(subtotal()+envio)}. Pago elegido: ${data.get("pago")}. No se enviaron datos ni se realizó ningún cobro.`});
dibujarPedido();