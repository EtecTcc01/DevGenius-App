import * as React from 'react'
import { Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export function AltList({ alt, selects, tips, remaining, pressing }) {
    //CRIAÇÃO DE MULTIPLOS ELEMENTOS (ALTERNATIVAS)
    const alts = alt.length > 0 ? alt.map((e, index) => {
        return (
            <TouchableOpacity key={index} id={index}
                disabled={selects.includes(index) || tips.includes(index) || remaining.includes(index) ? true : false}
                style={selects.includes(index) || tips.includes(index) || remaining.includes(index) ? [styles.button, { borderColor: "#aaaaaa" }] : styles.button}
                onPress={() => pressing(e, index)}>
                <Text style={styles.title}>{e}</Text>
            </TouchableOpacity>
        );
    }) : []

    return (
        <ScrollView contentContainerStyle={styles.contentScroll}>{alts}</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#06c244",
        textAlign: "center",
    },
    contentScroll: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        minWidth: "100%",
    },
    button: {
        borderRadius: 100,
        maxWidth: "auto",
        minWidth: 90,
        height: 45,
        borderColor: "#06c244",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        margin: "1%",
        padding: "3%",
    },
});