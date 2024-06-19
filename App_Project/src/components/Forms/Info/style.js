import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: RFValue(20),
        fontFamily: 'sans-serif',
        color: '#000',
        fontWeight: 'bold',
        margin: 10
    },
    input: {
        margin: 5,
        height: 60,
        width: '100%',
        backgroundColor: '#000',
    },
    button: {
        marginTop: 20,
        width: '80%',
        color: 'white',
        backgroundColor: '#000',
    },
    label: { 
        color: '#06c244', 
        fontWeight: 'bold', 
        fontSize: RFValue(11)
    },
});