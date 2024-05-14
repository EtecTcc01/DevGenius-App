import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000d06',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 2,
        backgroundColor: '#000d06',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    screenSwitch: {
        backgroundColor: '#000',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '7%'
    },
    title: {
        color: '#06c244',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        paddingTop: 18,
        color: '#06c244',
        fontWeight: 'bold',
        fontSize: 20
    },
    contentTxt: {
        color: '#06c244',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#06c244',
        position: 'absolute',
        borderRadius: 30,
        width: '60%',
        bottom: '35%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
    },
    access: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25
    }
});