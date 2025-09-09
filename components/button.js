import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Button = ({
  onPrimaryBtnPress,
  primaryBtnText,
  showSecondaryBtn = true,
  secondaryBtnText1,
  secondaryBtnText2,
  onSecondaryBtnPress,
}) => {
  return (
    <View className="flex flex-col items-center gap-8 w-full">
      {/** ====================== Main Button ============================= */}
      <Pressable
        onPress={onPrimaryBtnPress}
        className="py-4 bg-bgPurple px-7 rounded-xl w-full max-w-[267px] min-h-[61px] flex items-center justify-center"
      >
        <Text className="text-xl font-exoSemibold text-center text-bgWhite">
          {primaryBtnText}
        </Text>
      </Pressable>
      {/** ====================== Secondary pressable ============================= */}
      {showSecondaryBtn ? (
        <View className="flex-row justify-center flex-wrap">
          <Text className="text-darkGrayText font-exo text-lg text-center">
            {secondaryBtnText1}{' '}
          </Text>
          <Pressable onPress={onSecondaryBtnPress}>
            <Text className="font-exo text-bgPurple text-lg">
              {secondaryBtnText2}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default Button;
