import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
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

  /** USESTATES */
  const [month, setMoth] = useState([]);
  const { updateList } = useUpdateList();

  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("select id, sum(money) as total from tbfinished where month = ? and year = ?", [mesplus, funYear], (_, { rows: { _array } }) => setMoth(_array));
      },
      null,
    );
  },[updateList]);

  /** CREATE COMPONENT BALANCE */
  function CalcMonth() {
    return (
      <>
        {month.map(({id, total}) => (
          <Text
            style={[styles.txtWhite, styles.txtBalance]}
            key={id}
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

      </ScrollView>

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default HomeScreen;