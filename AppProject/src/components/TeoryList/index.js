import * as React from 'react'
import { styles } from './style';
import api from '../../../api';
import { Text, View, TouchableOpacity } from 'react-native';

export function TeoryList() {

    const [courses, setCourses] = React.useState([]);

    const getAllLangGroup = async () => {
        try {
            const res = await api.get(`/language/group/1`)
            setCourses(res.data.language)
            console.log(res.data.language)
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        }
    }

    React.useEffect(() => {
        getAllLangGroup()
    }, [])

    const listCourses = courses.map((e) =>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{e._name}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CADERNO TEÓRICO</Text>
            {listCourses}
        </View>
    );
};

export default TeoryList;