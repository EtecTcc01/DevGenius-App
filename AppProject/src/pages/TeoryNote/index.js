import * as React from 'react'
import { View, Text } from 'react-native';
import { styles } from './style'

import { Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

//IMPORT DE COMPONENTES USADOS
import { Course } from '../../components/Course';
import { TeoryList } from '../../components/TeoryList';

//IMPORT DE FUNÇÕES EXTERNAS
import { getAllTeoryByCourse, getAllTeoryByGroupOrdened } from '../../functions/helper.services';

import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA

export function TeoryNote() {
  const navigation = useNavigation(); //TRANSFERENCIA DE FUNÇÕES P/UMA CONSTANTE

  const [courses, setCourses] = React.useState([]);
  const [teory, setTeory] = React.useState([]); //STATE P/ARMAZENAR TEORIAS

  //FUNÇÃO P/BUSCAR TEORIAS PELO ID DO CURSO
  function handlerChoiceCourse(element) {
    getAllTeoryByCourse(element.id_course)
      .then((data) => {
        if (!data) {
          console.log("Erro ao buscar dados das teorias do curso.")
          return
        }
        setTeory(data)
        console.log(data)
      })
  }

  //FUNÇÃO P/TRANSFERIR A TELA P/EXIBIÇÃO DA TEORIA
  function handlerPressTeory(data) {
    navigation.navigate("TeoryDetail", { teory: data })
  }

  //DISPARO DA FUNÇÃO DE FORMA AUTOMATICA E UNICA
  React.useEffect(() => {
    //FUNÇÃO P/BUSCAR CURSOS QUE CONTÉM TEORIAS
    getAllTeoryByGroupOrdened(1)
      .then((data) => setCourses(data))
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADERNO TEÓRICO</Text>

      {
        courses.length > 0 && teory.length < 1 ?
          <Course course={courses} handlerOnPress={(e) => handlerChoiceCourse(e)} />
          :
          <TeoryList item={teory} handlerOnPress={(e) => handlerPressTeory(e)} />
      }

      {
        teory.length > 1 ? <Button style={styles.btn}
          mode="contained"
          onPress={() => setTeory([])}
        > Voltar </Button> : <></>
      }
    </View>
  );
}