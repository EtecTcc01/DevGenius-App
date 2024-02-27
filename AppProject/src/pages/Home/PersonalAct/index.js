import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { PersonalTasks } from '../../../components/PersonalTasks';

export function PersonalAct({ route }) {
    const dataQ = route.params.dataQ

    return (
        <View style={styles.container}>
            <PersonalTasks data={dataQ} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
