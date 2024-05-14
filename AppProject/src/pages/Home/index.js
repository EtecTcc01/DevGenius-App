import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Course } from '../../components/Course'; //IMPORT DO COMPONENTE DE CURSOS
import { getCourseByGroup } from '../../functions/helper.services';

export function Home() {
    const [course, setCourse] = React.useState([]); //STATE P/ARMAZENAR OS CURSOS DA PAG. MAIN

    //FUNÇÃO P/BUSCAR OS CURSOS DO 1° GRUPO (PUBLICO) 
    React.useEffect(() => {
        getCourseByGroup(1)
            .then((data) => setCourse(data))
    }, [])

    console.log(course)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HOME</Text>
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