import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    content: {
        flex: 2,
        borderColor: "#06c244",
        borderWidth: 5,
        borderRadius: 10,
        elevation: 10,
        padding: "3%",
        width: "100%",
    },
    contentA: {
        flex: 1,
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        borderColor: "#06c244",
        borderRadius: "10px",
        borderWidth: 5,
        marginTop: "6px",
        width: "100%",
    },
    contentB: {
        flex: 2,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        borderColor: "#06c244",
        borderRadius: "10px",
        borderWidth: 5,
        marginTop: "6px",
        width: "100%",
    },
    contentText: {
        alignSelf: 'center',
        top: '38%'
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
    contentBtn: {
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    btn: {
        margin: '3px',
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#06c244",
        textAlign: "center",
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
    titleA: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#06c244",
        textAlign: "left",
    },
});