import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { ListStages } from '../../components/Lists/ListStages';
import { getStagesByCourse } from '../../functions/helper.services';
import { useNavigation } from '@react-navigation/native';

export function Stages({ route }) {
    const navigation = useNavigation()

    const [stages, setStages] = React.useState([])
    const [course, setCourse] = React.useState({})
    const [registration, setRegistration] = React.useState({})

    React.useEffect(() => {
        const data = route.params
        console.log(data.registration[0] || data.registration)
        setCourse(data.course)
        setRegistration(data.registration[0] || data.registration)
    }, [route.params])

    //FUNÇÃO P/BUSCAR CURSOS POR ESTAGIO
    React.useEffect(() => {
        if (course) {
            getStagesByCourse(course.id_course)
                .then((data) => {
                    if (!data || data.length < 0) {
                        console.log("Erro ao buscar dados relacionados aos estagios.")
                        return
                    }
                    setStages(data)
                    console.log(data)
                })
        }
    }, [course])

    function handlerTransfer(element, index) {
        navigation.navigate("Action", { course, registration: [registration], stage: {...element, "index": index} })
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {stages || stages.length > 0 ? <ListStages handlerOnPress={(element, index) => handlerTransfer(element, index)} filter={{ total: course.qtd_stages, actual: registration.level_stage }} stages={stages} /> : <></>}
                {course && registration && (
                    <View style={{ flex: 1, width: "100%"}}>
                        {
                            registration.level_stage >= course.qtd_stages - 1 ?
                                <Text style={styles.title}>Máximo de estágios atingidos. Peço que espere por mais atualizações</Text>
                                :
                                <Text style={styles.title}>Continue progredindo nos estágios para desbloquear novos níveis.</Text>
                        }
                    </View>
                )}
            </View>
        </View>
    );
};