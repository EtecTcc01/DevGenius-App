import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' },
];

export function DropdownComponent({ handlerChoice }) {
    const [value, setValue] = useState(null);

    return (
        <Dropdown
            itemContainerStyle={{}}
            style={[styles.dropdown, {borderTopLeftRadius: 7, borderTopEndRadius: 7}]}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{ borderBottomStartRadius: 7, borderBottomEndRadius: 7 }}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Escolha seu genêro..."
            value={value}
            onChange={item => {
                setValue(item.value)
                handlerChoice(item.value)
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        margin: 10,
        height: 61.5,
        width: "100%",
        // alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
});