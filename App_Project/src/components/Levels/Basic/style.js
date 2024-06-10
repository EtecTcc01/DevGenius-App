import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 3,
        backgroundColor: '#203E2E', // Verde escuro
        paddingHorizontal: 20
    },
    alt_content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_content: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_utils: {
        flex: 0.1,
        paddingTop: 10,
        minHeight: 10,
        width: "100%"
    },
    button: {
        width: '90%',
        padding: 17,
        margin: 10,
        borderColor: '#06c244',
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff', // Cor de fundo dos botões
    },
    title: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center',
    },
});
