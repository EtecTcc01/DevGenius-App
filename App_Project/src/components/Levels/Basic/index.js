import * as React from 'react'
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';

import { random } from '../randomizer'; //IMPORT DA FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
import { getAnswerByTask } from '../../../functions/task.services'; //IMPORT DA FUNÇÃO P/BUSCAR AS ALTERNATIVAS
import { ModalAct } from '../Modal'; //IMPORT DO COMPONENTE A SER USADO

export function BasicAct({ task, press }) {

    const [answer, setAnswer] = React.useState({}) //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]) //STATE P/ARMAZENAR ALTERNATIVAS

    const [modalVisible, setModalVisible] = React.useState(false); //STATE P/CONTROLAR A VISIBILIDADE DA MODAL
    const [modalInfo, setModalInfo] = React.useState({
        msg: "", state: false
    });

    //FUNÇÃO USADA PARA BUSCAR PELAS RESPOSTAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            getAnswerByTask("basicAnswer", task.id_task)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        setFail(true)
                        return
                    }
                    setAnswer(data)
                    randomizer(data)
                })
        }
    }, [task])

    //FUNÇÃO PARA FECHAR A MODAL
    const closeModal = () => {
        setModalVisible(false);
        setModalInfo({ ...modalInfo, msg: "" }); // Limpa a mensagem quando a modal é fechada

        if (modalInfo.state == true) {
            press(true) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
        }
    }

    //FUNÇÃO USADA PARA VALIDAR AS RESPOSTAS
    function altCompare(alternative) {
        if (alternative === answer._text) {
            setModalInfo({ msg: "Acertou!!!", state: true })
        } else {
            setModalInfo({ msg: "Errouuuuuu!", state: false })
        }

        setModalVisible(true);
    }

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

    //FUNÇÃO P/CRIAR MULTIPLOS ELEMENTOS PARA EXIBIÇÃO DAS ALTERNATIVAS
    const listAlts = alt.length > 0 ? alt.map((e, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => { altCompare(e) }}>
            <Text style={styles.title}>{e}</Text>
        </TouchableOpacity>
    )) : []

    return (
        <>
            {listAlts.length > 0 && task && (
                <View style={styles.container}>
                    <View style={styles.text_content}>
                        <Text style={styles.title}>{task._text}</Text>
                    </View>

                    <View style={styles.alt_content}>
                        {listAlts}
                    </View>

                    <ModalAct message={modalInfo.msg} visible={modalVisible} close={closeModal} />
                </View>
            )}
        </>
    )
}