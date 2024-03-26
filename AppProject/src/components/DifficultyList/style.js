import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: '5%',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        width: '96%',
        padding: '5%',
        margin: '2%',
        height: '15%',
        backgroundColor: '#06c244',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 24,
    },
    contentA: {
        flex: 2,
        backgroundColor: '#000',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
    },
    contentB: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    titleA: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center',
    },
});