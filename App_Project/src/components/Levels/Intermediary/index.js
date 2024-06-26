import * as React from "react";
import { styles } from "./style";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

//IMPORT DAS FUNÇÕES EXTERIORES USADOS
import { random } from "../randomizer";
import { getAnswerByTask } from "../../../functions/task.services";

//IMPORT DE COMPONENTES USADOS
import { ListAlts } from "../../Lists/ListAlts";
import { TopBarUtils } from "../TopBarUtils";

export function IntermediaryAct({ task, press, _lifes, _points }) {

    const [expanded, setExpanded] = React.useState(false) //STATE P/GERENCIAR EXPANSÃO DA VIEW

    const [count, setCount] = React.useState(0); //STATE P/CONTADOR DE ALTERNATIVAS SELECIONADAS
    const [taskT, setTaskT] = React.useState(""); //STATE P/ARMAZENAR O TEXTO DA TASK
    const [answer, setAnswer] = React.useState({}); //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]); //STATE P/ARMAZENAR ALTERNATIVAS

    const [altBkp, setAltBkp] = React.useState([]); //STATE P/ARMAZENAR BKP DAS ALTERNATIVAS
    const [choice, setChoice] = React.useState([]); //STATE P/ARMAZENAR AS ALTERNATIVAS ESCOLHIDAS

    const [selectedId, setSelectedId] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) SELECIONADAS
    const [idTip, setIdTip] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) DA DICA

    //FUNÇÃO P/NÃO BUGAR INFORMAÇÃO NA TROCA DE TELAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            setExpanded(false)
            setCount(0);
            setAlt(altBkp);
            setTaskT(task._text);
            setChoice([])
            setSelectedId([])
            setIdTip([])
        }
    }, [task])

    //FUNÇÃO P/BUSCAR DADOS DA RESPOSTA DA TASK
    React.useEffect(() => {
        if (task != undefined || task != null) {
            console.log(task)
            setTaskT(task._text)

            getAnswerByTask("intermediaryAnswer", task.id_task)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        // setFail(true)
                        return
                    }
                    console.log(data)
                    setAnswer(data)
                    randomizer(data)
                })
        }
    }, [task])

    //FUNÇÃO P/RANDOMIZAR AS ALTERNATIVAS
    const randomizer = async (alts) => {
        try {
            const data = [
                alts._text,
                alts._alternativeA,
                alts._alternativeB,
                alts._alternativeC,
                alts._alternativeD,
                alts._alternativeE,
            ]

            let splitT = [];

            //SEPARANDO OS ELEMENTOS POR " "
            for (let i = data.length - 1; i > -1; i--) {
                let temp = data[i];
                try {
                    let tempI = temp.split(" ");

                    if (tempI.length > 1) {
                        for (let i = tempI.length - 1; i > -1; i--) {
                            splitT.push(tempI[i]);
                        }
                    } else {
                        splitT.push(temp);
                    }
                } catch {
                    [];
                }
            }

            const randomic = await random(splitT)
            setAlt(randomic)
            setAltBkp(randomic);
        } catch (error) {
            console.log(error)
            setFail(true)
        }
    }

    //FUNÇÃO P/COMPARAR AS ALTERNATIVAS ESCOLHIDAS
    function altCompare(answerC) {
        setCount(0); let ccount = 0;
        let temp = taskT; let state = 3

        for (let i = 0; i < answerC.length; i++) {
            if (choice[i] == answerC[i]) {
                ccount++;
            } else {
                break
            }
        }

        if (ccount >= answerC.length) {
            choice.forEach(e => {
                temp = temp.replace("‼", e)
            });
            setTaskT(temp)
            state = 1

        } else {
            state = 0
            setTaskT(task._text);
            setAlt(altBkp);
            setChoice([]);
            setSelectedId([])
        }

        if (state === 1) {
            setTimeout(() => {
                press(1) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
            }, 500);
        } else if (state === 0) {
            press(3)
        }

    }

    //FUNÇÃO P/SELEÇÃO DE UMA ALTERNATIVA
    async function handlePress(e, index) {
        setSelectedId(() => {
            let test = selectedId
            test.push(index)
            return test
        })

        const list = choice;
        list.push(e); setChoice(list)

        const answerC = answer._text.split(" ");
        setCount(count + 1);

        if (count >= answerC.length - 1) {
            setTimeout(() => {
                altCompare(answerC)
            }, 250);
        }
    }

    function changeExpand() {
        setExpanded(!expanded)
    }

    //FUNÇÃO P/RESETAR OS DADOS (EXCEÇÃO: DICA)
    function reloadT() {
        setCount(0);
        setAlt(altBkp);
        setTaskT(task._text);
        setChoice([])
        setSelectedId([])
    }

    //FUNÇÃO P/RANDOMIZAÇÃO E ESCOLHA DAS DICAS
    const nRandom = () => {
        let answerTip = answer._text.split(" ")
        let positions = []

        answerTip.forEach(e => {
            positions.push(alt.indexOf(e))
        })

        let primaryT = []; let secondT = []
        let tipFinal = []; let ccount = 1

        while (ccount <= 2) {
            if (tipFinal.length < 1) {
                primaryT = Math.floor(Math.random() * alt.length)

                if (positions.includes(primaryT)) {
                    primaryT = Math.floor(Math.random() * alt.length)
                } else {
                    tipFinal.push(primaryT)
                    ccount++;
                }
            } else {
                secondT = Math.floor(Math.random() * alt.length)

                if (tipFinal.includes(secondT) || positions.includes(secondT)) {
                    secondT = Math.floor(Math.random() * alt.length)
                } else {
                    tipFinal.push(secondT)
                    ccount++
                }
            }
        }
        setIdTip(tipFinal);
    }

    //CRIAÇÃO DAS ALTERNATIVAS "RETIRADAS"
    const altRemoved = choice.length > 0 ? choice.map((e, index) => {
        try {
            return (
                <View style={styles.button} key={index}>
                    <Text style={styles.title}>{e}</Text>
                </View>
            );
        } catch { [] }
    }) : []

    return (
        <>
            {altBkp.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.task_content}>

                        <View style={styles.content_utils}>
                            <TopBarUtils points={_points} onlyLifes={false} idTip={idTip} pressTip={nRandom} pressReload={reloadT} first={false} lifes={_lifes} />
                        </View>

                        <ScrollView horizontal={true} style={styles.contentHScroll} contentContainerStyle={styles.content_text}>
                            <Text numberOfLines={5} style={styles.titleA}>{taskT.replaceAll("‼", "__‼__")}</Text>
                        </ScrollView>

                    </View>

                    <View style={styles.content_removed}>
                        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.contentScroll}>{altRemoved}</ScrollView>
                    </View>

                    <View style={styles.content_alts}>
                        <ListAlts expanded={expanded} expandPress={() => changeExpand()} alt={alt.length > 0 ? alt : []} selects={selectedId.length > 0 ? selectedId : []} remaining={[]} tips={idTip.length > 0 ? idTip : []} pressing={(alt, altIndex) => handlePress(alt, altIndex)} />
                    </View>
                </View>
            )}
        </>
    )
}