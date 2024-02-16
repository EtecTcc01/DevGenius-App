import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as React from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';

export function Courses() {
  const navigation = useNavigation();
  const [courses, setCourses] = React.useState([]);

  const getAllLangGroup = async () => {
    try {
      const res = await api.get(`/language/group/1`)
      setCourses(res.data.language)
    } catch (error) {
      alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
    }
  }

  React.useEffect(() => {
    getAllLangGroup()
  }, [])

  const listCourses = courses.map((course) =>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Difficulty', { language: course })}>
      <Text style={styles.title}>{course._name}</Text>
    </TouchableOpacity>

  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {listCourses}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: '5%',
  },
  content: {
    backgroundColor: '#000',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  button: {
    flex: 2,
    borderRadius: 100,
    borderColor: '#06c244',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "2%",
    minHeight: 150,
    minWidth: 150
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});