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
        minHeight: '100px',
        height: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        borderColor: "#06c244",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderWidth: 5,
    },
    contentA: {
        flex: 1,
        borderColor: "#06c244",
        borderWidth: 5,
        borderRadius: "10px",
        elevation: 10,
        padding: "3%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
    },
    contentB: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        borderColor: "#06c244",
        borderRadius: "10px",
        borderWidth: 5,
        marginTop: "6px",
        width: "100%",
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
        width: "100%",
    },
    button: {
        borderRadius: 100,
        width: "auto",
        minWidth: 80,
        height: 45,
        borderColor: "#06c244",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        margin: 4,
        padding: "2%",
    },
    titleA: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#06c244",
        textAlign: "left",
    },
});