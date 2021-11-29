let productos = getAllProducts();
let html;

window.addEventListener('hashchange', router);
document.querySelector('.nav-items li a:first-child').addEventListener('click', e => {
	e.preventDefault();
	location.hash = "";
	router();
})
document.addEventListener('DOMContentLoaded', router);


const CheckoutComponent = {
	render() {
		return `
			<div class="container animate__animated animate__fadeInDown">
				<div class="row">
					<div class="col-md-12">
						<h1>Checkout</h1>
						<div class="row">
							<div class="col-md-6">
								/*tabla de productos de carrito*/
								<table class="table">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Producto</th>
											<th scope="col">Precio</th>
											<th scope="col">Cantidad</th>
											<th scope="col">Total</th>
										</tr>
									</thead>
									<tbody>
										${forCartCheckOut()}
									</tbody>
								</table>								
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="nombre-tarjeta">Nombre en la tarjeta</label>
									<input type="text" class="form-control" id="nombre-tarjeta" placeholder="Nombre en la tarjeta">
								</div>
								<div class="form-group">
									<label for="numero-tarjeta">Número de tarjeta</label>
									<input type="text" class="form-control" id="numero-tarjeta" placeholder="Número de tarjeta">
								</div>
								<div class="form-group">
									<label for="fecha-vencimiento">Fecha de vencimiento</label>
									<input type="text" class="form-control" id="fecha-vencimiento" placeholder="Fecha de vencimiento">
								</div>
								<div class="form-group">
									<label for="codigo-seguridad">Código de seguridad</label>
									<input type="text" class="form-control" id="codigo-seguridad" placeholder="Código de seguridad">
								</div>
								<div class="form-group">
									<label for="numero-tarjeta">Número de tarjeta</label>
									<input type="text" class="form-control" id="numero-tarjeta" placeholder="Número de tarjeta">
								</div>
								<div class="form-group">
									<label for="fecha-vencimiento">Fecha de vencimiento</label>
									<input type="text" class="form-control" id="fecha-vencimiento" placeholder="Fecha de vencimiento">
								</div>
								<div class="form-group">
									<label for="codigo-seguridad">Código de seguridad</label>
									<input type="text" class="form-control" id="codigo-seguridad" placeholder="Código de seguridad">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-primary">Pagar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
`}
}

/* Esta funcion se utiliza dentro de <table> de CheckoutComponent, imprime la variable carrito de CartApp */
const forCartCheckOut = () => {
		let htmlChekOut = '';

		carrito.forEach(item => {
			htmlChekOut += `
				<tr>
					<th scope="row">${item.id}</th>
					<td>${item.nombre}</td>
					<td>${item.precio}</td>
					<td>${item.cantidad}</td>
				</tr>
			`
		});

		return htmlChekOut;
}

const HomeComponent = {
	render() {
		return `
			<div class="container-fluid">
				<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
					</div>
					<div class="carousel-inner">
					<div class="carousel-item active">
						<img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" class="d-block w-100" alt="...">
					</div>
					<div class="carousel-item">
						<img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" class="d-block w-100" alt="...">
					</div>
					<div class="carousel-item">
						<img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" class="d-block w-100" alt="...">
					</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		`
	}
}

const NosotrosComponent = {
	render() {
		return `
			
			<div class="container">
			<h1>Acerca de Nosotros</h1>
			To edit this page, log in to your control panel and go to Storefront › Web Pages. Click Edit next to the Shipping & Returns page and you can change this text. A sample returns policy is shown below which you can edit as needed.

			Returns Policy
			
			You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).
			
			You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).
			
			If you need to return an item, please Contact Us with your order number and details about the product you would like to return. We will respond quickly with instructions for how to return items from your order.
			
			Shipping
			
			We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.
			
			When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose, shipping date estimates may appear on the shipping quotes page.
			
			Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound.
			</div>
		`
	}
}

const TiendaComponent = {
	render() {
		html = '';

		productos.forEach(item => {
			html += `
				<div class="card">
				<img src="${item.image}" class="imagen-producto u-full-width">
					<div class="info-card">
						<h4>${item.title}</h4>
						<p class="precio"><span class="u-pull-right">${Currency.formatARS(item.price)}</span></p>
						<a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${item.id}">Agregar al Carrito</a>
					</div>
				</div>
			`
		});

		return html;
	}
}

