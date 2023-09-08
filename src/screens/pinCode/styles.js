import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pinContainer: {
        backgroundColor: colors.light.lightPrimary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    pinInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        marginHorizontal: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    button: {
        height: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.light.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    saveButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    clearButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
