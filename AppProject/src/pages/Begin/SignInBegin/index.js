import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, Text, TextInput } from 'react-native-paper';

export function SignInBg() {
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [typeUser, setTypeUser] = React.useState("comum");
  
  async function handleRegister() {
    if (confirmPass != userPassword) {
      return alert("As senhas estão erradas.");
    }
    if (!userEmail) {
      return alert("Por Favor, insira um email.");
    }
    if (!userName) {
      return alert("Por favor, insira um nome de usuário.");
    }

    const dataUser = {userName, userEmail, userPassword, typeUser}

    navigation.navigate('UserInfo', {dataUser})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cadastro} variant="titleLarge">Cadastro</Text>
      <TextInput style={styles.input} label="Nome de Usuário:" value={userName} onChangeText={userName => setUserName(userName)} />
      <TextInput style={styles.input} label="E-mail:" value={userEmail} onChangeText={userEmail => setUserEmail(userEmail)} />
      <TextInput style={styles.input} label="Senha:" value={userPassword} onChangeText={userPassword => setUserPassword(userPassword)} />
      <TextInput style={styles.input} label="Confirmar senha:" value={confirmPass} onChangeText={confirmPass => setConfirmPass(confirmPass)} />
      <Button
        style={[styles.btn3, { backgroundColor: '#06c244' }]}
        mode="contained"
        labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
        onPress={() => handleRegister()}
      >
        Cadastre-se
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
    marginTop: 10,
    width: '80%',
    backgroundColor: 'transparent',
  },
  btn3: {
    marginTop: 10,
    width: '50%',
    bottom: '-20px',
    color: '#06c2444'
  },
  cadastro: {
    color: '#06c244',
    fontSize: 24,
    marginBottom: 20,
  },
});