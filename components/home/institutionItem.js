import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Dimensions, ScrollView, Linking, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { themeColors } from '../../theme';

const { width } = Dimensions.get('window');

const InstitutionItem = ({ institution }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(100);
    }
  }, [modalVisible]);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url) => {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    Linking.openURL(formattedUrl);
  };

  return (
    <View style={styles.institutionCard}>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <View style={styles.cardContent}>
          {/* Institution Image */}
          <View style={styles.imageContainer}>
            {!imageError ? (
              <Image 
                source={institution.image} 
                style={styles.image} 
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={[styles.image, styles.fallbackImage]}>
                <Text style={styles.fallbackText}>
                  {institution.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{institution.rating}</Text>
            </View>
          </View>

          {/* Institution Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {institution.name}
            </Text>
            <Text style={styles.field} numberOfLines={1}>
              {institution.field}
            </Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={14} color={themeColors.bgPurple} />
              <Text style={styles.locationText} numberOfLines={1}>
                {institution.location}
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="school" size={14} color={themeColors.bgPurple} />
                <Text style={styles.statText}>{institution.students}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="calendar-today" size={12} color={themeColors.bgPurple} />
                <Text style={styles.statText}>{institution.established}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal for detailed view */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setShowContactInfo(false);
        }}
      >
        <Animated.View 
          style={[styles.modalOverlay, { opacity: fadeAnim }]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={() => {
            setModalVisible(false);
            setShowContactInfo(false);
          }}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Modal content remains the same */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{institution.name}</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                setShowContactInfo(false);
              }}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Xogta Aasaasiga ah</Text>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={18} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}><Text style={styles.detailLabel}>Goobta:</Text> {institution.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="calendar-today" size={16} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}><Text style={styles.detailLabel}>Sanadka Aasaasiga:</Text> {institution.established}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="school" size={16} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}><Text style={styles.detailLabel}>Ardeyda:</Text> {institution.students}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="star" size={16} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}><Text style={styles.detailLabel}>Qiimaynta:</Text> {institution.rating} ({institution.reviews} aragti)</Text>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Faahfaahin Dheeraad ah</Text>
                <Text style={styles.descriptionText}>
                  {institution.description}
                </Text>
              </View>

              {showContactInfo && (
                <View style={styles.contactInfoContainer}>
                  <Text style={styles.sectionTitle}>Xogta Xiriirka</Text>
                  
                  <TouchableOpacity 
                    style={styles.contactItem}
                    onPress={() => handleCall(institution.contact.phone)}
                  >
                    <MaterialIcons name="phone" size={20} color={themeColors.bgPurple} />
                    <View style={styles.contactTextContainer}>
                      <Text style={styles.contactLabel}>Telefoon</Text>
                      <Text style={styles.contactValue}>{institution.contact.phone}</Text>
                    </View>
                    <MaterialIcons name="call" size={20} color={themeColors.bgPurple} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.contactItem}
                    onPress={() => handleEmail(institution.contact.email)}
                  >
                    <MaterialIcons name="email" size={20} color={themeColors.bgPurple} />
                    <View style={styles.contactTextContainer}>
                      <Text style={styles.contactLabel}>Iimayl</Text>
                      <Text style={styles.contactValue}>{institution.contact.email}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={16} color={themeColors.bgPurple} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.contactItem}
                    onPress={() => handleWebsite(institution.contact.website)}
                  >
                    <MaterialIcons name="language" size={20} color={themeColors.bgPurple} />
                    <View style={styles.contactTextContainer}>
                      <Text style={styles.contactLabel}>Website</Text>
                      <Text style={styles.contactValue}>{institution.contact.website}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={16} color={themeColors.bgPurple} />
                  </TouchableOpacity>

                  <View style={styles.contactItem}>
                    <MaterialIcons name="location-on" size={20} color={themeColors.bgPurple} />
                    <View style={styles.contactTextContainer}>
                      <Text style={styles.contactLabel}>Goobta</Text>
                      <Text style={styles.contactValue}>{institution.contact.address}</Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: showContactInfo ? '#6c5ce7' : themeColors.bgPurple }]}
                onPress={() => setShowContactInfo(!showContactInfo)}
              >
                <Text style={styles.contactButtonText}>
                  {showContactInfo ? 'Dib ugu laabo' : 'Xiriir'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  institutionCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 2,
    fontFamily: 'exoBold',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginBottom: 2,
  },
  field: {
    fontSize: 12,
    fontFamily: 'exo',
    color: themeColors.bgPurple,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 11,
    fontFamily: 'exo',
    color: themeColors.lightGrayText,
    marginLeft: 4,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 11,
    fontFamily: 'exo',
    color: themeColors.lightGrayText,
    marginLeft: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    flex: 1,
    marginRight: 10,
  },
  modalBody: {
    padding: 16,
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.darkGrayText,
    marginLeft: 8,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.darkGrayText,
    lineHeight: 22,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  contactButton: {
    backgroundColor: themeColors.bgPurple,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'exoBold',
  },
  contactInfoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    fontFamily: 'exo',
    color: themeColors.lightGrayText,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.darkGrayText,
  },
});

export default InstitutionItem;
