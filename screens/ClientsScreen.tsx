import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
type Client = { id: string; name: string; info: string };

const clients:Client[] = [
    { id: '1', name: 'Oleg', info: 'Web-developer from Kyiv, 5 years in industry' },
    { id: '2', name: 'Anna', info: 'Client from Lviv, Megogo CEO' },
    { id: '3', name: 'Ivan', info: 'Client from Odes, Sea port CEO' },
];

const ClientsScreen = () => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    return (
      <View style={styles.container}>
        <FlatList
          data={clients}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.clientItem}
              onPress={() => {
                  setSelectedClient(item);
              }}>
              <Text style={styles.clientName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={!!selectedClient}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedClient(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.clientInfo}>{selectedClient?.info}</Text>
              <TouchableOpacity onPress={() => setSelectedClient(null)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    clientItem: { padding: 15, backgroundColor: '#ddd', marginVertical: 5, borderRadius: 8 },
    clientName: { fontSize: 18 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
    clientInfo: { fontSize: 16, marginBottom: 10 },
    closeButton: { fontSize: 18, color: 'blue' },
});

export default ClientsScreen;
