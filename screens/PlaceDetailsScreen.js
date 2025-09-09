import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { themeColors } from '../theme';

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const { place } = route.params;

  const handleCall = () => {
    const phoneNumber = place.contact.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = () => {
    const message = 'Waa maxay xogta dheeraadka ah ee aad haysato?';
    const url = `https://wa.me/${place.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={place.image || require('../assets/images/classWorkIcon.png')} 
        style={styles.placeImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.placeName}>{place.name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>📍 {place.location}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faahfaahin</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        {place.prayerTimes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Waqtiga Salaadda</Text>
            <View style={styles.prayerTimesContainer}>
              <View style={styles.prayerTimeItem}>
                <Text style={styles.prayerName}>Subax</Text>
                <Text style={styles.prayerTime}>{place.prayerTimes.fajr}</Text>
              </View>
              <View style={styles.prayerTimeItem}>
                <Text style={styles.prayerName}>Dhuhr</Text>
                <Text style={styles.prayerTime}>{place.prayerTimes.dhuhr}</Text>
              </View>
              <View style={styles.prayerTimeItem}>
                <Text style={styles.prayerName}>Asar</Text>
                <Text style={styles.prayerTime}>{place.prayerTimes.asr}</Text>
              </View>
              <View style={styles.prayerTimeItem}>
                <Text style={styles.prayerName}>Maqrib</Text>
                <Text style={styles.prayerTime}>{place.prayerTimes.maghrib}</Text>
              </View>
              <View style={styles.prayerTimeItem}>
                <Text style={styles.prayerName}>Isha</Text>
                <Text style={styles.prayerTime}>{place.prayerTimes.isha}</Text>
              </View>
            </View>
          </View>
        )}

        {place.subjects && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fannada Lagu Baraa</Text>
            <View style={styles.tagsContainer}>
              {place.subjects.map((subject, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Xiriir</Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <Text style={styles.contactButtonText}>📞 Wac {place.contact}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.contactButton, {backgroundColor: '#25D366'}]} 
            onPress={handleWhatsApp}
          >
            <Text style={styles.contactButtonText}>💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  placeImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.bgPurple,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  prayerTimesContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  prayerName: {
    fontSize: 15,
    color: '#555',
  },
  prayerTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors.bgPurple,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#555',
  },
  contactSection: {
    marginBottom: 30,
  },
  contactButton: {
    backgroundColor: themeColors.bgPurple,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlaceDetailsScreen;
