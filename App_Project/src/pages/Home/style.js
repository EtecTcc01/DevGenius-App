import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    demo: {
        flex: 0.1,
        minHeight: 70,
        justifyContent: 'center',
        alignItems: "center",
    },
    title_demo: {
        textAlign: "center",
        fontSize: RFValue(35),
        fontWeight: 'bold',
        color: '#06c244',
        fontFamily: 'sans-serif-thin',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#06c244',
        borderWidth: 1
    },
    title: {
        textAlign: "left",
        fontSize: RFValue(15),
        color: '#06c244',
        fontWeight: "bold",
        fontFamily: 'sans-serif',
        margin: 15,
    },
    content: {
        flex: 1, 
        width: "100%"
    },
});