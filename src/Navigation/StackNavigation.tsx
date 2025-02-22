import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import OTPVerify from '../screens/OTPVerify/OTPVerify';
import Home from '../screens/Home/Home';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: {backgroundColor: '#f46c35'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="otpVerify"
          component={OTPVerify}
          options={{
            title: 'Verify OTP',
          }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
