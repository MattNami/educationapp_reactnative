import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample attendance data for the year
const yearlyAttendance = {
  '2024': {
    'Jaamacaad': { present: 22, absent: 3, late: 1 },
    'Koronto': { present: 20, absent: 2, late: 0 },
    'Bisha Koobaad': { present: 18, absent: 1, late: 2 },
    'Bisha Labaad': { present: 19, absent: 0, late: 1 },
    'Bisha Saddexaad': { present: 21, absent: 2, late: 0 },
    'Bisha Afraad': { present: 20, absent: 1, late: 1 },
    'Bisha Shanaad': { present: 22, absent: 0, late: 0 },
    'Bisha Lixaad': { present: 18, absent: 2, late: 1 },
    'Bisha Todobaad': { present: 20, absent: 1, late: 0 },
    'Bisha Sideedaad': { present: 19, absent: 0, late: 2 },
    'Bisha Sagaalaad': { present: 21, absent: 1, late: 1 },
    'Bisha Tobnaad': { present: 20, absent: 0, late: 0 },
  },
};

const months = [
  'Jaamacaad', 'Koronto', 'Bisha Koobaad', 'Bisha Labaad',
  'Bisha Saddexaad', 'Bisha Afraad', 'Bisha Shanaad', 'Bisha Lixaad',
  'Bisha Todobaad', 'Bisha Sideedaad', 'Bisha Sagaalaad', 'Bisha Tobnaad'
];

const AttendanceScreen = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);

  const calculateStats = () => {
    const yearData = yearlyAttendance[selectedYear] || {};
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;

    Object.values(yearData).forEach(month => {
      totalPresent += month.present || 0;
      totalAbsent += month.absent || 0;
      totalLate += month.late || 0;
    });

    const totalDays = totalPresent + totalAbsent + totalLate;
    const attendanceRate = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;

    return { totalPresent, totalAbsent, totalLate, attendanceRate };
  };

  const stats = calculateStats();
  const monthData = yearlyAttendance[selectedYear]?.[selectedMonth] || { present: 0, absent: 0, late: 0 };
  const monthTotal = monthData.present + monthData.absent + monthData.late;
  const monthRate = monthTotal > 0 ? Math.round((monthData.present / monthTotal) * 100) : 0;

  const renderMonthSelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.monthsContainer}
    >
      {months.map((month) => (
        <TouchableOpacity
          key={month}
          style={[
            styles.monthButton,
            selectedMonth === month && styles.selectedMonthButton,
          ]}
          onPress={() => setSelectedMonth(month)}
        >
          <Text
            style={[
              styles.monthButtonText,
              selectedMonth === month && styles.selectedMonthText,
            ]}
          >
            {month.substring(0, 3)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderStatCard = (title, value, color, icon) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statTextContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Istaagista Sanadka</Text>
        <Text style={styles.yearText}>{selectedYear}</Text>
      </View>

      <View style={styles.overviewContainer}>
        <View style={styles.attendanceCircle}>
          <Text style={styles.attendancePercent}>{stats.attendanceRate}%</Text>
          <Text style={styles.attendanceLabel}>Wadar ahaan Istaagista</Text>
        </View>

        <View style={styles.statsRow}>
          {renderStatCard('Fadhiisan', stats.totalPresent, '#4CAF50', 'check-circle')}
          {renderStatCard('Maqan', stats.totalAbsent, '#F44336', 'cancel')}
          {renderStatCard('Daah-furan', stats.totalLate, '#FFC107', 'schedule')}
        </View>
      </View>

      <View style={styles.monthSection}>
        <Text style={styles.sectionTitle}>Istaagista Bishaan</Text>
        {renderMonthSelector()}
        
        <View style={styles.monthStats}>
          <View style={styles.monthStatItem}>
            <Text style={styles.monthStatValue}>{monthRate}%</Text>
            <Text style={styles.monthStatLabel}>Heerka Istaagista</Text>
          </View>
          <View style={styles.monthStatDivider} />
          <View style={styles.monthStatItem}>
            <Text style={[styles.monthStatValue, { color: '#4CAF50' }]}>
              {monthData.present || 0}
            </Text>
            <Text style={styles.monthStatLabel}>Fadhiisan</Text>
          </View>
          <View style={styles.monthStatDivider} />
          <View style={styles.monthStatItem}>
            <Text style={[styles.monthStatValue, { color: '#F44336' }]}>
              {monthData.absent || 0}
            </Text>
            <Text style={styles.monthStatLabel}>Maqan</Text>
          </View>
          <View style={styles.monthStatDivider} />
          <View style={styles.monthStatItem}>
            <Text style={[styles.monthStatValue, { color: '#FFC107' }]}>
              {monthData.late || 0}
            </Text>
            <Text style={styles.monthStatLabel}>Daah-furan</Text>
          </View>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Dul-qaadka Istaagista</Text>
        <View style={styles.calendar}>
          {['Is', 'Sa', 'Ar', 'Kh', 'Ji', 'Sa', 'Ax'].map((day, index) => (
            <Text key={`${day}-${index}`} style={styles.dayHeader}>{day}</Text>
          ))}
          {Array(30).fill().map((_, i) => {
            const day = i + 1;
            const isPresent = day % 5 !== 0;
            const isLate = day % 7 === 0;
            const isWeekend = (i + 1) % 7 >= 5;
            
            if (isWeekend) {
              return <View key={day} style={styles.weekendDay} />;
            }

            return (
              <View 
                key={day} 
                style={[
                  styles.dayCell,
                  isPresent && styles.presentDay,
                  isLate && styles.lateDay,
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.statusDot}>
                  {isLate ? (
                    <View style={[styles.dot, { backgroundColor: '#FFC107' }]} />
                  ) : isPresent ? (
                    <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
                  ) : (
                    <View style={[styles.dot, { backgroundColor: '#F44336' }]} />
                  )}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Fadhiisan</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>Maqan</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.legendText}>Daah-furan</Text>
          </View>
        </View>
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
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  yearText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  overviewContainer: {
    marginTop: -15,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  attendanceCircle: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  attendancePercent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: themeColors.bgPurple,
  },
  attendanceLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    elevation: 2,
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  monthSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  monthsContainer: {
    paddingVertical: 10,
  },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedMonthButton: {
    backgroundColor: themeColors.bgPurple,
  },
  monthButtonText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 12,
  },
  selectedMonthText: {
    color: 'white',
    fontWeight: 'bold',
  },
  monthStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  monthStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  monthStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.bgPurple,
    marginBottom: 5,
  },
  monthStatLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  monthStatDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayHeader: {
    width: (width - 60) / 7,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  dayCell: {
    width: (width - 60) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 8,
    position: 'relative',
  },
  presentDay: {
    backgroundColor: '#E8F5E9',
  },
  lateDay: {
    backgroundColor: '#FFF8E1',
  },
  weekendDay: {
    width: (width - 60) / 7,
    height: 40,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});

export default AttendanceScreen;
