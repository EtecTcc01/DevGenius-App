import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api';
import { styles } from './style';

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
            style={styles.button} // Aplicando o estilo ao TouchableOpacity
            onPress={() => handleCoursePress(e)}
        >
            <Text style={styles.buttonText}>{e._name}</Text> {/* Aplicando o estilo ao Text */}
        </TouchableOpacity>
    ));

    const listTeories = teories.map((teory, index) => (
        <TouchableOpacity
            key={index}
            style={styles.teoryButton} // Aplicando o estilo ao TouchableOpacity
            onPress={() => handleTeoryPress(teory)}
        >
            <Text style={styles.teoryButtonText}>{teory._name}</Text> {/* Aplicando o estilo ao Text */}
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container}> {/* Aplicando o estilo ao View */}
            <Text style={styles.title}>CADERNO TEÓRICO</Text> {/* Aplicando o estilo ao Text */}
            {listCourses}
            {listTeories}
        </View>
    );
}

export default TeoryList;
