import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, Image, Text } from 'react-native';

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListCourses({ courses, handlerOnPress, registrations }) {
  const navigation = useNavigation()

  const [levels, setLevels] = React.useState([])

  React.useEffect(() => {
    let cc = []; let reg = []
    let data = []; let ccount = 0
    let subcount = 0

    try {
      courses.forEach(e => {
        cc.push(e.id_course)
      })

      registrations.forEach(e => {
        reg.push(e.id_course)
      })

      while (ccount < cc.length) {
        if (reg[subcount] === cc[ccount]) {
          data.push(registrations[subcount].level_stage)
          ccount++; subcount++
        } else {
          data.push(0)
          ccount++;
        }
      }
    } catch { [] }

    console.log(data, cc)
    setLevels(data)
  }, [registrations])

  const listCourses = !courses ? [] : courses.map((element, index) => {
    return (
      <Animatable.View style={styles.card} key={index} delay={100} animation="zoomIn" duration={350}>
        <Text style={styles.title}>{element._course}</Text>
        <Text style={styles.subTitle}>{element.course_desc}</Text>
        <Image style={styles.cover} source={{ uri: element.course_icon }} />

        <View style={styles.action}>
          <Button style={[styles.button, { borderWidth: 1, borderColor: "black" }]} labelStyle={styles.label} onPress={(() => {
            handlerOnPress(element, "Stages")
          })}>Lista</Button>
          <Button style={levels[index] >= element.qtd_stages ? [styles.button, { backgroundColor: 'gray' }] : [styles.button, { backgroundColor: '#284703' }]}
            disabled={levels[index] >= element.qtd_stages ? true : false}
            labelStyle={[styles.label, { color: "#cfe3d4" }]} onPress={(() => handlerOnPress(element, "Action"))
            }>{levels[index] > 0 ? "Continuar" : "Iniciar"}</Button>
        </View>
      </Animatable.View>
    )
  });

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {listCourses}
    </ScrollView>
  );
}
