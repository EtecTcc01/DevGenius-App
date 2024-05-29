import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './style';

export function ListGroups({ groups, handlerOnPress }) {

    const listGroups = !groups ? [] : groups.map((e, i) => {
        return (
            <TouchableOpacity key={i} onPress={() => handlerOnPress(e)}>
                <List.Item
                    title={e.group_name}
                    style={styles.item}
                    titleStyle={styles.item_title}
                />
            </TouchableOpacity>
        )
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <List.Section style={{ width: '100%', alignSelf: "center" }}>
                {listGroups ? listGroups : <></>}
            </List.Section>
        </ScrollView>
    );
};