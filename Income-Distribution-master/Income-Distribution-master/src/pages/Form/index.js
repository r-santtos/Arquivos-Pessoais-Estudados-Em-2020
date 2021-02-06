import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TextInput
} from 'react-native';

function Form() {
  const [saldo, setSaldo] = useState('');

  const rr = saldo.replace(/\./g, '');
  const pont = rr;
  const rrs = pont.replace(/,/g, '.');

  const cincocinco =  (rrs * 0.55);
  const responseCC = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cincocinco);

  const dez = (rrs * 0.10);
  const responseDez = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dez);

  const cinco = (rrs * 0.05);
  const responseCinco = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cinco);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.from}>
        <Text style={styles.real}>R$</Text>
        <TextInput
          style={styles.input}
          placeholder='R$0,00'
          placeholderTextColor='#303030'
          keyboardType="decimal-pad"
          maxLength={14}
          value={saldo}
          onChangeText={setSaldo}
        />
      </View>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>55% Custos de vida / mês</Text>
          </View>
          <Text style={styles.value}>{responseCC}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>10% Independência financeira</Text>
          </View>
        <Text style={styles.value}>{responseDez}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>10% Objetivos de médio prazo</Text>
          </View>
          <Text style={styles.value}>{responseDez}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>5% Dinheiro em caixa</Text>
          </View>
          <Text style={styles.value}>{responseCinco}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>10% Educação</Text>
          </View>
          <Text style={styles.value}>{responseDez}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <View style={styles.sinal} />
            <Text style={styles.titleText}>10% Lazer</Text>
          </View>
          <Text style={styles.value}>{responseDez}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  from: {
    width: '100%',
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  real: {
    fontSize: 35,
    color: '#fff',
  },
  input: {
    width: '85%',
    fontSize: 35,
    backgroundColor: '#303030',
    paddingHorizontal: 8,
    paddingVertical: 25,
    color: '#fff',
  },
  scrollView: {
    width: '100%',
    paddingTop: 10,
  },
  box: {
    backgroundColor: '#202020',
    marginBottom: 10,
  },
  boxTitle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
  },
  sinal: {
    maxHeight: 7,
    maxWidth: 7,
    minHeight: 7,
    minWidth: 7,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  value: {
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
});


export default Form;