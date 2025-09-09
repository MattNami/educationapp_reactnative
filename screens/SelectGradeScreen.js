import { Platform, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gradesData } from '../assets/data/data';
import HeaderText from '../components/headerText';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';

const SelectGradeScreen = () => {
  const navigation = useNavigation();
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    // Navigate to MainTabs with the Home tab selected
    navigation.navigate('MainTabs', { 
      initialRouteName: 'Home',
      initialParams: { selectedGrade: grade }
    });
  };

  // Grade display names in Somali
  const gradeDisplayNames = {
    'Grade 1-5': 'Fasalka 1-5 (Hoose)',
    'Grade 6-9': 'Fasalka 6-9 (Dhexe)',
    '10-12': 'Fasalka 10-12 (Sare)'
  };

  return (
    <SafeAreaView style={styles.container}>
      {/** ============== Header text component =========== */}
      <HeaderText text={"Dooro Heerka Aqoontaada"} />

      {/** ============== Xulashada Heerka ===================== */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gradesContainer}>
          {gradesData.map((grade, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gradeButton}
              onPress={() => handleGradeSelect(grade)}
            >
              <Text style={styles.gradeText}>
                {gradeDisplayNames[grade] || grade}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/** ============== Footer Note ===================== */}
        <Text style={styles.noteText}>
          Dooro heerka aad ku jirto si aad u hesho casharrada ku habboon
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  gradesContainer: {
    marginTop: 20,
  },
  gradeButton: {
    backgroundColor: '#1E88E5', // Blue color
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto',
  },
  noteText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SelectGradeScreen;
