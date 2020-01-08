import React from 'react';
import { View, Text } from 'react-native';

export default function Main() {
    return (
        <>
            <Text>
                Tela main!
            </Text>
        </>
    );
};

Main.navigationOptions = {
    title: 'Olá mundo'
}