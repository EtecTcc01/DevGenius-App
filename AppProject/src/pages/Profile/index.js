import { StyleSheet, View, } from 'react-native';
import { GuestCard } from '../../components/GuestCard';

export function Profile() {
  return (
    <View style={styles.container}>
      <GuestCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});