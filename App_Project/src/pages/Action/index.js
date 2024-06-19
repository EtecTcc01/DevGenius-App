import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import { Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse, progressUpdate, lifesUpdate, phaseUpdate, pointsUpdate } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

// IMPORT DOS COMPONENTE USADOS
import { BasicAct } from '../../components/Levels/Basic';
import { IntermediaryAct } from '../../components/Levels/Intermediary';
import { AdvancedAct } from '../../components/Levels/Advanced';
import { Details } from '../Details';
import { FinalStatistics } from '../../components/FinalStatistics';

export function Action({ route }) {
    const navigation = useNavigation()

    const [course, setCourse] = React.useState({})
    const [registration, setRegistration] = React.useState({})
    const [stageContent, setStageContent] = React.useState([]) //STATE P/ARMAZENAR TEORIAS/TASKS DO ESTAGIO
    const [stage, setStage] = React.useState([]) //STATE P/ARMAZENAR ESTAGIOS DO CURSO

    const [first, setFirst] = React.useState(true)
    const [actual, setActual] = React.useState(true)

    const [transition, setTransition] = React.useState(false)
    const [lost, setLost] = React.useState(false)
    const [type, setType] = React.useState("heart")

    const [lifes, setLifes] = React.useState(0)
    const [points, setPoints] = React.useState(0) //STATE P/ARMAZENAR PONTOS (CORRETOS)
    const [phase, setPhase] = React.useState(0) //STATE P/ARMAZENAR "FASES" DO ESTAGIO ATUAL


    React.useEffect(() => {
        const data = route.params
        setRegistration(data.registration[0])
        console.log({ reg: data.registration[0] })
        setCourse(data.course)

        if (data.stage) {
            setStage(data.stage)
            getTeoryData(data.stage._id)

            if (data.registration[0].level_stage !== data.stage.index) {
                setPhase(0)
                setActual(false)
            } else {
                setPhase(data.registration[0]._phase)
            }

        } else {
            setPhase(data.registration[0]._phase)
            getStagesByCourse(data.course.id_course)
                .then((stages) => {
                    if (!stages) {
                        console.log("Erro ao buscar dados relacionados aos estagios.")
                        return
                    }

                    setStage(stages)
                    getTeoryData(stages[data.registration[0].level_stage]._id)
                    setLifes(data.registration[0]._lifes)
                    setPoints(data.registration[0]._points)
                })
        }
    }, [route.params])

    React.useEffect(() => {
        if (registration._lifes && first === false && actual === true) {
            const progress = {
                lifes: lifes,
                registrationId: registration.id_registration
            }

            lifesUpdate(progress)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao atualizar os dados")
                        return
                    }

                    setRegistration(data[0])
                })

        }
    }, [lifes])

    React.useEffect(() => {
        try {
            if (phase >= stageContent.length && stageContent.length > 0 && actual === true) {
                const lvl = registration.level_stage + 1
                
                const progress = {
                    stageLvl: lvl,
                    // userLevel, totalExp, userId
                    registrationId: registration.id_registration
                }

                // progressUpdate(progress)
                //     .then((data) => {
                //         if (!data) {
                //             console.log("Erro ao atualizar os dados")
                //             return
                //         }
                //         setRegistration(data[0])
                //     })

                return
            }

            if (registration._points >= 0 && first === false && actual === true) {
                const progress = {
                    points: points,
                    registrationId: registration.id_registration
                }

                console.log({ progress })

                pointsUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }

                        setRegistration(data[0])
                    })

            }
        } catch { [] }
    }, [points])

    //FUNÇÃO P/ATUALIZAR O LEVEL DE ESTAGIO DO USUÁRIO NO CURSO
    React.useEffect(() => {
        try {
            if (phase >= stageContent.length && stageContent.length > 0 && actual === true) {
                const lvl = registration.level_stage + 1
                const progress = {
                    stageLvl: lvl,
                    registrationId: registration.id_registration
                }

                progressUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }
                        setRegistration(data[0])
                    })

                return
            }

            if (phase > 0 && first === false && actual === true) {
                const progress = {
                    phase: phase,
                    registrationId: registration.id_registration
                }

                phaseUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }
                        setRegistration(data[0])
                    })
            }
        } catch {
            []
        }
    }, [phase])

    //FUNÇÃO P/TEORIAS POR ESTAGIO
    const getTeoryData = (stageId) => {
        let content = []

        getTeoryByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Teoria Inexistente...")
                    getTaskData(stageId, content)
                    return
                }

                data.forEach(element => {
                    content.push(element)
                });

                getTaskData(stageId, content)
            })
    }

    //FUNÇÃO P/RECARREGAR PAG.
    function reload() {
        setStageContent([])
        setStage({})
        setPhase(0)
        setPoints(0)
        // setChanged(false)
    }

    //FUNÇÃO P/TASKS POR ESTAGIO
    const getTaskData = (stageId, content) => {
        let stageC = content

        getTaskByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao bucar dados referentes à task OU task inexistente (?)")
                } else {
                    data.forEach(element => {
                        stageC.push(element)
                    });
                }

                setStageContent(stageC)
                // console.log({ stc: stageC })
            })
    }

    function onPressing(state, shield) {
        shield === true ? setType("shield") : []

        if (state === 1) {
            setPoints(points + 1)
            setPhase(phase + 1)
            setTransition(true)
        } else if (state === 3) {
            setLost(true)
            setTimeout(() => {
                setLost(false)
                if (actual === true) {
                    setType("heart")
                    shield === true ? [] : setLifes(lifes - 1)
                }
            }, 2000);
        } else if (state === 4) {
            setPhase(phase + 1)
        }

        setFirst(false)
    }

    React.useEffect(() => {
        if (transition === true) {
            setTimeout(() => {
                setTransition(false)
            }, 2000);
        }
    }, [transition])

    //CRIAÇÃO DE ELEMENTOS COM SEU RESPECTIVO "TIPO" (?)
    const listContent = stageContent.length > 0 ? stageContent.map((e, i) => {
        switch (e.id_operation) {
            case 1:
                return (
                    <BasicAct _lifes={actual === true ? lifes : -1} task={e} press={(e) => onPressing(e, false)} />
                )
            case 2:
                return (
                    <IntermediaryAct _lifes={actual === true ? lifes : -1} task={e} press={(e) => onPressing(e, false)} />
                )
            case 3:
                return (
                    <AdvancedAct _lifes={actual === true ? lifes : -1} task={e} press={(e, shield) => onPressing(e, shield)} />
                )
        }
        if (!e.id_operation) {
            return (
                <View key={i} style={{ flex: 1, flexDirection: 'column', padding: 15 }}>
                    <Details data={e} />
                    <Button style={{ height: "auto", width: "90%", alignSelf: 'center', marginTop: 20 }} onPress={() => onPressing(4, "false")} mode='contained'>Avançar</Button>
                </View>
            )
        }
    }) : []

    function qtdCount() {
        let temp = 0

        stageContent.map((e, i) => {
            if (e.id_operation) {
                temp += 1
            }
        })

        return temp
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {listContent.length > 0 && transition === false && phase < stageContent.length ?
                    <Animatable.View animation="fadeIn" duration={1000} delay={500}>
                        {listContent[phase]}
                    </Animatable.View>
                    : <></>}

                {phase >= stageContent.length && stageContent.length > 0 && transition === false && (
                    <View style={{ flex: 1, width: '100%' }}>
                        <View style={styles.final}>
                            <FinalStatistics state={actual} qtdTask={stageContent.length > 0 ? qtdCount() : 0} _lifes={actual === true ? lifes : 0} _points={points} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button style={styles.button} onPress={() => navigation.navigate("Stages", { course: course, registration: registration })} mode='contained'>Estágios</Button>
                            <Button style={styles.button} onPress={() => navigation.navigate("Tabs", { changed: true })} mode='contained'>Home</Button>
                        </View>
                    </View>
                )}

                {lost === true && transition === false && (
                    <Animatable.View animation='bounceIn' style={styles.broken}>
                        {type === "heart" ? <>
                            <FontAwesome5
                                name="heart-broken"
                                size={160}
                                color='#06c244'
                            />
                            <Text style={styles.txt}> {actual === true && lifes > 0 ? "-1" : "No Lifes"}</Text>
                        </> : <>
                            <Feather
                                name="shield-off"
                                size={160}
                                color='#06c244'
                            />
                            <Text style={styles.txt}> {actual === true && lifes > 0 ? "Shield Break" : "No Shield"}</Text>
                        </>}
                    </Animatable.View>
                )}

                {transition === true && (
                    <Animatable.View animation="bounceIn" style={styles.gain}>
                        <MaterialCommunityIcons
                            name="cards-diamond-outline"
                            size={160}
                            color="#06c244"
                        />
                        <Text style={styles.txt}> {actual === true && lifes > 0 ? "+1" : "No Points"} </Text>
                    </Animatable.View>
                )}
            </View>
        </View>
    );
}