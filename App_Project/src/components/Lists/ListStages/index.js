import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListStages({ stages, filter, handlerOnPress }) {
    const navigation = useNavigation()

    const ListStages = !stages ? [] : stages.map((element, i) => {
        return (
            <Animatable.View style={styles.card} key={i} delay={100} animation="zoomIn" duration={350 * i + 1}>
                {i <= filter.actual + 1 && (
                    <TouchableOpacity disabled={i === filter.actual + 1 ? true : false} onPress={() => handlerOnPress(element, i)}>
                        <List.Item
                            title={element._name}
                            style={i === filter.actual + 1 ? [styles.item, {backgroundColor: "gray"}] : styles.item}
                            titleStyle={styles.item_title}
                        />
                    </TouchableOpacity>
                )}
            </Animatable.View>
        )
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <List.Section style={{ width: '100%', alignSelf: "center" }}>
                {ListStages ? ListStages : <></>}
            </List.Section>
        </ScrollView>
    );
};