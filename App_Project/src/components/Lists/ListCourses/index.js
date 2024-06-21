import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, Image, Text } from 'react-native';

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListCourses({ courses, handlerOnPress, registrations }) {
  const navigation = useNavigation()

  const [levels, setLevels] = React.useState([])
  const [phase, setPhase] = React.useState([])

  React.useEffect(() => {
    let reg = []; let subcount = 0;
    let data = []; let ccount = 0
    let _phases = []; let cc = [];

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
          _phases.push(registrations[subcount]._phase)
          ccount++; subcount++
        } else {
          data.push(0)
          _phases.push(0)
          ccount++;
        }
      }
    } catch { [] }

    setPhase(_phases)
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
            }>{levels[index] > 0 || phase[index] > 0 ? "Continuar" : "Iniciar"}</Button>
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
