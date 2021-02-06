import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { useVarMonth, useVarYear } from '../../context/updateList';

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
const funYear = monthDates.getFullYear();

/** COMPONENT TAB */
function Tab() {
  /** CONTEXT MONTH END YEAR */
  const { setVarMonth } = useVarMonth();
  const { setVarYear } = useVarYear();

  const navigation = useNavigation();
  /** FUNCTION FORM */
  function home() {
    navigation.navigate('Home');
  }
  /** FUNCTION FORM */
  function form() {
    navigation.navigate('Form');
  }
  /** FUNCTION SCHEDULING */
  function ExtractMonth(months, years) {
    setVarMonth(months);
    setVarYear(years);
    navigation.navigate('ExtractMonth')
  }

  /** FUNCTION CALENDAR */
  function calendar() {
    navigation.navigate('Calendar')
  }

  /** RETURN DO COMPONENT TAB */
  return (
    <View style={styles.containerTab}>
      {/** BTN HOME */}
      <TouchableOpacity style={styles.taBtn} onPress={home}>
        <FontAwesome name="home" size={20} color='#fff' />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Home
        </Text>
      </TouchableOpacity>

      {/** BTN PLUS */}
      <TouchableOpacity style={styles.taBtn} onPress={form}>
        <AntDesign name="pluscircle" size={18} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Registrar
        </Text>
      </TouchableOpacity>

      {/** BTN EXTRACT MONTH */}
      <TouchableOpacity style={styles.taBtn} onPress={() => ExtractMonth(mesplus, funYear)}>
        <Entypo name="text-document-inverted" size={20} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Extrato/mês
        </Text>
      </TouchableOpacity>

      {/** BTN CALENDAR */}
      <TouchableOpacity style={styles.taBtn} onPress={calendar}>
        <FontAwesome name="calendar" size={20} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Calendario
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Tab;