import { Text, View } from 'react-native';
import * as React from 'react';
import { Activities } from '../Activities/index'
import { styles } from './style'

export function PersonalTasks(props) {
    const data = props.data
    const language = data.lang
    const difficulty = data.diff;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{difficulty._description}</Text>
            </View>
            <View style={styles.contentB}>
                <Activities lang={language} diff={difficulty} />
            </View>
        </View>
    );
}
