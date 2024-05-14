import React, { useState, useEffect } from 'react';
import { styles } from './style'
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown'; //IMPORT DO COMPONENT USADO
// import AntDesign from '@expo/vector-icons/AntDesign'; //IMPORT DOS ICONS USADOS (EXPO)
import { getAllTeoryByCourse } from '../../functions/helper.services'; //IMPORT DE UMA FUNÇÃO EXTERNA

export function TeoryList({ container }) {
    const navigation = useNavigation(); //TRANSFERENCIA DE FUNÇÕES P/UMA CONSTANTE

    const [value, setValue] = useState(null); //STATE USADO P/ARMAZENAR ITEM ESCOLHIDO
    const [isFocus, setIsFocus] = useState(false); //STATE UTILIZADO P/VERIFICAR FOCO DO USUÁRIO

    const [teory, setTeory] = useState([]); //STATE P/ARMAZENAR TEORIAS
    const [displayT, setDisplayT] = useState([]); //STATE P/EXIBIÇÃO DOS ITENS

    useEffect(() => {
        if (value != null) {
            let data = []

            teory.map((element, index) => {
                if (element.id_teory === value && element != undefined) {
                    data.push(element)
                }
            });

            navigation.navigate("TeoryDetail", { teory: data })
        }
    }, [value])

    //FUNÇÃO P/BUSCAR TEORIAS PELO ID DO CURSO
    useEffect(() => {
        getAllTeoryByCourse(container.id_course)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao buscar dados das teoria do grupo.")
                    return
                }
                setTeory(data)
                dataDisplay(data)
            })
    }, [container])

    //FUNÇÃO P/SEPARAR VALORES USADOS NA EXIBIÇÃO
    function dataDisplay(content) {
        let dataDisplay = []

        content.map((e, index) => {
            dataDisplay.push({
                label: e._teory,
                value: e.id_teory,
                course: e._course
            })
        })

        setDisplayT(dataDisplay)
    }

    //FUNÇÃO P/RENDERIZAR UM TEXTO QUANDO EM FOCO
    const renderLabel = () => {
        return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                {container._course}
            </Text>
        );
    };

    return (
        <>
            {teory.length > 0 ? <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={displayT}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Escolha a Teoria...'}
                    // searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                // renderLeftIcon={() => (
                //     <AntDesign
                //         style={styles.icon}
                //         color={isFocus ? 'blue' : 'black'}
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                />
            </View> : <> </>
            }
        </>
    );
};