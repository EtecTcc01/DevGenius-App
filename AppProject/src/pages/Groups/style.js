import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    input: {
        margin: 5,
        width: '80%',
    },
    content: {
        flex: 1,
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        marginLeft: '7%',
        marginTop: '7%',
    },
    contentA: {
        flex: 2,
        padding: '4%',
        backgroundColor: '#000',
        width: '100%',
        minHeight: '60%'
    },
    contentB: {
        flex: 1,
        padding: '4%',
        backgroundColor: '#000',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom: '7%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#06c244',
    },
    listItem: {
        backgroundColor: '#fff',
        margin: '2%',
        borderRadius: 6
    },
    listItemTitle: {
        color: '#000',
        fontWeight: 'bold'
    },
});