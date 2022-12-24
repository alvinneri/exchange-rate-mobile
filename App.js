import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Keyboard } from 'react-native';
import AmountField from './components/AmountField/AmountField';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {

  const [amount , setAmount] =  useState(1)
  const [rates, setRates]  = useState([])

  const onChangeNumber = (value) => {
    setAmount(value);
  }

  const getRates = async () => {
    try{
      const response = await axios.post('http://localhost:9000/api/v1/rates',{amount: amount});
      setRates(response?.data?.data || [])
    }catch(err){
      
      console.log(err)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await getRates()
    }

    fetch()
  },[])

  const onSubmit = async() => {
    getRates()
    Keyboard.dismiss();
  }

  const renderRates = () => {
    return (
      <View style={styles.ratesContainer}>
          {rates.length > 0 ? rates.map((item) => {
            return (
              <View style={styles.rate} key={item.key}>
              <Text style={styles.h2}>{item.key}: {item.value}</Text>
              </View>
            )
          }) :  <Text style={styles.h2}>You've reached the quota for the api access.</Text>}
      </View>
    )
  }

  return (
   
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AmountField number={amount} onChangeNumber={onChangeNumber} />
        <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}><Text style={styles.buttonText}>Convert</Text></TouchableOpacity>
        <Text style={styles.h1}>Conversion Rates</Text>
        <ScrollView  contentContainerStyle={{paddingBottom: 60}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {renderRates()}
        </ScrollView>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C0032',
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
  },
  h1: {
    fontSize: 20,
    fontWeight: "700",
    color: '#fff',
    marginVertical: hp(2)
  },
  h2: {
    fontSize: 15,
    fontWeight: "700",
    color: '#fff'
  },
  rate: {
    borderWidth: 1,
    padding: wp(8),
    margin: 5,
    backgroundColor:'#282828',
    width: wp(80),
  },
  button : {
    backgroundColor: '#3500D3',
    padding: 20,
    width: wp(80),
  },
  buttonText: {
    textAlign:'center',
    color: '#fff'
  },
  innerContainer: {
    width: wp(90),
    alignItems: 'center',
    marginTop: hp(10),
  },
  ratesContainer: {
    marginVertical: hp(1),
    paddingBottom: hp(20)
  }
});
