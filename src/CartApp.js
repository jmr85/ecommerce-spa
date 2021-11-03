// const listaProductos = $('#lista-productos');
const app = document.querySelector("#app");
const tableCarrito = $('#lista-carrito tbody');
const formBuscador = $('#formulario');
const inputBuscador = $('#buscador');
const btnVaciarCarrito = $('#vaciar-carrito');
const navLinkAbout = $(".nav-link:contains('About')");

let badgeCount = $('#badge-count');

let carrito;

document.addEventListener("DOMContentLoaded", function () {
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
});

// listaProductos.click(agregarProducto);
app.addEventListener('click', agregarProducto);

inputBuscador.click(function () {
	$(this).css('border-color', '#426be4').delay(100);
	$(this).animate({
		width: '40rem',
	}, 'slow');
});

navLinkAbout.click(function () {
	console.log('click about');
	Swal.fire({
		title: 'About',
		html: 'Desarrollado por <b>Juan MartinRuiz</b>',
		confirmButtonColor: '#426be4',
		footer: 'Ciudad de Buenos Aires - Argentina'
	})
});

formBuscador.submit(buscarProductos);
tableCarrito.click(eliminarProducto);
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
	// $(a[href = '#/tienda']).click();
	// $('#linkTienda.nav-link').click();//*[@id="navbarScroll"]/ul/li[3]/a
	$('#linkTienda.nav-link').trigger('click');
	// Leer el texto del input
	const inputBuscador = $('#buscador').val();
	const inputFiltrado = inputBuscador.toLowerCase().trim();
	console.log("inputFiltrado: " + inputFiltrado, typeof inputFiltrado);

	const resultado = productos.filter(producto => producto.title.toLowerCase().includes(inputFiltrado));

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
			// imagen: $('img.imagen-producto').attr('src'),
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
	tableCarrito.html('');

	//count badge
	const { cant } = carrito.reduce((acumulador, producto) => {
		acumulador.cant += producto.cantidad;
		return acumulador;
	}, { cant: 0 });

	badgeCount.text(cant);

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;

		tableCarrito.append(`
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
			`);
	});

	$('.submenu').mouseover(function () {
		console.log('mouseover');
		$('#carrito').show(3000);
	});
}

function actualizarStorage() {
	// TODO
	localStorage.setItem('carrito', JSON.stringify(carrito));
}