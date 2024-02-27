import { StyleSheet, View } from 'react-native';
import { HomeDirection } from '../../components/HomeDirection';

export function Home() {
  return (
    <View style={styles.container}>
      <HomeDirection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
