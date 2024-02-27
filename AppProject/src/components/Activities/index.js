import { View } from 'react-native';
import { styles } from './style';
import * as React from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';

export function Activities(props) {
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
        <ListItem containerStyle={styles.button} bottomDivider={true} onPress={async () => {
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
            <ListItem.Content style={styles.contentB}>
                <ListItem.Title style={styles.title}>{act._name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>
            {listActivities}
        </View>
    );
}