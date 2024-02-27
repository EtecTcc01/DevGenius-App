import { Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react'
import api from '../../../../api';
import { styles } from './style';

export function BasicTask(props) {
  const dataT = props.data;
  const [answer, setAnswer] = React.useState([])
  const [alt, setAlt] = React.useState()
  const [visible, setVisible] = React.useState(false)

  function altCompare(alt) {
    const alternative = alt;

    if (alternative == answer.answer_text) {
      alert("Acertou!!!")
    } else {
      alert("Errouuuuuu!")
    }
  }

  const getAnswer = async () => {
    try {
      const res = await api.get(`/basicAnswer/unTask/${dataT.id}`)
      setAnswer(res.data.answer[0])
    } catch (error) {
      alert(`Erro ao pegar os dados da resposta. ${error}`)
    }
  }

  React.useEffect(() => {
    getAnswer()
  }, [])

  const random = () => {
    const alts = [answer.answer_text, answer.alternativeA, answer.alternativeB, answer.alternativeC]

    for (let i = alts.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [alts[i], alts[random]] = [alts[random], alts[i]];
    }

    setAlt(alts)
    setVisible(true)
  }

  React.useEffect(() => {
    random()
  }, [answer])

  if (visible == true) {
    return (
      <View style={styles.container}>
        <View style={styles.contentB}>
          <Text style={styles.title}>{dataT.task_text}</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => altCompare(alt[0])}>
            <Text style={styles.title}>{alt[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => altCompare(alt[1])}>
            <Text style={styles.title}>{alt[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => altCompare(alt[2])}>
            <Text style={styles.title}>{alt[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => altCompare(alt[3])}>
            <Text style={styles.title}>{alt[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    []
  }
}
