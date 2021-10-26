/**Precios Notebooks Notebook*/
const compuAcer16GB = new Product('Acer 16GB', 'notebooks', 100000, 'https://images.fravega.com/f500/ab427d006591e6e75c8d97bc64652b0a.jpg');
const compuDell8GB = new Product('Dell 8GB', 'notebooks', 80000, 'https://images.bidcom.com.ar/resize?src=https://www.bidcom.com.ar/publicacionesML/productos/NOT00229/1000x1000-NOT00229.jpg&w=500&q=100');
const compuLenovo32GB = new Product('Lenovo 32GB', 'notebooks', 150000, 'https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-7-15-intel-subseries-hero.png?context=bWFzdGVyfHJvb3R8MzYwMDg3fGltYWdlL3BuZ3xoMzAvaDI0LzEwNjc2OTcyNDIxMTUwLnBuZ3wxMGU0ZDMzNmJmZGExYWMzN2YyZTNlOGFkMDljOGY3MmRlY2U5NzE4Y2IxMjg0NjJkZDYwOGViOWQ1NTczMjY0');

/**Precios Teclados*/
const tecladoMembrana = new Product('Teclado Membrana Logic', 'teclados', 6000, 'https://http2.mlstatic.com/D_NQ_NP_827124-MLA43916275590_102020-O.webp');
const tecladoMecanico = new Product('Teclado Mecanico Melon', 'teclados', 8000, 'https://http2.mlstatic.com/D_NQ_NP_686280-MLA45231960835_032021-O.webp');
const tecladoMecanicoNisuta = new Product('Teclado Semi-Mecanico Gamer Nisuta', 'teclados', 3500, 'https://http2.mlstatic.com/D_NQ_NP_701920-MLA40450277038_012020-O.webp');

/** Precios Libros */
const libroJavaAFondo = new Product('Libro Java A Fondo', 'libros', 5000, 'https://http2.mlstatic.com/D_NQ_NP_837955-MLA43568219240_092020-O.webp');
const libroBaseDeDatos = new Product('Libro Base De Datos', 'libros', 6000, 'https://http2.mlstatic.com/D_NQ_NP_181305-MLA20856576976_082016-O.webp');
const libroReact = new Product('Libro Ejercicios Practicos Con React', 'libros', 4500, 'https://http2.mlstatic.com/D_NQ_NP_702961-MLA41815470285_052020-O.webp');

const productsList = [
	compuDell8GB,
	compuLenovo32GB,
	compuAcer16GB,
	tecladoMembrana,
	tecladoMecanico,
	tecladoMecanicoNisuta,
	libroJavaAFondo,
	libroBaseDeDatos,
	libroReact
];

/* carga/genera dinamicamente Cards */
document.addEventListener("DOMContentLoaded", () => {
	const list = document.querySelector('#product-list');

	productsList.forEach(product => {
		const col = document.createElement('div');
		col.className = "col";
		list.appendChild(col);

		const card = document.createElement('div');
		card.className = "card";
		col.appendChild(card);

		const cardImg = document.createElement('img');
		cardImg.className = "card-img-top";
		cardImg.src = product.getImage();
		card.appendChild(cardImg);

		const cardBody = document.createElement('div');
		cardBody.className = "card-body";
		card.appendChild(cardBody);

		const cardH5 = document.createElement('h5');
		cardH5.className = "card-title";
		cardH5.innerHTML = product.getName();
		cardBody.appendChild(cardH5);

		const cardP = document.createElement('p');
		cardP.className = "card-title";
		cardP.innerText = Currency.formatARS(product.getPrice());
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

let menu;
let carrito = [];

const dialog = new Dialog();

do {
	menu = dialog.readOption(`
Ingresa una de las siguientes opciones:
1 - Notebooks
2 - Teclados
3 - Libros

${carrito.length > 0 ? 'VALOR CARRITO: ' + Currency.formatARS(carrito.map(item => item.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)) : ''}
${carrito.length > 0 ? 'PARA FINALIZAR COMPRA INGRESA LETRA: (s)' : ''}
0 - Finalizar programa
`);
	// console.log(menu);
	if (menu === 's' && carrito.length > 0) {
		let pricingHeader = document.querySelector('.pricing-header');
		let newUl = document.createElement('ul');
		newUl.className = 'list-group';
		pricingHeader.appendChild(newUl);
		newUl.innerHTML = `
		<li class="list-group-item" style="margin: 2rem">
		${carrito.length === 1 ? 'Producto: ' : 'Productos: '} 
			${carrito.map(item =>
			item.name + ' '
		).sort(function (a, b) {
			if (a > b) {
				return 1;
			}
			if (a < b) {
				return -1;
			}
			return 0;
		})}
		</li>
			<li class="list-group-item">Subtotal: ${Currency.formatARS(carrito.map(item => item.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0))} </li>
			<li class="list-group-item">Iva: ${Currency.formatARS(Calculo.iva(carrito.map(item => item.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)))}</li>
			<li class="list-group-item">Total: ${Currency.formatARS(Calculo.total(carrito.map(item => item.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)))}</li>

			<div class="alert alert-success" role="alert">
				Gracias por su compra!
			</div>
		`;
		break;
	}
	switch (menu) {
		case 1:

			do {
				menu = dialog.readOption(`
${arrayNotebooks = productsList
						.filter(item => item.category === 'notebooks')
						.map((item, index) => {
							return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
						})

						.join(" \n")
					}

0 - Finalizar programa

`);

				if (Number.isNaN(menu)) {
					alert(`
Ingrese valor numerico
Click en Aceptar para volver a cargar valor
					`);
				}
			} while (Number.isNaN(menu));


			if (Number(menu) === 1) {
				carrito.push(compuDell8GB);
			} else if (Number(menu) === 2) {
				carrito.push(compuLenovo32GB);
			} else {
				carrito.push(compuAcer16GB);
			}

			break;
		case 2:
			do {
				menu = dialog.readOption(`
${arrayTeclados = productsList
						.filter(item => item.category === 'teclados')
						.map((item, index) => {
							return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
						})
						.join(" \n")}
0 - Finalizar programa
`);

				if (isNaN(menu)) {
					alert(`
Ingrese valor numerico
Click en Aceptar para volver a cargar valor
`);
				}
			} while (isNaN(menu));


			if (Number(menu) === 1) {
				carrito.push(tecladoMembrana);
			} else if (Number(menu) === 2) {
				carrito.push(tecladoMecanico);
			} else {
				carrito.push(tecladoMecanicoNisuta);
			}
			break;
		case 3:
			do {
				menu = dialog.readOption(`
${arrayLibros = productsList
						.filter(item => item.category === 'libros')
						.map((item, index) => {
							return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
						})
						.join(" \n")}
0 - Finalizar programa
`);

				if (isNaN(menu)) {
					alert(`
Ingrese valor numerico
Click en Aceptar para volver a cargar valor
`);
				}
			} while (isNaN(menu));


			if (Number(menu) === 1) {
				carrito.push(libroJavaAFondo);
			} else if (Number(menu) === 2) {
				carrito.push(libroBaseDeDatos);
			} else {
				carrito.push(libroReact);
			}
			break;
	}

} while (menu != 0);