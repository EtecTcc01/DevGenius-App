import { StyleSheet, Text, View} from 'react-native';

export function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06c244'
  },
  imgProfile: {
    width: 130,
    height: 110,
    margin: 11,
  },
  content: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff'
  }
});