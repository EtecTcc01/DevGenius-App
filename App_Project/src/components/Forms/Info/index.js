import * as React from 'react'
import { styles } from './style';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper'; //IMPORT DO PAPER
import MaskInput, { Masks } from 'react-native-mask-input';
import { DropdownComponent } from '../../Dropdown';

import { useNavigation } from '@react-navigation/native';
import { userUpdateInfo } from '../../../functions/user.services';
import { storeUserData } from '../../../functions/async.services';

export function Info({ data, handlerOnPress }) {
    const navigation = useNavigation()

    //STATE P/ARMAZENAR DADOS DO USUÁRIO
    const [info, setInfo] = React.useState({
        userDate: "",
        profileImage: "",
        userSex: "",
        userId: data._id || "",
    })

    //FUNÇÃO P/ALTERAR OU ADICIONAR UM NOVO "ELEMENTO" NO OBJETO
    function handlerOnChangeUser({ _name, _value }) {
        setInfo({ ...info, [_name]: _value })
    }

    //FUNÇÃO P/CADASTRAR O UUÁRIO
    function handlerRegisterInfo() {
        let ok = true
        let verification = ["userSex", "userDate"]

        //FAZENDO AS VALIDAÇÕES DE NEGAÇÃO
        verification.forEach(element => {
            let verify = hasErrors(element, "verify")

            if (verify === true) {
                ok = false
            }
        });

        if (ok === false) {
            handlerOnPress("warn", "Dados inválidos.")
            return
        }

        //REGISTRANDO INFORMAÇÕES DE USUÁRIO
        userUpdateInfo({ info: info })
            .then(async (data) => {
                if (!data) {
                    console.log("Erro ao atualizar informações do usuário")
                    return
                }

                // ARMAZENANDO INFORMAÇÕES NO ASYNC STORAGE
                await storeUserData({ user: data })
                    .then(async (res) => {
                        if (!res) {
                            console.log("Erro ao armazenar informações do usuário")
                            return
                        }
                        await handlerOnPress("success", "Informações Atualizadas.")
                        setTimeout(() => {
                            navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
                        }, 2000);
                    })
            })
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
                if (info[name].length < 10) {
                    return true
                }
                return false
            }
        }

        return operation === "verify" ? true : false

    };

    return (
        <View style={{ width: '100%', height: 370 }}>
            <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.container}>
                <Text style={styles.title} variant="titleLarge">Informações</Text>

                <DropdownComponent handlerChoice={(e) => setInfo({ ...info, "userSex": e })} />

                <HelperText type="error" visible={hasErrors("userSex", "view")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Por favor, escolha um genêro!</Text>
                </HelperText>

                <TextInput
                    label="Data de Nascimento:"
                    style={styles.input}
                    value={info.userDate || ''}
                    textColor='white'
                    onChangeText={event => handlerOnChangeUser({ _name: "userDate", _value: event })}
                    render={props =>
                        <MaskInput
                            {...props}
                            mask={Masks.DATE_YYYYMMDD}
                        />
                    }
                />

                <HelperText type="error" visible={hasErrors("userDate", "view")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Por favor, defina uma data exata!</Text>
                </HelperText>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlerRegisterInfo()}
                >
                    <Text style={styles.label}>Adicionar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
