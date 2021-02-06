import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import From from './pages/Form';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#303030" />
      <Stack.Navigator>
        <Stack.Screen 
          name="Form"
          component={From}
          options={{
            title: 'Distribuição de renda',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#303030'},
            headerTintColor: '#fff',
          }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;