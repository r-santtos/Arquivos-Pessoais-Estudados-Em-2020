import React, {useEffect, useState} from  'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

/** IMPORT DEVELOPER */
import styles from './style';
import PieChart from '../../components/charts';
import Tab from '../../components/tab';
import { useUpdateList, useAtivePorc, usePassivePorc } from '../../context/updateList';


/** DATABASE OPEN OR CREATE */
const db = SQLite.openDatabase("financial", 1);

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
const funMonth = monthDates.getMonth();
const funYear = monthDates.getFullYear();
const months = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

/** COMPONENT HOME */
function HomeScreen() {

  /** USESTATE */
  const [atives, setAtives] = useState([]);
  const [passives, setPassives] = useState([]);

  const [ativesYear, setAtivesYear] = useState([]);
  const [passivesYear, setPassivesYear] = useState([]);

  const [ativesYearOne, setAtivesYearOne] = useState([]);
  const [passivesYearOne, setPassivesYearOne] = useState([]);

  const [ativesYearTwo, setAtivesYearTwo] = useState([]);
  const [passivesYearTwo, setPassivesYearTwo] = useState([]);

  const [ativesMonthEx, setAtivesMonthEx] = useState([]);
  const [passivesMonthEx, setPassivesMonthEx] = useState([]);

  const [passivesYearEx, setPassivesYearEx] = useState([]);
  const [passivesYearExOne, setPassivesYearExOne] = useState([]);
  const [passivesYearExTwo, setPassivesYearExTow] = useState([]);
  
  const { updateList } = useUpdateList();
  const {ativesPorc, setPorcAtive} = useAtivePorc();
  const {passivesPorc, setPorcPassive} = usePassivePorc();
  
  const ttl = ativesMonthEx + passivesMonthEx;

  /** DATABASE FUNCTIONS */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists ativespassives (id integer primary key not null, tipos text not null, selections text not null, details text not null, money int not null, day int not null, month int not null, year int not null, hours int not null, minutes int not null);"
      );
    });
  },[]);

  /** SELECT SUM MONTH */
  useEffect(() => {
    db.transaction(
      tx => {
        /** ATIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear, 'ativo'], (_, { rows: { _array } }) => setAtivesYear(_array));

        /** PASSIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear, 'passivo'], (_, { rows: { _array } }) => setPassivesYear(_array));

        /** ATIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear - 1, 'ativo'], (_, { rows: { _array } }) => setAtivesYearOne(_array));

        /** PASSIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear - 1, 'passivo'], (_, { rows: { _array } }) => setPassivesYearOne(_array));

        /** ATIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear - 2, 'ativo'], (_, { rows: { _array } }) => setAtivesYearTwo(_array));

        /** PASSIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where year = ? and tipos = ?", [funYear - 2, 'passivo'], (_, { rows: { _array } }) => setPassivesYearTwo(_array));

        /** ATIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where month = ? and year = ? and tipos = ?", [mesplus, funYear, 'ativo'], (_, { rows: { _array } }) => setAtives(_array));

        /** PASSIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where month = ? and year = ? and tipos = ?", [mesplus, funYear, 'passivo'], (_, { rows: { _array } }) => setPassives(_array));
      },
      null,
    );
  },[updateList]);

  /** USE EFFECT */
  useEffect(() => {
    {atives.map(({total}) => (setAtivesMonthEx(total)))}
    {passives.map(({total}) => (setPassivesMonthEx(total)))}

    {passivesYear.map(({total}) => (setPassivesYearEx(total)))}
    {passivesYearOne.map(({total}) => (setPassivesYearExOne(total)))}
    {passivesYearTwo.map(({total}) => (setPassivesYearExTow(total)))}

  },[passives])

  useFocusEffect(() => {
    setPorcAtive((ativesMonthEx / ttl) * 100);
    setPorcPassive((passivesMonthEx / ttl) * 100);
  },[passivesPorc])

  /** CREATE COMPONENT BALANCE */
  function Balance() {
    return (
      <>
        {ativesYear.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite, styles.txtBalance]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total - passivesYearEx)}
        </Text>
        ))}
      </>
    );
  }

  /** CREATE COMPONENT BALANCE - 2*/
  function BalanceTwo() {
    return (
      <>
        {ativesYearTwo.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite, styles.txtBtnsMonthYear]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total - passivesYearExTwo)}
        </Text>
        ))}
      </>
    );
  }

  /** CREATE COMPONENT BALANCE - 1*/
  function BalanceOne() {
    return (
      <>
        {ativesYearOne.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite, styles.txtBtnsMonthYear]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total - passivesYearExOne)}
        </Text>
        ))}
      </>
    );
  }

  /** CREATE COMPONENT BALANCE MONTH*/
  function BalanceMonth() {
    return (
      <>
        {atives.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total - passivesMonthEx)}
        </Text>
        ))}
      </>
    );
  }

  /** CREATE COMPONENT ATIVE E PASSIVE MONTH */
  function AtiveMonth() {
    return (
      <>
        {atives.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total)}
        </Text>
        ))}
      </>
    );
  }

  function PassiveMonth() {
    return (
      <>
        {passives.map(({id, total}) => (
        <Text
          key={id}
          style={[styles.txtWhite]}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(total)}
        </Text>
        ))}
      </>
    );
  }

  /** FUNCTION ALERT DEL */
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Equilíbrio",
      "50% significa que você gasta tudo o que ganha. ATIVOS mais altos significam que você gasta menos do que ganha; portanto, PASSIVOS mais altos significam que você está gastando mais do que ganha.",
      [
        {
          text: "",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Ok", onPress: () => console.log("Ok Pressed") }
      ],
      { cancelable: false }
    );

  /** RETURN HOME SCREEN */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT GLOBAL SCROLLVIEW */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 3,
        }}
      >
        {/** COMPONENT BALANCE */}
        <View style={[styles.balance, styles.button]}>
          <Balance />
          <Text style={[styles.txtWhite, styles.txtBalanceYear]}>saldo - {funYear}</Text>
        </View>

        {/** COMPOENT EXTRACT MONTH */}
        <View style={[styles.boxMonth, styles.button]}>
          <Text style={[styles.txtWhite, styles.titleMonth]}>{months[funMonth]}</Text>
          {/** COMPONENT BOX ATIVE */}
          <View style={[styles.boxExtractMonth, styles.boxAtive, styles.boxBox]}>
            <Text style={[styles.txtWhite, styles.txtFont]}>Ativos</Text>
            <AtiveMonth />
          </View>

          {/** COMPONENT BOX PASSIVE */}
          <View style={[styles.boxExtractMonth, styles.boxPassive, styles.boxBox]}>
            <Text style={[styles.txtWhite, styles.txtFont]}>Passivos</Text>
            <PassiveMonth />
          </View>

          {/** COMPONENT BOX TOTAL */}
          <View style={[styles.boxExtractMonth, styles.boxTotal, styles.boxBox]}>
            <Text style={[styles.txtWhite, styles.txtFont]}>Saldo</Text>
            <BalanceMonth />
          </View>
        </View>

        {/** COMPONENT PIECHART */}
        <View style={[styles.button, styles.boxChart]}>
          <View style={styles.boxAtivesPassives}>
            <Text style={styles.txtWhite}>
              Equilíbrio
            </Text>
            <Feather name="info" size={20} color="white" onPress={createTwoButtonAlert}/>
          </View>
          
          <PieChart />

          <View style={styles.boxAtivesPassives}>
            <Text style={styles.txtWhite}>
              Ativos {parseFloat(ativesPorc).toFixed(2)}%
            </Text>

            <Text style={[styles.txtWhite, styles.txtPassive]}>
              Passivos {parseFloat(passivesPorc).toFixed(2)}%
            </Text>
          </View>
        </View>

        {/** COMPONET BTNS EXTRACTS YEARS */}
        <View style={styles.extractsYears}>
          {/** COMPONET BTN YEAR LAST - 2 */}
          <View style={[styles.btnMonthYear, styles.button]}>
            <BalanceTwo />
            <Text style={[styles.txtWhite, styles.txtBtnsMonthYear]}>saldo - {funYear - 2}</Text>
          </View>

          {/** COMPONET BTN YEAR LAST */}
          <View style={[styles.btnMonthYear, styles.button]}>
            <BalanceOne />
            <Text style={[styles.txtWhite, styles.txtBtnsMonthYear]}>saldo - {funYear - 1}</Text>
          </View>
        </View>
      </ScrollView>

      {/** COMPONENT FOOTER */}
      <Tab />
      
    </SafeAreaView>
  );
}

export default HomeScreen;