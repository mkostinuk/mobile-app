import {Image, Text, View} from 'react-native';
import * as React from 'react';

const SettingsScreen = () => {
    return (
        <View>
            <Text style={{fontWeight:'bold'}}>These are your settings</Text>
            <Text>Here you can change your settings</Text>
            <Image source={
                {
                    uri: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc244MGZ1bWg5bWx0c2ttbnJsaHo0ZHFpOHdjMjNlcmtuN2xubDU0bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LESpNIDaNBUcRIPzng/giphy.gif' }}
                   style={{width:200, height:200} }
            />
        </View>
    );
};
export default SettingsScreen;
