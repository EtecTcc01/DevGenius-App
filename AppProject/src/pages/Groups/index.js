import * as React from 'react';
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';

import api from '../../../api'; //IMPORTAÇÃO DA API AXIOS DO BACK
import { getDataUser } from '../../functions/async.services'; //FUNÇÃO ASYNC QUE BUSCA DADOS DO USUÁRIO
import { getAllUserGroups } from '../../functions/helper.services'; //FUNÇÃO P/BUSCAR DADOS DOS GRUPOS DO USUÁRIO
import { Button, TextInput, List } from 'react-native-paper'; //IMPORT DOS ELEMENTOS DO PAPER
// import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA 

export function Groups() {
    // const navigation = useNavigation()
    const [user, setUser] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [groupId, setGroupId] = React.useState("");

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
                    })
            })
    }, [])

    //FUNÇÃO SEPARADA P/ADICIONAR UM USUÁRIO AO GRUPO
    const handlerUserGroup = async (userId) => {
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
            alert("Usuário adicionado ao grupo com sucesso.")
        } catch (error) {
            alert(`Erro ao adicionar usuário ao grupo. ${error}`);
        }
    }

    //CRIAÇÃO DOS ITEMS REFERENTES AOS GRUPOS DO USUÁRIO
    const listGroups = !groups ? <View /> : groups.map((item, index) =>
        <TouchableOpacity style={styles.listItem} key={index}>
            <List.Item
                title={item.group_name}
                titleStyle={styles.listItemTitle}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>SEUS GRUPOS</Text>
            </View>
            <View style={styles.contentA}>
                {listGroups}
            </View>
            <View style={styles.contentB}>
                <TextInput
                    style={styles.input}
                    label="Código do grupo:"
                    value={groupId}
                    onChangeText={groupId => setGroupId(groupId)}
                />
                <Button
                    style={{ backgroundColor: '#06c244', marginTop: 20 }}
                    mode="contained"
                    onPress={() => handlerUserGroup(user.id_user)}
                >
                    Adicionar
                </Button>
            </View>
        </View>
    )
}