import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native';

import { Modal, Portal, PaperProvider, Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

import { Course } from '../../../components/Course'; //IMPORT DE COMPONENTES USADOS
import { getCourseByGroup, getRegistrationForStages } from '../../../functions/helper.services'; //IMPORT DE FUNÇÃO EXTERNA
import { useNavigation } from '@react-navigation/native';
import { getDataUser } from '../../../functions/async.services';

export function GroupCourses({ route }) {
    const navigation = useNavigation();

    const group = route.params.group || {}
    console.log(route.params.group)

    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DO GRUPO
    const [user, setUser] = React.useState({})
    const [registration, setRegistration] = React.useState([])
    const [selected, setSelected] = React.useState({})

    const [visibleModal, setVisibleModal] = React.useState(false)
    const modalSwitch = () => {
        setVisibleModal(!visibleModal)
    }

    function handlerOnPressTransfer() {
        modalSwitch()
        navigation.navigate(`Action`, { course: selected, registration: registration[0] })
    }

    React.useEffect(() => {
        getDataUser()
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar os dados do usuário")
                    return
                }
                setUser(data)
            })
    }, [])

    async function getRegistration(element) {
        let validation = false
        setSelected(element)

        await getRegistrationForStages(user.id_user, element.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar os dados do usuário")
                    return
                }
                validation = true
                setRegistration(() => data)
            })

        if (validation === true) {
            modalSwitch()
        }

    }

    React.useEffect(() => {
        getCourseByGroup(group.group_id)
            .then((data) => setCourse(data))
    }, [group])

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Portal>
                    <Modal
                        visible={visibleModal}
                        onDismiss={modalSwitch}
                        dismissable={true}
                        dismissableBackButton={true}
                        contentContainerStyle={styles.modal}>
                        <View>
                            <>
                                {registration[0] && (
                                    <Text>{registration[0].level_stage > 0 ? `CONTINUAR CURSO A PARTIR DO ESTAGIO ${registration[0].level_stage}` : "COMEÇAR CURSO DO ZERO"}</Text>
                                )}
                            </>

                            <>
                                {registration[0] && (
                                    <Button disabled={registration[0].level_stage < selected.qtd_stages ? false : true} mode="contained" onPress={() => handlerOnPressTransfer()}>
                                        {registration[0].level_stage > 0 ? `CONTINUAR` : "COMEÇAR"}
                                    </Button>
                                )}
                            </>
                        </View>
                    </Modal>
                </Portal>
                {!course ? [] : <Course course={course} handlerOnPress={(e) => getRegistration(e)} />}
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        color: '#06c244',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    modal: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});