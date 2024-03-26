import * as React from 'react';
import { styles } from './style';
import api from '../../../api';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
// import { ListItem } from '@rneui/themed';

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
    }, [])


    const listActivities = activities.map((act) =>
        <TouchableOpacity style={styles.button} onPress={async () => {
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
            <List.Item style={styles.content}
                title={act._name}
                titleStyle={styles.title}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {listActivities}
        </View>
    );
}