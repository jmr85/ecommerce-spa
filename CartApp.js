/**Precios Notebooks Notebook*/
const compuAcer16GB = new Product('Acer 16GB', 'notebooks', 100000);
const compuDell8GB = new Product('Dell 8GB', 'notebooks', 80000);
const compuLenovo32GB = new Product('Lenovo 32GB', 'notebooks', 150000);

/**Precios Teclados*/
const tecladoMembrana = new Product('Teclado Membrana Logic', 'teclados', 6000);
const tecladoMecanico = new Product('Teclado Mecanico Melon', 'teclados', 8000);
const tecladoMecanicoNisuta = new Product('Teclado Semi-Mecanico Gamer Nisuta', 'teclados', 3500);

/** Precios Libros */
const libroJavaAFondo = new Product('Libro Java A Fondo', 'libros', 5000);
const libroBaseDeDatos = new Product('Libro Base De Datos', 'libros', 6000);
const libroReact = new Product('Libro Ejercicios Practicos Con React', 'libros', 4500);

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