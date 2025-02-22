import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface propTypes {
  loading?: boolean;
  loaderColor?: string;
  text?: string;
  icon?: any;
  buttonStyle?: any;
  textStyle?: any;
  handlePress?: () => void;
  disable?: boolean;
}

const Button: React.FC<propTypes> = ({
  loading,
  loaderColor,
  text,
  icon,
  buttonStyle,
  textStyle,
  handlePress,
  disable,
}) => {
  return (
    <TouchableOpacity
      disabled={disable || loading}
      style={[styles.startButton, buttonStyle]}
      onPress={handlePress}>
      {icon && !loading && icon}
      {text && (
        <Text style={[styles.startButtonText, textStyle]}>
          {loading ? (
            <ActivityIndicator
              color={loaderColor ? loaderColor : Colors.white}
            />
          ) : (
            text
          )}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  startButton: {
    width: '100%',
    backgroundColor: '#f46c35',
    padding: 15,
    borderRadius: 40,
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
