import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { teoryDetailStyles } from './teoryDetailStyles';

export function TeoryDetail() {
    const route = useRoute();
    const { teory } = route.params;

    return (
        <View style={teoryDetailStyles.container}>
            <View style={teoryDetailStyles.content}>
                <Text style={teoryDetailStyles.title}>{teory._name}</Text>
                <Text style={teoryDetailStyles.teoryText}>{teory.teory_text}</Text>
            </View>
        </View>
    );
}
