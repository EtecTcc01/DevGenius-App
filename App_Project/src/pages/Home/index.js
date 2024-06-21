import * as React from 'react'
import { styles } from './style';
import { ScrollView, Text, View } from 'react-native';

import { ListCourses } from '../../components/Lists/ListCourses';
import { getCourseByGroup, getRegistrationByGroup, getRegistrationForStages } from '../../functions/helper.services';
import { getChangedState, getDataUser } from '../../functions/async.services';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function Home({ route }) {
    const navigation = useNavigation()

    const [user, setUser] = React.useState({})
    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DA PAG. MAIN
    const [registration, setRegistration] = React.useState([])

    const [changed, setChanged] = React.useState() //STATE P/ARMAZENAR STATE DE MUDANÇA
    const [timer, setTimer] = React.useState(0) //STATE P/ARMAZENAR N. DO TIMER

    // FUNÇÃO TEMPORIZADORA P/COLETA E ATUALIZAÇÃO DE DADOS
    React.useEffect(() => {
        getChangedState()
            .then((res) => {
                if (res !== changed) {
                    setChanged(res - 1)
                }
            })

        setTimeout(() => {
            if (timer >= 10) {
                setTimer(0)
            } else {
                setTimer(timer + 1)
            }
        }, 1500);
    }, [timer])

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
    }, [route.params, changed])

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
    }, [changed])

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Animatable.View animation="flipInY" duration={2000} style={styles.demo}>
                <Text style={styles.title_demo}>DEVGENIUS</Text>
            </Animatable.View>
            <View style={styles.content}>
                <Text style={styles.title}>CURSOS PÚBLICOS</Text>
                {
                    course.length > 0 && (
                        <ListCourses registrations={registration.length > 0 ? registration : []} courses={course} handlerOnPress={(e, op) => handlerTransfer(e, op)} />
                    )
                }
            </View>
        </ScrollView>
    );
}
