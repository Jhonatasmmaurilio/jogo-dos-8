var estadoInicial = [],
    estadoFinal = [],
    infinito = 10000,
    arrNovo = [],
    arrVisitados = [],
    matrizDistancia = [],
    arrPai = [];

matrizDistancia = [
    [0, 1, 2, 1, 2, 3, 2, 3, 4],
    [1, 0, 1, 2, 1, 2, 3, 2, 3],
    [2, 1, 0, 3, 2, 1, 4, 3, 2],
    [1, 2, 3, 0, 1, 2, 1, 2, 3],
    [2, 1, 2, 1, 0, 1, 2, 1, 2],
    [3, 2, 1, 2, 1, 0, 3, 2, 1],
    [2, 3, 4, 1, 2, 3, 0, 1, 2],
    [3, 2, 3, 2, 1, 2, 1, 0, 1],
    [4, 3, 2, 3, 2, 1, 2, 1, 0]
];

estadoInicial = [4, 6, 5, 8, 2, 7, 1, 0, 3];

estadoFinal = [1, 2, 3, 8, 0, 4, 7, 6, 5];
//estadoFinal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

arrNovo = [...estadoInicial];
arrVisitados.push([...estadoInicial]);
arrPai = estadoInicial;

var nivel = 1;

do {

    if (comparaArray(arrNovo, estadoFinal)) {
        console.log("%cECONTRO CARAI", "color:red");

        nivel = 1000;
    }

    console.log("%cNIVEL: " + nivel, "color: green");
    console.log("%cESTADO: " + arrNovo, "color:orange");

    imprimeTabela(arrNovo);

    console.log(arrPai);

    arrNovo = movimentar(arrNovo);

    nivel++;
} while (nivel < 1000);

function movimentar(arr) {
    var posicao,
        movimentos,
        tam,
        arrTem,
        conjunto = [],
        p,
        pesos = [],
        menor;

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

        console.log(arrTem + " (" + calculaHeuristica(arrTem) + ")");

        pesos.push(calculaHeuristica(arrTem));
        conjunto.push(arrTem);
    }

    menor = retornaMenor(pesos, conjunto);
    arrPai = [...arr];

    console.log("---------------------");

    return menor;
}

function calculaHeuristica(arr) {
    var tam = arr.length;
    var peso = 0;

    for (var i = 0; i < tam; i++) {
        if (arr[i]) {
            var pr = estadoFinal.indexOf(arr[i]);
            peso += matrizDistancia[i][pr];
            //            console.log(arr[i] + " até " + pr + ": " + matrizDistancia[i][pr]);
        }
    }

    return (peso + nivel);
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

    //    console.log("verificando se ja foi escolhido");

    //        for (var i = 0; i < arrPesos.length; i++) {
    //            if (jaEscolhido(arrConjunto[i])) {
    //                arrPesos[i] = infinito;
    //                console.log("ja escolhido: " + arrConjunto[i]);
    //            }
    //        }

    for (var i = 0; i < arrPesos.length; i++) {
        if (arrPesos[i] < menor && !comparaArray(arrConjunto[i], arrPai)) {
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

function testaMatriz(mDist) {
    var msg = "";
    var erro = false;

    for (var i = 0; i < mDist.length; i++) {
        for (var j = 0; j < mDist[0].length; j++) {
            msg += mDist[i][j] + " | ";

            if (mDist[i][j] != mDist[j][i]) {
                console.log("ERRO NA MATRIZ: " + i + "-" + j);
                erro = true;
            }
        }

        msg += "\n"
    }

    return erro;
}

function imprimeTabela(arr) {
    var g = 0,
        tab = "";

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tab += arr[g] + "";
            g++
        }

        tab += "\n";
    }

    console.log(tab);
}
