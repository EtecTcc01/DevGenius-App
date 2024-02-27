import { View, Text } from 'react-native';
import { styles } from './style'
import * as React from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';

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
        <ListItem containerStyle={styles.button} bottomDivider={true} onPress={() => {
            const dataQ = { lang: language, diff: diff }
            navigation.navigate('Activities', { dataQ })
        }}>
            <ListItem.Content style={styles.contentC}>
                <ListItem.Title style={styles.title}>{diff._name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>

    )

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.titleB}>{language._description}</Text>
            </View>
            <View style={styles.contentB}>
                {listDifficulty}
            </View>
        </View>
    );
}