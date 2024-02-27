import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: '5%',
    },
    content: {
        backgroundColor: '#000',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: '1%',
        paddingBottom: '1%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    button: {
        flex: 2,
        borderRadius: 100,
        borderColor: '#06c244',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: "2%",
        minHeight: 150,
        minWidth: 150
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});