let cartas = [
    "gifs/bobrossparrot.gif",
    "gifs/explodyparrot.gif",
    "gifs/fiestaparrot.gif",
    "gifs/metalparrot.gif",
    "gifs/revertitparrot.gif",
    "gifs/tripletsparrot.gif",
    "gifs/unicornparrot.gif"
]

let quantClick = 0;
let idTime;

function selecionaQuantidade() {
    let quantidade;
    do {
        quantidade = prompt("Com quantas cartas queres jogar? (entre 2 e 14) ");
    } while (quantidade < 4 || quantidade > 14 || quantidade % 2 !== 0);
    return quantidade;
}

function continuarJogando() {
    let continuar = prompt("Deseja continuar? (sim/não)");
    while (continuar !== "sim" && continuar !== "não") {
        continuar = prompt("Resposta invalida... Deseja continuar? (sim/não) ");
    }
    return continuar;
}

function iniciarJogo(quantidade) {
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
            <div class="atras"> <img src="${list[i]}"></div>
        </li>`;
    }
}

function virarCarta (elemento) {
    const quantidade = document.querySelectorAll("li").length;
    let cartasSelecionadas = document.querySelectorAll(".clickado");
    if (cartasSelecionadas.length < 2 && cartasSelecionadas[0] !== elemento) {
        quantClick++;
        elemento.classList.add("clickado");
        elemento.querySelector("div:first-child").classList.add("selecionadoFrente");
        elemento.querySelector("div:last-child").classList.add("selecionadoAtras");
        cartasSelecionadas = document.querySelectorAll(".clickado");
    }
    if (cartasSelecionadas.length == 2) {
        if (cartasSelecionadas[0].innerHTML == cartasSelecionadas[1].innerHTML) {
            confirmaPar(cartasSelecionadas);
            let numVirados = atualizaCartas();
            setTimeout(fim, 1000, numVirados, quantidade);
        }
        else {
            setTimeout(desviraPar, 1000, cartasSelecionadas);
        }
    }
} 

function confirmaPar(cartasSelecionadas) {
    for (let i = 0; i < cartasSelecionadas.length; i++) {
        cartasSelecionadas[i].classList.remove("clickado");
        cartasSelecionadas[i].classList.add("virado")
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
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].classList.contains("virado")) {
            remover = lista[i].removeAttribute("onclick");
        }
    }
    const cartasViradas = document.querySelectorAll(".virado");
    return cartasViradas.length;
}

function fim(numVirados, quantidade) {
    let time = document.querySelector(".time div:first-child").innerHTML;
    if (numVirados == quantidade) {
        clearInterval(idTime);
        alert(`Você ganhou com ${quantClick} jogadas em ${time} segundos!`);
        let continuar = prompt("Deseja continuar? (sim/não)");
        while (continuar !== "sim" && continuar !== "não") {
            continuar = prompt("Resposta invalida... Deseja continuar? (sim/não) ");
        }
        if (continuar === "sim") {
            quantClick = 0;
            inicio();
        }
    }
}

function comparador() { 
	return Math.random() - 0.5;
}

function aumentarTempo(time) {
    time.innerHTML = Number(time.innerHTML) + 1;
}

function inicio() {
    const quantidade = selecionaQuantidade();
    document.querySelector(".time div:first-child").innerHTML = 0;
    idTime = setInterval(aumentarTempo, 1000, document.querySelector(".time div:first-child"));
    iniciarJogo(quantidade);
}

inicio();