import React from 'react';
import Routes from './pages/routes'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
