let productos = getAllProducts();
let html;

window.addEventListener('hashchange', router);
document.querySelector('.nav-items li a:first-child').addEventListener('click', e => {
	e.preventDefault();
	location.hash = "";
	router();
})
document.addEventListener('DOMContentLoaded', router);

const HomeComponent = {
	render() {
		return `
			<h1>Página principal</h1>
			<div class="container">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod temporibus necessitatibus rem? Eius eum omnis, alias, repellendus rerum, pariatur quae atque quisquam accusantium quibusdam iste deserunt laudantium sed odit perferendis.</p>
			</div>
		`
	}
}

const NosotrosComponent = {
	render() {
		return `
			<h1>Acerca de Nosotros</h1>
			<div class="container">
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ducimus quasi nisi impedit saepe, voluptate cupiditate nesciunt cumque alias voluptates vitae aliquam cum dicta, repellat necessitatibus soluta numquam a totam.</p>
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
						<p class="precio"><span class="u-pull-right">${item.price}</span></p>
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
			<h1>Contacto</h1>
			<div class="container">
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae debitis quia voluptatum optio. Unde molestiae dolorum vitae vero eaque ullam, assumenda tempore! Quas accusantium atque, iure beatae pariatur sint voluptas!</p>
			</div>
		`
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
	{ path: '/contacto', component: ContactoComponent }
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
				<p class="precio"><span class="u-pull-right">${item.price}</span></p>
				<a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${item.id}">Agregar al Carrito</a>
				</div>
		</div>
		`

		app.innerHTML += html;
	});

	return html;

}