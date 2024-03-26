import * as React from 'react';
import { styles } from './style'
import { Text, View } from 'react-native';
import { Activities } from '../Activities/index'

export function PersonalTasks(props) {
    const data = props.data
    const language = data.lang
    const difficulty = data.diff;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{difficulty._description}</Text>
            </View>
            <View style={styles.contentA}>
                <Activities lang={language} diff={difficulty} />
            </View>
        </View>
    );
}
