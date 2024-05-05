import * as React from 'react';
import { styles } from './style';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';

// import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
import { Icon, MD3Colors } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import * as ImagePicker from 'expo-image-picker'; //IMPORT DO IMAGE PICKER DO EXPO
import { getDataUser } from '../../functions/async.services'; //IMPORT DA FUNÇÃO ASYNC P/BUSCAR DADOS DO USUÁRIO

export function GuestCard() {
    // const navigation = useNavigation();

    const [isEditing, setIsEditing] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const [userData, setUserData] = React.useState({});

    //ARMAZENANDO DADOS DO USUÁRIO APÓS RECEBE-LOS PELA ASYNC
    React.useEffect(() => {
        getDataUser()
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados do usuário")
                    return
                }

                setUserInfo({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    userDate: data.date_birth,
                    userSex: data._sex,
                    // email: '',
                    // password: '',
                    profileImage: data.profile_image,
                    userId: data.id_user,
                })

                setUserData({
                    userName: data.user_name,
                    userEmail: data._email,
                    userPassword: data._password,
                    userId: data.id_user,
                })
            })
    }, []);

    // SOLICITANDO PERMISSÃO P/TER ACESSO À GALERIA DO USUÁRIO
    React.useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permissão necessária',
                    'É necessário permitir o acesso à galeria para escolher uma imagem.',
                    [{ text: 'OK' }]
                );
            }
        })();
    }, []);

    //POSSIBILITANDO A EDIÇÃO DO USUÁRIO
    const handleEditPress = () => {
        setIsEditing(!isEditing);
    };

    //SALVANDO AS INFORMAÇÕES DO USUÁRIO E MANDANDO PRO BANCO
    // const handleSavePress = async () => {
    //     try {
    //         const response = await api.put(`/info/`, info);
    //         if (response.status === 200) {
    //             Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    //             setIsEditing(false);
    //         } else {
    //             Alert.alert('Erro', 'Erro ao atualizar perfil. Tente novamente.');
    //         }
    //     } catch (error) {
    //         Alert.alert('Erro', `Erro ao atualizar perfil: ${error}`);
    //     }
    // };

    //PEGANDO IMAGEM DA GALERIA
    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUserInfo({ ...userInfo, profileImage: result.uri });
        }
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
                <View style={styles.profileImageContainer}>
                    <TouchableOpacity onPress={pickImageFromGallery}>
                        {userInfo.profileImage ? (
                            <Image style={styles.profileImage} source={{ uri: userInfo.profileImage }} />
                        ) : (
                            <View style={styles.cameraIconContainer}>
                                {userInfo.profileImage ? (
                                    <Image style={styles.profileImage} source={{ uri: userInfo.profileImage }} />
                                ) : (
                                    <View style={[styles.placeholderImage, styles.cameraIconBackground]}>
                                        <Icon
                                            source="camera"
                                            color={'white'}
                                            border={'white'}
                                            size={45}
                                        />
                                    </View>
                                )}
                            </View>

                        )}
                    </TouchableOpacity>
                </View>

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

                <TouchableOpacity style={styles.button} onPress={isEditing ? handleSavePress : handleEditPress}>
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
