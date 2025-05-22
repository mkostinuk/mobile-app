import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
type Order = {
    id: string;
    title: string;
    details: string;
    status: string;
    price: string;
};

const orders: Order[] = [
    { id: '1', title: 'Order #1', details: 'Coffe Machine, 4 Caps', status: 'Waiting for confirmation', price: '$200' },
    { id: '2', title: 'Order #3', details: 'Smartphone Apple', status: 'Sent', price: '$1000' },
    { id: '3', title: 'Order #3', details: 'Bentley Continental', status: 'Delivered', price: '$200000' },
    { id: '4', title: 'Order #4', details: 'Gucci Glasses', status: 'Cancelled', price: '$2000' },
];

const OrdersScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('OrderDetails', {order: item})}>
            <Text style={styles.orderTitle}>{item.title}</Text>
            <Text style={styles.orderDetails}>{item.details}</Text>
            <Text
              style={[
                styles.orderStatus,
                item.status === 'Delivered'
                  ? styles.statusDelivered
                  : item.status === 'Cancelled'
                        ? styles.statusCancelled :
                        item.status === 'Waiting for confirmation' ?
                        styles.statusProcessing :
                        styles.statusPending,
              ]}>
              {item.status}
            </Text>
            <Text style={styles.orderPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    orderItem: {
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    orderTitle: { fontSize: 18, color: '#333', fontWeight: 'bold' },
    orderDetails: { fontSize: 15, color: '#555', marginTop: 3 },
    orderStatus: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
    statusPending: { color: '#f39c12' },
    statusDelivered: { color: '#27ae60' },
    statusCancelled: { color: '#c0392b' },
    statusProcessing: { color: '#2980b9' },
    orderPrice: { fontSize: 16, color: '#2980b9', marginTop: 5 },
});

export default OrdersScreen;
