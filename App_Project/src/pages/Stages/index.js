import * as React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
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
        setCourse(data.course)
        setRegistration(data.registration[0])
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

    function handlerTransfer(element) {
        navigation.navigate("Action", { course, registration, stage: element })
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {stages || stages.length > 0 ? <ListStages handlerOnPress={(element) => handlerTransfer(element)} filter={{ total: course.qtd_stages, actual: registration.level_stage }} stages={stages} /> : <></>}
            </View>
        </View>
    );
};