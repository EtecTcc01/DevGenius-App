import { Text, View } from 'react-native';
import { styles } from './style';
import * as React from 'react'
import api from '../../../../api';

export function TeoryBTask(props) {
    const dataTeoryB = props.data;
    console.log(dataTeoryB)
    const [teory, setTeory] = React.useState([]);

    const getTeory = async () => {
        try {
            const res = await api.get(`/teory/un/${dataTeoryB.id_teory}`)
            setTeory(res.data.teory[0]);
            console.log(res.data.teory)
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    React.useEffect(() => {
        getTeory()
    }, [setTeory])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Teoria: {teory._name}</Text>
            </View>
            <View style={styles.contentB}>
                <Text style={styles.title}>{teory.teory_text}</Text>
            </View>
        </View>
    );
}
