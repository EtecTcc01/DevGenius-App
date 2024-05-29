import * as React from 'react'
import { styles } from './style';
import { ScrollView, Image, View, Text } from 'react-native';
import api from '../../../api';
import { ListGroups } from '../../components/Lists/ListGroups';
import { getDataUser } from '../../functions/async.services';
import { getAllUserGroups } from '../../functions/helper.services';
import { useNavigation } from '@react-navigation/native';

export function Groups() {
    const navigation = useNavigation()

    const [user, setUser] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [selected, setSelected] = React.useState("");

    //FUNÇÃO SEPARADA P/ADICIONAR UM USUÁRIO AO GRUPO
    const handlerUserGroupRegister = async (userId) => {
        const data = { groupId, userId };

        //VALIDAÇÕES DAS ENTRADAS DE DADOS
        if (!groupId) {
            return alert("Por favor, insira o código do grupo.");
        }

        if (!user.id_user) {
            return alert("Erro ao cadastrar usuário no grupo.");
        }

        // REQUISIÇÃO DOS GRUPOS QUE O USUÁRIO PERTENCE
        try {
            await api.post('/group/userGroup', data);
            console.log("Usuário adicionado ao grupo com sucesso.")
        } catch (error) {
            console.log(`Erro ao adicionar usuário ao grupo. ${error}`);
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
    }, [])

    function handlerTransfer(element) {
        navigation.navigate("GroupCourses", { group: element })
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
            <View style={styles.img_demo}>
                <Image style={styles.img} source={require("../../../assets/img/networking.png")} />
            </View>

            <View style={styles.content}>
                {groups ? <ListGroups groups={groups} handlerOnPress={(e) => handlerTransfer(e)} /> : <></>}
            </View>
        </ScrollView>
    );
}
