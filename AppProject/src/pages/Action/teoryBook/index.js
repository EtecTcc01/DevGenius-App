import { StyleSheet, View } from 'react-native';
import { TeoryBTask } from '../../../components/TaskAction/Teory';

export function TeoryBook({ route }) {
  const dataTB = route.params.dataTeoryBook;

  return (
    <View style={styles.container}>
      <TeoryBTask data={dataTB} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
