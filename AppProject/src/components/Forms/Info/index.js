import { View } from 'react-native';
import { styles } from './style'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../../../../api';

export function InfoForm(props) {
    const navigation = useNavigation();
    console.log(props.data)

    const [userSex, setUserSex] = React.useState("");
    const [userDate, setUserDate] = React.useState();

    const dataUser = props.data;
    const userName = dataUser.userName;
    const userEmail = dataUser.userEmail;

    async function handleRegister() {
        if (!userSex) {
            return alert("Por favor, insira seu sexo.");
        }
        if (!userDate) {
            return alert("Por favor, insira uma data de nascimento.");
        }

        try {
            await api.post('/user/register', dataUser)

            handleInfo();
        } catch (error) {
            alert(`Erro ao cadastrar usuário. ${error}`);
        }
    }


    async function handleInfo() {
        const dataInfo = { userName, userDate, userSex };

        try {
            await api.post('/info', dataInfo);

            alert("Usuário cadastrado com sucesso.")

            navigation.navigate('Tabs');
        } catch (error) {
            alert(`Erro ao cadastrar informações do usuário. ${error}`);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Informações</Text>
            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Sexo:"
                value={userSex}
                onChangeText={userSex => setUserSex(userSex)}
            />
            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Data de nascimento:"
                value={userDate}
                onChangeText={userDate => setUserDate(userDate)}
            />
            <Button
                style={[styles.button, { backgroundColor: '#06c244', marginTop: 20 }]}
                mode="contained"
                onPress={() => handleRegister()}
            >
                Adicione
            </Button>
        </View>
    );
}
