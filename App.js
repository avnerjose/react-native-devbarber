import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import UserContextProvider from "./src/contexts/UserContext";
import { StatusBar } from 'react-native';

import MainStack from "./src/stacks/MainStack";

export default () => {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#63c2d1"/>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}