import { Text, View } from 'react-native';
import * as React from 'react';
import { Courses } from '../../components/Courses/index';
import { styles } from './style';

export function HomeDirection() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>COMPONENTE PÚBLICO</Text>
            </View>
            <View style={styles.contentB}>
                <Courses />
            </View>
        </View>
    );
}
