import * as React from 'react'
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';

import { random } from '../randomizer'; //IMPORT DA FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
import { getAnswerByTask } from '../../../functions/task.services'; //IMPORT DA FUNÇÃO P/BUSCAR AS ALTERNATIVAS

export function BasicTask({ task }) {

    const [answer, setAnswer] = React.useState([]) //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]) //STATE P/ARMAZENAR ALTERNATIVAS

    //FUNÇÃO USADA PARA VALIDAR AS RESPOSTAS
    function altCompare(alternative) {

        if (alternative == answer._text) {
            alert("Acertou!!!")
        } else {
            alert("Errouuuuuu!")
        }
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

    //FUNÇÃO P/CRIAR MULTIPLOS ELEMENTOS PARA EXIBIÇÃO DAS ALTERNATIVAS
    const listAlts = alt.length > 0 ? alt.map((e, index) => (
        <TouchableOpacity key={index} id={index} style={styles.button} onPress={() => altCompare(e)}>
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
                </View>
            )}
        </>
    )
}
