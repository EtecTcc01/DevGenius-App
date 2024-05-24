import * as React from 'react';
import { styles } from './style';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export function GuestCard({ user, info }) {

    const [isEditing, setIsEditing] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
        setUserData(user)
        setUserInfo(info)
    }, [user, info])

    //POSSIBILITANDO A EDIÇÃO DO USUÁRIO
    const handleEditPress = () => {
        setIsEditing(!isEditing);
    };

    //ALTERANDO/ADICIONANDO ELEMENTOS NO OBJECT DOS STATES
    const handleInputChangeInfo = (key, value) => {
        setUserInfo({ ...userInfo, [key]: value });
    };

    const handleInputChangeUser = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PERFIL</Text>
            </View>

            <View style={styles.contentContainer}>

                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.firstName || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeInfo('firstName', text)}
                />

                <Text style={styles.label}>Sobrenome:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.lastName || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeInfo('lastName', text)}
                />

                <Text style={styles.label}>Sexualidade:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.userSex || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeInfo('userSex', text)}
                />

                <Text style={styles.label}>Data de nascimento:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.userDate || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeInfo('userDate', text)}
                />

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userData.userEmail || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeUser('userEmail', text)}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userData.userPassword || ''}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChangeUser('userPassword', text)}
                />

                <TouchableOpacity style={styles.button}
                // onPress={isEditing ? handleSavePress : handleEditPress}
                >
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
