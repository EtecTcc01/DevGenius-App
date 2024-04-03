import * as React from 'react';
import { styles } from './style';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Icon, MD3Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import api from '../../../api.js';

export function GuestCard(props) {
    const navigation = useNavigation();

    const dataT = props.data;
    const [user, setUser] = React.useState([]);

    const [isEditing, setIsEditing] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
        profileImage: '',
    });

    const getDataUser = async () => {
        try {
            if (dataT && dataT.user_name) {
                const res = await api.get(`/user/register/${dataT.user_name}`);
                setUser(res.data.user);
            } else {
                alert('ID do usuário não encontrado.');
            }
        } catch (error) {
            alert(`Erro ao pegar os dados do usuário. ${error}`);
        }
    };
    
    

    React.useEffect(() => {
        getDataUser();
    }, []);

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

    const handleEditPress = () => {
        setIsEditing(!isEditing);
    };

    const handleSavePress = async () => {
        try {
            const response = await api.put(`/info/`, info);
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
                setIsEditing(false);
            } else {
                Alert.alert('Erro', 'Erro ao atualizar perfil. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', `Erro ao atualizar perfil: ${error}`);
        }
    };

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

    const handleInputChange = (key, value) => {
        setUserInfo({ ...userInfo, [key]: value });
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
                    value={userInfo.firstName}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChange('firstName', text)}
                />

                <Text style={styles.label}>Sobrenome:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.lastName}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                />

                <Text style={styles.label}>Data de nascimento:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.birthDate}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChange('birthDate', text)}
                />

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.email}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChange('email', text)}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                    value={userInfo.password}
                    editable={isEditing}
                    onChangeText={(text) => handleInputChange('password', text)}
                />

                <TouchableOpacity style={styles.button} onPress={isEditing ? handleSavePress : handleEditPress}>
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
