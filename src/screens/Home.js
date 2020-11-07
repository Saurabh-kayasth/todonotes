import React, {useState, useEffect, useReducer, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import FoldersComponent from '../components/FoldersComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFolderComponent from '../components/AddFolderComponent';
import {FolderReducer} from '../context/FoldersContext/FoldersReducer';
import {Styles} from '../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {IconColor} from '../constants/Theme';
import {useTheme, Checkbox, ProgressBar} from 'react-native-paper';
import {Transition, Transitioning} from 'react-native-reanimated';
import data from './data';
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(FolderReducer);
  const {colors} = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    dispatch({type: 'get'});
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (isActive) {
            dispatch({type: 'get'});
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const addFolder = () => {
    setModalVisible(true);
  };

  return (
    <>
      {/* <DrawerHeaderCompponent
        header={'Folders'}
        icon={'menu'}
        navigation={props.navigation}
      /> */}
      <View
        style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
        {/* {state && (
          <FoldersComponent
            navigation={props.navigation}
            data={state}
            dispatch={dispatch}
          />
        )}

        <TouchableOpacity style={Styles.btn} onPress={() => addFolder()}>
          <Icon name="folder-plus" size={25} color={IconColor} />
        </TouchableOpacity>
        {modalVisible && (
          <AddFolderComponent
            setModalVisible={setModalVisible}
            dispatch={dispatch}
          />
        )} */}

        <Transitioning.View
          ref={ref}
          transition={transition}
          style={styles.container}>
          {data.map(({bg, color, category, subCategories}, index) => {
            return (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  ref.current.animateNextTransition();
                  setCurrentIndex(index === currentIndex ? null : index);
                }}
                style={styles.cardContainer}
                activeOpacity={0.9}>
                <View
                  style={[
                    styles.card,
                    {backgroundColor: colors.SecondaryColor},
                  ]}>
                  <Text style={[styles.heading, {color: colors.text}]}>
                    {category}
                  </Text>
                  <View style={styles.statusContainer}>
                    <ProgressBar
                      styleAttr="Horizontal"
                      progress={0.5}
                      color="#3cc66b"
                      style={styles.progressBar}
                    />
                    <Text style={styles.workDoneLabel}>Work Done : 30%</Text>
                  </View>
                  {index === currentIndex && (
                    <View style={styles.subCategoriesList}>
                      {subCategories.map((subCategory) => (
                        <View style={styles.subTask} key={subCategory}>
                          <Checkbox
                            color="#3cc66b"
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setChecked(!checked);
                            }}
                          />
                          <Text style={[styles.body]}>{subCategory}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </Transitioning.View>
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  cardContainer: {
    // flexGrow: 1,
    margin: 10,
    marginBottom: 0,
  },
  card: {
    flexGrow: 1,
    padding: 10,
    elevation: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: '900',
    textTransform: 'uppercase',
    // letterSpacing: -2,
    color: '#fff',
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    paddingLeft: 10,
    color: '#adadad',
    // textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 10,
    borderTopWidth: 0,
    // borderTopColor: '#ff5b77',
    borderLeftWidth: 2,
    borderLeftColor: '#ff5b77',
  },
  subTask: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  statusContainer: {
    paddingTop: 10,
  },
  workDoneLabel: {
    color: 'grey',
    marginTop: 5,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#ff0000',
  },
});
