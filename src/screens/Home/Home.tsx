import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProp} from '@react-navigation/native';

interface propTypes {
  navigation: NavigationProp<any>;
}

const Home: React.FC<propTypes> = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={styles.mainContainer}>
        <View style={styles.header}></View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Welcome</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
  },
  heading: {
    color: Colors.black,
    fontSize: 30,
    fontWeight: '700',
  },
  text: {
    color: '#7b7b7b',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 10,
    paddingBottom: 30,
  },
  otpLabel: {
    color: '#7b7b7b',
    fontSize: 14,
    fontWeight: '700',
    paddingBottom: 20,
  },
  createButton: {
    marginTop: 100,
  },
  disableButton: {
    backgroundColor: 'gray',
  },
  resend: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.primaryColor,
    fontWeight: '500',
    marginVertical: 15,
  },
});
