import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets';
import Button from '../components/button';
import Input from '../components/input';
import { EyeIcon } from 'react-native-heroicons/solid';

const { signin } = images;

export default function SignInScreen() {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [containerHeight, setContainerHeight] = useState('100%');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        setContainerHeight(Platform.OS === 'ios' ? '80%' : '90%');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setContainerHeight('100%');
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-bgWhite px-8">
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center">
            <Image 
              source={signin} 
              style={{ 
                width: 266, 
                height: 266,
                marginTop: 20,
                marginBottom: 20,
              }} 
              resizeMode="contain"
            />
          </View>

          <View className="w-full mb-8">
            <Input 
              label={'Cinwaanka emaylka'} 
              placeholder={'magac@tusaale.com'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={'Furaha sirta ah'}
              placeholder={'********'}
              Icon={EyeIcon}
              secureTextEntry
              last
            />
          </View>

          {!isKeyboardVisible && (
            <View className="mb-8">
              <Button
                primaryBtnText={'Gali'}
                onPrimaryBtnPress={() => navigation.navigate('MainTabs')}
                secondaryBtnText1={"Ma haysatid akoon?"}
                secondaryBtnText2={'Diiwaan geli'}
                onSecondaryBtnPress={() => navigation.navigate('SignUp')}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
