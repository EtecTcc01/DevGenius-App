import * as React from 'react'
import { Text, View } from 'react-native';
import { styles } from './style';

import { Modal, Portal, PaperProvider, Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import { useNavigation } from '@react-navigation/native';

import { Course } from '../../components/Course'; //IMPORT DO COMPONENTE DE CURSOS

//IMPORT DE FUNÇÕES EXTERNAS
import { getCourseByGroup, getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services';

export function Home() {
    const navigation = useNavigation();

    const [user, setUser] = React.useState({})
    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DA PAG. MAIN
    const [registration, setRegistration] = React.useState([])
    const [selected, setSelected] = React.useState({})
    
    const [visibleModal, setVisibleModal] = React.useState(false)
    const modalSwitch = () => {
        setVisibleModal(!visibleModal)
    }

    function handlerOnPressTransfer() {
        modalSwitch()
        console.log({ course: selected, registration: registration[0] })
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
                console.log(data)
                setRegistration(() => data)
            })

        if (validation === true) {
            modalSwitch()
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
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>HOME</Text>
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

{/* <Card>
                <Card.Title title="HTML" subtitle="HTML é uma linguagem de marcação" />
                <Card.Cover source={{ uri: 'https://cdn.dribbble.com/users/783/screenshots/104300/shot_1295820312.gif' }} />
                <Card.Actions>
                <Button>Voltar</Button>
                <Button>Iniciar</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="CSS" subtitle="CSS é usado para estilizar elementos escritos em HTML " />
                <Card.Cover source={{ uri: 'https://www.codespot.org/assets/css.jpg' }} />
                <Card.Actions>
                <Button>Voltar</Button>
                <Button>Iniciar</Button>
                </Card.Actions>
            </Card> */}