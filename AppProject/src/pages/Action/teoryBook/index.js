import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import api from '../../../../api';

export function TeoryBook({route}) {
  const dataTeoryB = route.params.dataTeoryBook;
  console.log(dataTeoryB)
  console.log(route.params.dataTeoryBook)
  const [teory, setTeory] = React.useState([]);

  const getTeory = async () => {
    try {
        const res = await api.get(`/teory/un/${dataTeoryB.id_teory}`)
        setTeory(res.data.teory[0]);
        console.log(res.data.teory)
    } catch (error) {
        alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
    }
}

React.useEffect(() => {
  getTeory()
}, [setTeory])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Teoria: {teory._name}</Text>
      </View>
      <View style={styles.contentB}>
        <Text style={styles.title}>{teory.teory_text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 2,
    borderColor: '#06c244',
    borderRadius: '10px',
    borderWidth: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '3%'
  },
  contentB: {
    flex: 4,
    borderColor: '#06c244',
    borderRadius: '10px',
    borderWidth: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '3%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    margin: 11,
    textAlign: 'center'
  }
});
