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
    demo: {
        flex: 0.5,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: "center"
    },
    title_demo: {
        textAlign: "center",
        fontSize: RFValue(35),
        color: '#06c244',
        fontFamily: 'sans-serif-thin',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 0.5
    },
    title: {
        textAlign: "left",
        fontSize: RFValue(15),
        color: '#06c244',
        fontFamily: 'sans-serif',
        margin: 15
    },
    content: {
        flex: 1, 
        width: "100%"
    },
});