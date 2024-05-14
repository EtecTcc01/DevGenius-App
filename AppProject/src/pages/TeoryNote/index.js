import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native';

import { Course } from '../../components/Course'; // IMPORT DO COMPONENTE USADO

import { getAllTeoryByGroupOrdened } from '../../functions/helper.services';

export function TeoryNote() {

  const [courses, setCourses] = React.useState([]);

  //DISPARO DA FUNÇÃO DE FORMA AUTOMATICA E UNICA
  React.useEffect(() => {
    getAllTeoryByGroupOrdened(1)
      .then((data) => setCourses(data))
  }, []);

  console.log(courses)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADERNO TEÓRICO</Text>
      {!courses ? [] : <Course course={courses} direction="TeoryDetail" operation="drop" />}
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