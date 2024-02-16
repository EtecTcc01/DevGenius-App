import { StyleSheet, ScrollView } from 'react-native';
import * as React from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';

export function Activities(props,) {
    const navigation = useNavigation();

    const [activities, setActivities] = React.useState([]);

    const difficulty = props.diff;
    const language = props.lang

    const getTask = async () => {
        try {
            const res = await api.get(`/task/un/${language.id}/${difficulty.id}`)
            setActivities(res.data.task);
            console.log(res.data.task)
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    React.useEffect(() => {
        getTask()
    }, [setActivities])


    const listActivities = activities.map((act) =>
        <ListItem containerStyle={styles.content} bottomDivider={true} onPress={async () => {
            if (difficulty._name == "Básico") {
                navigation.navigate('BasicAct', { act })
                return
            } else if (difficulty._name == "Intermediário") {
                navigation.navigate('IntermediaryAct', { act })
                return
            }

            navigation.navigate('AdvancedAct', { act })
        }
        }>
            <ListItem.Content style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#06c244' }}>
                <ListItem.Title style={styles.title}>{act._name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {listActivities}
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
        maxWidth: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});