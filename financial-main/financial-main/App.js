import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Stack from './src/routes/stack'

import UpdateListProvider from './src/context/updateList';

/** CONVERTER PARA MOEDAS */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

function App() {
  return (
    <UpdateListProvider>
      <>
        <StatusBar style='light' backgroundColor="#272728" />
        <Stack />
      </>
    </UpdateListProvider>
  );
}

export default App;