import * as React from 'react'
import { styles } from './style';
import { ScrollView, View, Text } from 'react-native';

import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO
import { getAllAchievementsByUser } from '../../functions/helper.services';

export function Achievements({ route }) {
    const navigation = useNavigation()

    const [achievements, setAchievements] = React.useState([])

    React.useEffect(() => {
        if (route.params.user > 0) {
            getAllAchievementsByUser(route.params.user)
                .then((res) => {
                    if (res.validation === 0) {
                        console.log("Erro ao buscar dados das conquistas.")
                        return
                    } else if (res.validation === 1) {
                        console.log("Usuário sem conquistas adquiridas.")
                        return
                    } else {
                        setAchievements(res.achievement)
                    }
                })
        }
    }, [route.params])

    const list = achievements ? achievements.map((e, i) => {
        return (
            <Animatable.View key={i} delay={200} animation="zoomIn" duration={350 * i + 1} style={styles.achievement_card}>
                <View style={styles.card_title}>
                    <Text style={styles.achievement_title}>{e.achievement_title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="cards-diamond" size={24} color="#06c244" />
                        <Text style={styles.achievement_title}> {e._exp}</Text>
                    </View>
                </View>
                <Text numberOfLines={3} style={styles.achievement_subTitle}>DESCRIÇÃO: {e.achievement_desc}</Text>
            </Animatable.View>
        )
    }) : []

    return (
        <View style={[styles.container, { flex: 1, justifyContent: 'flex-start' }]}>
            <Text style={styles.title}>CONQUISTAS ADQUIRIDAS</Text>
            {achievements ? <>
                <ScrollView style={{ width: "100%" }} contentContainerStyle={[styles.container, { paddingHorizontal: 10 }]} showsVerticalScrollIndicator={false}>
                    {list}
                </ScrollView>
            </> : <Text style={styles.message}>Siga realizando os estágios dos cursos do Grupo público para adquirir as conquistas disponíveis...</Text>}
        </View>
    );
}
