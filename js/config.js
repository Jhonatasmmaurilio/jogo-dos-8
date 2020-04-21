var estadoInicial = [],
    estadoFinal = [],
    infinito = 10000,
    arrNovo = [],
    arrVisitados = [],
    matrizDistancia = [],
    nos = [],
    iteracoesTotal = 5000,
    iteracao = 0,
    nivel = 0;

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