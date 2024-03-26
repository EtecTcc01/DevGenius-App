import * as React from 'react';
import { styles } from './style'
import api from '../../../api';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
// import { ListItem } from '@rneui/themed';

export function DifficultyList(props) {
    const navigation = useNavigation();
    const [difficulty, setDifficulty] = React.useState([]);
    const language = props.lang;

    const getAllDifficulty = async () => {
        try {
            const res = await api.get('/difficulty')
            setDifficulty(res.data.difficulty)
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    React.useEffect(() => {
        getAllDifficulty()
    }, [])

    const listDifficulty = difficulty.map((diff) =>
        <TouchableOpacity style={styles.button} onPress={() => {
            const dataQ = { lang: language, diff: diff }
            navigation.navigate('Activities', { dataQ })
        }}>
            <List.Item style={styles.contentB}
                title={diff._name}
                titleStyle={styles.title}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.titleA}>{language._description}</Text>
            </View>
            <View style={styles.contentA}>
                {listDifficulty}
            </View>
        </View>
    );
}