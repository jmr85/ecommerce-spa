class Calculo {
	static financial = x => Number.parseFloat(x).toFixed(2)
	static iva = x => x * 0.21;
	static total = x => x + this.iva(x);
}