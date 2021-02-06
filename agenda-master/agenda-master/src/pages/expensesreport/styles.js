import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  txtWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /** COMPONENT BALANCE */
  balance: {
    width: '100%',
    padding: 15,
    marginVertical: 1,
    backgroundColor: '#1d1d1d',
  },
  txtMonth: {
    color: '#d1d1d1',
  },
  txtBalance: {
    fontSize: 22,
  },

  /** COMPONENT TITLE */
  title: {
    padding: 15,
    backgroundColor: '#1d1d1d',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },

  /** COMPONENT LIST */
  boxList: {
    width: '100%',
    backgroundColor: '#1d1d1d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  list: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  txtValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtDates: {
    color: '#d1d1d1',
    fontSize: 13,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    paddingVertical: 3,
  }
});