import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import Button from '../../components/Button';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface propTypes {
  navigation: NavigationProp<any>;
}

const Login: React.FC<propTypes> = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default India
  const [error, setError] = useState<string | null>(null);

  // Basic validation without libphonenumber-js
  const validatePhoneNumber = (phone: string, code: string) => {
    const fullPhoneNumber = `${code}${phone}`;

    // Regex for validating phone numbers (10-digit format)
    const phoneRegex = /^[0-9]{10}$/;

    if (!phone || !phone.match(phoneRegex)) {
      setError('Invalid phone number');
      return false;
    }

    setError(null);
    return true;
  };

  const onSubmit = () => {
    if (validatePhoneNumber(mobileNumber, countryCode)) {
      console.log('Valid Phone Number:', `${countryCode}${mobileNumber}`);
      navigation.navigate('otpVerify', {
        number: `${countryCode}${mobileNumber}`,
      });
    }
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
              We have sent you an{' '}
              <Text style={{fontWeight: '600'}}>One Time Password (OTP)</Text>{' '}
              on this mobile number.
            </Text>

            <Text style={styles.label}>Enter mobile no. *</Text>

            <PhoneInput
              initialCountry="in"
              textProps={{
                placeholder: 'Enter your mobile number',
                placeholderTextColor: '#999',
                keyboardType: 'numeric',
                // maxLength: 10,
              }}
              style={[
                styles.phoneInput,
                error && {
                  borderColor: 'red',
                },
              ]}
              flagStyle={styles.flag}
              textStyle={styles.inputText}
              onPressFlag={() => {}}
              onChangePhoneNumber={text => {
                console.log(text, 'onChangePhoneNumber');
                setMobileNumber(text?.replace(countryCode, ''));
                setError(null);
              }}
              onSelectCountry={iso2 => {
                const selectedCode = `+${PhoneInput.getCountryCode(iso2)}`;
                setCountryCode(selectedCode);
              }}
            />
          </View>

          <Button
            text="Get OTP"
            disable={false}
            buttonStyle={[styles.createButton, error && styles.disableButton]}
            textStyle={{fontWeight: '500'}}
            handlePress={onSubmit}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

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
  label: {
    color: '#7b7b7b',
    fontSize: 14,
    fontWeight: '700',
    paddingBottom: 10,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#F5F5F5',
  },
  flag: {
    width: 30,
    height: 20,
  },
  inputText: {
    fontSize: 16,
    color: Colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  createButton: {
    marginTop: 10,
  },
  disableButton: {
    backgroundColor: "gray",
  },
});
