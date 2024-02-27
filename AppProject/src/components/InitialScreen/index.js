import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as React from 'react';
import { UserContext } from '../../apis/contexts/user'
import api from '../../../api';


export function InitialScreen() {
    const navigation = useNavigation();
    const { userData } = React.useContext(UserContext)

    async function loginSkip() {
        const userEmail = "admin01@gmail.com";
        const userPassword = "admin0001";
        const dataLogin = { userEmail, userPassword };

        try {
            await api.post('/user/validation', dataLogin);

            userData(userEmail);
        } catch (error) {
            alert(`Erro ao logar na conta usuário. ${error}`);
        }
    }

    return (
        <View style={styles.container}>
            <Animatable.View style={styles.content} animation='bounceInDown' duration={2000}>
                <Text style={styles.title}>Bem-vindo ao DevGenius</Text>
                <TouchableOpacity onPress={() => loginSkip()}>
                    <Text style={styles.subTitle}>Deseja pular login?</Text>
                </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.screenSwitch}>
                <Text style={styles.contentTxt}>Pratique programação de forma mais dinâmica e em qualquer lugar!</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.access}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}
