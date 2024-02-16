import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../../../../api';
import { UserContext } from '../../../apis/contexts/user'

export function LogInBg() {
  const { userData } = React.useContext(UserContext)
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  async function handleLogin() {
    const dataLogin = { userEmail, userPassword };

    try {
      await api.post('/login', dataLogin);

      alert("Usuário logado com sucesso.");

      userData(userEmail);
    } catch (error) {
      alert(`Erro ao logar na conta usuário. ${error}`);
    }
  }

  // Função para navegar para a tela de cadastro (SignIn)
  function handleCadastro() {
    navigation.navigate('SignIn');
  }

  function handleEsqueceuSenha() {
    // Lógica para lidar com esqueceu a senha
  }

  return (
    <View style={styles.container}>
      <Text style={styles.login} variant="titleLarge">Login</Text>
      <TextInput
        style={[styles.input, { color: '#06c244' }]}  // Alteração aqui
        label="Email:"
        value={userEmail}
        onChangeText={userEmail => setUserEmail(userEmail)}
      />
      <TextInput
        style={[styles.input, { color: '#06c244' }]}  // Alteração aqui
        label="Senha:"
        value={userPassword}
        onChangeText={userPassword => setUserPassword(userPassword)}
        secureTextEntry
      />
      <Button
        style={[styles.btn1, { backgroundColor: '#06c244', marginBottom: 10 }]}
        mode="contained"
        labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
        onPress={() => handleLogin()}
      >
        Entrar
      </Button>
      <Button
        style={[styles.btn2, { color: '#06c244', fontSize: 16, marginTop: 20 }]}
        mode="text"
        onPress={() => handleEsqueceuSenha()}
      >
        Esqueceu a senha?
      </Button>
      <Button
        style={[styles.btn3, { backgroundColor: '#06c244' }]}
        mode="contained"
        labelStyle={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}
        onPress={() => handleCadastro()}
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
    margin: 5,
    width: '80%',
    backgroundColor: 'transparent',
  },
  login: {
    color: '#06c244',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  btn1: {
    marginTop: 10,
    width: '50%',
    bottom: '-20px'
  },
  btn2: {
    marginTop: 20,
    color: '#06c244',
    fontSize: 16,
  },
  btn3: {
    backgroundColor: '#06c244',
    borderRadius: 30,
    width: '50%',
    height: '6%',
    bottom: '-115px',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%'
  },
});











// import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import * as React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import api from '../../../../api';

// export function LogInBg() {
//   const navigation = useNavigation();
//   const [userEmail, setUserEmail] = React.useState("");
//   const [userPassword, setUserPassword] = React.useState("");

//   async function handleLogin() {
//     const dataLogin = { userEmail, userPassword };

//     try {
//       await api.post('/login', dataLogin);

//       alert("Logado com sucesso");

//       navigation.navigate('Tabs');
//     } catch (error) {
//       alert(`Erro ao logar usuário. ${error}`);
//     }
//   }

//   // Função para navegar para a tela de cadastro (SignIn)
//   function handleCadastro() {
//     navigation.navigate('SignIn');
//   }

//   function handleEsqueceuSenha() {
//     // Lógica para lidar com esqueceu a senha
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.login} variant="titleLarge">Login</Text>
//       <TextInput
//         style={[styles.input, { color: '#06c244' }]}
//         placeholder="Email"
//         value={userEmail}
//         onChangeText={userEmail => setUserEmail(userEmail)}
//       />
//       <TextInput
//         style={[styles.input, { color: '#06c244' }]}
//         placeholder="Senha"
//         value={userPassword}
//         onChangeText={userPassword => setUserPassword(userPassword)}
//         secureTextEntry
//       />
//       <TouchableOpacity
//         style={[styles.btn1, { backgroundColor: '#06c244', marginBottom: 10 }]}
//         onPress={() => handleLogin()}
//       >
//         <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Entrar</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.btn2, { marginTop: 20 }]}
//         onPress={() => handleEsqueceuSenha()}
//       >
//         <Text style={{ color: '#06c244', fontSize: 16 }}>Esqueceu a senha?</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.btn3, { backgroundColor: '#06c244' }]}
//         onPress={() => handleCadastro()}
//       >
//         <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Cadastre-se</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '5%',
//     width: '100%',
//   },
//   input: {
//     margin: 5,
//     width: '80%',
//     backgroundColor: 'transparent',
//     borderBottomColor: '#06c244',
//     borderBottomWidth: 1,
//     color: '#06c244',
//   },
//   login: {
//     color: '#06c244',
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   btn1: {
//     marginTop: 10,
//     width: '50%',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   btn2: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   btn3: {
//     backgroundColor: '#06c244',
//     borderRadius: 30,
//     width: '50%',
//     height: '6%',
//     bottom: '-115px',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '4%',
//     marginTop: 20,
//   },
// });
