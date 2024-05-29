import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';

export function ListStages({ stages, filter, handlerOnPress }) {
    const navigation = useNavigation()


    const ListStages = !stages ? [] : stages.map((element, i) => {
        return (
            <View key={i}>
                {i <= filter.actual + 1 && (
                    <TouchableOpacity disabled={i === filter.actual + 1 ? true : false} onPress={() => handlerOnPress(element)}>
                        <List.Item
                            title={element._name}
                            style={i === filter.actual + 1 ? [styles.item, {backgroundColor: "gray"}] : styles.item}
                            titleStyle={styles.item_title}
                        />
                    </TouchableOpacity>
                )}
            </View>
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