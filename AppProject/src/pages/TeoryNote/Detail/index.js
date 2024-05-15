import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

export function TeoryDetail({ route, data }) {
    const teory = route ? route.params.teory[0] : data
    console.log(teory)

    // Verifica se teory está definido antes de acessar suas propriedades
    if (!teory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Teory not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{route ? teory._teory : teory._name}</Text>
                <Text style={styles.title}>{route ? teory.teory_text : teory._text}</Text>
            </View>
        </View>
    );
}
