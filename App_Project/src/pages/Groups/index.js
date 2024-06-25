import * as React from 'react'
import { styles } from './style';
import { ScrollView, Image, View, Text, Modal, TouchableOpacity } from 'react-native';
import api from '../../../api';

import { ListGroups } from '../../components/Lists/ListGroups';
import { SimpleLineIcons } from '@expo/vector-icons';
import { getChangedState, getDataUser } from '../../functions/async.services';
import { getAllUserGroups, userGroupSoftDel } from '../../functions/helper.services';

import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { Button, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ToastManager, { Toast } from 'toastify-react-native'

export function Groups() {
    const navigation = useNavigation()

    const [visible, setVisible] = React.useState(false)
    const [changed, setChanged] = React.useState(false)
    const [operation, setOperation] = React.useState("add")

    const [user, setUser] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [selected, setSelected] = React.useState("");
    const [choice, setChoice] = React.useState(0);

    const [changedT, setChangedT] = React.useState() //STATE P/ARMAZENAR STATE DE MUDANÇA
    const [timer, setTimer] = React.useState(0) //STATE P/ARMAZENAR N. DO TIMER

    // FUNÇÃO TEMPORIZADORA P/COLETA E ATUALIZAÇÃO DE DADOS
    React.useEffect(() => {
        getChangedState()
            .then((res) => {
                if (res !== changedT) {
                    setChangedT(res)
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

    const showToasts = (op, message) => {
        Toast[op](message, "top")
    }

    //FUNÇÃO SEPARADA P/ADICIONAR UM USUÁRIO AO GRUPO
    const handlerUserGroupRegister = async () => {

        //VALIDAÇÕES DAS ENTRADAS DE DADOS
        if (!selected) {
            return console.log("Por favor, insira o código do grupo.");
        }

        if (!user.id_user) {
            return console.log("Erro ao coletar dados do usuário.");
        }

        const data = { groupId: selected, userId: user.id_user }
        console.log(data)
        // REQUISIÇÃO DOS GRUPOS QUE O USUÁRIO PERTENCE
        try {
            await api.post('/group/userGroup', data)
                .then((res) => console.log(res.data))

            showToasts("success", "Grupo adicionado.")
            setTimeout(() => {
                visibleSwitch("close")
                setChanged(!changed)
                setSelected("")
            }, 2000);

        } catch (error) {
            if (`${error}`.includes('401')) {
                console.log(`Erro ao adicionar usuário ao grupo. ${error}`);
                showToasts("warn", "Grupo já adicionado.")
            } else {
                console.log(`${error}`)
            }
        }
    }

    React.useEffect(() => {
        //BUSCANDO DADOS DO USUÁRIO PELO ASYNC
        getDataUser()
            .then((res) => {
                if (!res) {
                    console.log("Erro ao buscar os dados do usuário.")
                    return
                }
                setUser(res)

                //BUSCANDO PELOS GRUPOS QUE O USUÁRIO PARTICIPA
                getAllUserGroups({ userId: res.id_user })
                    .then((data) => {
                        if (!res) {
                            console.log("Erro ao buscar os dados dos grupos do usuário.")
                            return
                        }
                        setGroups(data)
                        console.log(data)
                    })
            })
    }, [changed, changedT])

    function handlerTransfer(element, op) {
        if (op !== "modal") {
            navigation.navigate(op === "stages" ? "GroupCourses" : "GroupTeorys", { group: element })
        } else {
            setOperation("del")
            setChoice(element.group_id)
            setVisible(!visible)
        }
    }

    const visibleSwitch = (op) => {
        if (op === "add") {
            setOperation("add")
            setVisible(!visible)
        } else if (op === "close") {
            setVisible(!visible)
        }
    }

    function handlerSoftDel() {
        if (choice !== 0) {
            userGroupSoftDel(choice, user.id_user)
                .then((res) => {
                    if (res === false) {
                        console.log("Erro ao deletar o usuário do grupo.")
                        return
                    }

                    showToasts("success", "Grupo Removido.")
                    setTimeout(() => {
                        visibleSwitch("close")
                        setChanged(!changed)
                    }, 2000);

                })
        }
    }

    return (
        <View style={styles.container}>
            <ToastManager
                positionValue={0}
                width={"90%"}
                duration={1500}
                height={70}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => visibleSwitch("close")}
            >
                <View style={styles.centeredView}>
                    {operation === 'add' ? <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => visibleSwitch("close")}>
                            <SimpleLineIcons name="close" size={28} color='#06c244' />
                        </TouchableOpacity>
                        <Text style={styles.title}>ADICIONAR GRUPO</Text>
                        <TextInput
                            style={styles.input}
                            label="Código do Grupo..."
                            id='userGroup'
                            key='userGroup'
                            textColor='black'
                            value={selected}
                            onChangeText={event => setSelected(event)}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => handlerUserGroupRegister()}>
                            <Text style={styles.subtitle}>ENTRAR</Text>
                        </TouchableOpacity>

                    </View> : <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => visibleSwitch("close")}>
                            <SimpleLineIcons name="close" size={28} color='#06c244' />
                        </TouchableOpacity>

                        <Text style={[styles.title, { color: 'red' }]}>ALERTA!!</Text>

                        <Text style={[styles.title, { textAlign: 'center' }]}>Você está prestes a sair do grupo... Tem certeza de sua escolha?</Text>

                        <TouchableOpacity style={styles.button} onPress={() => handlerSoftDel()}>
                            <Text style={styles.subtitle}>SAIR</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </Modal>

            <Animatable.View animation="fadeIn" duration={1000} style={styles.img_demo}>
                <Image style={styles.img} source={require("../../../assets/img/networking.png")} />
            </Animatable.View>

            <View style={styles.content}>
                {groups ? <ListGroups groups={groups} handlerOnPress={(e, op) => handlerTransfer(e, op)} /> : <></>}
            </View>

            <View style={{ position: "absolute", alignSelf: "flex-end", height: '100%', justifyContent: "flex-end", padding: 15 }}>
                <IconButton
                    mode='contained'
                    icon="plus"
                    iconColor={MD3Colors.primary20}
                    delayHoverOut={1000}
                    size={40}
                    onPress={() => visibleSwitch("add")}
                />
                {/* <Ionicons name="add-circle-outline" size={50} color="white" /> */}
            </View>
        </View>
    );
}
