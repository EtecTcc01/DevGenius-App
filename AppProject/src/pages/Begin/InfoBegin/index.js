import { StyleSheet, View } from 'react-native';
import { InfoForm } from '../../../components/Forms/Info';

//VERIFICAR
export function InfoBg({ route }) {
  const dataU = route.params.dataUser
  console.log(dataU)

  return (
    <View style={styles.container}>
      <InfoForm data={dataU} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
