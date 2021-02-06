import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';

/** IMPORT USER */
import Tab from '../../components/tab';
import styles from './style';
import Input from '../../components/input';
import { useUpdateList } from '../../context/updateList';

/** COMPONENT EXPENSES */
function Expenses() {
  /** USESTATE */
  const [select, setSelect] = useState('Categorias');
  const [details, setDetails] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }

  /** FUNCTION CLEAR */
  function Clear() {
    setSelect('Categorias');
    setDetails('');
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
  //const clock = `${hours}:${minutes}`;
  
  /** DATABASE OPEN OR CREATE */
  const db = SQLite.openDatabase("financial", 1);

  /** FUNCTIONS BTN REGISTER*/
  function btnSubmit(types) {
    if (select == 'Categorias' || details == '' || numberFloat == '') {
      Alert.alert("Campo vazio ", 'Por favor, preencha todos os campos');
    } else {
      db.transaction(
        tx => {
          tx.executeSql("insert into ativespassives (tipos, selections, details, money, day, month, year, hours, minutes ) values (?,?,?,?,?,?,?,?,?)", [types, select, details, numberFloat, dia, mes, funYear, hours, minutes]);
        },
        null,
      );
      Clear();
      Count();
      console.log(types)
    }
  }

  /** FUNCTION MODAL */
  function ModalSelect(value) {
    setSelect(value);
    setModalVisible(!modalVisible);
  }

  /** RETURN COMPONENT EXPENSES */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modalView}
      >
        <ScrollView
          style={styles.form}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 5,
          }}        
        >
          <Text style={styles.txtSelect}>Selecione uma Categoria</Text>
          
          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Categorias')}>
            <Text style={styles.txtWhite}>Categorias</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Alimentação')}>
            <Text style={styles.txtWhite}>Alimentação</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Automóvel')}>
            <Text style={styles.txtWhite}>Automóvel</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Educação')}>
            <Text style={styles.txtWhite}>Educação</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Imoveis')}>
            <Text style={styles.txtWhite}>Imoveis</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Investimentos')}>
            <Text style={styles.txtWhite}>Investimentos</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Lazer')}>
            <Text style={styles.txtWhite}>Lazer</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Pensão Alimenticia')}>
            <Text style={styles.txtWhite}>Pensão Alimenticia</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Salário')}>
            <Text style={styles.txtWhite}>Salário</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnModal} onPress={() => ModalSelect('Outros')}>
            <Text style={styles.txtWhite}>Outros</Text>
          </TouchableHighlight>

        </ScrollView>
      </Modal>

      {/** COMPONENT FORM */}
      <ScrollView 
        style={styles.form}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
        }}
      >
        <View style={styles.select}>
          <Text style={[styles.txtWhite, styles.inputG]}>{select}</Text>
          
          <RectButton style={styles.caretdown} 
            onPress={() => {setModalVisible(true);}}
          >
            <AntDesign name="caretdown" size={12} color="white" />
          </RectButton>
        </View>

        <TextInput
          style={[styles.input]}
          placeholder="Detalhes"
          placeholderTextColor="#909090"
          autoCapitalize="words"
          value={details}
          onChangeText={setDetails}
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
            <Text style={[styles.inputTwo]} onPress={showDatepicker}>
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

          <RectButton style={styles.caretdown} 
            onPress={showDatepicker}
          >
            <AntDesign name="caretdown" size={12} color="white" />
          </RectButton>

        </View>
      </ScrollView>

      {/** COMPONENT BTNS */}
      <View style={styles.btns}>
        <RectButton style={[styles.btn, styles.btnPassive]} onPress={() => btnSubmit('passivo')}>
          <Text style={styles.txtWhite}>Passivos</Text>
        </RectButton>

        <RectButton style={[styles.btn, styles.btnAtive]} onPress={() => btnSubmit('ativo')}>
          <Text style={styles.txtWhite}>Ativos</Text>
        </RectButton>
      </View>

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Expenses;