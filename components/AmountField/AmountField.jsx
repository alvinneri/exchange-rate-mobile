import React from 'react';
import { SafeAreaView,TextInput, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AmountField = ({number, onChangeNumber}) => {

    return (
        <SafeAreaView>
        <Text style={styles.placeholder}>Enter Amount (AUD)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: widthPercentageToDP(80),
    marginVertical: heightPercentageToDP(2),
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    borderColor: '#282828'
  },
  placeholder: {
    color: "#fff"
  }
});

export default AmountField