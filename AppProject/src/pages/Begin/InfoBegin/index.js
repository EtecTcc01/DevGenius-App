import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../../../../api';

export function InfoBg({ route }) {
  const navigation = useNavigation();

  const [fullName, setFullName] = React.useState("");
  const [userSex, setUserSex] = React.useState("");
  const [userDate, setUserDate] = React.useState();
  const dataUser = route.params.dataUser;
  const userName = route.params.dataUser.userName;

  async function handleRegister () {
    try {
      await api.post('/user', dataUser)
  
      handleInfo();
    } catch (error) {
      alert(`Erro ao cadastrar usuário. ${error}`);
    }
  }
  

  async function handleInfo() {
    const dataInfo = { userName, userDate, userSex, fullName };

    if (!fullName) {
      return alert("Por favor, insira seu nome.");
    }
    if (!userSex) {
      return alert("Por favor, insira seu sexo.");
    }
    if (!userDate) {
      return alert("Por favor, insira uma data de nascimento.");
    }

    try {
      await api.post('/info', dataInfo);
  
      alert("Usuário cadastrado com sucesso.")

      navigation.navigate('Tabs');
    } catch (error) {
      alert(`Erro ao cadastrar informações do usuário. ${error}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="titleLarge">Informações</Text>
      <TextInput
        style={[styles.input, { backgroundColor: 'transparent', marginTop: 10 }]}
        label="Nome Completo (Real):"
        value={fullName}
        onChangeText={fullName => setFullName(fullName)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: 'transparent' }]}
        label="Sexo:"
        value={userSex}
        onChangeText={userSex => setUserSex(userSex)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: 'transparent' }]}
        label="Data de nascimento:"
        value={userDate}
        onChangeText={userDate => setUserDate(userDate)}
      />
      <Button
        style={[styles.button, { backgroundColor: '#06c244', marginTop: 20 }]}
        mode="contained"
        onPress={() => handleRegister()}
      >
        Adicione
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    width: '100%',
  },
  input: {
    margin: 5,
    width: '80%',
  },
  title: {
    color: '#06c244',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
  },
});
