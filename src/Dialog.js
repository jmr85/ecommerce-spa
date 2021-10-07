class Dialog {
    constructor(texto = "") {
        this.texto = texto;
    }
    readOption(textoCualquiera) {
        this.texto = textoCualquiera;
        let option, selection;

        selection = prompt(textoCualquiera);
        if (selection === 's') {
            // si ingresa letra s devuelve la funcion un string
            option = selection;
        } else if (selection === 'N') {
            // si ingresa letra N devuelve la funcion un string
            option = selection;
        } else if (selection === 'A') {
            // si ingresa letra A devuelve la funcion un string
            option = selection;
        } else if (selection === 'D') {
            // si ingresa letra D devuelve la funcion un string
            option = selection;
        } else {
            // si no devuelve numero
            option = Number(selection);
        }

        return option;
    }
}