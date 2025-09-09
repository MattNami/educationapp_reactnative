import { View, Text, Image, TouchableOpacity, Modal, ScrollView, StyleSheet, Animated, Linking } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { themeColors } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';

const TeacherItem = ({ teacher }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
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
      setShowContactInfo(false);
    }
  }, [modalVisible]);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone) => {
    Linking.openURL(`whatsapp://send?phone=${phone.replace(/[^0-9]/g, '')}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderContactInfo = () => (
    <View style={styles.contactContainer}>
      <Text style={styles.sectionTitle}>Xogta Xiriirka</Text>
      
      <TouchableOpacity 
        style={styles.contactItem}
        onPress={() => handleCall(teacher.contact.phone)}
      >
        <MaterialIcons name="phone" size={24} color={themeColors.bgPurple} />
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactLabel}>Telefoon</Text>
          <Text style={styles.contactValue}>{teacher.contact.phone}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.contactItem}
        onPress={() => handleWhatsApp(teacher.contact.whatsapp)}
      >
        <MaterialIcons name="chat" size={24} color="#25D366" />
        <View style={styles.contactTextContainer}>
          <Text style={[styles.contactLabel, { color: '#25D366' }]}>WhatsApp</Text>
          <Text style={styles.contactValue}>{teacher.contact.whatsapp}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.contactItem}
        onPress={() => handleEmail(teacher.contact.email)}
      >
        <MaterialIcons name="email" size={24} color={themeColors.bgPurple} />
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactLabel}>Iimaylka</Text>
          <Text style={styles.contactValue}>{teacher.contact.email}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.contactItem}>
        <MaterialIcons name="location-on" size={24} color={themeColors.bgPurple} />
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactLabel}>Goobta</Text>
          <Text style={styles.contactValue}>{teacher.contact.location}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.teacherCard}>
      <TouchableOpacity 
        style={styles.cardContent}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <Image source={teacher.image} style={styles.teacherImage} />
        <View style={styles.teacherInfo}>
          <Text style={styles.teacherName} numberOfLines={1}>{teacher.name}</Text>
          <Text style={styles.teacherSubject}>{teacher.subject}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{teacher.rating}</Text>
            <Text style={styles.reviewText}>({teacher.students} arday)</Text>
          </View>
          <Text style={styles.priceText}>{teacher.price}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Animated.View 
          style={[styles.modalOverlay, { opacity: fadeAnim }]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={() => setModalVisible(false)}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <ScrollView style={styles.modalScroll}>
              <View style={styles.modalHeader}>
                <Image source={teacher.image} style={styles.modalTeacherImage} />
                <View style={styles.teacherHeaderInfo}>
                  <Text style={styles.modalTeacherName}>{teacher.name}</Text>
                  <Text style={styles.modalTeacherSubject}>{teacher.subject}</Text>
                  <View style={styles.modalRatingContainer}>
                    <MaterialIcons name="star" size={20} color="#FFD700" />
                    <Text style={styles.modalRatingText}>{teacher.rating}</Text>
                    <Text style={styles.modalReviewText}>({teacher.students} arday)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Xogta Macallinka</Text>
                <Text style={styles.teacherBio}>{teacher.bio}</Text>
                
                <View style={styles.detailItem}>
                  <MaterialIcons name="school" size={20} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}>{teacher.education}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <MaterialIcons name="work" size={20} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}>Khibrad: {teacher.experience}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <MaterialIcons name="access-time" size={20} color={themeColors.bgPurple} />
                  <Text style={styles.detailText}>{teacher.availability}</Text>
                </View>
              </View>

              {showContactInfo ? (
                renderContactInfo()
              ) : (
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => setShowContactInfo(true)}
                >
                  <Text style={styles.contactButtonText}>Laxiriir Macallin</Text>
                </TouchableOpacity>
              )}

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Xidhac</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  teacherCard: {
    width: 160,
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
    padding: 10,
  },
  teacherImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  teacherInfo: {
    paddingHorizontal: 4,
  },
  teacherName: {
    fontSize: 14,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginBottom: 2,
  },
  teacherSubject: {
    fontSize: 12,
    fontFamily: 'exo',
    color: themeColors.bgPurple,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginLeft: 2,
  },
  reviewText: {
    fontSize: 10,
    fontFamily: 'exo',
    color: themeColors.lightGrayText,
    marginLeft: 4,
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'exoBold',
    color: themeColors.bgPurple,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalScroll: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalTeacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  teacherHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  modalTeacherName: {
    fontSize: 18,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginBottom: 2,
  },
  modalTeacherSubject: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.bgPurple,
    marginBottom: 4,
  },
  modalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalRatingText: {
    fontSize: 14,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginLeft: 4,
  },
  modalReviewText: {
    fontSize: 12,
    fontFamily: 'exo',
    color: themeColors.lightGrayText,
    marginLeft: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'exoBold',
    color: themeColors.darkGrayText,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  teacherBio: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.darkGrayText,
    lineHeight: 22,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'exo',
    color: themeColors.darkGrayText,
    marginLeft: 10,
    flex: 1,
  },
  contactButton: {
    backgroundColor: themeColors.bgPurple,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'exoBold',
  },
  contactContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTextContainer: {
    marginLeft: 12,
    flex: 1,
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
  modalFooter: {
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: themeColors.darkGrayText,
    fontSize: 16,
    fontFamily: 'exoBold',
  },
});

export default TeacherItem;
