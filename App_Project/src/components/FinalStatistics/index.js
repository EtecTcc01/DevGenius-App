import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕES
import * as Progress from 'react-native-progress';

import { MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO


export function FinalStatistics({ _lifes, _points, qtdTask, state }) {
    const navigation = useNavigation()

    const [nProgress, setNProgress] = React.useState(0)
    const [lifePoints, setLifePoints] = React.useState([])

    React.useEffect(() => {
        let temp = []
        if (_points >= 0 && qtdTask >= 0) {
            setNProgress(_points / qtdTask)
        }

        try {
            for (let i = 0; i < 5; i++) {
                temp.push(i)
            }

            setLifePoints(temp)
        } catch {
            []
        }
    }, [_lifes, _points, qtdTask])

    return (
        <View style={styles.container}>
            <View style={styles.congratulations}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>ESTÁGIO CONCLUÍDO</Text>
            </View>

            <View style={styles.statistics}>
                <Progress.Circle size={200} formatText={() => `${(nProgress * 100).toFixed(1)}%`} showsText={state === true ? true : false} progress={nProgress} color='#06c244' />
                <View style={styles.totals}>
                    <MaterialCommunityIcons name="cards-diamond-outline" size={64} color="#06c244" />
                    {state === true && _lifes > 0 ? <>
                        <Text style={styles.title}>Total Exp: {_points || 0}/{qtdTask || 0}</Text>
                    </> : <>
                        <Text style={styles.title}>No points</Text>
                    </>
                    }
                </View>
            </View>

            <View style={styles.remaining}>
                <Text style={styles.title}>Vidas Restantes...</Text>
                <View style={styles.hearts}>
                    {lifePoints.length > 0 ? lifePoints.map((e, i) => {
                        return (
                            <Animatable.View key={e} animation="pulse" duration={800} iterationCount="infinite">
                                {
                                    i <= _lifes - 1 ? <MaterialCommunityIcons
                                        name="cards-heart"
                                        size={48}
                                        color="#06c244"
                                    /> : <MaterialCommunityIcons
                                        name="heart-outline"
                                        size={48}
                                        color="#06c244"
                                    />
                                }
                            </Animatable.View>
                        )
                    }) : <></>}
                </View>
            </View>
        </View>
    );
}