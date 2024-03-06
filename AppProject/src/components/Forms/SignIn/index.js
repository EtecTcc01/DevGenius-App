import { View } from 'react-native';
import { styles } from './style'
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, Text, TextInput } from 'react-native-paper';

export function SignInForm() {
    const navigation = useNavigation();

    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");
    const [typeUser, setTypeUser] = React.useState("comum");

    async function handleRegister() {
        if (confirmPass != userPassword) {
            return alert("Senha ou e-mail incorreto.");
        }
        if (!userEmail) {
            return alert("Por favor, insira um e-mail.");
        }
        if (!userName) {
            return alert("Por favor, insira um nome de usuário.");
        }

        const dataUser = { userName, userEmail, userPassword, typeUser }

        navigation.navigate('UserInfo', { dataUser })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.register} variant="titleLarge">Cadastro</Text>
            <TextInput style={styles.input} label="Nome de Usuário:" value={userName} onChangeText={userName => setUserName(userName)} />
            <TextInput style={styles.input} label="E-mail:" value={userEmail} onChangeText={userEmail => setUserEmail(userEmail)} />
            <TextInput style={styles.input} label="Senha:" value={userPassword} onChangeText={userPassword => setUserPassword(userPassword)} />
            <TextInput style={styles.input} label="Confirmar senha:" value={confirmPass} onChangeText={confirmPass => setConfirmPass(confirmPass)} />
            <Button
                style={[styles.btn3, { backgroundColor: '#06c244' }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleRegister()}
            >
                Cadastre-se
            </Button>
        </View>
    );
}