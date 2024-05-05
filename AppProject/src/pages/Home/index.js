import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Course } from '../../components/Course'; //IMPORT DO COMPONENTE DE CURSOS
import { getCourseByGroup } from '../../functions/helper.services';

export function Home() {
    const [course, setCourse] = React.useState([]);

    React.useEffect(() => {
        getCourseByGroup(1)
            .then((data) => setCourse(data))
    }, [])

    console.log(course)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HOME</Text>
            {!course ? [] : <Course course={course} direction="Action" />}
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