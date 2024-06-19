import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#000', //verde claro
        justifyContent: 'center',
        alignItems: "center",
        maxHeight: 600,
        maxWidth: 600
    },
    remaining: {
        flex: 0.2,
        width: '100%',
        flexDirection: 'columnn',
        alignItems: "center",
        justifyContent: "center",
    },
    statistics: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    hearts: {
        width: "100%",
        height: 'auto',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: RFValue(20),
        color: '#06c244', // verde "médio"
        fontFamily: "sans-serif-condensed",
        margin: 10,
    },
    totals: {
        width: '100%',
        height: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    congratulations: {
        flex: 0.2,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
});