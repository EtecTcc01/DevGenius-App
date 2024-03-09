import * as React from 'react';
import { styles } from './style';
import api from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Text, TouchableOpacity, View } from 'react-native';


export function InitialScreen() {
    const navigation = useNavigation();

    async function loginSkip() {
        const userEmail = "admin01@gmail.com";
        const userPassword = "admin0001";

        const dataLogin = { userEmail, userPassword };

        await api.post('/user/validation', dataLogin)
            .then(() => {
                console.log("Usuário logado com sucesso.");
                getDataUser(userEmail)
            }).catch((error) => {
                alert(`Erro ao logar na conta usuário. ${error}`);
                return []
            })
    }

    const getDataUser = async (userEmail) => {
        await api.get(`/user/un/${userEmail}`)
            .then((res) => {
                storeDataUser({ user: res.data.user[0] })
            }).catch((error) => {
                alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            })
    };

    const storeDataUser = async ({ user }) => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('userLogin', jsonValue);

            navigation.navigate('Tabs')
        } catch (error) {
            console.log(`Erro ao salvar dados do usuário. ${error}`)
        }
    };

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
