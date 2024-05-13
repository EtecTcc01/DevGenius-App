import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { teoryDetailStyles } from './teoryDetailStyles';

export function TeoryDetail() {
    const route = useRoute();
    const { teory } = route.params;

    // Verifica se teory está definido antes de acessar suas propriedades
    if (!teory) {
        return (
            <View style={teoryDetailStyles.container}>
                <Text style={teoryDetailStyles.errorText}>Teory not found!</Text>
            </View>
        );
    }

    return (
        <View style={teoryDetailStyles.container}>
            <View style={teoryDetailStyles.content}>
                <Text style={teoryDetailStyles.title}>{teory._name}</Text>
                <Text style={teoryDetailStyles.teoryText}>{teory.teory_text}</Text>
            </View>
        </View>
    );
}
