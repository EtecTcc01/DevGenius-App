import * as React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import api from '../../../../api';
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
    function handleCadastro() {
        navigation.navigate('SignIn');
    }

    function handleEsqueceuSenha() {
        // Lógica para lidar com esqueceu a senha
    }

    return (
        <View style={styles.container}>
            <Text style={styles.login} variant="titleLarge">Login</Text>
            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="E-mail:"
                value={userEmail}
                onChangeText={userEmail => setUserEmail(userEmail)}
            />

            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="Senha:"
                value={userPassword}
                onChangeText={userPassword => setUserPassword(userPassword)}
                secureTextEntry
            />

            <Button
                style={[styles.btn1, { backgroundColor: '#06c244', marginBottom: 10 }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleLogin()}
            >
                Entrar
            </Button>

            <Button
                style={[styles.btn2, { color: '#06c244', fontSize: 16, marginTop: 20 }]}
                mode="text"
                onPress={() => handleEsqueceuSenha()}
            >
                Esqueceu a senha?
            </Button>

            <Button
                style={[styles.btn3, { backgroundColor: '#06c244' }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => handleCadastro()}
            >
                Cadastre-se
            </Button>
        </View>
    );
}
