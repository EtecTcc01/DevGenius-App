import * as React from "react";
import { styles } from "./style";
import api from "../../../../api";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Modal, Portal, PaperProvider } from 'react-native-paper';

export function IntermediaryTask(props) {
    const dataT = props.data;

    const [visibleModal, setVisibleModal] = React.useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const [count, setCount] = React.useState(0);
    const [taskT, setTaskT] = React.useState(dataT.task_text);
    const [answer, setAnswer] = React.useState([]);
    const [alt, setAlt] = React.useState();
    const [altBkp, setAltBkp] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const [choice, setChoice] = React.useState([]);

    const [selectedId, setSelectedId] = React.useState([]);
    const [idTip, setIdTip] = React.useState([]);

    const getAnswer = async () => {
        try {
            const res = await api.get(`/intermediaryAnswer/unTask/${dataT.id}`);
            setAnswer(res.data.answer[0]);
        } catch (error) {
            alert(`Erro ao pegar os dados da resposta. ${error}`);
        }
    };

    React.useEffect(() => {
        getAnswer();
    }, []);

    const random = () => {
        const alts = [
            answer.answer_text,
            answer.alternativeA,
            answer.alternativeB,
            answer.alternativeC,
            answer.alternativeD,
            answer.alternativeE,
        ];
        const splitT = [];

        for (let i = alts.length - 1; i > -1; i--) {
            let temp = alts[i];
            try {
                let tempI = temp.split(" ");

                if (tempI.length > 1) {
                    for (let i = tempI.length - 1; i > -1; i--) {
                        splitT.push(tempI[i]);
                    }
                } else {
                    splitT.push(temp);
                }
            } catch {
                [];
            }
        }

        for (let i = splitT.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));

            [splitT[i], splitT[random]] = [splitT[random], splitT[i]];
        }

        setAlt(splitT);
        setAltBkp(splitT);
        setVisible(true);
    };

    React.useEffect(() => {
        random();
    }, [answer]);

    function reloadT() {
        setCount(0);
        setAlt(altBkp);
        setTaskT(dataT.task_text);
        setChoice([])
        setSelectedId([])
    }

    function altCompare(answerC) {
        setCount(0);; let ccount = 0;
        let temp = taskT

        for (let i = 0; i < answerC.length; i++) {
            if (choice[i] == answerC[i]) {
                ccount++;
            } else {
                break
            }
        }

        if (ccount >= answerC.length) {
            choice.forEach(e => {
                temp = temp.replace("‼", e)
            });
            setTaskT(temp)
            setTimeout(() => {
                alert("Acertou!!!");
            }, 500);
        } else {
            alert("Errouuuuuu!");
            setTaskT(dataT.task_text);
            setAlt(altBkp);
            setChoice([]);
            setSelectedId([])
        }
    }

    async function handlePress(e) {
        // setSelectedId(index)
        // const altIndex = alt.findIndex((value, index, array) => { return value == e })
        // const remove = alt.toSpliced(altIndex, 1)
        // setAlt(remove);

        const list = choice;
        list.push(e); setChoice(list)

        const answerC = answer.answer_text.split(" ");
        setCount(count + 1);


        if (count >= answerC.length - 1) {
            setTimeout(() => {
                altCompare(answerC)
            }, 250);
        }
    }

    if (visible == true) {

        const alts = () => alt.map((e, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    disabled={selectedId.includes(index) || idTip.includes(index) ? true : false}
                    style={selectedId.includes(index) || idTip.includes(index) ? [styles.button, {borderColor: "#aaaaaa"}] : styles.button}
                    onPress={() => {
                        handlePress(e, index)
                        setSelectedId(() => {
                            let test = selectedId
                            test.push(index)
                            return test
                        })
                    }}>
                    <Text style={styles.title}>{e}</Text>
                </TouchableOpacity>
            );
        });


        const altRemoved = () => choice.map((e) => {
            try {
                return (
                    <TouchableOpacity style={styles.button} onPress={() => replaceTxt(e)}>
                        <Text style={styles.title}>{e}</Text>
                    </TouchableOpacity>
                );
            } catch { [] }
        })

        const nRandom = () => {
            let answerTip = answer.answer_text.split(" ")
            let positions = []

            answerTip.forEach(e => {
                positions.push(alt.indexOf(e))
            })

            let primaryT = []; let secondT = []
            let tipFinal = []; let ccount = 1

            while (ccount <= 2) {
                if (tipFinal.length < 1) {
                    primaryT = Math.floor(Math.random() * alt.length)

                    if (positions.includes(primaryT)) {
                        primaryT = Math.floor(Math.random() * alt.length)
                    } else {
                        tipFinal.push(primaryT)
                        ccount++;
                    }
                } else {
                    secondT = Math.floor(Math.random() * alt.length)

                    if (tipFinal.includes(secondT) || positions.includes(secondT)) {
                        secondT = Math.floor(Math.random() * alt.length)
                    } else {
                        tipFinal.push(secondT)
                        ccount++
                    }
                }
                console.log(tipFinal)
            }

            setIdTip(tipFinal);
        }

        return (
            <PaperProvider>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.contentBtn}>
                            <Portal>
                                <Modal
                                    visible={visibleModal}
                                    onDismiss={hideModal}
                                    dismissable="true"
                                    dismissableBackButton="true"
                                    contentContainerStyle={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        padding: 20,
                                        width: '90%',
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center'
                                    }}>
                                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                                </Modal>
                            </Portal>

                            <TouchableOpacity style={styles.btn}
                                disabled={idTip.length > 0 ? true : false}
                                onPress={nRandom}>
                                <MaterialCommunityIcons
                                    name="lightbulb-on-outline"
                                    size={24}
                                    color="#06c244"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={showModal}>
                                <AntDesign
                                    name="questioncircleo"
                                    size={24}
                                    color="#06c244"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={reloadT}>
                                <Ionicons
                                    size={24}
                                    color="#06c244"
                                    name="reload"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentText}>
                            <Text style={styles.titleA}>{taskT}</Text>
                        </View>
                    </View>
                    <View style={styles.contentA}>
                        <ScrollView contentContainerStyle={styles.contentScroll}>{altRemoved()}</ScrollView>
                    </View>
                    <View style={styles.contentB}>
                        <ScrollView contentContainerStyle={styles.contentScroll}>{alts()}</ScrollView>
                    </View>
                </View>
            </PaperProvider>
        );
    } else {
        [];
    }
}