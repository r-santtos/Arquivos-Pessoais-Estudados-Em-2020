import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** IMPORT PAGES */
import Home from '../pages/home';
import Form from '../pages/form';
import Scheduling from '../pages/scheduling';
import Report from '../pages/report';
import Expenses from '../pages/expenses';
import ExpensesReport from '../pages/expensesreport';

/** FUNCTION SALUTATION */
const hours = new Date();
const salutations = hours.getHours();

const {Navigator, Screen} = createStackNavigator();
function Stack() {
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
        {/** HOMESCREEN */}
        <Screen 
          name="Home" 
          component={Home}
          options={{
            title: salutation,
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />

        {/** FORM */}
        <Screen 
          name="Form" 
          component={Form}
          options={{
            title: 'Agendamento',
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />

        {/** SCHEDULING */}
        <Screen 
          name="Scheduling" 
          component={Scheduling}
          options={{
            title: 'Agendados',
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />

        {/** REPORT */}
        <Screen 
          name="Report" 
          component={Report}
          options={{
            title: 'Extrato',
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />

        {/** EXPENSES */}
        <Screen 
          name="Expenses" 
          component={Expenses}
          options={{
            title: 'Despesas',
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />

        {/** EXPENSES REPORT */}
        <Screen 
          name="ExpensesReport" 
          component={ExpensesReport}
          options={{
            title: 'Extrato',
            headerStyle: {backgroundColor: '#1d1d1d'},
            headerTintColor: '#fff',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Stack;