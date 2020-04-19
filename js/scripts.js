var estadoInicial = [],
    estadoFinal = [],
    arrResultado = [];

$(document).ready(function () {
    var valoresEstado = $(".input_init"),
        valoresFinal = $(".input_final");


    valoresEstado.each(function () {
        estadoInicial.push(Number.parseInt($(this).val()));
    });

    valoresFinal.each(function () {
        estadoFinal.push(Number.parseInt($(this).val()));
    });

    $(".busca-astar").click(function () {
        var data1 = new Date(),
            data2;

        resultado = iniciarBuscaAStar();
        data2 = new Date();
        imprimeResultado(data1, data2);
        montaMovimentos(resultado);
    });

    $(".busca-gulosa").click(function () {
        var data1 = new Date(),
            data2;

        resultado = iniciarBuscaGulosa();
        data2 = new Date();
        imprimeResultado(data1, data2);
        montaMovimentos(resultado);
    });
});

function imprimeResultado(data1, data2) {
    var diff = data2.getTime() -
        data1.getTime(),
        msec = diff,
        hh,
        mm,
        ss;

    hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    document.querySelector(".tempo").innerHTML = hh + ":" + mm + ":" + ss + "s";
    document.querySelector(".nos").innerHTML = iteracao;
    document.querySelector(".movimentos").innerHTML = nivel;
}

function montaMovimentos(arr) {
    arrResultado = [];

    while (arr !== null) {
        arrResultado.unshift(arr[0]);

        arr = arr[3];
    }

    $(".resultado_movimentos").html("");

    for (var i = 0; i < arrResultado.length; i++) {
        var res = imprimeTabela(arrResultado[i]);
        $(".resultado_movimentos").append(res + "<div>" + i + "</div>");
    }
}

function imprimeTabela(arr) {
    var g = 0,
        tab = "<div class='res-mov'><span>";

    for (var i = 0; i < 3; i++) {
        tab += "</span><div class='res-linha'>";

        for (var j = 0; j < 3; j++) {
            var zero = "";

            if (arr[g] == 0) {
                zero = "zero";
            }

            tab += "<div class='" + zero + "'>" + arr[g] + "</div>";
            g++
        }

        tab += "</div>";
    }

    return tab;
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

function retornaMenor() {
    var menor = infinito,
        pos,
        tam = nos.length;

    for (var i = 0; i < tam; i++) {
        if (nos[i][2] < menor && !jaExpandido(nos[i][0])) {
            menor = nos[i][2];
            pos = i;
        }
    }

    arrVisitados.push(nos[pos][0]);

    return nos[pos];
}

function jaExpandido(arr) {
    var tam = arrVisitados.length,
        iguais = false;


    for (var i = 0; i < tam; i++) {
        if (comparaArray(arr, arrVisitados[i])) {
            //            console.log("%c" + arr + ": visitado", "color:blue");
            return true;
        } else {
            //                        console.log("%cn visitado" + arr,"color:blue");
        }
    }

    return iguais;
}

function comparaArray(arr1, arr2) {
    var iguais = true,
        tam = arr1.length;

    for (var j = 0; j < tam; j++) {
        if (arr1[j] != arr2[j]) {
            iguais = false;
        }
    }

    return iguais;
}
