import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    contentBtn: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    space: {
        width: "30%",
        height: "auto",
        justifyContent: 'center',
    },
    contentImg: {
        flex: 1,
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        margin: 3,
    },
    img: {
        width: 24,
        height: 24,
        margin: 3
    },
    txt: {
        color: "#06c244",
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: "sans-serif-condensed",
        fontSize: RFValue(16),
        fontWeight: 'bold'
    }
});