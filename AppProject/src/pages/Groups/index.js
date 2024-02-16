import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as React from 'react';
import api from '../../../api';
import { ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../apis/contexts/user'
import { Button, TextInput } from 'react-native-paper';

export function Groups() {
    const { user } = React.useContext(UserContext)
    const navigation = useNavigation()
    const [groups, setGroups] = React.useState([]);
    const [idGroup, setIdGroup] = React.useState("");
    const userName = user.user_name;

    const getAllGroupUser = async () => {
        try {
            const res = await api.get(`/group/userGroups/${user.user_name}`)
            const group = (res.data.group)
            setGroups(res.data.group)
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    React.useEffect(() => {
        getAllGroupUser()
    }, [])

    const handleGroupUser = async () => {
        const dataGroupUser = { idGroup, userName };

        if (!idGroup) {
            return alert("Por favor, insira o código do grupo.");
        }

        if (!userName) {
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
            <ScrollView style={styles.contentB}>
                {listGroups}
            </ScrollView>
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
                    onPress={() => handleGroupUser()}
                >
                    Adicionar 
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    input: {
        margin: 5,
        width: '80%',
    },
    content: {
        flex: 1,
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        marginLeft: '7%',
        marginTop: '7%',
    },
    contentB: {
        flex: 2,
        padding: '4%',
        backgroundColor: '#000',
        width: '100%',
        minHeight: '60%'
    },
    contentC: {
        flex: 1,
        padding: '4%',
        backgroundColor: '#000',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom: '7%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#06c244',
    },
    listItem: {
        backgroundColor: '#fff',
        margin: '2%'
    },
    listItemTitle: {
        color: '#000',
        fontWeight: 'bold'
    },
});
