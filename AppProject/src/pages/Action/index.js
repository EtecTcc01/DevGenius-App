import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ProgressBar, MD3Colors, Button } from 'react-native-paper';

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';

// IMPORT DOS COMPONENTE USADOS
import { BasicTask } from '../../components/Action/Basic';
import { IntermediaryTask } from '../../components/Action/Intermediary';
import { AdvancedTask } from '../../components/Action/Advanced';

export function Action({ route }) {
    let registration = route.params.registration[0]
    const course = route.params.course

    const [stages, setStages] = React.useState([])
    const [tasks, setTasks] = React.useState([])
    const [teorys, setTeorys] = React.useState([])

    React.useEffect(() => {
        getStagesByCourse(course.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados relacionados aos estagios.")
                    return
                }
                setStages(data)
                getTaskData(data[registration.level_stage]._id)
                getTeoryData(data[registration.level_stage]._id)

                console.log({st: data})
            })
    }, [])

    const getTaskData = (stageId) => {
        getTaskByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao bucar dados referentes à task")
                    return
                }
                setTasks(data)
                console.log({ta: data})
            })
    }

    const getTeoryData = (stageId) => {
        getTeoryByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Teoria Inexistente...")
                    return
                }
                setTeorys(data)
                console.log({te: data})
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleA}>Action</Text>
            {/* {tasks.length > 0 ? <AdvancedTask task={tasks[0]}/> : []} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    titleA: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center',
    },
});