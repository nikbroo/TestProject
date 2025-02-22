import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProp, useRoute} from '@react-navigation/native';
import Button from '../../components/Button';
import {OtpInput} from 'react-native-otp-entry';

interface propTypes {
  navigation: NavigationProp<any>;
}

const OTPVerify: React.FC<propTypes> = ({navigation}) => {
  const {params}: any = useRoute();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer]); // Only run when timer changes

  const handleVerify = () => {
    if (otp.length === 4) {
      console.log('OTP Verified:', otp);
      navigation.navigate('home'); // Change as per your navigation
    }
  };

  const otpSendAgain = () => {
    setTimer(30);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={styles.mainContainer}>
        <View style={styles.header}></View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.heading}>Verify your phone number</Text>
            <Text style={styles.text}>
              Enter the OTP sent to {params?.number}
            </Text>

            <Text style={styles.otpLabel}>Enter OTP *</Text>

            <OtpInput
              numberOfDigits={4}
              focusColor={'#ff956e'}
              autoFocus={true}
              placeholder="****"
              blurOnFilled={true}
              type="numeric"
              secureTextEntry={false}
              onTextChange={text => setOtp(text)}
              onFilled={text => setOtp(text)}
              textInputProps={{accessibilityLabel: 'One-Time Password'}}
              theme={{
                containerStyle: {justifyContent: 'center', gap: 20},
                pinCodeContainerStyle: {borderWidth: 1, borderColor: 'gray'},
                pinCodeTextStyle: {color: Colors.primaryColor},
              }}
            />
          </View>

          <View>
            <Button
              text="Verify OTP"
              loading={loading}
              disable={otp.length !== 4}
              buttonStyle={[
                styles.createButton,
                otp.length !== 4 && styles.disableButton,
              ]}
              textStyle={{fontWeight: '500'}}
              handlePress={handleVerify}
            />

            <TouchableOpacity disabled={timer !== 0} onPress={otpSendAgain}>
              <Text
                style={[styles.resend, timer !== 0 && {color: Colors.text}]}>
                Resend OTP {timer !== 0 ? `in ${timer} sec` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OTPVerify;

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
    justifyContent: 'space-between',
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
