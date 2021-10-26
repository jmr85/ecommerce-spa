class Product {
	constructor(name, category, price, image) {
		this.name = name;
		this.category = category;
		this.price = price;
		this.image = image;
	}
	setName = (x) => this.name = x;
	getName = () => this.name;

	setCategory = (x) => this.category = x;
	getCategory = () => this.category;

	setPrice = (x) => this.price = x;
	getPrice = () => this.price;

	setImage = (x) => this.image = x;
	getImage = () => this.image;
}