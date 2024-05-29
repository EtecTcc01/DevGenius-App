import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    title: {
        fontSize: RFValue(17.8),
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center'
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: '#fff',
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderColor: '#06c244',
        borderWidth: 3,
        width: '95%',
        maxWidth: 600,
        margin: 10,
        padding: 10,
    },
    logo: {
        minWidth: 100,
        minHeight: 70,
        maxWidth: 210,
        maxHeight: 180
    }
});