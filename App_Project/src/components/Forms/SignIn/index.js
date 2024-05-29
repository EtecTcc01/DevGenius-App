import * as React from 'react'
import { styles } from './style';
import { ScrollView, View } from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper'; //IMPORT DO PAPER
import api from '../../../../api';

import { useNavigation } from '@react-navigation/native';
import { userRegister } from '../../../functions/user.services';

export function SignIn({ handlerOnPress }) {
    const navigation = useNavigation()

    //PREPARANDO AS VAR PARA RECEBER OS DADOS DO USUÁRIO
    const [confirmPass, setConfirmPass] = React.useState("");
    const [user, setUser] = React.useState({
        userEmail: '',
        userName: '',
        userPassword: '',
        userType: 1
    });

    //FUNÇÃO P/MUDAR O ESTADO DOS DADOS
    function handlerOnChangeUser({ _name, _value }) {
        setUser({ ...user, [_name]: _value })
    }

    //FUNÇÃO PARA VERIFICAR O NOME/EMAIL DO USUÁRIO E CADASTRA-LO
    async function handlerRegister() {
        let ok = true
        const verification = ["userEmail", "userName", "userPassword", "confirmPass"]

        //VERIFICAÇÃO DO DADOS INSERIDOS
        verification.forEach(element => {
            let verify = hasErrors(element, "verify")

            if (verify === true) {
                ok = false
            }
        });


        if (ok === false) {
            await handlerOnPress("warn", "Dados Inválidos.")
            return
        }

        const dataTest = [user.userEmail, user.userName]
        let verify = true

        //VERIFICANDO SE O EMAIL/NOME DE USUÁRIO JÁ ESTÃO CADASTRADOS
        await api.get(`user/verify/${dataTest}`)
            .then(() => { //TRANSFERINDO P/OUTRA TELA E ENVIANDO PARAMETROS
                console.log("Email/Nome de usuário disponíveis.")
            })
            .catch(async (error) => {
                await handlerOnPress("warn", `Email/Usuário indisponível.`)
                verify = false
            })

        if (verify === true) {
            //REGISTRANDO USUÁRIO
            await userRegister({ user: user })
                .then(async (data) => {
                    if (!data) {
                        console.log("Erro ao cadastrar Usuário.")
                        return
                    }

                    await handlerOnPress("success", "Usuário Cadastrado.")
                    setTimeout(() => {
                        navigation.navigate("Begin", { operation: "Info", user: data })
                    }, 3200);
                })
        }

    }

    function hasErrors(name, op) {
        if (user[name] || confirmPass) {
            if (name === "userEmail") {
                return !user[name].includes('@') || !user[name].includes(" ");
            }
            if (name === "userPassword") {
                if (user[name].length >= 8) {
                    return false
                }
                return true
            }
            if (name === "confirmPass") {
                if (confirmPass === user.userPassword) {
                    return false
                }
                return true
            }

            if (name === "userName") {
                return false
            }
        }

        return op === "verify" ? true : false
    };

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
            <Text style={styles.title} variant="titleLarge">Cadastro</Text>
            <TextInput style={styles.input}
                label="Nome de Usuário:"
                id="userName"
                key="userName"
                placeholderTextColor="white"
                textColor='white'
                value={user.userName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userName", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("userName", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Nome de usuário inválido!</Text>
            </HelperText>

            <TextInput style={styles.input}
                label="E-mail:"
                id="userEmail"
                key="userEmail"
                placeholderTextColor="white"
                value={user.userEmail || ''}
                textColor='white'
                onChangeText={event => handlerOnChangeUser({ _name: "userEmail", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("userEmail", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Email inválido!</Text>
            </HelperText>

            <TextInput style={styles.input}
                label="Senha:"
                id="userPassword"
                key="userPassword"
                placeholderTextColor="white"
                textColor='white'
                value={user.userPassword || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userPassword", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("userPassword", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>A senha deve conter mais de 8 caracteres!</Text>
            </HelperText>

            <TextInput style={styles.input}
                label="Confirmar senha:"
                id="confirmPass"
                key="confirmPass"
                placeholderTextColor="white"
                textColor='white'
                value={confirmPass || ''}
                onChangeText={confirmPass => setConfirmPass(confirmPass)}
            />

            <HelperText type="error" visible={hasErrors("confirmPass", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>As senhas não coincidem!</Text>
            </HelperText>

            <Button
                style={styles.button}
                mode="contained"
                key="handlerRegister"
                labelStyle={styles.label}
                onPress={async () => handlerRegister()}
            >
                Cadastre-se
            </Button>
        </ScrollView>
    );
}
