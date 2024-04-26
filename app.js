var productos=["coca","galleta","helado","jugo","papas","chocolate","yakult","fuzetea"];
var precios=[18,20,50,13,18,15,7,19];

var selectProductos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProducto");
var precioProductos=document.getElementById("precioProducto");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");
var carrito=new Array();

var posProducto=-1;
var cantidadProducto=0;
let total=0;


const cargarProductos=()=>{
    let optionProductos="";
    productos.forEach((producto) => {
        optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`;
    
    })
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
}
selectProductos.onchange=()=>{
    cargarPrecio();
}
const cargarPrecio=()=>{
    imgProductos.src=`${selectProductos.value.toLowerCase()}.png`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}


agregarCarrito.onclick=()=>{
    cantidadProducto=parseInt(inputCantidad.value);
    posProducto=selectProductos.selectedIndex;
    if (checarItems(posProducto,cantidadProducto)) {
    imprimirTabla();
    }
    else{
    let item= new Array()
    item.push(posProducto);
    item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
}
}
const checarItems=(pos,cant)=>{
  let x=false;
  carrito.forEach(item=>{
    if (item[0]==pos) {
      item[1]=item[1]+cant;
      x=true;
      
    }
  })
  return x;
}

const imprimirTabla=()=>{
     total=0;
    let divCarrito=document.getElementById("carrito");
    let tablaHTML= `<table class="table w-100 m-auto">
    <tr>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>CANTIDAD</td>
    <td>IMPORTE</td>
    <td>*</td>
    </tr>
    `;
    let index=0;
    carrito.forEach(item=>{
        tablaHTML+=`
        <tr>
        <td>${productos[item[0]]}</td>
        <td>$ ${precios[item[0]]}.00</td>
        <td>${item[1]}</td>
        <td>${(precios[item[0]]*item[1])}</td>
        <td><button class="btn btn-danger" onclick="eliminarProducto(${index[0]})">del</button></td>
        </tr>
        `
        index++;
        total+=(precios[item[0]]*item[1]);
    })
    tablaHTML+= `
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td><h3>$ ${total}.00</h3></td>
     <td><button class="btn btn-danger" onclick="pagarr(${index})">pagar</button></td>
    </tr>`
   index++;
    divCarrito.innerHTML=tablaHTML;
}



const eliminarProducto=(index)=>{
  Swal.fire({
  title: "estas seguro de eliminar?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "si",
  denyButtonText: `No`
}).then((result) => {
  
  if (result.isConfirmed) {

  carrito.splice(index,1);
  imprimirTabla();
}
});
}

const pagarr=async()=>{
    
    await Swal.fire({
    title:"PAGA AQUI",
    input: "text",
    text:"Con cuanto vas a pagar??",
    showCancelButton:true,
    inputValidator:(value)=>{
    if(!value){
    return "No se puede!";
    }
    if(value>=total){
    let c=parseFloat(value) - total;
    Swal.fire({
    title:"CAMBIO",
    text:"Tu cambio es de: $ "+c,
    icon:"success"
    });
    }else{
    Swal.fire({
    title:"Cambio",
    text:"ERROR",
    icon:"error"
    });
    }
    }
    });
    }

