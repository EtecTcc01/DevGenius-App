import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#000',  // fundo preto
        paddingHorizontal: 20,
        paddingVertical: 30,
        // justifyContent: 'center', // centralizar conteúdo verticalmente
    },
    title: {
        color: '#06c244',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFValue(20),
        height: "auto",
        fontFamily: "sans-serif-condensed",
        flex: 0.1
    },
    content: {
        flex: 1,
        width: "100%",
        backgroundColor: '#323329',  // fundo preto
        borderRadius: 10,  // bordas arredondadas
        padding: 20,
    },
    text: {
        color: '#06c240',
        textAlign: 'left',
        fontSize: RFValue(12),
        fontFamily: "serif",
        flex: 1
    }
});
