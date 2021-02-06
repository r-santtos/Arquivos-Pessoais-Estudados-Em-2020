import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

/** COMPONENT TAB */
function Tab() {
  const navigation = useNavigation();
  /** FUNCTION FORM */
  function home() {
    navigation.navigate('Home')
  }
  /** FUNCTION FORM */
  function form() {
    navigation.navigate('Form')
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
      <RectButton style={styles.taBtn} onPress={home}>
        <FontAwesome name="home" size={27} color="#fff" />
      </RectButton>

      {/** BTN BOOK */}
      <RectButton style={styles.taBtn} onPress={form}>
        <FontAwesome name="book" size={24} color="#fff" />
      </RectButton>

      {/** BTN SCHEDULE */}
      <RectButton style={styles.taBtn} onPress={scheduling}>
        <MaterialIcons name="schedule" size={27} color="#fff" />
      </RectButton>

      {/** BTN REPORT */}
      <RectButton style={styles.taBtn} onPress={report}>
        <FontAwesome name="th-list" size={24} color="#fff" />
      </RectButton>
    </View>
  );
}

export default Tab;