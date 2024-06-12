import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    centeredView: {
        flex: 1,
        padding: 20,
        width: "100%",
        padding: 20,
        maxWidth: 600,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#663399',
        borderRadius: 20
    },
    modalContent: {
        width: "100%",
        height: '30%',
        minHeight: 270,
        padding: 30,
        backgroundColor: "black",
        borderWidth: 2.5,
        borderRadius: 10,
        borderColor: '#06c244',
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    input: {
        margin: 10,
        width: '100%',
        height: 60,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        width: '100%',
        maxWidth: 900,
    },
    subtitle: {
        fontSize: RFValue(14),
        color: 'white',
        textAlign: "left",
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: "bold",
        color: '#06c244',
        textAlign: "left",
    },
    img_demo: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        minWidth: 110,
        minHeight: 110,
        maxHeight: 210,
        maxWidth: 210,
    }
});