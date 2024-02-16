import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Courses } from '../../components/Courses/index';

// O nome da function é importante quando não há export default
export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>GRUPO PÚBLICO</Text>
      </View>
      <View style={styles.contentB}>
        <Courses />
      </View>
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
  content: {
    flex: 1,
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    marginLeft: '7%',
    marginTop: '7%',
  },
  contentB: {
    flex: 6,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06c244',
    marginBottom: 10,
  },
});
