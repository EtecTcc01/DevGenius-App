import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react'
import api from '../../../../api';

export function AdvancedAct({ route }) {
  const dataQ = route.params.act;
  const [answer, setAnswer] = React.useState([])
  const [alt, setAlt] = React.useState()
  const [visible, setVisible] = React.useState(true)

  function altCompare(alt) {
    const alternative = alt;

    if (alternative == answer.answer_text) {
      alert("Acertou!!!")
    } else {
      alert("Errouuuuuu!")
    }
  }

//   const getAnswer = async () => {
//     try {
//       const res = await api.get(`/basicAnswer/unQuest/${dataQ.id}`)
//       setAnswer(res.data.answer[0])
//     } catch (error) {
//       alert(`Erro ao pegar os dados da resposta. ${error}`)
//     }
//   }

//   React.useEffect(() => {
//     getAnswer()
//   }, [])

//   const test = () => {
//     const alts = [answer.answer_text, answer.alternativeA, answer.alternativeB, answer.alternativeC]

//     for (let i = alts.length - 1; i > 0; i--) {
//       const random = Math.floor(Math.random() * (i + 1));

//       [alts[i], alts[random]] = [alts[random], alts[i]];
//     }

//     setAlt(alts)
//     setVisible(true)
//   }

//   React.useEffect(() => {
//     test()
//   }, [answer])

  if (visible == true) {
    return (
      <View style={styles.container}>
        <View style={styles.contentA}>
          <Text style={styles.title}>{dataQ.quest_text}</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.contentB} onPress={() => altCompare(alt[0])}>
            <Text style={styles.title}>{alt[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentB} onPress={() => altCompare(alt[1])}>
            <Text style={styles.title}>{alt[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentB} onPress={() => altCompare(alt[2])}>
            <Text style={styles.title}>{alt[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentB} onPress={() => altCompare(alt[3])}>
            <Text style={styles.title}>{alt[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    []
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    flex: 2,
    width: '100%',
    borderColor: '#06c244',
    borderRadius: '10px',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '8px'
  },
  contentA: {
    flex: 1,
    borderColor: '#06c244',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    elevation: 10,
    padding: '3%'
  },
  contentB: {
    width: '90%',
    padding: '4%',
    margin: '2%',
    borderColor: '#06c244',
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06c244',
    textAlign: 'center',
  }
});
