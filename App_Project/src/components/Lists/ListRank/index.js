import * as React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';

import { List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListRanks({ ranks }) {

    const listRanks = !ranks ? [] : ranks.map((element, i) => {
        return (
            <Animatable.View key={i} delay={100} animation="zoomIn" duration={350 * i + 1} >
                <List.Item
                    title={element.user_name}
                    description={`Exp (Acumulado) atual: ${element.total_exp}`}
                    style={i === 0 ? [styles.item, {backgroundColor: 'cyan', width: '98%', minHeight: 75}] : styles.item}
                    titleStyle={styles.item_title}
                    left={() => <Text style={styles.title}>{i + 1}°</Text>}
                    right={() => <Text style={styles.title_points}>Lvl: {element._level}</Text>}
                />
            </Animatable.View >
        )
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <List.Section style={{ width: '100%', alignSelf: "center" }}>
                {listRanks ? listRanks : <></>}
            </List.Section>
        </ScrollView>
    );
};