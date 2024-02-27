import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    content: {
        flex: 2,
        width: '100%',
        borderColor: '#06c244',
        borderRadius: '10px',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '8px'
    },
    contentB: {
        flex: 1,
        borderColor: '#06c244',
        borderWidth: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        elevation: 10,
        padding: '3%'
    },
    button: {
        width: '90%',
        padding: '4%',
        margin: '2%',
        borderColor: '#06c244',
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center',
    }
});