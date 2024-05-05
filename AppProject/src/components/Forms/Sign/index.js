import * as React from 'react';
import { styles } from './style'
import { View } from 'react-native';

import api from '../../../../api'; //IMPORTAÇÃO DA API AXIOS DO BACK
import { userRegister } from '../../../functions/user.services'; //IMPORT DA FUNÇÃO P/CADASTRAR USUÁRIO
import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
import { Button, Text, TextInput } from 'react-native-paper'; //IMPORT DO PAPER

export function SignInForm() {
    const navigation = useNavigation(); //VAR -> RECEBENDO AS FUNÇÕES DO IMPORT

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
        //VERIFICAÇÃO DO CONTEÚDO DA VAR
        if (!user.userEmail) {
            alert("Por Favor, informe o email.")
            return
        }

        if (!user.userName) {
            alert("Por Favor, informe o nome de usuário.")
            return
        }

        if (!user.userPassword || user.userPassword.length < 8) {
            alert("Por Favor, informe uma senha válida.")
            return
        } else if (user.userPassword != confirmPass) {
            alert("As senhas não coincidem...")
            return
        }

        const dataTest = [user.userEmail, user.userName]

        //VERIFICANDO SE O EMAIL/NOME DE USUÁRIO JÁ ESTÃO CADASTRADOS
        await api.get(`user/verify/${dataTest}`)
            .then(() => { //TRANSFERINDO P/OUTRA TELA E ENVIANDO PARAMETROS
                console.log("Email/Nome de usuário disponíveis.")
            })
            .catch((error) => {
                alert(`Email ou Usuário já cadastrado.`)
                return
            })

        //REGISTRANDO USUÁRIO
        userRegister({ user: user })
            .then((data) => {
                if (!data) {
                    console.log("Erro ao cadastrar Usuário.")
                    return
                }

                navigation.navigate("Begin-Form", { operation: "Info", user: data })
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Cadastro</Text>
            <TextInput style={styles.input}
                label="Nome de Usuário:"
                id="userName"
                key="userName"
                textColor='white'
                value={user.userName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userName", _value: event })}
            />
            <TextInput style={styles.input}
                label="E-mail:"
                id="userEmail"
                key="userEmail"
                value={user.userEmail || ''}
                textColor='white'
                onChangeText={event => handlerOnChangeUser({ _name: "userEmail", _value: event })}
            />
            <TextInput style={styles.input}
                label="Senha:"
                id="userPassword"
                key="userPassword"
                textColor='white'
                value={user.userPassword || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userPassword", _value: event })}
            />
            <TextInput style={styles.input}
                label="Confirmar senha:"
                id="confirmPass"
                key="confirmPass"
                textColor='white'
                value={confirmPass || ''}
                onChangeText={confirmPass => setConfirmPass(confirmPass)}
            />
            <Button
                style={[styles.btn, { backgroundColor: '#06c244' }]}
                mode="contained"
                key="handlertransfer"
                labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
                onPress={async () => handlerRegister()}
            >
                Cadastre-se
            </Button>
        </View>
    );
}