import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        marginBottom: 20,
    },
    buttonContainer:{
        alignItems:'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    weatherContainer: {
        marginTop: 10,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    weatherCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    weatherIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    weatherDetails: {
        marginTop: 10,
    },
    tempText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },
    feelsLikeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    minMaxText: {
        fontSize: 14,
        color: '#666',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#f44336',
    },
});
