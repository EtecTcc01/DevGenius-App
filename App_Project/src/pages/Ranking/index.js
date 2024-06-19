import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style';

import { ListRanks } from '../../components/Lists/ListRank';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { getAllUserRanks } from '../../functions/helper.services';

export function Ranking({ route }) {

    const [rank, setRank] = React.useState([])

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
    }, [route.params])

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