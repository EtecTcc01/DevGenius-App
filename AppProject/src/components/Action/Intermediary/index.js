import * as React from "react";
import { styles } from "./style";
import { Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";

import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO
// import { Modal, Portal, PaperProvider } from 'react-native-paper'; //IMPOR DOS COMPONENTES DO PAPER
import { Portal, PaperProvider } from 'react-native-paper'; //IMPOR DOS COMPONENTES DO PAPER

//IMPORT DAS FUNÇÕES DE COMPONENTE EXTERIORES USADOS
import { random } from "../randomizer";
import { getAnswerByTask } from "../../../functions/task.services";

export function IntermediaryTask({ task, press }) {

    const [count, setCount] = React.useState(0); //STATE P/CONTADOR DE ALTERNATIVAS SELECIONADAS
    const [taskT, setTaskT] = React.useState(""); //STATE P/ARMAZENAR O TEXTO DA TASK
    const [answer, setAnswer] = React.useState([]); //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]); //STATE P/ARMAZENAR ALTERNATIVAS
    const [altBkp, setAltBkp] = React.useState([]); //STATE P/ARMAZENAR BKP DAS ALTERNATIVAS
    const [choice, setChoice] = React.useState([]); //STATE P/ARMAZENAR AS ALTERNATIVAS ESCOLHIDAS

    const [selectedId, setSelectedId] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) SELECIONADAS
    const [idTip, setIdTip] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) DA DICA

    // const [visibleModal, setVisibleModal] = React.useState(false); //STATE P/VISIBILIDADE DO MODAL

    const [modalVisible, setModalVisible] = React.useState(false); //STATE P/CONTROLAR A VISIBILIDADE DA MODAL A EXIBIR A MSG
    const [message, setMessage] = React.useState({
        msg: "", state: false
    }) //STATE P/ARMAZENAR A MENSAGEM

    // //FUNÇÃO P/TROCAR VISIBILIDADE DO MODAL DE EXPLICAÇÃO
    // const modalSwitch = () => {
    //     setVisibleModal(!visibleModal)
    // }

    //FUNÇÃO PARA FECHAR A MODAL DE MSG
    const closeModal = () => {
        setModalVisible(false);
        setMessage({ ...message, msg: "" }); // Limpa a mensagem quando a modal é fechada

        if (message.state == true) {
            press(true) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
        }
    }

    //FUNÇÃO P/NÃO BUGAR INFORMAÇÃO NA TROCA DE TELAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            // setVisibleModal(false)
            setTaskT(task._text);
            setCount(0);
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
                        return
                    }
                    setAnswer(data)
                    console.log(data)
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
                // alert("Acertou!!!");
                setMessage({ msg: "Acertou!!!", state: true })
            }, 500);
        } else {
            // alert("Errouuuuuu!");
            setMessage({ msg: "Errouuuu!!!", state: false })
            setTaskT(task._text);
            setAlt(altBkp);
            setChoice([]);
            setSelectedId([])
        }
        
        setModalVisible(true); // Exibe a modal quando a resposta é comparada
    }

    //FUNÇÃO P/SELEÇÃO DE UMA ALTERNATIVA
    async function handlePress(e) {
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

    //CRIAÇÃO DE MULTIPLOS ELEMENTOS (ALTERNATIVAS)
    const alts = alt.length > 0 ? alt.map((e, index) => {
        return (
            <TouchableOpacity key={index} id={index}
                disabled={selectedId.includes(index) || idTip.includes(index) ? true : false}
                style={selectedId.includes(index) || idTip.includes(index) ? [styles.button, { borderColor: "#aaaaaa" }] : styles.button}
                onPress={() => {
                    handlePress(e, index)
                    setSelectedId(() => {
                        let test = selectedId
                        test.push(index)
                        return test
                    })
                }}>
                <Text style={styles.title}>{e}</Text>
            </TouchableOpacity>
        );
    }) : []

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
            console.log(tipFinal)
        }

        setIdTip(tipFinal);
    }

    return (
        <>
            {altBkp.length > 0 && (
                <PaperProvider>
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <View style={styles.contentBtn}>
                                {/* <Portal>
                                    <Modal
                                        visible={visibleModal}
                                        onDismiss={modalSwitch}
                                        dismissable="true"
                                        dismissableBackButton="true"
                                        contentContainerStyle={{
                                            position: 'absolute',
                                            backgroundColor: 'white',
                                            padding: 20,
                                            width: '90%',
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'center'
                                        }}>
                                        <Text>Example Modal.  Click outside this area to dismiss.</Text>
                                    </Modal>
                                </Portal> */}

                                <TouchableOpacity style={styles.btn}
                                    disabled={idTip.length > 0 ? true : false}
                                    onPress={nRandom}>
                                    <MaterialCommunityIcons
                                        name="lightbulb-on-outline"
                                        size={24}
                                        color="#06c244"
                                    />
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={styles.btn} onPress={modalSwitch}>
                                    <AntDesign
                                        name="questioncircleo"
                                        size={24}
                                        color="#06c244"
                                    />
                                </TouchableOpacity> */}

                                <TouchableOpacity style={styles.btn} onPress={reloadT}>
                                    <Ionicons
                                        size={24}
                                        color="#06c244"
                                        name="reload"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentText}>
                                <Text style={styles.titleA}>{taskT}</Text>
                            </View>
                        </View>

                        <View style={styles.contentA}>
                            <ScrollView contentContainerStyle={styles.contentScroll}>{altRemoved}</ScrollView>
                        </View>

                        <View style={styles.contentB}>
                            <ScrollView contentContainerStyle={styles.contentScroll}>{alts}</ScrollView>
                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{message.msg}</Text>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                        <Text style={styles.closeButtonText}>Fechar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </PaperProvider>
            )}
        </>
    )
}