import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native';

// IMPORT DOS COMPONENTS USADOS
// import { TeoryList } from '../../components/TeoryList';
import { Course } from '../../components/Course';

import { getAllTeoryByGroup } from '../../functions/helper.services';

export function TeoryNote() {

  const [courses, setCourses] = React.useState([]);

  //DISPARO DA FUNÇÃO DE FORMA AUTOMATICA E UNICA
  React.useEffect(() => {
    getAllTeoryByGroup(1)
      .then((data) => setCourses(data))
  }, []);

  console.log(courses)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADERNO TEÓRICO</Text>
      {!courses ? [] : <Course course={courses} direction="TeoryDetails" />}
      {/* <TeoryList /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#06c244',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
});