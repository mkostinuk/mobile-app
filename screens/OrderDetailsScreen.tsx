import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const OrderDetailsScreen = ({ route }: any) => {
    const { order } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{order.title}</Text>
            <Text style={styles.details}>📦 Goods: {order.details}</Text>
            <Text style={[styles.status, order.status === 'Delivered' ? styles.statusDelivered : order.status === "Cancelled" ? styles.statusCancelled : order.status === "Waiting for confirmation" ? styles.statusProcessing : styles.statusPending]}>
                🚚 Status: {order.status}
            </Text>
            <Text style={styles.price}>💰 Sum: {order.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: "center" },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    details: { fontSize: 18, color: '#555', marginBottom: 5 },
    status: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    statusPending: { color: '#f39c12' },
    statusDelivered: { color: '#27ae60' },
    statusCancelled: { color: '#c0392b' },
    statusProcessing: { color: '#2980b9' },
    price: { fontSize: 20, color: '#2980b9', fontWeight: 'bold', marginTop: 10 },
});

export default OrderDetailsScreen;
