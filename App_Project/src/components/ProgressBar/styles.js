import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    circularProgress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBarContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    text: {
        fontSize: RFValue(18),
        marginBottom: 10,
        color: '#06c244',
        fontWeight: 'bold',
    },
    circularTitle: {
        fontSize: RFValue(20),
        color: '#333',
    },
});
