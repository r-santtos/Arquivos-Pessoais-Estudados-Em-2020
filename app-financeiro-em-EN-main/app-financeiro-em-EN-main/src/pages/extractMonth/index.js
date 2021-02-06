import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  Alert
} from 'react-native';
import styles from './style';
import Tab from '../../components/tab';
import * as SQLite from 'expo-sqlite';
import { useUpdateList, useVarMonth, useVarYear } from '../../context/updateList';

/** DATABASE OPEN OR CREATE */
const db = SQLite.openDatabase("financial", 1);

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
//const funMonth = monthDates.getMonth();
//const funYear = monthDates.getFullYear();
const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

/** COMPONENT REPORT */
function Report() {
  /** USESTATES */
  const [resposta, setResposta] = useState([]);
  const [atives, setAtives] = useState([]);
  const [passives, setPassives] = useState([]);

  const [passivesMonthEx, setPassivesMonthEx] = useState([]);
  const { updateList, setUpdateList } = useUpdateList();
  const { varMonth } = useVarMonth();
  const { varYear } = useVarYear();

  /** USE EFFECT */
  useEffect(() => {
    //{atives.map(({total}) => (setAtivesMonthEx(total)))}
    {passives.map(({total}) => (setPassivesMonthEx(total)))}

  },[passives])

  /** DATABASE */
  useEffect(() => {
    db.transaction(
      tx => {
        /** ATIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where month = ? and year = ? and tipos = ?", [varMonth, varYear, 'recipe'], (_, { rows: { _array } }) => setAtives(_array));

        /** PASSIVES MONTH*/
        tx.executeSql("select id, sum(money) as total from ativespassives where month = ? and year = ? and tipos = ?", [varMonth, varYear, 'outgoing'], (_, { rows: { _array } }) => setPassives(_array));

        /** EXTRACT MONTH*/
        tx.executeSql("select * from ativespassives where month = ? and year = ?", [varMonth, varYear], (_, { rows: { _array } }) => setResposta(_array));
      },
      null,
    );
  },[updateList]);
  
  /** CREATE COMPONENT BALANCE */
  function CalcMonth() {
    return (
      <>
        {atives.map(({id, total}) => (
          <Text
            style={[styles.txtWhite, styles.txtBalance]}
            key={id}
          >
          {Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
          }).format(total - passivesMonthEx)}
          </Text>
        ))}
      </>  
    );
  }

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }

  /** FUNCTION ALERT DEL */
  const createTwoButtonAlert = (delId) =>
    Alert.alert(
      "Do you really want to delete?",
      "",
      [
        {
          text: "Not",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => delCancel(delId) }
      ],
      { cancelable: false }
    );

  /** FUNCTION DELETE CANCEL */
  function delCancel(idDel) {
    db.transaction(
      tx => {
        tx.executeSql(`delete from ativespassives where id = ?;`, [idDel]);
      },
      null,
    );
    Count();
  }

  /** RETURN COMPONENT REPORT */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT BALANCE */}
      <View style={styles.balance}>
        <Text style={[styles.txtWhite, styles.txtMonth]}>Balance/{months[varMonth-1]}</Text>
        <CalcMonth />
      </View>

      {/** COMPONENT TITLE */}
      <View style={styles.title}>
        <Text style={styles.txtWhite}>Records</Text>
      </View>

      {/** COMPONENT LIST */}
      <FlatList 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 4}}
        data={resposta}
        keyExtractor={resposta => String(resposta.id)}
        renderItem={({ item }) => (
          <Pressable style={[styles.boxList]} onPressIn={() => createTwoButtonAlert(item.id)}>
            {/** COMPONENT LIST */}
            <View style={styles.list}>
              <Text style={[styles.txtWhite, styles.txtValue]}>
                {Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD' 
                }).format(item.money)}
              </Text>
              <Text style={styles.txtWhite}>{item.details}</Text>
              <Text style={[styles.txtWhite, styles.txtProduct]}>{item.selections}</Text>
              <Text style={[styles.txtWhite, styles.txtDates]}>{("0" + item.day).slice(-2)}/{("0" + item.month).slice(-2)}/{item.year}</Text>
            </View>
          </Pressable>
        )}
      />

      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Report;
