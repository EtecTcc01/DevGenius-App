import * as React from "react";
import { styles } from "./style";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO

//IMPORT DAS FUNÇÕES DE COMPONENTE EXTERIORES USADOS
import { random } from "../randomizer";
import { getAnswerByTask } from "../../../functions/task.services";
import { ModalAct } from "../Modal";
import { AltList } from "../AltList";

export function IntermediaryTask({ task, press }) {

    const [fail, setFail] = React.useState(false); //STATE P/ARMAZENAR "FALHAS" 

    if (fail === true) {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Ocorreu um erro ao renderizar o componente</Text>
            </View>
        )
    }

    const [count, setCount] = React.useState(0); //STATE P/CONTADOR DE ALTERNATIVAS SELECIONADAS
    const [taskT, setTaskT] = React.useState(""); //STATE P/ARMAZENAR O TEXTO DA TASK
    const [answer, setAnswer] = React.useState([]); //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]); //STATE P/ARMAZENAR ALTERNATIVAS

    const [altBkp, setAltBkp] = React.useState([]); //STATE P/ARMAZENAR BKP DAS ALTERNATIVAS
    const [choice, setChoice] = React.useState([]); //STATE P/ARMAZENAR AS ALTERNATIVAS ESCOLHIDAS

    const [selectedId, setSelectedId] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) SELECIONADAS
    const [idTip, setIdTip] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) DA DICA

    const [modalVisible, setModalVisible] = React.useState(false); //STATE P/CONTROLAR A VISIBILIDADE DA MODAL
    const [modalInfo, setModalInfo] = React.useState({
        msg: "", state: false
    });

    //FUNÇÃO PARA FECHAR A MODAL
    const closeModal = () => {
        setModalVisible(false);
        setModalInfo({ ...modalInfo, msg: "" }); // Limpa a mensagem quando a modal é fechada

        if (modalInfo.state == true) {
            press(true) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
        }
    }

    //FUNÇÃO P/NÃO BUGAR INFORMAÇÃO NA TROCA DE TELAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            setModalVisible(false)
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
            getAnswerByTask("intermediaryAnswer", task._id)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        setFail(true)
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
        let temp = taskT

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
            setTimeout(() => {
                setModalInfo({ msg: "Acertou!!!", state: true })
            }, 500);
        } else {
            setModalInfo({ msg: "Errouuuu!!!", state: false })
            setTaskT(task._text);
            setAlt(altBkp);
            setChoice([]);
            setSelectedId([])
        }

        setModalVisible(true); // Exibe a modal quando a resposta é comparada
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

    //FUNÇÃO P/RESETAR OS DADOS (EXCEÇÃO: DICA)
    function reloadT() {
        setCount(0);
        setAlt(altBkp);
        setTaskT(task._text);
        setChoice([])
        setSelectedId([])
    }

    //CRIAÇÃO DAS ALTERNATIVAS "RETIRADAS"
    const altRemoved = choice.length > 0 ? choice.map((e, index) => {
        try {
            return (
                <TouchableOpacity style={styles.button} key={index} id={index} onPress={() => replaceTxt(e)}>
                    <Text style={styles.title}>{e}</Text>
                </TouchableOpacity>
            );
        } catch { [] }
    }) : []

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

    return (
        <>
            {altBkp.length > 0 && fail === false && (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.contentBtn}>

                            <TouchableOpacity style={styles.btn}
                                disabled={idTip.length > 0 ? true : false}
                                onPress={nRandom}>
                                <MaterialCommunityIcons
                                    name="lightbulb-on-outline"
                                    size={24}
                                    color={idTip.length > 0 ? "gray" : "#06c244"}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={reloadT}>
                                <Ionicons
                                    size={24}
                                    color="#06c244"
                                    name="reload"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentText}>
                            <Text style={styles.titleA}>{taskT.replaceAll("‼", "__‼__")}</Text>
                        </View>
                    </View>

                    <View style={styles.contentA}>
                        <ScrollView contentContainerStyle={styles.contentScroll}>{altRemoved}</ScrollView>
                    </View>

                    <View style={styles.contentB}>
                        <AltList alt={alt.length > 0 ? alt : []} selects={selectedId.length > 0 ? selectedId : []} remaining={[]} tips={idTip.length > 0 ? idTip : []} pressing={(alt, altIndex) => handlePress(alt, altIndex)} />
                    </View>

                    <ModalAct message={modalInfo.msg} visible={modalVisible} close={closeModal} />
                </View>
            )}
        </>
    )
}