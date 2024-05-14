import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

export function TeoryDetail({ route }) {
    const teory = route.params.teory[0];
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
                <Text style={styles.title}>{teory._teory}</Text>
                <Text style={styles.title}>{teory.teory_text}</Text>
            </View>
        </View>
    );
}
