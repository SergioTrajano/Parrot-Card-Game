let cartas = [
    {gif: "gifs/bobrossparrot.gif", tipo: "um"},
    {gif: "gifs/explodyparrot.gif", tipo: "dois"},
    {gif: "gifs/fiestaparrot.gif", tipo: "tres"},
    {gif: "gifs/metalparrot.gif", tipo: "quatro"},
    {gif: "gifs/revertitparrot.gif", tipo: "cinco"},
    {gif: "gifs/tripletsparrot.gif", tipo: "seis"},
    {gif: "gifs/unicornparrot.gif", tipo: "sete"},
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
        <li onclick="virarCarta(this)">
            <div class="frente"> <img src="front.png"></div>
            <div class="atras"> <img src="${list[i].gif}"></div>
        </li>`;
    }
}

function virarCarta (elemento) {
    elemento.querySelector("div:first-child").classList.add("selecionadoFrente");
    elemento.classList.add("clickado");
    elemento.querySelector("div:last-child").classList.add("selecionadoAtras");
    let cartasSelecionadas = document.querySelectorAll(".clickado");
    if (cartasSelecionadas.length == 2) {
        if (cartasSelecionadas[0].innerHTML == cartasSelecionadas[1].innerHTML) {
            confirmaPar(cartasSelecionadas);
        }
        else {
            setTimeout(desviraPar, 1000, cartasSelecionadas);
        }
    }
} 

function confirmaPar(cartasSelecionadas) {
    for (let i = 0; i < cartasSelecionadas.length; i++) {
        cartasSelecionadas[i].classList.remove("clickado");
        atualizaCartas();
    }
}

function desviraPar(cartasSelecionadas) {
    for (let i = 0; i < cartasSelecionadas.length; i++) {
        cartasSelecionadas[i].classList.remove("clickado");
        cartasSelecionadas[i].querySelector("div:first-child").classList.remove("selecionadoFrente");
        cartasSelecionadas[i].querySelector("div:last-child").classList.remove("selecionadoAtras");
    }
}

function atualizaCartas() {
    const lista = document.querySelectorAll("li");
    const cartinhas = document.querySelector("ul");
    cartinhas.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        if (cartinhas[i].classList.contains("virado")) {
            cartinhas.innerHTML += `
                <li">
                    <div class="frente"> <img src="front.png"></div>
                    <div class="atras"> <img src="${list[i].gif}"></div>
                </li>`;
        }
        else {
            cartinhas.innerHTML += `
                <li onclick="virarCarta(this)">
                    <div class="frente"> <img src="front.png"></div>
                    <div class="atras"> <img src="${list[i].gif}"></div>
                </li>`;
        }
    }
}

function comparador() { 
	return Math.random() - 0.5;
}

iniciarJogo();