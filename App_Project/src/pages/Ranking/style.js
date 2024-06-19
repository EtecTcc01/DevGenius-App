import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    title: {
        fontSize: RFValue(12),
        color: '#06c244',
        textAlign: "center",
        margin: 2.5
    },
    content: {
        flex: 1,
        width: "100%"
    }
    ,img_demo: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        minWidth: 110,
        minHeight: 110,
        maxHeight: 210,
        maxWidth: 210,
    }
});