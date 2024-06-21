import * as React from 'react'
import { Text, TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕESS

export function ListAlts({ alt, selects, tips, remaining, pressing, expanded, expandPress }) {

    //CRIAÇÃO DE MULTIPLOS ELEMENTOS (ALTERNATIVAS)
    const alts = alt.length > 0 ? alt.map((e, index) => {
        return (
            <Animatable.View animation="bounceIn" key={index} delay={100} duration={200 * index}>
                <TouchableOpacity
                    disabled={selects.includes(index) || tips.includes(index) || remaining.includes(index) ? true : false}
                    style={selects.includes(index) || tips.includes(index) || remaining.includes(index) ? [styles.button, { backgroundColor: "#aaaaaa", borderColor: "#aaaaaa" }] : styles.button}
                    onPress={() => pressing(e, index)}>
                    <Text style={selects.includes(index) || tips.includes(index) || remaining.includes(index) ? [styles.title, {color: 'black'}]: styles.title}>{e}</Text>
                </TouchableOpacity>
            </Animatable.View>
        );
    }) : []

    return (
        <Animatable.View style={[styles.container, { height: expanded ? "85%" : "25%" }]}>
            <TouchableOpacity onPress={() => expandPress()} style={{margin: 15}}>
                <Text style={styles.title}>Expand!</Text>
            </TouchableOpacity>
            {expanded ?
                <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={styles.contentScroll}>
                    {alts}
                </ScrollView>
                : <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ height: "auto", width: '100%' }}
                    contentContainerStyle={[styles.contentScroll, { flexWrap: "nowrap" }]}>
                    {alts}
                </ScrollView>
            }
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: '#323329',
        minHeight: 170,
        borderRadius: 30,
        padding: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#06c244",
        textAlign: "center",
    },
    contentScroll: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
        minWidth: "100%",
    },
    button: {
        borderRadius: 100,
        maxWidth: "auto",
        minWidth: 100,
        minHeight: 50,
        height: "auto",
        borderColor: "#06c244",
        borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        padding: 12,
    },
});