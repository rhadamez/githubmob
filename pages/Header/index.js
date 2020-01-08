import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
    return (
        <>
            <Text>
                Tela header!
            </Text>
        </>
    );
};

Header.navigationOptions = {
    title: 'Olá mundo'
}
