import * as React from "react";
import { styles } from "./style";
import { View, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO

export function TopBarUtils({ idTip, pressTip, pressReload, first, lifes, onlyLifes }) {

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
            <View style={onlyLifes === false ? styles.contentImg : [styles.contentImg, {flex: 1, width: "100%", justifyContent: "center"}]}>
                {lifePoints.length > 0 ? lifePoints.map((e) => {
                    return (
                        <Animatable.View key={e} animation="pulse" duration={800} iterationCount="infinite">
                            <MaterialCommunityIcons name="cards-heart" size={24} color="#06c244" />
                        </Animatable.View>
                    )
                }) : <></>}
            </View>


            {onlyLifes === false && (
                <>
                    <View style={styles.space} />
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