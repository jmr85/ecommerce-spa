class Calculo {
	static iva = x => x * 0.21;
	static total = x => x + this.iva(x);
}