import * as React from 'react';
import { styles } from './style';
import api from '../../../api';
import { List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
      <List.Item
        title={course._name}
        titleStyle={styles.title}
        right={(size) => <Ionicons
          size={size}
          color='#06c244'
          name={course.avatar}
        />}
      />
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