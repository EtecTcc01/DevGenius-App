import * as React from 'react'
import { styles } from './style';
import { ScrollView, Image, View, Text, Modal, TouchableOpacity } from 'react-native';
import api from '../../../api';

import { ListGroups } from '../../components/Lists/ListGroups';

import { getDataUser } from '../../functions/async.services';
import { getAllUserGroups } from '../../functions/helper.services';

import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { Button, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ToastManager, { Toast } from 'toastify-react-native'

export function Groups() {
    const navigation = useNavigation()

    const [visible, setVisible] = React.useState(false)
    const [changed, setChanged] = React.useState(false)

    const [user, setUser] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [selected, setSelected] = React.useState("");

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
                visibleSwitch()
                setChanged(!changed)
            }, 3200);

        } catch (error) {
            if (`${error}`.includes('401')) {
                console.log(`Erro ao adicionar usuário ao grupo. ${error}`);
                showToasts("success", "Grupo já adicionado.")
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
    }, [changed])

    function handlerTransfer(element) {
        navigation.navigate("GroupCourses", { group: element })
    }

    const visibleSwitch = () => {
        setVisible(!visible)
    }

    return (
        <View style={styles.container}>
            <ToastManager
                positionValue={0}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => visibleSwitch()}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Adicionar Grupo</Text>
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
                            <Text style={styles.subtitle}>Entrar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Animatable.View animation="fadeIn" duration={1000} style={styles.img_demo}>
                <Image style={styles.img} source={require("../../../assets/img/networking.png")} />
            </Animatable.View>

            <View style={styles.content}>
                {groups ? <ListGroups groups={groups} handlerOnPress={(e) => handlerTransfer(e)} /> : <></>}
            </View>

            <View style={{ position: "absolute", alignSelf: "flex-end", height: '100%', justifyContent: "flex-end", padding: 15 }}>
                <IconButton
                    mode='contained'
                    icon="plus"
                    iconColor={MD3Colors.primary20}
                    delayHoverOut={1000}
                    size={40}
                    onPress={() => visibleSwitch()}
                />
                {/* <Ionicons name="add-circle-outline" size={50} color="white" /> */}
            </View>
        </View>
    );
}
