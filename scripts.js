let cartas = [
    {gif: "gifs/bobrossparrot.gif", status: "virado"},
    {gif: "gifs/explodyparrot.gif", status: "virado"},
    {gif: "gifs/fiestaparrot.gif", status: "virado"},
    {gif: "gifs/metalparrot.gif", status: "virado"},
    {gif: "gifs/revertitparrot.gif", status: "virado"},
    {gif: "gifs/tripletsparrot.gif", status: "virado"},
    {gif: "gifs/unicornparrot.gif", status: "virado"},
]
function selecionaQuantidade() {
    let quantidade;
    do {
        quantidade = prompt("Com quantas cartas queres jogar? (entre 2 e 14) ");
    } while (quantidade < 2 || quantidade > 14 || quantidade % 2 !== 0);
    return quantidade;
}

function continuarJogando() {
    let continuar = prompt("Deseja continuar? (sim/não)");
    while (continuar !== "sim" && continuar !== "não") {
        continuar = prompt("Resposta invalida... Deseja continuar? (sim/não) ");
    }
    return continuar;
}

function iniciarJogo() {
    const quantidade = selecionaQuantidade();
    let list = [];
    for (let j = 0; j < quantidade/2; j++) {
        list[2*j] = cartas[j];
        list[2*j+1] = cartas[j];
    }
    list.sort(comparador);
    let lista = document.querySelector("ul");
    lista.innerHTML = "";
    for (let i = 0; i < quantidade; i++) {
        lista.innerHTML += `
        <li>
            <div class="frente"> <img src="front.png"></div>
            <div class="atras"> <img src="${list[i].gif}"></div>
        </li>`;
    }
}

function comparador() { 
	return Math.random() - 0.5;
}

iniciarJogo();