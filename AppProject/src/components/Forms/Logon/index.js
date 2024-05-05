import * as React from 'react';
import { styles } from './style';
import { View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper'; //IMPORTAÇÃO DE COMPONENTS DO PAPER
import { useNavigation } from '@react-navigation/native'; //IMPORTAÇÃO P/TRANSFERENCIA DE TELA

//IMPORT'S DA FUNÇÕES P/ASYNC E USUÁRIO
import { storeUserData } from '../../../functions/async.services';
import { userLogin } from '../../../functions/user.services';

export function LogInForm() {
    const navigation = useNavigation(); //PASSANDO AS FUNÇÕES DO IMPORT

    //STATE P/ARMAZENAR DADOS DO USUÁRIO
    const [user, setUser] = React.useState({
        userEmail: '',
        userPassword: ''
    })

    //FUNÇÃO P/LOGAR NA CONTA DO USUÁRIO
    async function handlerLogin() {

        const skip = await userLogin({ user }).then((data) => {
            if (!data) {
                alert("Erro no login. Verifique o email e senha do usuário...")
                return
            }
            // ARMAZENANDO DADOS DO USUÁRIO COM ASYNC
            storeUserData({ user: data })
                .then((res) => {
                    if (!res) {
                        alert("Erro ao armazenar os dados do usuário")
                        return
                    }
                    navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
                })
        })
    }

    // function handleForgotPass() {
    //     // Lógica para lidar com esqueceu a senha
    // }

    //FUNÇÃO P/ALTERAR OU ADICIONAR UM NOVO "ELEMENTO" NO OBJETO
    function handlerOnChangeUser({ _name, _value }) {
        setUser({ ...user, [_name]: _value })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Login</Text>
            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="E-mail:"
                id='userEmail'
                key='userEmail'
                textColor='white'
                value={user.userEmail}
                onChangeText={event => handlerOnChangeUser({ _name: "userEmail", _value: event })}
            />

            <TextInput
                style={[styles.input, { color: '#06c244' }]}
                label="Senha:"
                id='userPassword'
                key='userPassword'
                textColor='white'
                value={user.userPassword}
                onChangeText={event => handlerOnChangeUser({ _name: "userPassword", _value: event })}
                secureTextEntry
            />

            <Button
                style={[styles.btnLogin, { backgroundColor: '#06c244', marginBottom: 10 }]}
                mode="contained"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                key="handlerLogin"
                onPress={() => handlerLogin()}
            >
                Entrar
            </Button>

            <Button
                style={[styles.btnForgot, { color: '#06c244', fontSize: 16, marginTop: 20 }]}
                mode="text"
                key="forgotPass"            
                // onPress={() => handleForgotPass()}
            >
                Esqueceu a senha?
            </Button>

            <Button
                style={[styles.btnRegister, { backgroundColor: '#06c244' }]}
                mode="contained"
                key="handlerSignIn"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={() => navigation.navigate("Begin-Form", { operation: "Register" })}
            >
                Cadastre-se
            </Button>
        </View>
    );
}
