import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import { Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse, progressUpdate } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';
import { useNavigation } from '@react-navigation/native';

// IMPORT DOS COMPONENTE USADOS
import { BasicTask } from '../../components/Action/Basic';
import { IntermediaryTask } from '../../components/Action/Intermediary';
import { AdvancedTask } from '../../components/Action/Advanced';
import { TeoryDetail } from '../TeoryNote/Detail';

export function Action({ route }) {
    const navigation = useNavigation()
    let registration = route.params.registration //VAR => PARAMETRO DE REGISTRO DE CURSO PELA ROTA
    const course = route.params.course //VAR => PARAMETRO DE CURSO PELA ROTA

    const [stageContent, setStageContent] = React.useState([]) //STATE P/ARMAZENAR TEORIAS/TASKS DO ESTAGIO
    const [stages, setStages] = React.useState([]) //STATE P/ARMAZENAR ESTAGIOS DO CURSO
    const [phase, setPhase] = React.useState(0) //STATE P/ARMAZENAR "FASES" DO ESTAGIO ATUAL
    const [points, setPoints] = React.useState(0) //STATE P/ARMAZENAR PONTOS (CORRETOS)
    const [changed, setChanged] = React.useState(false) //STATE P/ARMAZENAR ESTADO DE MUDANÇA DE ESTAGIO

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
                        // navigation.navigate(`DoneScreen`, { course: course, registration: registration })
                    })

            }
        } catch {
            []
        }
    }, [phase])

    //FUNÇÃO P/RECARREGAR PAG.
    function reload() {
        setStageContent([])
        setStages([])
        setPhase(0)
        setPoints(0)
        setChanged(false)
    }

    //FUNÇÃO P/BUSCAR CURSOS POR ESTAGIO
    React.useEffect(() => {
        if (changed == true) {
            reload()
        }

        getStagesByCourse(course.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados relacionados aos estagios.")
                    return
                }
                setStages(data)
                getTeoryData(data[registration.level_stage]._id)
            })
    }, [registration])

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
                console.log(stageC)
            })
    }

    if (stageContent.length < 1) {
        return <Text style={styles.titleA}>ERRO</Text>
    }

    function handlerTransfer() {
        // navigation.navigate(`Action`, { course: course, registration: registration })
        // navigation.navigate(`DoneScreen`, { course: course, registration: registration })
        navigation.navigate(`Home`)
    }

    function onPressing(state) {
        if (state == true) {
            setPoints(points + 1)
            setPhase(phase + 1)
        }
    }

    //CRIAÇÃO DE ELEMENTOS COM SEU RESPECTIVO "TIPO" (?)
    const listContent = stageContent.length > 0 ? stageContent.map((e) => {
        switch (e.id_operation) {
            case 1:
                return (
                    <BasicTask task={e} press={(e) => onPressing(e)} />
                )
            case 2:
                return (
                    <IntermediaryTask task={e} press={(e) => onPressing(e)} />
                )
            case 3:
                return (
                    <AdvancedTask task={e} press={(e) => onPressing(e)} />
                )
        }
        if (!e.id_operation) {
            return <TeoryDetail data={e} />
        }
    }) : []

    return (
        <View style={styles.container}>
            <View style={styles.contentA}>
                {listContent.length > 0 && phase < stageContent.length ? listContent[phase] : <></>}
                {phase >= stageContent.length ?
                    <>
                        <Text style={styles.titleA}>ESTAGIO CONCLUIDO</Text>
                        {/* <Button onPress={() => handlerTransfer()} mode='contained'>Avançar Estágio</Button> */}
                        <Button onPress={() => handlerTransfer()} mode='contained'>Retornar Home</Button>
                    </> : <> </>}
            </View>

            {listContent.length > 0 && phase < stageContent.length && (
                <>
                    {!stageContent[phase].id_operation ? <Button onPress={() => onPressing(true)} mode='contained'>Avançar</Button> : <> </>}
                </>
            )}

        </View>
    );
}

// export function DoneScreen({ route }) {
//     const navigation = useNavigation()
//     console.log(route.params)
//     const course = route.params.course
//     const registration = route.params.registration

//     return (
//         <View style={styles.container}>
//             <Text style={styles.titleA}>ESTAGIO CONCLUIDO</Text>
//             <Button onPress={() => navigation.navigate(`Action`, { course: course, registration: registration[0] })} mode='contained'>Avançar Estágio</Button>
//         </View>
//     )
// }