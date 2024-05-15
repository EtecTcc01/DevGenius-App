import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Course } from '../../../components/Course'; //IMPORT DE COMPONENTES USADOS
import { getCourseByGroup } from '../../../functions/helper.services'; //IMPORT DE FUNÇÃO EXTERNA

export function GroupCourses({ route }) {

    const group = route.params.group
    console.log(route.params.group)

    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DO GRUPO

    React.useEffect(() => {
        getCourseByGroup(group.group_id)
            .then((data) => setCourse(data))
    }, [group])

    return (
        <View style={styles.container}>
            {!course ? [] : <Course course={course} direction="Action" operation="modal" />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        color: '#06c244',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
});