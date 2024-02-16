import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Activities } from '../../../components/Activities/tasks';

export function PersonalAct({ route }) {
    const language = route.params.dataQ.lang;
    const difficulty = route.params.dataQ.diff;

    return (
        <View style={styles.container}>
            <View style={styles.contentA}>
                <Text style={styles.title}>{difficulty._description}</Text>
            </View>
            <View style={styles.contentB}>
                <Activities lang={language} diff={difficulty} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentA: {
        flex: 2,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    contentB: {
        flex: 2,
        width: '95%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#06c244',
        marginBottom: 10,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    },
});
