import { StyleSheet, View } from 'react-native';
import { BasicTask } from '../../../components/TaskAction/Basic';

export function BasicAct({ route }) {
  const dataT = route.params.act;

  return (
    <View style={styles.container}>
      <BasicTask data={dataT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
