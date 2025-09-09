import { Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '../components/headerText';
import Button from '../components/button';
import ProvinceSelector from '../components/provinceSelector';
import { useNavigation } from '@react-navigation/native';

const SelectProvinceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="px-7 py-8">
      {/** ============== Header text component =========== */}
      <HeaderText text={"Gobolkaaga waa kuma?"} />

      {/** ============== Xulashada Gobolka ===================== */}
      <View className="mt-10">
        <ProvinceSelector />
      </View>

      {/** ========= Guddiga falka ================== */}
      <View className="mt-[25%]">
        <Button
          primaryBtnText={'Bilow'}
          onPrimaryBtnPress={() => navigation.navigate('MainTabs')}
          secondaryBtnText2={'Ka bood'}
          onSecondaryBtnPress={() => navigation.navigate('MainTabs')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectProvinceScreen;
