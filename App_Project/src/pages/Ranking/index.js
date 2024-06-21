import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style';

import { ListRanks } from '../../components/Lists/ListRank';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { getAllUserRanks } from '../../functions/helper.services';
import { getChangedState } from '../../functions/async.services';

export function Ranking() {

    const [rank, setRank] = React.useState([])

    const [changed, setChanged] = React.useState() //STATE P/ARMAZENAR STATE DE MUDANÇA
    const [timer, setTimer] = React.useState(0) //STATE P/ARMAZENAR N. DO TIMER

    // FUNÇÃO TEMPORIZADORA P/COLETA E ATUALIZAÇÃO DE DADOS
    React.useEffect(() => {
        getChangedState()
            .then((res) => {
                if (res !== changed) {
                    setChanged(res)
                }
            })

        setTimeout(() => {
            if (timer >= 10) {
                setTimer(0)
            } else {
                setTimer(timer + 1)
            }
        }, 1500);
    }, [timer])

    React.useEffect(() => {
        getAllUserRanks()
            .then((data) => {
                if (!data || data.length < 1) {
                    console.log("Erro ao buscar os dados referentes ao rank")
                    return
                }
                setRank(data)
                console.log(data)
            })
    }, [changed])

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1000} style={styles.img_demo}>
                <Image style={styles.img} source={require("../../../assets/img/ranking.png")} />
            </Animatable.View>

            <View style={styles.content}>
                <ListRanks ranks={rank} />
            </View>
        </View>
    );
};