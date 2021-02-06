import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171718',
  },
  txtWhite: {
    fontWeight: 'bold',
    color: '#fff',
  },

  /** COMPONENT FORM */
  header: {
    width: '100%',
    backgroundColor: '#345d9c',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** COMPONENT FORM */
  form: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1d1d1d',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#345d9c',
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputTwo: {
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 5,
  },
  boxInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#345d9c',
  },
  inputG: {
    width: '70%',
    paddingLeft: 5,
  },
  inputP: {
    width: '30%',
  },
  cifra: {
    color: '#fff', 
    fontWeight: 'bold', 
    width: '13%',
    borderBottomWidth: 1,
    borderBottomColor: '#345d9c',
    padding: 4.5,
  },
  inputMoney: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom:10,
    color: '#fff',
  },
  moneyInput: {
    width: '86%',
    borderBottomWidth: 1,
    borderBottomColor: '#345d9c',
    color: '#fff',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#345d9c',
    marginBottom: 10,
    paddingTop: 10,
  },
  txtSelect: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#272728',
    padding: 15,
    fontSize: 18,
    marginBottom: 5,
  },
  caretdown: {
    padding: 10,
  },

  /** COMPONENTS MODAL */
  modalView: {
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#345d9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnModal: {
    width: '100%',
    padding: 15,
    backgroundColor: '#272728',
    marginBottom: 5,
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
  btnPassive: {
    backgroundColor: '#E0867E',
  },
  btnAtive: {
    backgroundColor: '#fff',
  },
  txtBlack: {
    color: '#000',
    fontWeight: 'bold',
  },
});