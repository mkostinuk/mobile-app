import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrdersScreen from '../screens/OrdersScreen.tsx';
import ClientsScreen from '../screens/ClientsScreen.tsx';
import ProfessionalScreen from '../screens/ProfessionalScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const StackProfessional = createNativeStackNavigator();

function StackProfessionalScreen() {
    return (
        <StackProfessional.Navigator initialRouteName={'Professional'}>
            <StackProfessional.Screen name="Professional" component={ProfessionalScreen} options={{headerShown: true}} />
            <StackProfessional.Screen name="Clients" component={ClientsScreen} options={{headerShown: true}} />
            <StackProfessional.Screen name="Orders" component={OrdersScreen} options={{headerShown: true}} />
            <StackProfessional.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ headerShown: true }} />
        </StackProfessional.Navigator>
    );
}
export default StackProfessionalScreen;
