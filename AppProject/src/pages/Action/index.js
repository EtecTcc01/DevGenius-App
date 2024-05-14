import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';
import { ProgressBar, MD3Colors, Button } from 'react-native-paper';

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';

// IMPORT DOS COMPONENTE USADOS
import { BasicTask } from '../../components/Action/Basic';
import { IntermediaryTask } from '../../components/Action/Intermediary';
import { AdvancedTask } from '../../components/Action/Advanced';

export function Action({ route }) {
    let registration = route.params.registration[0] //VAR => PARAMETRO DE REGISTRO DE CURSO PELA ROTA
    const course = route.params.course //VAR => PARAMETRO DE CURSO PELA ROTA

    const [stageContent, setStageContent] = React.useState([]) //STATE P/ARMAZENAR TEORIAS/TASKS DO ESTAGIO
    const [stages, setStages] = React.useState([]) //STATE P/ARMAZENAR ESTAGIOS DO CURSO
    const [phase, setPhase] = React.useState(0) //STATE P/ARMAZENAR "FASES" DO ESTAGIO ATUAL

    //FUNÇÃO P/BUSCAR CURSOS POR ESTAGIO
    React.useEffect(() => {
        getStagesByCourse(course.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados relacionados aos estagios.")
                    return
                }
                setStages(data)
                getTeoryData(data[registration.level_stage]._id)
            })
    }, [])

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
                    console.log("Erro ao bucar dados referentes à task")
                    return
                }

                data.forEach(element => {
                    stageC.push(element)
                });


                setStageContent(stageC)
            })
    }

    //CRIAÇÃO DE ELEMENTOS COM SEU RESPECTIVO "TIPO" (?)
    const listContent = stageContent.map((e) => {
        console.log(e)
        switch (e.id_operation) {
            case 1:
                return (
                    <BasicTask task={e} />
                )
            case 2:
                return (
                    <IntermediaryTask task={e} />
                )
            case 3:
                return (
                    <AdvancedTask task={e} />
                )
        }
        if (!e.id_operation) {
            return <Text style={styles.titleA}>{e._name}</Text>
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.titleA}>Action</Text>
                <Button onPress={() => setPhase(phase + 1)} mode='contained'>Avançar</Button>
            </View>
            <View style={styles.contentA}>
                {listContent.length > 0 ? listContent[phase] : []}
            </View>
        </View>
    );
}