import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes/stack';

import UpdateListProvider from './src/context/updateList';

/** CONVERTER PARA MOEDAS */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

function App() {
  return (
    <UpdateListProvider>
      <>
        <StatusBar style="light" backgroundColor="#1d1d1d" />
        <Routes />    
      </>
    </UpdateListProvider>
  );
}

export default App;