import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWhite: {
    fontWeight: 'bold',
    color: '#fff',
  },

  /** COMPONENT SCROLLVIEW */
  scrollview: {
    width: '100%',
    backgroundColor: '#fff',
  },

  /** COMPONENT CARD */
  card: {
    height: 175,
    backgroundColor: '#974fff',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBalance: {
    fontSize: 20,
  },

  /** COMPONENTS BTNS */
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  btn: {
    backgroundColor: '#974fff',
    paddingHorizontal: 15,
    paddingVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '49.5%',
  },
});

