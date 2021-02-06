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

  /** COMPONET BTNS EXTRACTS YEARS */
  extractsYears: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /** COMPONET BTN YEAR LAST */
  btnMonthYear: {
    width: '49.5%',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtnsMonthYear: {
    fontSize: 12,
    color: '#c1c1c1',
  },

  /** COMPONENT BALANCE */
  balance: {
    minHeight: 100,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBalance: {
    fontSize: 22,
  },

  /** COMPOENT EXTRACT MONTH */
  boxMonth: {
    minHeight: 150,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxExtractMonth: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleMonth: {
    fontSize: 16,
    color: '#c1c1c1',
    textTransform: 'uppercase',
    paddingVertical: 15,
  },
  txtFont: {
    fontSize: 11,
    color: '#c1c1c1',
    textTransform: 'uppercase',
  },
  boxBox: {
    padding: 8,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 15,
  },
  boxAtive: {
    borderColor: '#345d9c',
  },
  boxPassive: {
    borderColor: '#E0867E',
  },
  boxTotal: {
    borderColor: '#fff',
  },
  /** COMPONENT CHART */
  boxChart: {
    marginBottom: 3,
  },
  txtPassive: {
    textAlign: 'right',
  },
  boxAtivesPassives: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});