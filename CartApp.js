const tableCarrito = document.querySelector('#lista-carrito tbody');

tableCarrito.addEventListener('click', eliminarProducto);

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

/* carga/genera dinamicamente Cards */
document.addEventListener("DOMContentLoaded", () => {
	const list = document.querySelector('#product-list');

	productos.forEach(product => {
		const col = document.createElement('div');
		col.className = "col";
		list.appendChild(col);

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
		// Modal
		list.innerHTML += `
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
	})
});