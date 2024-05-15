import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    contentText: {
        width: '100%',
        textAlign: 'left',
        top: '35%',
    },
    btn: {
        margin: '3px',
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
    contentBtn: {
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        backgroundColor: "#000", // Fundo preto
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#06c244', // Letra verde
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#06c244', // Botão verde
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: '#000', // Letra preta
        fontWeight: 'bold',
        textAlign: 'center',
    }
});