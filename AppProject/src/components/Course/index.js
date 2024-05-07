import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { List, Modal, Portal, PaperProvider, Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER
// import { Ionicons } from '@expo/vector-icons'; //IMPORT DE ICONS DO EXPO
import { useNavigation } from '@react-navigation/native'; //IMPORT P/TRANSFERENCIA DE TELA

//IMPORT DE FUNÇÕES EXTERNAS
import { getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services'

export function Course({ course, direction, message }) {
  const navigation = useNavigation(); //PASSANDO AS FUNÇÕES DO IMPORT

  const [visibleModal, setVisibleModal] = React.useState(false)
  const [selected, setSelected] = React.useState({})
  const [user, setUser] = React.useState({})

  //BUSCANDO OS DADOS DO USUÁRIO DENTRO DO ASYNC SOTRAGE
  React.useEffect(() => {
    getDataUser()
      .then((data) => {
        if (!data) {
          console.log("Erro ao buscar os dados do usuário")
          return
        }
        setUser(data)
      })
  }, [])

  // FUNÇÃO P/DESATIVAÇÃO/ATIVAÇÃO DA VISIBILIDADE DO MODAL
  const modalSwitch = () => {
    setVisibleModal(!visibleModal)
  }

  //FUNÇÃO P/BUSCAR O REGISTRO DO USUÁRIO NO CURSO E EXIBIR O MODAL DE ACORDO
  function handlerOnPressTransfer() {
    getRegistrationForStages(user.id_user, selected.id_course)
      .then((data) => {
        if (!data) {
          console.log("Erro ao buscar os dados do usuário")
          return
        }
        console.log(data)
        navigation.navigate(`${direction}`, { course: selected, registration: data })
      })
  }

  //CRIANDO MULTIPLOS ELEMENTOS
  const listCourses = !course ? [] : course.map((element, index) => {
    return (
      <View style={styles.button} key={index} id={index}>
        <TouchableOpacity
          onPress={() => {
            setSelected(element)
            modalSwitch()
          }}
        >
          <List.Item
            title={element._course}
            titleStyle={styles.title}
          />
        </TouchableOpacity>
      </View>
    )
  });

  return (
    <PaperProvider>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={modalSwitch}
            dismissable="true"
            dismissableBackButton="true"
            contentContainerStyle={styles.modal}>
            <View>
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
              <Button mode="contained" onPress={() => handlerOnPressTransfer()}>
                Transferir
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={styles.content}>
          {listCourses}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
