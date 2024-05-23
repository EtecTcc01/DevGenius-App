import * as React from 'react';
import { styles } from './style';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';

import { userLogin } from '../../functions/user.services'; //IMPORT DAS FUNÇÕES DE LOGIN DO USUÁRIO
import { storeUserData } from '../../functions/async.services'; //IMPORT DAS FUNÇÕES DE ASYNC

import { useNavigation } from '@react-navigation/native'; //IMPORT P/NAVEGAÇÃO ENTRE TELAS
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

//SEM DEFAULT, MAS BASTA CHAMAR PELO NOME DA FUNÇÃO DENTRO DE {}
export function Welcome() {

    // CRIAÇÃO DA VARIAVEL QUE RECEBERÁ A FUNÇÃO DE NAVEGAÇÃO IMPORTADA ANTERIORMENTE
    const navigation = useNavigation();

    async function handlerLogin() {
        // REALIZANDO LOGIN COM CONTA DO ADMIN
        const user = {
            userEmail: "admin01@gmail.com",
            userPassword: "admin0001"
        }

        await userLogin({ user })
            .then((data) => {
                if (!data) {
                    alert("Erro no login. Verifique o email e senha do usuário...")
                    return
                }
                // ARMAZENANDO DADOS DO USUÁRIO COM ASYNC
                storeUserData({ user: data })
                    .then((res) => {
                        if (!res) {
                            alert("Erro ao armazenar os dados do usuário")
                            return
                        }
                        navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
                    })
            })
    }

    return (
        <View style={styles.container}>
            {/* VIEW COM ANIMAÇÃO, E SUAS CONFIG */}
            <Animatable.View style={styles.content} animation='bounceInDown' duration={2000}>

                <TouchableOpacity onPress={async () => handlerLogin()}>
            
                <Image style={styles.logo} source={require('../../../assets/img/logo.png')} />

                </TouchableOpacity>

                {/* <Text style={styles.title}>DevGenius</Text> */}

                <Text style={styles.contentTxt}>Pratique programação de forma mais dinâmica e em qualquer lugar!</Text>

            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.screenSwitch}>

                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Begin-Form', { operation: "Register" })}>
                    <Text style={styles.access1}>Começar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Begin-Form', { operation: "Login" })}>
                    <Text style={styles.access}>Já tenho uma conta</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}
