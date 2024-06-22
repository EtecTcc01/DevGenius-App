import * as React from "react";
import { styles } from "./style";
import { View, TouchableOpacity, Text } from "react-native";
import * as Animatable from 'react-native-animatable'

import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO

export function TopBarUtils({ idTip, pressTip, pressReload, first, lifes, onlyLifes, points }) {

    const [lifePoints, setLifePoints] = React.useState([])

    React.useEffect(() => {
        let temp = []

        try {
            for (let i = 0; i < lifes; i++) {
                if (lifes > 0) {
                    temp.push(i)
                }
            }

            setLifePoints(temp)
        } catch {
            []
        }
    }, [lifes])

    return (
        <View style={styles.container}>
            <View style={styles.contentImg}>
                {lifePoints.length > 0 ? lifePoints.map((e) => {
                    return (
                        <Animatable.View key={e} animation={first === true ? "" : "pulse"} duration={800} iterationCount="infinite">
                            {first === true ? <FontAwesome6 name="shield" size={24} color="#28F7B9" /> :
                                <MaterialCommunityIcons
                                    name="cards-heart"
                                    size={24}
                                    color="#06c244"
                                />
                            }
                        </Animatable.View>
                    )
                }) : <></>}
            </View>

            {onlyLifes === true && (
                <View style={lifes >= 0 ? [styles.space, { justifyContent: 'center', alignItems: 'flex-end' }] : { position: "absolute" }}>
                    <Animatable.View animation="fadeIn" delay={500} style={{ flexDirection: 'row' }}>
                        <Text style={styles.txt}>+{points || 0}</Text>
                        <MaterialCommunityIcons name="cards-diamond" size={24} color="#06c244" />
                    </Animatable.View>
                </View>
            )}

            {onlyLifes === false && (
                <>
                    <View style={lifes > 0 ? [styles.space, { justifyContent: 'center', alignItems: 'flex-start' }] : { position: 'absolute' }}>
                        <Animatable.View animation="fadeIn" delay={500} style={{ flexDirection: 'row' }}>
                            <Text style={styles.txt}>+{points || 0}</Text>
                            <MaterialCommunityIcons name="cards-diamond" size={24} color="#06c244" />
                        </Animatable.View>
                    </View>
                    <View style={styles.contentBtn}>
                        {idTip !== "none" ? <TouchableOpacity style={styles.btn}
                            disabled={idTip.length > 0 ? true : false}
                            onPress={pressTip}>
                            <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                size={24}
                                color={idTip.length > 0 ? "gray" : "#06c244"}
                            />
                        </TouchableOpacity> : <></>}

                        {pressReload !== "none" ? <TouchableOpacity style={styles.btn}
                            disabled={first == true ? true : false}
                            onPress={pressReload}
                        >
                            <Ionicons
                                size={24}
                                color={first == true ? "#aaaaaa" : "#06c244"}
                                name="reload"
                            />
                        </TouchableOpacity> : []}
                    </View>
                </>
            )}
        </View>
    )
}