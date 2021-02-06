import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { useUpdateList, useVarMonth, useVarYear } from '../../context/updateList';

/** CALENDAR */
const monthDates = new Date();
const mesplus = monthDates.getMonth()+1;
const funYear = monthDates.getFullYear();

/** COMPONENT TAB */
function Tab() {
  /** CONTEXT MONTH END YEAR */
  const { setVarMonth } = useVarMonth();
  const { setVarYear } = useVarYear();
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }

  const navigation = useNavigation();
  /** FUNCTION FORM */
  function home() {
    navigation.navigate('Home');
  }
  /** FUNCTION FORM */
  function form() {
    navigation.navigate('Form');
  }
  /** FUNCTION FORM */
  function formPassives() {
    navigation.navigate('FormPassives');
  }
  /** FUNCTION SCHEDULING */
  function ExtractMonth(months, years) {
    setVarMonth(months);
    setVarYear(years);
    Count();
    navigation.navigate('ExtractMonth')
  }

  /** FUNCTION CALENDAR */
  function calendar() {
    navigation.navigate('Calendar')
  }

  /** RETURN DO COMPONENT TAB */
  return (
    <View style={styles.containerTab}>
      {/** BTN EXTRACT MONTH */}
      <TouchableOpacity style={styles.taBtn} onPress={() => ExtractMonth(mesplus, funYear)}>
        <Entypo name="text-document-inverted" size={18} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Month
        </Text>
      </TouchableOpacity>
      
      {/** BTN PLUS */}
      <TouchableOpacity style={styles.taBtn} onPress={form}>
        <AntDesign name="pluscircle" size={18} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Recipe
        </Text>
      </TouchableOpacity>

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
      <TouchableOpacity style={styles.taBtn} onPress={formPassives}>
        <AntDesign name="pluscircle" size={18} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Outgoing
        </Text>
      </TouchableOpacity>

      {/** BTN CALENDAR */}
      <TouchableOpacity style={styles.taBtn} onPress={calendar}>
        <FontAwesome name="calendar" size={18} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Calendar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Tab;