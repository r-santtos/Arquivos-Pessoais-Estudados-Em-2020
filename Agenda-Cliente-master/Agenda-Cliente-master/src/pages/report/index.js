import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text
} from 'react-native';
import styles from './styles';
import Tab from '../../components/tab';
import * as SQLite from 'expo-sqlite';
import { useUpdateList } from '../../context/updateList';

/** DATABASE OPEN OR CREATE */
const db = SQLite.openDatabase("dbmakeup", 1);

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
const funMonth = monthDates.getMonth();
const funYear = monthDates.getFullYear();
const months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

/** COMPONENT REPORT */
function Report() {
  /** USESTATES */
  const [resposta, setResposta] = useState([]);
  const [month, setMoth] = useState([]);
  const { updateList } = useUpdateList();

  /** DATABASE */
  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("select * from tbfinished order by day, month, year, hours, minutes desc limit 31", [], (_, { rows: { _array } }) => setResposta(_array));

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

  /** RETURN COMPONENT REPORT */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT BALANCE */}
      <View style={styles.balance}>
        <Text style={[styles.txtWhite, styles.txtMonth]}>Saldo/{months[funMonth]}</Text>
        <CalcMonth />
      </View>

      {/** COMPONENT TITLE */}
      <View style={styles.title}>
        <Text style={styles.txtWhite}>Ultimos Registros</Text>
      </View>

      {/** COMPONENT LIST */}
      <FlatList 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 4}}
        data={resposta}
        keyExtractor={resposta => String(resposta.id)}
        renderItem={({ item }) => (
          <View style={styles.boxList}>
            {/** COMPONENT LIST */}
            <View style={styles.list}>
              <Text style={[styles.txtWhite, styles.txtValue]}>
                {Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(item.money)}
              </Text>
              <Text style={[styles.txtWhite, styles.txtProduct]}>{item.style}</Text>
              <Text style={[styles.txtWhite, styles.txtDates]}>{("0" + item.day).slice(-2)}/{("0" + item.month).slice(-2)}/{item.year}</Text>
            </View>
          </View>
        )}
      />

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Report;