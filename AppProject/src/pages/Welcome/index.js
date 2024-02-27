import { View, StyleSheet } from 'react-native';
import { InitialScreen } from '../../components/InitialScreen';

export function Welcome() {
    return (
        <View style={styles.container}>
            <InitialScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
