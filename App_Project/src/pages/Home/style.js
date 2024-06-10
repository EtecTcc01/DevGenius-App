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
    // logo: {
    //     flex: 0.5,
    //     minHeight: 50,
    //     justifyContent: 'center',
    //     alignItems: "center",
    //     width: '125px',
    //     height: '15px',
    // },
    title: {
        textAlign: "left",
        fontSize: RFValue(15),
        color: '#06c244',
        fontWeight: "bold",
        fontFamily: 'sans-serif',
        margin: 15,
        textAlign: 'center'
    },
    content: {
        flex: 1, 
        width: "100%"
    },
});