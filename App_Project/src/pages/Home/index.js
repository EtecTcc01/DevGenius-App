import * as React from 'react'
import { styles } from './style';
import { ScrollView, Text, View } from 'react-native';

// import { Modal, Portal, PaperProvider, Button, Card } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import { ListCourses } from '../../components/Lists/ListCourses';
import { getCourseByGroup, getRegistrationByGroup, getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services';
import { useNavigation } from '@react-navigation/native';

export function Home({ route }) {
    const navigation = useNavigation()

    const [user, setUser] = React.useState({})
    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DA PAG. MAIN
    const [registration, setRegistration] = React.useState([])

    React.useEffect(() => {
        getDataUser()
            .then((data) => {
                if (!data || data.length < 1) {
                    console.log("Erro ao buscar os dados do usuário")
                    return
                }
                setUser(data)
                getRegistrations(data.id_user)
            })
    }, [route.params])

    function getRegistrations(userId) {
        getRegistrationByGroup(userId, 1)
            .then((data) => {
                if (!data || data.length < 1) {
                    console.log("Erro ao buscar os dados referentes aos estagios do grupo.")
                    return
                }
                setRegistration(data)
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

    //FUNÇÃO P/BUSCAR OS CURSOS DO 1° GRUPO (PUBLICO) 
    React.useEffect(() => {
        getCourseByGroup(1)
            .then((data) => {
                setCourse(data)
                console.log(data)
            })
    }, [])

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {
                course.length > 0 && (
                    <>
                        {/* <View style={styles.logo}>
                            <Image style={styles.logo} source={require('../../../assets/img/logo.png')} />
                        </View> */}

                        <View style={styles.content}>
                            <Text style={styles.title}>CURSOS PÚBLICOS</Text>
                            <ListCourses registrations={registration.length > 0 ? registration : []} courses={course} handlerOnPress={(e, op) => handlerTransfer(e, op)} />
                        </View>
                    </>
                )
            }
        </ScrollView>
    );
}
