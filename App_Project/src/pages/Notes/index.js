import * as React from 'react'
import { styles } from './style';
import { Image, Text, View } from 'react-native';
import { ListNotes } from '../../components/Lists/ListNotes';
import { getAllTeoryByGroup, getAllTeoryByGroupOrdened } from '../../functions/helper.services';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function Notes() {
    const navigation = useNavigation()

    const [courses, setCourses] = React.useState([]);
    const [teory, setTeory] = React.useState([]); //STATE P/ARMAZENAR TEORIAS

    //DISPARO DA FUNÇÃO DE FORMA AUTOMATICA E UNICA
    React.useEffect(() => {
        //FUNÇÃO P/BUSCAR CURSOS QUE CONTÉM TEORIAS
        getAllTeoryByGroupOrdened(1)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados dos cursos.")
                    return
                }
                console.log(data)
                setCourses(data)
            })
    }, []);

    React.useEffect(() => {
        getAllTeoryByGroup(1)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados das teorias do curso.")
                    return
                }
                setTeory(data)
                console.log(data)
            })
    }, [])

    function handlerTransfer(e) {
        navigation.navigate("Details", { teory: e })
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1000} style={styles.img_demo}>
                <Image style={styles.img} source={require("../../../assets/img/book-stack.png")} />
            </Animatable.View>

            <View style={styles.content}>
                <ListNotes handlerOnPress={(e) => handlerTransfer(e)} notes={teory} courses={courses} />
            </View>
        </View>
    );
}
