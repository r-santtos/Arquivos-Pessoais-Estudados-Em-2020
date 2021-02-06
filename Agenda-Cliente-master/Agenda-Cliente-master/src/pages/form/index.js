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
  const [client, setClient] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }
  
  /** FUNCTION CLEAR INPUTS */
  function clear() {
    setClient('');
    setStyle('');
    setSize('');
    setMoney('');
  }

  /** COMPONENT MASK INPUT MONEY */
  const [money, setMoney] = useState('');
  const numberFloat = money.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1.$2");
  function handleCuston(value) {
    setMoney(value);
  }

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

  /** DATABASE FUNCTIONS */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists tbmakeup (id integer primary key not null, client text not null, style text not null, size text not null, money text not null, day text not null, month text not null, year int not null, hours text not null, minutes text not null);"
      );
    });
  },[]);

  /** FUNCTIONS BTN REGISTER*/
  function btnSubmit() {
    if (client == '' || style == '' || size == '' || numberFloat == '') {
      Alert.alert("Campo vazio ", 'Por favor, preencha todos os campos');
    } else {
      db.transaction(
        tx => {
          tx.executeSql("insert into tbmakeup (client, style, size, money, day, month, year, hours, minutes ) values (?,?,?,?,?,?,?,?,?)", [client, style, size, numberFloat, dia, mes, funYear, hours, minutes]);
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
          placeholder="Cliente"
          placeholderTextColor="#909090"
          autoCapitalize="words"
          value={client}
          onChangeText={setClient}
        />

        <TextInput
          style={[styles.input]} 
          placeholder="Estilo"
          placeholderTextColor="#909090"
          autoCapitalize="words"
          value={style}
          onChangeText={setStyle}
        />

        <TextInput
          style={[styles.input]}
          placeholder="Tamanho"
          placeholderTextColor="#909090"
          autoCapitalize="words"
          value={size}
          onChangeText={setSize}
        />

        <View style={styles.inputMoney}>
          <Text style={styles.cifra}>R$</Text>
          <Input
            value={money}
            style={[styles.moneyInput]}
            placeholder='0,00'
            placeholderTextColor='#909090'
            keyboardType="decimal-pad"
            maxLength={14}
            inputMaskChange={(text) => handleCuston(text)}
          />
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
          <Text style={styles.txtWhite}>Agendar</Text>
        </RectButton>
      </View>

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Form;