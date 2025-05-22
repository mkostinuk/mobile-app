import {View} from 'react-native';
import * as React from 'react';
import CustomButton from '../components/CustomButton.tsx';

const ProfessionalScreen = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton
                title="Clients"
                onPress={() => navigation.navigate('Clients')}
            />
            <CustomButton
                title="Orders"
                onPress={() => navigation.navigate('Orders')}
            />
        </View>
    );
};
export default ProfessionalScreen;
