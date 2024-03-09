import { Text, View } from 'react-native';
import { styles } from './style';
import * as React from 'react';
import api from '../../../api';
import { ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function GroupList() {
    const navigation = useNavigation()
    const [user, setUser] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [idGroup, setIdGroup] = React.useState("");
    const [listGroup2, setListGroup2] = React.useState("teste")

    const getDataUser = async () => {
        console.log("::::::::::::::::")
        await AsyncStorage.getItem('userLogin')
            .then((jsonValue) => {
                jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
                getAllGroupUser({usr: JSON.parse(jsonValue)})
            }).catch((error) => {
                alert(`Erro ao coletar dados referente ao usuário. ${error}`)
            })
    };

    React.useEffect(() => {
        getDataUser();
    }, []);

    const getAllGroupUser = async ({usr}) => {
        const userName = usr.user_name;
        console.log(userName)

        await api.get(`/group/userGroups/${userName}`)
            .then((res) => {
                console.log(res.data)
                setGroups(res.data.group)
            }).catch((error) => {
                alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            })
    }

    const handleGroupUser = async (userName) => {
        const dataGroupUser = { idGroup, userName };
        console.log(user)

        if (!idGroup) {
            return alert("Por favor, insira o código do grupo.");
        }

        if (!user.user_name) {
            return alert("Não há nome de usuário para efetuar o cadastro.");
        }

        try {
            await api.post('/group/groupUser', dataGroupUser);

            alert("Usuário adicionado ao grupo com sucesso.")
        } catch (error) {
            alert(`Erro ao adicionar usuário ao grupo. ${error}`);
        }
    }

    const listGroups = groups.map((item) => {
        return (
            <ListItem containerStyle={styles.listItem} bottomDivider={true}>
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemTitle}>{item._name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>SEUS GRUPOS</Text>
            </View>
            <View style={styles.contentB}>
                {listGroups}
            </View>
            <View style={styles.contentC}>
                <TextInput
                    style={styles.input}
                    label="Código do grupo:"
                    value={idGroup}
                    onChangeText={idGroup => setIdGroup(idGroup)}
                />
                <Button
                    style={{ backgroundColor: '#06c244', marginTop: 20 }}
                    mode="contained"
                    onPress={() => handleGroupUser(user.user_name)}
                >
                    Adicionar
                </Button>
            </View>
        </View>
    )
}
