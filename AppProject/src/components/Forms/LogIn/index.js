import * as React from 'react';
import { styles } from './style';
import api from '../../../../api';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LogInForm() {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");

    async function handleLogin() {
        const dataLogin = { userEmail, userPassword };

        await api.post('/user/validation', dataLogin)
            .then(() => {
                alert("Usuário logado com sucesso.");
                getDataUser()
            }).catch((error) => {
                alert(`Erro ao logar na conta usuário. ${error}`);
                return []
            })
    }

    const getDataUser = async () => {
        await api.get(`/user/infoUn/${userEmail}`)
            .then((res) => {
                storeDataUser({ user: res.data.user[0] })
                console.log(res.data.user[0])
            }).catch((error) => {
                alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            })
    };

    const storeDataUser = async ({ user }) => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('userLogin', jsonValue);

            navigation.navigate('Tabs')
        } catch (error) {
            console.log(`Erro ao salvar dados do usuário. ${error}`)
        }
    };

    // Função para navegar para a tela de cadastro (SignIn)
    function handleRegister() {
        navigation.navigate('SignIn');
    }

    function handleForgotPass() {
        // Lógica para lidar com esqueceu a senha
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Login</Text>
            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="E-mail:"
                textColor='white'
                value={userEmail}
                onChangeText={userEmail => setUserEmail(userEmail)}
            />

            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="Senha:"
                textColor='white'
                value={userPassword}
                onChangeText={userPassword => setUserPassword(userPassword)}
                secureTextEntry
            />

            <Button
                style={[styles.btnLogin, { backgroundColor: '#06c244', marginBottom: 10 }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleLogin()}
            >
                Entrar
            </Button>

            <Button
                style={[styles.btnForgot, { color: '#06c244', fontSize: 16, marginTop: 20 }]}
                mode="text"
                onPress={() => handleForgotPass()}
            >
                Esqueceu a senha?
            </Button>

            <Button
                style={[styles.btnRegister, { backgroundColor: '#06c244' }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleRegister()}
            >
                Cadastre-se
            </Button>
        </View>
    );
}
