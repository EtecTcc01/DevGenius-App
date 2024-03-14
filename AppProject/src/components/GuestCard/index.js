import * as React from 'react'
import { styles } from './style';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export function GuestCard() {
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
        await AsyncStorage.getItem('userLogin')
            .then((jsonValue) => {
                console.log(JSON.parse(jsonValue))
                return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
            }).catch((error) => {
                alert(`Erro ao coletar dados referente ao usuário. ${error}`)
            })
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

    const handleSavePress = () => {
        setIsEditing(false);
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
                            <View style={styles.placeholderImage}>
                                <Text style={styles.editIcon}>✎</Text>
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