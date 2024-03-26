import { StyleSheet, View } from 'react-native';
import { DifficultyList } from '../../../components/DifficultyList';

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
