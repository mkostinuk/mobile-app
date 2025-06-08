import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen.tsx';
import StackProfessionalScreen from './StackProfessionalScreen.tsx';
import WeatherScreen from '../screens/WeatherScreen.tsx';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = "";

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Professional') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    else if (route.name === 'Weather') {
                        iconName = focused ? 'cloud' : 'cloud-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Professional" component={StackProfessionalScreen} />
            <Tab.Screen name="Weather" component={WeatherScreen} options={{headerShown:true}}/>
        </Tab.Navigator>
    );
}
export default TabNavigator;
