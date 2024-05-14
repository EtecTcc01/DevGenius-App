import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

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
            <Card>
                <Card.Title title="HTML" subtitle="HTML é uma linguagem de marcação" />
                <Card.Cover source={{ uri: 'https://cdn.dribbble.com/users/783/screenshots/104300/shot_1295820312.gif' }} />
                <Card.Actions>
                <Button>Voltar</Button>
                <Button>Iniciar</Button>
                </Card.Actions>
            </Card>

            <Card>
                <Card.Title title="CSS" subtitle="CSS é usado para estilizar elementos escritos em HTML " />
                <Card.Cover source={{ uri: 'https://www.codespot.org/assets/css.jpg' }} />
                <Card.Actions>
                <Button>Voltar</Button>
                <Button>Iniciar</Button>
                </Card.Actions>
            </Card>
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

export default Home;