const ContactoComponent = {
	render() {
		return `
			
			<div class="container-fluid">
				<h1>Contacto</h1>
				<form id="form-contacto" needs-validation>  
						<label for="nombre">Name</label>
						<br>
						<input type="text" name="nombre" id="nombre" placeholder="Enter your name" required>
						<br> 
						<div class="invalid-feedback">
							Please choose a username.
					  	</div>
						<label for="email">Email</label>
						<br>
						<input type="email" name="email" id="email" placeholder="Enter your email" required>
						 <br>
						<label for="subject">Subject</label>
						<br>
						<input type="text" name="subject" id="subject" placeholder="Enter a subject" required>
						<br>
						<label for="question">Question</label>
						<br>
						<textarea name="question" id="question" cols="30" rows="5" maxlength="500"
							placeholder="Write your question"></textarea>

						<button class="btn-submit default" onclick="submitForm(event)" type="submit">Submit</button>			
            	</form>
			</div>
		`
	}
}
const validar = () => {
	/* mail */
	let mail = document.getElementById("email").value
	let mail_format = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	/*nombre */
	let nombre = document.getElementById("nombre").value
	/*subject */
	let subject = document.getElementById("subject").value
	/*question*/
	let question = document.getElementById("question").value

	if (mail !== "" && mail.match(mail_format) && nombre.length > 5 && subject.length > 5 && question.length > 10) {
		return true;
	} else {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			html:
				`
						${nombre.length > 5 ? `
						<div class="alert alert-success" role="alert">
							Nombre es valido
						</div>
						` : `
						<div class="alert alert-warning" role="alert">
							Nombre minimo 6 caracteres
						</div>
						`}
						${mail !== "" && mail.match(mail_format) ? `
						<div class="alert alert-success" role="alert">
							Email is valido
						</div>
						` : `
						<div class="alert alert-warning" role="alert">
							Email vacio ó no es valido
						</div>
						`}
						
						${subject.length > 5 ? `
						<div class="alert alert-success" role="alert">
							Asunto es valido
						</div>
						` : `
						<div class="alert alert-warning" role="alert">
							Asunto minimo 6 caracteres
						</div>
						`}
						
						${question.length > 10 ? `
						<div class="alert alert-success" role="alert">
							Pregunta es valida
						</div>
						` : `
						<div class="alert alert-warning" role="alert">
							Pregunta minimo 11 caracteres
						</div>
						`}				
			`,
			confirmButtonColor: '#426be4'
		})
		return false;
	}

}
const submitForm = (event) => {
	event.preventDefault();
	if (validar()) {
		let form = document.getElementById('form-contacto');
		form.action = 'https://formspree.io/f/xoqyblrz';
		form.method = 'POST';
		form.submit();
		console.log('submit');
	}

}

const ErrorComponent = {
	render() {
		return `
			<h1>Error 404</h1>
			<div class="container">
			<h2>La página que busca no existe</h2>
				<p>Visite nuestra tienda!</p>
			</div>
		`
	}
}

const routes = [
	{ path: '/', component: HomeComponent },
	{ path: '/nosotros', component: NosotrosComponent },
	{ path: '/tienda', component: TiendaComponent },
	{ path: '/contacto', component: ContactoComponent },
	{ path: '/checkout', component: CheckoutComponent }
]

function parseLocation() {
	// Extraigo el path de la URL
	return location.hash.slice(1) || '/';
}

function findComponent(userPath) {
	// Busco el componente asociado al path
	return routes.find(route => route.path === userPath);
}

function router() {
	// Extraigo el path de la URL
	const userPath = parseLocation();

	// Busco el componente asociado al path
	const { component = ErrorComponent } = findComponent(userPath) || {};

	// const app = document.querySelector("#app");
	app.innerHTML = component.render();
}

/* carga/genera dinamicamente Cards */
function productListFilter(productoResult) {
	let html;
	app.innerHTML = '';

	productoResult.forEach(item => {
		html = `
			<div class="card">
			<img src="${item.image}" class="imagen-producto u-full-width">

			<div class="info-card">
				<h4>${item.title}</h4>
				<p class="precio"><span class="u-pull-right">${Currency.formatARS(item.price)}</span></p>
				<a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${item.id}">Agregar al Carrito</a>
				</div>
		</div>
		`

		app.innerHTML += html;
	});

	return html;

}