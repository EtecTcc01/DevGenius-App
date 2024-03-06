import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    profileImage: '',
  });

  useEffect(() => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    color: '#06c244',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 24,
  },
  label: {
    marginTop: 8,
    color: '#06c244',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 8,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#06C244',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
