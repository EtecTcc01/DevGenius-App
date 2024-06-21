import * as React from 'react'
import { styles } from './style'
import { View, TouchableOpacity, Image, Alert, Text, ScrollView } from 'react-native';

//IMPORT DOS COMPONENTES USADOS
import * as Progress from 'react-native-progress';

import { Icon, MD3Colors } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import * as ImagePicker from 'expo-image-picker'; //IMPORT DO IMAGE PICKER DO EXPO
import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
import { getChangedState, getDataUser } from '../../functions/async.services';

export function Profile() {
    const navigation = useNavigation()

    const [storedData, setStoredData] = React.useState({});

    const [changed, setChanged] = React.useState() //STATE P/ARMAZENAR STATE DE MUDANÇA
    const [timer, setTimer] = React.useState(0) //STATE P/ARMAZENAR N. DO TIMER

    // FUNÇÃO TEMPORIZADORA P/COLETA E ATUALIZAÇÃO DE DADOS
    React.useEffect(() => {
        getChangedState()
            .then((res) => {
                if (res !== changed) {
                    setChanged(res)
                }
            })

        setTimeout(() => {
            if (timer >= 10) {
                setTimer(0)
            } else {
                setTimer(timer + 1)
            }
        }, 1500);
    }, [timer])

    //ARMAZENANDO DADOS DO USUÁRIO APÓS RECEBE-LOS PELA ASYNC
    React.useEffect(() => {
        getDataUser()
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados do usuário")
                    return
                }

                console.log(data)
                setStoredData(data)
            })
    }, [changed]);

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
    }, [changed]);

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

            <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.scroll_container}>
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
                    {storedData ? <Progress.Bar progress={storedData.total_exp ? storedData.total_exp / 10 : 0} width={null} /> : <></>}
                    <Text style={styles.infoTitle}>EXP {storedData.total_exp}/10 - LEVEL {storedData._level}</Text>
                </View>

                <ScrollView style={{ flex: 1, width: "100%", paddingVertical: 30 }} contentContainerStyle={styles.options}>

                    <TouchableOpacity style={styles.button} onPress={() =>
                        navigation.navigate("Options", { stored: storedData })
                    }>
                        <Text style={styles.title}>OPÇÕES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.title}>SOBRE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.title}>LOG-OUT</Text>
                    </TouchableOpacity>

                </ScrollView>

            </ScrollView>

        </View>
    );
}