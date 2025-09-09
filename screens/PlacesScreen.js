import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { placesData } from '../assets/data/data';
import { themeColors } from '../theme';

const PlacesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.placeCard}
      onPress={() => navigation.navigate('PlaceDetails', { place: item })}
    >
      <Image 
        source={item.image || require('../assets/images/classWorkIcon.png')} 
        style={styles.placeImage} 
        resizeMode="cover"
      />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeLocation}>📍 {item.location}</Text>
        <Text style={styles.placeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.contactText}>📞 {item.contact}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredPlaces = activeTab === 'all' 
    ? [...placesData.masajid, ...placesData.dugsi]
    : activeTab === 'masajid' 
      ? placesData.masajid 
      : placesData.dugsi;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Masaajid iyo Dugsiga</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Dhammaan
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'masajid' && styles.activeTab]}
          onPress={() => setActiveTab('masajid')}
        >
          <Text style={[styles.tabText, activeTab === 'masajid' && styles.activeTabText]}>
            Masaajid
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'dugsi' && styles.activeTab]}
          onPress={() => setActiveTab('dugsi')}
        >
          <Text style={[styles.tabText, activeTab === 'dugsi' && styles.activeTabText]}>
            Dugsiga
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: themeColors.bgPurple,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: themeColors.bgPurple,
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  placeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  placeInfo: {
    flex: 1,
    padding: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  placeLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 12,
    color: themeColors.bgPurple,
    marginTop: 4,
  },
});

export default PlacesScreen;
