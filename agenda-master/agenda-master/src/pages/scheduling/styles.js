import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  txtWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /** COMPONENT SCROLLVIEW */
  scrollview: {
    width: '100%',
    padding: 5,
  },

  /** COMPONENT CARD */
  card: {
    width: '100%',
    marginBottom: 10,
  },
  text: {
    padding: 15,
    backgroundColor: '#1d1d1d',
  },
  txtTxt: {
    fontSize: 18,
  },
  value: {
    fontSize: 25,
  },
  name: {
    fontSize: 20,
  },

  /**COMPONENT DATE TIME */
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /** COMPONENTS BTNS */
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  btn: {
    width: '49.5%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderLeftWidth: 1,
  },
  btnDel: {
    backgroundColor: '#fff',
  },
  btnBook: {
    backgroundColor: '#1d1d1d',
  },
});