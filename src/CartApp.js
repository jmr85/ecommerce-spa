const listaProductos = $('#lista-productos');
const tableCarrito = document.querySelector('#lista-carrito tbody');
const formBuscador = $('#formulario');
const btnVaciarCarrito = $('#vaciar-carrito');

let badgeCount = $('#badge-count');

let carrito;

$(document).ready(function () {
	const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

	carrito = carritoStorage || [];

	if (carrito.length === 0) {
		$('.img-carrito').hide();
		$('#badge-count').hide();
	} else {
		$('.img-carrito').show();
		$('#badge-count').show();
	}
	actualizarCarritoHTML();

	productList(productos);
});

listaProductos.click(agregarProducto);
formBuscador.submit(buscarProductos);
tableCarrito.addEventListener('click', eliminarProducto);
btnVaciarCarrito.click(vaciarCarrito);

function vaciarCarrito(e) {
	e.preventDefault();
	// Vaciar el arreglo carrito;
	carrito = [];

	// Actualizar HTML del carrito
	actualizarCarritoHTML();
	// Actualizar el storage del carrito
	actualizarStorage();
	$('.img-carrito').hide();
	$('#badge-count').hide();
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
		if (carrito.length === 0) {
			$('.img-carrito').hide();
			$('#badge-count').hide();
		}
	}
}
function buscarProductos(e) {
	e.preventDefault();

	// Leer el texto del input
	const inputBuscador = $('#buscador').val();
	const inputFiltrado = inputBuscador.toLowerCase().trim();

	const resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(inputFiltrado));

	console.log(resultado);
	productList(resultado);
	formBuscador.trigger("reset");
}
function agregarProducto(e) {
	e.preventDefault();

	// if($('#carrito').is(":hidden")){
	// 	$('#carrito').show();
	// }

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

	if (carrito.length > 0) {
		$('.img-carrito').show();
		$('#badge-count').show();
	}
	tableCarrito.innerHTML = '';

	//count badge
	const { cant } = carrito.reduce((acumulador, producto) => {
		acumulador.cant += producto.cantidad;
		return acumulador;
	}, { cant: 0 });

	badgeCount.text(cant);

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
function productList(listadoProductos) {

	listaProductos.html('');

	listadoProductos.forEach(producto => {
		const html = `
			<div class="card">
				<img src="${producto.imagen}" class="imagen-producto u-full-width">

				<div class="info-card">
					<h4>${producto.nombre}</h4>
					<p class="precio"><span class="u-pull-right">${Currency.formatARS(producto.precio)}</span></p>
					<a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${producto.id}">Agregar al Carrito</a>
				</div>
			</div>
		`

		listaProductos.append(html);
	});

}