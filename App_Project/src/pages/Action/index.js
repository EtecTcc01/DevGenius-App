import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import { Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse, progressUpdate } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';
import { ProgressBar } from '../../components/ProgressBar';
import { useNavigation } from '@react-navigation/native';

// IMPORT DOS COMPONENTE USADOS
import { BasicAct } from '../../components/Levels/Basic';
import { IntermediaryAct } from '../../components/Levels/Intermediary';
import { AdvancedAct } from '../../components/Levels/Advanced';
import { Details } from '../Details';

export function Action({ route }) {
    const navigation = useNavigation()

    const [course, setCourse] = React.useState({})
    const [registration, setRegistration] = React.useState({})

    const [stageContent, setStageContent] = React.useState([]) //STATE P/ARMAZENAR TEORIAS/TASKS DO ESTAGIO
    const [stage, setStage] = React.useState([]) //STATE P/ARMAZENAR ESTAGIOS DO CURSO
    const [phase, setPhase] = React.useState(0) //STATE P/ARMAZENAR "FASES" DO ESTAGIO ATUAL
    const [points, setPoints] = React.useState(0) //STATE P/ARMAZENAR PONTOS (CORRETOS)
    // const [changed, setChanged] = React.useState(false) //STATE P/ARMAZENAR ESTADO DE MUDANÇA DE ESTAGIO

    //FUNÇÃO P/ATUALIZAR O LEVEL DE ESTAGIO DO USUÁRIO NO CURSO
    React.useEffect(() => {
        try {
            if (phase >= stageContent.length && stageContent.length > 0) {

                const lvl = registration.level_stage + 1
                const progress = {
                    stageLvl: lvl,
                    registrationId: registration.id_registration
                }

                progressUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }
                        registration = data
                        console.log(registration)
                    })

            }
        } catch {
            []
        }
    }, [phase])

    React.useEffect(() => {
        const data = route.params
        setRegistration(data.registration[0])
        setCourse(data.course)
        // console.log(data.course)

        if (data.stage) {
            setStage(data.stage)
            getTeoryData(data.stage._id)
        } else {
            getStagesByCourse(data.course.id_course)
                .then((courses) => {
                    console.log({ data: data.registration[0].level_stage })
                    if (!courses) {
                        console.log("Erro ao buscar dados relacionados aos estagios.")
                        return
                    }

                    setStage(courses)
                    console.log({ courses })
                    getTeoryData(courses[data.registration[0].level_stage]._id)
                })
        }
    }, [route.params])

    function handlerTransfer() {
        navigation.navigate(`Home`, { changed: true })
    }

    //FUNÇÃO P/TEORIAS POR ESTAGIO
    const getTeoryData = (stageId) => {
        let content = []

        getTeoryByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Teoria Inexistente...")
                    getTaskData(stageId, content)
                    return
                }

                data.forEach(element => {
                    content.push(element)
                });

                getTaskData(stageId, content)
            })
    }

    //FUNÇÃO P/RECARREGAR PAG.
    function reload() {
        setStageContent([])
        setStage({})
        setPhase(0)
        setPoints(0)
        // setChanged(false)
    }

    //FUNÇÃO P/TASKS POR ESTAGIO
    const getTaskData = (stageId, content) => {
        let stageC = content

        getTaskByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao bucar dados referentes à task OU task inexistente (?)")
                } else {
                    data.forEach(element => {
                        stageC.push(element)
                    });
                }

                setStageContent(stageC)
                console.log({ stc: stageC })
            })
    }

    function onPressing(state) {
        if (state == 1) {
            setPoints(points + 1)
            setPhase(phase + 1)
        } else if (state == 2) {
            setPhase(phase + 1)
        }
    }

    //CRIAÇÃO DE ELEMENTOS COM SEU RESPECTIVO "TIPO" (?)
    // const listContent = stageContent.length > 0 ? stageContent.map((e, i) => {
    //     switch (e.id_operation) {
    //         case 1:
    //             return (
    //                 <BasicAct task={e} press={(e) => onPressing(e)} />
    //             )
    //         case 2:
    //             return (
    //                 <IntermediaryAct task={e} press={(e) => onPressing(e)} />
    //             )
    //         case 3:
    //             return (
    //                 <AdvancedAct task={e} press={(e) => onPressing(e)} />
    //             )
    //     }
    //     if (!e.id_operation) {
    //         return (
    //             <View key={i} style={{ flex: 1, flexDirection: 'column', padding: 15 }}>
    //                 <Details data={e} />
    //                 <Button style={{ height: "auto", width: "90%", alignSelf: 'center', marginTop: 20 }} onPress={() => onPressing(true)} mode='contained'>Avançar</Button>
    //             </View>
    //         )
    //     }
    // }) : []

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* {listContent.length > 0 && phase < stageContent.length ? listContent[phase] : <></>}
                {phase >= stageContent.length && stageContent.length > 0 && ( */}
                    <View>
                        <Text style={styles.title}>ESTÁGIO CONCLUÍDO</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ProgressBar />
                        </View>
                    </View>
                {/* )} */}
            </View>
        </View>
    );
}