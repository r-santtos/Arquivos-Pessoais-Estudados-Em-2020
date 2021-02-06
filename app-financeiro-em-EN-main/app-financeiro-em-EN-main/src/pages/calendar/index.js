import React from  'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

/** IMPORT DEVELOPER */
import styles from './style';
import Footer from '../../components/tab';
import { useUpdateList, useVarMonth, useVarYear } from '../../context/updateList';

/** CALENDAR */
const monthDates = new Date();
const funYear = monthDates.getFullYear();

/** COMPONENT HOME */
function Calendar() {
  /** CONTEXT MONTH END YEAR */
  const { setVarMonth } = useVarMonth();
  const { setVarYear } = useVarYear();
  const { updateList, setUpdateList } = useUpdateList();

  /** FUNCTION UPDATELIST */
  function Count() {
    setUpdateList(updateList + 1);
  }

  /** FUNCTION NAVIGATION */
  const navigation = useNavigation();
  function Extract(months, years) {
    setVarMonth(months);
    setVarYear(years);
    Count();
    navigation.navigate('ExtractMonth');
  }

  /** RETURN CALENDAR */
  return (
    <SafeAreaView style={styles.container}>
      {/** COMPONENT SCROLLVIEW */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 3,
        }}
      >

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(1, funYear)}>
            <Text style={styles.txtWhite}>jan</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(2, funYear)}>
            <Text style={styles.txtWhite}>feb</Text>
          </RectButton>
        </View>

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(3, funYear)}>
            <Text style={styles.txtWhite}>mar</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(4, funYear)}>
            <Text style={styles.txtWhite}>apr</Text>
          </RectButton>
        </View>

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(5, funYear)}>
            <Text style={styles.txtWhite}>may</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(6, funYear)}>
            <Text style={styles.txtWhite}>jun</Text>
          </RectButton>
        </View>

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(7, funYear)}>
            <Text style={styles.txtWhite}>jul</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(8, funYear)}>
            <Text style={styles.txtWhite}>aug</Text>
          </RectButton>
        </View>

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(9, funYear)}>
            <Text style={styles.txtWhite}>sep</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(10, funYear)}>
            <Text style={styles.txtWhite}>oct</Text>
          </RectButton>
        </View>

        {/** COMPONENT BOX BTNS */}
        <View style={styles.boxBtns}>
          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(11, funYear)}>
            <Text style={styles.txtWhite}>nov</Text>
          </RectButton>

          {/** COMPONENT BTN MONTH */}
          <RectButton style={[styles.btnMonths]} onPress={() => Extract(12, funYear)}>
            <Text style={styles.txtWhite}>dec</Text>
          </RectButton>
        </View>

      </ScrollView>

      {/** COMPONENT FOOTER */}
      <Footer />
    </SafeAreaView>
  );
}

export default Calendar;