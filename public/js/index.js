const expresion = document.getElementById("expresion");
const calcular = document.getElementById("calcular");
const borrar = document.getElementById("borrar");
const resultadoInfija = document.getElementById("infija");
const resultadoPrefija = document.getElementById("prefija");
const resultadoPostfija = document.getElementById("postfija");

// PRIORIDADES
const prioridad = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
};

// BUSCAR OPERADOR PRINCIPAL
const buscarOperador = (texto) => {

    let nivel = 0;
    let posicion = -1;
    let prioridadActual = 3;

    for (let i = 0; i < texto.length; i++) {

        let simbolo = texto[i];

        if (simbolo === "(") {
            nivel++;
        }

        if (simbolo === ")") {
            nivel--;
        }

        if (nivel === 0 && prioridad[simbolo]) {

            if (prioridad[simbolo] <= prioridadActual) {

                prioridadActual = prioridad[simbolo];
                posicion = i;

            }
        }
    }

    return posicion;
};

// CREAR ÁRBOL
const crearArbol = (texto) => {

    let nivel = 0;

    if (texto[0] === "(" && texto[texto.length - 1] === ")") {

        for (let i = 0; i < texto.length - 1; i++) {

            if (texto[i] === "(") {
                nivel++;
            }

            if (texto[i] === ")") {
                nivel--;
            }

            if (nivel === 0) {
                break;
            }
        }

        if (nivel !== 0) {
            texto = texto.slice(1, texto.length - 1);
        }
    }

    let posicion = buscarOperador(texto);

    if (posicion === -1) {
        return texto;
    }

    return {
        operador: texto[posicion],

        izquierda: crearArbol(
            texto.slice(0, posicion)
        ),

        derecha: crearArbol(
            texto.slice(posicion + 1)
        )
    };
};

// INFIJA
const infija = (arbol) => {

    if (typeof arbol === "string") {
        return arbol;
    }

    return "(" +
        infija(arbol.izquierda) +
        arbol.operador +
        infija(arbol.derecha) +
        ")";
};

// PREFIJA
const prefija = (arbol) => {

    if (typeof arbol === "string") {
        return arbol;
    }

    return arbol.operador +
        prefija(arbol.izquierda) +
        prefija(arbol.derecha);
};

// POSTFIJA
const postfija = (arbol) => {
    if (typeof arbol === "string") {
        return arbol;
    }

    return postfija(arbol.izquierda) +
        postfija(arbol.derecha) +
        arbol.operador;
};

// BOTÓN
calcular.addEventListener("click", () => {

    const operacion = expresion.value.replace(/\s/g, "");

    if (operacion === "") {
        return;
    }

    const arbol = crearArbol(operacion);

    resultadoInfija.textContent = infija(arbol);
    resultadoPrefija.textContent = prefija(arbol);
    resultadoPostfija.textContent = postfija(arbol);

});
borrar.addEventListener("click", () => {

    expresion.value = "";

    resultadoInfija.textContent = "";
    resultadoPrefija.textContent = "";
    resultadoPostfija.textContent = "";

})