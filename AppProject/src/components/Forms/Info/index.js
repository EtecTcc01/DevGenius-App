import * as React from 'react';
import { styles } from './style'
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
import { storeUserData } from '../../../functions/async.services'; //IMPORT DA FUNÇÃO DE ARMAZENAR DADOS NO ASYNC
import { Button, Text, TextInput } from 'react-native-paper'; //IMPORT DOS COMPONENTS DO PAPER
import { userRegisterInfo } from '../../../functions/user.services'; //IMPORT DA FUNÇÃO DE CADASTRO DE INFORMAÇÕES DO USUÁRIO

export function InfoForm({ user }) {
    const navigation = useNavigation(); //VAR -> RECEBENDO AS FUNÇÕES DO IMPORT

    //STATE P/ARMAZENAR DADOS DO USUÁRIO
    const [info, setInfo] = React.useState({
        firstName: "",
        lastName: "",
        userDate: "",
        userSex: "",
        userId: user._id
    })

    //FUNÇÃO P/CADASTRAR O UUÁRIO
    function handlerRegisterInfo() {
        //FAZENDO AS VALIDAÇÕES DE NEGAÇÃO
        if (!info.userSex) {
            alert("Por favor, insira o sexo.");
            return
        }
        if (!info.firstName) {
            alert("Por favor, insira o nome.");
            return
        }
        if (!info.lastName) {
            alert("Por favor, insira o sobrenome.");
            return
        }
        if (!info.userDate) {
            alert("Por favor, insira a data de nascimento.");
            return
        }

        //REGISTRANDO INFORMAÇÕES DE USUÁRIO
        userRegisterInfo({ info: info })
            .then((data) => {
                if (!data) {
                    console.log("Erro ao cadastrar informações do usuário")
                    return
                }

                // ARMAZENANDO INFORMAÇÕES NO ASYNC STORAGE
                storeUserData({ user: data })
                    .then((res) => {
                        if (!res) {
                            console.log("Erro ao armazenar informações do usuário")
                            return
                        }
                        navigation.navigate("Tabs")
                    })
            })
    }

    //FUNÇÃO P/ALTERAR OU ADICIONAR UM NOVO "ELEMENTO" NO OBJETO
    function handlerOnChangeUser({ _name, _value }) {
        setInfo({ ...info, [_name]: _value })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="titleLarge">Informações</Text>
            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Nome:"
                id='firstName'
                key="firstName"
                value={info.firstName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "firstName", _value: event })}
            />

            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Sobrenome:"
                id='lastName'
                key="lastName"
                value={info.lastName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "lastName", _value: event })}
            />

            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Sexo:"
                id='userSex'
                key="userSex"
                value={info.userSex || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userSex", _value: event })}
            />

            <TextInput
                style={[styles.input, { backgroundColor: 'transparent' }]}
                label="Data de nascimento:"
                id='userDate'
                key="userDate"
                value={info.userDate || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "userDate", _value: event })}
            />

            <Button
                style={[styles.button, { backgroundColor: '#06c244', marginTop: 20 }]}
                mode="contained"
                onPress={() => handlerRegisterInfo()}
            >
                Adicione
            </Button>
        </View>
    );
}
