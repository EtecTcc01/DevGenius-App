import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        width: '100%',
    },
    input: {
        margin: 5,
        width: '80%',
        backgroundColor: 'transparent',
    },
    title: {
        color: '#06c244',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btnLogin: {
        marginTop: 10,
        width: '50%',
        bottom: '-20px'
    },
    btnForgot: {
        marginTop: 20,
        color: '#06c244',
        fontSize: 16,
    },
    btnRegister: {
        backgroundColor: '#06c244',
        borderRadius: 30,
        width: '50%',
        height: '6%',
        bottom: '-115px',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%'
    },
});