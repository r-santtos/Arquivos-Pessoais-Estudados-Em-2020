import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

/** IMPORT USER */
import styles from './styles';
import Tab from '../../components/tab';
import { useUpdateList } from '../../context/updateList';

/** DATABASE OPEN OR CREATE */
const db = SQLite.openDatabase("dbmakeup", 1);

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
const funMonth = monthDates.getMonth();
const funYear = monthDates.getFullYear();
const months = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

/** COMPONENT HOMESCREEN */
function HomeScreen() {
  const navigation = useNavigation();
  /** FUNCTION REPORT */
  function report() {
    navigation.navigate('Report')
  }
  /** FUNCTION FORM */
  function form() {
    navigation.navigate('Form')
  }
  /** FUNCTION SCHEDULING */
  function scheduling() {
    navigation.navigate('Scheduling')
  }

  /** FUNCTION EXPENSES */
  function expenses() {
    navigation.navigate('Expenses')
  }

  /** FUNCTION EXPENSES REPORT */
  function expensesReport() {
    navigation.navigate('ExpensesReport')
  }

  /** USESTATES */
  const [month, setMoth] = useState([]);
  const [monthEx, setMothEx] = useState([]);
  const [monthExT, setMothExT] = useState([]);
  const { updateList } = useUpdateList();

  if (monthEx == null) {
    monthEx = 0;
  }

  /** DATABASE FUNCTIONS CREATE FINISHED AND CANCEL */
  /** DATABASE FUNCTIONS */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists tbfinished (id integer primary key not null, client text not null, style text not null, size text not null, money int not null, day int not null, month int not null, year int not null, hours int not null, minutes int not null);"
      );

      tx.executeSql(
        "create table if not exists tbcancel (id integer primary key not null, client text not null, style text not null, size text not null, money int not null, day int not null, month int not null, year int not null, hours int not null, minutes int not null);"
      );

      tx.executeSql(
        "create table if not exists tbmakeup (id integer primary key not null, client text not null, style text not null, size text not null, money text not null, day text not null, month text not null, year int not null, hours text not null, minutes text not null);"
      );

      tx.executeSql(
        "create table if not exists tbexpenses (id integer primary key not null, codeprod int not null, description text not null, amount int not null, money int not null, moneytotal int not null, day text not null, month int not null, year int not null, hours text not null, minutes text not null);"
      );
    });
  },[]);

  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("select id, sum(money) as total from tbfinished where month = ? and year = ?", [mesplus, funYear], (_, { rows: { _array } }) => setMoth(_array));

        tx.executeSql("select id, sum(moneytotal) as total from tbexpenses where month = ? and year = ?", [mesplus, funYear], (_, { rows: { _array } }) => setMothEx(_array));
      },
      null,
    );
  },[updateList]);

  /** CREATE COMPONENT BALANCE */
  function CalcMonth() {
    return (
      <>
        {monthEx.map(({total}) => (setMothExT(total)))}
        {month.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite, styles.txtBalance]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total - monthExT)}
        </Text>
        ))}
      </>
    );
  }

  /** RETURN COMPONENT HOMESCREEN */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT SCROLLVIEW */}
      <ScrollView style={styles.scrollview}>
        {/** COMPONENT CARD */}
        <View>
          <RectButton style={styles.card} onPress={report}>
              <CalcMonth />
              <Text style={styles.txtWhite}>{months[funMonth]}</Text>
          </RectButton>
        </View>

        {/** COMPONENTS BTNS */}
        <View style={styles.btns}>
          {/** BTN SCHEDULING */}
          <RectButton style={[styles.btn]} onPress={form}>
            <FontAwesome name="book" size={40} color="#fff" />
            <Text style={styles.txtWhite}>Agendamentos</Text>
          </RectButton>
          
          {/** BTN REPORT */}
          <RectButton style={[styles.btn]} onPress={scheduling}>
            <MaterialIcons name="schedule" size={40} color="#fff" />
            <Text style={styles.txtWhite}>Agendados</Text>
          </RectButton>
        </View>

        <View style={styles.btns}>
          {/** BTN REPORT */}
          <RectButton style={[styles.btn]} onPress={expenses}>
            <Entypo name="book" size={40} color="#fff" />
            <Text style={styles.txtWhite}>Despesas</Text>
          </RectButton>

          {/** BTN EXPENSES REPORT */}
          <RectButton style={[styles.btn]} onPress={expensesReport}>
            <Entypo name="open-book" size={40} color="#fff" />
            <Text style={styles.txtWhite}>Extrato Despesas</Text>
          </RectButton>
        </View>

      </ScrollView>

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default HomeScreen;