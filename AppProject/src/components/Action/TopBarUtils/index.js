import * as React from "react";
import { styles } from "./style";
import { View, TouchableOpacity } from "react-native";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO

export function TopBarUtils({ idTip, pressTip, pressReload, first, lifes }) {

    const [lifePoints, setLifePoints] = React.useState([])

    React.useEffect(() => {
        let temp = []

        try {
            for (let i = 0; i < lifes; i++) {
                temp.push(i)
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
                    return <MaterialCommunityIcons id={e} key={e} name="cards-heart" size={24} color="#06c244" />
                }) : <></>}
            </View>

            <View style={styles.space} />

            <View style={styles.contentBtn}>
                <TouchableOpacity style={styles.btn}
                    disabled={idTip.length > 0 ? true : false}
                    onPress={pressTip}>
                    <MaterialCommunityIcons
                        name="lightbulb-on-outline"
                        size={24}
                        color={idTip.length > 0 ? "gray" : "#06c244"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}
                    disabled={first == true ? true : false}
                    onPress={pressReload}
                >
                    <Ionicons
                        size={24}
                        color={first == true ? "#aaaaaa" : "#06c244"}
                        name="reload"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}