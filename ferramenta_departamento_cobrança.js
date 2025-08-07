function monitor() {
    let loanCount = parseInt(gets());

    let urgent = [];
    let observation = [];
    let noUrgency = [];

    // Leia os valores dos dias restantes para cada empréstimo
    for (let i = 0; i < loanCount; i++) {
        let dias = parseInt(gets());
        
        if (dias <= 5) {
            urgent.push(dias);
        } else if (dias <= 15) {
            observation.push(dias);
        } else {
            noUrgency.push(dias);
        }
    }

    // Formata uma lista como string separada por vírgulas
    function formatList(list) {
        return list.join(',');
    }

    // Exibe os resultados agrupados
    print("urgente: " + formatList(urgent));
    print("observacao: " + formatList(observation));
    print("sem_urgencia: " + formatList(noUrgency));
}

// Para rodar na plataforma DIO, chame a função:
monitor();