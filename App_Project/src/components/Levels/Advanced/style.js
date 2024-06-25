import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingHorizontal: 15,
        paddingTop: 10,
        maxWidth: 700,
    },
    content_utils: {
        flex: 0.3,
        minHeight: 10,
        width: "100%"
    },
    content_text: {
        padding: 20,
        minWidth: "100%",
        alignItems: "center"
    },
    btn: {
        margin: 3,
    },
    task_content: {
        flex: 1,
        borderColor: "#06c244",
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    content_alts: {
        flex: 2,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'flex-end',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 6,
        padding: 10,
    },
    title: {
        fontSize: RFValue(12),
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
    contentHScroll: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: "#465C46",
    },
    titleA: {
        fontSize: RFValue(11.5),
        fontFamily: "monospace",
        color: "#06c244",
        textAlign: "left",
        width: '100%',
        height: "auto",
    },
});