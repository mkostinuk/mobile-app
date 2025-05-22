import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen.tsx';
import AccountScreen from '../screens/AccountScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';
import InfoScreen from '../screens/InfoScreen.tsx';

const StackHome = createNativeStackNavigator();

function StackHomeScreen() {
    return (
        <StackHome.Navigator initialRouteName={'Home'}>
            <StackHome.Screen name="Home" component={HomeScreen} options={{headerShown: true}} />
            <StackHome.Screen name="Account" component={AccountScreen} options={{headerShown: true}}/>
            <StackHome.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}} />
            <StackHome.Screen name="Info" component={InfoScreen} options={{headerShown: true}} />

        </StackHome.Navigator>
    );
}
export default StackHomeScreen;
