import { StyleSheet, Text, View} from 'react-native';

export function TeoryNote() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Caderno teórico</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06c244'
  },
});