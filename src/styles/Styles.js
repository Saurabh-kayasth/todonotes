import {StyleSheet, Dimensions} from 'react-native';
import {
  SecondaryColor,
  BackgroundColor,
  HeadingColor,
  PrimaryColor,
} from '../constants/Theme';
const {width} = Dimensions.get('window');

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: SecondaryColor,
    elevation: 10,
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pasteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  paste: {
    width: '15%',
    height: 40,
    borderRadius: 5,
    elevation: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: SecondaryColor,
    padding: 10,
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: SecondaryColor,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
  modelContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  formContainer: {
    width: '95%',
    backgroundColor: SecondaryColor,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    paddingTop: 0,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: HeadingColor,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  submitBtn: {
    width: '47%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b77',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
  },
});
