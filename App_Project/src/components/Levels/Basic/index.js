import * as React from 'react'
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';

import { random } from '../randomizer'; //IMPORT DA FUNÇÃO QUE IRÁ RANDOMIZAR AS ALTERNATIVAS
import { getAnswerByTask } from '../../../functions/task.services'; //IMPORT DA FUNÇÃO P/BUSCAR AS ALTERNATIVAS
import { TopBarUtils } from '../TopBarUtils';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕES

export function BasicAct({ task, press, _lifes, _points }) {

    const [answer, setAnswer] = React.useState({}) //STATE P/ARMAZENAR DADOS DA RESPOSTA
    const [alt, setAlt] = React.useState([]) //STATE P/ARMAZENAR ALTERNATIVAS
    const [altRemoved, setAltRemoved] = React.useState("") //STATE P/ARMAZENAR ALTERNATIVAS

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

    function remove(index) {
        if (!altRemoved.includes(index)) {
            let temp = `${altRemoved}${index}`
            setAltRemoved(temp)
        } else {
            let temp = altRemoved.replaceAll(`${index}`, "")
            setAltRemoved(temp)
        }
    }

    //FUNÇÃO P/CRIAR MULTIPLOS ELEMENTOS PARA EXIBIÇÃO DAS ALTERNATIVAS
    const listAlts = alt.length > 0 ? alt.map((e, index) => (
        <Animatable.View animation="bounceInUp" duration={750 * index + 1} key={index} style={altRemoved.includes(`${index}`) ? [styles.button, { backgroundColor: 'gray', borderColor: 'gray' }] : styles.button}>
            <TouchableOpacity style={{ width: '90%' }} onPress={() => { altCompare(e) }} disabled={altRemoved.includes(`${index}`) ? true : false}>
                <Text style={styles.title}>{e}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 24 }} onPress={() => remove(index)}>
                {altRemoved.includes(`${index}`) ? <Ionicons
                    name="eye"
                    size={24}
                    color="black"
                /> : <Ionicons
                    name="eye-off"
                    size={24}
                    color="gray"
                />}
            </TouchableOpacity>
        </Animatable.View>
    )) : []

    return (
        <>
            {listAlts.length > 0 && task && (
                <View style={styles.container}>
                    <View style={styles.content_utils}>
                        <TopBarUtils points={_points} idTip="none" onlyLifes={true} pressTip="none" pressReload="none" first={false} lifes={_lifes} />
                    </View>

                    <View style={styles.text_content}>
                        <Text style={styles.title}>{task._text}</Text>
                    </View>

                    <View style={styles.space} />

                    <View style={styles.alt_content}>
                        {listAlts}
                    </View>
                </View>
            )}
        </>
    )
}
