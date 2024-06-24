import * as React from 'react'
import { styles } from './style'
import { View, TouchableOpacity, Image, Alert, Text, ScrollView, Linking } from 'react-native';

//IMPORT DOS COMPONENTES USADOS
import * as Progress from 'react-native-progress';

import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO

import { Icon, MD3Colors } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
import * as ImagePicker from 'expo-image-picker'; //IMPORT DO IMAGE PICKER DO EXPO
import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA
import { getChangedState, getDataUser } from '../../functions/async.services';
import { getAchievement, getAllUserAchievements } from '../../functions/helper.services';

export function Profile() {
    const navigation = useNavigation()

    const [storedData, setStoredData] = React.useState({});
    const [achievement, setAchievement] = React.useState([]);

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
        let validation = false

        getDataUser()
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados do usuário")
                    return
                }

                console.log(data)
                setStoredData(data)

                getAllUserAchievements(data.id_user, "ordened")
                    .then(async (res) => {
                        if (res.validation === 0) {
                            console.log("Erro ao recolher dados das conquistas do usuário.")
                            return
                        } else if (res.validation === 2) {
                            console.log("Usuário sem conquistas, no momento.")
                            return
                        } else {
                            validation = true
                        }

                        if (validation === true) {
                            getAchievement(res.achievement[0].id_achievement)
                                .then((result) => {
                                    console.log(result)
                                    if (!result) {
                                        console.log("Erro ao buscar informações sobre a conquista")
                                        return
                                    }
                                    setAchievement([result])
                                })
                        }
                    })
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
            <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={pickImageFromGallery}>
                    <View style={styles.cameraIconContainer}>
                        {storedData.profileImage ? (
                            <Image style={styles.profileImage} source={{ uri: storedData.profileImage }} />
                        ) : (
                            <View style={[styles.placeholderImage, styles.cameraIconBackground]}>
                                <Icon
                                    source="camera"
                                    color={'white'}
                                    border={'white'}
                                    size={64}
                                />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>{storedData.user_name}</Text>
            </View>

            <View style={{ flex: 0.1, minHeight: 30, width: '100%', justifyContent: 'center', marginBottom: 15 }}>
                {storedData ? <Progress.Bar style={{ width: '100%' }} progress={storedData.total_exp ? storedData.total_exp / 10 : 0} width={null} /> : <></>}
                <Text style={[styles.infoSubTitle, { textAlign: 'center', alignSelf: 'center' }]}>PERCENTUAL ACUMULADO: {(storedData.total_exp / 10) * 100 || 0}%</Text>
            </View>

            <View style={styles.info}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.infoTitle}>CONQUISTA RECENTE</Text>
                    <TouchableOpacity>
                        <Text style={styles.infoSubTitle}>Ver todas</Text>
                    </TouchableOpacity>
                </View>
                {achievement.length > 0 ? <View style={styles.achievement_card}>
                    <View style={styles.card_title}>
                        <Text style={styles.achievement_title}>{achievement[0]._title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="cards-diamond" size={24} color="#06c244" />
                            <Text style={styles.achievement_title}> {achievement[0]._exp}</Text>
                        </View>
                    </View>
                    <Text numberOfLines={3} style={styles.achievement_subTitle}>DESCRIÇÃO: {achievement[0]._description}</Text>
                </View> : <View style={styles.achievement_card}>
                    <View style={styles.card_title}>
                        <Text style={styles.achievement_title}>SEM CONQUISTA RECENTE</Text>
                    </View>
                    <Text numberOfLines={3} style={styles.achievement_subTitle}>MENSAGEM: Continue avançado pelos cursos e seus estágios no Grupo Público para desbloquear novas conquistas.</Text>
                </View>
                }
            </View>

            <View style={{ flex: 1, width: '100%' }}>
                <ScrollView style={{ width: "100%", paddingVertical: 30 }} contentContainerStyle={styles.options}>
                    <TouchableOpacity style={styles.button} onPress={() =>
                        navigation.navigate("Options", { stored: storedData })
                    }>
                        <FontAwesome5 name="user-edit" size={24} color="#06c244" />
                        <Text style={styles.title}>EDITAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => Linking.openURL("https://github.com/EtecTcc01")}>
                        <MaterialCommunityIcons name="github" size={32} color="#06c244" />
                        <Text style={styles.title}>SOBRE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons name="logout" size={32} color="#06c244" />
                        <Text style={styles.title}>SAIR</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    );
}