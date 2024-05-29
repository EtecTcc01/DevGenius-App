import * as React from 'react'
import { styles } from './style';
import { View, ScrollView } from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper'; //IMPORT DO PAPER
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { DatePicker } from '../../DatePicker';
import { DropdownComponent } from '../../Dropdown';

import { useNavigation } from '@react-navigation/native';
import { userRegisterInfo } from '../../../functions/user.services';
import { storeUserData } from '../../../functions/async.services';

export function Info({ data, handlerOnPress }) {
    const navigation = useNavigation()

    //STATE P/ARMAZENAR DADOS DO USUÁRIO
    const [info, setInfo] = React.useState({
        firstName: "",
        lastName: "",
        userDate: "",
        userSex: "",
        // userId: user._id,
        userId: ""
    })

    //FUNÇÃO P/ALTERAR OU ADICIONAR UM NOVO "ELEMENTO" NO OBJETO
    function handlerOnChangeUser({ _name, _value }) {
        setInfo({ ...info, [_name]: _value })
    }

    //FUNÇÃO P/CADASTRAR O UUÁRIO
    function handlerRegisterInfo() {
        let ok = true
        let verification = ["userSex", "userDate", "firstName", "lastName"]

        //FAZENDO AS VALIDAÇÕES DE NEGAÇÃO
        verification.forEach(element => {
            let verify = hasErrors(element)

            if (verify === true) {
                ok = false
            }
        });

        if (ok === false) {
            handlerOnPress("warn", "Dados inválidos.")
            return
        }

        // //REGISTRANDO INFORMAÇÕES DE USUÁRIO
        // userRegisterInfo({ info: info })
        //     .then(async (data) => {
        //         if (!data) {
        //             console.log("Erro ao cadastrar informações do usuário")
        //             return
        //         }

        //         // ARMAZENANDO INFORMAÇÕES NO ASYNC STORAGE
        //         await storeUserData({ user: data })
        //             .then(async (res) => {
        //                 if (!res) {
        //                     console.log("Erro ao armazenar informações do usuário")
        //                     return
        //                 }
        //                 await handlerOnPress("success", "Informações Cadastradas.")
        //                 setTimeout(() => {
        //                     navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
        //                 }, 3200);
        //             })
        //     })
    }

    function hasErrors(name, operation) {
        if (info[name]) {
            if (name === "userSex") {
                if (info[name] === "M" || info[name] === "F" || info[name] === "O") {
                    return false
                }
                return true
            }
            if (name === "userDate") {
                return false
            }
            if (name === "lastName" || name === "firstName") {

                if (name === "firstName" && info[name].includes(" ")) {
                    return true
                }

                let test = info[name].split("") || []
                let verify = true

                if (test.length > 0) {
                    test.forEach(element => {
                        if (verify === true) {
                            for (let i = 0; i < 10; i++) {
                                if (element === `${i}`) {
                                    verify = false
                                    break
                                }
                            }
                        }
                    });
                }

                if (verify === false) {
                    return true
                }

                return false
            }
        }
        return operation === "verify" ? true : false
    };

    return (
        <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
            <Text style={styles.title} variant="titleLarge">Informações</Text>
            <TextInput
                style={styles.input}
                label="Nome:"
                id='firstName'
                key="firstName"
                textColor='white'
                value={info.firstName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "firstName", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("firstName", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Nome inválido!</Text>
            </HelperText>

            <TextInput
                style={styles.input}
                label="Sobrenome:"
                id='lastName'
                key="lastName"
                textColor='white'
                value={info.lastName || ''}
                onChangeText={event => handlerOnChangeUser({ _name: "lastName", _value: event })}
            />

            <HelperText type="error" visible={hasErrors("lastName", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Nome inválido!</Text>
            </HelperText>

            <DropdownComponent handlerChoice={(e) => setInfo({ ...info, "userSex": e })} />

            <HelperText type="error" visible={hasErrors("userSex", "view")}>
                <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Por favor, escolha um genêro!</Text>
            </HelperText>

            <DatePicker handleChoice={(e) => setInfo({ ...info, "userDate": e })} />

            <Button
                style={styles.button}
                mode="contained"
                onPress={() => handlerRegisterInfo()}
                labelStyle={styles.label}
            >
                Adicione
            </Button>
        </ScrollView>
    );
}
