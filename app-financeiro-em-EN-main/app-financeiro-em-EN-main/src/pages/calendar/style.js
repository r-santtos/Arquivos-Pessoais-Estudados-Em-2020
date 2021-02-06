import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171717',
  },
  txtWhite: {
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#272728',
    borderRadius: 3,
    padding: 5,
  },

  /** COMPONENT GLOBAL SCROLLVIEW */
  scrollView: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 3,
    backgroundColor: '#272728',
    padding: 15,
  },

  /** COMPONENT BOX BTNS */
  boxBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },

  /** COMPONENT BTN MONTH */
  btnMonths: {
    width: '49.5%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272728',
  },
});