import * as React from 'react'
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';

import { random } from '../randomizer'; //IMPORT DA FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
import { getAnswerByTask } from '../../../functions/task.services'; //IMPORT DA FUNÇÃO P/BUSCAR AS ALTERNATIVAS
import { TopBarUtils } from '../TopBarUtils';

export function BasicAct({ task, press, _lifes }) {

    const [answer, setAnswer] = React.useState({}) //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]) //STATE P/ARMAZENAR ALTERNATIVAS

    //FUNÇÃO USADA PARA BUSCAR PELAS RESPOSTAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            // setLifes(_lifes)
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

    //FUNÇÃO USADA PARA VALIDAR AS RESPOSTAS
    function altCompare(alternative) {
        let state = 3

        if (alternative === answer._text) {
            state = 1
        } else {
            state = 0
        }

        if (state === 1) {
            press(1) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
        } else if (state === 0) {
            press(3)
        }

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
                    <View style={styles.content_utils}>
                        <TopBarUtils idTip="none" onlyLifes={true} pressTip="none" pressReload="none" first={false} lifes={_lifes} />
                    </View>

                    <View style={styles.text_content}>
                        <Text style={styles.title}>{task._text}</Text>
                    </View>

                    <View style={styles.alt_content}>
                        {listAlts}
                    </View>
                </View>
            )}
        </>
    )
}
