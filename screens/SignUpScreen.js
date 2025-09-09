import { View, Text, Image, TouchableOpacity, Pressable, Keyboard, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets';
import Button from '../components/button';
import Input from '../components/input';
import { EyeIcon } from 'react-native-heroicons/solid';

const { signup } = images;

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = () => {
    console.log('xogta isticmaale --> ', userData);
    navigation.navigate('SelectGrade', { userData });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-bgWhite px-8">
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center">
            <Image 
              source={signup} 
              style={{ 
                width: 353, 
                height: 235,
                marginTop: 20,
                marginBottom: 20,
              }} 
              resizeMode="contain"
            />
          </View>

          <View className="w-full mb-8">
            <Input
              label={'Magacaaga'}
              placeholder={'Magacaaga buuxi'}
              value={userData.name}
              onChange={(text) => handleInputChange('name', text)}
            />
            <Input
              label={'Cinwaanka emaylka'}
              placeholder={'magac@tusaale.com'}
              value={userData.email}
              onChange={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={'Furaha sirta ah'}
              placeholder={'**********'}
              value={userData.password}
              onChange={(text) => handleInputChange('password', text)}
              Icon={EyeIcon}
              secureTextEntry
              last
            />
          </View>

          {!isKeyboardVisible && (
            <View className="mb-8">
              <Button
                primaryBtnText={'Diiwaan geli'}
                onPrimaryBtnPress={handleSubmit}
                secondaryBtnText1={'Hore u diiwaangashay?'}
                secondaryBtnText2={'Gali'}
                onSecondaryBtnPress={() => navigation.navigate('Login')}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
