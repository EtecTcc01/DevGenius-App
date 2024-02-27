import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { DifficultyList } from '../../../components/Difficulty';

export function DifficultyLvl({ route }) {
    const lang = route.params.language;
    return (
        <View style={styles.container}>
            <DifficultyList lang={lang} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
