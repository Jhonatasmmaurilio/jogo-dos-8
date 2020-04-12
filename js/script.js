var arrInicial = [],
    arrObjetivo = [],
    infinito = 1000,
    arrNovo = [],
    arrVisitados = [];

arrInicial = [1, 2, 3, 0, 5, 6, 4, 7, 8];
arrInicial = [0, 1, 2, 7, 8, 3, 6, 5, 4];

arrObjetivo = [1, 2, 3, 4, 5, 6, 7, 8, 0];
arrObjetivo = [1, 2, 3, 8, 0, 4, 7, 6, 5];

arrNovo = [...arrInicial];
arrVisitados.push([...arrInicial]);

var i = 1;

do {
    console.log("%cNIVEL: " + i, "color: green");

    verificaPosicoes(arrNovo);
    var arrNovo = movimentar(arrNovo);

    i++;
} while (i < 7);

function movimentar(arr) {
    var posicao,
        movimentos,
        tam,
        arrTem,
        conjunto = [],
        p,
        pesos = [],
        menor;


    console.log("ESTADO");
    console.log("%c" + arr, "color:orange");
    console.log("add visitados");
    console.table(arrVisitados);

    posicao = arr.indexOf(0);
    movimentos = regraMovimento(posicao);

    console.log("%ctrocando...", "color: green");

    tam = movimentos.length;

    for (var i = 0; i < tam; i++) {
        arrTem = arr.slice();

        var p1 = arrTem[movimentos[i]];
        var p2 = arrTem[posicao];

        arrTem[posicao] = p1;
        arrTem[movimentos[i]] = p2;

        console.log(arrTem);

        pesos.push(calculaHeuristica(arrTem));
        conjunto.push(arrTem);
    }

    console.log("pesos: " + pesos);

    menor = retornaMenor(pesos, conjunto);

    console.log("---------------------");

    return menor;
}

function calculaHeuristica(arrIni) {
    var tam = arrIni.length;
    var peso = 0;

    for (var i = 0; i < tam; i++) {
        if (arrIni[i] != 0 && arrIni[i] != arrObjetivo[i]) {
//            peso += Math.abs(arrIni[i] - (arrIni.indexOf(arrIni[i]) + 1));
//            console.log(arrIni[i] + "-" + (arrIni.indexOf(arrIni[i]) + 1) + "=" + Math.abs(arrIni[i] - (arrIni.indexOf(arrIni[i]) + 1)));
            peso += Math.abs(i - (arrObjetivo.indexOf(arrIni[i])));
//            console.log(i + "-" + (arrObjetivo.indexOf(arrIni[i])) + "=" + Math.abs(i - (arrObjetivo.indexOf(arrIni[i]))));
        }
    }

    return peso;
}

function regraMovimento(pos) {
    switch (pos) {
        case 0:
            return [1, 3];
            break;
        case 1:
            return [0, 4, 2];
            break;
        case 2:
            return [1, 5];
            break;
        case 3:
            return [0, 4, 6];
            break;
        case 4:
            return [1, 5, 7, 3];
            break;
        case 5:
            return [2, 4, 8];
            break;
        case 6:
            return [3, 7];
            break;
        case 7:
            return [6, 4, 8];
            break;
        case 8:
            return [5, 7];
            break;
    }
}

function retornaMenor(arrPesos, arrConjunto) {
    var menor = infinito,
        pos;

    console.log("verificando se ja foi escolhido");

    for (var i = 0; i < arrPesos.length; i++) {
        if (jaEscolhido(arrConjunto[i])) {
            arrPesos[i] = infinito;
        }
    }

    for (var i = 0; i < arrPesos.length; i++) {
        if (!jaEscolhido(arrConjunto[i]) && arrPesos[i] < menor) {
            menor = arrPesos[i];
            pos = i;
        }
    }

    arrVisitados.push(arrConjunto[pos]);

    console.log("menor: " + arrConjunto[pos] + "(" + arrPesos[pos] + ")");

    return arrConjunto[pos];
}

function jaEscolhido(arr) {
    var tam = arrVisitados.length,
        iguais = false;

    for (var i = 0; i < tam; i++) {
        if (comparaArray(arr, arrVisitados[i])) {
            console.log("ja escolhido: " + arr);
            return true;
        }
    }

    return iguais;
}

function comparaArray(arr1, arr2) {
    var iguais = true;

    for (var j = 0; j < arr1.length; j++) {
        if (arr1[j] != arr2[j]) {
            iguais = false;
        }
    }

    return iguais;
}

function verificaPosicoes(arr) {
    var tam = arr.length,
        iguais = true;

    for (var i = 0; i < tam; i++) {
        if (arr[i] != arrObjetivo[i]) {
            iguais = false;
        }
    }

    console.log("%ciguais: " + iguais, "color:red");
}
