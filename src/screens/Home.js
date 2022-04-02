import React from 'react';
  import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
  import AntIcon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles';
import Dashboard from './Dashboard';
import Profile from './Profile';

  export const Home = ({navigation}) => {
    const _renderIcon = (routeName, selectedTab) => {
      let icon = '';

      switch (routeName) {
        case 'title1':
          icon = 'home';
          break;
        case 'title2':
          icon = 'user';
          break;
      }

      return (
        <AntIcon
          name={icon}
          size={25}
          color={routeName === selectedTab ? 'white' : 'white'}
        />
      );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {_renderIcon(routeName, selectedTab)}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <CurvedBottomBar.Navigator
          style={styles.bottomBar}
          strokeWidth={0.5}
          height={55}
          circleWidth={55}
          bgColor={colors.PRIMARY}
          initialRouteName="title1"
          borderTopLeftRight
          swipeEnabled
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles.btnCircle}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                onPress={() => Alert.alert('Coming Soon')}>
                <AntIcon name={'barcode'} color="white" size={25} />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}>
          <CurvedBottomBar.Screen
            name="title1"
            position="left"
            component={({ navigate }) => (
              <Dashboard />
            )}
          />
          <CurvedBottomBar.Screen
            name="title2"
            component={({ navigate }) => (
              <Profile navigation={navigation} />
            )}
            position="right"
            
          />
        </CurvedBottomBar.Navigator>
      </View>
    );
  };

  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    button: {
      marginVertical: 5,
    },
    bottomBar: {},
    btnCircle: {
      width: 60,
      height: 60,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.PRIMARY,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0.5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
      bottom: 30,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: 'gray',
    },
    img: {
      width: 30,
      height: 30,
    },
  });