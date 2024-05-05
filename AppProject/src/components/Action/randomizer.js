//FUNÇÃO P/RANDOMIZAR OS ITENS ENVIADOS
const random = (alts) => {

    for (let i = alts.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));

        [alts[i], alts[random]] = [alts[random], alts[i]];
    }

    if (alts.length > 0 && alts) {
        return alts
    }
}

export { random };