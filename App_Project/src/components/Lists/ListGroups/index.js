import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListGroups({ groups, handlerOnPress }) {

    const listGroups = !groups ? [] : groups.map((e, i) => {
        return (
            <Animatable.View style={styles.card} key={i} delay={200} animation="zoomIn" duration={350 * i + 1}>
                <TouchableOpacity onPress={() => handlerOnPress(e)}>
                    <List.Item
                        title={e.group_name}
                        style={styles.item}
                        titleStyle={styles.item_title}
                    />
                </TouchableOpacity>
            </Animatable.View>
        )
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {listGroups ? listGroups : <></>}
        </ScrollView>
    );
};