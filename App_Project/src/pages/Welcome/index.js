import * as React from 'react'
import { styles } from './style';

import { Text, TouchableOpacity, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { userLogin } from '../../functions/user.services';
import { storeUserData } from '../../functions/async.services';

export function Welcome({ navigation }) {

    async function handlerLogin() {
        // REALIZANDO LOGIN COM CONTA DO ADMIN
        const user = {
            userEmail: "admin01@gmail.com",
            userPassword: "admin0001"
        }

        await userLogin({ user })
            .then((data) => {
                if (!data) {
                    console.log("Erro no login. Verifique o email e senha do usuário...")
                    return
                }
                // ARMAZENANDO DADOS DO USUÁRIO COM ASYNC
                storeUserData({ user: data })
                    .then((res) => {
                        if (!res) {
                            console.log("Erro ao armazenar os dados do usuário")
                            return
                        }
                        navigation.navigate('Tabs') //USANDO DA TRANSFERENCIA DE TELA E NAVEGANDO P/A FUNÇÃO DE ROTA TabsRoutes
                    })
            })
    }

    return (
        <View style={styles.container}>

            <Animatable.View style={styles.subContainer} animation='bounceInDown' duration={2000}>

                <TouchableOpacity onPress={async () => handlerLogin()}>

                    <Image style={styles.logo} source={require('../../../assets/img/logo.png')} />

                </TouchableOpacity>

                <Text style={styles.title}>Pratique programação de forma mais dinâmica e em qualquer lugar!</Text>

            </Animatable.View>

            <Animatable.View animation='fadeInUp' style={[styles.subContainer, { flex: 0.5 }]}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Begin', { operation: "Register" })}>
                    <Text style={styles.title}>Começar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Begin', { operation: "Login" })}>
                    <Text style={styles.title}>Já tem uma conta?</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}
