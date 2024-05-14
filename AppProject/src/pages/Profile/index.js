import * as React from 'react'
import { styles } from './style'
import { View, TouchableOpacity, Image, Alert, Text } from 'react-native';

//IMPORT DOS COMPONENTES USADOS
import * as Progress from 'react-native-progress';

import { Icon, MD3Colors } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import * as ImagePicker from 'expo-image-picker'; //IMPORT DO IMAGE PICKER DO EXPO
import { getDataUser } from '../../functions/async.services'; //IMPORT DE UMA FUNÇÃO EXTERNA
import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA

export function Profile() {
  const navigation = useNavigation()

  const [storedData, setStoredData] = React.useState({});
  const [userProgress, setUserProgress] = React.useState(0);

  React.useEffect(() => {
    if (storedData.totalExp > 0) {
      let total = storedData.totalExp / 10
      setUserProgress(total)
    }
  }, [storedData])

  //ARMAZENANDO DADOS DO USUÁRIO APÓS RECEBE-LOS PELA ASYNC
  React.useEffect(() => {
    getDataUser()
      .then((data) => {
        if (!data) {
          console.log("Erro ao buscar dados do usuário")
          return
        }

        console.log(data)

        setStoredData({
          firstName: data.first_name,
          lastName: data.last_name,
          userDate: data.date_birth,
          userSex: data._sex,
          profileImage: data.profile_image,
          userId: data.id_user,
          totalExp: data.total_exp,
          userLvl: data._level,
          userType: data.type_user,
          userName: data.user_name,
          userEmail: data._email,
          userPassword: data._password,
          userId: data.id_user,
        })
      })
  }, []);

  React.useEffect(() => {

  }, [])

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

  //PEGANDO IMAGEM DA GALERIA
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setStoredData({ ...storedData, profileImage: result.uri });
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.profileImageContainer}>
        {storedData.profileImage ? (
          <Image style={styles.profileImage} source={{ uri: storedData.profileImage }} />
        ) : (
          <View style={styles.cameraIconContainer}>
            {storedData.profileImage ? (
              <Image style={styles.profileImage} source={{ uri: storedData.profileImage }} />
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

        <TouchableOpacity onPress={pickImageFromGallery}>
          <Text style={styles.titleContainer}>Alterar Imagem</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.progressInfo}>
        {storedData ? <Progress.Bar progress={userProgress || 0} width={null} /> : <></>}
        <Text style={styles.infoTitle}>EXP {storedData.totalExp}/10 - LEVEL {storedData.userLvl}</Text>
      </View>

      <View style={styles.options}>

        <TouchableOpacity style={styles.button} onPress={() =>
          navigation.navigate("UserOptions", { stored: storedData })
        }>
          <Text style={styles.title}>OPÇÕES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.title}>SOBRE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.title}>LOG-OUT</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}