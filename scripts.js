let continuar;
do {
    continuar = prompt("Deseja continuar? (sim/não)");
    while (continuar !== "sim" && continuar !== "não") {
        continuar = prompt("Resposta invalida... Deseja continuar? (sim/não) ");
    }
} while (continuar === "sim");