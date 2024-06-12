import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-around"
    },
    title: {
        fontSize: RFValue(13),
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: '#000'
    },
    subTitle: {
        fontSize: RFValue(9),
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: '#284703'
    },
    cover: {
        minWidth: 100,
        minHeight: 100,
        alignSelf: 'center',
        margin: 5, 
        borderRadius: 15,
    },
    card: {
        // fontSize: RFValue(22),
        width: "47%",
        height: 250,
        margin: 5,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#88b257', //Verde claro,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        maxWidth: 600,
        minWidth: 200,
    },
    button: {
        width: "41%",
        height: "auto",
        minWidth: 70,
        borderWidth: 2,
    },
    label: {
        fontSize: RFValue(8),
        color: 'black',
        fontWeight: "bold",
        fontSize: 12
    },
    action: {
        width: "100%", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-around", 
        alignItems: "center"
    }
});
