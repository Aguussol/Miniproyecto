/* Creamos que los botones del producto seas reconocidos y agregue al carrito*/ 
/*querySelectorAll permite optner classe o id */ 
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

/*recorrera los botones y seleccionara en el que se dio clik*/ 
Clickbutton.forEach(btn => {
  /*EventListener sirve para ver el evento del click*/
   /*cada vez al dar click el addToCarritoItem añade el item al carrito*/ 
  btn.addEventListener('click', addToCarritoItem)
})

/*function addToCarritoItem funcion de agregar item
se define la matriz que debera agregar*/
function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}

/*Aca creamos la funcion de llenado de carrito*/
function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 500)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 

/*ya con la funcion de llenado e indica que debera adjuntar
le damos el estilo de la tabla o mas que todo utilizara validacion de datos para ir llenando el carrito
segun los items seleccionados*/
function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">  
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}
/*Aca indicamos que el carrito sera capaz de ir sumando las compras */
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("Q", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total Q${Total}
  `
  addLocalStorage()
}



/*Aca creamos la funcion de Vaciado de carrito*/
function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 500)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}
/*la funcion que nos sumara los totales incluyendo las que uno modifica en el carrito*/
function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}
/*Creamos una funcion que sea capaz de almacenar informacion aun si refrezcamos la pagina*/
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

function comprass(){
  location.href= "../pages/factura.html";
}

function Totals(){
Total = CarritoTotal()
}



