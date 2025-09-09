import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ExamsScreen = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  // Sample exam data
  const examData = {
    'Term 1': [
      { subject: 'Xisaabta', score: 85, grade: 'A', date: '2023-10-15' },
      { subject: 'Carabiga', score: 78, grade: 'B+', date: '2023-10-17' },
      { subject: 'Ingiriisiga', score: 92, grade: 'A+', date: '2023-10-20' },
      { subject: 'Sayniska', score: 80, grade: 'A-', date: '2023-10-22' },
    ],
    'Term 2': [
      { subject: 'Xisaabta', score: 88, grade: 'A', date: '2024-02-10' },
      { subject: 'Carabiga', score: 82, grade: 'A-', date: '2024-02-12' },
      { subject: 'Ingiriisiga', score: 95, grade: 'A+', date: '2024-02-15' },
      { subject: 'Sayniska', score: 79, grade: 'B+', date: '2024-02-18' },
    ],
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return '#4CAF50';
    if (grade.includes('B')) return '#FFC107';
    if (grade.includes('C')) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Natiijooyinka Imtixaanada</Text>
      </View>

      <View style={styles.termSelector}>
        {['Term 1', 'Term 2', 'Term 3'].map((term) => (
          <TouchableOpacity
            key={term}
            style={[
              styles.termButton,
              selectedTerm === term && styles.selectedTermButton,
            ]}
            onPress={() => setSelectedTerm(term)}
          >
            <Text
              style={[
                styles.termButtonText,
                selectedTerm === term && styles.selectedTermText,
              ]}
            >
              {term}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        {examData[selectedTerm]?.map((exam, index) => (
          <View key={index} style={styles.examCard}>
            <View style={styles.examSubject}>
              <Text style={styles.subjectText}>{exam.subject}</Text>
              <Text style={styles.dateText}>{exam.date}</Text>
            </View>
            <View style={styles.examScore}>
              <Text style={[styles.scoreText, { color: getGradeColor(exam.grade) }]}>
                {exam.score}%
              </Text>
              <View
                style={[
                  styles.gradeBadge,
                  { backgroundColor: `${getGradeColor(exam.grade)}20` },
                ]}
              >
                <Text style={[styles.gradeText, { color: getGradeColor(exam.grade) }]}>
                  {exam.grade}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: themeColors.bgPurple,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  termSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    elevation: 2,
  },
  termButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  selectedTermButton: {
    backgroundColor: themeColors.bgPurple,
  },
  termButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedTermText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  examCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  examSubject: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  examScore: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExamsScreen;
