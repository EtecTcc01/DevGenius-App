import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons'; // Importando o Ionicons

export function TeoryList() {
    const [courses, setCourses] = React.useState([]);
    const [teories, setTeories] = React.useState([]);
    const navigation = useNavigation();

    const getAllLangGroup = async () => {
        try {
            const res = await api.get(`/language/group/1`);
            setCourses(res.data.language);
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
        }
    }

    const getTeoriesByLangAndDiff = async (idLang, idDiff) => {
        try {
            const res = await api.get(`/teories/${idLang}/${idDiff}`);
            setTeories(res.data.teories);
        } catch (error) {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
        }
    }

    React.useEffect(() => {
        getAllLangGroup();
    }, []);

    const handleCoursePress = (course) => {
        getTeoriesByLangAndDiff(course.id_lang, course.id_diff);
    };

    const handleTeoryPress = (teory) => {
        navigation.navigate('TeoryDetail', { teory });
    };

    const listCourses = courses.map((e, index) => (
        <TouchableOpacity
            key={index}
            style={styles.button}
            // onPress={() => handleCoursePress(e)}
        >
            <Ionicons
                size={24}
                color='#06c244'
                name={e.avatar} // supondo que 'avatar' é o nome do ícone
            />
            <Text style={styles.buttonText}>{e._name}</Text>
        </TouchableOpacity>
    ));

    const listTeories = teories.map((teory, index) => (
        <TouchableOpacity
            key={index}
            style={styles.button}
            // onPress={() => handleTeoryPress(teory)}
        >
            <Ionicons
                size={24}
                color='#06c244'
                name={teory.avatar} // supondo que 'avatar' é o nome do ícone
            />
            <Text style={styles.buttonText}>{teory._name}</Text>
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CADERNO TEÓRICO</Text>
            {listCourses}
            {listTeories}
        </View>
    );
}

export default TeoryList;
