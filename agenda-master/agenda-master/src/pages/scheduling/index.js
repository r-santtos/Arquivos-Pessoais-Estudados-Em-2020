import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

/** IMPORT USER */
import Tab from '../../components/tab';
import styles from './styles';
import { useUpdateList } from '../../context/updateList';

/** DATABASE OPEN OR CREATE */
const db = SQLite.openDatabase("dbmakeup", 1);

/** COMPONENT SCHEDULING */
function Scheduling() {
  /** USESTATES */
  const [resposta, setResposta] = useState([]);
  const [finished, setFinished] = useState([]);
  const [cancel, setCancel] = useState([]);
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }

  /** DATABASE */
  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("select * from tbmakeup order by day, month, year, hours, minutes desc limit 10", [], (_, { rows: { _array } }) => setResposta(_array));
      },
      null,
    );
  },[updateList]);

  /** DATABASE INSERT FINISHED*/
  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("insert into tbfinished (client, style, size, money, day, month, year, hours, minutes ) values (?,?,?,?,?,?,?,?,?)", [finished[1], finished[2], finished[3], finished[4], finished[5], finished[6], finished[7], finished[8], finished[9]]);
      },
      null,
    );
    delFinished();
    Count();
  },[finished])

  /** DATABASE INSERT CANCEL*/
  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql("insert into tbcancel (client, style, size, money, day, month, year, hours, minutes ) values (?,?,?,?,?,?,?,?,?)", [finished[1], finished[2], finished[3], finished[4], finished[5], finished[6], finished[7], finished[8], finished[9]]);
      },
      null,
    );
    delCancel();
    Count();
  },[cancel])

  /** FUNCTION DELETE FINISHED */
  function delFinished() {
    db.transaction(
      tx => {
        tx.executeSql(`delete from tbmakeup where id = ?;`, [finished[0]]);
      },
      null,
    );
    Count();
  }

  /** FUNCTION DELETE CANCEL */
  function delCancel() {
    db.transaction(
      tx => {
        tx.executeSql(`delete from tbmakeup where id = ?;`, [cancel[0]]);
      },
      null,
    );
    Count();
  }

  /** RETURN COMPONENT SCHEDULING */
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 2}}
        data={resposta}
        keyExtractor={resposta => String(resposta.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/** COMPONENTS TEXT */}
            <View style={styles.text}>
              <Text style={[styles.txtWhite, styles.txtTxt, styles.name]}>{item.client}</Text>
              {/** COMPONENT DATE AND TIME*/}
              <View style={styles.dateTime}>
                <Text style={[styles.txtWhite, styles.dateTimeG]}>{("0" + item.day).slice(-2)}/{("0" + item.month).slice(-2)}/{item.year}</Text>
                <Text style={[styles.txtWhite, styles.dateTimeP]}>{("0" + item.hours).slice(-2)}:{("0" + item.minutes).slice(-2)}</Text>
              </View>
              <Text/>

              <Text style={[styles.txtWhite, styles.txtTxt]}>{item.style}</Text>
              <Text style={[styles.txtWhite, styles.txtTxt]}>{item.size}</Text>
              <Text/>

              <Text style={[styles.txtWhite, styles.value]}>
                {Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(item.money)}
              </Text>
            </View>

            {/** COMPONENT BTNS */}
            <View style={styles.btns}>
              <RectButton style={[styles.btn, styles.btnDel]} onPress={() => setCancel([
                item.id,
                item.client,
                item.style,
                item.size,
                item.money,
                item.day,
                item.month,
                item.year,
                item.hours,
                item.minutes        
              ])}>
                <Text style={{color: '#000', fontWeight: 'bold', textTransform: 'uppercase'}}>Cancelar</Text>
              </RectButton>

              <RectButton style={[styles.btn, styles.btnBook]} onPress={() => setFinished([
                item.id,
                item.client,
                item.style,
                item.size,
                item.money,
                item.day,
                item.month,
                item.year,
                item.hours,
                item.minutes
              ])}>
                <Text style={{color: '#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Finalizado</Text>
              </RectButton>
            </View>
          </View>
        )}
      />
      
      {/** COMPONENT TAB */}
      <Tab />
    </SafeAreaView>
  );
}

export default Scheduling;