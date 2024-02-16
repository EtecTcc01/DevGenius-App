import { StyleSheet, ScrollView } from 'react-native';
import * as React from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';

export function DifficultyColumn(props) {
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
        <ListItem containerStyle={styles.content} bottomDivider={true} onPress={() => {
                const dataQ = {lang: language, diff: diff}
                navigation.navigate('Activities', {dataQ})
            }}>
          <ListItem.Content style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <ListItem.Title style={styles.title}>{diff._name}</ListItem.Title>
          </ListItem.Content>
      </ListItem>

    )

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {listDifficulty}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: '5%',
        width: '100%',
        marginTop: '5%'
    },
    content: {
        width: '100%',
        padding: '4%',
        margin: '2%',
        backgroundColor: '#06c244',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});