var encontrou = null;

function iniciarBuscaProfundidade() {
    arrVisitados = [];
    nos = [];
    iteracao = 0;
    nivel = 0;

    arrNovo = [];
    arrNovo[0] = estadoInicial;
    arrNovo[1] = nivel;
    arrNovo[2] = null;
    arrNovo[3] = null;

    nos.push(arrNovo);

    do {
        console.log("%cNIVEL: " + nos[0][1] + " ITERACAO: " + iteracao, "color: green");
        console.log("%c" + nos[0][0], "color:blue");

        encontrou = profundidade(nos[0]);
        nos.shift();
        iteracao++;
    }
    while (encontrou === null);

    return encontrou;
}

function profundidade(arr) {
    var posicao,
        movimentos,
        tam,
        arrTem,
        menor;

    posicao = arr[0].indexOf(0);
    movimentos = regraMovimento(posicao);
    nivel = arr[1];
    nivel++;

    tam = movimentos.length;

    for (var i = 0; i < tam; i++) {
        arrTem = [];
        arrTem[0] = arr[0].slice();

        var p1 = arrTem[0][movimentos[i]];
        var p2 = arrTem[0][posicao];

        arrTem[0][posicao] = p1;
        arrTem[0][movimentos[i]] = p2;
        arrTem[1] = nivel;
        arrTem[2] = null;
        arrTem[3] = arr;

        if (comparaArray(arrTem[0], estadoFinal)) {
            console.log("%cECONTRO CARAI", "color:red");
            console.log("%c" + arrTem[0], "color:red");
            console.log("%c" + estadoFinal, "color:red");

            return arrTem;
        }

        nos.push(arrTem);
    }

    return null;
}
