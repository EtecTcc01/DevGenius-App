import { View, StyleSheet } from 'react-native';
import { TeoryList } from '../../components/TeoryList';

export function TeoryNote() {
  return (
    <View style={styles.container}>
      <TeoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});