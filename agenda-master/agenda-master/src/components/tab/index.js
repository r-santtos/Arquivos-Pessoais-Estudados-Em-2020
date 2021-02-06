import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

/** COMPONENT TAB */
function Tab() {
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
  function scheduling() {
    navigation.navigate('Scheduling')
  }
  /** FUNCTION SCHEDULING */
  function report() {
    navigation.navigate('Report')
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

      {/** BTN BOOK */}
      <TouchableOpacity style={styles.taBtn} onPress={form}>
        <FontAwesome name="book" size={20} color='#fff' />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Agendamentos
        </Text>
      </TouchableOpacity>

      {/** BTN SCHEDULE */}
      <TouchableOpacity style={styles.taBtn} onPress={scheduling}>
        <MaterialIcons name="schedule" size={20} color='#fff' />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Agendados
        </Text>
      </TouchableOpacity>

      {/** BTN REPORT */}
      <TouchableOpacity style={styles.taBtn} onPress={report}>
        <Entypo name="text-document-inverted" size={20} color="#fff" />
        <Text style={{
            color:'#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>Extrato
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Tab;