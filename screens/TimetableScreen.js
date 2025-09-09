import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

const days = ['Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimco'];
const periods = ['1', '2', '3', '4', '5', '6'];

// Sample timetable data
const timetableData = {
  'Isniin': [
    { id: '1', subject: 'Xisaabta', time: '8:00 - 8:45', room: 'Lab 1' },
    { id: '2', subject: 'Carabiga', time: '8:45 - 9:30', room: 'F-12' },
    { id: '3', subject: 'Ciyaaraha', time: '9:45 - 10:30', room: 'Garoonka' },
    { id: '4', subject: 'Sayniska', time: '10:30 - 11:15', room: 'Lab 2' },
  ],
  'Talaado': [
    { id: '1', subject: 'Ingiriisiga', time: '8:00 - 8:45', room: 'F-15' },
    { id: '2', subject: 'Taariikhda', time: '8:45 - 9:30', room: 'F-12' },
    { id: '3', subject: 'Xisaabta', time: '9:45 - 10:30', room: 'Lab 1' },
  ],
  'Arbaco': [
    { id: '1', subject: 'Sayniska', time: '8:00 - 8:45', room: 'Lab 2' },
    { id: '2', subject: 'Carabiga', time: '8:45 - 9:30', room: 'F-12' },
    { id: '3', subject: 'Ciyaaraha', time: '9:45 - 10:30', room: 'Garoonka' },
  ],
  'Khamiis': [
    { id: '1', subject: 'Xisaabta', time: '8:00 - 8:45', room: 'Lab 1' },
    { id: '2', subject: 'Ingiriisiga', time: '8:45 - 9:30', room: 'F-15' },
    { id: '3', subject: 'Taariikhda', time: '9:45 - 10:30', room: 'F-12' },
  ],
  'Jimco': [
    { id: '1', subject: 'Ciyaaraha', time: '8:00 - 8:45', room: 'Garoonka' },
    { id: '2', subject: 'Sayniska', time: '8:45 - 9:30', room: 'Lab 2' },
    { id: '3', subject: 'Xisaabta', time: '9:45 - 10:30', room: 'Lab 1' },
  ],
};

const TimetableScreen = () => {
  const [selectedDay, setSelectedDay] = useState(days[0]);

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.classTimeContainer}>
        <Text style={styles.classTime}>{item.time}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.classSubject}>{item.subject}</Text>
        <View style={styles.classMeta}>
          <MaterialIcons name="meeting-room" size={16} color="#666" />
          <Text style={styles.classRoom}>{item.room}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jadwalka Casharrada</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.timetableContainer}>
        {timetableData[selectedDay]?.length > 0 ? (
          <FlatList
            data={timetableData[selectedDay]}
            renderItem={renderClassItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.classesList}
          />
        ) : (
          <View style={styles.noClassesContainer}>
            <MaterialIcons name="event-busy" size={50} color="#ddd" />
            <Text style={styles.noClassesText}>Ma jiraan casharro maanta</Text>
          </View>
        )}
      </View>
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
  daysContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: themeColors.bgPurple,
  },
  dayButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timetableContainer: {
    flex: 1,
    padding: 15,
  },
  classesList: {
    paddingBottom: 20,
  },
  classItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  classTimeContainer: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  classTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  classInfo: {
    flex: 1,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  classMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classRoom: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  noClassesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  noClassesText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default TimetableScreen;
