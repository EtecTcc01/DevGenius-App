import * as React from 'react'
import { styles } from './style';
import { Image, Text, View } from 'react-native';
import { ListNotes } from '../../components/Lists/ListNotes';
import { getAllTeoryByGroup, getAllTeoryByGroupOrdened } from '../../functions/helper.services';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS
import { getChangedState } from '../../functions/async.services';

export function Notes({ route }) {
    const navigation = useNavigation()

    const [courses, setCourses] = React.useState([]);
    const [teory, setTeory] = React.useState([]); //STATE P/ARMAZENAR TEORIAS

    const [changed, setChanged] = React.useState() //STATE P/ARMAZENAR STATE DE MUDANÇA
    const [timer, setTimer] = React.useState(0) //STATE P/ARMAZENAR N. DO TIMER

    // FUNÇÃO TEMPORIZADORA P/COLETA E ATUALIZAÇÃO DE DADOS
    React.useEffect(() => {
        getChangedState()
            .then((res) => {
                if (res !== changed) {
                    setChanged(res)
                }
            })

        setTimeout(() => {
            if (timer >= 10) {
                setTimer(0)
            } else {
                setTimer(timer + 1)
            }
        }, 1500);
    }, [timer])

    //DISPARO DA FUNÇÃO DE FORMA AUTOMATICA E UNICA
    React.useEffect(() => {
        let group = 1
        if (route.params) {
            group = route.params.group.group_id
        }
        //FUNÇÃO P/BUSCAR CURSOS QUE CONTÉM TEORIAS
        getAllTeoryByGroupOrdened(group)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados dos cursos.")
                    return
                }
                console.log(data)
                setCourses(data)
            })
    }, [changed]);

    React.useEffect(() => {
        let group = 1
        if (route.params) {
            group = route.params.group.group_id
        }
        getAllTeoryByGroup(group)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados das teorias do curso.")
                    return
                }
                setTeory(data)
                console.log(data)
            })
    }, [changed])

    function handlerTransfer(e) {
        navigation.navigate("Details", { teory: e })
    }

    return (
        <View style={styles.container}>
            {!route.params && (
                <Animatable.View animation="fadeIn" duration={1000} style={styles.img_demo}>
                    <Image style={styles.img} source={require("../../../assets/img/book-stack.png")} />
                </Animatable.View>
            )}

            <View style={styles.content}>
                <ListNotes handlerOnPress={(e) => handlerTransfer(e)} notes={teory} courses={courses} />
            </View>
        </View>
    );
}
