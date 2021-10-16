/**
 * 6.2 Desafio complementario: Ordenar un array de objetos

En esta entrega: 
 1. Valida y fuerza a que el user ingrese valor numerico con IF y DO-WHILE para que vuelva a cargar valores segun operacion.
 2. Tiene Objetos: Product.js, Calculo.js, Currency.js, y Dialog.js (ahi tiene leer opcion)
 3. Tiena una lista de productos.
 4. La lista de productos lo muestro dentro de cada menu categoria con metodos concatenados filter(), map() y join().  
 5. El carrito para esta ocasión no precise obejto ni función porque es una variable acumulador.
 6. Filtro en productos notebooks
 7. El carrito se muestra en el menu si tiene cargado al menos un producto.
 8. En el html hay un <script> para clickear boton recargar pagina.
 */


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

let carrito = 0, menu;

const dialog = new Dialog();

do {
	menu = dialog.readOption(`
Ingresa una de las siguientes opciones:
1 - Notebooks
2 - Teclados
3 - Libros
${carrito > 0 ? 'VALOR CARRITO: ' + Currency.formatARS(carrito) : ''}
${carrito > 0 ? 'PARA FINALIZAR COMPRA INGRESA LETRA: (s)' : ''}
0 - Finalizar programa
`);
	// console.log(menu);
	if (menu === 's' && carrito > 0) {
		let pricingHeader = document.querySelector('.pricing-header');
		let newUl = document.createElement('ul');
		newUl.className = 'list-group';
		pricingHeader.appendChild(newUl);
		newUl.innerHTML = `
			<li class="list-group-item">Subtotal: ${Currency.formatARS(carrito)} </li>
			<li class="list-group-item">Iva: ${Currency.formatARS(Calculo.iva(carrito))}</li>
			<li class="list-group-item">Total: ${Currency.formatARS(Calculo.total(carrito))}</li>

			<div class="alert alert-success" role="alert">
				Gracias por su compra!
			</div>
		`;

		// 		alert(`
		// Subtotal: ${Currency.formatARS(carrito)} 
		// Iva: ${Currency.formatARS(Calculo.iva(carrito))}
		// Total: ${Currency.formatARS(Calculo.total(carrito))}
		// Gracias por su compra!`);
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

Ordenar Por:
N - Nombre
A - Menor Precio
D - Mayor Precio

0 - Finalizar programa

`);

				if (Number.isNaN(menu)) {
					alert(`
Ingrese valor numerico
Click en Aceptar para volver a cargar valor
					`);
				}
			} while (Number.isNaN(menu));

			while (menu === 'N' || menu === 'A' || menu === 'D') {
				do {
					menu = dialog.readOption(`
	${menu === 'N' ? arrayNotebooks = productsList
							.sort((a, b) => a.getName() - b.getName())
							.filter(item => item.category === 'notebooks')
							.map((item, index) => {
								return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
							})
							.join(" \n")
							:
							menu === 'A' ? arrayNotebooks = productsList
								.sort(function (a, b) {
									if (a.getPrice() < b.getPrice()) {
										return -1;
									}
									if (a < b) {
										return 1;
									}
									// a must be equal to b
									return 0;
								})
								.filter(item => item.category === 'notebooks')
								.map((item, index) => {
									return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
								})
								.join(" \n")
								:
								arrayNotebooks = productsList
									.sort(function (a, b) {
										if (a.getPrice() > b.getPrice()) {
											return -1;
										}
										if (a < b) {
											return 1;
										}
										// a must be equal to b
										return 0;
									})
									.filter(item => item.category === 'notebooks')
									.map((item, index) => {
										return ++index + " - " + item.getName() + " " + Currency.formatARS(item.getPrice())
									})
									.join(" \n")


						}
	
	Ordenar Por:
	N - Nombre
	A - Menor Precio
	D - Mayor Precio
	
	0 - Finalizar programa
	
	`);

					if (Number.isNaN(menu)) {
						alert(`
	Ingrese valor numerico
	Click en Aceptar para volver a cargar valor
						`);
					}
				} while (Number.isNaN(menu));
			}

			if (Number(menu) === 1) {
				carrito += compuAcer16GB.getPrice();
			} else {
				carrito += compuDell8GB.getPrice();
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
				carrito += tecladoMembrana.getPrice();
			} else {
				carrito += tecladoMecanico.getPrice();
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


			if (menu === 1) {
				carrito += libroJavaAFondo.getPrice();
			} else {
				carrito += libroBaseDeDatos.getPrice();
			}
			break;
	}

} while (menu != 0);

alert("Programa finalizado");