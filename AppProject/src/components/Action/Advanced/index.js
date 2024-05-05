import * as React from "react";
import { styles } from "./style";
import api from "../../../../api";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { getAnswerByTask } from "../../../functions/task.services";
import { random } from "../randomizer";

export function AdvancedTask({ task }) {

    const [answer, setAnswer] = React.useState([]);
    const [alt, setAlt] = React.useState([]);
    const [altBkp, setAltBkp] = React.useState([]);
    const [codeTxt, setCodeTxt] = React.useState([]);
    const [subCode, setSubCode] = React.useState([]);

    const [visible, setVisible] = React.useState(false);
    const [first, setFirst] = React.useState(true);
    const [count, setCount] = React.useState(0);

    const [selectedId, setSelectedId] = React.useState([]);
    const [selectedAlt, setSelectedAlt] = React.useState([]);

    const [idCorrect, setIdCorrect] = React.useState([]);

    const [idTip, setIdTip] = React.useState([]);
    const [remainingId, setRemainingId] = React.useState([]);
    const [remainingAlt, setRemainingAlt] = React.useState([]);

    const [visibleModal, setVisibleModal] = React.useState(false);

    const modalSwitch = () => {
        setVisibleModal(!visibleModal)
    }

    React.useEffect(() => {
        if (task != undefined || task != null) {
            getAnswerByTask("advancedAnswer", task._id)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        return
                    }

                    setAnswer(data)
                    console.log(data)
                    splitAnswer({ answerTxt: data._code })
                })
        }
    }, [task])

    const splitAnswer = async ({ answerTxt }) => {
        const splitTxt = answerTxt.split("\n");
        console.log(splitTxt)

        let splitFinal = []; let subFinal = [];
        let controlTxt = [];

        for (let i = 0; i < splitTxt.length; i++) {
            let splitTemp = splitTxt[i].split(" ")
            let splitChar = splitTxt[i].split("")

            let subTxt = []; let subTemp = [];
            let controlT = [];

            splitTemp.forEach(e => {
                if (e.length > 0) {
                    splitFinal.push(e);
                } else {
                    []
                }
            });

            splitChar.forEach(e => {
                if (e !== " ") {
                    subTxt.push(e.replace(e, "_"));
                } else {
                    subTxt.push(e);
                }
            });

            subTxt.forEach(e => {
                if (subTemp.length < 1) {
                    subTemp.push(e)
                } else {
                    subTemp = [subTemp[0] + e];
                }
            });

            subTemp[0].split(" ").forEach(e => {
                if (controlT.length < 1) {
                    controlT = e + "‼‼‼";
                } else {
                    controlT += ` ${e}‼‼‼`
                }
            })

            controlTxt.push(controlT.slice(0, subTemp.length - 3) + "\n")
            subFinal.push(subTemp + "\n")
        }

        setSubCode(controlTxt)
        setCodeTxt(() => {
            const final = []
            for (let i = 0; i < subFinal.length; i++) {
                final.push(`${i}.   ${subFinal[i]}`)
            }
            return final
        })

        randomizer(splitFinal)
    };

    const randomizer = async (alts) => {
        let splitT = [];

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

        const res = await random(splitT)
        console.log(res)

        setAlt(splitT)
        setAltBkp(splitT);
        setVisible(true);
    };

    function altCompare(altList, answerT, idsCorrect) {
        let answerText = []; let ccount = 0;
        let correctlyIds = idCorrect

        idsCorrect.forEach(element => {
            correctlyIds.push(element)
        });

        answerT.forEach((element) => {
            let temp = element.split(" ")
            for (let i = 0; i < temp.length; i++) {
                answerText.push(temp[i])
            }
        })

        if (first == true) {
            for (let i = 0; i < answerText.length; i++) {
                if (answerText[i] == altList[i]) {
                    console.log(true)
                    ccount++
                } else {
                    console.log(false)
                }
            }
        } else {
            let altChoice = []; let altVerify = []

            altList.forEach((element, index) => {
                altChoice.push(element.slice(5, element.length - 1))

                const altsV = altChoice[index].split(" ")
                for (let i = 0; i < altsV.length; i++) {
                    altVerify.push(altsV[i])
                }
            })

            for (let i = 0; i < answerText.length; i++) {
                if (answerText[i] == altVerify[i]) {
                    console.log(true)
                    ccount++
                } else {
                    console.log(false)
                }
            }
        }

        setTimeout(() => {
            if (ccount >= answerText.length) {
                alert("Corretissimo")
            } else {
                alert("Erradissimo")
                setCount(0)
                setRemainingId([])
                setRemainingAlt([])
                setSelectedId(correctlyIds)
            }
        }, 250)
        setFirst(false)

    }

    function firstReplace(e, index) {

        let listId = selectedId
        listId.push(index)
        setSelectedId(listId)

        let altList = selectedAlt
        altList.push(e)
        setSelectedAlt(altList)

        if (listId.length >= altBkp.length) {
            const answerT = answer._code.split("\n")

            let subCount = 0; let subCodeText = subCode;
            let codeTxtTemp = []; let idsCorrect = []

            console.log({ subCodeText })

            codeTxt.forEach((element, index) => {
                codeTxtTemp.push(element.slice(5, element.length - 1))
            })

            answerT.forEach((element, index) => {
                const eSplit = element.split(" ")
                const subCodeT = subCodeText[index].split(" ")
                let ccount = 0; let textTemp = "";
                let subTextTemp = "";

                while (ccount < eSplit.length) {
                    if (altList[subCount] == eSplit[ccount] && subCodeT[ccount].includes("‼")) {
                        if (textTemp.length < 1) {
                            textTemp = `${altList[subCount]}`
                            subTextTemp = `${altList[subCount]}`

                            idsCorrect.push(listId[subCount])
                            // altCorrects.push(altList[subCount])
                        } else {
                            textTemp += ` ${altList[subCount]}`
                            subTextTemp += ` ${altList[subCount]}`

                            idsCorrect.push(listId[subCount])
                            // altCorrects.push(altList[subCount])
                        }
                    } else {
                        if (textTemp.length < 1) {
                            textTemp = `${subCodeT[ccount].includes("‼") == true ? subCodeT[ccount].slice(0, subCodeT[ccount].length - 3) : subCodeT[ccount]}`
                            subTextTemp = `${subCodeT[ccount]}`
                        } else {
                            textTemp += ` ${subCodeT[ccount].includes("‼") == true ? subCodeT[ccount].slice(0, subCodeT[ccount].length - 3) : subCodeT[ccount]}`
                            subTextTemp += ` ${subCodeT[ccount]}`
                        }
                    }

                    ccount++; subCount++;
                }

                codeTxtTemp[index] = `${index}.   ${textTemp.slice(0, textTemp.length)}\n`
                subCodeText[index] = `${subTextTemp}`
            })

            setCodeTxt([codeTxtTemp]); setSubCode(subCodeText)

            altCompare(altList, answerT, idsCorrect)
        }

        setCount(count + 1)
    }

    function replaceTxt(e, altIndex) {

        let idsRemaining = remainingId
        idsRemaining.push(altIndex)
        setRemainingId(idsRemaining)

        let altList = remainingAlt
        altList.push(e)
        setRemainingAlt(altList)

        if ((idsRemaining.length + selectedId.length) >= altBkp.length) {
            const answerT = answer._code.split("\n")

            let subCount = 0; let subTemp = subCode;
            let codeTemp = []; let idsCorrectly = []

            codeTxt.forEach((element, index) => {
                codeTemp.push(element.slice(5, element.length - 1))
            })

            answerT.forEach((element, index) => {
                const answerS = element.split(" ")
                const subCodeTemp = subTemp[index].split(" ")
                let textTemp = ""; let subC = ""

                for (let i = 0; i < answerS.length; i++) {
                    if (subCodeTemp[i].includes("‼")) {
                        if (altList[subCount] == answerS[i]) {
                            if (textTemp.length < 1) {
                                textTemp = `${altList[subCount]}`
                                subC = `${altList[subCount]}`

                                idsCorrectly.push(idsRemaining[subCount])
                                subCount++;
                            } else {
                                textTemp += ` ${altList[subCount]}`
                                subC += ` ${altList[subCount]}`

                                idsCorrectly.push(idsRemaining[subCount])
                                subCount++;
                            }
                        } else {
                            if (textTemp.length < 1) {
                                textTemp = `${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                                subC = `${subCodeTemp[i]}`
                                subCount++
                            } else {
                                textTemp += ` ${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                                subC += ` ${subCodeTemp[i]}`
                                subCount++
                            }
                        }
                    } else {
                        if (textTemp.length < 1) {
                            textTemp = `${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                            subC = `${subCodeTemp[i]}`
                        } else {
                            textTemp += ` ${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                            subC += ` ${subCodeTemp[i]}`
                        }
                    }
                }
                codeTemp[index] = `${index}.   ${textTemp.slice(0, textTemp.length)}\n`
                subTemp[index] = `${subC}`

            })

            setCodeTxt([codeTemp]); setSubCode(subTemp)
            altCompare(codeTemp, answerT, idsCorrectly)
        }
        setCount((count + 1))
    }

    function reloadT() {
        setCount(0)
        setRemainingId([])
        setRemainingAlt([])
        setSelectedId(idCorrect)
    }

    // function nRandom() {
    //FUNÇÃO P/DISPONIBILIZAR A DICA
    // }

    const listAlts = alt.length > 0 ? alt.map((e, index) => {
        return (
            <TouchableOpacity
                style={selectedId.includes(index) || remainingId.includes(index) ? [styles.button, { borderColor: "#aaaaaa" }] : styles.button}
                id={index}
                name={index}
                key={index}
                disabled={selectedId.includes(index) || remainingId.includes(index) ? true : false}
                onPress={() => {
                    first == true ? firstReplace(e, index) : replaceTxt(e, index)
                }}>
                <Text style={styles.title}>{e}</Text>
            </TouchableOpacity>
        )
    }) : []

    const text = codeTxt.length > 0 ? codeTxt.map((e, index) => {
        return (
            <View id={index} name={index} key={index} style={{ margin: '5px' }}>
                <Text style={styles.titleA}>{e}</Text>
            </View>
        )
    }) : []

    if (visible == true) {

        return (
            <PaperProvider>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.contentBtn}>
                            <Portal>
                                <Modal visible={visibleModal}
                                    onDismiss={modalSwitch}
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
                            // onPress={nRandom}
                            >
                                <MaterialCommunityIcons
                                    name="lightbulb-on-outline"
                                    size={24}
                                    color="#06c244"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={modalSwitch}>
                                <AntDesign
                                    name="questioncircleo"
                                    size={24}
                                    color="#06c244"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn}
                                disabled={first == true ? true : false}
                                onPress={reloadT}
                            >
                                <Ionicons
                                    size={24}
                                    color={first == true ? "#aaaaaa" : "#06c244"}
                                    name="reload"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contentText}>
                            {text}
                        </View>

                    </View>
                    <View style={styles.contentB}>
                        <ScrollView contentContainerStyle={styles.contentScroll}>{listAlts}</ScrollView>
                    </View>
                </View>
            </PaperProvider>
        );
    } else {
        [];
    }
}