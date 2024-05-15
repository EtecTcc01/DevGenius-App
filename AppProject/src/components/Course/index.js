import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { List, Modal, Portal, PaperProvider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationForStages } from '../../functions/helper.services';
import { getDataUser } from '../../functions/async.services'
import { TeoryList } from '../TeoryList';

export function Course({ course, direction, message, operation }) {
  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = React.useState(false)
  const [selected, setSelected] = React.useState({})
  const [registration, setRegistration] = React.useState([])
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
    modalSwitch()
    navigation.navigate(`${direction}`, { course: selected, registration: registration[0] })
  }

  const listCourses = !course ? [] : course.map((element, index) => {
    switch (operation) {
      case "modal":
        return (
          <View style={styles.button} key={index} id={index}>
            <TouchableOpacity
              onPress={async () => {
                let validation = false
                setSelected(element)

                await getRegistrationForStages(user.id_user, element.id_course)
                  .then((data) => {
                    if (!data) {
                      console.log("Erro ao buscar os dados do usuário")
                      return
                    }
                    validation = true
                    console.log(data)
                    setRegistration(() => data)
                  })

                if (validation === true) {
                  modalSwitch()
                }
              }}
            >
              <List.Item
                title={element._course}
                titleStyle={styles.title}
              />
            </TouchableOpacity>
          </View>
        )
      case "drop":
        return (
          <View style={{ backgroundColor: "white", width: "99%", height: 50, marginBottom: 25 }} key={index} id={index}>
            <TeoryList container={element} />
          </View>
        )
    }
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
                <>
                  {registration[0] && (
                    <Text>{registration[0].level_stage > 0 ? `CONTINUAR CURSO A PARTIR DO ESTAGIO ${registration[0].level_stage}` : "COMEÇAR CURSO DO ZERO"}</Text>
                  )}
                </>

                <>
                  {registration[0] && (
                    <Button disabled={registration[0].level_stage < selected.qtd_stages ? false : true} mode="contained" onPress={() => handlerOnPressTransfer()}>
                      {registration[0].level_stage > 0 ? `CONTINUAR` : "COMEÇAR"}
                    </Button>
                  )}
                </>
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
