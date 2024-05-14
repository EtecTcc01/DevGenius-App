import * as React from 'react';
import { styles } from './style'
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
// import { Icon, MD3Colors } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
// import * as ImagePicker from 'expo-image-picker'; //IMPORT DO IMAGE PICKER DO EXPO
// import { getDataUser } from '../../functions/async.services'; //IMPORT DA FUNÇÃO ASYNC P/BUSCAR DADOS DO USUÁRIO

export function UserOptions({ route }) {
    // const navigation = useNavigation();

    const data = route.params

    const [isEditing, setIsEditing] = React.useState({
        "firstName": false,
        "lastName": false,
        "userSex": false,
        "userDate": false,
        "userEmail": false,
        "userPassword": false
    });

    const [storedData, setStoredData] = React.useState(() => data.stored);
    // const [userInfo, setUserInfo] = React.useState(() => data.info);
    // const [userData, setUserData] = React.useState(() => data.user);

    // React.useEffect(() => {
    //     setUserInfo({
    //       firstName: data.first_name,
    //       lastName: data.last_name,
    //       userDate: data.date_birth,
    //       userSex: data._sex,
    //       profileImage: data.profile_image,
    //       userId: data.id_user,
    //       totalExp: data.total_exp,
    //       userLvl: data._level
    //     })

    //     setUserData({
    //       userType: data.type_user,
    //       userName: data.user_name,
    //       userEmail: data._email,
    //       userPassword: data._password,
    //       userId: data.id_user,
    //     })
    // }, [data])

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
    const handlerInputChange = (key, value) => {
        setStoredData({ ...storedData, [key]: value });
    };

    // const handlerInputChange = (key, value) => {
    //     setStoredData({ ...storedData, [key]: value });
    // };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PERFIL ({storedData.userName})</Text>
            </View>

            <View style={styles.contentContainer}>

                <Text style={styles.label}>Nome:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.firstName == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.firstName || ''}
                        editable={isEditing.firstName}
                        onChangeText={(text) => handlerInputChange('firstName', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('firstName')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Sobrenome:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.lastName == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.lastName || ''}
                        editable={isEditing.lastName}
                        onChangeText={(text) => handlerInputChange('lastName', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('lastName')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Sexualidade:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.userSex == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.userSex || ''}
                        editable={isEditing.userSex}
                        onChangeText={(text) => handlerInputChange('userSex', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('userSex')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Data de nascimento:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.userDate == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.userDate || ''}
                        editable={isEditing.userDate}
                        onChangeText={(text) => handlerInputChange('userDate', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('userDate')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>


                <Text style={styles.label}>E-mail:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.userEmail == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.userEmail || ''}
                        editable={isEditing.userEmail}
                        onChangeText={(text) => handlerInputChange('userEmail', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('userEmail')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Senha:</Text>
                <View style={styles.manager}>
                    <TextInput
                        placeholder=""
                        style={isEditing.userPassword == true ? styles.input : [styles.input, { color: 'gray' }]}
                        value={storedData.userPassword || ''}
                        editable={isEditing.userPassword}
                        onChangeText={(text) => handlerInputChange('userPassword', text)}
                    />
                    <TouchableOpacity style={styles.edit} onPress={() => handlerEditPress('userPassword')}>
                        <Text style={[styles.buttonText, { color: 'white', }]}>Editar</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={storedData == data.stored ? [styles.button, { opacity: '50%' }] : styles.button}
                    disabled={storedData == data.stored ? true : false} onPress={handleSavePress}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
