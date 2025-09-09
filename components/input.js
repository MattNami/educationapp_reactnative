import { Text, TextInput, View } from 'react-native';
import React from 'react';

const Input = ({ label, placeholder, last = false, Icon, value, onChange, secureTextEntry }) => {
  return (
    <View
      className={`flex flex-col gap-2 relative w-full ${last ? '' : 'mb-5'}`}
    >
      <Text className="font-exo font-semibold text-darkGrayText text-base">
        {label}
      </Text>
      {/** ====================== Text Input ============================= */}
      <View className="flex flex-row items-center justify-between px-4 bg-white h-12 rounded-lg shadow">
        <TextInput
          className={
            'font-exo flex items-center text-black text-base h-full w-full bg-white rounded-lg'
          }
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry || label === 'Furaha sirta ah'}
          selectionColor="#6D28D9"
        />
        {/** ====================== Optional Icon ============================= */}
        {Boolean(Icon) ? (
          <View className="absolute right-0 mr-4">
            <Icon color="#9CA3AF" size={20} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Input;
