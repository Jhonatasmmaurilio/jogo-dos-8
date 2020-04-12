var arrInicial = [],
    arrObjetivo = [],
    infinito = 1000,
    pesoObjetivo;

arrInicial = [0, 2, 8, 7, 1, 3, 6, 5, 4];
arrObjetivo = [1, 2, 3, 4, 5, 6, 7, 8, 0];

var i = 0;

do {
    console.log(i + "----------------------");
    var arrNovo = movimentar(arrInicial);

    console.log("NOVO ARRAY");
    console.log(arrNovo);

    arrInicial = arrNovo;
//    calculoPeso(arrInicial);

    i++;
} while (i < 1);

function movimentar(arr) {
    var posicao,
        movimentos,
        tam,
        arrTem,
        conjunto = [],
        p,
        pesos = [];

    console.log("%cESTADO", "color: green");
    console.log(arr);

    posicao = arr.indexOf(0);

    movimentos = regraMovimento(posicao);

    console.log("movimentos: " + movimentos);

    tam = movimentos.length;

    console.log("trocando");

    for (var i = 0; i < tam; i++) {
        arrTem = arr.slice();

        var p1 = arrTem[movimentos[i]];
        var p2 = arrTem[posicao];

        arrTem[posicao] = p1;
        arrTem[movimentos[i]] = p2;

        console.log(arrTem);
        pesos.push(calculoPeso(arrTem));

        conjunto.push(arrTem);
    }

    console.log("pesos");
    console.log(pesos);

    p = retornaMenor(pesos);

    return conjunto[p];
}

function calculoPeso(arrIni) {
    var peso = 0,
        tamanho = 0;

    tamanho = arrIni.length;
    
    var msg = "";
    for (var i = 0; i < tamanho; i++) {
        if (arrIni[i] != 0) {
            peso += Math.abs((arrIni[i]) - (arrObjetivo[i]));
            msg += Math.abs((arrIni[i]) - (arrObjetivo[i])) + "+";
        }
    }

    console.log(peso);

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

function retornaMenor(arr) {
    var menor = infinito;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < menor) {
            menor = arr[i];
            p = i;
        }
    }

    console.log("menor");
    console.log(arr[p]);

    return p;
}
