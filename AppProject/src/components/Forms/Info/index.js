import * as React from 'react';
import { styles } from './style'
import api from '../../../../api';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function InfoForm(props) {
    const navigation = useNavigation();
    const dataUser = props.data;

    const [userName, setUserName] = React.useState(dataUser.userName);
    const [userSex, setUserSex] = React.useState("");
    const [userDate, setUserDate] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");


    async function handleRegister() {
        if (!userSex) {
            return alert("Por favor, insira seu sexo.");
        }
        if (!firstName) {
            return alert("Por favor, insira seu nome.");
        }
        if (!lastName) {
            return alert("Por favor, insira seu sobrenome.");
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
        const dataInfo = { userName, firstName, lastName, userDate, userSex };

        try {
            await api.post('/info', dataInfo);

            alert("Usuário cadastrado com sucesso.")

            const user = {
                date_birth: userDate,
                first_name: firstName,
                last_name: lastName,
                total_exp: 0,
                user_email: dataUser.userEmail,
                user_inactive: 0,
                user_level: 0,
                user_name: userName,
                user_password: dataUser.userPassword,
                user_sex: userSex
            }

            storeDataUser({user: user})
        } catch (error) {
            alert(`Erro ao cadastrar informações do usuário. ${error}`);
        }
    }

    const storeDataUser = async ({ user }) => {
        console.log(user)
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('userLogin', jsonValue);

            navigation.navigate('Tabs')
        } catch (error) {
            console.log(`Erro ao salvar dados do usuário. ${error}`)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Informações</Text>
            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Nome:"
                value={firstName}
                onChangeText={firstName => setFirstName(firstName)}
            />
            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Sobrenome:"
                value={lastName}
                onChangeText={lastName => setLastName(lastName)}
            />
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
