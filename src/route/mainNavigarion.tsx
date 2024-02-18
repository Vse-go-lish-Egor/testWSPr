import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatList from '../screens/ChatList';
import ChatScreen from '../screens/ChatScreen';
import AccountScreen from '../screens/AccountScreen';
export type RootStackParamList = {
  AccountScreen: undefined;
  ChatList: {id: string};
  ChatScreen: {receiverId: string; senderId: string; socket: WebSocket};
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
