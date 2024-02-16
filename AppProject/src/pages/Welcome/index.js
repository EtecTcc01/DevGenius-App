import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as React from 'react';
import { UserContext } from '../../apis/contexts/user'
import api from '../../../api';


export function Welcome() {
    const navigation = useNavigation();
    const { userData } = React.useContext(UserContext)

    async function loginSkip() {
        const userEmail = "admin01@gmail.com";
        const userPassword = "admin0001";
        const dataLogin = { userEmail, userPassword };
    
        try {
          await api.post('/login', dataLogin);
    
          userData(userEmail);
        } catch (error) {
          alert(`Erro ao logar na conta usuário. ${error}`);
        }
      }

    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerTxt} animation='bounceInDown' duration={2000}>
                <Text style={styles.title}>Bem-vindo ao DevGenius</Text>
                <TouchableOpacity onPress={() => loginSkip()}>
                    <Text style={styles.subTitle}>Deseja pular login?</Text>
                </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.screenSwitch}>
                <Text style={styles.conteudo}>Pratique programação de forma mais dinâmica e em qualquer lugar!</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.acessar}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
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
    containerTxt: {
        flex: 2,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    screenSwitch: {
        backgroundColor: '#000',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '7%'
    }, 
    title: {
        color: '#06c244',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        paddingTop: 18,
        color: '#06c244',
        fontWeight: 'bold',
        fontSize: 20
    },
    conteudo: {
        color: '#06c244',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#06c244',
        position: 'absolute',
        borderRadius: 30,
        width: '60%',
        bottom: '35%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
    },
    acessar: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25
    }
});
