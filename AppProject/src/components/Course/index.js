import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { List, Modal, Portal, PaperProvider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services'

export function Course({ course, direction, message }) {
  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = React.useState(false)
  const [selected, setSelected] = React.useState({})
  const [user, setUser] = React.useState({})

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

  const modalSwitch = () => {
    setVisibleModal(!visibleModal)
  }

  function handlerOnPressTransfer() {
    getRegistrationForStages(user.id_user, selected.id_course)
      .then((data) => {
        if (!data) {
          console.log("Erro ao buscar os dados do usuário")
          return
        }
        navigation.navigate(`${direction}`, { course: selected, registration: data })
      })
  }

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Portal>
            <Modal
              visible={visibleModal}
              onDismiss={modalSwitch}
              dismissable={true}
              dismissableBackButton={true}
              contentContainerStyle={styles.modal}>
              <View>
                <Text>Exemplo Modal. Clique fora desta área para descartar.</Text>
                <Button mode="contained" onPress={() => handlerOnPressTransfer()}>
                  Transferir
                </Button>
              </View>
            </Modal>
          </Portal>
          <View style={styles.content}>
            {listCourses}
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
