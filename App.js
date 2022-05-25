import 'react-native-gesture-handler';
import React,{useState} from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyContacts from './screens/MyContacts'
import demo from './screens/demo';
// import CreateContact from './screens/CreateContact'
import Profile from './screens/Profile'

const Stack = createStackNavigator();


export default function App() {
  const [data,setData]=useState([]);
// import * as Contacts from 'expo-contacts';
// 


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MyContacts'>
        <Stack.Screen name='MyContacts' component={MyContacts} />
        {/* <Stack.Screen name='CreateContact' component={CreateContact} /> */}
        <Stack.Screen name='Profile' component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}