import * as React from 'react';
import { styles } from './style'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../../../../api';

export function SignInForm() {
    const navigation = useNavigation();

    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");
    // const [typeUser, setTypeUser] = React.useState("comum");

    async function handleRegister() {
        if (confirmPass != userPassword) {
            return alert("Senha não compatíveis.");
        }
        if (!confirmPass || !userPassword) {
            return alert("Por favor, inira uma senha.");
        }
        if (!userEmail) {
            return alert("Por favor, insira um e-mail.");
        }
        if (!userName) {
            return alert("Por favor, insira um nome de usuário.");
        }

        try {
            const res = await api.get(`user/verify/${userEmail}`);
        } catch (error) {
            return alert(`Email já cadastrado.`);
        }

        const dataUser = { userName, userEmail, userPassword, typeUser: "comum" }

        navigation.navigate('UserInfo', { dataUser })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}
            variant="titleLarge">Cadastro</Text>

            <TextInput style={styles.input}
            label="Nome de Usuário:"
            textColor='white'
            value={userName}
            onChangeText={userName => 
            setUserName(userName)} />

            <TextInput style={styles.input}
            label="E-mail:"
            textColor='white'
            value={userEmail}
            onChangeText={userEmail =>
            setUserEmail(userEmail)} />

            <TextInput style={styles.input}
            label="Senha:"
            textColor='white'
            value={userPassword}
            onChangeText={userPassword =>
            setUserPassword(userPassword)} />

            <TextInput style={styles.input}
            label="Confirmar senha:"
            textColor='white'
            value={confirmPass}
            onChangeText={confirmPass =>
            setConfirmPass(confirmPass)} />
            
            <Button
                style={[styles.btn, { backgroundColor: '#06c244' }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleRegister()}
            >
                Cadastre-se
            </Button>
        </View>
    );
}