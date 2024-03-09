import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    title: {
        color: '#06c244',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        fontSize: 24,
    },
    label: {
        marginTop: 8,
        color: '#06c244',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 8,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#06C244',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
