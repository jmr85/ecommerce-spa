class Product {
	constructor(name, category, price) {
		this.name = name;
		this.category = category;
		this.price = price;
	}
	setName = (x) => this.name = x;
	getName = () => this.name;

	setCategory = (x) => this.category = x;
	getCategory = () => this.category;

	setPrice = (x) => this.price = x;
	getPrice = () => this.price;
}