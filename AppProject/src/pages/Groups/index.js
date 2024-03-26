import { View, StyleSheet } from 'react-native';
import { GroupList } from '../../components/GroupList';

export function Groups() {
    return (
        <View style={styles.container}>
            <GroupList />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
