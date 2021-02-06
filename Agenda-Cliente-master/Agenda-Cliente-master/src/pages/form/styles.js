import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  txtWhite: {
    fontWeight: 'bold',
    color: '#fff',
  },

  /** COMPONENT FORM */
  header: {
    width: '100%',
    backgroundColor: '#974fff',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** COMPONENT FORM */
  form: {
    width: '100%',
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#974fff',
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    fontWeight: 'bold',
  },
  boxInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputG: {
    width: '70%',
  },
  inputP: {
    width: '30%',
  },
  cifra: {
    color: '#909090', 
    fontWeight: 'bold', 
    width: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#974fff',
    padding: 4.5,
  },
  inputMoney: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom:10,
  },
  moneyInput: {
    width: '89%',
    borderBottomWidth: 1,
    borderBottomColor: '#974fff',
  },

  /** COMPONENTS BTNS */
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 2,
  },
  btnDel: {
    backgroundColor: '#ebeff2',
  },
  btnBook: {
    backgroundColor: '#974fff',
  }
});