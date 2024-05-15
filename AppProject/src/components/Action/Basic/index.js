import * as React from 'react'
import { styles } from './style';
import { Text, View, TouchableOpacity, Modal } from 'react-native'; // Adicionei Modal e Button

import { random } from '../randomizer'; //IMPORT DA FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
import { getAnswerByTask } from '../../../functions/task.services'; //IMPORT DA FUNÇÃO P/BUSCAR AS ALTERNATIVAS

export function BasicTask({ task, press }) {

    const [answer, setAnswer] = React.useState([]) //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]) //STATE P/ARMAZENAR ALTERNATIVAS
    const [message, setMessage] = React.useState({
        msg: "", state: false
    }) //STATE P/ARMAZENAR A MENSAGEM
    const [modalVisible, setModalVisible] = React.useState(false); //STATE P/CONTROLAR A VISIBILIDADE DA MODAL

    //FUNÇÃO USADA PARA VALIDAR AS RESPOSTAS
    function altCompare(alternative) {
        if (alternative === answer._text) {
            setMessage({ msg: "Acertou!!!", state: true })
        } else {
            setMessage({ msg: "Errouuuuuu!", state: false })
        }
        setModalVisible(true); // Exibe a modal quando a resposta é comparada
    }

    //FUNÇÃO USADA PARA BUSCAR PELAS RESPOSTAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            getAnswerByTask("basicAnswer", task._id)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        return
                    }
                    setAnswer(data)
                    randomizer(data)
                })
        }
    }, [task])

    //FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
    const randomizer = async (alts) => {
        try {
            const data = [
                alts._text,
                alts._alternativeA,
                alts._alternativeB,
                alts._alternativeC
            ]

            const randomic = await random(data)
            setAlt(randomic)
        } catch (error) {
            console.log(error)
        }
    }

    //FUNÇÃO PARA FECHAR A MODAL
    const closeModal = () => {
        setModalVisible(false);
        setMessage({ ...message, msg: "" }); // Limpa a mensagem quando a modal é fechada

        if (message.state == true) {
            press(true) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
        }
    }

    //FUNÇÃO P/CRIAR MULTIPLOS ELEMENTOS PARA EXIBIÇÃO DAS ALTERNATIVAS
    const listAlts = alt.length > 0 ? alt.map((e, index) => (
        <TouchableOpacity key={index} id={index} style={styles.button} onPress={() => { altCompare(e) }}>
            <Text style={styles.title}>{e}</Text>
        </TouchableOpacity>
    )) : []

    return (
        <>
            {alt.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{task._text}</Text>
                    </View>
                    <View style={styles.contentA}>
                        {listAlts}
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
            )}
        </>
    )
}
