import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { BannerAd,BannerAdSize } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

export default function App() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateDiscount = () => {
    const originalPrice = parseFloat(price);
    const discountRate = parseFloat(discount);

    if (!isNaN(originalPrice) && !isNaN(discountRate)) {
      const discountAmount = (originalPrice * discountRate) / 100;
      const final = originalPrice - discountAmount;
      const finalRounded = final.toFixed(2);
      setFinalPrice(finalRounded);

      // হিস্টরিতে যোগ করো
      const record = `মূল দাম: ৳${originalPrice}, ছাড়: ${discountRate}%, প্রাইস: ৳${finalRounded}`;
      setHistory([record, ...history]);
    } else {
      setFinalPrice(null);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ডিসকাউন্ট ক্যালকুলেটর</Text>

      <TextInput
        style={styles.input}
        placeholder="মূল দাম লিখুন (৳)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="ডিসকাউন্ট শতাংশ (%)"
        keyboardType="numeric"
        value={discount}
        onChangeText={setDiscount}
      />

      <Button mode="contained" onPress={calculateDiscount} style={styles.button}>
        হিসাব করুন
      </Button>

      {finalPrice !== null && (
        <Text style={styles.result}>ছাড়ের পর দাম: ৳ {finalPrice}</Text>
      )}

      {/* হিস্টরি সেকশন */}
      {history.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>হিসাবের ইতিহাস:</Text>
          {history.map((item, index) => (
            <Text key={index} style={styles.historyItem}>• {item}</Text>
          ))}
        </View>
      )}
 {/* AdMob Banner */}
      {Platform.OS !== 'web' && (
  <View style={{ marginTop: 20 }}>
    <BannerAd
      size={BannerAdSize.FULL_BANNER}
      unitId="ca-app-pub-9732996768204584/6737146152"
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(error) => console.log(error)}
    />
  </View>
)}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  historySection: {
    marginTop: 30,
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 15,
    marginBottom: 5,
  },
});

