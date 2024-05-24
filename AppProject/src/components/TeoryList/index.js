import * as React from 'react';
import { styles } from './style'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';

export function TeoryList({ item, handlerOnPress }) {
    const navigation = useNavigation(); //TRANSFERENCIA DE FUNÇÕES P/UMA CONSTANTE

    const [teory, setTeory] = React.useState([])

    React.useEffect(() => {
        setTeory(item)
    }, [item])

    const list = teory ? teory.map((e, index) => {
        return (
            <View style={styles.button} key={index} id={index}>
                <TouchableOpacity
                onPress={() => handlerOnPress(e)}
                >
                    <List.Item
                        title={e._teory}
                        titleStyle={styles.title}
                    />
                </TouchableOpacity>
            </View>
        )
    }) : []

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {list}
        </ScrollView>
    );
};