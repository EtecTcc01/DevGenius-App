import * as React from 'react'
import { styles } from './style';
import { View, ScrollView } from 'react-native';

import { Button, Text, TextInput, HelperText } from 'react-native-paper'; //IMPORT DO PAPER

import { useNavigation } from '@react-navigation/native';
import { userLogin } from '../../../functions/user.services';
import { storeUserData } from '../../../functions/async.services';

export function Logon({ handlerOnPress }) {
    const navigation = useNavigation()

    //STATE P/ARMAZENAR DADOS DO USUÁRIO
    const [user, setUser] = React.useState({
        userEmail: '',
        userPassword: ''
    })

    //FUNÇÃO P/LOGAR NA CONTA DO USUÁRIO
    async function handlerLogin() {
        let verify = hasErrors("userEmail", "verify")

        if (verify === true) {
            handlerOnPress("warn", "Insira os dados...")
            return
        }

        await userLogin({ user })
            .then(async (data) => {
                if (!data) {
                    await handlerOnPress("warn", "Email/senha incorreta.")
                    return
                }
                // ARMAZENANDO DADOS DO USUÁRIO COM ASYNC
                await storeUserData({ user: data })
                    .then(async (res) => {
                        if (!res) {
                            console.log("Erro ao registrar informações do usuário.")
                            return
                        }
                        
                        await handlerOnPress("success", "Usuário Logado.")
                        setTimeout(() => {
                            navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
                        }, 3200);
                    })
            })
    }

    //FUNÇÃO P/ALTERAR OU ADICIONAR UM NOVO "ELEMENTO" NO OBJETO
    function handlerOnChangeUser({ _name, _value }) {
        setUser({ ...user, [_name]: _value })
    }

    function handleForgotPass() {
        // Lógica para lidar com esqueceu a senha
    }

    function hasErrors(name, operation) {
        if (user[name]) {
            return !user[name].includes('@');
        }
        
        return operation === "verify" ? true : false
    };

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
            <Text style={styles.title} variant="titleLarge">Login</Text>
            <TextInput
                style={styles.input}
                label="E-mail:"
                id='userEmail'
                key='userEmail'
                placeholderTextColor="white"
                textColor='white'
                value={user.userEmail}
                onChangeText={event => handlerOnChangeUser({ _name: "userEmail", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("userEmail", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Email inválido!</Text>
            </HelperText>

            <TextInput
                style={styles.input}
                label="Senha:"
                id='userPassword'
                key='userPassword'
                placeholderTextColor="white"
                textColor='white'
                value={user.userPassword}
                onChangeText={event => handlerOnChangeUser({ _name: "userPassword", _value: event })}
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
            />

            <Button
                style={[styles.button, { backgroundColor: 'transparent', marginTop: 0 }]}
                mode="text"
                key="forgotPass"
                labelStyle={[styles.label, { color: 'white', fontWeight: 'light' }]}
                onPress={() => handleForgotPass()}
            >
                Esqueceu a senha?
            </Button>

            <Button
                style={styles.button}
                mode="contained"
                labelStyle={styles.label}
                key="handlerLogin"
                onPress={() => handlerLogin()}
            >
                Entrar
            </Button>

            <Button
                style={[styles.button, { marginTop: 60 }]}
                mode="contained"
                key="handlerSignIn"
                labelStyle={styles.label}
                onPress={() => navigation.navigate("Begin", { operation: "Register" })}
            >
                Cadastre-se
            </Button>
        </ScrollView>
    );
}
