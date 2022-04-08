function selecionaQuantidade() {
    let quantidade;
    do {
        quantidade = prompt("COm quantas cartas queres jogar? (entre 2 e 14) ");
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

function main() {
    let continuar;
    do {
        const quantidade = selecionaQuantidade();;
        alert(`${quantidade}`);
        continuar = continuarJogando();
    } while (continuar === "sim");
}

function comparador() { 
	return Math.random() - 0.5;
}

main();