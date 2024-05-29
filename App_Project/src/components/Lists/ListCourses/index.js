import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, Image, Text } from 'react-native';

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function ListCourses({ courses, handlerOnPress, registrations }) {
  const navigation = useNavigation()

  const [levels, setLevels] = React.useState([])

  React.useEffect(() => {
    let data = []

    registrations.forEach(element => {
      data.push(element.level_stage)
    })

    setLevels(data)
  }, [registrations])

  const listCourses = !courses ? [] : courses.map((element, index) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.title}>{element._course}</Text>
        <Text style={styles.subTitle}>{element.course_desc}</Text>
        <Image style={styles.cover} source={{ uri: element.course_icon }} />

        <View style={styles.action}>
          <Button style={[styles.button, { borderWidth: 1, borderColor: "black" }]} labelStyle={styles.label} onPress={(() => {
            handlerOnPress(element, "Stages")
          })}>Lista</Button>
          <Button style={[styles.button, { backgroundColor: '#663399' }]} labelStyle={[styles.label, { color: "white" }]} onPress={(() => {
            handlerOnPress(element, "Action")
          })}>{levels[index] > 0 ? "Retomar" : "Iniciar"}</Button>
        </View>
      </View>
    )
  });

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {listCourses}
    </ScrollView>
  );
}
