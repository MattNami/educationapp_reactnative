import { View, Text, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { images } from '../assets';

// Subject icons mapping
const subjectIcons = {
  'Xisaabta': images.calculator,
  'Ingiriisiga': images.book,
  'Carabiga': images.bookOpen,
  'Af-Soomaaliga': images.bookOpen,
  'Cilmiga Bulshada': images.globe,
  'Suugaanta': images.bookOpen,
  'Dhaqanka': images.music,
  'Luqadda Afka Hooyo': images.bookOpen,
};

// Grade options data - Only grades 1-5
const gradeOptions = [
  { 
    label: 'Fasalka 1-5 (Dugsiga Hoose)', 
    subjects: [
      'Xisaabta', 
      'Af-Soomaaliga', 
      'Carabiga', 
      'Ingiriisiga', 
      'Cilmiga Bulshada',
      'Suugaanta',
      'Dhaqanka',
      'Luqadda Afka Hooyo'
    ] 
  }
];

const SubjectSelector = ({ onSelect }) => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showGradeRanges, setShowGradeRanges] = useState(false);

  const handleGradeRangeSelect = (gradeLabel) => {
    setSelectedGrade(gradeLabel);
    setSelectedSubject('');
    setShowGradeRanges(false);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    if (onSelect) {
      onSelect({ grade: selectedGrade, subject });
    }
  };

  return (
    <View className="flex justify-center bg-bgLightGray min-h-14 py-4 rounded-lg mb-[18px] border border-gray-200">
      {/* Grade Selection */}
      <Pressable 
        onPress={() => setShowGradeRanges(!showGradeRanges)}
        className="flex px-4"
      >
        <View className="flex items-center justify-between flex-row">
          <Text className="font-exo font-semibold text-lg text-darkGrayText">
            {selectedGrade || 'Dooro Fasalka'}
          </Text>
          {!showGradeRanges ? (
            <ChevronDownIcon style={{ color: themeColors.darkGrayText }} size={20} />
          ) : (
            <ChevronUpIcon style={{ color: themeColors.darkGrayText }} size={20} />
          )}
        </View>

        {showGradeRanges && (
          <View className="mt-3 bg-white rounded-lg p-2 shadow-sm">
            {gradeOptions.map((grade) => (
              <Pressable
                key={grade.label}
                className={`py-3 px-4 rounded-lg ${
                  selectedGrade === grade.label ? 'bg-bgPurple' : 'bg-gray-50'
                }`}
                onPress={() => handleGradeRangeSelect(grade.label)}
              >
                <Text 
                  className={`font-exo font-semibold text-base ${
                    selectedGrade === grade.label ? 'text-white' : 'text-darkGrayText'
                  }`}
                >
                  {grade.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </Pressable>

      {/* Subject Selection */}
      {selectedGrade && (
        <View className="mt-3 px-4">
          <Text className="font-exo font-semibold text-darkGrayText mb-2">
            Dooro Cilmi:
          </Text>
          <View className="flex-row flex-wrap">
            {gradeOptions
              .find(grade => grade.label === selectedGrade)
              ?.subjects.map((subject) => (
                <Pressable
                  key={subject}
                  onPress={() => handleSubjectSelect(subject)}
                  className="m-1"
                >
                  <View 
                    className={`flex-row items-center rounded-full px-4 py-2 ${
                      selectedSubject === subject ? 'bg-bgPurple' : 'bg-gray-100'
                    }`}
                  >
                    <Image 
                      source={subjectIcons[subject] || images.book} 
                      style={{ 
                        height: 16, 
                        width: 16,
                        marginRight: 6,
                        resizeMode: 'contain',
                        tintColor: selectedSubject === subject ? 'white' : themeColors.darkGrayText
                      }} 
                    />
                    <Text 
                      className={`font-exo text-sm ${
                        selectedSubject === subject ? 'text-white' : 'text-darkGrayText'
                      }`}
                    >
                      {subject}
                    </Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SubjectSelector;
