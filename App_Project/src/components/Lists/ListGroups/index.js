import * as React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';

import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { FontAwesome6, Feather } from '@expo/vector-icons';

export function ListGroups({ groups, handlerOnPress }) {

    const listGroups = !groups ? [] : groups.map((e, i) => {
        if (e._inactive === 0) {
            return (
                <Animatable.View style={styles.card} key={i} delay={200} animation="zoomIn" duration={350 * i + 1}>
                    <View style={styles.choices} onPress={() => handlerOnPress(e)}>
                        <TouchableOpacity style={styles.item} onPress={() => handlerOnPress(e, "stages")}>
                            <Text style={styles.item_title}>{e.group_name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notes} onPress={() => handlerOnPress(e, "notes")}>
                            <Feather name="book" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logout} onPress={() => handlerOnPress(e, "modal")}>
                        <FontAwesome6 name="trash-can" size={24} color="black" />
                    </TouchableOpacity>
                </Animatable.View>
            )
        }
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {listGroups ? listGroups : <></>}
        </ScrollView>
    );
};