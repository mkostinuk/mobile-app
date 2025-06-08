import {View} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton.tsx';

const HomeScreen = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton
                title="Account"
                onPress={() => navigation.navigate('Account')}
            />
            <CustomButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <CustomButton
                title="Info"
                onPress={() => navigation.navigate('Info')}
            />

        </View>
    );
};
export default HomeScreen;
