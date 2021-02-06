import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
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
    backgroundColor: '#272728',
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
    backgroundColor: '#272728',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },

  /** COMPONENT LIST */
  boxList: {
    width: '100%',
    backgroundColor: '#272728',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    borderLeftWidth: 1.5,
    borderRadius: 3,
    borderColor: '#345d9c',
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
  txtProduct: {
    color: '#d1d1d1',
    fontSize: 13,
  },
  txtDates: {
    color: '#d1d1d1',
    fontSize: 13,
  },
});