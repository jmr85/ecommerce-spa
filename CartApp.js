const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector('#lista-carrito tbody');
const formBuscador = document.querySelector('#formulario');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

let carrito;

document.addEventListener("DOMContentLoaded", () => {
	productList(productos);
});

listaProductos.addEventListener('click', agregarProducto);
formBuscador.addEventListener('submit', buscarProductos);
tableCarrito.addEventListener('click', eliminarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito(e) {
	e.preventDefault();
	// Vaciar el arreglo carrito;
	carrito = [];

	// Actualizar HTML del carrito
	actualizarCarritoHTML();
	// Actualizar el storage del carrito
	actualizarStorage();
}

function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.nodeName === "A" || e.target.nodeName === "I") {
		// Borrar el producto del arreglo carrito
		const id = e.target.closest('a').dataset.id;
		// const id = e.target.closest('a').getAttribute('data-id');

		const carritoFiltrado = carrito.filter(producto => producto.id !== id);
		carrito = [...carritoFiltrado];
		// console.log(carritoFiltrado);

		// Actualizar HTML del carrito
		actualizarCarritoHTML();
		// Actualizar el storage del carrito
		actualizarStorage();
	}
}

function agregarProducto(e) {
	e.preventDefault();

	if (e.target.classList.contains("agregar-carrito")) {
		const productCard = e.target.parentElement.parentElement;

		const productoAgregado = {
			imagen: productCard.querySelector('img.imagen-producto').src,
			nombre: productCard.querySelector('h4').textContent,
			precio: productCard.querySelector('.precio span').textContent,
			cantidad: 1,
			id: productCard.querySelector('a').dataset.id
		}

		// Chequear si productoAgregado existe en el carrito

		const existe = carrito.some(producto => producto.id === productoAgregado.id);
		// const index = carrito.findIndex( producto => producto.id === productoAgregado.id );

		//if(index !== -1) {
		// carrito[index].cantidad++
		//}
		if (existe) {
			const nuevoCarrito = carrito.map(producto => {
				if (producto.id === productoAgregado.id) {
					producto.cantidad++;
				}
				return producto;
			});
			carrito = [...nuevoCarrito];
			// carrito = nuevoCarrito;
		} else {
			// Se agrega por primera vez
			carrito.push(productoAgregado);
			// carrito = [...carrito, productoAgregado] // = push
		}

		// Renderizo la tabla con los items del carrito
		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function actualizarCarritoHTML() {
	tableCarrito.innerHTML = '';

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;

		tableCarrito.innerHTML += `
				<tr>
					<td>
						<img src="${imagen}" width="100%">
					</td>
					<td>
						${nombre}
					</td>
					<td>
						${precio}
					</td>
					<td>
						${cantidad}
					</td>
					<td>
						<a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
					</td>
				</tr>
			`;
	});
}

function actualizarStorage() {
	// TODO
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

/* carga/genera dinamicamente Cards */
function productList(productos) {

	productos.forEach(product => {
		const col = document.createElement('div');
		col.className = "col";
		listaProductos.appendChild(col);

		const card = document.createElement('div');
		card.className = "card";
		col.appendChild(card);

		const cardImg = document.createElement('img');
		cardImg.className = "card-img-top";
		cardImg.src = product.imagen;
		card.appendChild(cardImg);

		const cardBody = document.createElement('div');
		cardBody.className = "card-body";
		card.appendChild(cardBody);

		const cardH5 = document.createElement('h5');
		cardH5.className = "card-title";
		cardH5.innerHTML = product.nombre;
		cardBody.appendChild(cardH5);

		const cardP = document.createElement('p');
		cardP.className = "card-title";
		cardP.innerText = Currency.formatARS(product.precio);
		cardBody.appendChild(cardP);

		const cardButton = document.createElement('button');
		cardButton.className = "btn btn-primary";
		cardButton.innerText = "Agregar al carrito";
		cardButton.setAttribute('data-bs-toggle', "modal");
		cardButton.setAttribute('data-bs-target', "#exampleModal");
		card.appendChild(cardButton);

		const modal = `
				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Felicitaciones!</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								Has agregado el producto al carrito
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
							</div>
						</div>
					</div>
				</div>
		`;

		listaProductos.innerHTML += modal;
	})
}