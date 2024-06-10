import * as React from 'react';
import { styles } from './style'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DropdownComponent } from '../../components/Dropdown';

import { TextInput, HelperText } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
// import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA

export function Options({ route }) {

    const data = route.params.stored
    console.log(data)

    const [storedData, setStoredData] = React.useState(data);

    const [isEditing, setIsEditing] = React.useState({
        "user_name": false,
        "_sex": false,
        "userDate": false,
        "_email": false,
        "_password": false
    });

    React.useEffect(() => {
        console.log(data)
    }, [data])

    // SALVANDO AS INFORMAÇÕES DO USUÁRIO E MANDANDO PRO BANCO
    const handleSavePress = async () => {
        // try {
        //     const response = await api.put(`/info/`, info);
        //     if (response.status === 200) {
        //         Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        //         setIsEditing(false);
        //     } else {
        //         Alert.alert('Erro', 'Erro ao atualizar perfil. Tente novamente.');
        //     }
        // } catch (error) {
        //     Alert.alert('Erro', `Erro ao atualizar perfil: ${error}`);
        // }
    };


    //POSSIBILITANDO A EDIÇÃO DO USUÁRIO
    const handlerEditPress = (text) => {
        setIsEditing({ ...isEditing, [text]: true });
    };

    //ALTERANDO/ADICIONANDO ELEMENTOS NO OBJECT DOS STATES
    const handlerInputChange = ({ _name, _value }) => {
        setStoredData({ ...storedData, [_name]: _value });
    };

    function hasErrors(name) {
        if (storedData[name]) {
            if (name === "user_name") {
                return storedData[name].includes(" ")
            }

            if (name === "_sex") {
                if (storedData[name] === "M" || storedData[name] === "F" || storedData[name] === "O") {
                    return false
                }
                return true
            }
            return false
        }
        return false
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1, width: "100%" }} showsHorizontalScrollIndicator={false}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PERFIL {storedData.userName || ""}</Text>
            </View>

            <View style={styles.contentContainer}>
                <TextInput
                    style={isEditing.user_name == true ? styles.input : [styles.input, { color: 'gray' }]}
                    label="Nome de usuário:"
                    id='user_name'
                    key="user_name"
                    textColor='black'
                    // editable={isEditing.user_name}
                    value={storedData.user_name || ''}
                    onChangeText={event => handlerInputChange({ _name: "user_name", _value: event })}
                />

                <HelperText type="error" visible={hasErrors("user_name")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Nome de Usuário inválido!</Text>
                </HelperText>

                <DropdownComponent handlerChoice={(e) => handlerEditPress({ _name: '_sex', _value: e })} />

                <HelperText type="error" visible={hasErrors("_sex")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Gênero inválido!</Text>
                </HelperText>


                <TextInput
                    style={isEditing._email == true ? styles.input : [styles.input, { color: 'gray' }]}
                    label="Email:"
                    id='_email'
                    key="_email"
                    textColor='black'
                    // editable={isEditing.first_name}
                    value={storedData._email || ''}
                    onChangeText={event => handlerInputChange({ _name: "_email", _value: event })}
                />

                <HelperText type="error" visible={hasErrors("_email")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>Email inválido!</Text>
                </HelperText>

                <TextInput
                    style={isEditing._password == true ? styles.input : [styles.input, { color: 'gray' }]}
                    label="Senha:"
                    id='_password'
                    key="_password"
                    textColor='black'
                    // editable={isEditing.first_name}
                    value={storedData._password || ''}
                    onChangeText={event => handlerInputChange({ _name: "_password", _value: event })}
                />

                <HelperText type="error" visible={hasErrors("_password")}>
                    <Text style={[styles.label, { color: 'red', fontWeight: 'normal', alignSelf: "flex-start" }]}>A senha deve ser maior/igual a 8 caracteres!</Text>
                </HelperText>

                <TouchableOpacity style={storedData == route.params.stored ? [styles.button, { opacity: '50%' }] : styles.button}
                    disabled={storedData == route.params.stored ? true : false} onPress={handleSavePress}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}
