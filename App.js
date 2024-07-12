import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Inicializar NFC Manager
NfcManager.start();

const App = () => {
  useEffect(() => {
    return () => {
      NfcManager.setEventListener(NfcTech.NfcA, null);
    };
  }, []);

  const readNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      console.log(tag);
      Alert.alert('NFC Tag', JSON.stringify(tag));
      NfcManager.setEventListener(NfcTech.NfcA, null);
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native NFC Reader</Text>
      <Button title="Read NFC" onPress={readNfc} />
    </View>
  );
};

export default App;
