import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  txtWhite: {
    fontWeight: 'bold',
    color: '#fff',
  },

  /** COMPONENT SCROLLVIEW */
  scrollview: {
    width: '100%',
    backgroundColor: '#000',
  },

  /** COMPONENT CARD */
  card: {
    height: 175,
    backgroundColor: '#1d1d1d',
    marginHorizontal: 5,
    marginVertical: 3,
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
    marginBottom: 3,
  },
  btn: {
    backgroundColor: '#1d1d1d',
    paddingHorizontal: 15,
    paddingVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '49.5%',
  },
});

