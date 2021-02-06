import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';

/** IMPORT USER */
import Tab from '../../components/tab';
import styles from './styles';
import Input from '../../components/input';
import { useUpdateList } from '../../context/updateList';

/** COMPONENT FORM */
function Form() {
  /** USESTATE */
  const [codeProd, setCodeProd] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }
  
  /** FUNCTION CLEAR INPUTS */
  function clear() {
    setCodeProd('');
    setDescription('');
    setAmount('');
    setMoney('');
  }

  /** COMPONENT MASK INPUT MONEY */
  const [money, setMoney] = useState('');
  const numberFloat = money.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1.$2");
  function handleCuston(value) {
    setMoney(value);
  }

  /** TOTAL */
  const newAmount = parseInt(amount);
  const newMoney = parseFloat(numberFloat);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(amount > 0 && numberFloat > 0) {
      const total = newAmount * newMoney;
      setTotal(total);
    } else { setTotal(0) }
  },[money, amount])

  /** COMPONENT DATE TIME PICKER */
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  /**ADICIONE ZERO À ESQUERDA NA DATA ANTES DE EXIBIR NA TELA */
  const dia = ("0" + date.getDate()).slice(-2);
  const mesplus = date.getMonth()+1;
  const mes = ("0" + mesplus).slice(-2);
  const showView = `${dia}/${mes}/${date.getFullYear()}`

  /** DATE YEAR */
  const funYear = date.getFullYear();

  /** TIME */
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const clock = `${hours}:${minutes}`;
  
  /** DATABASE OPEN OR CREATE */
  const db = SQLite.openDatabase("dbmakeup", 1);

  /** FUNCTIONS BTN REGISTER*/
  function btnSubmit() {
    if (codeProd == '' || description == '' || amount == '' || numberFloat == '') {
      Alert.alert("Campo vazio ", 'Por favor, preencha todos os campos');
    } else {
      db.transaction(
        tx => {
          tx.executeSql("insert into tbexpenses (codeprod, description, amount, money, moneytotal, day, month, year, hours, minutes ) values (?,?,?,?,?,?,?,?,?,?)", [codeProd, description, amount, numberFloat, total, dia, mes, funYear, hours, minutes]);
        },
        null,
      );
      clear();
      Count();
    }
  }

  /** RETURN COMPONENT FORM */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT FORM */}
      <ScrollView 
        style={styles.form}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
        }}
      >
        <TextInput 
          style={styles.input} 
          placeholder="Código Produo ou Serviço"
          placeholderTextColor="#909090"
          keyboardType="decimal-pad"
          value={codeProd}
          onChangeText={setCodeProd}
        />

        <TextInput
          style={[styles.input]} 
          placeholder="Descrição"
          placeholderTextColor="#909090"
          autoCapitalize="words"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.inputMoney}>
          <TextInput 
            style={styles.cifra} 
            placeholder="Qtd."
            placeholderTextColor="#909090"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
          <Input
            value={money}
            style={[styles.moneyInput, styles.dinheiro]}
            placeholder='R$0,00'
            placeholderTextColor='#909090'
            keyboardType="decimal-pad"
            maxLength={14}
            inputMaskChange={(text) => handleCuston(text)}
          />
        </View>

        <View style={styles.inputMoney}>
          <Text style={[styles.cifra, styles.dinheiro]}>Total</Text>
          <Text style={[styles.moneyInput, styles.dinheiro]}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            }).format(total)}
          </Text>
        </View>

        <View style={styles.boxInputs}>
          <>
            <Text style={[styles.input, styles.inputG]} onPress={showDatepicker}>
              {showView}
            </Text>
          </>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          
          <>
            <Text style={[styles.input, styles.inputP]} onPress={showTimepicker}>
              {clock}
            </Text>
          </>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>

      {/** COMPONENT BTNS */}
      <View style={styles.btns}>
        <RectButton style={[styles.btn, styles.btnDel]} onPress={clear}>
          <Text style={{fontWeight: 'bold'}}>Cancelar</Text>
        </RectButton>

        <RectButton style={[styles.btn, styles.btnBook]} onPress={btnSubmit}>
          <Text style={styles.txtWhite}>Registrar</Text>
        </RectButton>
      </View>

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Form;