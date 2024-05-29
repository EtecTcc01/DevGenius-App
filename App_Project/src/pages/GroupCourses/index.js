import * as React from 'react'
import { styles } from './style';
import { ScrollView, Text, View } from 'react-native';

// import { Modal, Portal, PaperProvider, Button, Card } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import { ListCourses } from '../../components/Lists/ListCourses';
import { getCourseByGroup, getRegistrationByGroup, getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services';
import { useNavigation } from '@react-navigation/native';

export function GroupCourses({ route }) {
    const navigation = useNavigation()

    const [user, setUser] = React.useState({})
    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DA PAG. MAIN

    const [registration, setRegistration] = React.useState([])

    //FUNÇÃO P/BUSCAR OS CURSOS DO 1° GRUPO (PUBLICO) 
    React.useEffect(() => {
        if (route.params.group) {
            getCourseByGroup(route.params.group.group_id)
                .then((data) => {
                    setCourse(data)
                    console.log(data)
                })
        }
    }, [route.params.group])

    React.useEffect(() => {
        if (route.params.group) {
            getDataUser()
                .then((data) => {
                    if (!data || data.length < 1) {
                        console.log("Erro ao buscar os dados do usuário")
                        return
                    }
                    setUser(data)
                    getRegistrations(data.id_user, route.params.group.group_id)
                })
        }
    }, [route.params.group])

    function getRegistrations(userId, groupId) {
        getRegistrationByGroup(userId, groupId)
            .then((data) => {
                if (!data || data.length < 1) {
                    console.log("Erro ao buscar os dados referentes aos estagios do grupo.")
                    return
                }
                setRegistration(data)
                console.log(data)
            })
    }

    async function handlerTransfer(element, op) {
        let validation = false
        let transfer = []
        // setSelected(element)

        await getRegistrationForStages(user.id_user, element.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar os dados do usuário")
                    return
                }
                // setRegistration(data)
                validation = true
                transfer = data
            })

        if (validation === true) {
            navigation.navigate(`${op}`, { course: element, registration: transfer })
        }
    }

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {
                course.length > 0 && (
                    <>
                        <View style={styles.content}>
                            <ListCourses registrations={registration} courses={course} handlerOnPress={(e, op) => handlerTransfer(e, op)} />
                        </View>
                    </>
                )
            }
        </ScrollView>
    );
}
