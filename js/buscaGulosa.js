function iniciarBuscaGulosa() {
    arrVisitados = [];
    nos = [];
    iteracao = 0;
    nivel = 0;

    arrNovo = [];
    arrNovo[0] = [...estadoInicial];
    arrNovo[1] = nivel
    arrNovo[2] = calculaHeuristica(arrNovo[0]);
    arrNovo[3] = null;

    arrVisitados.push([...estadoInicial]);

    do {
        if (comparaArray(arrNovo[0], estadoFinal)) {
            nivel = arrNovo[1];
            
            return arrNovo;
        }

        arrNovo = gulosa(arrNovo);

        iteracao++;
    } while (iteracao < iteracoesTotal);

    return arrNovo;
}

function gulosa(arr) {
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
        arrTem[2] = calculaHeuristica(arrTem[0]);
        arrTem[3] = arr;

        nos.push(arrTem);
    }

    menor = retornaMenor();

    return menor;
}

function calculaHeuristica(arr) {
    var tam = arr.length;
    var peso = 0;

    for (var i = 0; i < tam; i++) {
        if (arr[i]) {
            var pr = estadoFinal.indexOf(arr[i]);
            peso += matrizDistancia[i][pr];
        }
    }

    return (peso);
}
