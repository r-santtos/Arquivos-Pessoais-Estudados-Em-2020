import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** IMPORT PAGES */
import Home from '../pages/home';
import Form from '../pages/form'
import ExtractMonth from '../pages/extractMonth';
import Calendar from '../pages/calendar'

const { Navigator, Screen } = createStackNavigator();
function Stack() {
  /** FUNCTION SALUTATION */
  const hours = new Date();
  const salutations = hours.getHours();

  /** USESTATES */
  const [salutation, setSalutation] = useState('');

  /** FUNCTION SALUTATIONS */
  useEffect(() => {    
    if (salutations >= 0 && salutations <= 11) {
      setSalutation("Bom dia!");
    } else if (salutations >= 12 && salutations <= 18) {
      setSalutation("Boa tarde!");
    } else if (salutations >= 19 && salutations <= 23) {
      setSalutation("Boa noite!");
    } else {
      setSalutation("Olá");
    }
  },[salutation]);

  return (
    <NavigationContainer>
      <Navigator>
        <Screen 
          name="Home"
          component={Home}
          options={{
            title: salutation,
            headerStyle: {backgroundColor: '#272728'},
            headerTintColor: '#fff',
          }}
        />

        <Screen 
          name="Form"
          component={Form}
          options={{
            title: 'Registrar',
            headerStyle: {backgroundColor: '#272728'},
            headerTintColor: '#fff',
          }}
        />

        <Screen 
          name="ExtractMonth"
          component={ExtractMonth}
          options={{
            title: 'Extrato',
            headerStyle: {backgroundColor: '#272728'},
            headerTintColor: '#fff',
          }}
        />

        <Screen 
          name="Calendar"
          component={Calendar}
          options={{
            title: 'Calendario',
            headerStyle: {backgroundColor: '#272728'},
            headerTintColor: '#fff',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Stack;