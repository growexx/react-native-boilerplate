import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        fontSize: 16,
    },
    updateButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 16,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;
